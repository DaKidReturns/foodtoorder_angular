import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsAdminComponent } from './user-details-admin.component';

describe('UserDetailsAdminComponent', () => {
  let component: UserDetailsAdminComponent;
  let fixture: ComponentFixture<UserDetailsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailsAdminComponent]
    });
    fixture = TestBed.createComponent(UserDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
