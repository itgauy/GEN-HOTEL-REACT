import { useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLandingStore from "../stores/landing.stores";

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

const LandingFAQs = ({ selectedItems, setSelectedItems }) => {
  const { landingData } = useLandingStore();
  const faqs = landingData[0]?.faqSection || [];

  // Debug: Log received props and faqs
  useEffect(() => {
    console.log("LandingFAQs: FAQs", faqs);
    console.log("LandingFAQs: Selected items", selectedItems);
  }, [faqs, selectedItems]);

  // Handle Manage action (placeholder)
  const handleManage = (id) => {
    console.log(`LandingFAQs: Manage FAQ with ID: ${id}`);
    // TODO: Implement navigation or modal for managing FAQ
  };

  // Handle Archive action (placeholder)
  const handleArchive = (id) => {
    console.log(`LandingFAQs: Archive FAQ with ID: ${id}`);
    // TODO: Implement API call to archive FAQ
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/80">
          <TableRow>
            {/* <TableHead className="w-[120px]">
              ID
            </TableHead> */}
            <TableHead>Question</TableHead>
            <TableHead>Answer</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="p-2">
          {faqs.length > 0 ? (
            faqs.map((faq) => (
              <TableRow key={faq._id}>
                {/* <TableCell className="max-w-[100px] truncate">
                  {faq._id || "N/A"}
                </TableCell> */}
                <TableCell className="max-w-[200px] truncate">{faq.question || "N/A"}</TableCell>
                <TableCell className="max-w-[300px] truncate">{faq.answer || "N/A"}</TableCell>
                <TableCell>{formatDate(landingData[0]?.lastUpdated)}</TableCell>
                {/* <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleManage(faq._id)}>
                        Manage
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleArchive(faq._id)}>
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                <div className="flex flex-col items-center justify-center gap-4">
                  <p className="text-gray-500">No data available</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LandingFAQs;