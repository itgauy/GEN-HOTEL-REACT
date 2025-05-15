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

const LandingSectionData = ({ selectedItems, setSelectedItems }) => {
  const { landingData } = useLandingStore();
  const features = landingData[0]?.features || [];

  // Debug: Log received props and features
  useEffect(() => {
    console.log("LandingSectionData: Features", features);
    console.log("LandingSectionData: Selected items", selectedItems);
  }, [features, selectedItems]);

  // Handle Manage action (placeholder)
  const handleManage = (id) => {
    console.log(`LandingSectionData: Manage feature with ID: ${id}`);
    // TODO: Implement navigation or modal for managing feature
  };

  // Handle Archive action (placeholder)
  const handleArchive = (id) => {
    console.log(`LandingSectionData: Archive feature with ID: ${id}`);
    // TODO: Implement API call to archive feature
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/80">
          <TableRow>
            {/* <TableHead className="w-[120px]">
              ID
            </TableHead> */}
            <TableHead>Section Title</TableHead>
            <TableHead>Subtitle</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="p-2">
          {features.length > 0 ? (
            features.map((feature) => (
              <TableRow key={feature._id}>
                {/* <TableCell className="max-w-[100px] truncate">
                  {feature._id || "N/A"}
                </TableCell> */}
                <TableCell className="max-w-[200px] truncate">{feature.title || "N/A"}</TableCell>
                <TableCell className="max-w-[200px] truncate">{feature.subtitle || "N/A"}</TableCell>
                <TableCell className="max-w-[300px] truncate">{feature.content || "N/A"}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleManage(feature._id)}>
                        Manage
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleArchive(feature._id)}>
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
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

export default LandingSectionData;