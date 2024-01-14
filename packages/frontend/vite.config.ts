import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const isRunningOnLocalNetwork = process.env.VITE_ENV === 'local_network';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), isRunningOnLocalNetwork && basicSsl()],
  optimizeDeps: {
    include: ['@dnd/shared'],
  },
  build: {
    commonjsOptions: {
      include: [/@dnd\/shared/, /node_modules/],
    },
  },
});
