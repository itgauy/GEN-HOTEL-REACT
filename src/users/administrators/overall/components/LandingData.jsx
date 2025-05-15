import { useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

const LandingDataTable = () => {
  const { landingData, fetchLandingData } = useLandingStore();

  useEffect(() => {
    fetchLandingData();
  }, [fetchLandingData]);

  // Handle Manage action (placeholder)
  const handleManage = (id) => {
    console.log(`LandingDataTable: Manage item with ID: ${id}`);
    // TODO: Implement navigation or modal for managing item
  };

  // Handle Archive action (placeholder)
  const handleArchive = (id) => {
    console.log(`LandingDataTable: Archive item with ID: ${id}`);
    // TODO: Implement API call to archive item
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/80">
          <TableRow>
            {/* <TableHead className="w-[200px]">ID</TableHead> */}
            <TableHead>Hero Title</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="p-2">
          {landingData.length > 0 ? (
            landingData.map((item) => (
              <TableRow key={item._id}>
                {/* <TableCell className="max-w-[100px] truncate">{item._id}</TableCell> */}
                <TableCell className="max-w-[200px] truncate">{item.heroSection?.title}</TableCell>
                <TableCell>{formatDate(item.lastUpdated)}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleManage(item._id)}>
                        Manage
                      </DropdownMenuItem>
                      
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
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

export default LandingDataTable;
