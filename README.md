# 🦁 Zoo Connect Web

Una aplicación web moderna para la gestión de zoológicos construida con **Angular 20** y **Bun**. Esta aplicación utiliza las últimas características de Angular incluyendo **Signals**, **Server-Side Rendering (SSR)** y **NgRx Signals** para el manejo de estado.

## 🚀 Tecnologías Principales

- **Angular 20** - Framework principal con las últimas características
- **Bun** - Runtime de JavaScript ultrarrápido y gestor de paquetes
- **TypeScript 5.8** - Tipado estático robusto
- **Angular Material** - Componentes de UI siguiendo Material Design
- **NgRx Signals** - Manejo de estado reactivo moderno

## 📋 Prerrequisitos

### Instalar Bun

**Bun** es nuestro runtime y gestor de paquetes principal. **NO uses npm** para este proyecto.

#### Windows (usando PowerShell como Administrador):
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

```powershell
npm -g install bun
```

#### macOS/Linux:
```bash
curl -fsSL https://bun.sh/install | bash
```

#### Verificar instalación:
```bash
bun --version
```

## 🛠️ Instalación del Proyecto

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/JesusRodrigoV/zoo_conect_web.git
   cd zoo_conect_web
   ```

2. **Instala las dependencias (usa Bun, NO npm):**
   ```bash
   bun install
   ```

## 🏃‍♂️ Scripts de Desarrollo

### Servidor de desarrollo
```bash
bun start
# o
bun run start
```
La aplicación estará disponible en `http://localhost:4200/`

### Build de producción
```bash
bun run build
```

### Ejecutar tests
```bash
bun run test
```

### Modo watch para desarrollo
```bash
bun run watch
```

### Servidor SSR
```bash
bun run serve:ssr:zoo-connect-web
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                    # Funcionalidades centrales
│   │   ├── guards/              # Guards de autenticación y autorización
│   │   ├── interceptors/        # HTTP interceptors
│   │   └── store/               # NgRx Signals stores
│   │
│   ├── features/                # Módulos de funcionalidades
│   │   ├── auth/                # Sistema de autenticación
│   │   │   ├── models/          # Interfaces y tipos
│   │   │   ├── services/        # Servicios HTTP
│   │   │   ├── adapters/        # Adaptadores de datos
│   │   │   └── pages/           # Páginas de auth (login, signup)
│   │   │
│   │   ├── home/                # Página principal
│   │   ├── profile/             # Perfil de usuario
│   │   ├── settings/            # Configuraciones
│   │   └── not-found/           # Página 404
│   │
│   ├── shared/                  # Componentes y recursos compartidos
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── header/          # Header con profile-button
│   │   │   ├── footer/          # Footer de la aplicación
│   │   │   ├── form-field/      # Campo de formulario reutilizable
│   │   │   ├── loader/          # Componente de carga
│   │   │   └── user-avatar/     # Avatar de usuario reutilizable
│   │   │
│   │   └── layout/              # Layout principal
│   │
│   ├── app.config.ts           # Configuración principal de la app
│   ├── app.routes.ts           # Rutas de la aplicación
│   └── app.ts                  # Componente raíz
│
├── environment/                # Variables de entorno
└── assets/                    # Recursos estáticos
```

## 🔐 Sistema de Autenticación

La aplicación incluye un sistema completo de autenticación que incluye:

- **Login y Registro** con validaciones reactivas
- **JWT Tokens** (access + refresh token)
- **Guards de autenticación** para proteger rutas
- **Roles de usuario**: Admin, Veterinario, Cuidador, Visitante
- **Auto-refresh** de tokens
- **Persistencia SSR-safe** en localStorage
- **Profile button** con menú desplegable

### Roles disponibles:
- `Administrador` - Acceso completo
- `Veterinario` - Gestión de animales y salud
- `Cuidador` - Cuidado diario de animales
- `Visitante` - Acceso básico

## 🎨 Componentes Personalizados

### Componentes Reutilizables:
- **`zoo-form-field`** - Campo de formulario con validaciones
- **`zoo-loader`** - Indicador de carga configurable
- **`zoo-user-avatar`** - Avatar de usuario con fallback
- **`zoo-profile-button`** - Botón de perfil con menú Material
- **`zoo-user-info`** - Información de usuario

### Características modernas:
- **Signals** para estado reactivo
- **Computed signals** para valores derivados
- **Standalone components** (sin NgModules)
- **Control flow nativo** (`@if`, `@for`, `@switch`)
- **NgOptimizedImage** para optimización automática

## 🔧 Gestión de Dependencias

### ⚠️ IMPORTANTE: Usa SOLO Bun

```bash
# ✅ CORRECTO - Agregar dependencia
bun add nombre-paquete

# ✅ CORRECTO - Agregar dependencia de desarrollo
bun add -d nombre-paquete

# ✅ CORRECTO - Actualizar dependencias
bun update

# ❌ INCORRECTO - NO usar npm
npm install  # NO HACER ESTO
```

### Dependencias principales:
- `@angular/core` ^20.0.0
- `@angular/material` 20.2.5
- `@ngrx/signals` ^20.0.1
- `primeng` ^20.2.0 (componentes adicionales)
- `rxjs` ~7.8.0

## 🌐 Backend API

La aplicación se conecta a un backend FastAPI en:
- **Desarrollo:** `http://localhost:8000/api/v1`
- **Producción:** Se configura en `environment.production.ts`

### Endpoints principales:
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario
- `POST /auth/logout` - Cerrar sesión
- `GET /auth/me` - Obtener perfil del usuario
- `POST /auth/refresh` - Renovar token

## 🛡️ Características de Seguridad

- **HTTP Interceptors** para manejo automático de tokens
- **Guards de autenticación** para protección de rutas
- **Renovación automática** de tokens expirados
- **Manejo de errores** 401/403 con redirección
- **Validación de roles** en el frontend

## 📱 Características Modernas

### Angular 20 Features:
- **Zoneless Change Detection** para mejor performance
- **SSR con Event Replay** para hidratación optimizada
- **View Transitions API** para transiciones suaves
- **Standalone Components** en toda la aplicación
- **Signal-based State Management** con NgRx Signals

### Performance:
- **Lazy loading** de rutas
- **Tree shaking** automático
- **Bundle optimization** con Angular Build
- **Image optimization** con NgOptimizedImage

## 🔄 Workflow de Desarrollo

1. **Hacer cambios** en el código
2. **Verificar tipos** con TypeScript
3. **Probar localmente** con `bun start`
4. **Commit cambios** siguiendo convenciones
5. **Push al repositorio**

## 📊 Scripts Útiles

```bash
# Generar componente
ng generate component path/to/component

# Generar servicio
ng generate service path/to/service

# Generar guard
ng generate guard path/to/guard

# Analizar bundle
bun run build -- --stats-json
```

---

**Desarrollado con ❤️ usando Angular 20 y Bun**
