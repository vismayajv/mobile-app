import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton,IonItem,IonInput  } from '@ionic/angular';
import { AuthService } from '../../services/auth';
import { LoginRequest } from '../../models/login_request';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButton,IonItem,ReactiveFormsModule,IonInput ]
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

   login() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const request: LoginRequest = {
    email: this.loginForm.value.email!,
    password: this.loginForm.value.password!
  };

    this.authService.login(request).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
        console.log('Login successful:', response);
        
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }

  goToRegister(){
     this.router.navigate(['/register']);
  }
}





  