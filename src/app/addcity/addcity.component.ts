import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { City } from '../city';
import { CityService } from '../services/city.service';
import { Router, ActivatedRoute } from '@angular/router';
import { state } from '../Dropdown/state';
import { country } from '../Dropdown/country';
import { dropdown } from '../Dropdown/dropdown';

@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrl: './addcity.component.scss'
})
export class AddcityComponent {

  cityForm: FormGroup;
  states: state[] = [];
  ctr:any[]=[];
  countries:any;
  constructor(private fb: FormBuilder,private route:Router, private http: HttpClient,private cityservice:CityService){
    this.cityForm = this.fb.group({
      strCityName: ['', Validators.required],
      intStateID: ['', Validators.required],
      intCountryID: ['', Validators.required]
    });
  }

    ngOnInit(): void {
      this.cityservice.getstate().subscribe((data :any)=> {
        this.states = data;
        // console.log(data);
      })
  }
  
    onchange()
    {
      // console.log(this.cityForm.value["intStateID"]);
      this.getcountry();
    }

    getcountry()
    {
      const cid = this.cityForm.value["intStateID"];
      console.log(cid);
    this.cityservice.getcountrybystateid(cid).subscribe((res : any) => {
    this.countries = res.data;
    this.ctr=[];
    console.log(res);
    console.log(this.countries);
    //method1
    this.ctr.push(this.countries.strcountryName);
    //method2
    // this.ctr.push(this.countries);
    console.log(this.ctr);
  });
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
