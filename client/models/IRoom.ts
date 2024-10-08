export interface IRoom {
  room_id: string;
  hotel_id: string;
  room_number: string;
  room_type: string;
  title: string;
  description: string;
  price: number;
  max_people: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
  __v?: number;
}
