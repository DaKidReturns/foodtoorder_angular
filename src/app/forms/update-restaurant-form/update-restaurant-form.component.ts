import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
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

export class UpdateRestaurantFormComponent implements OnInit {
  @Input() restaurantOwnerId: number = -1

  public nameImageFormGroup: FormGroup
  public addressForm: FormGroup
  public dishesFormGroup: FormGroup

  arrRestaurants: Restaurant[] = []
  restaurant: Restaurant = new Restaurant()

  addressCount: number = 0
  countSecondFormSubmit: number = 0

  dishCount: number = 0
  countThirdFormSubmit: number = 0

  idUpdated = 0;
  isLinear = false


  constructor(private formBuilder: FormBuilder, private restaurantService: RestaurantService) {

    this.nameImageFormGroup = this.formBuilder.group({
      'id': [''],
      'restaurantName': ['', Validators.required],
      'restaurantImage': ['', Validators.required],
      'ownerId': ['', Validators.required]
    })
    this.addressForm = this.formBuilder.group({
      form_array_address: this.formBuilder.array([])
    })

    this.dishesFormGroup = this.formBuilder.group({
      dishesFormArray: this.formBuilder.array([])
    })

  }
  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe((data) => {
      if (this.restaurantOwnerId == -1) {
        this.arrRestaurants = data
      }
      else{
        this.arrRestaurants = data.filter((value)=>value.ownerId==this.restaurantOwnerId)
      }
      console.log(this.arrRestaurants)
    })
  }

  idControl() {
    return this.nameImageFormGroup.controls['id']
  }

  onChangeType(event: any) {
    this.clearPreviousEntry()
    var idObtained = event.target.value
    this.idUpdated = parseInt(idObtained.split(":")[1].trim())
    this.restaurantService.getRestaurantById(this.idUpdated).subscribe((data) => {
      console.log(data)
      //this.restaurant = data
      this.nameImageFormGroup.get('id')?.setValue(data.id)
      this.nameImageFormGroup.get('restaurantName')?.setValue(data.name)
      this.nameImageFormGroup.get('restaurantImage')?.setValue(data.image)
      this.nameImageFormGroup.get('ownerId')?.setValue(data.ownerId)

      data.addresses.forEach((value, i) => {
        const form_array_addresses = this.addressForm.get('form_array_address') as FormArray
        form_array_addresses.push(this.updateAddressFormGroup(value))
      })
      this.countSecondFormSubmit = this.addressCount - 1

      data.items.forEach((value, i) => {
        const dishesFormGroup = this.dishesFormGroup.get('dishesFormArray') as FormArray
        dishesFormGroup.push(this.updateDishesFormGroup(value))
      })
      this.countThirdFormSubmit = this.dishCount - 1

    })
  }

  onChangeAvailability(event: any) {

  }

  get form_array_address(): FormArray {
    return this.addressForm.get("form_array_address") as FormArray
  }

  get dishesFormArray(): FormArray {
    return this.dishesFormGroup.get("dishesFormArray") as FormArray
  }

  addDishesFormGroup() {
    const dishesFormArray = this.dishesFormGroup.get('dishesFormArray') as FormArray
    dishesFormArray.push(this.createDishesFormGroup())
  }

  removeOrClearDishes(i: number) {
    const dishesFormArray = this.dishesFormGroup.get('dishesFormArray') as FormArray
    if (dishesFormArray.length > 1) {
      dishesFormArray.removeAt(i)
    }
    else {
      dishesFormArray.reset()
    }
  }

/*
 * Description: When the user clicks reset on the form this function is called to clear
 *              all the previous forms 
 */
  clearPreviousEntry() {

    if (this.form_array_address.length >= 1) {
      this.form_array_address.clear()
    }

    if (this.dishesFormArray.length >= 1) {
      this.dishesFormArray.clear()
    }
  }

/**
 * 
 * 
 */
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
    this.restaurant.id = formData.value['id']
    this.restaurant.name = formData.value['restaurantName']
    this.restaurant.image = formData.value['restaurantImage']
    this.restaurant.ownerId = parseInt(formData.value['ownerId']) ?? 0
  }

  saveSecondStepData(formData: FormGroup) {
    this.countSecondFormSubmit++;
    if (this.countSecondFormSubmit == this.addressCount) {

      let addressArr = Object.values(formData)

      let temp = JSON.parse(JSON.stringify(addressArr))
      this.restaurant.addresses = temp[0]
    }
  }

  saveThirdStepData(formGroup: FormGroup) {
    this.countThirdFormSubmit++;
    if (this.countThirdFormSubmit == this.dishCount) {
      let dishes = Object.values(formGroup)
      console.log(dishes)
      let temp = JSON.parse(JSON.stringify(dishes)) // This will remove any empty forms from the input

      this.restaurant.items = temp[0]
      // this.restaurant.items.forEach((item, i) => {
      //   item.id = i + 1
      //   item. isAvailable = (item.isAvailable == "true") ? true : false
      //   console.log(item.isAvailable)
      // })
      // console.log(this.restaurant.items)
      this.restaurant.items.forEach((item,i)=>{
        item.isAvailable = item.isAvailable.toString() == "true" ? true : false;
      })
      this.restaurantService.updateRestaurant(this.restaurant).subscribe()
    }

  }
  private createAddressFormGroup(): FormGroup {
    this.addressCount++
    return new FormGroup({
      'id': new FormControl(-1),
      'houseNo': new FormControl('', Validators.required),
      'street': new FormControl('', Validators.required),
      'area': new FormControl('', Validators.required),
      'state': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'pincode': new FormControl('', Validators.required),
    });
  }

  private updateAddressFormGroup(value: Address): FormGroup {
    this.addressCount++
    return new FormGroup({
      'id': new FormControl(value.id),
      'houseNo': new FormControl(value.houseNo, Validators.required),
      'street': new FormControl(value.street, Validators.required),
      'area': new FormControl(value.area, Validators.required),
      'state': new FormControl(value.state, Validators.required),
      'city': new FormControl(value.city, Validators.required),
      'country': new FormControl(value.country, Validators.required),
      'pincode': new FormControl(value.pincode, Validators.required),
    });
  }

  private createDishesFormGroup(): FormGroup {
    this.dishCount++;
    return new FormGroup({
      'id': new FormControl(-1, Validators.required),
      'name': new FormControl('', Validators.required),
      'image':new FormControl('',Validators.required),
      'cost': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'isAvailable': new FormControl(true, Validators.required)
    })
  }

  private updateDishesFormGroup(value: Dish): FormGroup {
    this.dishCount++;
    return new FormGroup({
      'id': new FormControl(value.id, Validators.required),
      'name': new FormControl(value.name, Validators.required),
      'image':new FormControl(value.image,Validators.required),
      'cost': new FormControl(value.cost, Validators.required),
      'description': new FormControl(value.description, Validators.required),
      'isAvailable': new FormControl(value.isAvailable, Validators.required)
    })
  }
}
