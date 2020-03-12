import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleNoteComponent } from './simple-note.component';

describe('SimpleNoteComponent', () => {
  let component: SimpleNoteComponent;
  let fixture: ComponentFixture<SimpleNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
