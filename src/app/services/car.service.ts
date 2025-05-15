import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Car } from '../models/car.interface';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  // Simuler les données des voitures
  private cars: Car[] = [
    { id: 1, marque: 'Toyota', modele: 'Corolla', couleur: 'bleu', image: 'https://example.com/toyota-corolla.jpg' },
    { id: 2, marque: 'Honda', modele: 'Civic', couleur: 'rouge', image: 'https://example.com/honda-civic.jpg' },
    { id: 3, marque: 'Ford', modele: 'Focus', couleur: 'noir',  image: 'https://example.com/ford-focus.jpg' },
  ];

  constructor() {}

  // Récupérer toutes les voituresS
  getAllCars(): Observable<Car[]> {
    return of(this.cars);
  }

  // Récupérer une voiture par son ID
  getCarById(id: number): Observable<Car> {
    const car = this.cars.find(c => c.id === id);
    return of(car!);
  }

  // Ajouter une nouvelle voiture
  addCar(car: Omit<Car, 'id'>): Observable<Car> {
    const newCar = { id: this.cars.length + 1, ...car };
    this.cars.push(newCar);
    return of(newCar);
  }

  // Mettre à jour une voiture
  updateCar(car: Car): Observable<Car> {
    const index = this.cars.findIndex(c => c.id === car.id);
    if (index !== -1) {
      this.cars[index] = car;
    }
    return of(car);
  }

  // Supprimer une voiture
  deleteCar(id: number): Observable<void> {
    this.cars = this.cars.filter(c => c.id !== id);
    return of();
  }
}
