import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatInfo = () => {
  const members = ["Member 1", "Member 2", "Member 3"];

  return (
    <div className="w-1/4 border-l h-screen p-4">
      <h2 className="text-lg font-semibold mb-4">Chat info</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Customize chat</h3>
        </div>
        <div>
          <h3 className="font-medium">Chat members</h3>
          {members.map((member, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <Avatar>
                <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 10}`} />
                <AvatarFallback>{member[0]}</AvatarFallback>
              </Avatar>
              <p>{member}</p>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-medium">Media, files, and links</h3>
        </div>
        <div>
          <h3 className="font-medium">Privacy & support</h3>
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;