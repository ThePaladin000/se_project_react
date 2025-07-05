import avatar from "../../assets/profile.svg";
import "./SideBar.css";

export default function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Default Name</p>
    </div>
  );
}
