import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private positionState: any = {};
  private positionState$ = new BehaviorSubject(this.positionState);

  get positions() {
    console.log('Get positions:', this.positionState);
    return this.positionState$.value;
  }

  setPosition(name: string, vertical: number, horizontal: number) {
    console.log(`Set position for ${name}:`, vertical, horizontal);
    this.positionState[name] = [vertical, horizontal];
    this.positionState$.next(this.positionState);
  }

  getPosition(name: string): [number, number] {
    console.log(`Get position for ${name}:`, this.positions[name]);
    return this.positions[name] || [0, 0];
  }
}