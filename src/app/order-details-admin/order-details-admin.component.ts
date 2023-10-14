import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-details-admin',
  templateUrl: './order-details-admin.component.html',
  styleUrls: ['./order-details-admin.component.scss']
})
export class OrderDetailsAdminComponent {
  orderItem:Order = new Order(0,0,[],0,"")

  constructor(private orderservice:OrderService, private activatedRoute:ActivatedRoute){
    this.activatedRoute.params.subscribe((params:Params)=>{
      this.orderItem=orderservice.getOrderById(params['orderId'])
    })
  }
}
