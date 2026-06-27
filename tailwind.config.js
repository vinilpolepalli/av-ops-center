/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#1C2030',
        border: '#2E3650',
        accent: '#3B82F6',
        online: '#22C55E',
        standby: '#EAB308',
        offline: '#EF4444',
        mgr: '#F59E0B',
        tech: '#3B82F6',
        primary: '#F1F5F9',
        secondary: '#94A3B8',
        json: '#0D1117',
      },
    },
  },
  plugins: [],
}
