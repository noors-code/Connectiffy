import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ChatPage() {
  const router = useRouter();
  const { conservationID } = router.query;
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    if (conservationID) {
      fetch(`/api/messages/${conservationID}`)
        .then(res => res.json())
        .then(data => setMessages(data));
    }
  }, [conservationID]);

  function sendMessage() {
    fetch('/api/messages/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: conservationID, text: newMsg })
    }).then(() => {
      setNewMsg('');
      // Optionally, refresh messages
    });
  }

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}><b>{msg.sender}</b>: {msg.text}</p>
        ))}
      </div>
      <input
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        placeholder="Type message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
