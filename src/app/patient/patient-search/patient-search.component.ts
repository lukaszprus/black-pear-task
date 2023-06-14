import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';

import { Subscription } from 'rxjs';

import { Patient, PatientService } from 'src/app/patient.service';
import { Filters } from '../patient-filters/patient-filters.component';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html'
})
export class PatientSearchComponent {
  private subs: Subscription | undefined;
  notification: { type: 'danger' | 'info'; message: string; } | undefined;
  patients: Patient[] | undefined;

  constructor(private patientService: PatientService) {}

  onFiltersChange(filters: Filters) {
    this.subs && this.subs.unsubscribe();

    const params: { [key: string]: string; } = {};

    filters.familyName && (params['family'] = filters.familyName);
    filters.givenName && (params['given'] = filters.givenName);
    filters.dob && (params['birthdate'] = filters.dob);
    filters.nhsNumber && (params['identifier'] = 'https://fhir.nhs.uk/Id/nhs-number|' + filters.nhsNumber);

    this.subs = this.patientService.getAll(params)
      .subscribe({
        error: err => {
          this.notification = {
            type: 'danger',
            message: 'Search failed'
          };

          throw err;
        },
        next: httpEvent => {
          if (httpEvent.type === HttpEventType.Sent) {
            this.notification = {
              type: 'info',
              message: 'Searching...'
            };
          } else if (httpEvent.type === HttpEventType.Response) {
            this.notification = undefined;

            this.patients = httpEvent.body!;
          }
        }
      });
  }

  ngOnDestroy() {
    this.subs && this.subs.unsubscribe();
  }
}
