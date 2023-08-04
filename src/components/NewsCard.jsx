import React from 'react';

const NewsCard = ({ data }) => {
  const { title, link, preview, date, photo_link, outlet } = data;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {photo_link && (
        <img src={photo_link} alt={title} className="w-full h-40 object-cover mb-4 rounded-lg" />
      )}
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">{preview}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{date}</span>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
