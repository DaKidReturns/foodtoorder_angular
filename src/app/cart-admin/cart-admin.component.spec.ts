import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAdminComponent } from './cart-admin.component';

describe('CartAdminComponent', () => {
  let component: CartAdminComponent;
  let fixture: ComponentFixture<CartAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartAdminComponent]
    });
    fixture = TestBed.createComponent(CartAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
