import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Address } from 'src/app/models/address';
import { Dish } from 'src/app/models/dish';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';


@Component({
  selector: 'app-update-restaurant-form',
  templateUrl: './update-restaurant-form.component.html',
  styleUrls: ['./update-restaurant-form.component.scss']
})

export class UpdateRestaurantFormComponent {
  public nameImageFormGroup: FormGroup
  public addressForm: FormGroup
  public dishesFormGroup: FormGroup

  arrRestaurants: Restaurant[] = []
  restaurant: Restaurant = new Restaurant()

  addressCount: number = 0
  countSecondFormSubmit: number = 0

  dishCount: number = 0
  countThirdFormSubmit:number=0

  idUpdated=0;
  isLinear=false


  constructor(private formBuilder: FormBuilder, private restaurantService: RestaurantService) {

    this.restaurantService.getRestaurants().subscribe((data) => this.arrRestaurants = data)

    this.nameImageFormGroup = this.formBuilder.group({
      'id':[''],
      'restaurantName': ['', Validators.required],
      'restaurantImage': ['', Validators.required]
    })
    this.addressForm = this.formBuilder.group({
      form_array_address: this.formBuilder.array([])
    })

    this.dishesFormGroup = this.formBuilder.group({
      dishesFormArray: this.formBuilder.array([])
    })
  }

  idControl(){
    return this.nameImageFormGroup.controls['id']
  }

  onChangeType(event:any){
    var idObtained = event.target.value
    console.log(idObtained.split(":")[1].trim())    
    this.idUpdated = parseInt(idObtained.split(":")[1].trim())
    this.restaurantService.getRestaurantById(this.idUpdated).subscribe((data)=>{
      console.log(data)
      this.nameImageFormGroup.get('id')?.setValue(data.id)
      this.nameImageFormGroup.get('restaurantName')?.setValue(data.name)
      this.nameImageFormGroup.get('restaurantImage')?.setValue(data.image)
      
      data.addresses.forEach((value,i)=>{
        const form_array_addresses = this.addressForm.get('form_array_address') as FormArray
        form_array_addresses.push(this.updateAddressFormGroup(value))
      })
      this.countSecondFormSubmit=this.addressCount-1

      data.menu.forEach((value,i)=>{
        const dishesFormGroup = this.dishesFormGroup.get('dishesFormArray') as FormArray
        dishesFormGroup.push(this.updateDishesFormGroup(value))
      })
      this.countThirdFormSubmit = this.dishCount - 1

    })
  }

  form_array_address():FormArray{
    return this.addressForm.get("form_array_address") as FormArray
  }

  dishesFormArray() : FormArray{
    return this.dishesFormGroup.get("dishesFormArray") as FormArray
  }

  addDishesFormGroup(){
    const dishesFormArray = this.dishesFormGroup.get('dishesFormArray')as FormArray
    dishesFormArray.push(this.createDishesFormGroup())
  }

  removeOrClearDishes(i:number){
    const dishesFormArray = this.dishesFormGroup.get('dishesFormArray')as FormArray
    if(dishesFormArray.length>1){
      dishesFormArray.removeAt(i)
    }
    else{
      dishesFormArray.reset()
    }
  }

  public addAddressFormGroup() {
    const form_array_addresses = this.addressForm.get('form_array_address') as FormArray
    form_array_addresses.push(this.createAddressFormGroup())
  }

  public removeOrClearAddress(i: number) {
    const form_array_addresses = this.addressForm.get('form_array_address') as FormArray
    if (form_array_addresses.length > 1) {
      form_array_addresses.removeAt(i)
    }
    else {
      form_array_addresses.reset()
    }
  }

  saveFirstStepData(formData: FormGroup) {
    // Set the restaurant Id
    let tempId = 0
    let maxId = 0
    this.arrRestaurants.forEach((r) => {
      if (r.id > maxId) {
        maxId = r.id
      }
    })
    tempId = maxId + 1;
    console.log(formData)

    this.restaurant.id = tempId
    this.restaurant.name = formData.value['restaurantName']
    this.restaurant.image = formData.value['restaurantImage']
    console.log(this.restaurant)
  }

  saveSecondStepData(formData: FormGroup) {
    this.countSecondFormSubmit++;
    if (this.countSecondFormSubmit == this.addressCount) {
      console.log(this.addressCount)
      let addressArr = Object.values(formData)
      let temp = JSON.parse(JSON.stringify(addressArr))
      this.restaurant.addresses = temp[0]
      this.restaurant.addresses.forEach((a, i) => {
        a.id = i + 1
      })
      console.log(this.restaurant.addresses);
    }
  }

  saveThirdStepData(formGroup:FormGroup){
    this.countThirdFormSubmit++;
    if(this.countThirdFormSubmit == this.dishCount){
      let dishes = Object.values(formGroup)
      let temp = JSON.parse(JSON.stringify(dishes)) // This will remove any empty forms from the input
      console.log(temp)
      this.restaurant.menu = temp[0]
      this.restaurant.menu.forEach((item,i)=>{
        item.id = i+1
      })
      console.log(this.restaurant)
      this.restaurantService.addRestaurant(this.restaurant).subscribe()
    }
    
  }
  private createAddressFormGroup(): FormGroup {
    this.addressCount++
    return new FormGroup({
      'id': new FormControl(''),
      'houseNo': new FormControl('', Validators.required),
      'street': new FormControl('', Validators.required),
      'area': new FormControl('', Validators.required),
      'state': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'pincode': new FormControl('', Validators.required),
    });
  }

  private updateAddressFormGroup(value:Address): FormGroup {
    this.addressCount++
    return new FormGroup({
      'id': new FormControl(value.id),
      'houseNo': new FormControl(value.houseNo, Validators.required),
      'street': new FormControl(value.street, Validators.required),
      'area': new FormControl(value.area, Validators.required),
      'state': new FormControl(value.state, Validators.required),
      'city': new FormControl(value.state, Validators.required),
      'country': new FormControl(value.country, Validators.required),
      'pincode': new FormControl(value.pincode, Validators.required),
    });
  }

  private createDishesFormGroup(): FormGroup {
    this.dishCount++;
    return new FormGroup({
      'id': new FormControl(''),
      'name': new FormControl(''),
      'cost': new FormControl(''),
      'description': new FormControl('')
    })
  }

  private updateDishesFormGroup(value:Dish): FormGroup {
    this.dishCount++;
    return new FormGroup({
      'id': new FormControl(value.id),
      'name': new FormControl(value.name),
      'cost': new FormControl(value.cost),
      'description': new FormControl(value.description)
    })
  }
}
