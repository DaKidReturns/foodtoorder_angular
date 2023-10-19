import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAvailableBannerComponent } from './not-available-banner.component';

describe('NotAvailableBannerComponent', () => {
  let component: NotAvailableBannerComponent;
  let fixture: ComponentFixture<NotAvailableBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotAvailableBannerComponent]
    });
    fixture = TestBed.createComponent(NotAvailableBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
