import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PlusCircleIcon,
  X,
  AlertCircleIcon,
  FileArchiveIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  Trash2Icon,
  UploadIcon,
  VideoIcon,
  XIcon,
  LoaderCircle,
  Info,
  ChevronDownIcon,
  CheckIcon
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useRoomImageStore from "../stores/room_image.store";
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MinusIcon, PlusIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/multi-select";
import useRoomDataStore from "../stores/room_data.store";
import { motion, AnimatePresence } from "motion/react";
import useBrgyStore from "../stores/brgy_data.store";
import { cn } from "@/lib/utils";

const amenitiesOffer = [
  { label: "Wi-Fi", value: "wifi", details: "Unlimited high-speed internet access" },
  { label: "Air Conditioning", value: "ac", details: "Climate control system" },
  { label: "Television", value: "tv", details: "Flat-screen TV with cable channels" },
  { label: "Mini Bar", value: "minibar", details: "Stocked mini refrigerator" },
  { label: "Balcony", value: "balcony", details: "Private outdoor balcony" },
  { label: "Refrigerator", value: "refrigerator", details: "Full-size refrigerator" },
  { label: "Microwave", value: "microwave", details: "Microwave oven" },
  { label: "Kitchenette", value: "kitchenette", details: "Small kitchen area" },
  { label: "In-room Safe", value: "safe", details: "Secure in-room safe" },
  { label: "Closet / Wardrobe", value: "closet", details: "Spacious wardrobe" },
  { label: "Work Desk", value: "workdesk", details: "Desk for work or study" },
  { label: "Queen Bed", value: "queen_bed", details: "Queen-size bed" },
  { label: "King Bed", value: "king_bed", details: "King-size bed" },
  { label: "Sofa Bed", value: "sofa_bed", details: "Convertible sofa bed" },
  { label: "Linens Provided", value: "linens", details: "Fresh bed linens" },
  { label: "Extra Pillows/Blankets", value: "extra_bedding", details: "Additional bedding available" },
  { label: "Private Bathroom", value: "private_bathroom", details: "En-suite bathroom" },
  { label: "Bathtub", value: "bathtub", details: "Bathtub in bathroom" },
  { label: "Shower", value: "shower", details: "Walk-in shower" },
  { label: "Toiletries Provided", value: "toiletries", details: "Complimentary toiletries" },
  { label: "Hair Dryer", value: "hair_dryer", details: "Hair dryer provided" },
  { label: "Towels Provided", value: "towels", details: "Fresh towels provided" },
  { label: "Room Service", value: "room_service", details: "24-hour room service" },
  { label: "Daily Housekeeping", value: "housekeeping", details: "Daily cleaning service" },
  { label: "Laundry Service", value: "laundry_service", details: "On-site laundry service" },
  { label: "Iron & Ironing Board", value: "iron_board", details: "Iron and ironing board" },
  { label: "Smart TV", value: "smart_tv", details: "Smart TV with streaming apps" },
  { label: "Streaming Access", value: "streaming", details: "Access to streaming services" },
  { label: "Phone", value: "phone", details: "In-room telephone" },
  { label: "Dining Table", value: "dining_table", details: "Dining table for meals" },
  { label: "Washer & Dryer", value: "washer_dryer", details: "In-unit washer and dryer" },
  { label: "Full Kitchen", value: "full_kitchen", details: "Fully equipped kitchen" },
  { label: "Wheelchair Accessible", value: "accessible", details: "Wheelchair-friendly room" },
  { label: "Smoke Detector", value: "smoke_detector", details: "Smoke detection system" },
  { label: "Fire Extinguisher", value: "fire_extinguisher", details: "Fire extinguisher in room" },
  { label: "First Aid Kit", value: "first_aid_kit", details: "Basic first aid supplies" }
];

