import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Beneficio {
  id: number;
  funcionario: string;
  cargo: string;
  tipo: string;
  valor: number;
  dataConcessao: string;
  status: boolean;
}

@Component({
  selector: 'app-beneficios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './beneficios.component.html',
  styleUrls: ['./beneficios.component.scss']
})
export class BeneficiosComponent {
  beneficios = signal<Beneficio[]>([
    {
      id: 1,
      funcionario: 'João Silva',
      cargo: 'Desenvolvedor',
      tipo: 'Vale-Alimentação',
      valor: 600,
      dataConcessao: '2024-03-01',
      status: true
    },
    {
      id: 2,
      funcionario: 'Maria Souza',
      cargo: 'Analista RH',
      tipo: 'Vale-Transporte',
      valor: 300,
      dataConcessao: '2024-02-15',
      status: false
    }
  ]);

  showModal = false;
  editing = false;
  selectedBeneficio: Partial<Beneficio> = {};
  searchTerm = '';
  selectedTipo = 'todos';
  selectedStatus = 'todos';

  tiposBeneficio = ['Vale-Alimentação', 'Vale-Transporte', 'Plano de Saúde'];
  funcionarios = ['João Silva', 'Maria Souza', 'Carlos Oliveira'];
  statusOptions = ['todos', 'ativo', 'inativo'];

  openModal(beneficio?: Beneficio) {
    this.showModal = true;
    this.editing = !!beneficio;
    this.selectedBeneficio = beneficio ? { ...beneficio } : {
      funcionario: '',
      tipo: '',
      valor: undefined,
      dataConcessao: '',
      status: true
    };
  }

  saveBeneficio() {
    if (this.editing) {
      this.beneficios.update(list => 
        list.map(b => b.id === this.selectedBeneficio.id ? this.selectedBeneficio as Beneficio : b)
      );
    } else {
      this.beneficios.update(list => [
        ...list,
        { ...this.selectedBeneficio, id: Date.now() } as Beneficio
      ]);
    }
    this.closeModal();
  }

  deleteBeneficio(id: number) {
    if (confirm('Tem certeza que deseja excluir este benefício?')) {
      this.beneficios.update(list => list.filter(b => b.id !== id));
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedBeneficio = {};
  }
}