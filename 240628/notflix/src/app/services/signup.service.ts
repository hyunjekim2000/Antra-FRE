import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SignupData {
  email?: string;
  password?: string;
  username?: string;
  tmdbKey?: string;
  plan?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private signupDataSubject = new BehaviorSubject<SignupData>({});
  signupData$ = this.signupDataSubject.asObservable();

  updateSignupData(data: Partial<SignupData>) {
    const currentData = this.signupDataSubject.value;
    this.signupDataSubject.next({ ...currentData, ...data });
  }

  getSignupData(): SignupData {
    return this.signupDataSubject.value;
  }

  clearSignupData() {
    this.signupDataSubject.next({});
  }
}
