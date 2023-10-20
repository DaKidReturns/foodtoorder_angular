import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export function passowrdMatchValidator(g: FormGroup) {
    return (control: AbstractControl): ValidationErrors | null => {

        if (g.get('password')?.value === g.get('confirmPassword')?.value) {
            return null
        }
        else { return { 'passwordMismatch': true } }
    }
}

export function mustMatch(controlName:string, matchingControlName: string){
    return (formGroup:FormGroup)=>{
        const control = formGroup.controls[controlName]
        const matchingControl = formGroup.controls[matchingControlName]

        if(matchingControl.errors != null && matchingControl.errors['passwordMismatch'] == null){
            return 
        }
        if(matchingControl.value !== control.value){
            return matchingControl.setErrors({passwordMismatch:true})
        }else{
            return matchingControl.setErrors(null)
        }

    }

}