import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { AuthService } from '../../services/auth.service';
import { Car } from '../../models/car.interface';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="car-list-container">
      <div class="header">
        <h2><i class="fas fa-car"></i> Notre Collection de Voitures</h2>
        <button *ngIf="isAdmin" (click)="navigateToAdd()" class="add-btn">
          <i class="fas fa-plus"></i> Nouvelle Voiture
        </button>
      </div>

      <div class="cars-grid">
        <div *ngFor="let car of cars" class="car-card" [class.admin-mode]="isAdmin">
          <div class="car-image-container">
            <img [src]="car.image" [alt]="car.marque + ' ' + car.modele">
            <div class="car-overlay">
              <h3>{{ car.marque }}</h3>
              <p class="model">{{ car.modele }}</p>
            </div>
          </div>
          <div class="car-info">
            <div class="car-details">
              <span class="brand">{{ car.marque }}</span>
              <span class="model">{{ car.modele }}</span>
              <div class="color-info">
                <span class="color-label">Couleur:</span>
                <span class="color-dot" [style.background-color]="car.couleur"></span>
                <span class="color-name">{{ car.couleur }}</span>
              </div>
            </div>
            <div *ngIf="isAdmin" class="car-actions">
              <button (click)="editCar(car)" class="edit-btn" title="Modifier">
                <i class="fas fa-edit"></i>
              </button>
              <button (click)="deleteCar(car.id)" class="delete-btn" title="Supprimer">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .car-list-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
      padding: 0 1rem;
    }

    .header h2 {
      font-size: 2rem;
      color: #2c3e50;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .add-btn {
      background: linear-gradient(135deg, #2ecc71, #27ae60);
      color: white;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 25px;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(46, 204, 113, 0.2);
    }

    .add-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(46, 204, 113, 0.3);
    }

    .cars-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
      padding: 1rem;
    }

    .car-card {
      background: white;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0,0,0,0.08);
      transition: all 0.3s ease;
    }

    .car-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }

    .car-image-container {
      position: relative;
      width: 100%;
      height: 220px;
      overflow: hidden;
    }

    .car-image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .car-card:hover .car-image-container img {
      transform: scale(1.1);
    }

    .car-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
      padding: 1.5rem;
      color: white;
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }

    .car-card:hover .car-overlay {
      transform: translateY(0);
    }

    .car-info {
      padding: 1.5rem;
    }

    .car-details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .brand {
      font-size: 1.4rem;
      font-weight: bold;
      color: #2c3e50;
    }

    .model {
      font-size: 1.1rem;
      color: #7f8c8d;
    }

    .color-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .color-label {
      color: #95a5a6;
    }

    .color-dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid #fff;
      box-shadow: 0 0 3px rgba(0,0,0,0.3);
    }

    .color-name {
      color: #7f8c8d;
      text-transform: capitalize;
    }

    .car-actions {
      display: flex;
      gap: 0.8rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #ecf0f1;
    }

    .edit-btn, .delete-btn {
      padding: 0.6rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      flex: 1;
    }

    .edit-btn {
      background: linear-gradient(135deg, #3498db, #2980b9);
      color: white;
    }

    .delete-btn {
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      color: white;
    }

    .edit-btn:hover, .delete-btn:hover {
      transform: translateY(-2px);
      filter: brightness(110%);
    }

    @media (max-width: 768px) {
      .cars-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      }

      .header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .car-image-container {
        height: 180px;
      }
    }
  `]
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  isAdmin = false;

  constructor(
    private carService: CarService,
    private authService: AuthService,
    private router: Router
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.carService.getAllCars().subscribe(cars => {
      this.cars = cars;
    });
  }

  navigateToAdd() {
    this.router.navigate(['/cars/add']);
  }

  editCar(car: Car) {
    this.router.navigate(['/cars/edit', car.id]);
  }

  deleteCar(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
      this.carService.deleteCar(id).subscribe(() => {
        this.loadCars();
      });
    }
  }
}
