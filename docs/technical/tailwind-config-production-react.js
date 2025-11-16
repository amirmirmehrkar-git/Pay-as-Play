/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      // Color Palette - Production (Enhanced)
      colors: {
        // Primary Gradient
        'brand-start': '#7C8CF8', // Purple-Blue
        'brand-end': '#2DE1C2',   // Cyan-Green
        
        // Background Colors
        'bg-light': '#FFFFFF',
        'bg-dark': '#0F172A',     // Slate 900
        'bg-secondary': '#F8F9FA',
        'bg-tertiary': '#F3F4F6',
        
        // Surface Colors
        'surface-light': '#F9FAFB',
        'surface-dark': '#1E293B', // Slate 800
        'surface-elevated': '#FFFFFF',
        
        // Text Colors
        'text-light': '#1A1F3A',
        'text-dark': '#F1F5F9',   // Slate 100
        'text-secondary': '#6B7280',
        'text-tertiary': '#9CA3AF',
        
        // Semantic Colors
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
        'info': '#3B82F6',
        
        // Border Colors
        'border-light': '#E5E7EB',
        'border-dark': '#334155',  // Slate 700
        'border-focus': '#7C8CF8',
      },
      
      // Typography
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'persian': ['IRANSansX', 'IRANSans', 'sans-serif'],
      },
      
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['32px', { lineHeight: '40px' }],
        '4xl': ['36px', { lineHeight: '44px' }],
        '5xl': ['48px', { lineHeight: '56px' }],
      },
      
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      
      // Spacing (Base: 4px)
      spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
      },
      
      // Border Radius
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px',
      },
      
      // Shadows (Elevation Levels)
      boxShadow: {
        'elev-1': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'elev-2': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elev-3': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elev-4': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        // Dark Mode Shadows
        'elev-1-dark': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'elev-2-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'elev-3-dark': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'elev-4-dark': '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
      },
      
      // Gradients
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7C8CF8 0%, #2DE1C2 100%)',
        'gradient-primary-inverse': 'linear-gradient(135deg, #2DE1C2 0%, #7C8CF8 100%)',
      },
      
      // Transitions
      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '300ms',
      },
      
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    // Custom Component Plugin
    function({ addComponents, theme }) {
      addComponents({
        // Primary Button
        '.btn-primary': {
          background: 'linear-gradient(135deg, #7C8CF8 0%, #2DE1C2 100%)',
          color: '#FFFFFF',
          padding: '12px 24px',
          borderRadius: '12px',
          fontWeight: '500',
          fontSize: '14px',
          boxShadow: theme('boxShadow.elev-2'),
          transition: 'all 200ms ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: theme('boxShadow.elev-3'),
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
        
        // Dark Mode Primary Button (Inverted Gradient)
        '[data-theme="dark"] .btn-primary': {
          background: 'linear-gradient(135deg, #2DE1C2 0%, #7C8CF8 100%)',
        },
        
        // Secondary Button
        '.btn-secondary': {
          background: 'transparent',
          border: '2px solid #7C8CF8',
          color: '#7C8CF8',
          padding: '12px 24px',
          borderRadius: '12px',
          fontWeight: '500',
          fontSize: '14px',
          transition: 'all 200ms ease-in-out',
          '&:hover': {
            background: 'rgba(124, 140, 248, 0.1)',
          },
        },
        
        // Dark Mode Secondary Button
        '[data-theme="dark"] .btn-secondary': {
          borderColor: '#2DE1C2',
          color: '#2DE1C2',
          '&:hover': {
            background: 'rgba(45, 225, 194, 0.1)',
          },
        },
        
        // Card
        '.card': {
          background: '#FFFFFF',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: theme('boxShadow.elev-1'),
          transition: 'all 200ms ease-in-out',
          '&:hover': {
            boxShadow: theme('boxShadow.elev-2'),
            transform: 'translateY(-2px)',
          },
        },
        
        // Dark Mode Card
        '[data-theme="dark"] .card': {
          background: '#1E293B',
          boxShadow: theme('boxShadow.elev-1-dark'),
          '&:hover': {
            boxShadow: theme('boxShadow.elev-2-dark'),
          },
        },
      });
    },
  ],
}

