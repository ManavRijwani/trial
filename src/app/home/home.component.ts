import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private authservice:AuthService){}

  username:string;
  ngOnInit(): void {
    this.username=this.authservice.decodeToken().unique_name;
    console.log("User_name"+this.username);
  }
}
