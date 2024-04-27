import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  public option: string = 'home';
  
  constructor(private route: ActivatedRoute){
    
  }

  ngOnInit(): void {
      
  }

  selectOption(option: string){
    this.option = option;
  }
}
