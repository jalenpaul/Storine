import Upload from './Upload';
import Profile from './Profile';
import './index.css';
import './Home.css'

import React, { useState } from 'react';


function Home() {
    const [activeTab, setActiveTab] = useState(1);
  
    const handleTabClick = (tabIndex) => {
      setActiveTab(tabIndex);
    };
  
    function getDisplayStatus(thisTab) {
      return activeTab == thisTab? 'inline' : 'none';
    }
  
    return (
      <div className="body">
        <div className="tab-headers">
          <div
            className={`tab-header ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => handleTabClick(1)}
          >
            EXPLORE
          </div>
          <div
            className={`tab-header ${activeTab === 2 ? 'active' : ''}`}
            onClick={() => handleTabClick(2)}
          >
            UPLOAD
          </div>
          <div
            className={`tab-header ${activeTab === 3 ? 'active' : ''}`}
            onClick={() => handleTabClick(3)}
          >
            PROFILE
          </div>
        </div>
        <div className="tab-content">
          <div className={`tab-panel ${activeTab === 1 ? 'active' : ''}`} style={{display: getDisplayStatus(1)}}>
            <p>This is the content of tab 1.</p>
          </div>
          <div className={`tab-panel ${activeTab === 2 ? 'active' : ''}`} style={{display: getDisplayStatus(2)}}>
            <Upload/>
          </div>
          <div className={`tab-panel ${activeTab === 3 ? 'active' : ''}`} style={{display: getDisplayStatus(3)}}>
            <Profile/>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;
  