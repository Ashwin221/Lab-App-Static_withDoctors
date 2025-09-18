export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  enquiryType: string;
  message: string;
  doctorId?: string;
  doctorName?: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: Date;
}
