import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { nhsNumber, requiredAny } from 'src/app/validators';

export interface Filters {
  familyName?: string;
  givenName?: string;
  dob?: string;
  nhsNumber?: string;
}

@Component({
  selector: 'app-patient-filters',
  templateUrl: './patient-filters.component.html'
})
export class PatientFiltersComponent {
  @Output() filtersChange = new EventEmitter<Filters>();

  familyName = new FormControl<string>('', [Validators.minLength(2), Validators.maxLength(30)]);
  givenName = new FormControl<string>('', [Validators.minLength(2), Validators.maxLength(30)]);
  dob = new FormControl<string>('');
  nhsNumber = new FormControl<string>('', nhsNumber);

  filtersForm = new FormGroup({
    familyName: this.familyName,
    givenName: this.givenName,
    dob: this.dob,
    nhsNumber: this.nhsNumber
  }, requiredAny(['familyName', 'givenName', 'dob', 'nhsNumber']));

  onSubmit() {
    this.filtersChange.emit(this.filtersForm.value as Filters);
  }
}
