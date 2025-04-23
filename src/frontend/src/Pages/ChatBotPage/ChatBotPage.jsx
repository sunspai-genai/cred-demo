import React from "react";
import ChatBot from '../../Widgets/ChatBot/ChatBot'
import SuggestionComp from '../../Widgets/SuggestionComp/SuggestionComp'
 
export default function ChatBotPage() {
  return (
    <section className="flex h-full overflow-hidden">
      <div className="w-5/6 pe-4">
        <ChatBot />
      </div>
      <div className="w-5/6 ps-4">
        <SuggestionComp isComingSoon={false} />
      </div>
    </section>
  );
}
