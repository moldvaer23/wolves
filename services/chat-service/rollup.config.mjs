import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/app.ts", // Входная точка вашего приложения
  output: {
    file: "dist/chat-service.js", // Имя выходного файла
    format: "cjs", // Формат CommonJS для Node.js
  },
  plugins: [
    resolve(), // Позволяет Rollup находить node_modules
    commonjs(), // Преобразует CommonJS модули в ES6
    typescript(), // Обработка TypeScript
    terser(), // Минификация кода
  ],
  external: [
    // Зависимости, которые не нужно включать в сборку
    "express",
    "pg",
    "dotenv",
  ],
};
