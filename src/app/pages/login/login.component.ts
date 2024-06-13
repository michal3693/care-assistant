import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonInput,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { LoginService } from 'src/app/services/login.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    IonSegmentButton,
    ReactiveFormsModule,
    IonButton,
    IonContent,
    IonInput,
    RouterLink,
  ],
})
export class LoginComponent implements OnInit {
  credentials!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastsService: ToastsService
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.credentials.invalid) {
      this.toastsService.showError('Wprowadzone dane są niepoprawne');
      return;
    }

    const { email, password } = this.credentials.value;
    this.loginService
      .login(email, password)
      .then(() => this.router.navigate(['']))
      .catch(() => this.toastsService.showError('Logowanie nie powiodło się'));
  }
}
