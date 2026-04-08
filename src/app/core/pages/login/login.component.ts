import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { ErrorMessageComponent } from '../../../shared/components/UI/error-message/error-message.component';
import { CustomInputComponent } from '../../../shared/components/UI/custom-input/custom-input.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ErrorMessageComponent, CustomInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  apiErorr!: string;
  isCallingAPI: boolean = false;
  loginForm!: FormGroup;
  toggleInput: boolean = false;
  _authService = inject(AuthService);
  _router = inject(Router);
  isFormCliced: boolean = false;

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{5,}$/),
      ]),
    });
  }

  login() {
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.apiErorr = '';
      if (!this.isCallingAPI) {
        this.isCallingAPI = true;
        this._authService.loginUser(this.loginForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.isCallingAPI = false;
            localStorage.setItem('userToken', res.token);
            this._authService.savaUser();
            this._router.navigate(['/home']);
            // setTimeout(() => {
            //   this._router.navigate(['/home']);
            // }, 2000);
            // timer(2000).subscribe(() => {
            //   this._router.navigate(['/home']);
            // });
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
  togglePassword() {
    this.toggleInput = !this.toggleInput;
  }
}
