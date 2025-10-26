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
