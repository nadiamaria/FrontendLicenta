import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../data/AuthService';

import { EventBusService } from '../../services/event-bus.service';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { ThrowStmt } from '@angular/compiler';
import { decode } from '../../data/dataModel/decodeDto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()
  public menuToggleEmitter: EventEmitter<boolean> = new EventEmitter();
  private menuShow: boolean = false;
  // public products: Product[] = [];
  public username: string;

  //get cookie and decode
  public userId: number = 1;

  private subscription: Subscription = new Subscription();
  private subLogOut: Subscription = new Subscription();
  private auth: Subscription = new Subscription();

  public logedIn: boolean = false;
  public showPlus: boolean = false;
  public showAdmin: boolean = false;

  constructor(
    private eventBus: EventBusService,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuth()) {
      this.logedIn = true;
      this.getAuth();
    }

    var token = this.cookieService.get('authorization');

    if (token != null && token != '') {
      var decoded: decode = jwt_decode(token);
      if (decoded.role == 'admin') {
        this.showPlus = true;
      } else {
        this.showPlus = false;
      }
      if (decoded.role == 'owner') {
        this.showAdmin = true;
      } else {
        this.showAdmin = false;
      }
    } else {
      this.showPlus = false;
      this.showAdmin = false;
    }

    this.subscription.add(
      this.eventBus.on('logIn').subscribe((ev) => {
        this.logedIn = ev;
      })
    );
  }

  public onClickMenu(): void {
    this.menuShow = !this.menuShow;
    this.menuToggleEmitter.emit(this.menuShow);
    this.eventBus.emit({ name: 'menuToggleEvent', value: this.menuShow });
  }

  public refreshFavorites(): void {
    this.eventBus.emit({ name: 'favoritePageEvent', value: 'unauth' });
  }

  public onLogout() {
    this.refreshFavorites();
    this.eventBus.emit({ name: 'logIn', value: false });
    this.eventBus.emit({ name: 'auth', value: 'Loged out successfully!' });
    this.subLogOut.add(
      this.authService.logOut().subscribe((x) => {
        this.router.navigateByUrl('/recipes/home');
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subLogOut.unsubscribe();
  }

  public async getAuth(): Promise<void> {
    var token = this.cookieService.get('authorization');
    var decoded: decode = jwt_decode(token);
    console.log(decoded)
    this.username = decoded.name;
    // await this.auth.add(
    //   this.authService.auth().subscribe((x) => {
    //     console.log(x);
    //     this.username = x.name;
    //   })
    // );
  }
}
