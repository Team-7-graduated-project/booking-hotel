export interface Address {
  name: string;
  lat: number;
  lng: number;
  hotel_id: string;
}

export interface IHotel {
  hotel_id: string;
  staff_id: string;
  description: string;
  desc_short: string;
  address: Address;
  distance: string;
  photos: string[];
  title: string;
  type: string;
  cheapest_price: number;
  featured: boolean;
  star_rating: number;
  rooms: string[];
  name: string;
  created_at: Date;
  updated_at: Date;
  published: boolean;
  reviews: object[];
}
