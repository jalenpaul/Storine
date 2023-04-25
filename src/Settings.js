import React, { useState } from "react";
//import Switch from "react-switch";
import "./Settings.css";

function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleDarkModeChange = (isChecked) => {
    setDarkMode(isChecked);
    // You can write code to toggle dark mode
  };

  const handleEmailNotificationsChange = (isChecked) => {
    setEmailNotifications(isChecked);
    // You can write code to toggle email notifications
  };

  const handlePushNotificationsChange = (isChecked) => {
    setPushNotifications(isChecked);
    // You can write code to toggle push notifications
  };

  /*

  return (
    <div className={"settings-container" + (darkMode ? " dark-mode" : "")}>
      <h1>Settings</h1>
      <div className="settings-item">
        <label htmlFor="dark-mode-switch">Dark Mode</label>
        <Switch
          id="dark-mode-switch"
          onChange={handleDarkModeChange}
          checked={darkMode}
        />
      </div>
      <div className="settings-item">
        <label htmlFor="email-notifications-switch">Email Notifications</label>
        <Switch
          id="email-notifications-switch"
          onChange={handleEmailNotificationsChange}
          checked={emailNotifications}
        />
      </div>
      <div className="settings-item">
        <label htmlFor="push-notifications-switch">Push Notifications</label>
        <Switch
          id="push-notifications-switch"
          onChange={handlePushNotificationsChange}
          checked={pushNotifications}
        />
      </div>
    </div>
  ); */
}

export default SettingsPage;