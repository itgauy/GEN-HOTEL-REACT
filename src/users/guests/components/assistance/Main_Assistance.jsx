import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import ChatInfo from "./ChatInfo";

function Main_Assistance() {
  return (
    <div className="flex h-screen">
      <ChatList />
      <ChatWindow />
      <ChatInfo />
    </div>
  );
}

export default Main_Assistance;