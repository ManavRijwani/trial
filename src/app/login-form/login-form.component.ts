import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  username:string;
  password:string;
  rememberMe: boolean = false; //for remember me

  constructor(private router: Router,private authService: AuthService) {}
  
//  login without remember me
  // login()
  // {
  //   // console.log(this.username,this.password);
  //   this.authService.login(this.username, this.password).subscribe(
  //      (response) => {
  //       const token = response.token;
  //       console.log(token);
  //       // Store the token in localStorage or another storage mechanism
  //       // localStorage.setItem('jwtToken', token);
  //       // // Redirect or perform any necessary actions
  //       this.router.navigate(['/home']);
  //       this.authService.decodeToken().role;
  //     },
  //     (error:any) => {
  //       // Handle authentication error
  //       console.error('Login error:', error);
  //     }
  //   );
    
  // }

  ngOnInit() {
    // Check if token exists in localStorage
    const token1 = localStorage.getItem('jwtToken');
    const token = localStorage.getItem('tokenExpiry');
    if(token1)
    if (token) {
      // Token found, navigate to home component
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.authService.login(this.username, this.password, this.rememberMe).subscribe(
      (response) => {
        const token = response.token;
        console.log(token);
        // Store the token in localStorage or another storage mechanism
        // localStorage.setItem('jwtToken', token);
        // Redirect or perform any necessary actions
        this.router.navigate(['/home']);
        this.authService.decodeToken().role;
      },
      (error: any) => {
        // Handle authentication error
        console.error('Login error:', error);
      }
    );
  }
 }


