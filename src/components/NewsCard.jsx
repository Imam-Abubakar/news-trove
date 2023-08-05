import React from "react";
import NoImage from "../assets/no-image.jpg";

const NewsCard = ({ data, viewMode }) => {
  const { title, link, preview, date, photo_link, outlet } = data;

  const formatDate = (inputDate) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const dateObj = new Date(inputDate);
    return dateObj.toLocaleDateString("en-US", options);
  };

  return (
    <>
    
      <div
        className={`${
          viewMode === "square" ? "p-4" : "p-4 md:flex md:flex-row md:gap-4 md:p-6"
        } bg-white rounded-lg shadow-md  mt-4 transition-transform duration-300 transform hover:scale-102 hover:bg-blue-50`}
      >
        {photo_link && (
          <img
          src={photo_link ? photo_link : NoImage}
            alt={title}
            className={` ${
              viewMode === "square" ? "w-full h-36" : "md:w-25 w-full h-36 md:w-half md:my-auto md:h-48"
            } object-cover mb-4 rounded-lg`}
          />
        )}
        <div  className={` ${
              viewMode === "square" ? "" : "md:w-75"
            } `}>
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{preview}</p>
        <p className="text-sm text-gray-500 uppercase">{outlet}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 font-semibold">
            {formatDate(date)}
          </span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800 font-medium hover:underline"
          >
            Read more {">>"}
          </a>
        </div>
        </div>
       
      </div>
    </>
  );
};

export default NewsCard;
