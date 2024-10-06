export interface IVoucher {
  code: string;
  created_at: Date;
  discount_amount: number;
  discount_type: number;
  valid_from: Date;
  valid_to: Date;
  usage_limit: number;
}
