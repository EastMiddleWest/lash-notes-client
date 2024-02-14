import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";


const manifestForPlugIn: Partial<VitePWAOptions>= {
  manifest:{
    name:"Lash notes",
    short_name:"Lash",
    description:"Lash notes vite app",
    icons:[{
      src: '/new.png',
      sizes:'192x192',
      type:'image/png',
      purpose:'favicon'
    }
  ],
  theme_color:'#171717',
  background_color:'#7557B0',
  display:"standalone",
  scope:'/',
  start_url:"/",
  orientation:'portrait'
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
})
