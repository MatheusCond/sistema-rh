import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypingAnimationService {
  private intervalId: any;
  private currentIndex = 0;
  private isDeleting = false;
  private currentText = '';

  startAnimation(words: string[], callback: (text: string) => void) {
    this.stopAnimation();
    
    this.intervalId = setInterval(() => {
      const currentWord = words[this.currentIndex % words.length];
      
      if (this.isDeleting) {
        this.currentText = currentWord.substring(0, this.currentText.length - 1);
      } else {
        this.currentText = currentWord.substring(0, this.currentText.length + 1);
      }

      callback(this.currentText);

      if (!this.isDeleting && this.currentText === currentWord) {
        setTimeout(() => this.isDeleting = true, 1000);
      } else if (this.isDeleting && this.currentText === '') {
        this.isDeleting = false;
        this.currentIndex++;
      }
    }, 100);
  }

  stopAnimation() {
    clearInterval(this.intervalId);
    this.currentIndex = 0;
    this.isDeleting = false;
    this.currentText = '';
  }
}