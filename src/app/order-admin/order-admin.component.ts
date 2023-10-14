import { Component } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.scss']
})
export class OrderAdminComponent {
  arrOrders:Order[]=[]
  constructor(private orderService:OrderService, private router:Router){
    this.arrOrders = orderService.getAllOrders();;
  }

  viewOrder(i:number){
    this.router.navigate(['orderadmindetails/'+i])
  }
  
  deleteOrder(i:number){
    this.orderService.deleteOrderById(i)
  }
}
