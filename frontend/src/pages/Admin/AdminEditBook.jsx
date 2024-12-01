import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminEditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    description: '',
    category: '',
    trending: false,
    coverImage: null,
    oldPrice: '',
    newPrice: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://book-store-mern-backend-navy.vercel.app/api/books/${id}`);
        if (!response.ok) throw new Error('Failed to fetch book details');
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to load book details',
          text: 'Please try again later.',
        });
      }
    };
    fetchBook();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setBook((prevBook) => ({
      ...prevBook,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'coverImage'
          ? files[0]
          : value,
    }));
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      Object.keys(book).forEach((key) => {
        formData.append(key, book[key]);
      });

      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to update book:', errorData);

        Swal.fire({
          icon: 'error',
          title: 'Failed to update book',
          text: errorData.message || 'Please try again later.',
        });
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Book updated successfully!',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating book:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Edit Book</h2>
      <form onSubmit={handleUpdateBook}>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={book.category}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>

        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            name="trending"
            checked={book.trending}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label className="text-lg font-semibold text-gray-700">Trending</label>
        </div>
 
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Cover Image</label>
          <input
            type="file"
            name="coverImage"
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        
        {/* Old Price */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Old Price</label>
          <input
            type="number"
            name="oldPrice"
            value={book.oldPrice}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>
        
        {/* New Price */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">New Price</label>
          <input
            type="number"
            name="newPrice"
            value={book.newPrice}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 "
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditBook;
