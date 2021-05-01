import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartMenuComponent } from './smart-menu.component';

describe('SmartMenuComponent', () => {
  let component: SmartMenuComponent;
  let fixture: ComponentFixture<SmartMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
