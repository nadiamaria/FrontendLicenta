import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/data/AuthService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService],
})
export class RegisterComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();

  public registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    password: new FormControl(
      '',
      Validators.minLength(8) && Validators.required
    ),
  });

  constructor(private authService: AuthService, private router: Router) {}

  public onRegister() {
    Object.keys(this.registerForm.controls).forEach((field) => {
      // {1}
      const control = this.registerForm.get(field); // {2}
      control.markAsTouched({ onlySelf: true }); // {3}
    });
    if (this.registerForm.status != 'INVALID') {
      this.subscription.add(
        this.authService
          .register(this.registerForm.value)
          .subscribe((x) => this.router.navigateByUrl('/account/login'))
      );
    }
    // this.router.navigateByUrl('/recipes/home');
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
