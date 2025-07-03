export interface Equipment {
  id: number;
  name: string;
  claim: string;
  icon: string;
  image: string;
  pricePerMinute: number;
  onClick(): void;
}

export type EquipmentResult = Equipment[];

export interface EquipmentBookingRequest {
  duration: number;
}
interface EquipmentBooking {
  id: number;
  equipment_id: number;
  user_id: string;
  start_date: string; // ISO 8601 format
  end_date: string; // ISO 8601 format
}
