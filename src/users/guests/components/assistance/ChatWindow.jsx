import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Message from "./Message";

const ChatWindow = () => {
  const messages = [
    { sender: "Joyce Ver Geronimo", content: "Good day @everyone! Mga hnd po nakapagexam or quiz special date po ng pgt take is bu... P o ko mamayang 3-5. Thank you", time: "10:30AM", isSelf: false },
    { sender: "Joyce Vener", content: "May mag exam or quiz po? Palista po", time: "12:06PM", isSelf: false },
    { sender: "Habaradas, Kenoah Seth S.", content: "Excuse me po maam pwede pa po ba maghabol ng 1x1 picture po?", time: "12:06PM", isSelf: true },
  ];

  return (
    <div className="w-2/4 flex flex-col h-screen">
      {/* Chat Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">S_10:30AM_SBIT-30_ETHICS</h2>
      </div>
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} content={msg.content} time={msg.time} isSelf={msg.isSelf} />
        ))}
      </div>
      {/* Chat Input */}
      <div className="p-4 border-t flex items-center space-x-2">
        <Input placeholder="Aa" className="flex-1" />
        <Button variant="ghost">😊</Button>
        <Button variant="ghost">📎</Button>
        <Button variant="ghost">🎤</Button>
        <Button>👍</Button>
      </div>
    </div>
  );
};

export default ChatWindow;