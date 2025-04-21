import React, { useState, useEffect } from 'react';
import './AgentInterface.css';

const AgentInterface = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/conversations', {
        headers: {
          'x-api-key': process.env.REACT_APP_KONG_API_KEY
        }
      });
      const data = await response.json();
      setConversations(data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  return (
    <div className="agent-interface">
      <header className="header">
        <h1>Skatteverket Customer Support Agent Interface</h1>
      </header>
      
      <div className="main-content">
        <div className="conversations-list">
          <h2>Active Conversations</h2>
          <ul>
            {conversations.map(conversation => (
              <li 
                key={conversation.id}
                className={selectedConversation?.id === conversation.id ? 'selected' : ''}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="conversation-header">
                  <span className="customer-id">Customer ID: {conversation.customerId}</span>
                  <span className="timestamp">{new Date(conversation.timestamp).toLocaleString()}</span>
                </div>
                <div className="conversation-summary">
                  {conversation.summary}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="conversation-details">
          {selectedConversation ? (
            <>
              <h2>Conversation Details</h2>
              <div className="transcript">
                <h3>Transcript</h3>
                <pre>{selectedConversation.transcript}</pre>
              </div>
              <div className="intent">
                <h3>Customer Intent</h3>
                <p>{selectedConversation.intent}</p>
              </div>
              <div className="actions">
                <button className="primary-button">Take Over Call</button>
                <button className="secondary-button">Mark as Resolved</button>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p>Select a conversation to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentInterface; 