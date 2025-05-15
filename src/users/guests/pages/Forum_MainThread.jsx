import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { MessageSquare } from "lucide-react"
import { useForumStore } from "../stores/forums.store"

export default function ForumThreads() {
  const { forums, fetchAllForums, isLoading, error } = useForumStore()

  useEffect(() => {
    fetchAllForums()
  }, [])

  return (
    <div className="pt-24 container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Hotel Forums</h1>
        <p className="text-muted-foreground mt-2">Checkout the forums provided by our staffs.</p>
      </div>

      {isLoading && <p>Loading forums...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid gap-6">
        {forums.map((thread) => (
          <Link
            key={thread._id}
            to={`/user/onboard/forums/${thread._id}`}
            className="no-underline text-foreground"
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{thread.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {thread.content}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Thread ID: {thread._id}</span>
                </div>
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{thread.comments?.length || 0}</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
