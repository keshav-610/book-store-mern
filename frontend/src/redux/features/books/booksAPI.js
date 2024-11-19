import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" 
    ? `http://localhost:5000/api/books` 
    : `http://192.168.1.7:5000/api/books`, 
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});


const booksAPI = createApi({
  reducerPath: "booksAPI",
  baseQuery,
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    fetchAllBooks: builder.query({
      query: () => "",
      providesTags: ["Books"],
    }),
    fetchBookByID: builder.query({
      query: (id) => `/${id}`,
      providesTags: (results, error, id) => [{ type: "Books", id }],
    }),
    addBooks: builder.mutation({
      query: (newBook) => ({
        url: `/create_book`,
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/edit${id}`,
        method: "PUT",
        body: rest,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});
export const {
  useFetchAllBooksQuery,
  useFetchBookByIDQuery,
  useAddBooksMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksAPI;

export default booksAPI;
