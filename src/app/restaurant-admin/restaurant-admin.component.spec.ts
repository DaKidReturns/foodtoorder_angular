import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAdminComponent } from './restaurant-admin.component';

describe('RestaurantAdminComponent', () => {
  let component: RestaurantAdminComponent;
  let fixture: ComponentFixture<RestaurantAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantAdminComponent]
    });
    fixture = TestBed.createComponent(RestaurantAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
