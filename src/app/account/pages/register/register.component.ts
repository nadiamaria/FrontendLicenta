import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    email: new FormControl('a'),
    name: new FormControl('a'),
    password: new FormControl('a'),
  });

  constructor(private authService: AuthService, private router: Router) {}

  public onRegister() {
    this.subscription.add(
      this.authService
        .register(this.registerForm.value)
        .subscribe((x) => this.router.navigateByUrl('/account/login'))
    );
    // this.router.navigateByUrl('/recipes/home');
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
