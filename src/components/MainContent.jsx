import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import axios from "axios";

const MainContent = () => {
  const [newsData, setNewsData] = useState(null);

  // Replace this with the actual news data fetched from the backend
  /*
  const newsData = [
    {
      title: 'Be firm against military coups...',
      link: 'https://dailypost.ng/2023/07/15/be-firm-against-military-coups-tinubu-tasks-african-leaders/',
      preview: 'President Bola Ahmed Tinubu, on Saturday in Nairobi, Kenya, called on African leaders...',
      date: '2023-08-04',
      photo_link: 'https://dailypost.ng/wp-content/uploads/2023/07/Tinubu-400x240.jpg',
      outlet: 'dailypostng',
    },
    // Add more news items here
  ];
  */

  const getNews = () => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
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
  useEffect(() => {
    getNews();
  }, []);

  return (
    <main className="flex-grow container mx-auto py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {newsData === null ?
        'No News at this time'
        :
        <>
        {newsData?.map((item) => (
          <NewsCard key={item.link} data={item} />
        ))}
        </>
    }
        
      </div>
    </main>
  );
};

export default MainContent;
