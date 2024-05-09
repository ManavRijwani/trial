import { Component, ViewChild } from '@angular/core';
import { City } from '../city';
import { CityService } from '../services/city.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PDFExportComponent } from '@progress/kendo-angular-pdf-export';
import { Workbook } from '@progress/kendo-angular-excel-export';
import { saveAs } from '@progress/kendo-file-saver';

import { NgxSpinnerService } from 'ngx-spinner';

// import { ExcelExportService } from '@progress/kendo-angular-excel-export';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})
export class CityComponent {

  cities:City [] =[];


  //method 1
 // searchTerm: string = '';//for filtering

 constructor(private cityservice:CityService,private route:Router,private authService:AuthService,private spinner: NgxSpinnerService){}
 //method2
  filteredCities: City[] = [];
   searchTerm: string = '';
   load:boolean=false;
  Role:string;
 
  //without loader
  // ngOnInit(): void {
  //   this.getCities();
  //   this.Role=this.authService.decodeToken().role;
  //   console.log("Rolee"+this.Role);   
  // }
   
  //for loader
  ngOnInit(): void {
   this.refresh();
  }

  refresh(){
  this.load=true;
  setTimeout(() => {
    this.load=false;
    this.getCities();
    this.Role=this.authService.decodeToken().role;
    console.log("Rolee"+this.Role);
  },2000);
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

  showLoader() {
    this.cities=[];
    this.refresh(); // Hide the spinner after 2 seconds (simulating a delay)
  }


  @ViewChild('pdf', { static: false }) pdf: PDFExportComponent;
  exportToPDF() {
    this.pdf.saveAs('sample.pdf');
  }
  exportToExcel() {
    const data = this.cities.map(city => ({
      'City ID': city.intCityID,
      'State ID': city.intStateID,
      'Country ID': city.intCountryID,
      'City Name': city.strCityName
    }));
  
    const worksheet: string[][] = [
      ['City ID', 'State ID', 'Country ID', 'City Name'],
      ...data.map(item => [String(item['City ID']), String(item['State ID']), String(item['Country ID']), item['City Name']])
    ];
  
    const worksheetArray = worksheet.map(row => row.join('\t')).join('\n');
    const blob = new Blob([worksheetArray], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'cities.xlsx');
    document.body.appendChild(link);
    link.click();
  }
  

 
  }

