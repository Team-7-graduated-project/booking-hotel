import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "../../components/core";
import { HotelPreview } from "../../components/hotel";
import { Layout, Loader } from "../../components/layout";
import { setBookings } from "../../features/appSlice";
import {
  useDeleteBookingMutation,
  useGetAllBookingQuery,
} from "../../services/bookingApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import withAuthentication from "../../components/withAuthentication";
import moment from "moment";

const ListBookingPage = () => {
  const { hotels } = useAppSelector((state) => state.persistedReducer.hotel);
  const { data, isLoading, isSuccess } = useGetAllBookingQuery({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) dispatch(setBookings(data));
  }, [dispatch, data, isSuccess]);

  const { bookings } = useAppSelector((state) => state.persistedReducer.app);

  const bookingListHotel = bookings?.map((booking: any) =>
    hotels?.filter((hotel) => booking.hotel_id === hotel.hotel_id)
  );

  const [
    deleteBooking,
    {
      isSuccess: deleteBookingSuccess,
      isError: deleteBookingError,
      error: deleteError,
    },
  ] = useDeleteBookingMutation();

  const handleDeleteBooking = async (id: string) => {
    await deleteBooking(id);
  };

  if (deleteBookingSuccess) {
    toast.success("Deleted Booking Successfully");
  }

  if (deleteBookingError) {
    toast.error(
      (deleteError as any)?.data?.message
        ? (deleteError as any).data.message
        : "Some thing went error"
    );
  }

  if (isLoading) {
    return (
      <div className="w-screen mt-20 flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <Layout
      metadata={{
        title: `Your booking - Booking`,
        description: `Booking`,
      }}
    >
      <div
        className={
          bookingListHotel && bookingListHotel.length > 0
            ? `grid grid-cols-1 gap-4 md:grid-cols-2 p-2 mt-8 lg:grid-cols-2 justify-center mx-auto max-w-screen-xl overflow-hidden`
            : `w-screen mt-20 flex items-center justify-center`
        }
      >
        {bookingListHotel && bookingListHotel.length > 0 ? (
          <>
            {bookingListHotel?.map((hotel: any) => (
              <div key={hotel[0].hotel_id}>
                <HotelPreview
                  id={hotel[0].hotel_id}
                  image={hotel[0].photos[0]}
                  name={hotel[0].name}
                  title={hotel[0].title}
                  large={true}
                />
              </div>
            ))}

            {bookings?.map((booking: any) => (
              <div key={booking.booking_id} className="ml-2">
                <h3 className="font-bold text-xl">USD {booking.total_price}</h3>
                <p>Check in: {moment(booking.check_in).format("LLL")}</p>
                <p>Check out: {moment(booking.check_out).format("LLL")}</p>

                <div
                  onClick={() => handleDeleteBooking(booking.booking_id)}
                  className="mt-4"
                >
                  <Button
                    text="Delete"
                    textColor="text-white"
                    bgColor="bg-primary"
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          <h1 className="font-bold text-3xl">No room booking</h1>
        )}
      </div>
    </Layout>
  );
};

export default withAuthentication(ListBookingPage);
