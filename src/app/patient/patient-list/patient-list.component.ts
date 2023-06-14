import { Component, Input } from '@angular/core';

import { Patient } from 'src/app/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html'
})
export class PatientListComponent {
  @Input() patients!: Patient[];
}
