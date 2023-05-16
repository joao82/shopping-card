import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, onClick, color }) => {
  return (
    <div className="rating">
      {[...Array(5)].map((_, i) => (
        <span key={i} onClick={() => onClick(i)} style={{ color }}>
          {rating > i ? (
            <AiFillStar fontSize="15px" />
          ) : (
            <AiOutlineStar fontSize="15px" />
          )}
        </span>
      ))}
    </div>
  );
};

Rating.defaultProps = {
  color: "#FFA41C",
};

export default Rating;
