import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

// Utility to format dates
const formatDate = (dateString) => {
  if (!dateString) return "Unknown";
  try {
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "Invalid Date";
  }
};

const HotelDataTable = ({ data, selectedItems, setSelectedItems }) => {
  // Debug: Log received props
  console.log("HotelDataTable: Received props", { data, selectedItems });

  const navigate = useNavigate();

  // Handle Archive action
  const handleArchive = (bookingId) => {
    console.log(`HotelDataTable: Archive booking with ID: ${bookingId}`);
    setTimeout(() => {
      navigate("/reservations-admin/bookings/manage");
    }, 300);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/80">
          <TableRow>
            <TableHead className="w-[120px]">
              ID
            </TableHead>
            <TableHead>Reservation (Hotel Type)</TableHead>
            <TableHead>Room Capacity</TableHead>
            <TableHead>Issued By</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="p-2">
          {data.length > 0 ? (
            data.map((booking) => {
              console.log("HotelDataTable: Rendering booking", booking);
              return (
                <TableRow key={booking.id}>
                  <TableCell className="max-w-[100px] truncate">
                    <Checkbox
                      className="me-2"
                      checked={selectedItems.includes(booking.id)}
                      onCheckedChange={(checked) => {
                        console.log("HotelDataTable: Row checkbox changed", { bookingId: booking.id, checked });
                        if (checked) {
                          setSelectedItems([...selectedItems, booking.id]);
                        } else {
                          setSelectedItems(selectedItems.filter((id) => id !== booking.id));
                        }
                      }}
                    />
                    {booking.id || "N/A"}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{booking.title || "N/A"}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="justify-start w-fit">
                        {booking.roomAvailability?.adults ?? 0} Adults
                      </Badge>
                      <Badge variant="outline" className="justify-start w-fit">
                        {booking.roomAvailability?.children ?? 0} Children
                      </Badge>
                      <Badge variant="outline" className="justify-start w-fit">
                        {booking.roomAvailability?.infants ?? 0} Infants
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{booking.issuedBy || "Unknown"}</TableCell>
                  <TableCell>{formatDate(booking.dateTime)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleArchive(booking.id)}>
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                <div className="flex flex-col items-center justify-center gap-4">
                  <p className="text-gray-500">No data available</p>
                  {console.log("HotelDataTable: Rendering empty state")}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default HotelDataTable;