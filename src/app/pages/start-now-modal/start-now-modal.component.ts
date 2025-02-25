import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TypingAnimationService } from '../../services/typing-animation.service';
import { PhoneMaskDirective } from '../../directives/phone-mask.directive';

@Component({
  selector: 'app-start-now-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PhoneMaskDirective],
  templateUrl: './start-now-modal.component.html',
  styleUrls: ['./start-now-modal.component.scss']
})
export class StartNowModalComponent {
  isOpen = false;
  animatedText = '';
  words = ['Funcionários', 'Folha de Pagamento', 'Benefícios', 'Relatórios'];
  
  form; // Remova a inicialização direta aqui

  constructor(
    private fb: FormBuilder,
    private typingService: TypingAnimationService
  ) {
    // Inicialize o formulário dentro do construtor
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/\(\d{2}\) \d{5}-\d{4}/)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: any) {
    return form.get('senha').value === form.get('confirmarSenha').value ? 
      null : { mismatch: true };
  }

  // Restante do código permanece igual
  open() {
    this.isOpen = true;
    this.typingService.startAnimation(this.words, (text) => {
      this.animatedText = text;
    });
  }

  close() {
    this.isOpen = false;
    this.typingService.stopAnimation();
    this.form.reset();
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Formulário enviado:', this.form.value);
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscKey() {
    this.close();
  }
}