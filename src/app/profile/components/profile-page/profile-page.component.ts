import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/data/AuthService';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  public logIn: boolean = false;

  constructor(private authService: AuthService,) { }

  ngOnInit(): void {
    this.logIn = this.authService.isAuth();
  }

}
