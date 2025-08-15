import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

export default function Profile({
  onAddGarmentClick,
  items,
  onCardClick,
  onCardLike,
  onLogout,
  onEditProfile,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = items.filter((item) => item.owner === currentUser._id);

  return (
    <div className="profile">
      <SideBar
        className="profile__sidebar"
        onLogout={onLogout}
        onEditProfile={onEditProfile}
      />
      <ClothesSection
        className="profile__clothes-section"
        onAddGarmentClick={onAddGarmentClick}
        items={userItems}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
      />
    </div>
  );
}
