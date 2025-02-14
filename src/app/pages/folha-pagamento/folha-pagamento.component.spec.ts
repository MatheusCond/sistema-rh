import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolhaPagamentoComponent } from './folha-pagamento.component';

describe('FolhaPagamentoComponent', () => {
  let component: FolhaPagamentoComponent;
  let fixture: ComponentFixture<FolhaPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolhaPagamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolhaPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
