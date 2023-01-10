import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageInterface} from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor( private http: HttpClient) { }

  createMessage(data: any){

    const url = `http://localhost:3600/api/messages`;
    return this.http.post<any>(url, data);
  }

}
