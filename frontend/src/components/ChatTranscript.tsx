const ChatTranscript = () => (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200 p-4 m-4 rounded-xl shadow-lg h-64 overflow-y-auto border border-purple-600">
      <h2 className="text-xl font-bold mb-3 text-purple-400">📝 Chat Transcript</h2>
      <div className="space-y-3 text-sm">
        <p><span className="text-green-400 font-semibold">User:</span> How do I submit my tax form?</p>
        <p><span className="text-blue-400 font-semibold">AI:</span> You can submit it via the Skatteverket portal. Here’s the link...</p>
        <p><span className="text-green-400 font-semibold">User:</span> Thanks a lot!</p>
      </div>
    </div>
  );
  
  export default ChatTranscript;
  