const getFileIcon = (file) => {
  const fileType = file.file instanceof File ? file.file.type : file.file.type;
  const fileName = file.file instanceof File ? file.file.name : file.file.name;

  if (
    fileType.includes("pdf") ||
    fileName.endsWith(".pdf") ||
    fileType.includes("word") ||
    fileName.endsWith(".doc") ||
    fileName.endsWith(".docx")
  ) {
    return <FileTextIcon className="size-4 opacity-60" />;
  } else if (
    fileType.includes("zip") ||
    fileType.includes("archive") ||
    fileName.endsWith(".zip") ||
    fileName.endsWith(".rar")
  ) {
    return <FileArchiveIcon className="size-4 opacity-60" />;
  } else if (
    fileType.includes("excel") ||
    fileName.endsWith(".xls") ||
    fileName.endsWith(".xlsx")
  ) {
    return <FileSpreadsheetIcon className="size-4 opacity-60" />;
  } else if (fileType.includes("video/")) {
    return <VideoIcon className="size-4 opacity-60" />;
  } else if (fileType.includes("audio/")) {
    return <HeadphonesIcon className="size-4 opacity-60" />;
  } else if (fileType.startsWith("image/")) {
    return <ImageIcon className="size-4 opacity-60" />;
  }
  return <FileIcon className="size-4 opacity-60" />;
};

const initialFiles = [];

