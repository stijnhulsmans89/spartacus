import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { StoreFinderPageLayoutComponent } from './store-finder-page-layout.component';

@Component({
  selector: 'cx-store-finder-header',
  template: ''
})
export class MockStoreFinderHeaderComponent {}

@Component({
  selector: 'router-outlet',
  template: ''
})
export class MockRouterOutlet {}

describe('StoreFinderPageLayoutComponent', () => {
  let component: StoreFinderPageLayoutComponent;
  let fixture: ComponentFixture<StoreFinderPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StoreFinderPageLayoutComponent,
        MockStoreFinderHeaderComponent,
        MockRouterOutlet
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display StoreFinderHeaderComponent', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('cx-store-finder-header')
    ).not.toBeNull();
  });

  it('should display the router outlet', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('router-outlet')
    ).not.toBeNull();
  });
});
