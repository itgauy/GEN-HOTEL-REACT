import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const ChatList = () => {
  const chats = [
    { name: "S_10:30AM_SBIT-30_ETHICS", message: "Test me", time: "1m" },
    { name: "Room Management (SIA102) Sat", message: "Test", time: "22m" },
    { name: "Samuel Florita Gasatan", message: "👍", time: "1h" },
    { name: "tEST", message: "Reacted ❤️ to your message", time: "1h" },
    { name: "PM (SIA 102)", message: "You sent 2 photos.", time: "2h" },
    { name: "TEST", message: "", time: "" },
  ];

  return (
    <div className="w-1/4 border-r h-screen p-4">
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <Input placeholder="Search" className="mb-4" />
      <div className="space-y-4">
        {chats.map((chat, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Avatar>
              <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 1}`} />
              <AvatarFallback>{chat.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{chat.name}</p>
              <p className="text-sm text-gray-500 truncate">{chat.message}</p>
            </div>
            <span className="text-xs text-gray-400">{chat.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;