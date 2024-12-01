import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/",
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
      query: () => "books", 
      providesTags: ["Books"],
    }),

    fetchBookByID: builder.query({
      query: (id) => `books/${id}`,
      providesTags: (results, error, id) => [{ type: "Books", id }],
    }),

    addBooks: builder.mutation({
      query: (newBook) => ({
        url: "books/create_book",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),

    updateBook: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `books/edit/${id}`,
        method: "PUT",
        body: rest,
        headers: {
          "Content-Type": "application/json",
        },
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
} = booksAPI;

export default booksAPI;
