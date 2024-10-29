const getnews_img_url = (name) => {
  return new URL(`../assets/news/${name}`, import.meta.url);
};

const NewsCard = ({ image, title, description }) => {
  return (
    <div className="border w-2/5 flex justify-between">
      <div className="p-4 flex-shrink-0">
        <img src={getnews_img_url(image)} alt={title} />
      </div>
      <div className="p-4">
        <div className="flex gap-3 flex-col">
          <h2 className="text-2xl font-semibold font-sans">{title}</h2>
          <p className="line-clamp-3">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
