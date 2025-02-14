import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FolhaPagamento {
  id: number;
  nome: string;
  cargo: string;
  salarioBruto: number;
  descontos: number;
  salarioLiquido: number;
  status: boolean;
  mesAno: string;
}

@Component({
  selector: 'app-folha-pagamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './folha-pagamento.component.html',
  styleUrls: ['./folha-pagamento.component.scss']
})
export class FolhaPagamentoComponent {
  folhas = signal<FolhaPagamento[]>([
    {
      id: 1,
      nome: 'João Silva',
      cargo: 'Desenvolvedor',
      salarioBruto: 7500,
      descontos: 1200,
      salarioLiquido: 6300,
      status: true,
      mesAno: '2024-03'
    },
    {
      id: 2,
      nome: 'Maria Souza',
      cargo: 'Analista RH',
      salarioBruto: 6500,
      descontos: 950,
      salarioLiquido: 5550,
      status: false,
      mesAno: '2024-03'
    }
  ]);

  showModal = false;
  selectedFolha: FolhaPagamento | null = null;
  searchTerm = '';
  selectedStatus: string = 'todos';
  selectedMonth: string = '2024-03';

  mesesAnos = ['2024-03', '2024-02', '2024-01'];
  statusOptions = ['todos', 'pago', 'nao-pago'];

  openEditModal(folha: FolhaPagamento) {
    this.selectedFolha = { ...folha };
    this.showModal = true;
  }

  saveEdits() {
    if (this.selectedFolha) {
      this.folhas.update(list => 
        list.map(f => f.id === this.selectedFolha?.id ? this.selectedFolha! : f)
      );
      this.closeModal();
    }
  }

  deleteFolha(id: number) {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
      this.folhas.update(list => list.filter(f => f.id !== id));
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedFolha = null;
  }

  calcularLiquido(bruto: number, descontos: number): number {
    return bruto - descontos;
  }
}