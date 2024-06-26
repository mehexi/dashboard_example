import { FaStar } from "react-icons/fa6";

const RatingStars = ({ rating,size }) => {
  
  return (
    <div className="flex gap-2 items-center">
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar size={size}  key={i} className={i < rating? 'text-yellow-300' : 'text-slate-300/20' } />
      ))}
    </div>
  </div>
  );
};

export default RatingStars;
