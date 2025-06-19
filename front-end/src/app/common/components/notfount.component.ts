import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-not-found',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="not-found-wrapper">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a routerLink="/public">Back to Home</a>
    </div>
  `,
  styles: [`
    .not-found-wrapper {
      text-align: center;
      padding: 4rem 1rem;
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    p {
      margin-bottom: 2rem;
      color: #666;
    }

    a {
      text-decoration: none;
      background: #007bff;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }

    a:hover {
      background: #0056b3;
    }
  `]
})
export class NotFoundComponent {}