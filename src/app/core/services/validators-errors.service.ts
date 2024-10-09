import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsErrorsService {

  constructor() { }

  private errorMessages: any = {
    required: 'Este campo es requerido',
    email: 'El formato del correo es incorrecto',
    minlength: 'Se requieren minimo 7 caracteres',
  }

  getErrorMessage(form: FormGroup, controlName: string): string {
    const control = form.get(controlName)
    
    if (control && control.errors) {
      for (const error in control.errors) {
          return this.errorMessages[error]
      }
    }
    return '';
  }

  hasError(form: FormGroup, controlName: string): boolean {
    const control = form.get(controlName)
    return !!(control?.invalid && (control.dirty || control.touched))
  }
}
