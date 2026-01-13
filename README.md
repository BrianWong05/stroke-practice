# Stroke Order Practice (練筆順) ✍️

![Home Screen](./screenshots/home.png)

## Introduction 🌟

**Stroke Order Practice (練筆順)** is a clean, distraction-free web-based educational tool designed specifically for touchscreens (iPads and tablets). It provides a focused environment for children to master the foundations of writing by practicing Numbers, English alphabets, and Chinese characters.

Recognizing that many existing solutions are cluttered with ads, require constant internet connectivity, or lack full support for Hong Kong Traditional Chinese standards, this app was built to be **offline-first**, **minimalist**, and **strictly localized** for the Hong Kong educational context.

---

## Key Features 🚀

*   **✍️ Multi-Mode Practice:** Comprehensive support for Numbers (0-9), English Alphabets (A-Z, a-z), and Chinese Characters.
*   **🧠 Interactive Writing Engine:**
    *   Powered by `hanzi-writer` for advanced Chinese stroke validation and quiz modes.
    *   Features a custom tracing engine specifically optimized for English letters and numbers.
*   **💡 Visual Guides:** Includes dotted templates and numbered stroke hints that intelligently auto-hide as the user demonstrates proficiency.
*   **📴 Offline First:** Built as a Progressive Web App (PWA). Once installed, all character data is bundled locally, allowing for 100% offline usage—perfect for travel or areas with limited connectivity.
*   **🔍 Custom Character Search:** Beyond the preset lists, users can search and practice *any* Chinese character, making it a versatile tool for school homework.
*   **🇭🇰 HK Standards:** The UI and character forms strictly adhere to Traditional Chinese (Hong Kong) standards.

---

## Tech Stack 🛠️

*   **Frontend:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Routing:** [React Router v7](https://reactrouter.com/)
*   **Animations/Strokes:** [Hanzi Writer](https://hanziwriter.org/)
*   **Mobile Support:** [Capacitor](https://capacitorjs.com/) (for Android APK generation)
*   **PWA:** `vite-plugin-pwa` for service worker management and caching.

---

## Installation & Setup ⚙️

### Development Environment

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd stroke-practice
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run locally:**
    ```bash
    npm run dev
    ```

### 📦 Offline Data Preparation

To ensure the app works fully offline without external API calls, you must fetch the local character data:

```bash
npm run download:hanzi
```
This script downloads the required stroke JSON files into the `public/` directory for local serving.

### 🤖 Building the Android APK

The project uses Capacitor to bridge the web app to Android:

1.  **Build the web project:**
    ```bash
    npm run build:android
    ```
2.  **Sync with Android project:**
    ```bash
    npx cap sync android
    ```
3.  **Open in Android Studio:**
    ```bash
    npx cap open android
    ```
    From here, you can use Android Studio to build and sign your APK.

---

## Deployment 🌐

The app is configured for easy deployment to GitHub Pages:

```bash
npm run deploy
```

---

## License 📄

[MIT](LICENSE)
