import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, ThumbsUp, ArrowLeft, LoaderCircle } from "lucide-react"
import { useForumStore } from "../stores/forums.store"
import { format } from "date-fns"

export default function ForumSubThread() {
  const { id } = useParams()
  const [replyText, setReplyText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false) // Local state for reply submission

  // Destructure from Zustand store
  const {
    selectedForum,
    fetchForumById,
    isLoading,
    error,
    postUserComment,
  } = useForumStore()

  useEffect(() => {
    console.log("Fetching forum with ID:", id)
    fetchForumById(id)
  }, [id, fetchForumById])

  useEffect(() => {
    if (selectedForum) {
      console.log("Selected forum updated:", selectedForum)
      console.log("Forum dateCreated:", selectedForum.dateCreated)
    }
  }, [selectedForum])

  const handleReplySubmit = async () => {
    console.log("Attempting to submit reply with text:", replyText)
    setIsSubmitting(true) // Show spinner

    const authData = localStorage.getItem("auth-storage")
    if (!authData) {
      console.error("No auth data found in localStorage")
      setIsSubmitting(false) // Hide spinner
      return alert("User not authenticated.")
    }

    const parsed = JSON.parse(authData)
    const userId = parsed?.state?.user?._id
    if (!userId) {
      console.error("Invalid user ID in auth data:", parsed)
      setIsSubmitting(false) // Hide spinner
      return alert("Invalid user ID in localStorage.")
    }
    if (!replyText.trim()) {
      console.error("Reply text is empty")
      setIsSubmitting(false) // Hide spinner
      return alert("Reply cannot be empty.")
    }

    const payload = {
      threadId: id,
      content: replyText.trim(),
      author: userId,
    }
    console.log("Submitting reply payload:", payload)

    try {
      await postUserComment(payload)
      console.log("Reply submitted successfully")
      alert("Reply submitted successfully.")
      setReplyText("") // Clear the textarea
      await fetchForumById(id) // Refresh the forum to get updated comments
    } catch (error) {
      console.error("Error submitting reply:", error)
      alert("Failed to submit reply.")
    } finally {
      setIsSubmitting(false) // Hide spinner
    }
  }

  // Show spinner during reply submission
  if (isSubmitting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="animate-spin text-black" size={32} />
      </div>
    )
  }

  // Existing loading and error states from store
  if (isLoading) return <div className="pt-24 container">Loading thread...</div>
  if (error) return <div className="pt-24 container">Error: {error}</div>
  if (!selectedForum) return <div className="pt-24 container">Thread not found...</div>

  return (
    <div className="pt-24 container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link to="/user/onboard/forums/">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to forums
          </Button>
        </Link>
      </div>

      {/* Main thread */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{selectedForum.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground whitespace-pre-line">{selectedForum.content}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="text-sm text-muted-foreground">
            Date Created:{" "}
            {selectedForum.dateCreated
              ? format(new Date(selectedForum.dateCreated), "MM/dd/yyyy 'at' h:mm a 'PST'")
              : "Unknown"}
          </span>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{selectedForum.comments?.length || 0}</span>
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Replies */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Replies ({selectedForum.comments?.length || 0})</h2>
        <div className="grid gap-4">
          {selectedForum.comments?.map((reply) => (
            <Card key={reply._id} className="hover:shadow-sm transition-shadow">
              <CardContent className="pt-6">
                <p className="text-md">{reply.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Date Created:{" "}
                  {reply.createdAt
                    ? format(new Date(reply.createdAt), "MM/dd/yyyy 'at' h:mm a")
                    : "Unknown"}
                </span>
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{reply.likes || 0}</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Reply form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add a reply</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full min-h-[100px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Write your reply here..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleReplySubmit} disabled={isSubmitting}>
            Submit Reply
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}