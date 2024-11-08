const getnews_img_url = (name) => {
  return new URL(`../assets/news/${name}`, import.meta.url);
};

const NewsCard = ({ image, title, description }) => {
  return (
    <div className="border flex md:flex-row items-center md:items-start md:min-w-full">
      <div className="p-4 flex-shrink-0">
        <img 
          src={getnews_img_url(image)} 
          alt={title}  
          className="w-16 h-auto md:w-20 md:h-auto" 
        />
      </div>
      <div className="p-4 flex-1">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg md:text-xl font-semibold font-sans line-clamp-1">{title}</h2>
          <p className="text-sm md:text-base line-clamp-3">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
