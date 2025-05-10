import { Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

function Booking_Assistance_Forums() {
  const navigate = useNavigate()

  const forumThreads = [
    {
      id: 1,
      title: "Comment on feature request can't be sent",
      description: "Please fix the issue when someone wants to post a comment. I tried this...",
      timeAgo: "2 days ago",
      tags: [
        { name: "Bug", variant: "destructive" },
        { name: "Completed", variant: "success" },
      ],
      commentCount: 1,
    },
    {
      id: 2,
      title: "Team building 2023",
      description: "Hey everybody 👋 Here we will discuss about potential places to visit this year...",
      timeAgo: "3 days ago",
      tags: [
        { name: "Team", variant: "primary" },
        { name: "To discuss", variant: "secondary" },
      ],
      commentCount: 64,
    },
    {
      id: 3,
      title: "UX mistakes",
      description: "",
      timeAgo: "Apr 14",
      tags: [
        { name: "Bug", variant: "destructive" },
        { name: "Completed", variant: "success" },
      ],
      commentCount: 5,
    },
  ]

  const handleThreadClick = (threadId) => {
    navigate(`/assistance-admin/forum-thread/${threadId}`)
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Select defaultValue="recent">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recent</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search" className="w-[240px] pl-8" />
        </div>
      </div>

      <div className="space-y-4">
        {forumThreads.map((thread) => (
          <Card
            key={thread.id}
            className="cursor-pointer hover:bg-accent/10 transition-colors"
            onClick={() => handleThreadClick(thread.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">{thread.id}</span>
                    <h3 className="font-medium">{thread.title}</h3>
                  </div>
                  {thread.description && <p className="text-sm text-muted-foreground mt-1">{thread.description}</p>}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {thread.tags.map((tag, index) => (
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
                          tag.variant === "success"
                            ? "text-green-600 bg-green-100 hover:bg-green-200 border-green-200"
                            : ""
                        }
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-muted-foreground">{thread.timeAgo}</span>
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span className="text-xs text-muted-foreground">{thread.commentCount}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Booking_Assistance_Forums;