export interface Car {
    id: number;
    marque: string;
    modele: string;
    couleur: string;
    image: string;
  }
  
  export interface User {
    id: number;
    username: string;
    password: string;
    role: 'ADMIN' | 'USER';
  }