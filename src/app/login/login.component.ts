import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoginErrors, selectLoginMessage } from './ngrx/login.reducer';
import { LoginRequestInterface } from './ngrx/login.interface';
import { LogRegActions } from './ngrx/login.actions';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule

  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginMessage$: Observable<string | null>;
  loginErrors$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private snackBar: MatSnackBar
  ){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.loginMessage$ = this.store.select(selectLoginMessage);
    this.loginErrors$ = this.store.select(selectLoginErrors);

    this.loginMessage$.subscribe((message) => {
      if (message) {
        this.showSnackbar(message);
      }
    });

    this.loginErrors$.subscribe((error) => {
      if (error) {
        this.showSnackbar(error);
      }
    });

  }

  onLogin(){
    if(this.loginForm.valid){
      const loginPayload: LoginRequestInterface = this.loginForm.value;
      this.store.dispatch(LogRegActions.login({loginPayload}))
    }
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

}
