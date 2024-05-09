import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Pipe } from '@angular/core';
//import { Result } from '../../../../models/result';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {
  @Input() result!: any;
  @Input() title!: String;

  ngOnInit(): void {
      
  }

}
