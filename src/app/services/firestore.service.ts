import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { Doctor } from '../models/doctor.model';
import { Scan } from '../models/scan.model';

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
}


