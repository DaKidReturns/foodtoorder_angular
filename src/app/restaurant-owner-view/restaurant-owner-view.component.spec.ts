import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantOwnerViewComponent } from './restaurant-owner-view.component';

describe('RestaurantOwnerViewComponent', () => {
  let component: RestaurantOwnerViewComponent;
  let fixture: ComponentFixture<RestaurantOwnerViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantOwnerViewComponent]
    });
    fixture = TestBed.createComponent(RestaurantOwnerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
