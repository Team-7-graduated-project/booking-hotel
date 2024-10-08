import React from "react";
import Link from "next/link";
import { Button } from "../../components/core";
import { CiEdit, FiTrash, IoMdAdd } from "../../utils/icons";
import {
  useDeleteHotelMutation,
  useGetMyHotelsQuery,
} from "../../services/userApi";
import { Layout, Loader } from "../../components/layout";
import ErrorPage from "next/error";
import moment from "moment";
import Image from "next/image";
import { toast } from "react-toastify";
import withAuthentication from "../../components/withAuthentication";

const JoinPage = () => {
  const { data: myHotels = [], isLoading, error } = useGetMyHotelsQuery();

  const [deleteHotel, { isLoading: isDeleting }] = useDeleteHotelMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await deleteHotel(id).unwrap();
        toast.success("Delete success");
      } catch (e) {
        console.error("Delete hotel error:", e);
        toast.error("Something went wrong when deleting");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-screen mt-20 flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (error) {
    console.error("Error fetching hotels:", error);
    let status = 404;
    if ("status" in error) {
      status = error.status as number;
    }
    return <ErrorPage statusCode={status} />;
  }
  return (
    <Layout
      metadata={{
        title: `Join cooperation - Booking`,
        description: `Join cooperation - Booking`,
      }}
    >
      <div className="my-4 mx-auto container px-4 lg:px-6 overflow-hidden flex flex-col">
        <div className="w-max mb-4">
          <Link href="/join/create">
            <Button
              text={"New Hotel"}
              bgColor="bg-lightPrimary"
              textColor="text-white"
              IcAfter={IoMdAdd}
            />
          </Link>
        </div>
        {myHotels?.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-10 gap-y-5">
            {myHotels?.map((hotel) => (
              <div
                key={hotel.hotel_id}
                className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg"
              >
                <Image
                  src={
                    hotel.photos[0] ||
                    "https://images.unsplash.com/photo-1524758631624-e2822e304c36"
                  }
                  alt={hotel.name}
                  width={1000}
                  height={200}
                  className="w-full h-40 object-cover"
                />
                <div className="bg-white p-4 sm:p-6">
                  <time
                    dateTime={new Date(hotel.updated_at).toISOString()}
                    className="block text-xs text-gray-500"
                  >
                    {moment(hotel.updated_at).fromNow()}
                  </time>

                  <div>
                    <h3 className="mt-0.5 text-lg text-gray-900">
                      {hotel.name}
                    </h3>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
                    {hotel.description}
                  </p>
                </div>
                <div className="w-full">
                  <div className="flex justify-around">
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => handleDelete(hotel.hotel_id as string)}
                    >
                      <Button
                        text="Delete"
                        textColor="text-white"
                        bgColor={isDeleting ? "bg-gray-500" : "bg-red-500"}
                        IcAfter={FiTrash}
                      />
                    </button>
                    <Link href={`/join/edit/${hotel.hotel_id}`}>
                      <Button
                        text="Edit"
                        textColor="text-white"
                        bgColor="bg-green-500"
                        IcAfter={CiEdit}
                      />
                    </Link>
                  </div>
                </div>
                <div className="absolute w-full z-10 top-0 ">
                  <div
                    className={`m-5 w-5 h-5 rounded-full border border-white relative ${
                      hotel.published ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center">
            You have not created any hotels
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withAuthentication(JoinPage);
