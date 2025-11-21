---
applyTo: '**'
---
Tienes que recordar que siempre tenemos una paleta de colores definida para nuestros temas. Asegúrate de usar los colores correctos según el tema que estés utilizando. nunca hardcodees los colores, siempre mira la paleta, recuerda que tenemos un tema claro y uno oscuro, entonces no rompas con esos estilos
```ts
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const ZooPreset = definePreset(Aura, {
  primitive: {
    biceblue: {
      50: '#e6f2f9',
      100: '#cce5f3',
      200: '#99cce7',
      300: '#66b2db',
      400: '#3399cf',
      500: '#0e6ba8',
      600: '#0b5686',
      700: '#084165',
      800: '#052b43',
      900: '#031622',
      950: '#020f16'
    },
    argentinianblue: {
      50: '#ebf5fd',
      100: '#d7ebfb',
      200: '#afd7f7',
      300: '#87c3f3',
      400: '#5fafef',
      500: '#5da9e9',
      600: '#4a87ba',
      700: '#38658c',
      800: '#25445d',
      900: '#13222f',
      950: '#0a1117'
    },
    teagreen: {
      50: '#f6fcf6',
      100: '#edf9ee',
      200: '#dbf3dc',
      300: '#c5edc7',
      400: '#b3e7b5',
      500: '#a1e1a4',
      600: '#81b483',
      700: '#618762',
      800: '#415a42',
      900: '#202d21',
      950: '#101610'
    },
    darkgreen: {
      50: '#e6f2f2',
      100: '#cce5e5',
      200: '#99cccc',
      300: '#66b2b2',
      400: '#339999',
      500: '#007f7f',
      600: '#006666',
      700: '#004c4c',
      800: '#003333',
      900: '#002626',
      950: '#001313'
    },
    rosybrown: {
      50: '#f5f0ef',
      100: '#ebe1df',
      200: '#d7c3bf',
      300: '#c3a5a0',
      400: '#af8780',
      500: '#ba9790',
      600: '#957973',
      700: '#705b56',
      800: '#4a3c3a',
      900: '#251e1d',
      950: '#120f0e'
    }
  },
  semantic: {
    primary: {
      50: '{teagreen.50}',
      100: '{teagreen.100}',
      200: '{teagreen.200}',
      300: '{teagreen.300}',
      400: '{teagreen.400}',
      500: '{teagreen.500}',
      600: '{teagreen.600}',
      700: '{teagreen.700}',
      800: '{teagreen.800}',
      900: '{teagreen.900}',
      950: '{teagreen.950}'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{teagreen.600}',
          contrastColor: '#ffffff',
          hoverColor: '{teagreen.700}',
          activeColor: '{teagreen.800}'
        },
        highlight: {
          background: '{teagreen.50}',
          focusBackground: '{teagreen.100}',
          color: '{teagreen.800}',
          focusColor: '{teagreen.900}'
        },
        surface: {
          0: '#ffffff',
          50: '{teagreen.50}',
          100: '{teagreen.100}',
          200: '{teagreen.200}',
          300: '{teagreen.300}',
          400: '{teagreen.400}',
          500: '{teagreen.500}',
          600: '{teagreen.600}',
          700: '{teagreen.700}',
          800: '{teagreen.800}',
          900: '{teagreen.900}',
          950: '{teagreen.950}'
        }
      },
      dark: {
        primary: {
          color: '{teagreen.400}',
          contrastColor: '{darkgreen.950}',
          hoverColor: '{teagreen.300}',
          activeColor: '{teagreen.200}'
        },
        highlight: {
          background: 'rgba(197, 237, 199, 0.16)',
          focusBackground: 'rgba(197, 237, 199, 0.24)',
          color: 'rgba(255,255,255,0.87)',
          focusColor: 'rgba(255,255,255,0.87)'
        },
        surface: {
          0: '#ffffff',
          50: '{darkgreen.50}',
          100: '{darkgreen.100}',
          200: '{darkgreen.200}',
          300: '{darkgreen.300}',
          400: '{darkgreen.400}',
          500: '{darkgreen.500}',
          600: '{darkgreen.600}',
          700: '{darkgreen.700}',
          800: '{darkgreen.800}',
          900: '{darkgreen.900}',
          950: '{darkgreen.950}'
        }
      }
    }
  }
});

export default ZooPreset;
```

Ademas tienes que tener en cuenta que tenemos el modo claro y oscuro con sus propios temas, el app.config.ts es asi:

```ts
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './core/interceptors';
import { providePrimeNG } from 'primeng/config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MessageService } from 'primeng/api';
import ZooPreset from '../theme/zoo-preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
    providePrimeNG({
      theme: {
        preset: ZooPreset,
        options: {
          darkModeSelector: '.dark-mode',
          cssLayer: false
        },
      },
    }),
    provideAnimations(),
    provideCharts(withDefaultRegisterables()),
    MessageService,
  ],
};
```

Luego algo mas a tener en cuenta es el servicio de temas para cambiar entre modo claro y oscuro:

