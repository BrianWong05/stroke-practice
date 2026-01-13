# 練筆順 (Stroke Order Practice) ✍️

![主界面](./screenshots/home.png)

## 簡介 🌟

**「練筆順」** 是一款專為觸控屏幕（如 iPad 及平板電腦）設計的網頁版教育工具。本應用程式提供一個簡潔、無干擾的環境，讓小朋友透過練習數字、英文及中文字，掌握書寫的基礎。

開發本專案的初衷是因為市面上現有的工具往往充滿廣告、必須連線使用，或者未能完全支援香港繁體中文標準。因此，我們致力於打造一個 **離線優先**、**極簡設計** 且 **完全符合香港教育標準** 的工具。

---

## 主要功能 🚀

*   **✍️ 多模式練習：** 全面支援數字 (0-9)、英文字母 (A-Z, a-z) 及常用中文字。
*   **🧠 互動書寫引擎：**
    *   採用 `hanzi-writer` 技術提供專業的中文字筆順驗證及測驗模式。
    *   針對英文及數字開發了專用的追蹤路徑引擎，優化觸控體驗。
*   **💡 視覺引導：** 提供虛線模板及數字筆順提示，並會隨練習進度自動隱藏，引導小朋友獨立書寫。
*   **📴 離線優先：** 作為 Progressive Web App (PWA) 開發，安裝後所有文字數據均儲存於本地，無需數據流量即可 100% 離線使用，非常適合在外出或無網絡環境下練習。
*   **🔍 自訂字庫：** 除了預設字庫外，使用者還可以透過搜尋功能練習 *任何* 中文字，靈活配合學校功課。
*   **🇭🇰 香港標準：** 介面及字形嚴格遵循香港繁體中文標準。

---

## 技術棧 🛠️

*   **前端:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **樣式:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **路由:** [React Router v7](https://reactrouter.com/)
*   **動畫與筆順:** [Hanzi Writer](https://hanziwriter.org/)
*   **流動裝置支援:** [Capacitor](https://capacitorjs.com/) (用於生成 Android APK)
*   **PWA:** 使用 `vite-plugin-pwa` 進行 Service Worker 管理及快取。

---

## 安裝與設定 ⚙️

### 開發環境

1.  **複製專案倉庫：**
    ```bash
    git clone <repository-url>
    cd stroke-practice
    ```

2.  **安裝依賴插件：**
    ```bash
    npm install
    ```

3.  **啟動本地開發服務：**
    ```bash
    npm run dev
    ```

### 📦 準備離線數據

為了確保應用程式在無網絡環境下亦能正常運作，你需要先行擷取本地文字數據：

```bash
npm run download:hanzi
```
此腳本會將所需的筆順 JSON 檔案下載至 `public/` 目錄下供本地讀取。

### 🤖 生成 Android APK

本專案使用 Capacitor 將網頁應用轉化為 Android 程式：

1.  **建構網頁版本：**
    ```bash
    npm run build:android
    ```
2.  **同步至 Android 專案：**
    ```bash
    npx cap sync android
    ```
3.  **在 Android Studio 中開啟：**
    ```bash
    npx cap open android
    ```
    隨後，你可以直接在 Android Studio 中建構及導出正式的 APK 檔案。

---

## 部署 🌐

本應用程式已預先設定好，可輕鬆部署至 GitHub Pages：

```bash
npm run deploy
```

---

## 授權條款 📄

[MIT](LICENSE)
