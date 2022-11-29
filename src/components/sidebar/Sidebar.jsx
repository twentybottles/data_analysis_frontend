import "./sidebar.css";
import {
  // LineStyle,
  Timeline,
  // TrendingUp,
  // PermIdentity,
  Storefront,
  // AttachMoney,
  BubbleChart,
  BarChart,
  Explore,
  InsertChart, 
  // MailOutline,
  // DynamicFeed,
  // ChatBubbleOutline,
  // WorkOutline,
  StackedLineChart,
  EmojiNature,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            {/* <Link to="/" className="link">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link> */}
            <Link to="/" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Traffic
              </li>
            </Link>
            <Link to="/environment" className="link">
              <li className="sidebarListItem">
                <EmojiNature className="sidebarIcon" />
                Environment
              </li>
            </Link>
            <Link to="/correlation" className="link">
              <li className="sidebarListItem">
                <BubbleChart className="sidebarIcon" />
                Correlation
              </li>
            </Link>
            <Link to="/autoCorrelation" className="link">
              <li className="sidebarListItem">
                <InsertChart className="sidebarIcon" />
                AutoCorrelation
              </li>
            </Link>
            <Link to="/crossCorrelation" className="link">
              <li className="sidebarListItem">
                <StackedLineChart className="sidebarIcon" />
                CrossCorrelation
              </li>
            </Link>
            <Link to="/power" className="link">
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                Power
              </li>
            </Link>
            <Link to="/geoLocation" className="link">
              <li className="sidebarListItem">
                <Explore className="sidebarIcon" />
                GeoLocation
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
