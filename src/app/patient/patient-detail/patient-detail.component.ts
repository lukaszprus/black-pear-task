import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: '{{ id }}'
})
export class PatientDetailComponent {
  id: any;

  constructor(route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];
  }
}
