import avatar from "../../assets/profile.svg";
import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ className = "", onLogout, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const avatarSrc = currentUser?.avatar || avatar;
  const username = currentUser?.name || "Default Name";

  return (
    <div className={`sidebar ${className}`.trim()}>
      <img src={avatarSrc} alt="avatar" className="sidebar__avatar" />
      <div className="sidebar__info">
        <p className="sidebar__username">{username}</p>
        <div className="sidebar__actions">
          <button
            type="button"
            className="sidebar__edit"
            onClick={onEditProfile}
          >
            Change profile data
          </button>
          <button type="button" className="sidebar__logout" onClick={onLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
