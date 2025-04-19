import { Lock } from 'lucide-react';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <Lock className="mx-auto h-12 w-12 text-gray-600 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Unauthorized Access</h1>
        <p className="max-w-[480px] break-words text-md text-gray-500">
          You do not have the necessary permissions to access this resource. Please contact your administrator for assistance.
        </p>
      </div>
    </div>
  );
}