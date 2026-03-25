# Blablagnole — interface web

## À propos du projet

**Blablagnole** est le front d’une appli de **gestion des transports** : **véhicules de service**, **covoiturages** (annonces et réservations), côté **admin** gestion du **parc** et des comptes.

Stack : **Next.js (React)** , API **Spring Boot** (Java 17). PDF du projet : `Cahier des charges - Gestion des transports.pdf`.

## Rôles (résumé)

- **Collaborateur** : auth, recherche et réservation covoiturage, ses annonces, locations véhicules de service, profil. Rôle affiché : `ADMIN` ou `COLLABORATOR`.
- **Administrateur** : parc, locations, collaborateurs.
- **Visiteur** : pages publiques sous `app/(site)`.

## Technique

Next.js 16, React 19, TypeScript, Tailwind 4, **shadcn/ui**, TanStack Query / Table, React Hook Form, Zod. E-mails : React Email + **Resend**. Plus deDétail dans : `package.json`.

## Backend (BFF)

Le front appelle **`/api/...`**. La plupart du temps [`lib/api/proxyToSpring.ts`](lib/api/proxyToSpring.ts) relaie vers `SPRING_API_URL` avec les **cookies**. Quelques routes envoient des mails via **Resend** (sans Spring).

## Lancer en local

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000). Prod locale : `npm run build` puis `npm run start`. `npm run lint`, `npm run email:dev` pour les templates mail.

## Variables d’environnement

`.env.local` à la racine (hors git) :

```env
SPRING_API_URL=http://localhost:8080

RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM=Blablagnole <no-reply@votredomaine.fr>
```

`SPRING_API_URL` : requis pour le proxy. Resend : `RESEND_API_KEY` + `RESEND_FROM`, sinon les `/api/emails/*` échouent (normal).

## Routes `/api` → Spring

Préfixe **`/api`**. Ex. `GET /api/auth/me`. **`{id}`** = id Spring.

### Authentification

| Méthode | Route Next.js        | Ressource Spring      |
| ------- | -------------------- | --------------------- |
| POST    | `/api/auth/login`    | `POST /auth/login`    |
| POST    | `/api/auth/register` | `POST /auth/register` |
| POST    | `/api/auth/logout`   | `POST /auth/logout`   |
| POST    | `/api/auth/refresh`  | `POST /auth/refresh`  |
| GET     | `/api/auth/me`       | `GET /auth/me`        |

### Utilisateurs

| Méthode | Route Next.js     | Ressource Spring     |
| ------- | ----------------- | -------------------- |
| GET     | `/api/users`      | `GET /users`         |
| GET     | `/api/users/{id}` | `GET /users/{id}`    |
| DELETE  | `/api/users/{id}` | `DELETE /users/{id}` |

### Adresses

| Méthode | Route Next.js         | Ressource Spring         |
| ------- | --------------------- | ------------------------ |
| POST    | `/api/addresses`      | `POST /addresses`        |
| PUT     | `/api/addresses`      | `PUT /addresses`         |
| GET     | `/api/addresses/{id}` | `GET /addresses/{id}`    |
| DELETE  | `/api/addresses/{id}` | `DELETE /addresses/{id}` |

### Véhicules personnels (conducteur)

| Méthode | Route Next.js           | Ressource Spring        |
| ------- | ----------------------- | ----------------------- |
| POST    | `/api/cars`             | `POST /cars`            |
| PUT     | `/api/cars`             | `PUT /cars`             |
| GET     | `/api/cars/driver/{id}` | `GET /cars/driver/{id}` |
| DELETE  | `/api/cars/{id}`        | `DELETE /cars/{id}`     |

### Covoiturages

| Méthode | Route Next.js               | Ressource Spring            |
| ------- | --------------------------- | --------------------------- |
| GET     | `/api/carpools`             | `GET /carpools`             |
| POST    | `/api/carpools`             | `POST /carpools`            |
| PUT     | `/api/carpools`             | `PUT /carpools`             |
| GET     | `/api/carpools/driver/{id}` | `GET /carpools/driver/{id}` |
| GET     | `/api/carpools/{id}`        | `GET /carpools/{id}`        |
| DELETE  | `/api/carpools/{id}`        | `DELETE /carpools/{id}`     |

### Réservations de covoiturage

| Méthode | Route Next.js                          | Ressource Spring                        |
| ------- | -------------------------------------- | --------------------------------------- |
| POST    | `/api/carpool-bookings`                | `POST /carpool-bookings`                |
| PUT     | `/api/carpool-bookings`                | `PUT /carpool-bookings`                 |
| GET     | `/api/carpool-bookings/passenger/{id}` | `GET /carpool-bookings/passenger/{id}`  |
| GET     | `/api/carpool-bookings/{id}`           | `GET /carpool-bookings/{id}`            |
| DELETE  | `/api/carpool-bookings/{id}`           | `DELETE /carpool-bookings/{id}`         |
| PATCH   | `/api/carpool-bookings/{id}/confirm`   | `PATCH /carpool-bookings/{id}/confirm`  |
| PATCH   | `/api/carpool-bookings/{id}/cancel`    | `PATCH /carpool-bookings/{id}/cancel`   |
| PATCH   | `/api/carpool-bookings/{id}/complete`  | `PATCH /carpool-bookings/{id}/complete` |

### Véhicules de service

| Méthode | Route Next.js            | Ressource Spring            |
| ------- | ------------------------ | --------------------------- |
| GET     | `/api/service-cars`      | `GET /service-cars`         |
| POST    | `/api/service-cars`      | `POST /service-cars`        |
| PUT     | `/api/service-cars`      | `PUT /service-cars`         |
| GET     | `/api/service-cars/{id}` | `GET /service-cars/{id}`    |
| DELETE  | `/api/service-cars/{id}` | `DELETE /service-cars/{id}` |

### Réservations de véhicules de service

| Méthode | Route Next.js                             | Ressource Spring                            |
| ------- | ----------------------------------------- | ------------------------------------------- |
| GET     | `/api/service-car-bookings`               | `GET /service-car-bookings`                 |
| POST    | `/api/service-car-bookings`               | `POST /service-car-bookings`                |
| PUT     | `/api/service-car-bookings`               | `PUT /service-car-bookings`                 |
| GET     | `/api/service-car-bookings/driver/{id}`   | `GET /service-car-bookings/driver/{id}`     |
| GET     | `/api/service-car-bookings/{id}`          | `GET /service-car-bookings/{id}`            |
| DELETE  | `/api/service-car-bookings/{id}`          | `DELETE /service-car-bookings/{id}`         |
| PATCH   | `/api/service-car-bookings/{id}/cancel`   | `PATCH /service-car-bookings/{id}/cancel`   |
| PATCH   | `/api/service-car-bookings/{id}/complete` | `PATCH /service-car-bookings/{id}/complete` |

### E-mails (Resend uniquement)

| Méthode | Route Next.js                                  | Description                                                                                 |
| ------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------- |
| POST    | `/api/emails/carpool-cancellation`             | Annulation covoiturage — corps attendu dans `app/api/emails/carpool-cancellation/route.ts`. |
| POST    | `/api/emails/service-car-booking-cancellation` | Annulation location véhicule de service.                                                    |

## Adresses / trajet

Complétion d’adresses : **API Géoplateforme (IGN)** — [`lib/geocoding/ign.ts`](lib/geocoding/ign.ts). Distance / durée : **OSRM** — [`lib/routing/osrm.ts`](lib/routing/osrm.ts). Saisie manuelle possible sur les formulaires.

---

[nextjs.org/docs](https://nextjs.org/docs)