```ts
import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from "@angular/core";

export type Tema = "light" | "dark";

@Injectable({
  providedIn: "root",
})
export class Theme {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private currentTheme = signal<Tema>("light");
  THEME_KEY = "app_theme";
  isDarkMode = computed(() => this.currentTheme() === "dark");

  constructor() {
    this.setTheme(this.getThemeFromLocalStorage());
  }

  toggleTheme() {
    if (this.currentTheme() === "light") {
      this.setTheme("dark");
    } else {
      this.setTheme("light");
    }
  }

  setTheme(theme: Tema) {
    this.currentTheme.set(theme);
    if (theme === "dark") {
      this.document.documentElement.classList.add("dark-mode");
    } else {
      this.document.documentElement.classList.remove("dark-mode");
    }
    this.setThemeInLocalStorage(theme);
  }

  setThemeInLocalStorage(theme: Tema) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  getThemeFromLocalStorage(): Tema {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.THEME_KEY) as Tema;
      if (stored) {
        return stored;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  }
}
```

Ahora todos tus colores están disponibles como **tokens de diseño** que puedes usar en cualquier parte de tu aplicación. Te explico cómo:

## 🎨 Cómo usar tus colores

### 1. **En CSS/SCSS** (Recomendado)

Todos los colores están disponibles como variables CSS:

```scss
// Primitivos (colores base con escalas 50-950)
.mi-elemento {
  background: var(--p-teagreen-500);
  color: var(--p-biceblue-700);
  border: 1px solid var(--p-argentinianblue-400);
  
  &:hover {
    background: var(--p-teagreen-600);
  }
}

// Semánticos (colores que cambian según el tema claro/oscuro)
.boton-custom {
  background: var(--p-primary-color);
  color: var(--p-primary-contrast-color);
  
  &:hover {
    background: var(--p-primary-hover-color);
  }
}

// Superficies (fondos adaptativos)
.card {
  background: var(--p-surface-card);
  border: 1px solid var(--p-surface-border);
  color: var(--p-surface-700);
}
```

### 2. **En TypeScript** (para lógica dinámica)

```typescript
import { $dt } from '@primeuix/themes';

export class MiComponente {
  obtenerColorPrimario() {
    const color = $dt('teagreen.500').value; // '#a1e1a4'
    return color;
  }
  
  obtenerColorTematico() {
    const primary = $dt('primary.color').value;
    // En modo claro: '#618762' (teagreen.700)
    // En modo oscuro: '#b3e7b5' (teagreen.400)
    return primary;
  }
}
```

### 3. **Colores disponibles**

#### 🟢 **Verde (Primario)**
```scss
var(--p-teagreen-50)   // Muy claro
var(--p-teagreen-500)  // Base
var(--p-teagreen-950)  // Muy oscuro

var(--p-primary-color) // Verde adaptativo según tema
```

#### 🔵 **Azul Bice** (Acento 1)
```scss
var(--p-biceblue-50)
var(--p-biceblue-500)  // #0e6ba8
var(--p-biceblue-950)
```

#### 🔷 **Azul Argentino** (Acento 2)
```scss
var(--p-argentinianblue-50)
var(--p-argentinianblue-500) // #5da9e9
var(--p-argentinianblue-950)
```

#### 🟤 **Rosy Brown** (Neutral/Acento)
```scss
var(--p-rosybrown-50)
var(--p-rosybrown-500)  // #ba9790
var(--p-rosybrown-950)
```

#### 🌑 **Dark Green** (Oscuros)
```scss
var(--p-darkgreen-50)
var(--p-darkgreen-900)  // #002626
var(--p-darkgreen-950)
```

### 4. **Ejemplo práctico completo**

```scss
.hero {
  background: linear-gradient(
    135deg,
    var(--p-teagreen-600),
    var(--p-biceblue-500)
  );
  color: white;
  padding: 4rem;
}

.card-acento {
  background: var(--p-argentinianblue-50);
  border-left: 4px solid var(--p-argentinianblue-500);
  color: var(--p-argentinianblue-900);
}

.badge-custom {
  background: var(--p-rosybrown-100);
  color: var(--p-rosybrown-800);
  border-radius: 12px;
  padding: 0.5rem 1rem;
}

// Modo oscuro automático
.texto-adaptativo {
  color: var(--p-surface-900); // Negro en claro, blanco en oscuro
}
```

### 5. **Tokens semánticos importantes**

Estos se adaptan automáticamente al tema:

```scss
var(--p-primary-color)          // Color primario
var(--p-primary-contrast-color) // Color de contraste del primario
var(--p-surface-card)           // Fondo de tarjetas
var(--p-surface-border)         // Bordes
var(--p-surface-ground)         // Fondo general
var(--p-text-color)             // Color de texto
var(--p-text-muted-color)       // Texto secundario
```

## 💡 Tip Pro

Para explorar TODOS los tokens disponibles, abre DevTools y en la consola ejecuta:

```javascript
getComputedStyle(document.documentElement).cssText
```

Verás todas las variables `--p-*` generadas por tu preset. 🎨🦁
Simpre piensa en que esto debe ser lo mas eficiente posible, debe estar pensado para poner directo a produccion entonces la aplicacion de buenas practicas es obligatoria, debe ser rapida y ligera.
Evita usar ng-deep lo maximo posible siempre piensa en modularidad y encapsulacion de estilos. Cada componente debe ser pequeño y cumplir una sola funcion, evita componentes gigantescos que hagan de todo con su template .html con 500 lineas de codigo y el .ts con 300 lineas de codigo.

tampoco comentes cada linea de codigo evita poner tus comentarios, si es necesario ponlos esos los poquitos que deberian estar en funciones importantes y asi solo para resumir un gran bloque de codigo. Entonces quedamos en que sin comentarios en ningun lugar del codigo.
