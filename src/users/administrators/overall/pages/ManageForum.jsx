import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, PlusCircleIcon, LoaderCircle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import useHotelForumStore from "../stores/forum.stores";
import { motion, AnimatePresence } from "motion/react";

function Manage_Forum() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get thread ID from URL
  const { fetchThreadById, addMainThread, selectedThread, loading, error } = useHotelForumStore();

  // Retrieve author ID from auth-storage
  const getAuthorId = () => {
    try {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        return parsed.state?.user?._id || "";
      }
      return "";
    } catch (err) {
      console.error("Error parsing auth-storage:", err);
      return "";
    }
  };

  const authorId = getAuthorId();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: authorId,
  });

  // Fetch thread data if id is present and populate form
  useEffect(() => {
    if (id) {
      fetchThreadById(id); // Trigger fetch, which updates selectedThread
    }
  }, [id, fetchThreadById]);

  // Update formData when selectedThread changes
  useEffect(() => {
    if (id && selectedThread && selectedThread._id === id) {
      setFormData({
        title: selectedThread.title || "",
        content: selectedThread.content || "",
        author: selectedThread.author?._id || authorId,
      });
    }
  }, [selectedThread, id, authorId]);

  // Handle errors from the store
  useEffect(() => {
    if (error && id) {
      alert(`Failed to load thread: ${error}`);
    }
  }, [error, id]);

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with formData:", formData);

    if (!formData.title || !formData.content) {
      alert("Please fill in both Title and Content fields.");
      return;
    }

    if (!formData.author) {
      alert("Author ID not found. Please log in again.");
      return;
    }

    const payload = {
      title: formData.title,
      content: formData.content,
      author: formData.author,
    };

    try {
      // TODO: Replace with updateThread for editing when backend is ready
      await addMainThread(payload);
      alert("Thread saved successfully!");
      setFormData({ title: "", content: "", author: authorId });
      navigate(-1);
    } catch (error) {
      console.error("Failed to save thread:", error);
      alert(`Failed to save thread: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key="manage-forum"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        id="forum-page"
      >
        <div className="flex items-center justify-between border-b border-gray-300 p-4">
          <div className="flex items-center gap-4">
            <div
              className="bg-slate-100/80 h-9 w-9 inline-flex items-center justify-center rounded-lg cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <X className="h-5 w-5" />
            </div>
            <span className="text-lg font-medium">
              {id ? "Manage Forum Thread (Staff Only)" : "Add New Forum Thread (Staff Only)"}
            </span>
          </div>
          <Button
            type="submit"
            form="forum-form"
            className="bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-2"
            disabled={true} // Disabled as requested
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <PlusCircleIcon className="w-4 h-4" />
                {id ? "Save Thread" : "Add Thread"}
              </>
            )}
          </Button>
        </div>
        <div className="flex flex-row h-full bg-gray-100">
          <ScrollArea className="flex-1 border border-gray-300 bg-white h-[calc(100vh-120px)] rounded-md mx-6 mt-6 mb-6 p-4">
            <Card className="space-y-2 rounded-none border-none bg-none shadow-none">
              <CardHeader className="p-2">
                <CardTitle className="text-2xl underline">
                  {id ? "Edit thread details." : "Fill out all required fields."}
                </CardTitle>
                <CardDescription>
                  {id ? "Update the title and content for the forum thread." : "Provide the title and content for the new forum thread."}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2">
                <form id="forum-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="w-full space-y-2 relative">
                    <Label htmlFor="author" className="-ml-2">
                      <span className="bg-background inline-flex px-2">Author (Retrieves from your user account id)</span>
                    </Label>
                    <Input
                      id="author"
                      type="text"
                      value={formData.author}
                      disabled
                      placeholder="Author ID"
                    />
                  </div>
                  <div className="w-full space-y-2 relative">
                    <Label htmlFor="title" className="-ml-2">
                      <span className="bg-background inline-flex px-2">Title</span>
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, title: e.target.value }))
                      }
                      placeholder="Enter thread title"
                    />
                  </div>
                  <div className="w-full space-y-2 relative">
                    <Label htmlFor="content" className="-ml-2">
                      <span className="bg-background inline-flex px-2">Content</span>
                    </Label>
                    <Textarea
                      id="content"
                      placeholder="Enter thread content"
                      className="h-[200px]"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, content: e.target.value }))
                      }
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </ScrollArea>
          <div className="w-[400px] border-l bg-white border-gray-300 flex flex-col">
            <div className="flex items-start flex-row p-6 space-y-4">
              <div
                className="p-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800 space-y-3 w-full"
                role="alert"
              >
                <h1 className="font-bold text-xl">Code of Conduct</h1>
                <div>
                  <span className="font-medium text-md">
                    Ensure threads are professional, respectful, and relevant to hotel services. Avoid personal attacks, offensive language, or off-topic content. All posts are moderated and must comply with hotel policies.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}

export default Manage_Forum;