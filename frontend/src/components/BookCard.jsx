import React from "react";

function getimgURL(name) {
  return new URL(`../assets/books/${name}`, import.meta.url);
}

const BookCard = ({ title, description, coverImage, oldPrice, newPrice }) => {
  return (
    <div className="flex flex-col p-4 border rounded-md shadow-sm">
      <img src={getimgURL(coverImage)} alt={`${title} cover`} className="w-24 h-auto mb-2" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm line-clamp-3">{description}</p>
      <div className="flex justify-between mt-2">
        <span className="text-lg font-semibold text-yellow-500">${newPrice.toFixed(2)}</span>
        <span className="line-through text-gray-500">${oldPrice.toFixed(2)}</span>
      </div>
      <button className="mt-3 px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600">
        Add to Cart
      </button>
    </div>
  );
};

export default BookCard;
