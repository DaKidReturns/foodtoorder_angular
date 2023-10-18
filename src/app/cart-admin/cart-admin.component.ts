import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-cart-admin',
  templateUrl: './cart-admin.component.html',
  styleUrls: ['./cart-admin.component.scss']
})

export class CartAdminComponent {
  arrCarts: Cart[] = []
  constructor(private cartService: CartService, private userService: UserService, private router: Router) {
    cartService.getAllCart().subscribe((data) => { this.arrCarts = data }) 
  }

  viewCart(i: number) {
    this.router.navigate(['cartadmindetails/' + i])
  }

  deleteCart(i: number) {
    this.cartService.deleteCartById(i).subscribe()
  }
}
