// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react() , tailwindcss()],
// })



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import path from 'path'

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   base: "/events_planner/", // must match Router basename
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })








// -----------------------------------------------------------------
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
base: process.env.VITE_BASE_PATH || "/events_planner",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
// ------------------------------------------------



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import path from 'path'

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   base: "/", // always use "/" for Vercel & local
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })

