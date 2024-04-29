import { Component } from '@angular/core';
import { City } from '../city';
import { CityService } from '../services/city.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})
export class CityComponent {

  cities:City [] =[];

  //method 1
 // searchTerm: string = '';//for filtering

 constructor(private cityservice:CityService,private route:Router,private authService:AuthService){}
 //method2
  filteredCities: City[] = [];
   searchTerm: string = '';

  Role:string;
 
   

  ngOnInit(): void {
    this.getCities();
    this.Role=this.authService.decodeToken().role;
    console.log("Rolee"+this.Role);
  }

  getCities(){
    this.cityservice.getcity().subscribe((res: any) => {
      this.cities = res.data; //res.data isliye use kar rahe hai kyuki hume standard response mai sirf data wala part hi chaiye
    })
  }

  
    deleteCity(intCityID: number) {
      this.cityservice.deleteCity(intCityID).subscribe(() => {
        console.log('City deleted successfully');
        // Update the local cities array to reflect the deletion
        this.cities = this.cities.filter(city => city.intCityID !== intCityID);
      }, (error: any) => {
        console.error('Error deleting city:', error);
      });
  }
  update(id:number){
   this.route.navigateByUrl('/updatecity/'+id);
  }


  //search method 1
  // search() {
  //   // Find the city that matches the search term
  //   const city = this.cities.find(city =>
  //     city.strCityName.toLowerCase() === this.searchTerm.toLowerCase()
  //   );
  //   if (city) {
  //     // Navigate to the city detail page
  //     this.route.navigateByUrl(`/city-detail/${city.intCityID}`);
  //   } else {
  //     alert("city not found");
  //     console.log('City not found');
  //   }
  // }


  //search method 2
  onSearch(): void {
    if(this.searchTerm.trim()===''){
      this.filteredCities=[];
    }else{
      this.filteredCities = this.cities.filter(city =>
        city.strCityName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
  //   if (this.searchInput.trim() === '') {
  //     return this.cities; // Display all cities when search input is empty
  // } else {
  //     return this.cities.filter(city => city.toLowerCase().includes(this.searchInput.toLowerCase()));
  // }
  }


  }

