import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { Doctor } from '../models/doctor.model';
import { Scan } from '../models/scan.model';
import { Offer, OfferBooking } from '../models/offer.model';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(private afs: AngularFirestore) {}

  // Doctors
  getActiveDoctors$(): Observable<Doctor[]> {
    return this.afs
      .collection<Doctor>('doctors', (ref: any) =>
        (ref as firebase.firestore.CollectionReference).where('isActive', '==', true)
      )
      .valueChanges({ idField: 'id' });
  }

  getAllDoctors$(): Observable<Doctor[]> {
    return this.afs.collection<Doctor>('doctors').valueChanges({ idField: 'id' });
  }

  addDoctor(doctor: Doctor) {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('doctors').doc(id).set({ ...doctor, id, createdAt: now, updatedAt: now });
  }

  updateDoctor(doctor: Doctor) {
    return this.afs.collection('doctors').doc(doctor.id).update({ ...doctor, updatedAt: new Date() });
  }

  deleteDoctor(id: string) {
    return this.afs.collection('doctors').doc(id).delete();
  }

  // Scans
  getScans$(): Observable<Scan[]> {
    return this.afs.collection<Scan>('scans').valueChanges({ idField: 'id' });
  }

  addScan(scan: Scan) {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('scans').doc(id).set({ ...scan, id, createdAt: now, updatedAt: now });
  }

  updateScan(scan: Scan) {
    return this.afs.collection('scans').doc(scan.id).update({ ...scan, updatedAt: new Date() });
  }

  // Offers
  getActiveOffers$(): Observable<Offer[]> {
    return this.afs
      .collection<Offer>('offers', (ref: any) =>
        (ref as firebase.firestore.CollectionReference).where('isActive', '==', true)
      )
      .valueChanges({ idField: 'id' });
  }

  getAllOffers$(): Observable<Offer[]> {
    return this.afs.collection<Offer>('offers').valueChanges({ idField: 'id' });
  }

  getFeaturedOffers$(): Observable<Offer[]> {
    return this.afs
      .collection<Offer>('offers', (ref: any) =>
        (ref as firebase.firestore.CollectionReference)
          .where('isActive', '==', true)
          .where('isFeatured', '==', true)
      )
      .valueChanges({ idField: 'id' });
  }

  getOffersByCategory$(category: string): Observable<Offer[]> {
    return this.afs
      .collection<Offer>('offers', (ref: any) =>
        (ref as firebase.firestore.CollectionReference)
          .where('isActive', '==', true)
          .where('category', '==', category)
      )
      .valueChanges({ idField: 'id' });
  }

  addOffer(offer: Offer) {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('offers').doc(id).set({ ...offer, id, createdAt: now, updatedAt: now });
  }

  updateOffer(offer: Offer) {
    return this.afs.collection('offers').doc(offer.id).update({ ...offer, updatedAt: new Date() });
  }

  deleteOffer(id: string) {
    return this.afs.collection('offers').doc(id).delete();
  }

  // Offer Bookings
  getOfferBookings$(): Observable<OfferBooking[]> {
    return this.afs.collection<OfferBooking>('offerBookings').valueChanges({ idField: 'id' });
  }

  addOfferBooking(booking: OfferBooking) {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('offerBookings').doc(id).set({ ...booking, id, createdAt: now, updatedAt: now });
  }

  updateOfferBooking(booking: OfferBooking) {
    return this.afs.collection('offerBookings').doc(booking.id).update({ ...booking, updatedAt: new Date() });
  }

  deleteOfferBooking(id: string) {
    return this.afs.collection('offerBookings').doc(id).delete();
  }
}


