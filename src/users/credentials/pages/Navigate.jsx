import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RequiredAuth } from '@/lib/Auth';

export function Navigate() {
  const navigate = useNavigate();

  const handleRoleSelection = (path) => {
    navigate(path);
  };

  return (
    <RequiredAuth>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Select Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Button
                className={cn("w-full")}
                onClick={() => handleRoleSelection('/kms-admin')}
              >
                Knowledge Management System
              </Button>
              <Button
                className={cn("w-full")}
                onClick={() => handleRoleSelection('/room-admin')}
              >
                Room Data Management
              </Button>
              <Button
                className={cn("w-full")}
                onClick={() => handleRoleSelection('/reservations-admin')}
              >
                Booking Reservations (Dept.)
              </Button>
              <Button
                className={cn("w-full")}
                onClick={() => handleRoleSelection('/assistance-admin')}
              >
                Booking Assistance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </RequiredAuth>
  );
}