import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRestaurantFormComponent } from './update-restaurant-form.component';

describe('UpdateRestaurantFormComponent', () => {
  let component: UpdateRestaurantFormComponent;
  let fixture: ComponentFixture<UpdateRestaurantFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRestaurantFormComponent]
    });
    fixture = TestBed.createComponent(UpdateRestaurantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
