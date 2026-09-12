import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ErrorType = 'error' | 'warning' | 'info' | 'success';

export interface ErrorMessageConfig {
  type: ErrorType;
  title?: string;
  message: string;
  dismissible?: boolean;
  actionLabel?: string;
  actionCallback?: () => void;
}

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <div 
      class="error-message" 
      [ngClass]="'error-message--' + type"
      role="alert"
      [attr.aria-live]="type === 'error' ? 'assertive' : 'polite'">
      
      <div class="error-message__icon-container">
        <svg 
          *ngIf="type === 'error'" 
          class="error-message__icon" 
          viewBox="0 0 24 24" 
          fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <svg 
          *ngIf="type === 'warning'" 
          class="error-message__icon" 
          viewBox="0 0 24 24" 
          fill="currentColor">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
        </svg>
        <svg 
          *ngIf="type === 'info'" 
          class="error-message__icon" 
          viewBox="0 0 24 24" 
          fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
        <svg 
          *ngIf="type === 'success'" 
          class="error-message__icon" 
          viewBox="0 0 24 24" 
          fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>

      <div class="error-message__content">
        <h4 
          *ngIf="title" 
          class="error-message__title">
          {{ title }}
        </h4>
        <p class="error-message__message">{{ message }}</p>
        
        <button 
          *ngIf="actionLabel" 
          class="error-message__action"
          (click)="onActionClick()"
          type="button">
          {{ actionLabel }}
        </button>
      </div>

      <button 
        *ngIf="dismissible" 
        class="error-message__dismiss"
        (click)="onDismiss()"
        type="button"
        aria-label="Cerrar mensaje">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    .error-message {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      border-radius: 8px;
      margin: 8px 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .error-message--error {
      background-color: #ffebee;
      border: 1px solid #ef5350;
      color: #c62828;
    }

    .error-message--warning {
      background-color: #fff3e0;
      border: 1px solid #ffa726;
      color: #e65100;
    }

    .error-message--info {
      background-color: #e3f2fd;
      border: 1px solid #42a5f5;
      color: #1565c0;
    }

    .error-message--success {
      background-color: #e8f5e9;
      border: 1px solid #66bb6a;
      color: #2e7d32;
    }

    .error-message__icon-container {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
    }

    .error-message__icon {
      width: 100%;
      height: 100%;
    }

    .error-message__content {
      flex: 1;
      min-width: 0;
    }

    .error-message__title {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
    }

    .error-message__message {
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
    }

    .error-message__action {
      margin-top: 12px;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .error-message--error .error-message__action {
      background-color: #ef5350;
      color: white;
    }

    .error-message--error .error-message__action:hover {
      background-color: #e53935;
    }

    .error-message--warning .error-message__action {
      background-color: #ffa726;
      color: white;
    }

    .error-message--warning .error-message__action:hover {
      background-color: #fb8c00;
    }

    .error-message--info .error-message__action {
      background-color: #42a5f5;
      color: white;
    }

    .error-message--info .error-message__action:hover {
      background-color: #1e88e5;
    }

    .error-message--success .error-message__action {
      background-color: #66bb6a;
      color: white;
    }

    .error-message--success .error-message__action:hover {
      background-color: #43a047;
    }

    .error-message__dismiss {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s ease;
    }

    .error-message__dismiss:hover {
      opacity: 1;
    }

    .error-message__dismiss svg {
      width: 18px;
      height: 18px;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() type: ErrorType = 'error';
  @Input() title?: string;
  @Input() message = '';
  @Input() dismissible = false;
  @Input() actionLabel?: string;
  @Input() actionCallback?: () => void;

  @Output() dismiss = new EventEmitter<void>();
  @Output() action = new EventEmitter<void>();

  onDismiss(): void {
    this.dismiss.emit();
  }

  onActionClick(): void {
    if (this.actionCallback) {
      this.actionCallback();
    }
    this.action.emit();
  }
}