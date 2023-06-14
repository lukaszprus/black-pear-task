import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { PatientFiltersComponent } from './patient-filters.component';

const setValue = (debugElement: DebugElement, value: string) => {
  const nativeElement = debugElement.nativeElement;

  nativeElement.value = value;
  nativeElement.dispatchEvent(new Event('input'));
  nativeElement.dispatchEvent(new Event('blur'));
};

describe('PatientFiltersComponent', () => {
  let component: PatientFiltersComponent;
  let fixture: ComponentFixture<PatientFiltersComponent>;
  let givenName: DebugElement,
    familyName: DebugElement,
    dob: DebugElement,
    nhsNumber: DebugElement,
    givenNameInput: DebugElement,
    familyNameInput: DebugElement,
    dobInput: DebugElement,
    nhsNumberInput: DebugElement,
    submitButton: DebugElement;

  const errors = (debugElement: DebugElement) => debugElement.queryAll(By.css('.invalid-feedback'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PatientFiltersComponent]
    });

    fixture = TestBed.createComponent(PatientFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const testElement = (name: string) => fixture.debugElement.query(By.css(`[data-test-${name}]`));
    const input = (debugElement: DebugElement) => debugElement.query(By.css('input'));

    givenName = testElement('givenName');
    familyName = testElement('familyName');
    dob = testElement('dob');
    nhsNumber = testElement('nhsNumber');

    givenNameInput = input(givenName);
    familyNameInput = input(familyName);
    dobInput = input(dob);
    nhsNumberInput = input(nhsNumber);

    submitButton = fixture.debugElement.query(By.css(`[type="submit"]`));
  });

  describe('when blank and submitted', () => {
    it('shows "empty filters" validation error', () => {
      submitButton.nativeElement.click();

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css(`[data-test-notification]`))).not.toBeNull();
    });

    it('does not emit when submitted', () => {
      const spy = spyOn(component.filtersChange, 'emit').and.callThrough();

      submitButton.nativeElement.click();

      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('when filled out correctly', () => {
    beforeEach(() => {
      setValue(nhsNumberInput, '9449306400');

      fixture.detectChanges();
    });

    it('shows no field validation errors', () => {
      expect(errors(givenName).length).toBe(0);
      expect(errors(familyName).length).toBe(0);
      expect(errors(dob).length).toBe(0);
      expect(errors(nhsNumberInput).length).toBe(0);


      expect(fixture.debugElement.query(By.css(`[data-test-notification]`))).toBeNull();
    });

    it('emits value when submitted', () => {
      const spy = spyOn(component.filtersChange, 'emit').and.callThrough();

      submitButton.nativeElement.click();

      fixture.detectChanges();

      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.first().args).toEqual([{ familyName: '', givenName: '', dob: '', nhsNumber: '9449306400' }]);
    });
  });

  describe('when filled out incorrectly', () => {
    beforeEach(() => {
      setValue(givenNameInput, 'Lukaszzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
      setValue(nhsNumberInput, '84876');

      fixture.detectChanges();
    });

    it('shows correct field validation errors and their erroneous state', () => {
      expect(errors(givenName).length).toBe(1);
      expect(errors(familyName).length).toBe(0);
      expect(errors(dob).length).toBe(0);
      expect(errors(nhsNumber).length).toBe(1);

      expect(givenName.nativeElement.textContent).toContain('Maximum 30 characters allowed');
      expect(nhsNumber.nativeElement.textContent).toContain('Invalid NHS number');

      expect('is-valid' in givenNameInput.classes).toBe(false);
      expect('is-invalid' in givenNameInput.classes).toBe(true);

      expect('is-valid' in familyNameInput.classes).toBe(false);
      expect('is-invalid' in familyNameInput.classes).toBe(false);

      expect('is-valid' in dobInput.classes).toBe(false);
      expect('is-invalid' in dobInput.classes).toBe(false);

      expect('is-valid' in nhsNumberInput.classes).toBe(false);
      expect('is-invalid' in nhsNumberInput.classes).toBe(true);

      expect(fixture.debugElement.query(By.css(`[data-test-notification]`))).toBeNull();
    });

    it('does not emit when submitted', () => {
      const spy = spyOn(component.filtersChange, 'emit').and.callThrough();

      submitButton.nativeElement.click();

      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
