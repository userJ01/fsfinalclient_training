import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedocumentComponent } from './sharedocument.component';

describe('SharedocumentComponent', () => {
  let component: SharedocumentComponent;
  let fixture: ComponentFixture<SharedocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
