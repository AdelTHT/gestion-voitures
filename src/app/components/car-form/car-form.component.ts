import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.interface';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="car-form-page">
      <div class="car-form-container">
        <div class="form-header">
          <i class="fas fa-car"></i>
          <h2>{{ isEditMode ? 'Modifier' : 'Ajouter' }} une voiture</h2>
          <p>{{ isEditMode ? 'Modifiez les informations de la voiture' : 'Remplissez les informations pour ajouter une nouvelle voiture' }}</p>
        </div>

        <form (ngSubmit)="onSubmit()" #carForm="ngForm">
          <div class="form-group">
            <label for="marque">
              <i class="fas fa-trademark"></i>
              Marque
            </label>
            <input 
              type="text" 
              id="marque" 
              [(ngModel)]="car.marque" 
              name="marque" 
              required
              #marque="ngModel"
              placeholder="Ex: BMW, Audi, Mercedes..."
            >
            <div class="error-message" *ngIf="marque.invalid && (marque.dirty || marque.touched)">
              La marque est requise
            </div>
          </div>

          <div class="form-group">
            <label for="modele">
              <i class="fas fa-car-side"></i>
              Modèle
            </label>
            <input 
              type="text" 
              id="modele" 
              [(ngModel)]="car.modele" 
              name="modele" 
              required
              #modele="ngModel"
              placeholder="Ex: Série 3, A4, Classe C..."
            >
            <div class="error-message" *ngIf="modele.invalid && (modele.dirty || modele.touched)">
              Le modèle est requis
            </div>
          </div>

          <div class="form-group">
            <label for="couleur">
              <i class="fas fa-palette"></i>
              Couleur
            </label>
            <input 
              type="text" 
              id="couleur" 
              [(ngModel)]="car.couleur" 
              name="couleur" 
              required
              #couleur="ngModel"
              placeholder="Ex: rouge, noir, blanc..."
            >
            <div class="error-message" *ngIf="couleur.invalid && (couleur.dirty || couleur.touched)">
              La couleur est requise
            </div>
          </div>

          <div class="form-group">
            <label for="image">
              <i class="fas fa-image"></i>
              URL de l'image
            </label>
            <input 
              type="url" 
              id="image" 
              [(ngModel)]="car.image" 
              name="image" 
              required
              #image="ngModel"
              placeholder="https://exemple.com/image.jpg"
            >
            <div class="error-message" *ngIf="image.invalid && (image.dirty || image.touched)">
              L'URL de l'image est requise
            </div>
          </div>

          <div class="preview" *ngIf="car.image">
            <img [src]="car.image" [alt]="car.marque + ' ' + car.modele">
          </div>

          <div class="form-actions">
            <button type="submit" class="submit-btn" [disabled]="!carForm.form.valid">
              <i class="fas fa-{{ isEditMode ? 'save' : 'plus-circle' }}"></i>
              {{ isEditMode ? 'Enregistrer' : 'Ajouter' }}
            </button>
            <button type="button" class="cancel-btn" (click)="cancel()">
              <i class="fas fa-times"></i>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .car-form-page {
      min-height: calc(100vh - 64px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: #f8f9fa;
    }

    .car-form-container {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 600px;
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

    .form-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .form-header i {
      font-size: 3rem;
      color: #3498db;
      margin-bottom: 1rem;
    }

    .form-header h2 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .form-header p {
      color: #7f8c8d;
    }

    form {
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
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    label i {
      color: #3498db;
    }

    input {
      padding: 0.8rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    input:focus {
      border-color: #3498db;
      outline: none;
      box-shadow: 0 0 0 3px rgba(52,152,219,0.1);
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.9rem;
      margin-top: 0.25rem;
    }

    .preview {
      margin: 1rem 0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .preview img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .submit-btn, .cancel-btn {
      flex: 1;
      padding: 0.8rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .submit-btn {
      background: linear-gradient(135deg, #3498db, #2980b9);
      color: white;
    }

    .submit-btn:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }

    .submit-btn:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(52,152,219,0.3);
    }

    .cancel-btn {
      background: white;
      color: #e74c3c;
      border: 2px solid #e74c3c;
    }

    .cancel-btn:hover {
      background: #e74c3c;
      color: white;
      transform: translateY(-2px);
    }

    @media (max-width: 480px) {
      .car-form-page {
        padding: 1rem;
      }

      .car-form-container {
        padding: 1.5rem;
      }

      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class CarFormComponent implements OnInit {
  car: Omit<Car, 'id'> = {
    marque: '',
    modele: '',
    couleur: '',
    image: ''
  };
  isEditMode = false;

  constructor(
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const carId = this.route.snapshot.params['id'];
    if (carId) {
      this.isEditMode = true;
      this.carService.getCarById(carId).subscribe(car => {
        this.car = car;
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.carService.updateCar(this.car as Car).subscribe(() => {
        this.router.navigate(['/cars']);
      });
    } else {
      this.carService.addCar(this.car).subscribe(() => {
        this.router.navigate(['/cars']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/cars']);
  }
}
