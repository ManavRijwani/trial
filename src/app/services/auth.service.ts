// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7006/api/Auth/login'; // Update with your API URL
  private api = 'https://localhost:7006/api/Auth/Register';
  private api2 = 'https://localhost:7006/api';
  constructor(private http: HttpClient) { }

  

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        if(response && response.token)
          localStorage.setItem('jwtToken', response.token);
      })
    );
  }

  getToken(): string {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  register(username: string, email: string, contact: number,  password: string ): Observable<any> {
    return this.http.post(this.api, { username, email,contact, password });
  }

  //to check unique username
  
//   checkUsernameExists(username: string): Promise<boolean> {
//     return this.http.get<boolean>(`https://localhost:7006/api/Auth/Users?username=${username}`).toPromise();
// }


 // to check unique username
  // checkUsernameExists(username: string): Promise<boolean> {
  //   return this.http.get<boolean>(`https://localhost:7006/api/Auth/Users?username=${username}`)
  //     .pipe(
  //       map(response => response as boolean)
  //     )
  //     .toPromise();
  // }


  // checkUsernameExists(username: string): Promise<boolean> {
  //   return this.http.get<boolean>(`${this.api2}/${username}`)
  //     .toPromise()
  //     .then(response => response)
  //     .catch(error => {
  //       console.error('Error checking username:', error);
  //       return false;
  //     });
  //   }

  async checkUsernameExists(username: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(this.http.get<boolean>(`${this.api2}/Auth/CheckUser?username=${username}`));
      return response as boolean;
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
  }
}
