import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ValidatorsErrorsService } from 'src/app/core/services/validators-errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  infoMessage?: string 
  loginForm: FormGroup

  constructor( private fb: FormBuilder, private router: Router, private ValidatorsErrors: ValidatorsErrorsService, private AuthService: AuthService){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  getErrorMessage(controlName: string): string{
    return this.ValidatorsErrors.getErrorMessage(this.loginForm, controlName)
  }

  hasError(controlName: string): boolean {
    return this.ValidatorsErrors.hasError(this.loginForm, controlName);
  }

  submit(){
    if(this.loginForm.valid){
      this.AuthService.login(this.loginForm.value).subscribe({
        next: (response) => {
          sessionStorage.setItem('loginToken', response.token)
          this.router.navigate([''])
          console.log('login exitoso:', response);
        },
        error: (error) => {
          if (error.status === 400) {
            // Mensaje específico para error de credenciales incorrectas
            this.infoMessage = 'Email o contraseña incorrectos. Por favor, inténtalo de nuevo.';
          } else {
            // Mensaje genérico para otros tipos de error
            this.infoMessage = error.error ? error.error : 'Error desconocido. Por favor, inténtalo de nuevo.';
          }
        }
      })
    } else {
      console.log(this.loginForm)
       this.infoMessage = 'Por favor, completa todos los campos correctamente.'
    }
  }

  register(){
    this.router.navigate(['register'])
  }
}
