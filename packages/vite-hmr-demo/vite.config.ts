import path from 'node:path'
import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { viewflyHmr } from '@viewfly/devtools/vite-plugin-viewfly-hmr'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const workspaceRoot = path.resolve(rootDir, '..')

export default defineConfig({
  plugins: [viewflyHmr(), tailwindcss()],
  resolve: {
    alias: {
      '@viewfly/core/jsx-runtime': path.join(workspaceRoot, 'core/src/jsx-runtime.ts'),
      '@viewfly/core/jsx-dev-runtime': path.join(workspaceRoot, 'core/src/jsx-runtime.ts'),
      '@viewfly/core': path.join(workspaceRoot, 'core/src/index.ts'),
      '@viewfly/platform-browser': path.join(workspaceRoot, 'platform-browser/src/index.ts'),
    },
  },
  server: {
    host: true,
    port: 8787,
  },
})
