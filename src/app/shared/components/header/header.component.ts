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

  constructor(
    private eventBus: EventBusService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuth()) {
      this.logedIn = true;
      this.getAuth();
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

  public getAuth(): void {
    this.auth.add(
      this.authService.auth().subscribe((x) => {
        this.username = x.name;
      })
    );
  }
}
