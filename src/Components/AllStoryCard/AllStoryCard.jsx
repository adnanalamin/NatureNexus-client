import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const AllStoryCard = ({ data }) => {
  const { _id, tourDetails, userPhoto, userName } = data;
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > maxLength
      ? words.slice(0, maxLength).join(" ") + "..."
      : text;
  };
  return (
    <div className="font-roboto">
      <div className="bg-white px-6 py-8 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.2)] w-full max-w-xl rounded-lg  overflow-hidden  mt-4">
        <div className="flex items-center">
          <p className="text-sm text-[#333] text-right">
            {truncateText(tourDetails, 30)}
          </p>
          <img src={userPhoto} className="w-24 h-24 ml-6 rounded-full" />
        </div>
        <h3 className="text-[#333] text-lg font-semibold mt-4">{userName}</h3>
        <div className="w-full mt-3">
          <Link to={`/storyView/${_id}`}>
            <button className="btn w-full font-semibold text-base text-white bg-[#2C3892] hover:bg-[#3945a1]">
              Viwe Story
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
AllStoryCard.propTypes = {
  data: PropTypes.object.isRequired,
};
export default AllStoryCard;
