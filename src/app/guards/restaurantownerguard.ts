import { CanActivateFn } from "@angular/router";

export function restaurantOwnerGuard():CanActivateFn{

    let role=localStorage.getItem("role")
    return ()=>{
        if(role == "restaurantowner"){
            return true
        }
        alert("Sorry No access")
        return false;

    }
}