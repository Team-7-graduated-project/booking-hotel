export interface IUser {
  user_id: string;
  name: string;
  email: string;
  username: string;
  phone_number: number;
  role: 1;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  wishlist: string[];
}
