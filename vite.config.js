import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/checkout-form.ts'), // your main file
      name: 'CheckoutForm',
      fileName: 'checkout-form',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // Make sure lit isn't bundled (users will install it)
      external: ['lit'],
      output: {
        globals: {
          lit: 'lit'
        }
      }
    }
  }
});
