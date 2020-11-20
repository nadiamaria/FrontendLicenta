import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject$ = new Subject();

  public emit(event: EmitEvent): void {
    this.subject$.next(event);
  }

  public on(event: string): Observable<any> {
    return this.subject$.pipe(
      filter((e: EmitEvent) => e.name === event),
      map((e: EmitEvent) => e.value));
  }
}

export interface EmitEvent {
  name: string;
  value: any;
}
