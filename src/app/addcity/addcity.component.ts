import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { City } from '../city';
import { CityService } from '../services/city.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrl: './addcity.component.scss'
})
export class AddcityComponent {

  cityForm: FormGroup;

  constructor(private fb: FormBuilder,private route:Router, private http: HttpClient,private cityservice:CityService){
    this.cityForm = this.fb.group({
      strCityName: ['', Validators.required],
      intStateID: ['', Validators.required],
      intCountryID: ['', Validators.required]
    });
  }

    ngOnInit(): void {
    
  }
  
    onSubmit(): void {
      if (this.cityForm.invalid)
      {
        return;
      }
  
      // console.log(this.cityForm.value);
      const cityData = this.cityForm.value;  //adding value from form to citydata
      this.cityservice.addCity(cityData).subscribe(() => {
        console.log('City added successfully');
        this.cityForm.reset();
        this.route.navigate(['/city']);
      },
       (error: any) => {
        console.error('Error adding city:', error);
      });

      
    }
   
  
}
