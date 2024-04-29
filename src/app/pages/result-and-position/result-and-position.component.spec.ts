import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultAndPositionComponent } from './result-and-position.component';

describe('ResultAndPositionComponent', () => {
  let component: ResultAndPositionComponent;
  let fixture: ComponentFixture<ResultAndPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultAndPositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultAndPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
