import React from 'react';

const DateToggle = ({ selectedToggle, onToggleChange }) => {
  return (
    <div className="relative inline-block">
      <select
        value={selectedToggle}
        onChange={onToggleChange}
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        <option value="today">Today's News</option>
        <option value="yesterday">Yesterday's News</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 12l-6-6h12l-6 6z"
          />
        </svg>
      </div>
    </div>
  );
};

export default DateToggle;
