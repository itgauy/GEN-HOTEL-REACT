import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Forward } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Heart } from "lucide-react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useArticleStore from "../stores/articles.stores"; // Adjust path as needed

function StaySuite_Public_Blog_Article() {
  const { id: articleId } = useParams(); // Get _id from URL
  const { article, fetchArticleById, loading, error } = useArticleStore();
  const defaultAvatar =
    "https://substackcdn.com/image/fetch/w_32,h_32,c_fill,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Favatars%2Fdefault-light.png";

  // Fetch article by _id on component mount
  useEffect(() => {
    if (articleId) {
      fetchArticleById(articleId);
    }
  }, [articleId, fetchArticleById]);

  // Format date to "Month DD, YYYY"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <p>Loading article...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!article) return <p>No article found.</p>;

  return (
    <section className="pt-28 pb-24 flex items-start flex-col mx-auto lg:container lg:max-w-[728px] space-y-8">
      <div id="article-introduction" className="space-y-3 flex flex-col items-start w-full">
        <div id="title" className="font-bold text-4xl break-words leading-tight">
          {article.title}
        </div>
        <div id="first-note-paragraph" className="text-lg text-slate-500">
          {article.summary || "No summary available."}
        </div>
        <div className="flex flex-row items-start space-x-3 select-none">
          <Avatar className="h-10 w-10">
            <AvatarImage src={article.avatarSrc || defaultAvatar} />
            <AvatarFallback>{article.author?.substring(0, 2).toUpperCase() || "AN"}</AvatarFallback>
          </Avatar>
          <div id="author" className="text-sm">
            <div id="name" className="hover:underline cursor-pointer">
              {article.author || "Anonymous"}
            </div>
            <div id="published-date" className="text-slate-500">
              {formatDate(article.publishedAt)}
            </div>
          </div>
        </div>
        <div className="pt-2 border-slate-300 border-b w-full" />
        
      </div>
      <div id="article-body" className="space-y-4">
        {article.content?.map((item, index) => (
          <div key={index}>
            {item.type === "paragraph" && (
              <div id="article-paragraph" className="text-lg">
                {item.value}
              </div>
            )}
            {/* {item.type === "image" && (
              <div id="article-single-image" className="w-full cursor-pointer select-none">
                <PhotoProvider>
                  <PhotoView src={item.value}>
                    <img
                      src={item.value}
                      alt={item.alt || "Article image"}
                      className="w-full h-full object-cover aspect-video rounded-lg"
                    />
                  </PhotoView>
                </PhotoProvider>
              </div>
            )} */}
          </div>
        ))}
      </div>
      <div id="article-footer" className="w-full border-y border-slate-300">
        <div className="py-16 flex items-center justify-center text-center flex-col space-y-4">
          <div id="last-note">Thanks for reading! Subscribe for free to receive new posts.</div>
          <div className="w-[320px] select-none">
            <div className="*:not-first:mt-2">
              <div className="flex rounded-md shadow-xs">
                <Input
                  id=""
                  className="-me-px flex-1 rounded-e-none border-black shadow-none focus-visible:z-10"
                  placeholder="Email"
                  type="email"
                />
                <button className="border-black bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex items-center rounded-e-md border px-3 text-sm font-medium transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-[480px] break-words text-gray-500">
            <Label>
              By subscribing, I agree to StaySuite's Terms of Use, and acknowledge its Information
              Collection Notice and Privacy Policy.
            </Label>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StaySuite_Public_Blog_Article;