import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";


const manifestForPlugIn: Partial<VitePWAOptions>= {
  manifest:{
    name:"Lash notes",
    short_name:"Lash",
    description:"Lash notes vite app",
    icons:[
      {
      src: '/icons/icon-144.png',
      sizes:'144x144',
      type:'image/png',
    },
    {
      src: '/icons/icon-192.png',
      sizes:'192x192',
      type:'image/png',
    },
    {
      src: '/icons/icon-256.png',
      sizes:'256x256',
      type:'image/png',
    },
    {
      src: '/icons/icon-384.png',
      sizes:'384x384',
      type:'image/png',
    },
    {
      src: '/icons/icon-512.png',
      sizes:'512x512',
      type:'image/png',
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
