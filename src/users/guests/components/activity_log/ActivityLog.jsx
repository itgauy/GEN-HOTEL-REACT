import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'; // Import Dialog components

const ActivityLogs = () => {
  // Sample data for activity logs
  const logs = [
    {
      date: 'December 16, 2024',
      title: 'You booked a hotel room.',
      description: 'Enjoy the luxury experiences.',
      visibility: 'Private',
      time: '3:43PM',
    },
    {
      date: 'December 16, 2024',
      title: 'You booked a hotel room.',
      description: 'Enjoy the luxury experiences.',
      visibility: 'Private',
      time: '3:43PM',
    },
    {
      date: 'December 16, 2024',
      title: 'You booked a hotel room.',
      description: 'Enjoy the luxury experiences.',
      visibility: 'Private',
      time: '3:43PM',
    },
  ];

  // State to manage the dialog's open/close status and the selected log
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  // Function to handle "View" button click
  const handleViewClick = (log) => {
    setSelectedLog(log);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header */}
      <h1 className="text-xl font-semibold mb-4">YOUR ACTIVITY LOGS</h1>

      {/* Logs List */}
      <div className="space-y-4">
        {logs.map((log, index) => (
          <Card key={index} className="border rounded-lg shadow-sm">
            <CardContent className="p-4 flex items-start space-x-4">
              {/* Avatar */}
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://via.placeholder.com/40" alt="User avatar" />
                <AvatarFallback>KO</AvatarFallback>
              </Avatar>

              {/* Log Details */}
              <div className="flex-1">
                <p className="text-sm text-gray-500">{log.date}</p>
                <h2 className="text-base font-medium">{log.title}</h2>
                <p className="text-sm text-gray-600">{log.description}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className="inline-flex items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-1"></span>
                    {log.visibility}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500">{log.time}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewClick(log)}
                >
                  View
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog for Full Details */}
      {selectedLog && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Activity Log Details</DialogTitle>
              <DialogDescription>
                Full details of the selected activity log.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 font-medium">Date:</span>
                <span className="col-span-3">{selectedLog.date}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 font-medium">Title:</span>
                <span className="col-span-3">{selectedLog.title}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 font-medium">Description:</span>
                <span className="col-span-3">{selectedLog.description}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 font-medium">Visibility:</span>
                <span className="col-span-3">{selectedLog.visibility}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 font-medium">Time:</span>
                <span className="col-span-3">{selectedLog.time}</span>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ActivityLogs;