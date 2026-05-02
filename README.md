# Sistem Manajemen Kos / Sewa Properti

Sistem berbasis Service-Oriented Architecture (SOA) untuk manajemen properti kos, booking kamar, dan pembayaran sewa.

## Identitas

| Item | Detail |
|---|---|
| Nama | Praffi Ramadhani |
| NIM | 2410511028 |
| Kelas | A |
| Mata Kuliah | Pembangunan Perangkat Lunak Berorientasi Service |

## Demo Video

[Demo Video](https://youtu.be/5-XdyFYUMw4?si=Gm80O31asbXv4tt_)

## Arsitektur

Sistem terdiri dari 3 microservice independen + 1 API Gateway.

```
Client / Postman
      │
      ▼
 [API Gateway]  :3000  ← satu-satunya entry point
      │
      ├──► [auth-service]      :3001  Node.js + Express
      ├──► [property-service]  :8000  PHP Laravel 11
      └──► [booking-service]   :3002  Node.js + Express
                │
                └──► calls property-service (cek ketersediaan kamar)

Semua service terhubung ke MySQL dengan database terpisah:
  auth_db | property_db | booking_db
```

## Tech Stack

| Komponen | Teknologi |
|---|---|
| API Gateway | Node.js + Express |
| Auth Service | Node.js + Express |
| Property Service | PHP Laravel 11 (MVC) |
| Booking Service | Node.js + Express |
| Database | MySQL 8.0 |
| Containerization | Docker + Docker Compose |
| Auth | JWT + Google OAuth 2.0 |

## Cara Menjalankan

### Prasyarat
- Docker Desktop terinstall dan berjalan
- Git

### Langkah

```bash
# 1. Clone repository
git clone https://github.com/praffiii/uts-pplos-a-2410511028.git
cd uts-pplos-a-2410511028

# 2. Buat file .env dari template di setiap service
cp gateway/.env.example gateway/.env
cp services/auth-service/.env.example services/auth-service/.env
cp services/property-service/.env.example services/property-service/.env
cp services/booking-service/.env.example services/booking-service/.env
# Edit masing-masing .env dan isi nilai yang diperlukan

# 3. Jalankan semua service
docker-compose up --build

# 4. Akses API melalui gateway
# http://localhost:3000
```

> Semua request harus melalui gateway di port 3000. Jangan akses service langsung.

## Peta Endpoint

Semua endpoint diakses melalui `http://localhost:3000`.

### Auth (`/auth`)
| Method | Endpoint | Keterangan | Auth |
|---|---|---|---|
| POST | `/auth/register` | Daftar akun baru | — |
| POST | `/auth/login` | Login → JWT token | — |
| POST | `/auth/refresh` | Perbarui access token | — |
| POST | `/auth/logout` | Invalidasi refresh token | ✓ |
| GET | `/auth/google` | Login via Google OAuth | — |
| GET | `/auth/google/callback` | Callback Google OAuth | — |
| GET | `/auth/profile` | Data profil user | ✓ |

### Pemilik (`/owners`)
| Method | Endpoint | Keterangan | Auth |
|---|---|---|---|
| POST | `/owners` | Tambah pemilik kos | ✓ |
| GET | `/owners/:id` | Detail pemilik beserta propertinya | ✓ |
| PUT | `/owners/:id` | Update data pemilik | ✓ |

### Properti (`/properties`, `/rooms`)
| Method | Endpoint | Keterangan | Auth |
|---|---|---|---|
| GET | `/properties` | List properti (paging + filter) | — |
| POST | `/properties` | Tambah properti | ✓ |
| GET | `/properties/:id` | Detail properti | — |
| PUT | `/properties/:id` | Update properti | ✓ |
| DELETE | `/properties/:id` | Hapus properti | ✓ |
| GET | `/rooms` | List kamar (paging + filter) | — |
| POST | `/rooms` | Tambah kamar | ✓ |
| GET | `/rooms/:id` | Detail kamar | — |
| PUT | `/rooms/:id` | Update kamar | ✓ |
| DELETE | `/rooms/:id` | Hapus kamar | ✓ |

### Booking & Pembayaran (`/bookings`, `/payments`)
| Method | Endpoint | Keterangan | Auth |
|---|---|---|---|
| POST | `/bookings` | Buat booking | ✓ |
| GET | `/bookings` | List booking saya | ✓ |
| GET | `/bookings/:id` | Detail booking | ✓ |
| PATCH | `/bookings/:id/status` | Update status booking | ✓ |
| POST | `/payments` | Catat pembayaran | ✓ |
| GET | `/payments/history` | Riwayat pembayaran | ✓ |

> ✓ = Memerlukan JWT token di header `Authorization: Bearer <token>`

## Struktur Repository

```
uts-pplos-a-2410511028/
├── README.md
├── docker-compose.yml
├── gateway/               # API Gateway (Node.js)
├── services/
│   ├── auth-service/      # JWT + Google OAuth (Node.js)
│   ├── property-service/  # Listing properti (PHP Laravel 11)
│   └── booking-service/   # Booking & pembayaran (Node.js)
├── docs/
│   ├── 2410511028-PraffiRamadhani-IFA-Service-UTS.pdf
│   └── diagram-arsitektur.png
└── postman/
    ├── uts-pplos-a-2410511028.postman_collection.json
    └── *.png               # Screenshot setiap endpoint
```
