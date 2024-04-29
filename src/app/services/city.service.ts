import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../city';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/dist/types/internal/Observable';
import { dropdown } from '../Dropdown/dropdown';
import { country } from '../Dropdown/country';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private url = "http://localhost:5031/api/City";
  private url1 = "http://localhost:5031/api/City/countrybystateid";
  constructor(private http:HttpClient) { }

  getcity(): Observable<any>{
    return this.http.get<any>(this.url);
  }

  addCity(cityData: City): Observable<any> {
    return this.http.post(this.url, cityData);
  }

  deleteCity(id: number): Observable<any> {
   return this.http.delete(`${this.url}/${id}`);
  }
  // http://localhost:5190/api/City/1
  updateCity(id: number,cityData: any ): Observable<any> {

    return this.http.put(`${this.url}/${id}`, cityData);
  }
  getCityByID(id:number){
    return this.http.get(`${this.url}/${id}`);
  }

  getcountrybystateid(id : number): Observable<dropdown[]>{
    return this.http.get<dropdown[]>(`${this.url1}/${id}`);
  }

  getstate() : Observable<any>{
    return this.http.get<any>("http://localhost:5031/api/State");
  }
}
