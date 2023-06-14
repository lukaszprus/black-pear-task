import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpEvent, HttpEventType, HttpResponse, HttpSentEvent } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs';

import { PatientSearchComponent } from './patient-search.component';
import { Patient, PatientService } from 'src/app/patient.service';
import { Filters } from '../patient-filters/patient-filters.component';

const httpEvents = (body: Patient[]) => {
  const httpSentEvent: HttpSentEvent = {
    type: HttpEventType.Sent
  };
  const httpResponse = new HttpResponse<Patient[]>({ body });

  return new Observable<HttpEvent<Patient[]>>(subscriber => {
    subscriber.next(httpSentEvent);

    setTimeout(() => {
      subscriber.next(httpResponse);

      subscriber.complete();
    });
  });
};

@Component({ selector: 'app-patient-filters' })
class PatientFiltersComponentStub {
  @Output() filtersChange = new EventEmitter<Filters>();
}

describe('PatientSearchComponent', () => {
  let component: PatientSearchComponent;
  let fixture: ComponentFixture<PatientSearchComponent>;
  let getAllPatientsSpy: jasmine.Spy;
  let patientFiltersComponentStub: PatientFiltersComponentStub;

  beforeEach(() => {
    const patientService = jasmine.createSpyObj('PatientService', ['getAll']);

    getAllPatientsSpy = patientService.getAll.and.returnValue(httpEvents([]));

    TestBed.configureTestingModule({
      declarations: [PatientSearchComponent, PatientFiltersComponentStub],
      providers: [{ provide: PatientService, useValue: patientService }]
    });

    fixture = TestBed.createComponent(PatientSearchComponent);
    component = fixture.componentInstance;

    patientFiltersComponentStub = fixture.debugElement.query(By.directive(PatientFiltersComponentStub)).componentInstance;
  });

  it('fetches patients when filters emit', fakeAsync(() => {
    expect(component.patients).toBeUndefined();

    patientFiltersComponentStub.filtersChange.emit({ dob: '	2008-08-06' });

    tick();

    fixture.detectChanges();

    expect(component.patients).toEqual([]);
  }));

  it('notifies about progress', fakeAsync(() => {
    const alert = () => fixture.debugElement.query(By.css('[role="alert"]'));

    expect(component.notification).toBeUndefined();
    expect(alert()).toBeNull();

    patientFiltersComponentStub.filtersChange.emit({ dob: '	2008-08-06' });
    fixture.detectChanges();

    expect(component.notification).toBeDefined();
    expect(component.notification!.type).toEqual('info');
    expect(alert()).not.toBeNull();

    tick();

    fixture.detectChanges();

    expect(component.notification).toBeUndefined();
    expect(alert()).toBeNull();
  }));
});
