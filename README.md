# eCare 🏥

> Full-stack hospital management system built with Angular, Django REST Framework & MySQL — covering the complete patient care workflow from consultation to prescription.

[![Angular](https://img.shields.io/badge/Angular-19-red?logo=angular)](https://angular.io/)
[![Django REST](https://img.shields.io/badge/Django-REST%20Framework-green?logo=django)](https://www.django-rest-framework.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)](https://www.mysql.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.10+-yellow?logo=python)](https://www.python.org/)

---

## Overview

eCare is a hospital information system designed to digitize and streamline clinical workflows. The system connects three types of users — **doctors**, **lab technicians**, and **patients** — around a unified electronic patient record.

Built as an academic project at **ESI Alger**, eCare covers the full care cycle: patient registration, medical consultation, lab requests, and prescription management.

---

## Architecture

```
┌─────────────────────────────────┐
│        Angular SPA              │  :4200
│     (TypeScript + Tailwind)     │
└────────────────┬────────────────┘
                 │ HTTP / REST API
┌────────────────▼────────────────┐
│      Django REST Framework      │  :8000
│         (Python Backend)        │
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│         MySQL Database          │
└─────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 19, TypeScript, TailwindCSS |
| Backend | Django REST Framework, Python 3.10+ |
| Database | MySQL 8.0 |
| Auth | JWT (JSON Web Tokens) |
| API | REST — documented with Postman |
| Tools | Git, GitHub |

---

## Features

### 👤 Patient Management
- Patient registration and profile management
- Electronic patient record (dossier médical)
- Full medical history per patient

### 🩺 Doctor Module
- Schedule and manage consultations
- Access and update patient records
- Write and manage prescriptions

### 🔬 Lab Technician Module
- Receive and process lab requests from doctors
- Upload and attach lab results to patient records

### 📋 Core Entities
- **Patient** — personal info, medical history, linked records
- **Médecin (Doctor)** — consultations, prescriptions, lab requests
- **Laborantin (Lab Technician)** — lab results management
- **Consultation** — doctor-patient encounter with notes and diagnosis
- **Prescription** — medications prescribed per consultation
- **Dossier Patient** — unified electronic health record

### 🔐 Role-Based Access Control
- Three distinct roles: Patient, Doctor, Lab Technician
- Each role has isolated views and permissions

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- MySQL 8.0

---

### Backend (Django REST)

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env          # Fill in your DB credentials

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start server
python manage.py runserver
```

API available at: `http://localhost:8000`

---

### Frontend (Angular)

```bash
cd frontend   # or src/ depending on your folder name

# Install dependencies
npm install

# Start dev server
ng serve
```

App available at: `http://localhost:4200`

---

## Project Structure

```
eCare/
├── backend/
│   ├── apps/
│   │   ├── patients/         # Patient model & endpoints
│   │   ├── medecins/         # Doctor model & endpoints
│   │   ├── laborantins/      # Lab technician endpoints
│   │   ├── consultations/    # Consultation logic
│   │   ├── prescriptions/    # Prescription management
│   │   └── dossiers/         # Patient record aggregation
│   ├── config/               # Settings, URLs, WSGI
│   ├── manage.py
│   └── requirements.txt
│
├── src/                      # Angular frontend
│   ├── app/
│   │   ├── components/       # Shared UI components
│   │   ├── pages/            # Route-level pages per role
│   │   ├── services/         # HTTP API services
│   │   └── guards/           # Route guards (RBAC)
│   └── environments/
│
└── public/                   # Static assets
```

---

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login/` | Login & get JWT token |
| GET | `/api/patients/` | List all patients |
| GET | `/api/patients/:id/dossier/` | Get patient full record |
| POST | `/api/consultations/` | Create a consultation |
| POST | `/api/prescriptions/` | Add a prescription |
| GET | `/api/laborantin/results/` | Get lab results |

---

## Team

| Name | Role |
|---|---|
| [Sara Amina Iratni](https://github.com/sarairatni) | Full-stack development |
| Teammate | Full-stack development |

*Academic project — ESI Alger, 2024–2025*

---

## License

Developed for academic purposes at ESI Alger. Not intended for production medical use.
