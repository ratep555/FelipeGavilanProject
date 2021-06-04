import { AbstractControl, ValidatorFn } from '@angular/forms';

export function firstLetterUppercase(): ValidatorFn {
    // abstractcontrol is the current value of the control.
    return (control: AbstractControl) => {
        // we are casting, bila je greška ovdje, prebrodio si sa as, imaš u Algebra.txt to
        const value = control.value as string;
        if (!value) {
            return; }

        if (value.length === 0) {
            return; }

        const firstLetter = value[0];
        if (firstLetter !== firstLetter.toUpperCase()){
            return {
                firstLetterUppercase : {
                    message: 'The first letter must be uppercase'
                }
            };
        }

        return;
    };
}
