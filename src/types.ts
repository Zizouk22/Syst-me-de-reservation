export interface Provider {
  id: number;
  name: string;
  specialty: string;
  rating: number;
}

export interface Appointment {
  id: number;
  provider: string;
  service: string;
  date: string;
  time: string;
}