import { LatLng } from "leaflet";
import { cartItem } from "../cartitem";

export class Order{
  id!: number;
  items!: cartItem[];
  totalPrice!: number;
  name!: string;
  address!: string;
  addressLatLng?: LatLng;
  paymentId!: string;
  createAt!: string;
  status!: string;


}
