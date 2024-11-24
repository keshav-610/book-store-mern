import { useParams } from "react-router-dom";

const SingleBook = () => {
  const { id } = useParams();  // Access the book id from the route

  // Now you can fetch the book by its id or display it
  console.log(id);  // Example: log the book id

  return (
    <div>
      <h1>Book Details for ID: {id}</h1>
    </div>
  );
};

export default SingleBook;
