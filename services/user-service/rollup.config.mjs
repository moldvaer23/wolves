import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/app.ts", // Входная точка вашего приложения
  output: {
    file: "dist/user-service.js", // Имя выходного файла
    format: "cjs", // Формат CommonJS для Node.js
    sourcemap: true,
  },
  plugins: [
    resolve(), // Позволяет Rollup находить node_modules
    commonjs(), // Преобразует CommonJS модули в ES6
    typescript(), // Обработка TypeScript
    terser(), // Минификация кода
  ],
  external: [
    // Зависимости, которые не нужно включать в сборку
    "bcryptjs",
    "dotenv",
    "express",
    "jsonwebtoken",
    "pg",
  ],
};
