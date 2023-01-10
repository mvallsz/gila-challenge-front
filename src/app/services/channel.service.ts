import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor( private http: HttpClient) { }

  getChannels(){

    const url = `http://localhost:3600/api/channels`;
    return this.http.get<any>(url);
  }

}
