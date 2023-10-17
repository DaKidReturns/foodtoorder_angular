import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-add-cart-form',
  templateUrl: './add-cart-form.component.html',
  styleUrls: ['./add-cart-form.component.scss']
})
export class AddCartFormComponent {
  constructor(private formBuilder:FormBuilder, private cartService:CartService){

  }
}
