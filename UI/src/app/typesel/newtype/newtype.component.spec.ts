import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtypeComponent } from './newtype.component';

describe('NewtypeComponent', () => {
  let component: NewtypeComponent;
  let fixture: ComponentFixture<NewtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
