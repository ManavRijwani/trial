import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { group } from '@angular/animations';
import { confirmPasswordValidator } from './cpvalidator';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router: Router) {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)],[this.uniqueUsernameValidator.bind(this)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, this.passwordValidator(),Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]},
      {
        validator: confirmPasswordValidator
      });

      
  }

  //for password validation
  passwordValidator(): any {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      if (!value) {
        return null; // Required validator will handle empty case
      }

      const hasCharacter = /[a-zA-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      if (!hasCharacter || !hasNumber || !hasSpecialCharacter) {
        return { invalidPassword: true };
      }

      return null;
    };
  }

  //for confirm password
  // passwordMatchValidator(group: FormGroup): ValidationErrors | null {
  //   const password = group.get('password').value;
  //   const confirmPassword = group.get('confirmPassword').value;

  //   return password == confirmPassword ? null : { notSame: true };
  // }

  
  //for unique username
  uniqueUsernameValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      const username = control.value;
      if (!username) {
        resolve(null); // Required validator will handle empty case
      } else {
        this.authService.checkUsernameExists(username).then((exists: boolean) => {
          resolve(exists ? { duplicate: true } : null);
        }).catch((error) => {
          console.error('Error checking username:', error);
          resolve({ serverError: true });
        });
      }
    });
  }

  ngOnInit(): void {
  }

  register(): void {
   
    if (this.registrationForm.valid) {
      const { username, email, contact, password } = this.registrationForm.value;
      this.authService.register(username, email, contact, password).subscribe(
        () => {
          console.log('Registration successful');
          this.router.navigate(['/loginform']);
        },
        error => {
          console.error('Registration failed:', error);
        }
      );
    }
  }

  onReset(){
    this.registrationForm.reset();
  }
}
