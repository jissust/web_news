import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingNewsComponent } from './outstanding-news.component';

describe('OutstandingNewsComponent', () => {
  let component: OutstandingNewsComponent;
  let fixture: ComponentFixture<OutstandingNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutstandingNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutstandingNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
