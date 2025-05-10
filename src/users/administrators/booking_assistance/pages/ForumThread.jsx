import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, MessageSquare, ThumbsUp, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

function ForumThread() {
  const navigate = useNavigate()
  const { threadId: paramThreadId } = useParams()
  const threadId = Number(paramThreadId) || 1

  const threadData = {
    id: threadId,
    title:
      threadId === 1
        ? "Comment on feature request can't be sent"
        : threadId === 2
        ? "Team building 2023"
        : "UX mistakes",
    description:
      threadId === 1
        ? "Please fix the issue when someone wants to post a comment..."
        : threadId === 2
        ? "Hey everybody 👋 Here we will discuss..."
        : "We need to address several UX issues...",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
      role: "Product Manager",
    },
    timeAgo: threadId === 1 ? "2 days ago" : threadId === 2 ? "3 days ago" : "Apr 14",
    tags:
      threadId === 1
        ? [
            { name: "Bug", variant: "destructive" },
            { name: "Completed", variant: "success" },
          ]
        : threadId === 2
        ? [
            { name: "Team", variant: "primary" },
            { name: "To discuss", variant: "secondary" },
          ]
        : [
            { name: "Bug", variant: "destructive" },
            { name: "Completed", variant: "success" },
          ],
    comments: [
      {
        id: 1,
        author: {
          name: "Sarah Miller",
          avatar: "/placeholder.svg",
          role: "Developer",
        },
        content: "I've identified the issue...",
        timeAgo: "1 day ago",
        likes: 3,
      },
      {
        id: 2,
        author: {
          name: "David Chen",
          avatar: "/placeholder.svg",
          role: "UX Designer",
        },
        content: "Thanks for reporting this...",
        timeAgo: "2 days ago",
        likes: 1,
      },
    ],
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Button variant="ghost" className="mb-4 pl-2 flex items-center gap-1" onClick={() => navigate("/assistance-admin/forums")}>
        <ArrowLeft className="h-4 w-4" />
        Back to Forums
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{threadData.title}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={threadData.author.avatar} alt={threadData.author.name} />
                  <AvatarFallback>{threadData.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{threadData.author.name}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{threadData.timeAgo}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {threadData.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant={
                    tag.variant === "destructive"
                      ? "destructive"
                      : tag.variant === "success"
                      ? "outline"
                      : tag.variant === "primary"
                      ? "default"
                      : "secondary"
                  }
                  className={
                    tag.variant === "success" ? "text-green-600 bg-green-100 hover:bg-green-200 border-green-200" : ""
                  }
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{threadData.description}</p>

          <Separator className="my-6" />

          <div className="space-y-6">
            <h3 className="text-lg font-medium">Comments ({threadData.comments.length})</h3>

            {threadData.comments.map((comment) => (
              <div key={comment.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{comment.author.name}</div>
                    <div className="text-xs text-muted-foreground">{comment.author.role}</div>
                  </div>
                  <span className="text-xs text-muted-foreground ml-auto">{comment.timeAgo}</span>
                </div>
                <p className="text-sm mb-3">{comment.content}</p>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {comment.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full space-y-4">
            <Textarea placeholder="Add a comment..." className="w-full" />
            <div className="flex justify-end">
              <Button>Post Comment</Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ForumThread
