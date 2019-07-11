import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpService) { }

  getAllPosts() {
    return this.http.invoke({
      method: 'GET', // method like POST, GET etc.
      url: 'http://localhost:3000/api', // base URL
      path: 'posts', // API endpoint
      body: null, // body for POST or PUT requests
      headers: {}, // headers you need to add to your request
      query: {} // URL query to be added (eg. ?query=queryValue)
    });
  }
}
