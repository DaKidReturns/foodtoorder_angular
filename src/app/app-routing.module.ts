import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { adminGuard } from './guards/admingurard';
import { RestaurantownerComponent } from './restaurantowner/restaurantowner.component';
import { restaurantOwnerGuard } from './guards/restaurantownerguard';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';
import { CartAdminComponent } from './cart-admin/cart-admin.component';
import { CartDetailsAdminComponent } from './cart-details-admin/cart-details-admin.component';
import { OrderDetailsAdminComponent } from './order-details-admin/order-details-admin.component';
import { UserDetailsAdminComponent } from './user-details-admin/user-details-admin.component';
import { RestaurantDetailsAdminComponent } from './restaurant-details-admin/restaurant-details-admin.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'aboutus',component:AboutusComponent},
  {path:'contactus',component:ContactusComponent},
  {path:'restaurants',component:RestaurantsComponent},
  {path:'restaurantdetails/:rid',component:RestaurantDetailsComponent},
  {path:'owner',component:RestaurantownerComponent,canActivate:[restaurantOwnerGuard()]},
  {path:'admin',component:AdminComponent,canActivate:[adminGuard()]},
  {path:'userdetails/:userId',component:UserDetailsAdminComponent,canActivate:[adminGuard()]},
  {path:'restaurantdetailsadmin/:rid',component:RestaurantDetailsAdminComponent,canActivate:[()=>(adminGuard()||restaurantOwnerGuard())]},
  {path:'cartadmindetails/:cartId',component:CartDetailsAdminComponent,canActivate:[adminGuard()]},
  {path:'orderadmindetails/:orderId',component:OrderDetailsAdminComponent,canActivate:[adminGuard()]},
  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*,{enableTracing:true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
