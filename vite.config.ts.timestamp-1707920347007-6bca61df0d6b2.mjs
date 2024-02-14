// vite.config.ts
import { defineConfig } from "file:///C:/Users/taras/Documents/Code/my_projects/lash_notes_vite/client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/taras/Documents/Code/my_projects/lash_notes_vite/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/taras/Documents/Code/my_projects/lash_notes_vite/client/node_modules/vite-plugin-pwa/dist/index.js";
var manifestForPlugIn = {
  manifest: {
    name: "Lash notes",
    short_name: "Lash",
    description: "Lash notes vite app",
    icons: [
      {
        src: "/new.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon"
      }
    ],
    theme_color: "#171717",
    background_color: "#7557B0",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait"
  }
};
var vite_config_default = defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0YXJhc1xcXFxEb2N1bWVudHNcXFxcQ29kZVxcXFxteV9wcm9qZWN0c1xcXFxsYXNoX25vdGVzX3ZpdGVcXFxcY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0YXJhc1xcXFxEb2N1bWVudHNcXFxcQ29kZVxcXFxteV9wcm9qZWN0c1xcXFxsYXNoX25vdGVzX3ZpdGVcXFxcY2xpZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy90YXJhcy9Eb2N1bWVudHMvQ29kZS9teV9wcm9qZWN0cy9sYXNoX25vdGVzX3ZpdGUvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IFZpdGVQV0EsIFZpdGVQV0FPcHRpb25zIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xuXG5cbmNvbnN0IG1hbmlmZXN0Rm9yUGx1Z0luOiBQYXJ0aWFsPFZpdGVQV0FPcHRpb25zPj0ge1xuICBtYW5pZmVzdDp7XG4gICAgbmFtZTpcIkxhc2ggbm90ZXNcIixcbiAgICBzaG9ydF9uYW1lOlwiTGFzaFwiLFxuICAgIGRlc2NyaXB0aW9uOlwiTGFzaCBub3RlcyB2aXRlIGFwcFwiLFxuICAgIGljb25zOlt7XG4gICAgICBzcmM6ICcvbmV3LnBuZycsXG4gICAgICBzaXplczonMTkyeDE5MicsXG4gICAgICB0eXBlOidpbWFnZS9wbmcnLFxuICAgICAgcHVycG9zZTonZmF2aWNvbidcbiAgICB9XG4gIF0sXG4gIHRoZW1lX2NvbG9yOicjMTcxNzE3JyxcbiAgYmFja2dyb3VuZF9jb2xvcjonIzc1NTdCMCcsXG4gIGRpc3BsYXk6XCJzdGFuZGFsb25lXCIsXG4gIHNjb3BlOicvJyxcbiAgc3RhcnRfdXJsOlwiL1wiLFxuICBvcmllbnRhdGlvbjoncG9ydHJhaXQnXG4gIH1cbn1cblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBWaXRlUFdBKG1hbmlmZXN0Rm9yUGx1Z0luKV0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrWSxTQUFTLG9CQUFvQjtBQUMvWixPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUErQjtBQUd4QyxJQUFNLG9CQUE0QztBQUFBLEVBQ2hELFVBQVM7QUFBQSxJQUNQLE1BQUs7QUFBQSxJQUNMLFlBQVc7QUFBQSxJQUNYLGFBQVk7QUFBQSxJQUNaLE9BQU07QUFBQSxNQUFDO0FBQUEsUUFDTCxLQUFLO0FBQUEsUUFDTCxPQUFNO0FBQUEsUUFDTixNQUFLO0FBQUEsUUFDTCxTQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGFBQVk7QUFBQSxJQUNaLGtCQUFpQjtBQUFBLElBQ2pCLFNBQVE7QUFBQSxJQUNSLE9BQU07QUFBQSxJQUNOLFdBQVU7QUFBQSxJQUNWLGFBQVk7QUFBQSxFQUNaO0FBQ0Y7QUFHQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVEsaUJBQWlCLENBQUM7QUFDL0MsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
