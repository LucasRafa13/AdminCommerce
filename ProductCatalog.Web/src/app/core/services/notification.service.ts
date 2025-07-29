import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  private openSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }

  showSuccess(message: string): void {
    this.openSnackBar(message, 'success-snackbar');
  }

  showError(message: string): void {
    this.openSnackBar(message, 'error-snackbar');
  }

  showWarning(message: string): void {
    this.openSnackBar(message, 'warning-snackbar');
  }

  showInfo(message: string): void {
    this.openSnackBar(message, 'info-snackbar');
  }
}
