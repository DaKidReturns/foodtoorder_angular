import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dish } from '../models/dish';

@Component({
  selector: 'app-not-available-banner',
  template: '<div style="background-color: red;" class="px-1 d-flex justify-content-between">Some items may not be Avaliable</div>',
  styleUrls: ['./not-available-banner.component.scss']
})
export class NotAvailableBannerComponent implements OnInit {
  @Output() itemAvailable = new EventEmitter<boolean>
  @Input() restaurantItems: Dish[] = []
  flag: boolean = true

  constructor()  {
    
  }
  ngOnInit(): void {
    this.restaurantItems.forEach(dish => {
      if (!dish.isAvailable) {
        this.itemAvailable.emit(false)
        this.flag = false
      }
    });
    if(this.flag)
      this.itemAvailable.emit(true)
  }
  isAllDishAvailable() {
    this.restaurantItems.forEach(dish => {
      if (!dish.isAvailable) this.itemAvailable.emit(true)
    });
  }

}
