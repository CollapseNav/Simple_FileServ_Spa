import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdirComponent } from './newdir.component';

describe('NewdirComponent', () => {
  let component: NewdirComponent;
  let fixture: ComponentFixture<NewdirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewdirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
