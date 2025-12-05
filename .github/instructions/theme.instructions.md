---
applyTo: '**'
---
Siempre utiliza la paleta de colores definida en nuestros temas. Nunca hardcodees colores, siempre usa los tokens de diseño del tema correspondiente.

Tenemos un tema claro y un tema oscuro que se gestionan automáticamente. Los tokens semánticos se adaptan según el tema activo.

## 🎨 Uso de colores

```ts

import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

const ZooPreset = definePreset(Aura, {
  primitive: {
    biceblue: {
      50: "#e6f2f9",
      100: "#cce5f3",
      200: "#99cce7",
      300: "#66b2db",
      400: "#3399cf",
      500: "#0e6ba8",
      600: "#0b5686",
      700: "#084165",
      800: "#052b43",
      900: "#031622",
      950: "#020f16",
    },
    argentinianblue: {
      50: "#ebf5fd",
      100: "#d7ebfb",
      200: "#afd7f7",
      300: "#87c3f3",
      400: "#5fafef",
      500: "#5da9e9",
      600: "#4a87ba",
      700: "#38658c",
      800: "#25445d",
      900: "#13222f",
      950: "#0a1117",
    },
    neutral: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b",
      950: "#09090b",
    },
    teagreen: {
      50: "#f6fcf6",
      100: "#edf9ee",
      200: "#dbf3dc",
      300: "#c5edc7",
      400: "#b3e7b5",
      500: "#a1e1a4",
      600: "#81b483",
      700: "#618762",
      800: "#415a42",
      900: "#202d21",
      950: "#101610",
    },
    darkgreen: {
      50: "#e6f2f2",
      100: "#cce5e5",
      200: "#99cccc",
      300: "#66b2b2",
      400: "#339999",
      500: "#007f7f",
      600: "#006666",
      700: "#004c4c",
      800: "#003333",
      900: "#002626",
      950: "#001313",
    },
    rosybrown: {
      50: "#f5f0ef",
      100: "#ebe1df",
      200: "#d7c3bf",
      300: "#c3a5a0",
      400: "#af8780",
      500: "#ba9790",
      600: "#957973",
      700: "#705b56",
      800: "#4a3c3a",
      900: "#251e1d",
      950: "#120f0e",
    },
  },
  semantic: {
    primary: {
      50: "{teagreen.50}",
      100: "{teagreen.100}",
      200: "{teagreen.200}",
      300: "{teagreen.300}",
      400: "{teagreen.400}",
      500: "{teagreen.500}",
      600: "{teagreen.600}",
      700: "{teagreen.700}",
      800: "{teagreen.800}",
      900: "{teagreen.900}",
      950: "{teagreen.950}",
    },
    colorScheme: {
      light: {
        primary: {
          color: "{darkgreen.600}",
          contrastColor: "#ffffff",
          hoverColor: "{darkgreen.700}",
          activeColor: "{darkgreen.800}",
        },
        highlight: {
          background: "{teagreen.50}",
          focusBackground: "{teagreen.100}",
          color: "{darkgreen.800}",
          focusColor: "{darkgreen.900}",
        },
        surface: {
          0: "#ffffff",
          50: "{neutral.50}",
          100: "{neutral.100}",
          200: "{neutral.200}",
          300: "{neutral.300}",
          400: "{neutral.400}",
          500: "{neutral.500}",
          600: "{neutral.600}",
          700: "{neutral.700}",
          800: "{neutral.800}",
          900: "{neutral.900}",
          950: "{neutral.950}",
        },
      },
      dark: {
        primary: {
          color: "{teagreen.400}",
          contrastColor: "{darkgreen.950}",
          hoverColor: "{teagreen.300}",
          activeColor: "{teagreen.200}",
        },
        highlight: {
          background: "rgba(197, 237, 199, 0.16)",
          focusBackground: "rgba(197, 237, 199, 0.24)",
          color: "rgba(255,255,255,0.87)",
          focusColor: "rgba(255,255,255,0.87)",
        },
        surface: {
          0: "#ffffff",
          50: "{darkgreen.50}",
          100: "{darkgreen.100}",
          200: "{darkgreen.200}",
          300: "{darkgreen.300}",
          400: "{darkgreen.400}",
          500: "{darkgreen.500}",
          600: "{darkgreen.600}",
          700: "{darkgreen.700}",
          800: "{darkgreen.800}",
          900: "{darkgreen.900}",
          950: "{darkgreen.950}",
        },
      },
    },
  },
});

export default ZooPreset;
```
### 1. **En CSS/SCSS**

