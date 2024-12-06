import { useState } from "react";
import Swal from "sweetalert2";  // Importing SweetAlert2

const AdminAddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    trending: false,
    oldPrice: "",
    newPrice: "",
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      coverImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("trending", formData.trending);
    data.append("oldPrice", formData.oldPrice);
    data.append("newPrice", formData.newPrice);
    data.append("coverImage", formData.coverImage);

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        Swal.fire("Error", "No admin token found", "error");
        return;
      }

      const response = await fetch("https://book-store-mern-backend-navy.vercel.app/api/books/create_book", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      
      const textResponse = await response.text();
      console.log("Raw Response:", textResponse); // Log the raw response
      
      if (response.ok) {
        Swal.fire("Success", "Book posted successfully!", "success");
      } else {
        Swal.fire("Error", textResponse || "An error occurred", "error");
      }      
    } catch (error) {
      console.error("Error posting book:", error);
      Swal.fire("Error", "An error occurred while posting the book.", "error");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Book</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter book title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter book description"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="Business">Business</option>
              <option value="Fiction">Fiction</option>
              <option value="Horror">Horror</option>
              <option value="Adventure">Adventure</option>
            </select>
          </div>

          {/* Trending Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="trending"
              checked={formData.trending}
              onChange={handleChange}
              className="mr-2 w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <label className="font-semibold text-gray-700">Trending</label>
          </div>

          {/* Old Price */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Old Price</label>
            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleChange}
              className="p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter old price"
              required
            />
          </div>

          {/* New Price */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">New Price</label>
            <input
              type="number"
              name="newPrice"
              value={formData.newPrice}
              onChange={handleChange}
              className="p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter new price"
              required
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleImageChange}
              className="p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              Post Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddBook;
