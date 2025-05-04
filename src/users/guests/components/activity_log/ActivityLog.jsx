import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import useGuestBookStore from '../../stores/guest-book.store';

const ActivityLogs = () => {
  const { activityLogs, fetchActivityLogs, loading, error } = useGuestBookStore();
  const [userId, setUserId] = useState(null);

  // Fetch user ID from localStorage and trigger fetchActivityLogs
  useEffect(() => {
    try {
      const authStorage = localStorage.getItem('auth-storage');
      console.log('auth-storage:', authStorage); // Debug: Log raw localStorage data
      if (authStorage) {
        const parsedData = JSON.parse(authStorage);
        console.log('Parsed auth-storage:', parsedData); // Debug: Log parsed data
        const id = parsedData.state.user._id;
        console.log('Extracted userId:', id); // Debug: Log extracted userId
        if (id) {
          setUserId(id);
          fetchActivityLogs(id); // Fetch activity logs for this user
        }
      }
    } catch (err) {
      console.error('Error parsing auth-storage:', err); // Already present
    }
  }, [fetchActivityLogs]);

  // Debug: Log activityLogs and error whenever they change
  useEffect(() => {
    console.log('activityLogs:', activityLogs); // Debug: Log activityLogs state
    console.log('error:', error); // Debug: Log error state
  }, [activityLogs, error]);

  // Format timestamp for date and time
  const formatDate = (timestamp) => {
    if (!timestamp) {
      console.warn('Invalid timestamp:', timestamp); // Debug: Log invalid timestamp
      return { date: 'Invalid Date', time: '' };
    }
    const dateObj = new Date(timestamp);
    const formatted = {
      date: format(dateObj, 'MMMM d, yyyy'),
      time: format(dateObj, 'h:mm a'),
    };
    console.log('Formatted date for timestamp', timestamp, ':', formatted); // Debug: Log formatted date
    return formatted;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header */}
      <h1 className="text-xl font-semibold mb-4">YOUR ACTIVITY LOGS</h1>

      {/* Logs List */}
      <div className="space-y-4">
        {loading && <p>Loading activity logs...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (!activityLogs || activityLogs.length === 0) && (
          <p className="text-gray-500 text-center">No activity logs found.</p>
        )}
        {!loading && !error && activityLogs && activityLogs.length > 0 && (
          activityLogs.map((log, index) => {
            const { date, time } = formatDate(log.action_timestamp);
            console.log('Rendering log:', log); // Debug: Log each log being rendered
            return (
              <Card key={log._id || index} className="border rounded-lg shadow-sm">
                <CardContent className="p-4 flex items-start space-x-4">
                  {/* Avatar */}
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src="https://github.com/golash0000.png"
                      alt="User avatar"
                    />
                    <AvatarFallback>
                      {log.issued_by?.guest_name?.firstName?.[0] || 'U'}
                      {log.issued_by?.guest_name?.lastName?.[0] || 'N'}
                    </AvatarFallback>
                  </Avatar>

                  {/* Log Details */}
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{date}</p>
                    <h2 className="text-base font-medium">{log.action || 'Unknown Action'}</h2>
                    <p className="text-sm text-gray-600">{log.action_description || 'No description'}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-500">{time}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActivityLogs;