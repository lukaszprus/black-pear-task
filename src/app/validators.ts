import { ValidatorFn, Validators } from '@angular/forms';

export const nhsNumber: ValidatorFn = ({ value }) =>
  value && !validateNhsNumber(value) ? { nhsnumber: true } : null;

export const requiredAny = (names: string[]): ValidatorFn =>
  control =>
    names.some(name => {
      const c = control.get(name);

      return c && !Validators.required(c);
    }) ? null : { requiredany: true };






// JUST SOME VALIDATOR I FOUND
// I CAN'T VOUCH FOR ITS CORRECTNESS
function validateNhsNumber(nhsNumber: string){
  // pre-flight checks
  if(
    nhsNumber === undefined ||
    nhsNumber === null ||
    isNaN(Number(nhsNumber)) ||
    nhsNumber.toString().length !== 10
  ){
    return false;
  }

  // convert numbers to strings, for internal consistency
  if(Number.isInteger(nhsNumber)){
    nhsNumber = nhsNumber.toString();
  }

  // Step 1: Multiply each of the first 9 numbers by (11 - position indexed from 1)
  // Step 2: Add the results together
  // Step 3: Divide the total by 11 to get the remainder
  var nhsNumberAsArray = nhsNumber.split('');
  var remainder = nhsNumberAsArray.slice(0,9)
                            .map(multiplyByPosition)
                            .reduce(addTogether, 0) % 11;

  var checkDigit = 11 - remainder;

  // replace 11 for 0
  if(checkDigit === 11){
    checkDigit = 0;
  }

  var providedCheckDigit = nhsNumberAsArray[9];

  // Do the check digits match?
  return checkDigit === Number(providedCheckDigit);
}

function multiplyByPosition(digit: string, index: number) {
  // multiple each digit by 11  minus its position (indexed from 1)
  return parseInt(digit, 10) * (11 - (index+1));
}

function addTogether(previousValue: number, currentValue: number){
  return previousValue + currentValue;
}
