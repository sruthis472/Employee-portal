import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgntfdComponent } from './pgntfd.component';

describe('PgntfdComponent', () => {
  let component: PgntfdComponent;
  let fixture: ComponentFixture<PgntfdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PgntfdComponent]
    });
    fixture = TestBed.createComponent(PgntfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
