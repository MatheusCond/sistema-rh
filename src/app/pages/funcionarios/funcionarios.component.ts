import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  hireDate: string;
  salary: number;
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
  employees = signal<Employee[]>([
    {
      id: 1,
      name: 'João Silva',
      position: 'Desenvolvedor',
      department: 'TI',
      hireDate: '2022-03-15',
      salary: 7500,
      status: true
    },
    {
      id: 2,
      name: 'Maria Souza',
      position: 'Analista RH',
      department: 'RH',
      hireDate: '2021-11-02',
      salary: 6500,
      status: true
    }
  ]);

  showForm = false;
  editing = false;
  selectedEmployee: Partial<Employee> = {};
  departments = ['TI', 'RH', 'Financeiro', 'Marketing'];
  
  newEmployee: Partial<Employee> = {
    name: '',
    position: '',
    department: '',
    hireDate: '',
    salary: 0,
    status: true
  };

  openForm(employee?: Employee) {
    this.showForm = true;
    if (employee) {
      this.editing = true;
      this.selectedEmployee = { ...employee };
    } else {
      this.editing = false;
      this.selectedEmployee = { ...this.newEmployee };
    }
  }

  saveEmployee() {
    if (this.editing) {
      this.employees.update(list => 
        list.map(e => e.id === this.selectedEmployee.id ? this.selectedEmployee as Employee : e)
      );
    } else {
      this.employees.update(list => [
        ...list,
        { ...this.selectedEmployee, id: Date.now() } as Employee
      ]);
    }
    this.closeForm();
  }

  deleteEmployee(id: number) {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.employees.update(list => list.filter(e => e.id !== id));
    }
  }

  closeForm() {
    this.showForm = false;
    this.selectedEmployee = {};
  }

  ngOnInit() {
    setTimeout(() => {
      const button = document.querySelector('.add-button');
      button?.classList.add('pulse');
      
      setTimeout(() => {
        button?.classList.remove('pulse');
      }, 3000);
    }, 1000);
  }
}