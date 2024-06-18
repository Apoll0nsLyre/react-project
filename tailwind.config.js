/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./dist/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        // inside bottom
        'inner-bottom': 'inset 0 -30px 30px -10px red',
      },
      keyframes: {
        slideIn: {
          '0%': {opacity: '0', transform: 'translateX(-100%)'},
          '100%': {opacity: '1', transform: 'translateX(0)'},
        },
        slideOut: {
          '0%': {opacity: '1', transform: 'translateX(0)'},
          '100%': {opacity: '0', transform: 'translateX(-100%)'},
        },
      },  
      animation: {
        'slideIn' : 'slideIn 0.3s ease-in-out',
        'slideOut' : 'slideOut 0.3s ease-in-out',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        ring: 'hsl(var(--ring))',
      },
    },
  },
  plugins: [],
}
