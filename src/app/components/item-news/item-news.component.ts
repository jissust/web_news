import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-news',
  standalone: true,
  imports: [],
  templateUrl: './item-news.component.html',
  styleUrl: './item-news.component.css'
})
export class ItemNewsComponent {
  @Input() items!:any;
}
