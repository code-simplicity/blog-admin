import { createApp } from "/node_modules/.vite/deps/vue.js?v=d9d60f8c";
import App from "/src/App.vue";
import router from "/src/router/index.ts?t=1651322353321";
import "/src/assets/css/index.css?t=1651322353321";
import "/node_modules/.pnpm/registry.npmmirror.com+ant-design-vue@3.2.2_vue@3.2.33/node_modules/ant-design-vue/dist/antd.css";
import "/node_modules/.pnpm/registry.npmmirror.com+animate.css@4.1.1/node_modules/animate.css/animate.css";
import { setupStore } from "/src/store/index.ts";
const app = createApp(App);
app.use(router);
setupStore(app);
app.mount("#app");

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkg6L0F3ZWJLRi9teS1ibG9nL3Byb2llY3QvYmxvZy1hZG1pbi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQEF1dGhvcjogYnVnZHJcbiAqIEBEYXRlOiAyMDIyLTA0LTI4IDE3OjQ1OjA3XG4gKiBATGFzdEVkaXRvcnM6IGJ1Z2RyXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIyLTA0LTMwIDE0OjM2OjQyXG4gKiBARmlsZVBhdGg6IFxcYmxvZy1hZG1pblxcc3JjXFxtYWluLnRzXG4gKiBARGVzY3JpcHRpb246IOmFjee9rlxuICovXG5pbXBvcnQgeyBjcmVhdGVBcHAgfSBmcm9tICd2dWUnXG5pbXBvcnQgQXBwIGZyb20gJy4vQXBwLnZ1ZSdcbmltcG9ydCByb3V0ZXIgZnJvbSBcIi4vcm91dGVyL2luZGV4XCJcbi8vIOW8leWFpXRhaWx3aW5kY3Nz5qC35byPXG5pbXBvcnQgJy4vYXNzZXRzL2Nzcy9pbmRleC5jc3MnXG5pbXBvcnQgJ2FudC1kZXNpZ24tdnVlL2Rpc3QvYW50ZC5jc3MnXG4vLyDlvJXlhaVhbmltYXRlLmNzc+WKqOeUu1xuaW1wb3J0ICdhbmltYXRlLmNzcydcbmltcG9ydCB7IHNldHVwU3RvcmUgfSBmcm9tICcuL3N0b3JlL2luZGV4J1xuXG5cbmNvbnN0IGFwcCA9IGNyZWF0ZUFwcChBcHApXG5hcHAudXNlKHJvdXRlcilcbnNldHVwU3RvcmUoYXBwKVxuYXBwLm1vdW50KFwiI2FwcFwiKVxuIl0sIm1hcHBpbmdzIjoiQUFRQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUdBLE1BQU0sTUFBTSxVQUFVLEdBQUc7QUFDekIsSUFBSSxJQUFJLE1BQU07QUFDZCxXQUFXLEdBQUc7QUFDZCxJQUFJLE1BQU0sTUFBTTsiLCJuYW1lcyI6W119