```scss
.elemento {
  background: var(--p-primary-500);
  color: var(--p-primary-contrast-color);
  border-color: var(--p-surface-200);
  
  &:hover {
    background: var(--p-primary-hover-color);
  }
}

.fondo {
  background: var(--p-surface-ground);
  color: var(--p-text-color);
}

.acento {
  background: var(--p-teagreen-100);
  color: var(--p-teagreen-800);
}
```

### 2. **Tokens disponibles**

#### **Primarios (verde té)**
```scss
var(--p-primary-50)    // #f6fcf6
var(--p-primary-500)   // #a1e1a4
var(--p-primary-950)   // #101610
var(--p-primary-color) // Adaptativo según tema
```

#### **Azules (acentos)**
```scss
var(--p-biceblue-500)         // #0e6ba8
var(--p-argentinianblue-500)  // #5da9e9
```

#### **Neutrales (superficies)**
```scss
var(--p-surface-0)   // #ffffff
var(--p-surface-50)  // #fafafa (claro) / #e6f2f2 (oscuro)
var(--p-surface-900) // #18181b (claro) / #002626 (oscuro)
var(--p-surface-950) // #09090b (claro) / #001313 (oscuro)
```

#### **Verde oscuro (modo oscuro)**
```scss
var(--p-darkgreen-500) // #007f7f
var(--p-darkgreen-950) // #001313
```

#### **Marrón rosado (acento)**
```scss
var(--p-rosybrown-500) // #ba9790
```

### 3. **Tokens semánticos automáticos**

Estos cambian según el tema activo:

```scss
var(--p-primary-color)           // Color primario
var(--p-primary-contrast-color)  // Contraste del primario
var(--p-primary-hover-color)     // Hover del primario
var(--p-primary-active-color)    // Active del primario
var(--p-surface-ground)          // Fondo general
var(--p-surface-card)            // Fondo de tarjetas
var(--p-surface-border)          // Color de bordes
var(--p-text-color)              // Color de texto principal
var(--p-text-muted-color)        // Texto secundario
```

### 4. **Ejemplos prácticos**

```scss
.boton-primario {
  background: var(--p-primary-color);
  color: var(--p-primary-contrast-color);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  
  &:hover {
    background: var(--p-primary-hover-color);
  }
  
  &:active {
    background: var(--p-primary-active-color);
  }
}

.tarjeta {
  background: var(--p-surface-card);
  border: 1px solid var(--p-surface-border);
  border-radius: 8px;
  padding: 1.5rem;
  color: var(--p-text-color);
}

.hero {
  background: linear-gradient(
    135deg,
    var(--p-primary-600),
    var(--p-biceblue-500)
  );
  color: white;
}
```

### 5. **Modo oscuro automático**

Los tokens semánticos se ajustan automáticamente:

```scss
.texto-adaptativo {
  color: var(--p-text-color); // Negro en claro, blanco en oscuro
}

.fondo-adaptativo {
  background: var(--p-surface-ground); // #fafafa en claro, #001313 en oscuro
}
```


El servicio `Theme` gestiona el cambio entre modos claro/oscuro automáticamente.


Verás todas las variables `--p-*` generadas por tu preset. 🎨🦁
Simpre piensa en que esto debe ser lo mas eficiente posible, debe estar pensado para poner directo a produccion entonces la aplicacion de buenas practicas es obligatoria, debe ser rapida y ligera.
Evita usar ng-deep lo maximo posible siempre piensa en modularidad y encapsulacion de estilos. Cada componente debe ser pequeño y cumplir una sola funcion, evita componentes gigantescos que hagan de todo con su template .html con 500 lineas de codigo y el .ts con 300 lineas de codigo.

tampoco comentes cada linea de codigo evita poner tus comentarios, si es necesario ponlos esos los poquitos que deberian estar en funciones importantes y asi solo para resumir un gran bloque de codigo. Entonces quedamos en que sin comentarios en ningun lugar del codigo.
