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

  // Handle Manage action (placeholder)
  const handleManage = (roomId) => {
    console.log(`HotelDataTable: Manage room with ID: ${roomId}`);
    // TODO: Implement navigation or modal for managing room
  };

  // Handle Archive action (placeholder)
  const handleArchive = (roomId) => {
    console.log(`HotelDataTable: Archive room with ID: ${roomId}`);
    // TODO: Implement API call to archive room (e.g., update room_status)
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/80">
          <TableRow>
            <TableHead className="w-[120px]">
              <Checkbox
                className="me-2"
                checked={data.length > 0 && selectedItems.length === data.length}
                indeterminate={selectedItems.length > 0 && selectedItems.length < data.length}
                onCheckedChange={(checked) => {
                  console.log("HotelDataTable: Header checkbox changed", { checked });
                  if (checked) {
                    setSelectedItems(data.map((room) => room.id));
                  } else {
                    setSelectedItems([]);
                  }
                }}
              />
              ID
            </TableHead>
            <TableHead>Room Title</TableHead>
            <TableHead>Slots</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Issued By</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="p-2">
          {data.length > 0 ? (
            data.map((room) => {
              console.log("HotelDataTable: Rendering room", room);
              return (
                <TableRow key={room.id}>
                  <TableCell className="max-w-[100px] truncate">
                    <Checkbox
                      className="me-2"
                      checked={selectedItems.includes(room.id)}
                      onCheckedChange={(checked) => {
                        console.log("HotelDataTable: Row checkbox changed", { roomId: room.id, checked });
                        if (checked) {
                          setSelectedItems([...selectedItems, room.id]);
                        } else {
                          setSelectedItems(selectedItems.filter((id) => id !== room.id));
                        }
                      }}
                    />
                    {room.id || "N/A"}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{room.title || "N/A"}</TableCell>
                  <TableCell>{room.slotNumber || "0"}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="justify-start w-fit">
                        {room.roomAvailability?.adults ?? 0} Adults
                      </Badge>
                      <Badge variant="outline" className="justify-start w-fit">
                        {room.roomAvailability?.children ?? 0} Children
                      </Badge>
                      <Badge variant="outline" className="justify-start w-fit">
                        {room.roomAvailability?.infants ?? 0} Infants
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{room.issuedBy || "Unknown"}</TableCell>
                  <TableCell>{formatDate(room.dateTime)}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleManage(room.id)}>
                          Manage
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleArchive(room.id)}>
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
              <TableCell colSpan={7} className="text-center py-8">
                <div className="flex flex-col items-center justify-center gap-4">
                  {/* They don't like it heh */}
                  {/* <img
                    src="/anubis-mascot.png"
                    alt="No data"
                    className="w-48 h-48 object-contain"
                  /> */}
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