function Add_New_Room() {
  const navigate = useNavigate();
  const { addRoomData, isLoading } = useRoomDataStore();
  const { barangays, fetchBarangays, loading } = useBrgyStore();
  const [open, setOpen] = useState(false);

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },
  };

  const [formData, setFormData] = useState({
    hotel_type: "",
    room_status: "Available",
    slot_availability: 0,
    adults: 0,
    children: 0,
    infants: 0,
    room_title: "",
    street: "",
    subdivision_village: "",
    brgy: "",
    city: "",
    province: "",
    postalcode: "",
    initial_price_per_night: "",
    amenities: [],
    additional_details: "",
    comments: "",
  });

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadLogs, setUploadLogs] = useState([]);
  const [isProceedDisabled, setIsProceedDisabled] = useState(true);
  const maxSize = 10 * 1024 * 1024;
  const maxFiles = 10;
  const { uploadImages, isUploading, error } = useRoomImageStore();

  const [counts, setCounts] = useState({
    slot: 0,
    adult: 0,
    child: 0,
    infant: 0,
  });

  const totalOccupants = counts.adult + counts.child + counts.infant;

  useEffect(() => {
    const checkUploadedImages = () => {
      try {
        const storedImages = localStorage.getItem("lastUploadedImageIds");
        if (storedImages) {
          const imageIds = JSON.parse(storedImages);
          if (Array.isArray(imageIds) && imageIds.length > 0) {
            console.log("lastUploadedImageIds found, enabling Proceed button:", imageIds);
            setIsProceedDisabled(false);
          } else {
            console.log("lastUploadedImageIds is empty or invalid, disabling Proceed button");
            setIsProceedDisabled(true);
          }
        } else {
          console.log("lastUploadedImageIds not found in localStorage, disabling Proceed button");
          setIsProceedDisabled(true);
        }
      } catch (err) {
        console.error("Error parsing lastUploadedImageIds:", err);
        setIsProceedDisabled(true);
      }
    };

    checkUploadedImages();
  }, []);

  const handleCountChange = (type, operation) => {
    if (type === "slot") {
      setCounts((prev) => {
        let newSlot =
          operation === "increment"
            ? prev.slot + 1
            : prev.slot > 0
              ? prev.slot - 1
              : 0;

        if (newSlot === 0) {
          setFormData((prev) => ({
            ...prev,
            slot_availability: 0,
            adults: 0,
            children: 0,
            infants: 0,
          }));
          return { slot: 0, adult: 0, child: 0, infant: 0 };
        }

        const totalOccupants = prev.adult + prev.child + prev.infant;
        if (newSlot < totalOccupants) {
          const scale = newSlot / totalOccupants;
          const newCounts = {
            slot: newSlot,
            adult: Math.floor(prev.adult * scale),
            child: Math.floor(prev.child * scale),
            infant: Math.floor(prev.infant * scale),
          };
          setFormData((prev) => ({
            ...prev,
            slot_availability: newSlot,
            adults: newCounts.adult,
            children: newCounts.child,
            infants: newCounts.infant,
          }));
          return newCounts;
        }

        setFormData((prev) => ({ ...prev, slot_availability: newSlot }));
        return { ...prev, slot: newSlot };
      });
      return;
    } else {
      if (counts.slot === 0) {
        alert("Please fill in slot availability first.");
        return;
      }

      if (operation === "increment") {
        if (totalOccupants >= counts.slot) {
          alert("Total occupants cannot exceed slot availability.");
          return;
        }
        setCounts((prev) => {
          const newCount = { ...prev, [type]: prev[type] + 1 };
          setFormData((prevForm) => ({
            ...prevForm,
            [type === "adult" ? "adults" : type === "child" ? "children" : "infants"]: newCount[type],
          }));
          return newCount;
        });
      } else {
        setCounts((prev) => {
          const newCount = {
            ...prev,
            [type]: prev[type] > 0 ? prev[type] - 1 : 0,
          };
          setFormData((prevForm) => ({
            ...prevForm,
            [type === "adult" ? "adults" : type === "child" ? "children" : "infants"]: newCount[type],
          }));
          return newCount;
        });
      }
    }
  };

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    multiple: true,
    maxFiles,
    maxSize,
    initialFiles: [],
  });

  const handleOpenChange = (open) => {
    setUploadDialogOpen(open);
    if (!open) {
      setUploadLogs([]);
    }
  };

  const getProcessedById = () => {
    try {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        return parsed.state?.user?._id || null;
      }
      console.log("auth-storage not found in localStorage");
      return null;
    } catch (err) {
      console.error("Error parsing auth-storage:", err);
      return null;
    }
  };

  const processedById = getProcessedById();

  const handleFileUpload = async () => {
    console.log("Files to upload:", files.map((f) => f.file.name));
    if (files.length === 0) {
      console.log("No files selected for upload");
      setUploadLogs(["No files selected for upload."]);
      return;
    }

    if (!processedById) {
      console.log("Error: User ID not found in auth-storage");
      setUploadLogs(["Error: User ID not found in auth-storage."]);
      return;
    }

    setUploadLogs([`Starting upload for ${files.length} file(s)...`]);
    console.log(`Uploading ${files.length} file(s) with processedById: ${processedById}`);

    const filesToUpload = files.map((file) => file.file);

    try {
      const uploadedImageIds = await uploadImages(filesToUpload, processedById);
      console.log("Upload successful, IDs:", uploadedImageIds);

      const successLogs = files.map((file, index) => {
        const fileName = file.file.name;
        const fileSize = formatBytes(file.file.size);
        const imageId = uploadedImageIds[index] || "N/A";
        return `Uploading: ${fileName}\nStatus: Complete (${fileSize})\nID: ${imageId}`;
      });

      setUploadLogs([...successLogs]);
      alert("File upload successfully! You can now proceed to fill out more missing information.");

      localStorage.setItem("lastUploadedImageIds", JSON.stringify(uploadedImageIds));
      console.log("lastUploadedImageIds updated in localStorage:", uploadedImageIds);
      setIsProceedDisabled(false);
      console.log("Proceed button enabled after successful upload");

      clearFiles();
    } catch (err) {
      const errorLog = `Upload failed: ${err.message || "Unknown error"}`;
      setUploadLogs((prev) => [...prev, errorLog]);
      console.log("Error log set:", errorLog);
    }
  };

  useEffect(() => {
    if (uploadDialogOpen && files.length > 0) {
      console.log("Dialog opened, triggering upload");
      handleFileUpload();
    }
  }, [uploadDialogOpen, files.length]);

  // Fetch barangays on component mount
  useEffect(() => {
    fetchBarangays();
  }, [fetchBarangays]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with formData:", formData);

    const requiredFields = [
      "hotel_type",
      "slot_availability",
      "room_title",
      
      "initial_price_per_night",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      console.log("Missing required fields:", missingFields);
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    let lastUploadedImageIds = [];
    try {
      const storedImages = localStorage.getItem("lastUploadedImageIds");
      if (storedImages) {
        lastUploadedImageIds = JSON.parse(storedImages);
        if (!Array.isArray(lastUploadedImageIds) || lastUploadedImageIds.length === 0) {
          console.log("No valid images found in lastUploadedImageIds");
          alert("Please upload at least one image before proceeding.");
          return;
        }
      } else {
        console.log("lastUploadedImageIds not found in localStorage");
        alert("Please upload at least one image before proceeding.");
        return;
      }
    } catch (err) {
      console.error("Error parsing lastUploadedImageIds:", err);
      alert("Error retrieving uploaded images. Please try uploading again.");
      return;
    }

    if (!processedById) {
      console.log("Error: processed_by_id not found");
      alert("Error: User ID not found. Please log in again.");
      return;
    }

    const amenities_offer = formData.amenities.map((value) => {
      const amenity = amenitiesOffer.find((opt) => opt.value === value);
      return {
        amenities_name: amenity.label,
        offer_details: amenity.details,
      };
    });

    const payload = {
      hotel_type: formData.hotel_type,
      room_status: formData.room_status,
      slot_availability: formData.slot_availability,
      location: {
        street: formData.street,
        subdivision_village: formData.subdivision_village,
        brgy: formData.brgy,
        city: formData.city,
        province: formData.province,
        postalcode: parseInt(formData.postalcode, 10),
      },
      room_details: [
        {
          room_title: formData.room_title,
          room_images: lastUploadedImageIds,
          room_availability: {
            adults: formData.adults,
            children: formData.children,
            infants: formData.infants,
          },
          initial_price_per_night: parseFloat(formData.initial_price_per_night),
          amenities_offer,
        },
      ],
      action: "Add New Data - Room Management",
      comments: formData.comments || formData.additional_details,
      processed_by_id: processedById,
    };

    console.log("Submitting payload to addRoomData:", payload);

    try {
      const response = await addRoomData(payload);
      console.log("Room data posted successfully:", response);
      alert("Room data added successfully!");
      setFormData({
        hotel_type: "",
        room_status: "Available",
        slot_availability: 0,
        adults: 0,
        children: 0,
        infants: 0,
        room_title: "",
        street: "",
        subdivision_village: "",
        brgy: "",
        city: "",
        province: "",
        postalcode: "",
        initial_price_per_night: "",
        amenities: [],
        additional_details: "",
        comments: "",
      });
      setCounts({ slot: 0, adult: 0, child: 0, infant: 0 });
      localStorage.removeItem("lastUploadedImageIds");
      setIsProceedDisabled(true);
      console.log("lastUploadedImageIds cleared, Proceed button disabled");
      navigate(-1);
    } catch (error) {
      console.error("Failed to post room data:", error);
      alert(`Failed to add room data: ${error.message}`);
    }
  };

  // Rest of the component (rendering, file upload, etc.) remains unchanged
  return (
    <AnimatePresence mode="wait">
      <motion.section
        key="add-new-room"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        id="welcome-page"
      >
        <section id="welcome-page">
          <div className="flex items-center justify-between border-b border-gray-300 p-4">
            <div className="flex items-center gap-4">
              <div
                className="bg-slate-100/80 h-9 w-9 inline-flex items-center justify-center rounded-lg cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <X className="h-5 w-5" />
              </div>
              <span className="text-lg font-medium">
                Hotel Room / Condominium (Add New Data)
              </span>
            </div>
            <Button
              type="submit"
              form="room-form"
              disabled={isProceedDisabled}
              className="bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <PlusCircleIcon className="w-4 h-4" />
                  Proceed
                </>
              )}
            </Button>
          </div>
          <div className="flex flex-row h-full bg-gray-100">
            <ScrollArea className="flex-1 border border-gray-300 bg-white h-[calc(100vh-120px)] rounded-md mx-6 mt-6 mb-6 p-4">
              <Card className="space-y-2 rounded-none border-none bg-none shadow-none">
                <CardHeader className="p-2">
                  <CardTitle className="text-2xl underline">
                    Fill out all required fields.
                  </CardTitle>
                  <CardDescription>
                    Provide all information for hotel room or condominium needed.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2">
                  <form id="room-form" onSubmit={handleSubmit} className="space-y-4">
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="room-type" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Room Type
                        </span>
                      </label>
                      <Select
                        value={formData.hotel_type}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, hotel_type: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Specify the staycation type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hotel Room">Hotel Room</SelectItem>
                          <SelectItem value="Hotel Condominium">
                            Hotel Condominium
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="status" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Status
                        </span>
                      </label>
                      <Input
                        id="status"
                        type="text"
                        value={formData.room_status}
                        disabled
                      />
                    </div>
                    <div id="sub-header" className="space-y-2">
                      <h1 className="font-bold text-xl tracking-tight">
                        Availability
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        Provide minimum area spaces that this hotel stay vacation
                        offers
                      </p>
                    </div>
                    <div className="border border-slate-300 rounded-lg grid grid-cols-4 gap-4 items-center">
                      <div className="space-y-2 border-r border-slate-300 p-4">
                        <Label className="text-foreground text-sm font-medium">
                          Capacity (required)
                        </Label>
                        <div className="border-input relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-focus-within:ring-[3px]">
                          <Button
                            type="button"
                            size="icon"
                            onClick={() => handleCountChange("slot", "decrement")}
                            disabled={counts.slot === 0}
                            className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <MinusIcon size={16} aria-hidden="true" />
                          </Button>
                          <Input
                            className="bg-background text-foreground w-full grow px-3 py-2 text-center rounded-none"
                            value={counts.slot}
                            readOnly
                          />
                          <Button
                            type="button"
                            size="icon"
                            onClick={() => handleCountChange("slot", "increment")}
                            className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <PlusIcon size={16} aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-foreground text-sm font-medium">
                          Adults
                        </Label>
                        <div className="border-input relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-focus-within:ring-[3px]">
                          <Button
                            type="button"
                            size="icon"
                            onClick={() => handleCountChange("adult", "decrement")}
                            disabled={counts.slot === 0 || counts.adult === 0}
                            className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <MinusIcon size={16} aria-hidden="true" />
                          </Button>
                          <Input
                            className="bg-background text-foreground w-full grow px-3 py-2 text-center rounded-none"
                            value={counts.adult}
                            readOnly
                          />
                          <Button
                            type="button"
                            size="icon"
                            onClick={() => handleCountChange("adult", "increment")}
                            disabled={counts.slot === 0 || totalOccupants >= counts.slot}
                            className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <PlusIcon size={16} aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-foreground text-sm font-medium">
                          Children
                        </Label>
                        <div className="border-input relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-focus-within:ring-[3px]">
                          <Button
                            type="button"
                            size="icon"
                            onClick={() => handleCountChange("child", "decrement")}
                            disabled={counts.slot === 0 || counts.child === 0}
                            className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <MinusIcon size={16} aria-hidden="true" />
                          </Button>
                          <Input
                            className="bg-background text-foreground w-full grow px-3 py-2 text-center rounded-none"
                            value={counts.child}
                            readOnly
                          />
                          <Button
                            type="button"
                            size="icon"
                            onClick={() => handleCountChange("child", "increment")}
                            disabled={counts.slot === 0 || totalOccupants >= counts.slot}
                            className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <PlusIcon size={16} aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2 pr-4">
                        <Label className="text-foreground text-sm font-medium">
                          Infants
                        </Label>
                        <div className="border-input relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-focus-within:ring-[3px]">
                          <Button
                            type="button"
                            size="icon"
                            onClick={() => handleCountChange("infant", "decrement")}
                            disabled={counts.slot === 0 || counts.infant === 0}
                            className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <MinusIcon size={16} aria-hidden="true" />
                          </Button>
                          <Input
                            className="bg-background text-foreground w-full grow px-3 py-2 text-center rounded-none"
                            value={counts.infant}
                            readOnly
                          />
                          <Button
                            type="button"
                            size="icon"
                            onClick={() => handleCountChange("infant", "increment")}
                            disabled={counts.slot === 0 || totalOccupants >= counts.slot}
                            className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <PlusIcon size={16} aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div id="sub-header" className="space-y-2">
                      <h1 className="font-bold text-xl tracking-tight">
                        Room Details
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        Important details within stay vacation or room presents
                        here.
                      </p>
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="room-title" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Title
                        </span>
                      </label>
                      <Input
                        id="room-title"
                        type="text"
                        value={formData.room_title}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, room_title: e.target.value }))
                        }
                        placeholder="Enter room title"
                      />
                    </div>
                    {/* <div id="sub-header" className="space-y-2">
                      <h1 className="font-bold text-xl tracking-tight">
                        Location (Full Address)
                      </h1>
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="street" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Street
                        </span>
                      </label>
                      <Input
                        id="street"
                        type="text"
                        value={formData.street}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, street: e.target.value }))
                        }
                        placeholder="Enter street address"
                      />
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="subdivision-village" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Subdivision / Village (if necessary)
                        </span>
                      </label>
                      <Input
                        id="subdivision-village"
                        type="text"
                        value={formData.subdivision_village}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            subdivision_village: e.target.value,
                          }))
                        }
                        placeholder="Enter subdivision or village"
                      />
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="province" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Province
                        </span>
                      </label>
                      <Select
                        value={formData.province}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, province: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Provide location..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Metro Manila">Metro Manila</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="city" className="-ml-2">
                        <span className="bg-background inline-flex px-2">City</span>
                      </label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, city: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Provide location..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Quezon City">Quezon City</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="brgy" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Barangay
                        </span>
                      </label>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            id="brgy"
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                          >
                            <span className={cn("truncate", !formData.brgy && "text-muted-foreground")}>
                              {formData.brgy || "Select barangay"}
                            </span>
                            <ChevronDownIcon
                              size={16}
                              className="text-muted-foreground/80 shrink-0"
                              aria-hidden="true"
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
                          align="start"
                        >
                          <Command>
                            <CommandInput placeholder="Search barangay..." />
                            <CommandList>
                              {loading ? (
                                <CommandEmpty>Loading...</CommandEmpty>
                              ) : (
                                <>
                                  <CommandEmpty>No barangay found.</CommandEmpty>
                                  <CommandGroup>
                                    {barangays.map((barangay) => (
                                      <CommandItem
                                        key={barangay.code}
                                        value={barangay.name}
                                        onSelect={(currentValue) => {
                                          setFormData((prev) => ({
                                            ...prev,
                                            brgy: currentValue === formData.brgy ? "" : currentValue,
                                          }));
                                          setOpen(false);
                                        }}
                                      >
                                        {barangay.name}
                                        {formData.brgy === barangay.name && (
                                          <CheckIcon size={16} className="ml-auto" />
                                        )}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </>
                              )}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="postalcode" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Postal / Zip code
                        </span>
                      </label>
                      <Input
                        id="postalcode"
                        type="text"
                        value={formData.postalcode}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, postalcode: e.target.value }))
                        }
                        placeholder="Enter postal code"
                      />
                    </div>
                    <div
                      className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800 space-x-3"
                      role="alert"
                    >
                      <Info />
                      <div>
                        <span className="font-medium text-base">
                          Tips:{" "}
                          <Link
                            className="hover:underline"
                            to="https://phlpost.gov.ph/zip-code-locator/"
                            target="_blank"
                          >
                            Check here latest postal / zip codes
                          </Link>
                        </span>
                      </div>
                    </div> */}
                    <div id="sub-header" className="space-y-2">
                      <h1 className="font-bold text-xl tracking-tight">
                        Room Amenities
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        This are following details that this stay vacation / room
                        offers.
                      </p>
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="amenities" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Specify that can this staycation offers:
                        </span>
                      </label>
                      <MultiSelect
                        options={amenitiesOffer}
                        onValueChange={(selectedValues) =>
                          setFormData((prev) => ({ ...prev, amenities: selectedValues }))
                        }
                        value={formData.amenities}
                        placeholder="Select amenities"
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                        containerSize="lg"
                      />
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="additional-details" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Additional Details
                        </span>
                      </label>
                      <Textarea
                        id="additional-details"
                        placeholder="Type your message here."
                        className="h-[200px]"
                        value={formData.additional_details}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            additional_details: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div id="sub-header" className="space-y-2">
                      <h1 className="font-bold text-xl tracking-tight">
                        Comments (Audit Log)
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        Provide important details such as reasons and all relevant
                        details to consider for reminders.
                      </p>
                    </div>
                    <div className="w-full space-y-2 relative">
                      <Textarea
                        id="comments"
                        placeholder="Important details here."
                        className="h-[200px]"
                        value={formData.comments}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, comments: e.target.value }))
                        }
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>
            </ScrollArea>
            <div className="w-[400px] border-l bg-white border-gray-300 flex flex-col">
              <div className="flex items-start flex-col p-6 space-y-4">
                <div className="font-bold tracking-tight text-lg">
                  Initial Price
                </div>
                <div className="relative w-full">
                  <Input
                    id="initial-price"
                    className="peer ps-6 pe-12"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    value={formData.initial_price_per_night}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        initial_price_per_night: e.target.value,
                      }))
                    }
                  />
                  <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                    ₱
                  </span>
                  <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                    PHP
                  </span>
                </div>
                <div className="font-bold tracking-tight text-lg">
                  Upload Images
                </div>
                <div
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  data-dragging={isDragging || undefined}
                  data-files={files.length > 0 || undefined}
                  className="border-slate-400 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-56 flex-col items-center rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px] w-full"
                >
                  <input
                    {...getInputProps()}
                    className="sr-only"
                    aria-label="Upload files"
                  />
                  {files.length > 0 ? (
                    <div className="flex w-full flex-col gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate text-sm font-medium">
                          Uploaded Files ({files.length})
                        </h3>
                        <Button variant="outline" size="sm" onClick={clearFiles}>
                          <Trash2Icon
                            className="-ms-0.5 size-3.5 opacity-60"
                            aria-hidden="true"
                          />
                          Remove all
                        </Button>
                      </div>
                      <div className="w-full space-y-2">
                        {files.map((file) => (
                          <div
                            key={file.id}
                            className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
                          >
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
                                {getFileIcon(file)}
                              </div>
                              <div className="flex min-w-0 flex-col gap-0.5">
                                <p className="truncate text-[13px] font-medium">
                                  {file.file instanceof File
                                    ? file.file.name
                                    : file.file.name}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                  {formatBytes(
                                    file.file instanceof File
                                      ? file.file.size
                                      : file.file.size
                                  )}
                                </p>
                              </div>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                              onClick={() => removeFile(file.id)}
                              aria-label="Remove file"
                            >
                              <XIcon className="size-4" aria-hidden="true" />
                            </Button>
                          </div>
                        ))}
                        {files.length < maxFiles && (
                          <div className="space-y-3">
                            <Button
                              variant="outline"
                              className="mt-2 w-full"
                              onClick={openFileDialog}
                            >
                              <UploadIcon
                                className="-ms-1 opacity-60"
                                aria-hidden="true"
                              />
                              Add more
                            </Button>
                            <AlertDialog
                              open={uploadDialogOpen}
                              onOpenChange={handleOpenChange}
                            >
                              <AlertDialogTrigger className="w-full" asChild>
                                <Button className="w-full">
                                  <UploadIcon
                                    className="-ms-1"
                                    aria-hidden="true"
                                  />
                                  Upload
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    <div className="space-y-0">
                                      <div className="inline-flex items-center gap-2">
                                        <div className="text-lg">
                                          Uploading resources
                                        </div>
                                        {isUploading && (
                                          <LoaderCircle className="animate-spin" />
                                        )}
                                      </div>
                                      <div className="text-sm font-normal text-muted-foreground">
                                        This contains terminal log
                                      </div>
                                    </div>
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    <ScrollArea className="h-[100px] mt-2 rounded-md border bg-muted p-4">
                                      <pre className="font-mono text-sm text-black/80 whitespace-pre-line">
                                        <code>
                                          {uploadLogs.length > 0
                                            ? uploadLogs.join("\n\n")
                                            : "No logs available"}
                                        </code>
                                      </pre>
                                    </ScrollArea>
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center h-full justify-center text-center">
                      <div
                        className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                        aria-hidden="true"
                      >
                        <FileIcon className="size-4 opacity-60" />
                      </div>
                      <p className="mb-1.5 text-sm font-medium">Upload files</p>
                      <p className="text-muted-foreground text-xs">
                        Max {maxFiles} files ∙ Up to {formatBytes(maxSize)}
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={openFileDialog}
                      >
                        <UploadIcon
                          className="-ms-1 opacity-60"
                          aria-hidden="true"
                        />
                        Select files
                      </Button>
                    </div>
                  )}
                </div>
                {errors.length > 0 && (
                  <div
                    className="text-destructive flex items-center gap-1 text-xs"
                    role="alert"
                  >
                    <AlertCircleIcon className="size-3 shrink-0" />
                    <span>{errors[0]}</span>
                  </div>
                )}
                <div
                  className="flex items-start p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800 space-x-3 w-full"
                  role="alert"
                >
                  <Info size={48} className="p-0" />
                  <div>
                    <span className="font-medium text-md">
                      Ensure first that you already upload images for the new hotel room data in order to proceed with adding new data.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.section>
    </AnimatePresence>
  );
}

export default Add_New_Room;
