import React from "react";
import "./topbar.css";
import logo from './logo.jpg';
import { NotificationsNone, Language, Settings, AccountCircle } from "@mui/icons-material";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          {/* <span className="logo">Avanti R&D.Inc,</span> */}
          {/* <img src="./logo.jpg" alt="Avanti R&D.Inc," width="100"/> */}
          <span><img src={logo} width="200" /></span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge"></span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge"></span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          {/* <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" /> */}
          <div className="topbarIconContainer">
            <AccountCircle />
          </div>
        </div>
      </div>
    </div>
  );
}
