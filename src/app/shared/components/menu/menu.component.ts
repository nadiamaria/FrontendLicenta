import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { EventBusService } from '../../services/event-bus.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        marginLeft: '-272px'
      })),
      state('closed', style({
        marginLeft: '0px'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class MenuComponent implements OnInit, OnDestroy {
  @Input() public menuToggleObservable: Observable<boolean>;

  private subscription: Subscription = new Subscription();
  public cartNumber: number = 0;
  public isOpen: boolean = false;


  constructor(private eventBus: EventBusService) { }

  public ngOnInit(): void {
    this.subscription.add(this.menuToggleObservable.subscribe((cartState) => {
      this.isOpen = cartState;
    }));

    this.subscription.add(this.eventBus.on('menuToggleEvent').subscribe((data: boolean) => console.log('Eventbus: ', data)));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
