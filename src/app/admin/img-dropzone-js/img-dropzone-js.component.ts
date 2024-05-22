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
  @Output() imagesChange = new EventEmitter<[]>(); 

  onSelect(event: any) {
    console.log(event.addedFiles);
    this.files.push(...event.addedFiles);
    this.imagesChange.emit(event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
