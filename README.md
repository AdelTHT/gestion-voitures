# Gestion de Voitures - Application Angular

Une application de gestion de voitures permettant de consulter, ajouter, modifier et supprimer des voitures avec gestion des rôles utilisateurs.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- [npm](https://www.npmjs.com/) (généralement installé avec Node.js)
- [Angular CLI](https://angular.io/cli) (version 19.1.6)

## Installation et lancement

1. Décompressez le fichier ZIP dans un dossier de votre choix

2. Ouvrez un terminal dans le dossier décompressé et installez les dépendances :
```bash
npm install
```

3. Installez json-server globalement :
```bash
npm install -g json-server
```

4. Démarrez le serveur JSON (base de données) dans un premier terminal :
```bash
json-server --watch db.json
```
Le serveur JSON sera accessible sur `http://localhost:3000`

5. Dans un second terminal, lancez l'application Angular :
```bash
ng serve
```
L'application sera accessible sur `http://localhost:4200`

## Utilisation

### Comptes utilisateurs disponibles :
- Admin :
  - Username : admin
  - Password : admin123
  - Droits : Tous les accès (consultation, ajout, modification, suppression)

- Utilisateur standard :
  - Username : user
  - Password : user123
  - Droits : Consultation uniquement

### Fonctionnalités :
- Consultation de la liste des voitures (tous les utilisateurs)
- Ajout d'une nouvelle voiture (ADMIN uniquement)
- Modification d'une voiture existante (ADMIN uniquement)
- Suppression d'une voiture (ADMIN uniquement)

## Structure du projet

```
gestion-voitures/
├── src/
│   ├── app/
│   │   ├── components/      # Composants de l'application
│   │   ├── services/        # Services pour la gestion des données
│   │   ├── models/          # Interfaces et modèles
│   │   ├── guards/          # Guards pour la sécurité
│   │   └── ...
│   ├── assets/             # Ressources statiques
│   └── ...
├── db.json                 # Base de données JSON
└── ...
```

## Technologies utilisées

- Angular 19.1
- JSON Server
- TypeScript
- RxJS

## En cas de problème

1. Vérifiez que tous les prérequis sont bien installés
2. Assurez-vous que les deux terminaux sont bien lancés :
   - Un pour json-server (port 3000)
   - Un pour l'application Angular (port 4200)
3. Vérifiez qu'aucune autre application n'utilise les ports 3000 et 4200
4. En cas d'erreur lors de l'installation des dépendances, essayez :
   ```bash
   npm cache clean --force
   npm install
   ``` 
## Questions Angular - Partie 1

### Différence entre AngularJS et Angular
- **AngularJS (Angular 1)**
  - Framework JavaScript original
  - Architecture MVC
  - Directives avec préfixe ng-
  - Scope et contrôleurs
  - Performance limitée

- **Angular (2+)**
  - Réécriture complète en TypeScript
  - Architecture basée sur les composants
  - Utilisation des décorateurs (@Component)
  - Meilleure performance avec le change detection
  - Support mobile optimisé

### Nouveautés Angular 14-19
- **Angular 14**
  - Typed Forms
  - Standalone Components
  - CLI amélioré
  
- **Angular 19**
  - Signals pour la gestion d'état
  - Defer blocks
  - Control Flow amélioré (@if, @for)
  - Injection de dépendances simplifiée

### Installation et Configuration d'Angular
1. Installer Node.js et npm
2. Installer Angular CLI : `npm install -g @angular/cli`
3. Créer un projet : `ng new mon-projet`
4. Choisir les options (routing, style)
5. Installer les dépendances : `npm install`
6. Lancer le serveur : `ng serve`

### Composant Angular
- Bloc de construction UI réutilisable
- Constitué de :
  - Template HTML (vue)
  - Classe TypeScript (logique)
  - Styles CSS
  - Décorateur @Component
- Exemple dans notre projet :

### Directives Angular
- **Types de directives :**
  - Structurelles : *ngIf, *ngFor
  - Attributs : ngClass, ngStyle
  - Composants


### Service Angular
- Classe qui encapsule la logique métier
- Injectable dans les composants
- Singleton par défaut


### Fonction ngOnInit
- Hook de cycle de vie
- Exécuté après la construction du composant
- Utilisé pour :
  - Initialisation des données
  - Appels API
  - Souscriptions aux observables

## Questions Angular - Partie 2

### Fichiers principaux d'un projet Angular
- **src/index.html** : Point d'entrée HTML de l'application
- **src/main.ts** : Point d'entrée TypeScript, bootstrap de l'application
- **src/app/app.component.ts** : Composant racine de l'application
- **src/app/app.routes.ts** : Configuration des routes
- **package.json** : Gestion des dépendances et scripts npm
- **angular.json** : Configuration globale du projet Angular
- **tsconfig.json** : Configuration du compilateur TypeScript
- **environments/** : Fichiers de configuration par environnement

### Mécanisme de routage Angular
- Définition des routes dans un fichier de configuration
- Utilisation du module `RouterModule`
- Composants de routage : `<router-outlet>`, `routerLink`
- Navigation programmatique avec `Router.navigate()`
- Paramètres de route : obligatoires, optionnels, query params
- Guards pour protéger les routes
- Résolution de données avec Resolvers
- Gestion des routes enfants et lazy loading

### RxJS et Observables
- **RxJS** : Bibliothèque de programmation réactive
- Gestion des opérations asynchrones
- Principaux concepts :
  - Observable : flux de données
  - Observer : consommateur du flux
  - Subscription : lien Observable/Observer
  - Operators : transformation des données

### Subject vs BehaviorSubject
- **Subject** :
  - Simple émetteur multicast
  - Pas de valeur initiale
  - Les nouveaux abonnés ne reçoivent que les futures émissions
  - Utilisé pour les événements ponctuels

- **BehaviorSubject** :
  - Nécessite une valeur initiale
  - Conserve et émet la dernière valeur
  - Les nouveaux abonnés reçoivent immédiatement la dernière valeur
  - Idéal pour la gestion d'état

### Le fichier angular.json
- Configuration principale du projet Angular
- Définition des options de build
- Configuration des assets et styles
- Définition des environnements
- Options de test et de production
- Configuration des optimisations
- Gestion des chemins et des sorties

### Commandes Angular CLI
- **ng serve** : 
  - Lance le serveur de développement
  - Port par défaut : 4200
  - Hot reload activé

- **ng serve --port 4500** : 
  - Lance le serveur sur un port spécifique (4500)

- **ng g c moncomponent** : 
  - Génère un nouveau composant
  - Crée les fichiers .ts, .html, .css, .spec.ts

- **ng g class MaClasse** : 
  - Génère une nouvelle classe
  - Crée le fichier .ts

- **ng g service MonService** : 
  - Génère un nouveau service
  - Crée le fichier service et son test

- **ng g guard AuthGuard** : 
  - Génère un guard
  - Protection des routes

- **ng new GestionVols** : 
  - Crée un nouveau projet Angular
  - Configure l'environnement initial

- **json-server --watch produit.json --port 3500** : 
  - Lance un serveur REST mock
  - Surveille le fichier JSON
  - Accessible sur le port spécifié (3500)  


### Le Décorateur @Component
Le décorateur @Component est un décorateur de classe qui définit les métadonnées d'un composant Angular.

Attributs principaux :
- **selector** : nom de la balise HTML du composant
- **template/templateUrl** : contenu HTML du composant
- **styles/styleUrls** : styles CSS du composant
- **imports** : modules et composants nécessaires
- **providers** : services spécifiques au composant
- **standalone** : true/false pour composant autonome


### Communication Parent/Enfant

#### Composant Parent vers Enfant
1. **@Input()**
   - Décorateur pour recevoir des données du parent
   - Syntaxe dans l'enfant : `@Input() data: string;`
   - Utilisation dans le parent : `<app-child [data]="parentData"></app-child>`

2. **ViewChild**
   - Accès direct à l'instance de l'enfant
   - Permet d'appeler les méthodes de l'enfant
   ```typescript
   @ViewChild(ChildComponent) child: ChildComponent;
   ```

#### Enfant vers Parent
1. **@Output()**
   - Émet des événements vers le parent
   - Utilise EventEmitter
   ```typescript
   @Output() notify = new EventEmitter<string>();
   ```
   - Dans le parent : `<app-child (notify)="onNotify($event)"></app-child>`

2. **Services partagés**
   - Communication via un service injectable
   - Utilisation de Subjects/BehaviorSubjects

#### Cycle de Communication
1. Parent définit les données/propriétés
2. Enfant reçoit via @Input()
3. Enfant émet via @Output()
4. Parent réagit aux événements

#### Bonnes Pratiques
- Éviter les communications trop profondes
- Préférer les services pour la communication complexe
- Documenter les interfaces de communication
- Utiliser le typage strict pour les données échangées