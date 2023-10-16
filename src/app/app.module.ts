import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestaurantAdminComponent } from './restaurant-admin/restaurant-admin.component';
import { CartAdminComponent } from './cart-admin/cart-admin.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';
import { OrderDetailsAdminComponent } from './order-details-admin/order-details-admin.component';
import { CartDetailsAdminComponent } from './cart-details-admin/cart-details-admin.component';
import { RestaurantDetailsAdminComponent } from './restaurant-details-admin/restaurant-details-admin.component';
import { UserDetailsAdminComponent } from './user-details-admin/user-details-admin.component';
import { RestaurantOwnerViewComponent } from './restaurant-owner-view/restaurant-owner-view.component';
import { DemoFornNgModelComponent } from './demo-forn-ng-model/demo-forn-ng-model.component';
import { DemoFormNgModelComponent } from './demo-form-ng-model/demo-form-ng-model.component';
import { SignupformComponent } from './forms/signupform/signupform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactusFormComponent } from './forms/contactus-form/contactus-form.component';
import { UpdateuserComponent } from './forms/updateuser/updateuser.component';

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
    DemoFornNgModelComponent,
    DemoFormNgModelComponent,
    SignupformComponent,
    ContactusFormComponent,
    UpdateuserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
