import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CityService } from '../services/city.service';
import { City } from '../city';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updatecity',
  templateUrl: './updatecity.component.html',
  styleUrl: './updatecity.component.scss'
})
export class UpdatecityComponent implements OnInit {
  constructor(private route:Router,private active:ActivatedRoute,private cityservice:CityService){}
cid=0;
updateCity=new FormGroup({
  intCityID:new FormControl(),
  strCityName: new FormControl(''),
  intStateID:new FormControl('') ,
  intCountryID: new FormControl('')
});
ngOnInit(){
 let id=this.active.snapshot.params["id"];
 this.cid=id;
 // console.log(this.cid);
    this.cityservice.getCityByID(this.cid).subscribe((response:any)=>{
      console.log(response);
    // this.updateCity.strCityName=data.strCityName;
    this.updateCity.patchValue({
      intCityID:this.cid,
      strCityName:response.data.strCityName,
      intStateID:response.data.intStateID,
      intCountryID:response.data.intCountryID});
    //this.updateCity=data;
    });
}
onSubmit(){
  // console.log(this.cid);
  // console.log(this.updateCity.value);
 this.cityservice.updateCity(this.cid,this.updateCity.value).subscribe((response:any)=>{
   console.log(response.data);
   this.route.navigate(['/city']);
  });
}


}
