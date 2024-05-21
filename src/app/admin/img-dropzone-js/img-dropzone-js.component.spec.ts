import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgDropzoneJsComponent } from './img-dropzone-js.component';

describe('ImgDropzoneJsComponent', () => {
  let component: ImgDropzoneJsComponent;
  let fixture: ComponentFixture<ImgDropzoneJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgDropzoneJsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgDropzoneJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
