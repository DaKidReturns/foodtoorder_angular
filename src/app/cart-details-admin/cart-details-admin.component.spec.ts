import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailsAdminComponent } from './cart-details-admin.component';

describe('CartDetailsAdminComponent', () => {
  let component: CartDetailsAdminComponent;
  let fixture: ComponentFixture<CartDetailsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartDetailsAdminComponent]
    });
    fixture = TestBed.createComponent(CartDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
