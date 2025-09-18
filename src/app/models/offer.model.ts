export interface Offer {
  id?: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  features: string[];
  validityDate: Date;
  isActive: boolean;
  isFeatured: boolean;
  category: 'health' | 'family' | 'senior' | 'seasonal';
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OfferBooking {
  id?: string;
  offerId: string;
  offerTitle: string;
  offerPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  preferredDate: Date;
  age: number;
  gender: 'male' | 'female' | 'other';
  specialRequirements?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
}
