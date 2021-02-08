import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablebuttonComponent } from './tablebutton.component';

describe('TablebuttonComponent', () => {
  let component: TablebuttonComponent;
  let fixture: ComponentFixture<TablebuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablebuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
