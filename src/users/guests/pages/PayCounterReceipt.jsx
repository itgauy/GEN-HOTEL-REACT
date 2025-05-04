import { RotateCcw, LoaderCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGuestBookStore from "../stores/guest-book.store";
import { format } from "date-fns";

function PayCounterReceipt() {
  const { guestBook, loading, error, fetchGuestBookReceipt } = useGuestBookStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchGuestBookReceipt(id);
    }
  }, [id, fetchGuestBookReceipt]);

  // Helper function to validate and format date
  const formatDate = (dateString, formatPattern) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date)
      ? format(date, formatPattern)
      : "N/A";
  };

  // Format issuance date
  const issuanceDate = formatDate(guestBook?.booking_date_added, "dd MMM yyyy, hh:mm");

  // Format expiration date
  const expirationDate = formatDate(guestBook?.receipt_record?.receipt_expiration, "dd MMM yyyy, hh:mm a");

  return (
    <section className="pt-28 pb-24 flex items-center justify-center min-h-screen mx-auto lg:container">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex items-center flex-row justify-between">
          <h1 className="text-2xl font-bold">Order confirmed</h1>
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Pending
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading && (
            <div className="flex justify-center">
              <LoaderCircle className="animate-spin" />
            </div>
          )}
          {error && (
            <div className="text-red-500 text-center">
              Error: {error}
            </div>
          )}
          {!loading && !error && guestBook && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Order ID</span>
                <span>{guestBook._id || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Account ID</span>
                <span>{guestBook.booking_issued_by || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Account Name</span>
                <span>
                  {guestBook.contact_information?.contact_first_name || ""}{" "}
                  {guestBook.contact_information?.contact_last_name || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Receipt sent to</span>
                <span>{guestBook.contact_information?.email_address || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Issuance Date</span>
                <span>{issuanceDate}</span>
              </div>
            </div>
          )}
          <hr className="border-gray-200" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal (Service fee)</span>
              <span>₱20</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₱{guestBook?.receipt_record?.order_reservation_total || "N/A"}</span>
            </div>
          </div>
          <div className="text-sm text-gray-500 space-y-1">
            <p>
              <span className="font-semibold">Note:</span> This order will be valid once guest issuance their payment to counter on time.
            </p>
            <p>
              <span className="font-semibold">Expires:</span> {expirationDate} (15 hours validity)
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default PayCounterReceipt;