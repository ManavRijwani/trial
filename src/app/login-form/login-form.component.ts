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
  

  constructor(private router: Router,private authService: AuthService) {}
  
 
  login()
  {
    // console.log(this.username,this.password);
    this.authService.login(this.username, this.password).subscribe(
       (response) => {
        const token = response.token;
        console.log(token);
        // Store the token in localStorage or another storage mechanism
        // localStorage.setItem('jwtToken', token);
        // // Redirect or perform any necessary actions
        this.router.navigate(['/home']);

      },
      // error: (error) => {
      //   // Handle authentication error
      //   console.error('Login error:', error);
      // }
    );
    
  }
 }


