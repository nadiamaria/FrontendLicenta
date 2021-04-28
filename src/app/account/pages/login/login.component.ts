import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/data/AuthService';
import { EventBusService } from 'src/app/shared/services/event-bus.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();

  public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router, private eventBus: EventBusService,) {}

  public onLogin() {
    this.eventBus.emit({ name: 'logIn', value: true }); //nu merge?
    this.subscription.add(
      this.authService.logIn(this.loginForm.value).subscribe((x) => {
        // console.log("login successful if there's a jwt token in the response");
        // localStorage.setItem('token', x.token);
        this.router.navigateByUrl('/recipes/home');
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
