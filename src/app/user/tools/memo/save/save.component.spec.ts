import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveComponent } from './save.component';

describe('SaveComponent', () => {
  let component: SaveComponent;
  let fixture: ComponentFixture<SaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
