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
import useHotelForumStore from "../stores/forum.stores";
import { useState, useEffect } from "react";
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

const HotelDataTable = () => {
  const { threads, fetchThreads, loading, error } = useHotelForumStore();
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  // Fetch threads on component mount
  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  // Handle Manage action
  const handleManage = (threadId) => {
    console.log(`ForumManagement: Navigating to manage thread with ID: ${threadId}`);
    navigate(`/hms-admin/manage-forums/${threadId}`);
  };

  // Handle Archive action (placeholder)
  const handleArchive = (threadId) => {
    console.log(`ForumManagement: Archive thread with ID: ${threadId}`);
    // TODO: Implement API call to archive thread
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/80">
          <TableRow>
            <TableHead className="w-[120px]">
              ID
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Posted</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="p-2">
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                <p className="text-gray-500">Loading...</p>
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                <p className="text-red-500">{error}</p>
              </TableCell>
            </TableRow>
          ) : threads.length > 0 ? (
            threads.map((thread) => (
              <TableRow key={thread._id}>
                <TableCell className="max-w-[100px] truncate">
                  {thread._id || "N/A"}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">{thread.title || "N/A"}</TableCell>
                <TableCell>
                  {thread.author?.employee_name
                    ? `${thread.author.employee_name.firstName} ${thread.author.employee_name.lastName}`
                    : thread.author?.username || "Unknown"}
                </TableCell>
                <TableCell>{formatDate(thread.createdAt)}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleManage(thread._id)}>
                        Manage
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem onClick={() => handleArchive(thread._id)}>
                        Archive
                      </DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                <div className="flex flex-col items-center justify-center gap-4">
                  <p className="text-gray-500">No threads available</p>
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