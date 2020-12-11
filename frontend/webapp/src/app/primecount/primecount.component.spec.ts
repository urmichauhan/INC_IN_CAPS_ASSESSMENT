import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimecountComponent } from './primecount.component';

describe('PrimecountComponent', () => {
  let component: PrimecountComponent;
  let fixture: ComponentFixture<PrimecountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimecountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimecountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
