import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PatientModule {}
