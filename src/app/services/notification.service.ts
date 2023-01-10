import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( private http: HttpClient) { }

  getNotificationRecords(){

    const url = `http://localhost:3600/api/notifications`;
    return this.http.get<any>(url);
  }

}
