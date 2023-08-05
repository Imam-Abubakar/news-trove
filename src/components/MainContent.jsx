import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import newsData from "../assets/news.json";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../assets/pagination.css";

const MainContent = () => {
  // const [newsData, setNewsData] = useState(null);

  const getNews = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .get("https://news_scraper-1-v7112287.deta.app/news", config)
      .then(function (response) {
        setNewsData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const [selectedToggle, setSelectedToggle] = useState("yesterday");
  const [filteredNews, setFilteredNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 18;

  useEffect(() => {
    const filterDataForCurrentAndPreviousDay = () => {
      const currentDate = new Date().toISOString().slice(0, 10);
      const previousDate = new Date();
      previousDate.setDate(previousDate.getDate() - 1);
      const formattedPreviousDate = previousDate.toISOString().slice(0, 10);

      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newsToShow =
        selectedToggle === "today"
          ? newsData.filter((item) => item.date === currentDate)
          : newsData.filter((item) => item.date === formattedPreviousDate);

      setFilteredNews(newsToShow.slice(startIndex, endIndex));
    };

    filterDataForCurrentAndPreviousDay();
  }, [selectedToggle, currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleToggleChange = (event) => {
    setSelectedToggle(event.target.value);
  };

  return (
    <main className="flex-grow container mx-auto py-8">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-800">
          Toggle:
        </label>
        <div className="flex items-center">
          <input
            type="radio"
            id="today"
            name="toggle"
            value="today"
            checked={selectedToggle === "today"}
            onChange={handleToggleChange}
          />
          <label htmlFor="today" className="ml-2 mr-4">
            Today's News
          </label>
          <input
            type="radio"
            id="yesterday"
            name="toggle"
            value="yesterday"
            checked={selectedToggle === "yesterday"}
            onChange={handleToggleChange}
          />
          <label htmlFor="yesterday" className="ml-2">
            Yesterday's News
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredNews.map((item) => (
          <NewsCard key={item.link} data={item} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={"< Previous"}
          nextLabel={"Next >"}
          breakLabel={"..."}
          pageCount={Math.ceil(filteredNews.length / itemsPerPage)}
          pageRangeDisplayed={4}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </main>
  );
};
export default MainContent;
