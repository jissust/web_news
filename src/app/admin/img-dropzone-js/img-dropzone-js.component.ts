import { Component, EventEmitter, Output } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-img-dropzone-js',
  standalone: true,
  imports: [NgxDropzoneModule],
  templateUrl: './img-dropzone-js.component.html',
  styleUrl: './img-dropzone-js.component.css',
})
export class ImgDropzoneJsComponent {
  public files: File[] = [];
  public error: [] = [];

  @Output() imagesChange = new EventEmitter<[]>(); 
  @Output() getErrors = new EventEmitter<[]>();

  onSelect(event: any) {
    console.log(event.rejectedFiles);

    this.files.push(...event.addedFiles);
    this.imagesChange.emit(event.addedFiles);
    this.getErrors.emit(event.rejectedFiles);
    
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
