import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './loading.html',
  styleUrls: ['./loading.scss'],
})
export class Loading {
  @Input() type: 'spinner' | 'skeleton' | 'pulse' | 'dots' = 'spinner';
  @Input() message?: string;
  @Input() size: number = 50;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() containerClass: string = 'inline';
  @Input() skeletonItems: Array<{ width: string; height: string }> = [
    { width: '100%', height: '20px' },
    { width: '80%', height: '20px' },
    { width: '90%', height: '20px' },
    { width: '70%', height: '20px' },
  ];
}
