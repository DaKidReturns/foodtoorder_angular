import { CanActivateFn } from "@angular/router";

export function adminGuard():CanActivateFn{

    let role=localStorage.getItem("role")
    return ()=>{
        if(role == "admin"){
            return true
        }
        alert("Sorry No access")
        return false;

    }
}