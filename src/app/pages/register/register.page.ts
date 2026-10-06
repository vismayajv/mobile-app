import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton ,IonText,IonItem,IonInput} from '@ionic/angular';
import { AuthService } from '../../services/auth';
import { RegisterRequest } from '../../models/register-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButton,ReactiveFormsModule,IonText,IonItem,IonInput]
})
export class RegisterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)

  registerForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    mobileNumber: ['', [Validators.required]]
  });

  register() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const request: RegisterRequest = {
      name: this.registerForm.value.name!,
      password: this.registerForm.value.password!,
      email:this.registerForm.value.email!,
      mobileNumber:this.registerForm.value.mobileNumber!
    }
    this.authService.register(request).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
      }
    });
  }

  login(){
    this.router.navigate(['/login'])
  }
}
