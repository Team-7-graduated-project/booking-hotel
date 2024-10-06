import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IHotel, IRoom, IUser } from "../models";
import { RootState } from "../store/store";

import { apiUrl } from "../utils/config";

export const roomApi = createApi({
  reducerPath: "roomApi",
  tagTypes: ["room"],
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const user = (getState() as RootState).persistedReducer.auth;

      if (user && user.token && endpoint !== "refresh") {
        headers.set("Authorization", `Bearer ${user.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getHotelRooms: builder.query<IRoom[], string>({
      query: (id) => `/hotels/room/${id}`,
      providesTags: ["room"],
    }),
    createRoom: builder.mutation<IRoom, Partial<IRoom> & { hotel_id: string }>({
      query: (data) => {
        const { hotel_id, ...body } = data;
        return {
          url: `/rooms/${hotel_id}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["room"],
    }),
    updateRoom: builder.mutation<IRoom, Partial<IRoom>>({
      query: (data) => {
        const { room_id, ...body } = data;
        return {
          url: `/rooms/${room_id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["room"],
    }),
    deleteRoom: builder.mutation<IRoom, string>({
      query: (id) => {
        return {
          url: `/rooms/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["room"],
    }),
  }),
});

export const {
  useGetHotelRoomsQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomApi;
