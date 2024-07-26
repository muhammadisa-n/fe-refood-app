// vite.config.js
import { defineConfig } from "file:///D:/Projects/Tugas-Akhir/Frontend/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Projects/Tugas-Akhir/Frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { fileURLToPath } from "node:url";
var __vite_injected_original_import_meta_url = "file:///D:/Projects/Tugas-Akhir/Frontend/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    host: true
  },
  resolve: {
    alias: [
      {
        find: "@src",
        replacement: fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      },
      {
        find: "@assets",
        replacement: fileURLToPath(
          new URL("./src/assets", __vite_injected_original_import_meta_url)
        )
      },
      {
        find: "@components",
        replacement: fileURLToPath(
          new URL("./src/components", __vite_injected_original_import_meta_url)
        )
      },
      {
        find: "@context",
        replacement: fileURLToPath(
          new URL("./src/context", __vite_injected_original_import_meta_url)
        )
      },
      {
        find: "@pages",
        replacement: fileURLToPath(
          new URL("./src/pages", __vite_injected_original_import_meta_url)
        )
      },
      {
        find: "@layouts",
        replacement: fileURLToPath(
          new URL("./src/layouts", __vite_injected_original_import_meta_url)
        )
      },
      {
        find: "@utils",
        replacement: fileURLToPath(
          new URL("./src/utils", __vite_injected_original_import_meta_url)
        )
      }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxUdWdhcy1Ba2hpclxcXFxGcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcUHJvamVjdHNcXFxcVHVnYXMtQWtoaXJcXFxcRnJvbnRlbmRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1Byb2plY3RzL1R1Z2FzLUFraGlyL0Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgICBob3N0OiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgICBhbGlhczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmaW5kOiAnQHNyYycsXHJcbiAgICAgICAgICAgICAgICByZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmaW5kOiAnQGFzc2V0cycsXHJcbiAgICAgICAgICAgICAgICByZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChcclxuICAgICAgICAgICAgICAgICAgICBuZXcgVVJMKCcuL3NyYy9hc3NldHMnLCBpbXBvcnQubWV0YS51cmwpXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmaW5kOiAnQGNvbXBvbmVudHMnLFxyXG4gICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgoXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFVSTCgnLi9zcmMvY29tcG9uZW50cycsIGltcG9ydC5tZXRhLnVybClcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZpbmQ6ICdAY29udGV4dCcsXHJcbiAgICAgICAgICAgICAgICByZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChcclxuICAgICAgICAgICAgICAgICAgICBuZXcgVVJMKCcuL3NyYy9jb250ZXh0JywgaW1wb3J0Lm1ldGEudXJsKVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZmluZDogJ0BwYWdlcycsXHJcbiAgICAgICAgICAgICAgICByZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChcclxuICAgICAgICAgICAgICAgICAgICBuZXcgVVJMKCcuL3NyYy9wYWdlcycsIGltcG9ydC5tZXRhLnVybClcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZpbmQ6ICdAbGF5b3V0cycsXHJcbiAgICAgICAgICAgICAgICByZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChcclxuICAgICAgICAgICAgICAgICAgICBuZXcgVVJMKCcuL3NyYy9sYXlvdXRzJywgaW1wb3J0Lm1ldGEudXJsKVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZmluZDogJ0B1dGlscycsXHJcbiAgICAgICAgICAgICAgICByZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChcclxuICAgICAgICAgICAgICAgICAgICBuZXcgVVJMKCcuL3NyYy91dGlscycsIGltcG9ydC5tZXRhLnVybClcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgIH0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFIsU0FBUyxvQkFBb0I7QUFDdlQsT0FBTyxXQUFXO0FBQ2xCLFNBQVMscUJBQXFCO0FBRmlKLElBQU0sMkNBQTJDO0FBSWhPLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixRQUFRO0FBQUEsSUFDSixNQUFNO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0g7QUFBQSxRQUNJLE1BQU07QUFBQSxRQUNOLGFBQWEsY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsTUFDaEU7QUFBQSxNQUNBO0FBQUEsUUFDSSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsVUFDVCxJQUFJLElBQUksZ0JBQWdCLHdDQUFlO0FBQUEsUUFDM0M7QUFBQSxNQUNKO0FBQUEsTUFDQTtBQUFBLFFBQ0ksTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLFVBQ1QsSUFBSSxJQUFJLG9CQUFvQix3Q0FBZTtBQUFBLFFBQy9DO0FBQUEsTUFDSjtBQUFBLE1BQ0E7QUFBQSxRQUNJLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxVQUNULElBQUksSUFBSSxpQkFBaUIsd0NBQWU7QUFBQSxRQUM1QztBQUFBLE1BQ0o7QUFBQSxNQUNBO0FBQUEsUUFDSSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsVUFDVCxJQUFJLElBQUksZUFBZSx3Q0FBZTtBQUFBLFFBQzFDO0FBQUEsTUFDSjtBQUFBLE1BQ0E7QUFBQSxRQUNJLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxVQUNULElBQUksSUFBSSxpQkFBaUIsd0NBQWU7QUFBQSxRQUM1QztBQUFBLE1BQ0o7QUFBQSxNQUNBO0FBQUEsUUFDSSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsVUFDVCxJQUFJLElBQUksZUFBZSx3Q0FBZTtBQUFBLFFBQzFDO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
