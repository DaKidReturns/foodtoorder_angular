import { Component } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-cart-details-admin',
  templateUrl: './cart-details-admin.component.html',
  styleUrls: ['./cart-details-admin.component.scss']
})
export class CartDetailsAdminComponent {
  cart:Cart=new Cart(0,[],0)

  constructor(private activatedRoute:ActivatedRoute, private cartService:CartService){
      this.activatedRoute.params.subscribe((params:Params)=>{
        this.cart=cartService.getCartById(params['cartId'])
      })
  }
}
