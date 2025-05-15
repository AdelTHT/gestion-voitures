import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-page">
      <div class="register-container">
        <div class="register-header">
          <i class="fas fa-car car-icon"></i>
          <h2>Créer un compte</h2>
          <p>Rejoignez notre communauté automobile</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="register-form">
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
              placeholder="Choisissez un nom d'utilisateur"
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
              placeholder="Créez un mot de passe sécurisé"
            >
          </div>

          <div class="form-actions">
            <button type="submit" class="register-btn">
              <i class="fas fa-user-plus"></i>
              S'inscrire
            </button>
            <button type="button" (click)="goToLogin()" class="login-btn">
              <i class="fas fa-sign-in-alt"></i>
              Déjà inscrit ? Se connecter
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
    .register-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
      padding: 20px;
    }

    .register-container {
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

    .register-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .car-icon {
      font-size: 3rem;
      color: #3498db;
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

    .register-header h2 {
      color: #2c3e50;
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .register-header p {
      color: #7f8c8d;
      font-size: 1rem;
    }

    .register-form {
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
      border-color: #3498db;
      outline: none;
      box-shadow: 0 0 0 3px rgba(52,152,219,0.1);
    }

    .form-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .register-btn, .login-btn {
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

    .register-btn {
      background: linear-gradient(135deg, #3498db, #2980b9);
      color: white;
    }

    .login-btn {
      background: white;
      color: #3498db;
      border: 2px solid #3498db;
    }

    .register-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(52,152,219,0.3);
    }

    .login-btn:hover {
      background: #f8f9fa;
      transform: translateY(-2px);
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.8rem;
      background: #fde8e8;
      border-radius: 8px;
      animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }

    @media (max-width: 480px) {
      .register-container {
        padding: 1.5rem;
      }

      .car-icon {
        font-size: 2.5rem;
      }

      .register-header h2 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class RegisterComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }

    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = 'Une erreur est survenue lors de l\'inscription';
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
} 