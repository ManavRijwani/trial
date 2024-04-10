import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

// export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   const password = control.get('password');
//   const confirmPassword = control.get('confirmPassword');

//   if (!password || !confirmPassword) {
//     return null;
//   }

//   return password.value === confirmPassword.value ? null : { passwordsNotMatch: true };
// };
export const confirmPasswordValidator:ValidatorFn =(control:AbstractControl):ValidationErrors|null=>{

  let password=control.get('password');
  let confirmPassword=control.get('confirmPassword');
  if( password?.value !=confirmPassword?.value){
    return {
      passwordMatch:true
    }
  }
return null;
}