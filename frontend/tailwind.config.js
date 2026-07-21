/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        geist: ['"Geist"', '"Inter"', 'sans-serif'],
        display: ['"Geist"', '"Inter"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        dm: ['"DM Sans Variable"', '"DM Sans"', 'sans-serif'],
        caveat: ['Caveat', 'cursive'],
        patrick: ['Patrick Hand', 'cursive'],
        kalam: ['Kalam', 'cursive'],
        greatVibes: ['Great Vibes', 'cursive'],
        handwritten: ['"Caveat"', 'cursive'],
        cursiveJoint: ['"Dancing Script"', 'cursive'],
        signature: ['"Great Vibes"', 'cursive'],
        handwriting: ['Pacifico', 'cursive'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        /* BluBridge editorial palette */
        'bb-bg':          '#f1f2fa',
        'bb-bg-elevated':'#ffffff',
        'bb-bg-subtle':  '#e8eaf3',
        'bb-bg-panel':   '#eceefa',
        'bb-ink':        '#0a1230',
        'bb-ink-2':      '#3f4966',
        'bb-ink-3':      '#7c86a2',
        'bb-line':       '#d4d8e8',
        'bb-line-strong':'#b8bfd6',
        'bb-accent':     '#2b4c8c',
        'bb-accent-soft':'#dfe6f5',
        'bb-signal':     '#4a7bd6',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } }
      },
      animation: {
        'accordion-down': 'accordion-down 0.3s ease-out',
        'accordion-up':   'accordion-up 0.3s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
