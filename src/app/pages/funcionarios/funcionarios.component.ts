import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
  status: boolean;
}

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent {
  funcionarios = signal<Funcionario[]>([
    {
      id: 1,
      nome: 'João Silva',
      cargo: 'Desenvolvedor',
      departamento: 'TI',
      dataAdmissao: '2022-03-15',
      status: true
    },
    {
      id: 2,
      nome: 'Maria Souza',
      cargo: 'Analista RH',
      departamento: 'RH',
      dataAdmissao: '2021-11-02',
      status: true
    }
  ]);

  showModal = false;
  editing = false;
  searchTerm = '';
  selectedStatus = 'todos';
  selectedDepto = 'todos';
  dataInicio = '';
  dataFim = '';
  
  selectedFuncionario: Funcionario = {
    id: 0,
    nome: '',
    cargo: '',
    departamento: '',
    dataAdmissao: '',
    status: true
  };

  departamentos = ['TI', 'RH', 'Financeiro', 'Marketing'];
  ordenacao = { campo: 'nome', direcao: 'asc' };

  openModal(funcionario?: Funcionario) {
    this.showModal = true;
    this.editing = !!funcionario;
    this.selectedFuncionario = funcionario ? {...funcionario} : {
      id: Date.now(),
      nome: '',
      cargo: '',
      departamento: '',
      dataAdmissao: new Date().toISOString().split('T')[0],
      status: true
    };
  }

  salvarFuncionario() {
    if (this.editing) {
      this.funcionarios.update(list => 
        list.map(f => f.id === this.selectedFuncionario.id ? this.selectedFuncionario : f)
      );
    } else {
      this.funcionarios.update(list => [...list, this.selectedFuncionario]);
    }
    this.fecharModal();
  }

  excluirFuncionario(id: number) {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.funcionarios.update(list => list.filter(f => f.id !== id));
    }
  }

  fecharModal() {
    this.showModal = false;
    this.selectedFuncionario = {
      id: 0,
      nome: '',
      cargo: '',
      departamento: '',
      dataAdmissao: '',
      status: true
    };
  }

  ordenar(campo: string) {
    if (this.ordenacao.campo === campo) {
      this.ordenacao.direcao = this.ordenacao.direcao === 'asc' ? 'desc' : 'asc';
    } else {
      this.ordenacao.campo = campo;
      this.ordenacao.direcao = 'asc';
    }
  }
}