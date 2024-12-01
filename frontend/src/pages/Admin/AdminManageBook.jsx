import { useFetchAllBooksQuery } from "../../redux/features/books/booksAPI";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminManageBook = () => {
  const navigate = useNavigate();
  const { data: books, refetch, isLoading, isError } = useFetchAllBooksQuery();

  const handleDeleteBook = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    console.log("Attempting to delete book with ID:", id);

    const token = localStorage.getItem('adminToken');

    if (!token) {
      await Swal.fire({
        icon: 'error',
        title: 'No Token Found',
        text: 'Please log in again.',
      });
      navigate('/admin');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to delete book:', errorData);

        if (response.status === 401 || response.status === 403) {
          await Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'Your session has expired or you are not authorized to perform this action.',
          });
          navigate('/admin');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed to delete book',
            text: 'Please try again later.',
            showConfirmButton: false,
            timer: 1500,
          });
        }
        return;
      }

      Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Book deleted successfully!',
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
      });

      refetch(); 
    } catch (error) {
      console.error('Error occurred while deleting book:', error);

      Swal.fire({
        icon: 'error',
        title: 'Failed to delete book',
        text: 'An unexpected error occurred. Please try again later.',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (isLoading) {
    return <p>Loading books...</p>;
  }

  if (isError) {
    console.error("Error fetching books from API");
    return <p>Error fetching books. Please try again later.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Books</h2>
      {books?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Old Price</th>
                <th className="border border-gray-300 px-4 py-2">New Price</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{book.category}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">${book.oldPrice}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">${book.newPrice}</td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-all duration-00"
                      onClick={() => navigate(`/dashboard/edit-book/${book._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-al duration-200"
                      onClick={() => handleDeleteBook(book._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No books available.</p>
      )}
    </div>
  );
};

export default AdminManageBook;
