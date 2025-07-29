import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root', // O seletor padrão no index.html
  standalone: true,
  imports: [
    RouterModule, // Essencial para que o <router-outlet> funcione
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  title = 'ProductCatalog.Web';
}
