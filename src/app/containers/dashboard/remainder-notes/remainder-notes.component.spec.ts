import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainderNotesComponent } from './remainder-notes.component';

describe('RemainderNotesComponent', () => {
  let component: RemainderNotesComponent;
  let fixture: ComponentFixture<RemainderNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemainderNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemainderNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
