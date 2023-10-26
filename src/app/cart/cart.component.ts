import { Component } from '@angular/core';

import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';
import { Dish } from '../models/dish';
import { RestaurantService } from '../services/restaurant.service';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  loggedInUserId:number = -1
  cart:Cart = new Cart()
  //cartItems:Dish[]

  constructor(private cartService:CartService, private orderService:OrderService ){
    this.loggedInUserId = parseInt(localStorage.getItem('userId')??'-1') ?? -1
      cartService.getCartById(this.loggedInUserId).subscribe((data) => { this.cart = data })
  }
  get itemQuantity() : number[]{
      return this.cart.quantity
  }

  get cartItems() : Dish[]{
    return this.cart.items
  }

  removeItemFromCart(item:Dish){
    this.cartService.removeItemFromCart(item,this.cart).subscribe()
  }

  addAgainToCart(item:Dish){
    this.cartService.addItemToCart(item,this.cart).subscribe()
  }

  orderItemsInCart(){
    this.orderService.getAllOrders().subscribe(
      (data)=>{
        var newId=0
        data.forEach((order)=>{
          if(order.id>newId){
            newId = order.id
          }
        })
        newId+=1
        var order = new Order(newId,this.loggedInUserId,this.cart.items,this.cart.amount,"",this.cart.quantity,this.cart.restaurantId)
        this.orderService.addOrder(order).subscribe((data)=>{
          this.cart = new Cart(this.cart.id)
          this.cartService.updateCart(this.cart).subscribe()
        })
      }
    )
  }
}