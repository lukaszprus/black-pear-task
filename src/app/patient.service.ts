import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';

interface Response {
  entry: {
    resource: {
      identifier: [{
        value: string;
      }];
      name: [{
        given: string[];
        family: string[];
      }];
      birthDate: string;
    };
  }[];
}

export interface Patient {
  familyNames: string[];
  givenNames: string[];
  dob: string;
  nhsNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseURL = 'https://59ae2c9240f849f6ac.develop.eu-west-2.quickfhir.cloud';
  endpoint = '/FHIR/Patient';
  headers = {
    'x-api-key': 'eXyaAcJ9fhpLuhB42YwKQOJ7XgmVYOaP',
    'Authorization': 'Basic dGVzdHVzZXJAYmxhY2twZWFyLmNvbTphcmVxdWVzdA=='
  };

  constructor(private http: HttpClient) {}

  getAll(params: { [key: string]: string; }) {
    return this.http.get<Response>(this.baseURL + this.endpoint, { params, headers: this.headers, observe: 'events' })
      .pipe(map(httpEvent => {
        if (httpEvent.type === HttpEventType.Response) {
          const body: Patient[] = httpEvent.body!.entry.map(e => ({
            familyNames: e.resource.name[0].family,
            givenNames: e.resource.name[0].given,
            dob: e.resource.birthDate,
            nhsNumber: e.resource.identifier[0].value
          }));

          return httpEvent.clone({ body });
        }

        return httpEvent;
      }));
  }
}
