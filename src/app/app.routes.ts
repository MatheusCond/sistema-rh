import { Routes } from '@angular/router';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { HomeComponent } from './pages/home/home.component';
import { FolhaPagamentoComponent } from './pages/folha-pagamento/folha-pagamento.component';
import { BeneficiosComponent } from './pages/beneficios/beneficios.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'funcionarios', component: FuncionariosComponent },
    { path: 'folha-pagamento', component: FolhaPagamentoComponent },
    { path: 'beneficios', component: BeneficiosComponent },
    { path: 'relatorios', component: RelatoriosComponent }
];
