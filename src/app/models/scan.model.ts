export interface Scan {
  id: string;
  patientName: string;
  patientAge: number;
  patientPhone: string;
  patientEmail: string;
  scanType: string;
  scanDate: Date;
  doctorId: string;
  doctorName: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  results?: string;
  notes?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScanType {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  preparation: string;
  isActive: boolean;
}
