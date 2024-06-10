import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonIcon,
  IonButton,
  IonContent,
  IonInput,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonIcon,
    IonButton,
    IonContent,
    IonInput,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    RouterLink,
  ],
})
export class RegisterComponent implements OnInit {
  newUser!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.newUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });
  }

  register() {
    console.log(this.newUser.value);
  }
}
