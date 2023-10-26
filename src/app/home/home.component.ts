import { Component } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    _arrRestaurants: Restaurant[] = []
    restaurantCount = 3;
    restuartnat = new Restaurant()

    constructor(private restaurantService: RestaurantService, private router: Router) {
        restaurantService.getRestaurants().subscribe((data) => {
            this._arrRestaurants = data

            this._arrRestaurants.sort(() => Math.random() - 0.5)
            this._arrRestaurants.splice(this.restaurantCount, Infinity)
        })
    }

    goToRestaurantsPage() {
        this.router.navigate(['/restaurants'])
    }

}
