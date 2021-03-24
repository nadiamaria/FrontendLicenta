import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserListService } from '../../services/UserListService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserListService]
})
export class RegisterComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  public registerForm = new FormGroup({
    email: new FormControl('a'),
    username: new FormControl('a'),
    password: new FormControl('a'),
  });

  constructor(
    private userListService: UserListService,
    private router: Router
    ) { }

  public ngOnInit(): void {
    // this.listService.getAllListItems().subscribe(retete => {
    //   this.recipeList = retete;
    // });
    console.log(this.registerForm.value);
  }

  public onRegister() {
    console.log(this.registerForm.value);
    // this.userListService.postUser(this.registerForm.value);
    this.subscription.add(this.userListService.postUser(this.registerForm.value).subscribe(x => console.log(x)))
    this.router.navigateByUrl('/recipes/home');
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
