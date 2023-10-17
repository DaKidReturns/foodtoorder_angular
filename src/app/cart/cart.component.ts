import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  loggedInUserId:number = -1
  cart:Cart = new Cart()
  
  constructor(private cartService:CartService){
    this.loggedInUserId = parseInt(localStorage.getItem('userId')??'-1') ?? -1
  }
  
}
