import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Relatorio {
  id: number;
  funcionario: string;
  cargo: string;
  departamento: string;
  admissao: string;
  salario: number;
  beneficios: string[];
  status: boolean;
}

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent {
  relatorios = signal<Relatorio[]>([]);
  showModal = false;
  selectedRelatorio: Relatorio | null = null;
  
  // Filtros
  tiposRelatorio = ['Funcionários', 'Folha de Pagamento', 'Benefícios'];
  departamentos = ['TI', 'RH', 'Financeiro', 'Marketing'];
  formatos = ['PDF', 'Excel', 'CSV'];
  
  filtros = {
    tipo: 'Funcionários',
    inicio: '',
    fim: '',
    departamento: 'todos',
    formato: 'PDF'
  };

  // Ordenação
  ordenacao = {
    campo: 'funcionario',
    direcao: 'asc'
  };

  constructor() {
    // Mock data
    this.relatorios.set([
      {
        id: 1,
        funcionario: 'João Silva',
        cargo: 'Desenvolvedor',
        departamento: 'TI',
        admissao: '2022-03-15',
        salario: 7500,
        beneficios: ['Vale-Alimentação', 'Plano de Saúde'],
        status: true
      },
      {
        id: 2,
        funcionario: 'Maria Souza',
        cargo: 'Analista RH',
        departamento: 'RH',
        admissao: '2021-11-02',
        salario: 6500,
        beneficios: ['Vale-Transporte'],
        status: true
      }
    ]);
  }

  gerarRelatorio() {
    // Lógica para gerar/filtrar relatórios
    console.log('Filtros aplicados:', this.filtros);
  }

  ordenar(campo: string) {
    if (this.ordenacao.campo === campo) {
      this.ordenacao.direcao = this.ordenacao.direcao === 'asc' ? 'desc' : 'asc';
    } else {
      this.ordenacao.campo = campo;
      this.ordenacao.direcao = 'asc';
    }
  }

  abrirDetalhes(relatorio: Relatorio) {
    this.selectedRelatorio = relatorio;
    this.showModal = true;
  }

  fecharModal() {
    this.showModal = false;
    this.selectedRelatorio = null;
  }

  exportar(formato: string) {
    console.log(`Exportando relatório em ${formato}`);
    // Lógica de exportação
  }
}