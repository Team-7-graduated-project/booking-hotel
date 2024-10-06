export interface IRoom {
  room_id: string;
  hotel_id: string;
  room_bumber: number;
  room_type: string;
  title: string;
  description: string;
  price: number;
  max_people: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
