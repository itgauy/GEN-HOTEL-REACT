import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import HotelDataTable from "../components/ForumManagement"; // Adjust path as needed
import { PlusCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import LandingSectionData from "../components/LandingSectionData";
import LandingFAQs from "../components/LandingFAQs";
import LandingDataTable from "../components/LandingData";
import LandingArticles from "../components/LandingArticles";
import useLandingStore from "../stores/landing.stores";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function CMS_Overview() {
  const [selectedThreads, setSelectedThreads] = useState([]);
  const [selectedLandingThreads, setSelectedLandingThreads] = useState([]);
  const [selectedFAQThreads, setSelectedFAQThreads] = useState([]);
  const [selectedArticleThreads, setSelectedArticleThreads] = useState([]);
  const [formData, setFormData] = useState({
    heroSectionTitle: "",
    featureTitle: "",
    featureSubtitle: "",
    featureContent: "",
    featureCtaLabel: "",
    featureCtaLink: "",
    faqQuestion: "",
    faqAnswer: "",
    articleTitle: "",
    articleAuthor: "",
    articleContent: "",
  });
  const navigate = useNavigate();
  const { landingData, articles, fetchLandingData, fetchArticlesData, putLandingData, createArticles, loading } = useLandingStore();

  useEffect(() => {
    fetchLandingData();
    fetchArticlesData();
  }, [fetchLandingData, fetchArticlesData]);

  // Debugging: Log the fetched data and set formData
  useEffect(() => {
    console.log("Fetched landing data in CMS_Overview:", landingData);
    console.log("Fetched articles in CMS_Overview:", articles);
    if (landingData.length > 0) {
      const data = landingData[0];
      setFormData((prev) => ({
        ...prev,
        heroSectionTitle: data.heroSection?.title || "",
        featureTitle: data.features?.[0]?.title || "",
        featureSubtitle: data.features?.[0]?.subtitle || "",
        featureContent: data.features?.[0]?.content || "",
        featureCtaLabel: data.features?.[0]?.callToAction?.label || "",
        featureCtaLink: data.features?.[0]?.callToAction?.link || "",
        faqQuestion: data.faqSection?.[0]?.question || "",
        faqAnswer: data.faqSection?.[0]?.answer || "",
      }));
    }
  }, [landingData, articles]);

  // Handle navigation based on section
  const handleNavigate = (section) => {
    console.log(`CMS_Overview: Navigating to add page for ${section}`);
    let path;
    switch (section) {
      case "landing":
        path = "/hms-admin/landing/add";
        break;
      case "features":
        path = "/hms-admin/landing/features/add";
        break;
      case "faqs":
        path = "/hms-admin/landing/faqs/add";
        break;
      case "articles":
        path = "/hms-admin/landing/articles/add";
        break;
      default:
        path = "/hms-admin/landing/add";
    }
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle PUT request for Landing Page (heroSection.title)
  const handleUpdateLanding = async () => {
    if (landingData.length === 0) return;
    const id = landingData[0]._id;
    const updatedData = {
      heroSection: { title: formData.heroSectionTitle },
    };
    await putLandingData(id, updatedData);
    alert("Landing page updated successfully!");
    window.location.reload();
  };

  // Handle PUT request for Features
  const handleUpdateFeature = async () => {
    if (landingData.length === 0) return;
    const id = landingData[0]._id;
    const updatedFeature = {
      callToAction: {
        label: formData.featureCtaLabel,
        link: formData.featureCtaLink,
      },
      title: formData.featureTitle,
      subtitle: formData.featureSubtitle,
      content: formData.featureContent,
    };
    const updatedData = {
      features: [...(landingData[0].features || []), updatedFeature],
    };
    await putLandingData(id, updatedData);
    alert("Feature section updated successfully!");
    window.location.reload();
  };

  // Handle PUT request for FAQs
  const handleUpdateFAQ = async () => {
    if (landingData.length === 0) return;
    const id = landingData[0]._id;
    const updatedFAQ = {
      question: formData.faqQuestion,
      answer: formData.faqAnswer,
    };
    const updatedData = {
      faqSection: [...(landingData[0].faqSection || []), updatedFAQ],
    };
    await putLandingData(id, updatedData);
    alert("FAQ section updated successfully!");
    window.location.reload();
  };

  // Handle POST request for Articles
  const handleCreateArticle = async () => {
    const newArticle = {
      title: formData.articleTitle,
      author: formData.articleAuthor,
      slug: "hotel-articles",
      content: [{ type: "paragraph", value: formData.articleContent }],
      status: "published",
      publishedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };
    await createArticles(newArticle);
    alert("Article created successfully!");
    setFormData((prev) => ({
      ...prev,
      articleTitle: "",
      articleAuthor: "",
      articleContent: "",
    }));
    window.location.reload();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <AnimatePresence mode="wait">
          {selectedThreads.length === 0 &&
            selectedLandingThreads.length === 0 &&
            selectedFAQThreads.length === 0 &&
            selectedArticleThreads.length === 0 ? (
            <motion.h2
              key="title"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1 }}
              className="text-xl font-bold tracking-tighter"
            >
              Content Management Module
            </motion.h2>
          ) : (
            <motion.div
              key="selection-alert"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1 }}
              className="rounded-md border border-red-400 bg-red-200/80 p-4 flex items-center justify-between w-[540px]"
            >
              <div className="flex items-start">
                <div className="mr-3 text-red-400">
                  <Info size={24} />
                </div>
                <div>
                  <p className="text-red-500">
                    You selected{" "}
                    {selectedThreads.length +
                      selectedLandingThreads.length +
                      selectedFAQThreads.length +
                      selectedArticleThreads.length}{" "}
                    {selectedThreads.length +
                      selectedLandingThreads.length +
                      selectedFAQThreads.length +
                      selectedArticleThreads.length === 1
                      ? "thread"
                      : "threads"}
                    .
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Landing Page</h3>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-1" /> {landingData.length === 0 ? "Add" : "Update"} Content
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Update Landing Page</AlertDialogTitle>
                  <AlertDialogDescription>
                    Update the title for the landing page hero section.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="heroSectionTitle" className="text-right">
                      Hero Title
                    </Label>
                    <Input
                      id="heroSectionTitle"
                      name="heroSectionTitle"
                      value={formData.heroSectionTitle}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleUpdateLanding} disabled={loading}>
                    {loading ? "Updating..." : "Update"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <LandingDataTable data={landingData} />
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Sections</h3>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-1" /> Add Content
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Update Feature Section</AlertDialogTitle>
                  <AlertDialogDescription>
                    Add or update a feature section for the landing page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="featureTitle" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="featureTitle"
                      name="featureTitle"
                      value={formData.featureTitle}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="featureSubtitle" className="text-right">
                      Subtitle
                    </Label>
                    <Input
                      id="featureSubtitle"
                      name="featureSubtitle"
                      value={formData.featureSubtitle}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="featureContent" className="text-right">
                      Content
                    </Label>
                    <Textarea
                      id="featureContent"
                      name="featureContent"
                      value={formData.featureContent}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="featureCtaLabel" className="text-right">
                      CTA Label
                    </Label>
                    <Input
                      id="featureCtaLabel"
                      name="featureCtaLabel"
                      value={formData.featureCtaLabel}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="featureCtaLink" className="text-right">
                      CTA Link
                    </Label>
                    <Input
                      id="featureCtaLink"
                      name="featureCtaLink"
                      value={formData.featureCtaLink}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleUpdateFeature} disabled={loading}>
                    {loading ? "Updating..." : "Update"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <LandingSectionData
            selectedItems={selectedThreads}
            setSelectedItems={setSelectedThreads}
          />
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Frequently Asked Questions
            </h3>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-1" /> Add Content
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Update FAQ Section</AlertDialogTitle>
                  <AlertDialogDescription>
                    Add or update an FAQ for the landing page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="faqQuestion" className="text-right">
                      Question
                    </Label>
                    <Input
                      id="faqQuestion"
                      name="faqQuestion"
                      value={formData.faqQuestion}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="faqAnswer" className="text-right">
                      Answer
                    </Label>
                    <Textarea
                      id="faqAnswer"
                      name="faqAnswer"
                      value={formData.faqAnswer}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleUpdateFAQ} disabled={loading}>
                    {loading ? "Updating..." : "Update"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <LandingFAQs
            selectedItems={selectedFAQThreads}
            setSelectedItems={setSelectedFAQThreads}
          />
        </div>

        {/* Articles Management */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Articles Management</h3>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-1" /> Add Content
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-[640px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Add Article</AlertDialogTitle>
                  <AlertDialogDescription>
                    Add a new article to display on the public page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="articleTitle" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="articleTitle"
                      name="articleTitle"
                      value={formData.articleTitle}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="articleAuthor" className="text-right">
                      Author
                    </Label>
                    <Input
                      id="articleAuthor"
                      name="articleAuthor"
                      value={formData.articleAuthor}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="articleContent" className="text-right">
                      Content
                    </Label>
                    <Textarea
                      id="articleContent"
                      name="articleContent"
                      value={formData.articleContent}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCreateArticle} disabled={loading}>
                    {loading ? "Creating..." : "Create"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <LandingArticles
            selectedItems={selectedArticleThreads}
            setSelectedItems={setSelectedArticleThreads}
          />
        </div>
      </div>
    </div>
  );
}

export default CMS_Overview;