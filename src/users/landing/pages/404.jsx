import { Rabbit } from 'lucide-react';

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <Rabbit className="mx-auto h-12 w-12 text-gray-600 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h1>
        <p className="max-w-[480px] break-words text-md text-gray-500 mb-4">
          This page might be missing or no longer exists. It's possible you followed a broken link or entered an invalid URL.
        </p>
        <p className="max-w-[480px] break-words text-md text-gray-500">
          If you accidentally pressed the back button while a process was still ongoing, your action might not have been saved. Please contact our support team for assistance if needed.
        </p>
      </div>
    </div>
  );
}
