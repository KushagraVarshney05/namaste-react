import { IMG_CDN_URL } from "../contants";

const RestrauntCard = ({
  name,
  cuisines,
  cloudinaryImageId,
  locality,
}) => {
  return (
    <div className="card">
      <img src={IMG_CDN_URL + cloudinaryImageId} />
      <h2>{name}</h2>
      <h3>{cuisines?.join(", ")}</h3>
      <h4>{locality}</h4>
    </div>
  );
};

export default RestrauntCard;
