import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-historic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historic.component.html',
  styleUrl: './historic.component.scss'
})

export class HistoricComponent {
  @Input() historic: { value: number, won: boolean }[] = [];
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
