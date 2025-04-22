import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Diff, Puzzle, Smile, CircleMinus, CirclePlus, BoxIcon,
ChartLine, HouseIcon, PanelsTopLeftIcon, SettingsIcon, UsersRoundIcon, } from "lucide-react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  startOfDay,
  isBefore,
  format,
  startOfMonth,
  endOfMonth,
  addDays,
} from "date-fns";
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
import { useState } from "react";
import StaySuite_User_Booking_Queues from "../components/reservation/StaySuite_Queues";
import StaySuite_User_Booking from "../components/reservation/StaySuite_Booking";
import Main_Assistance from "../components/assistance/Main_Assistance";
import ActivityLogs from "../components/activity_log/ActivityLog";

function StaySuite_User_Booking_Reservation() {
  return (
    <section className="pt-28 pb-24 mx-auto lg:container gap-6">
      <Tabs defaultValue="tab-1">
      <ScrollArea>
        <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 w-full flex justify-start">
          <TabsTrigger
            value="tab-1"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <HouseIcon className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <PanelsTopLeftIcon className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
            Booking
            <Badge className="bg-primary/15 ms-1.5 px-1.5 rounded-full" variant="secondary">
              2
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="tab-3"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <UsersRoundIcon className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
            Assistance
            {/* <Badge className="bg-primary/15 ms-1.5 px-1.5 rounded-full" variant="secondary">
              3
            </Badge> */}
          </TabsTrigger>
          <TabsTrigger
            value="tab-4"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <SettingsIcon className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
            Activity Logs
          </TabsTrigger>
          
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="tab-1">
        <StaySuite_User_Booking_Queues />
      </TabsContent>
      <TabsContent value="tab-2">
        <StaySuite_User_Booking />
      </TabsContent>
      <TabsContent value="tab-3">
        <Main_Assistance />
      </TabsContent>
      <TabsContent value="tab-4">
        <ActivityLogs />
      </TabsContent>
    </Tabs>
    </section>
  );
}

export default StaySuite_User_Booking_Reservation;
