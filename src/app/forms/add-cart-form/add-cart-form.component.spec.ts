import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartFormComponent } from './add-cart-form.component';

describe('AddCartFormComponent', () => {
  let component: AddCartFormComponent;
  let fixture: ComponentFixture<AddCartFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCartFormComponent]
    });
    fixture = TestBed.createComponent(AddCartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
