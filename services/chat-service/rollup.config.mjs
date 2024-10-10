import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import json from "rollup-plugin-json";

export default {
  input: "src/app.ts", // Входная точка вашего приложения
  output: {
    file: "dist/chat-service.js", // Имя выходного файла
    format: "cjs", // Формат CommonJS для Node.js
    sourcemap: true, // Включение карты кода для удобства отладки
  },
  plugins: [
    resolve({
      preferBuiltins: true, // Использовать встроенные модули Node.js
    }),
    commonjs(), // Преобразует CommonJS модули в ES6
    typescript(), // Обработка TypeScript
    terser(), // Минификация кода
    json(), // Позволяет читать файлы json
  ],
  external: [
    // Зависимости, которые не нужно включать в сборку
    "cors",
    "dotenv",
    "express",
    "jsonwebtoken",
    "pg",
    "ws",
    "socket.io",
    "bufferutil",
    "utf-8-validate",
    "http",
    "fs",
    "zlib",
    "stream",
    "path",
    "events",
    "url",
    "crypto",
    "net",
    "tls",
    "util",
    "buffer",
    "os",
    "tty",
    "querystring",
    "timers",
    "https",
    "supports-color",
  ],
};
