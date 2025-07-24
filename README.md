# ⚡ Energy Drink Landing Page

An interactive 3D landing page built with **React**, **TypeScript**, **GSAP**, and **React Three Fiber** — showcasing a high-energy product experience.

This project features:

- ✨ Smooth **text animations** powered by GSAP.
- 🥫 A detailed **3D model** of an energy drink can rendered using React Three Fiber.
- ⚡ A dynamic **thunderbolt shader effect** applied to the can on scroll interaction.

---
## 📹 Video Preview
https://github.com/user-attachments/assets/48837598-8d95-4ea1-a0da-3185e3231122 

## 🔧 Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/introduction)

---

## 🎬 Features

- **Scroll-triggered animations** using GSAP and ScrollTrigger.
- **3D Can Model** rendered with Three.js via React Three Fiber.
- **Custom Shader Effect**: a lightning bolt visual effect that activates as the user scrolls — integrated with GLSL and applied dynamically to the can surface.

---

## 📸 Credits

- **⚡ Thunderbolt Shader**  
  Created by [MarisaKirisame](https://www.shadertoy.com/view/tl2Xzd)  
  Shader source: [Shadertoy - Lightning](https://www.shadertoy.com/view/tl2Xzd)

- **🥫 Energy Drink 3D Model**  
  Provided by [palladiumenergydrink](https://sketchfab.com/palladiumenergydrink)  
  Model link: [Sketchfab](https://sketchfab.com/3d-models/palladium-energy-drink-6cfa04ecb6694c138bdcb5bf105202fc)

---



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
