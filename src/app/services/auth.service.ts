import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  signInWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.afAuth.signOut();
  }

  isLoggedIn$(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => !!user));
  }

  isAdmin$(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => {
        const userEmail = user?.email?.toLowerCase() || '';
        const adminEmail = environment.admin.email?.toLowerCase() || '';
        return !!user && !!userEmail && userEmail === adminEmail;
      })
    );
  }
}


