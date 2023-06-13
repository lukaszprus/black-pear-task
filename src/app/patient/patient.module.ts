import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientSearchComponent } from './patient-search/patient-search.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientFiltersComponent } from './patient-filters/patient-filters.component';

@NgModule({
  declarations: [
    PatientSearchComponent,
    PatientListComponent,
    PatientDetailComponent,
    PatientFiltersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PatientModule {}
