export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  qualification: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  imageUrl?: string;
  bio: string;
  consultationFee: number;
  availableDays: string[];
  availableTime: string;
  rating: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
