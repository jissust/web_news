import { Component, OnInit } from '@angular/core';
import { ItemNewsComponent } from '../../components/item-news/item-news.component';
import { NoticeService } from '../../services/notice.service';

@Component({
  selector: 'app-outstanding-news',
  standalone: true,
  imports: [ItemNewsComponent],
  templateUrl: './outstanding-news.component.html',
  styleUrl: './outstanding-news.component.css'
})
export class OutstandingNewsComponent implements OnInit {
  public items: any; 
  ngOnInit(): void {
      
  }
  constructor(private _notice: NoticeService){
    this.items = this._notice.getItems();
  }
}
