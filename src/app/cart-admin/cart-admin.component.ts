import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-admin',
  templateUrl: './cart-admin.component.html',
  styleUrls: ['./cart-admin.component.scss']
})

export class CartAdminComponent {
  arrCarts:Cart[] = []
  constructor(private cartService:CartService, private router:Router){
   cartService.getAllCart().subscribe((data)=>{ this.arrCarts = data})
  }
  viewCart(i:number){
    this.router.navigate(['cartadmindetails/'+i])
  }
  deleteCart(i:number){
    this.cartService.deleteCartById(i).subscribe()
  }
}
