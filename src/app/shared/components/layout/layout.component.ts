import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {
  private toggleMenuSubject: Subject<boolean> = new Subject();
  public toggleMenuObservable: Observable<boolean> = this.toggleMenuSubject.asObservable();

  constructor() { }

  public ngOnInit(): void {
  }

  public onMenuToggle($event: boolean): void {
    this.toggleMenuSubject.next($event);
  }
}
