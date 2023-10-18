import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dish } from 'src/app/models/dish';

import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-order-form',
  templateUrl: './add-order-form.component.html',
  styleUrls: ['./add-order-form.component.scss']
})
export class AddOrderFormComponent {
  arrOrders: Order[] = []
  arrUsers: User[] = []
  newOrder: Order = new Order()

  userFormGroup: FormGroup
  itemFormGroup: FormGroup
  itemCount: number = 0

  countSecondFormSubmit: number = 0

  isLinear = true;
  idUpdated: number = -1;

  constructor(private formBuilder: FormBuilder, private orderService: OrderService, private userService: UserService) {
    this.orderService.getAllOrders().subscribe((data) => this.arrOrders = data)
    this.userFormGroup = formBuilder.group({
      'id': ['']
    })
    this.itemFormGroup = formBuilder.group({
      itemFormArray: formBuilder.array([this.createItemFormArray()])
    })
    userService.getUsers().subscribe((data) => this.arrUsers = data)
  }

  get itemFormArray(): FormArray {
    return this.itemFormGroup.get('itemFormArray') as FormArray
  }

  createItemFormArray() {
    this.itemCount++
    return new FormGroup({
      'name': new FormControl('', Validators.required),
      'cost': new FormControl('', Validators.required),
      'quantity': new FormControl('', Validators.required)
    })
  }

  saveFirstStepData(formData: FormGroup) {
    let tempId = 0
    let maxId = 0

    this.arrOrders.forEach((order) => {
      if (order.id > maxId)
        maxId = order.id
    })
    this.newOrder.id = maxId+1
    this.newOrder.userId = this.idUpdated
    console.log(this.newOrder)
  }

  saveSecondStepData(itemFormGroup: any) {
    this.countSecondFormSubmit++;
    if (this.countSecondFormSubmit == this.itemCount) {
      console.log(this.itemCount)
      let itemArr = Object.values(itemFormGroup)
      let temp = JSON.parse(JSON.stringify(itemArr))[0]
      console.log(temp)
      temp.forEach((item: any, index: number) => {
        this.newOrder.items.push(new Dish(index+1, item.name, parseFloat(item.cost)??0, ""))
        this.newOrder.quantity.push(parseInt(item.quantity)??0)
      })
      this.newOrder.amount = 0;
      this.newOrder.items.forEach((item,index)=>{
        this.newOrder.amount += item.cost * this.newOrder.quantity[index]
      })
      this.newOrder.oderDate=""
      console.log(this.newOrder);
      this.orderService.addOrder(this.newOrder).subscribe()
    }
  }

  onChangeType(event: any) {
    var idObtained = event.target.value
    console.log(idObtained.split(":")[1].trim())
    this.idUpdated = parseInt(idObtained.split(":")[1].trim())

    this.userService.getUserById(this.idUpdated).subscribe((data) => {
      console.log(data)
      this.userFormGroup.get('id')?.setValue(data.id)
    })
  }
  removeOrClearItems(i: number) {
    const itemFormArray = this.itemFormGroup.get('itemFormArray') as FormArray
    if (itemFormArray.length > 1) {
      itemFormArray.removeAt(i)
    }
    else {
      itemFormArray.reset()
    }
  }

  addItemFormGroup(){
    const itemFormArray = this.itemFormGroup.get('itemFormArray')as FormArray
    itemFormArray.push(this.createItemFormArray())
  }

}
