import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartNowModalComponent } from '../start-now-modal/start-now-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, StartNowModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('startNowModal') startNowModal!: StartNowModalComponent;

  features = [
    { icon: '👥', title: 'Gestão de Funcionários', description: 'Controle completo de dados dos colaboradores' },
    { icon: '💰', title: 'Folha de Pagamento', description: 'Cálculos automatizados e relatórios precisos' },
    { icon: '📊', title: 'Acesso Fácil', description: 'Portal do colaborador com autoatendimento' }
  ];

  testimonials = [
    { name: 'Joana Silva', role: 'Gerente de RH', text: 'O sistema transformou nossa gestão de pessoas' },
    { name: 'Carlos Andrade', role: 'Diretor Financeiro', text: 'Controle financeiro muito mais eficiente' }
  ];
}