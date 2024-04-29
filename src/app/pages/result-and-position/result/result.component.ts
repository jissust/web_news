import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../../../models/result';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {
  @Input() result!: Result;

  ngOnInit(): void {
      
  }

  constructor(){
  console.log(this.result);  
  }
}
