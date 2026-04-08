import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from "../../../shared/components/UI/error-message/error-message.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  apiErorr!: string;
  isCallingAPI: boolean = false;
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{5,}$/),
      ]),
      rePassword: new FormControl(),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.validateRePassword,
  );
  _authService = inject(AuthService);
  _router = inject(Router);
  isFormCliced: boolean = false;

  register() {
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.apiErorr = '';
      if (!this.isCallingAPI) {
        this.isCallingAPI = true;
        this._authService.registerUser(this.registerForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.isCallingAPI = false;
            this._router.navigate(['/auth']);
          },
          error: (err) => {
            console.log(err);
            this.apiErorr = err.error.message;
            this.isCallingAPI = false;
          },
          complete: () => {},
        });
      }
    }
  }
  validateRePassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const repassword = form.get('rePassword')?.value;
    if (password == repassword) {
      return null;
    } else {
      return { misMatch: true };
    }
  }
}
