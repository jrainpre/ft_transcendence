import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private apiUrl = 'http://localhost:3001/api/'; // Replace with your backend URL

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  loginWith42(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Add other headers if needed
    });

    return this.http.get(`${this.apiUrl}auth/42/login`, {headers});
  }

  async getProfileInfo(id: string) : Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${this.apiUrl}user/${id}`, { withCredentials: true })
        .subscribe(
          (response: any) => {
            console.log(response);
            resolve(response); // Resolve the Promise with the response data
          },
          (error: HttpErrorResponse) => {
            if (error.status === 400) {
              console.log('Verification failed: Wrong code');
            } else {
              console.log('An error occurred during verification');
            }
            reject(error); // Reject the Promise with the error
          }
        );
  });
  }

  async postEditUsername(changedInfo: any): Promise<any>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Make the POST request
    this.http.post(`${this.apiUrl}edit`, changedInfo, { withCredentials: true }).subscribe(
      (response) => {
        console.log('POST request successful', response);
        // Handle the response here
      },
      (error) => {
        console.error('Error making POST request', error);
        // Handle the error here
      }
    );
  }
}