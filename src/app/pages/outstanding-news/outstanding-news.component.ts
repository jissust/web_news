import { Component, OnInit } from '@angular/core';
import { ItemNewsComponent } from '../../components/item-news/item-news.component';
import { NewService } from '../../services/new.service';

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
  constructor(private _new: NewService){
    this.items = this._new.getItems();
  }
}
