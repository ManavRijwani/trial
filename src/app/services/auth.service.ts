// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5031/api/Auth/login'; // Update with your API URL
  private api = 'http://localhost:5031/api/Auth/Register';
  private api2 = 'http://localhost:5031/api';
  private api3 = 'http://localhost:5031/api/Auth';
  constructor(private http: HttpClient) { }

  

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        if(response && response.token)
          localStorage.setItem('jwtToken', response.token);
          // localStorage.setItem('username',response.username);
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

  getUserByID(id:number){
    return this.http.get(`${this.api3}/${id}`);
  }


  decodeToken(){
    var decode=new JwtHelperService();
    return decode.decodeToken(this.getToken());
   
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
