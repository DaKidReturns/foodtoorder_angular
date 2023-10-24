import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Dish } from 'src/app/models/dish';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-order-form',
  templateUrl: './update-order-form.component.html',
  styleUrls: ['./update-order-form.component.scss']
})
export class UpdateOrderFormComponent {
  arrUserOrders: Order[] = []
  arrUsers: User[] = []
  orderUpdated: Order = new Order()

  showOrderSelect:boolean = false

  userFormGroup: FormGroup
  itemFormGroup: FormGroup
  itemCount: number = 0

  countSecondFormSubmit: number = 0

  isLinear = true;
  userIdUpdated: number = -1;
  orderIdUpdated:number = -1

  constructor(private formBuilder: FormBuilder, private orderService: OrderService, private userService: UserService) {
    // this.orderService.getAllOrders().subscribe((data) => this.arrUserOrders = data)
    this.userFormGroup = formBuilder.group({
      'userId': ['',Validators.required],
      'orderId':['',Validators.required]
    })
    this.itemFormGroup = formBuilder.group({
      itemFormArray: formBuilder.array([])
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

  updateItemFormArray(dish:Dish,quantity:number){
    this.itemCount++
    return new FormGroup({
      'name': new FormControl(dish.name, Validators.required),
      'cost': new FormControl(dish.cost, Validators.required),
      'quantity': new FormControl(quantity, Validators.required)
    })
  }

  saveFirstStepData(formData: any) {
    // let tempId = 0
    // let maxId = 0

    // this.arrUserOrders.forEach((order) => {
    //   if (order.id > maxId)
    //     maxId = order.id
    // })
    // this.orderUpdated.id = maxId
    // let userid = JSON.parse(formData)[0]
    // this.orderUpdated.userId = parseInt(userid.id)
    console.log(this.orderUpdated)
  }

  saveSecondStepData(itemFormGroup: any) {
    this.countSecondFormSubmit++;
    console.log(this.countSecondFormSubmit, this.itemCount)
    if (this.countSecondFormSubmit == this.itemCount) {
      console.log(this.itemCount)
      let itemArr = Object.values(itemFormGroup)
      let temp = JSON.parse(JSON.stringify(itemArr))[0]
      console.log(temp)
      this.orderUpdated.items=[]
      this.orderUpdated.quantity=[]
      temp.forEach((item: any, index: number) => {
        this.orderUpdated.items.push(new Dish(index+1, item.name, parseFloat(item.cost)??0, "","/assets/images/dishes/burito.jpg"))
        this.orderUpdated.quantity.push(parseInt(item.quantity)??0)
      })
      this.orderUpdated.amount = 0;
      this.orderUpdated.items.forEach((item,index)=>{
        this.orderUpdated.amount += item.cost * this.orderUpdated.quantity[index]
      })
      console.log(this.orderUpdated);
      this.orderService.updateOrder(this.orderUpdated).subscribe()
    }
  }

  onSelectUser(event: any) {
    this.clearPreviousEntry()
    this.arrUserOrders.splice(0,this.arrUserOrders.length)
    var idObtained = event.target.value
    // console.log(idObtained.split(":")[1].trim())
    this.userIdUpdated = parseInt(idObtained.split(":")[1].trim())
    if(this.userIdUpdated == 0){
      this.showOrderSelect = false
      return
    }

    this.showOrderSelect = true;
    this.userService.getUserById(this.userIdUpdated).subscribe((data) => {
      // console.log(data)
      this.userFormGroup.get('userId')?.setValue(data.id)
    })
    this.orderService.getAllOrders().subscribe((data) => {
      data.forEach((item)=>{
        if(item.userId==this.userIdUpdated)
          this.arrUserOrders.push(item)
      })
    })
  }

  onSelectOrder(event:any){
    var idObtained = event.target.value
    this.orderIdUpdated = parseInt(idObtained.split(":")[1].trim())
    this.orderService.getOrderById(this.orderIdUpdated).subscribe((data)=>{
      this.userFormGroup.get('orderId')?.setValue(data.id)
      this.orderUpdated =  data
      data.items.forEach((item,index)=>{
        const itemFormArray = this.itemFormGroup.get('itemFormArray')as FormArray
        itemFormArray.push(this.updateItemFormArray(item,data.quantity[index]))
        
      })
      this.countSecondFormSubmit = this.itemCount - 1
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

  clearPreviousEntry(){
    this.itemFormArray.clear()
    this.userFormGroup.get('orderId')?.reset()
  }
}
