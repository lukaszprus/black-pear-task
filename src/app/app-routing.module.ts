import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientSearchComponent } from './patient/patient-search/patient-search.component';
import { PatientDetailComponent } from './patient/patient-detail/patient-detail.component';

const routes: Routes = [
  { path: 'patients', component: PatientSearchComponent },
  { path: 'patients/:id', component: PatientDetailComponent },
  { path: '**', redirectTo: 'patients' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
