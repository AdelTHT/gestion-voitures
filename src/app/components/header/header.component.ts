import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header>
      <nav>
        <div class="left-section">
          <div class="brand">
            <i class="fas fa-car"></i>
            <span>Gestion Voitures</span>
          </div>
          <div class="nav-links">
            <a routerLink="/cars" routerLinkActive="active">
              <i class="fas fa-list"></i> Liste des voitures
            </a>
            <a *ngIf="isAdmin" routerLink="/cars/add" routerLinkActive="active">
              <i class="fas fa-plus-circle"></i> Ajouter une voiture
            </a>
          </div>
        </div>
        <div class="auth-section">
          <span *ngIf="isAuthenticated" class="username">
            <i class="fas fa-user"></i> {{ username }}
          </span>
          <button *ngIf="isAuthenticated" (click)="logout()" class="logout-btn">
            <i class="fas fa-sign-out-alt"></i> Déconnexion
          </button>
          <a *ngIf="!isAuthenticated" routerLink="/login" class="login-btn">
            <i class="fas fa-sign-in-alt"></i> Connexion
          </a>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    header {
      background: linear-gradient(to right, #2c3e50, #3498db);
      padding: 1rem;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .brand {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: transform 0.3s ease;
      white-space: nowrap;
    }

    .brand:hover {
      transform: scale(1.05);
    }

    .nav-links {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .nav-links a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      white-space: nowrap;
    }

    .nav-links a:hover {
      background: rgba(255,255,255,0.1);
      transform: translateY(-2px);
    }

    .nav-links a.active {
      background: rgba(255,255,255,0.2);
      box-shadow: 0 0 10px rgba(255,255,255,0.1);
    }

    .auth-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .username {
      color: #ffd700;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      white-space: nowrap;
    }

    .logout-btn {
      padding: 0.5rem 1rem;
      background-color: #e74c3c;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      white-space: nowrap;
    }

    .logout-btn:hover {
      background-color: #c0392b;
      transform: translateY(-2px);
    }

    .login-btn {
      padding: 0.5rem 1rem;
      background-color: #2ecc71;
      color: white;
      text-decoration: none;
      border-radius: 20px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      white-space: nowrap;
    }

    .login-btn:hover {
      background-color: #27ae60;
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      nav {
        flex-direction: column;
        gap: 1rem;
      }

      .left-section {
        flex-direction: column;
        gap: 1rem;
      }

      .nav-links {
        flex-direction: column;
        width: 100%;
      }

      .nav-links a {
        width: 100%;
        justify-content: center;
      }

      .auth-section {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class HeaderComponent {
  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }

  get username() {
    return this.authService.getCurrentUser()?.username;
  }

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
} 