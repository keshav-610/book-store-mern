import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, []);

  return (
    <div>
      <div className="py-4">
      <h2 className="text-2xl sm:text-3xl font-semibold">Top News for You</h2>
      </div>
      <div className="flex flex-wrap gap-4 justify-between">
        {news.map((item) => (
          <NewsCard
            key={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default News;
