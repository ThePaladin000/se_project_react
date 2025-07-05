import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

export default function Profile({ onAddGarmentClick, items, onCardClick }) {
  return (
    <div className="profile">
      <SideBar className="profile__sidebar" />
      <ClothesSection
        className="profile__clothes-section"
        onAddGarmentClick={onAddGarmentClick}
        items={items}
        onCardClick={onCardClick}
      />
    </div>
  );
}
