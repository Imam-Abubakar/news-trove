import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import axios from "axios";
import ReactPaginate from "react-paginate";
import DateToggle from "./DateToggle";
import "../assets/pagination.css";

const MainContent = () => {
  const [selectedToggle, setSelectedToggle] = useState("today");
  const [filteredNews, setFilteredNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [viewMode, setViewMode] = useState('square');
  const itemsPerPage = 12;
  const totalPages = Math.ceil(allNews.length / itemsPerPage);

  const getNews = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(
        "https://news_scraper-1-v7112287.deta.app/news",
        config
      );
      const newsData = response.data.news;
      filterDataForCurrentAndPreviousDay(newsData);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  const filterDataForCurrentAndPreviousDay = (newsData) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 1);
    const formattedPreviousDate = previousDate.toISOString().slice(0, 10);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const newsToShow =
      selectedToggle === "today"
        ? newsData?.filter((item) => item.date === currentDate)
        : newsData?.filter((item) => item.date === formattedPreviousDate);

    const newsWithImages = newsToShow.filter((item) => item.photo_link !== null);
    const newsWithPreview = newsWithImages.filter((item) => item.preview !== null);

    setFilteredNews(newsWithPreview.slice(startIndex, endIndex));
    setAllNews(newsWithPreview);
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'square' ? 'rectangle' : 'square'));
  };


  useEffect(() => {
    getNews();
  }, [selectedToggle, currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleChange = (event) => {
    setCurrentPage(0);
    setSelectedToggle(event.target.value);
  };

  console.log(filteredNews);

  return (
    <main className="flex-grow container lg:w-[70vw] mx-auto py-8 px-4">
      <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
        <DateToggle
          selectedToggle={selectedToggle}
          onToggleChange={handleToggleChange}
        />
         <button
          onClick={toggleViewMode}
          className="hidden md:block px-4 py-2 bg-blue-800 text-white rounded-md shadow-md"
        >
          {viewMode === 'square' ? 'Rectangle View' : 'Square View'}
        </button>
      </div>
      
      <div className={`grid grid-cols-1 ${
          viewMode === "square" ? "md:grid-cols-2 lg:grid-cols-3" : " md:grid-cols-1 lg:grid-cols-1  mx-auto"
        } gap-4`}>
        {filteredNews.map((item) => (
          <NewsCard key={item.link} data={item} viewMode={viewMode} />
        ))}
      </div>
      <div className="flex justify-center my-6">
        <ReactPaginate
          previousLabel={"< Previous"}
          nextLabel={"Next >"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"pagination-item"}
          pageLinkClassName={"pagination-link"}
          previousClassName={"pagination-item"}
          previousLinkClassName={"pagination-link"}
          nextClassName={"pagination-item"}
          nextLinkClassName={"pagination-link"}
          breakClassName={"pagination-item"}
          breakLinkClassName={"pagination-link"}
        />
      </div>
    </main>
  );
};
export default MainContent;
