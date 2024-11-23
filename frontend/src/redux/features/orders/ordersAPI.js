import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ordersAPI = createApi({
  reducerPath: 'ordersAPI',
  baseQuery:fetchBaseQuery({
    baseUrl:'http://localhost:5000',
    credentials:'include'
  }),
  tagTypes:['Orders'],
  endpoints:(builder)=>({
    createOrder:(builder.mutation)({
        query:(newOrder)=>({
            url:"/api/orders",
            method: 'POST',
            body:newOrder,
            credentials:'include'
        }),
    }),
    getOrderByEmail:(builder.query)({
      query:(email)=>({
        url:`/api/orders/${email}`,
      }),
      providesTags:['orders']
    })
  })
});

export const {useCreateOrderMutation,useGetOrderByEmailQuery} = ordersAPI
export default ordersAPI