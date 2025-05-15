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

const LandingArticles = ({ selectedItems, setSelectedItems }) => {
  const { articles } = useLandingStore();

  // Debug: Log received props and articles
  useEffect(() => {
    console.log("LandingArticles: Articles", articles);
    console.log("LandingArticles: Selected items", selectedItems);
  }, [articles, selectedItems]);

  // Handle Manage action (placeholder)
  const handleManage = (id) => {
    console.log(`LandingArticles: Manage Article with ID: ${id}`);
    // TODO: Implement navigation or modal for managing article
  };

  // Handle Archive action (placeholder)
  const handleArchive = (id) => {
    console.log(`LandingArticles: Archive Article with ID: ${id}`);
    // TODO: Implement API call to archive article
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/80">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Article Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Published</TableHead>
            {/* <TableHead className="w-[50px]"></TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody className="p-2">
          {articles.length > 0 ? (
            articles.map((article) => (
              <TableRow key={article._id}>
                <TableCell className="max-w-[100px] truncate">{article._id || "N/A"}</TableCell>
                <TableCell className="max-w-[200px] truncate">{article.title || "N/A"}</TableCell>
                <TableCell className="max-w-[150px] truncate">{article.author || "N/A"}</TableCell>
                <TableCell>{formatDate(article.publishedAt)}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleManage(article._id)}>
                        Manage
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleArchive(article._id)}>
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
                  <p className="text-gray-500">No articles available</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LandingArticles;