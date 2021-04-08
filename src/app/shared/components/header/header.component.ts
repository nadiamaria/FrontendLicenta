import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { EventBusService } from '../../services/event-bus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: []
})

export class HeaderComponent implements OnInit, OnDestroy {
  @Output() public menuToggleEmitter: EventEmitter<boolean> = new EventEmitter();
  private menuShow: boolean = false;
  // public products: Product[] = [];
  public cartNumber: number = 0;

  private subscription: Subscription = new Subscription();

  constructor(private eventBus: EventBusService) { }

  ngOnInit(): void {
  //   this.updateCartLength();

  //   this.subscription.add(this.eventBus.on('cartNumberToggleEvent').subscribe(ev => {
  //     this.updateCartLength();
  //   }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onClickMenu(): void {
    this.menuShow = !this.menuShow;
    this.menuToggleEmitter.emit(this.menuShow);

    this.eventBus.emit({ name: 'menuToggleEvent', value: this.menuShow });
  }

  // private updateCartLength(): void {
  //   this.cartNumber = 0;
  //   if (localStorage.getItem('products') === null) {
  //     return;
  //   } else {
  //     this.products = JSON.parse(localStorage.getItem('products'));
  //     if (!this.products) {
  //       return;
  //     }
  //     this.products.forEach((item, index) => {
  //       this.cartNumber += item.quantity;
  //     });
  //   }
  // }

}
