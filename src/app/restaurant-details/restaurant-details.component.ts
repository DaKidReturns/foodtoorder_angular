import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';
import { Dish } from '../models/dish';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent {
  restaurant:Restaurant = new Restaurant(0,"",[],[],"");
  currentUserId:number=-1
  constructor(private activateRoute:ActivatedRoute,private restaturantService:RestaurantService, private cartService:CartService){
    this.activateRoute.params.subscribe((params:Params)=>{
      // console.log("Details for "+params['rid']);
      restaturantService.getRestaurantById(params['rid']).subscribe((data)=>this.restaurant=data);
    })

  }

  addItemToUserCart(dish:Dish){
    // console.log(dish)
    this.currentUserId = parseInt(localStorage.getItem('userId')??"-1")??-1
    if(this.currentUserId==-1) return

    var userCart:Cart 
    this.cartService.getCartById(this.currentUserId).subscribe((cart)=>{
      // userCart = cart
      if(cart.restaurantId!=this.restaurant.id){
        // console.log("Not matchting "+cart.restaurantId+"  &&  "+this.restaurant.id)
        cart.items=[]
        cart.amount=0
        cart.quantity=[]
        //cart.restaurantId=-1
        cart.restaurantId=this.restaurant.id
      }
      console.log(cart)
      this.cartService.addItemToCart(dish,cart).subscribe()
    })  
  }
}
