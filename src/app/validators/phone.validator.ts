import { FormGroup, FormControl } from '@angular/forms';


export class PhoneValidator {


    public static checkPhone(phone: FormControl): any {
        console.log(phone);
        if (phone.pristine) {
            return null;
        }
        const PHONE_REGEXP = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
        phone.markAsTouched();
        if (PHONE_REGEXP.test(phone.value)) {
            return null;
        }
        return {
            invalidNumber: true
        };
    }

}



