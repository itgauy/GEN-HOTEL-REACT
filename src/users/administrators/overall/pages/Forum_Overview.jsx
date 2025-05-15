import { useState } from "react";
import { Button } from "@/components/ui/button";
import HotelDataTable from "../components/ForumManagement"; // Adjust path as needed
import { PlusCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

function Forum_Overview() {
  const [selectedThreads, setSelectedThreads] = useState([]);
  const navigate = useNavigate();

  // Handle navigation to add new thread with a slight delay for animation
  const handleNavigate = () => {
    console.log("Forum_Overview: Navigating to add page");
    setTimeout(() => {
      navigate("/hms-admin/hotel-forums/add");
    }, 300);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <AnimatePresence mode="wait">
          {selectedThreads.length === 0 ? (
            <motion.h2
              key="title"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1 }}
              className="text-xl font-bold tracking-tighter"
            >
              Forum Assistance
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
                    You selected {selectedThreads.length}{" "}
                    {selectedThreads.length === 1 ? "thread" : "threads"}.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex gap-2">
          <Button onClick={handleNavigate}>
            <PlusCircle className="mr-1" /> Add New Thread
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <HotelDataTable
          data={[]}
          selectedItems={selectedThreads}
          setSelectedItems={setSelectedThreads}
        />
      </div>
    </div>
  );
}

export default Forum_Overview;