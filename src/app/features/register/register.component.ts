import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsErrorsService } from 'src/app/core/services/validators-errors.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup

  constructor( private fb: FormBuilder, private router: Router, private ValidatorsErrors: ValidatorsErrorsService, private AuthService: AuthService){
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    })
  }


  getErrorMessage(controlName: string): string{
    return this.ValidatorsErrors.getErrorMessage(this.registerForm, controlName)
  }

  hasError(controlName: string): boolean {
    return this.ValidatorsErrors.hasError(this.registerForm, controlName);
  }

  submit(){
    if(this.registerForm.valid){
      this.AuthService.register(this.registerForm.value).subscribe({
        next: (response) => {
          sessionStorage.setItem('registerToken', response.token)
          console.log('registro exitoso:', response);
        },
        error: (error) => {
          console.log('error en el registro:', error);
        }
      })
      console.log(this.registerForm)
    }
  }


  back(){
    this.router.navigate(['login'])
  }
}
