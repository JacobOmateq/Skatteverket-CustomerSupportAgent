const Sidebar = () => (
    <div className="w-48 bg-gray-900 text-gray-200 h-full p-4 shadow-lg">
      <h2 className="text-lg font-bold mb-6">Menu</h2>
      <ul className="space-y-4">
        <li className="hover:text-purple-400 cursor-pointer">Dashboard</li>
        <li className="hover:text-purple-400 cursor-pointer">Call Logs</li>
        <li className="hover:text-purple-400 cursor-pointer">Settings</li>
      </ul>
    </div>
  );
  
  export default Sidebar;
  
