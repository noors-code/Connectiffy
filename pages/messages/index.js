import { useState, useEffect } from 'react';

const Inbox = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // Using dummy data for now
    const dummyData = [
      { id: 1, sender: 'John Doe', message: 'Hey, how are you?', timestamp: '2025-04-30' },
      { id: 2, sender: 'Jane Smith', message: 'I have a question for you.', timestamp: '2025-04-29' },
      { id: 3, sender: 'Abdullah', message: 'Let\'s catch up soon!', timestamp: '2025-04-28' },
    ];

    setConversations(dummyData);
  }, []);

  return (
    <div>
      <h1>Inbox</h1>
      {conversations.map((conversation) => (
        <div key={conversation.id}>
          <h3>{conversation.sender}</h3>
          <p>{conversation.message}</p>
          <small>{conversation.timestamp}</small>
        </div>
      ))}
    </div>
  );
};

export default Inbox;
