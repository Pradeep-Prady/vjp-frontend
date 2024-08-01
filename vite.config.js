import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // Proxy API requests to the backend server
//       '/api': {
//         target: 'http://www.api.vjpenterprises.in:7000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '/api/v1')
//       }
//     }
//   }
// });
