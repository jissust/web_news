import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-errors',
  standalone: true,
  imports: [],
  templateUrl: './list-errors.component.html',
  styleUrl: './list-errors.component.css'
})
export class ListErrorsComponent {
  @Input() getErrors: [] = [];
  @Input() maxFileSize: String = '5M';
  @Input() extensions: String = 'jpg, jpeg y png';
}
