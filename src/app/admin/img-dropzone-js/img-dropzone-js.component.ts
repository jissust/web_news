import { Component } from '@angular/core';
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

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
