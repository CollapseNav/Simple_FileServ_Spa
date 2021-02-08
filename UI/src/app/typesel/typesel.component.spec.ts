import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeselComponent } from './typesel.component';

describe('TypeselComponent', () => {
  let component: TypeselComponent;
  let fixture: ComponentFixture<TypeselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
