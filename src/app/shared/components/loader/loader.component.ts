import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LoaderSize = 'small' | 'medium' | 'large';
export type LoaderColor = 'primary' | 'secondary' | 'white';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <div 
      class="loader-container" 
      [class.loader-overlay]="overlay"
      [attr.aria-busy]="true"
      [attr.aria-label]="message || 'Cargando'">
      <div 
        class="loader-spinner"
        [ngClass]="'loader-' + size"
        [class.loader-white]="color === 'white''
        [class.loader-primary]="color === 'primary'"
        [class.loader-secondary]="color === 'secondary'">
        <svg viewBox="0 0 50 50" class="loader-svg">
          <circle 
            cx="25" 
            cy="25" 
            r="20" 
            fill="none" 
            stroke-width="4"
            class="loader-circle">
          </circle>
        </svg>
      </div>
      <p 
        *ngIf="message" 
        class="loader-message"
        [class.loader-message-white]="color === 'white'">
        {{ message }}
      </p>
    </div>
  `,
  styles: [`
    .loader-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 16px;
      gap: 12px;
    }

    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .loader-spinner {
      display: inline-block;
      position: relative;
    }

    .loader-svg {
      animation: rotate 1.5s linear infinite;
      width: 100%;
      height: 100%;
    }

    .loader-circle {
      stroke: currentColor;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }

    .loader-small .loader-svg {
      width: 24px;
      height: 24px;
    }

    .loader-medium .loader-svg {
      width: 40px;
      height: 40px;
    }

    .loader-large .loader-svg {
      width: 64px;
      height: 64px;
    }

    .loader-white .loader-circle {
      stroke: #ffffff;
    }

    .loader-primary .loader-circle {
      stroke: #1976d2;
    }

    .loader-secondary .loader-circle {
      stroke: #757575;
    }

    .loader-message {
      margin: 0;
      font-size: 14px;
      color: #333;
      text-align: center;
    }

    .loader-message-white {
      color: #ffffff;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
  `]
})
export class LoaderComponent {
  @Input() size: LoaderSize = 'medium';
  @Input() color: LoaderColor = 'primary';
  @Input() message?: string;
  @Input() overlay = false;
}