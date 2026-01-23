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
  			sans: ['"DM Sans Variable"', '"DM Sans"', 'sans-serif'],
			caveat: ['Caveat', 'cursive'],
			patrick: ['Patrick Hand', 'cursive'],
			kalam: ['Kalam', 'cursive'],
			greatVibes: ['Great Vibes', 'cursive'],
			caveat: ['Caveat', 'cursive'],
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
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			/* Premium Light Theme Colors */
  			'page-bg': '#F3F6E8',
  			'section-bg': '#EEF2DC',
  			'footer-bg': '#E7ECD2',
  			'heading': '#0B1F3B',
  			'body': '#243447',
  			'muted-text': '#5B6B7A',
  			'placeholder': '#7C8A96',
  			'theme-border': '#D6DEC3',
  			'divider': '#E2E8C0',
  			'link': '#0B3C5D',
  			'link-hover': '#328CC1',
  			'link-active': '#0A2540',
  			'btn-primary': '#0B1F3B',
  			'btn-primary-hover': '#162B4D',
  			'dropdown-hover': '#EEF2DC',
  			'dropdown-active': '#E2E8C0',
  			'icon-accent': '#328CC1'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.3s ease-out',
  			'accordion-up': 'accordion-up 0.3s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};