import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import useArticleStore from "../stores/articles.stores"; // Adjust path as needed

function StaySuite_Public_Blogs() {
  const { articles, fetchArticles, loading, error } = useArticleStore();

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Format date to DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <section className="pt-28 pb-24 flex items-start flex-col mx-auto lg:container space-y-8">
      <div id="landing-banner" className="space-y-3">
        <div id="staysuite-offers" className="space-x-2 mb-8">
          <Badge
            variant="outline"
            className="rounded-full border-slate-400 p-2 font-normal text-sm"
          >
            Knowledge
          </Badge>
          <Badge
            variant="outline"
            className="rounded-full border-slate-400 p-2 font-normal text-sm"
          >
            Article Blogs
          </Badge>
        </div>
        <div id="landing-text">
          <span className="block lg:text-8xl font-extrabold max-w-[840px] break-words tracking-tight leading-none">
            Dive Into Our Insider Useful Tips.
          </span>
        </div>
      </div>

      {/* Dynamic Data */}
      {loading && <p>Loading articles...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && articles.length === 0 && <p>No articles found.</p>}

      <div className="pt-20 w-full grid grid-cols-2 gap-6 mb-12">
        {articles.map((article) => (
          <div
            key={article._id}
            className="border border-slate-500 hover:bg-gray-100 rounded-xl p-5"
          >
            <Link to={`/story/${article._id}`}>
              <div className="leading-8 space-y-4">
                <div id="article-topic" className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.length === 0 ? (
                      <Badge
                        variant="outline"
                        className="rounded-full border-slate-400 p-2 font-medium text-xs"
                      >
                        Article Blog
                      </Badge>
                    ) : (
                      <>
                        {article.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="rounded-full border-slate-400 p-2 font-medium text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {article.tags.length > 3 && (
                          <Badge
                            variant="outline"
                            className="rounded-full border-slate-400 p-2 font-medium text-xs"
                          >
                            +{article.tags.length - 3}
                          </Badge>
                        )}
                      </>
                    )}
                  </div>
                  <span className="text-xl font-bold line-clamp-3">
                    {article.title}
                  </span>
                  <p className="text-gray-500">
                    Published Date: {formatDate(article.publishedAt)}
                    {article.lastUpdated && (
                      <span>
                        {" | Last Updated: "}
                        {formatDate(article.lastUpdated)}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StaySuite_Public_Blogs;