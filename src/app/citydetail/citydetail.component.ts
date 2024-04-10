import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../services/city.service';
import { City } from '../city';
@Component({
  selector: 'app-citydetail',
  templateUrl: './citydetail.component.html',
  styleUrl: './citydetail.component.scss'
})
export class CitydetailComponent {

  city: City | null = null;

  constructor(private route: ActivatedRoute, private cityService: CityService) {
    this.route.params.subscribe(params => {
      const cityId = params['id'];
      this.getCityDetails(cityId);
    });
  }

  getCityDetails(cityId: number) {
    this.cityService.getCityByID(cityId).subscribe((res: any) => {
      this.city = res.data;
    });
  }
}
