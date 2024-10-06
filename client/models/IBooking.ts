export interface IBooking {
  booking_id: string;
  user_id: string;
  hotel_id: string;
  room_id: string;
  check_in: Date;
  check_out: Date;
  total_price: Number;
  status: string;
  is_paid: boolean;
  is_completed: boolean;
}
