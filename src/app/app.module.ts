import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RestaurantownerComponent } from './restaurantowner/restaurantowner.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { RestaurantAdminComponent } from './restaurant-admin/restaurant-admin.component';
import { CartAdminComponent } from './cart-admin/cart-admin.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';
import { OrderDetailsAdminComponent } from './order-details-admin/order-details-admin.component';
import { CartDetailsAdminComponent } from './cart-details-admin/cart-details-admin.component';
import { RestaurantDetailsAdminComponent } from './restaurant-details-admin/restaurant-details-admin.component';
import { UserDetailsAdminComponent } from './user-details-admin/user-details-admin.component';
import { RestaurantOwnerViewComponent } from './restaurant-owner-view/restaurant-owner-view.component';
import { SignupformComponent } from './forms/signupform/signupform.component';
import { ContactusFormComponent } from './forms/contactus-form/contactus-form.component';
import { UpdateuserComponent } from './forms/updateuser/updateuser.component';
import { AddRestaurantFormComponent } from './forms/add-restaurant-form/add-restaurant-form.component';
import { UpdateRestaurantFormComponent } from './forms/update-restaurant-form/update-restaurant-form.component';
import { AddCartFormComponent } from './forms/add-cart-form/add-cart-form.component';
import { AddOrderFormComponent } from './forms/add-order-form/add-order-form.component';
import { UpdateOrderFormComponent } from './forms/update-order-form/update-order-form.component';
import { UpdateCartComponent } from './forms/update-cart/update-cart.component';
import { NotAvailableBannerComponent } from './not-available-banner/not-available-banner.component';



@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    ContentComponent,
    FooterComponent,
    UserComponent,
    RestaurantsComponent,
    CartComponent,
    OrderComponent,
    AboutusComponent,
    ContactusComponent,
    AdminComponent,
    HomeComponent,
    PagenotfoundComponent,
    RestaurantownerComponent,
    RestaurantDetailsComponent,
    RestaurantAdminComponent,
    CartAdminComponent,
    OrderAdminComponent,
    OrderDetailsAdminComponent,
    CartDetailsAdminComponent,
    RestaurantDetailsAdminComponent,
    UserDetailsAdminComponent,
    RestaurantOwnerViewComponent,
    SignupformComponent,
    ContactusFormComponent,
    UpdateuserComponent,
    AddRestaurantFormComponent,
    UpdateRestaurantFormComponent,
    AddCartFormComponent,
    AddOrderFormComponent,
    UpdateOrderFormComponent,
    UpdateCartComponent,
    NotAvailableBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSelectModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
