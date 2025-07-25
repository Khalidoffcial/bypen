import React from 'react';
import '../App.css'; // استيراد ملف التنسيق

const Sidebar = () => {
  const channels = ['Articles', 'Stories', 'News', 'How To', 'Technology', 'Science', 'Business'];

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <a href="/" className="sidebar-item" style={{textDecoration:"none"}}>All</a>
        {channels.map((channel, index) => (
            <a href={channel.toLowerCase()} style={{textDecoration:"none"}}>
                <li key={index} className="sidebar-item">{channel}</li>
            </a>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
