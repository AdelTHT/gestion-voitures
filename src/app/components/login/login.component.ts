import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <div class="login-container">
        <div class="login-header">
          <i class="fas fa-car car-icon"></i>
          <h2>Bienvenue</h2>
          <p>Connectez-vous à votre compte</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="username">
              <i class="fas fa-user"></i>
              Nom d'utilisateur
            </label>
            <input 
              type="text" 
              id="username" 
              [(ngModel)]="username" 
              name="username" 
              required
              placeholder="Entrez votre nom d'utilisateur"
            >
          </div>

          <div class="form-group">
            <label for="password">
              <i class="fas fa-lock"></i>
              Mot de passe
            </label>
            <input 
              type="password" 
              id="password" 
              [(ngModel)]="password" 
              name="password" 
              required
              placeholder="Entrez votre mot de passe"
            >
          </div>

          <div class="form-actions">
            <button type="submit" class="login-btn">
              <i class="fas fa-sign-in-alt"></i>
              Se connecter
            </button>
            <button type="button" (click)="goToRegister()" class="register-btn">
              <i class="fas fa-user-plus"></i>
              Créer un compte
            </button>
          </div>

          <p *ngIf="error" class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            {{ error }}
          </p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      padding: 20px;
    }

    .login-container {
      background: white;
      padding: 2.5rem;
      border-radius: 20px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      width: 100%;
      max-width: 400px;
      animation: slideUp 0.5s ease-out;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .car-icon {
      font-size: 3rem;
      color: #2a5298;
      margin-bottom: 1rem;
      display: inline-block;
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-20px);
      }
      60% {
        transform: translateY(-10px);
      }
    }

    .login-header h2 {
      color: #2c3e50;
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .login-header p {
      color: #7f8c8d;
      font-size: 1rem;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      color: #34495e;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    input {
      padding: 0.8rem 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    input:focus {
      border-color: #2a5298;
      outline: none;
      box-shadow: 0 0 0 3px rgba(42,82,152,0.1);
    }

    .form-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .login-btn, .register-btn {
      padding: 0.8rem;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .login-btn {
      background: linear-gradient(135deg, #2a5298, #1e3c72);
      color: white;
    }

    .register-btn {
      background: white;
      color: #2a5298;
      border: 2px solid #2a5298;
    }

    .login-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(42,82,152,0.3);
    }

    .register-btn:hover {
      background: #f8f9fa;
      transform: translateY(-2px);
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }

    @media (max-width: 480px) {
      .login-container {
        padding: 1.5rem;
      }

      .car-icon {
        font-size: 2.5rem;
      }

      .login-header h2 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.error = '';
    this.authService.login(this.username, this.password).subscribe({
      next: (user) => {
        if (user) {
          this.router.navigate(['/cars']);
        } else {
          this.error = 'Identifiants invalides';
        }
      },
      error: () => {
        this.error = 'Une erreur est survenue';
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
