# 🦁 Zoo Connect Web - Sistema de Gestión de Zoológicos

Una aplicación web moderna para la **Gestión de Zoológicos** construida con **Angular 20** y optimizada con **Bun**. Su objetivo es **digitalizar y centralizar** la información operativa y clínica (salud, dieta, inventario) para el personal (Gerentes, Veterinarios, Cuidadores) y mejorar la toma de decisiones.

El proyecto **Zoo Connect Web** tiene como objetivo principal proporcionar **información consolidada** para optimizar los recursos, asegurar el bienestar animal y mejorar la eficiencia en la gestión del zoológico.

---

## 👥 Equipo y Proyecto

### Equipo: Tech Zoo Innovators

| Rol | Nombre | Responsabilidades |
| :--- | :--- | :--- |
| **Product Owner** | Delgadillo Calderon, Manuel F. | Representar las necesidades del cliente y priorizar y gestionar el Product Backlog. |
| **Scrum Master** | Jimenez Mendoza, Manuel F. | Facilitar el proceso Scrum, eliminar impedimentos y asegurar la adherencia a las normas. |
| **Desarrolladores** | Delgadillo, M. F., Jimenez, M. F., Velasco, J. J. R. | Diseño, desarrollo y entrega de incrementos funcionales. |
| **QAs** | Delgadillo, M. F., Jimenez, M. F., Velasco, J. J. R. | Validar la calidad, funcionalidad y seguridad de cada incremento del producto. |

### Normas y Acuerdos del Equipo

- **Comunicación:** Utilizamos **Slack** (formal) y **Discord** (síncrono/urgente) para mantenernos actualizados y comunicarnos eficazmente.
- **Reuniones:** Celebramos **Daily Scrums** (15 min) diariamente para sincronización. Las ceremonias de *Sprint* se calendarizan en **Trello**.
- **Resolución de Conflictos:** Los conflictos se abordan de manera constructiva, escalando la decisión al **Scrum Master (Jimenez)** para mediar una solución colaborativa.
- **Entrega de Trabajo:** Se espera que cada miembro entregue su trabajo dentro del plazo y de acuerdo con la **Definición de Hecho (DoD)**, incluyendo una revisión de código obligatoria y pruebas de QA.

### Herramientas de Desarrollo y Gestor de Base de Datos

- **Herramientas de Desarrollo:** VS Code, Bun, GitHub, Postman.
- **Gestor de Base de Datos:** PostgreSQL (Base de datos relacional robusta).

### Arquitectura del Sistema

El sistema utiliza una **Arquitectura Modular Desacoplada** (Frontend Angular 20 + Backend API) que permite una alta escalabilidad y un rendimiento óptimo. Se utiliza **PostgreSQL** para la gestión de la información crítica (clínica y operativa).

---

## 🚀 Tecnologías Principales

- **Angular 20** - Framework principal con las últimas características
- **Bun** - Runtime de JavaScript ultrarrápido y gestor de paquetes
- **TypeScript 5.8** - Tipado estático robusto
- **NgRx Signals** - Manejo de estado reactivo moderno
- **PostgreSQL** - Base de datos relacional para información crítica

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
```
La aplicación estará disponible en `http://localhost:4200/`

### Build de producción
```bash
bun run build
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
│   ├── core/                    # Funcionalidades centrales del sistema
│   │   ├── guards/              # Guards de autenticación y autorización
│   │   ├── interceptors/        # HTTP interceptors globales
│   │   ├── models/              # Tipos e interfaces globales
│   │   └── store/               # Estado global con NgRx Signals
│   │
│   ├── features/                # Módulos funcionales por dominio
│   │   ├── auth/                # Autenticación y autorización
│   │   ├── admin/               # Panel administrativo
│   │   │   ├── screens/         # Pantallas de administración
│   │   │   ├── components/      # Componentes específicos del admin
│   │   │   └── services/        # Servicios administrativos
│   │   ├── animales/            # Gestión de animales
│   │   ├── encuestas/           # Sistema de encuestas
│   │   ├── home/                # Página principal
│   │   ├── profile/             # Perfil de usuario
│   │   ├── settings/            # Configuraciones generales
│   │   ├── not-found/           # Página 404
│   │   └── ...                  # Más módulos próximamente
│   │                            #    (veterinaria, inventario, reportes, etc.)
│   │
│   ├── shared/                  # Recursos compartidos
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── header/          # Header con navegación
│   │   │   ├── footer/          # Footer de la aplicación
│   │   │   ├── forms/           # Componentes de formularios
│   │   │   ├── loader/          # Componente de carga
│   │   │   ├── user-avatar/     # Avatar de usuario
│   │   │   └── ...              # Más componentes UI
│   │   │
│   │   ├── layout/              # Layouts principales
│   │   ├── services/            # Servicios globales
│   │   ├── utils/               # Utilidades y helpers
│   │   └── ...                  # Pipes, validators, etc.
│   │
│   ├── app.config.ts           # Configuración principal
│   ├── app.routes.ts           # Definición de rutas
│   └── app.ts                  # Componente raíz
│
├── environment/                # Variables de entorno
├── assets/                    # Recursos estáticos
│   ├── images/                # Imágenes de la aplicación
│   ├── icons/                 # Iconos personalizados
│   ├── logos/                 # Logos y branding
│   └── ...                    # Más recursos
│
└── styles.scss               # Estilos globales principales
```

> **📋 Nota:** La aplicación está en desarrollo activo. Se agregarán más módulos funcionales como gestión veterinaria, control de inventarios, sistema de reportes avanzados, y otras características específicas para la administración integral de zoológicos.

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

## 🔧 Gestión de Dependencias

### ⚠️ IMPORTANTE: Usa SOLO Bun

```bash
bun add nombre-paquete

bun add -d nombre-paquete

bun update
```

### Dependencias principales:
- `@angular/core` ^20.0.0
- `@ngrx/signals` ^20.0.1
- `primeng` ^20.2.0 (componentes adicionales)
- `rxjs` ~7.8.0

## 🌐 Backend API

La aplicación se conecta a un backend FastAPI en:
- **Desarrollo:** `http://localhost:8000/api/v1`
- **Producción:** Se configura en `environment.production.ts`

**Desarrollado con ❤️ usando Angular 20 y Bun por el equipo Tech Zoo Innovators**
