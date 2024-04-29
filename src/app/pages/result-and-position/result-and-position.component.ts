import { Component } from '@angular/core';
import { ResultComponent } from './components/result/result.component';

@Component({
  selector: 'app-result-and-position',
  standalone: true,
  imports: [ResultComponent],
  templateUrl: './result-and-position.component.html',
  styleUrl: './result-and-position.component.css'
})
export class ResultAndPositionComponent {
  public nextResult = {
    state:'Próximo',
    tournament:'Copa de la liga Profesional',
    date:'Martes 30/04 ',
    hour:'20.00 hs',
    stadium_name:'Estadio Mario Alberto Kempes',
    local_team:'/assets/images/san_lorenzo.png',
    visiting_team:'https://estudiantesdelaplata.com/wp-content/themes/edelp_v2/imgs/logo_edelp-v3.png'
  };
  public previousResult = {
    state:'Anterior',
    tournament:'Conmebol Libertadores',
    date:'Martes 23/04',
    hour:'19.00 hs.',
    stadium_name:'Estadio Uno',
    local_team:'https://estudiantesdelaplata.com/wp-content/themes/edelp_v2/imgs/logo_edelp-v3.png',
    visiting_team:'/assets/images/san_lorenzo.png'
  };
}
