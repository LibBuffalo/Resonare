import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private projectDetailsData = new BehaviorSubject<any>('Test Data');
  sharedData = this.projectDetailsData.asObservable();

  constructor() { }

  nextData(_data: any) {
    this.projectDetailsData.next(_data)
  }
}
