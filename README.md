# 🎨 MeraFirstApp — Background Changer (React Native & Expo)

A sleek, offline-first mobile application built with **React Native** and **Expo** that allows users to dynamically generate random hexadecimal background colors, inspect live hex codes, and switch between curated preset themes with instant visual feedback.

This repository also serves as a complete reference guide for running an **offline-first USB Android development & screen-mirroring workflow** on **Ubuntu 24.04** using a **Vivo T5 5G (Android 16)**.

---

## ✨ Features

* **Dynamic Hex Color Generator:** Generates random 6-digit hexadecimal colors (`#RRGGBB`) with a single tap.
* **Live Hex Code Display:** Displays the active background color code inside an elevated, high-contrast card.
* **Curated Preset Swatches:** Quick-select color buttons for instant switching between Red, Emerald Green, Royal Blue, Amber, and Clean Light themes.
* **Adaptive Status Bar:** Automatically adjusts the device status bar content (`light-content` vs. `dark-content`) based on background brightness.
* **100% Offline Capable:** Runs directly over a local USB tunnel without requiring Wi-Fi or mobile data.

---

## 🛠️ Tech Stack & Hardware Environment

* **Framework:** React Native with Expo Router (`Expo SDK 58`)
* **Language:** TypeScript / TSX
* **Host OS:** Ubuntu 24.04 LTS (HP EliteBook 840 G7)
* **Target Device:** Vivo T5 5G (Android 16) via USB Debugging
* **Tooling:** `adb` (Android Debug Bridge), `scrcpy` (Snap), OpenJDK 21

---

## 📂 Project Structure

```text
MeraFirstApp/
├── src/
│   └── app/
│       ├── _layout.tsx       # Root navigation & stack layout configuration
│       └── index.tsx         # Main Background Changer UI & logic
├── assets/                   # App icons, splash screens, and static images
├── app.json                  # Expo configuration (app name, slug, icons)
├── package.json              # Project dependencies and npm scripts
└── README.md                 # Project documentation & CLI reference
```

---

## ⚡ Quick Start (Daily Development Workflow)

### 1. One-Command Startup (`startapp` Alias)
To launch **screen mirroring**, establish the **USB tunnel**, and start the **Expo Metro bundler** simultaneously, add this alias once to your `~/.bashrc`:

```bash
echo 'alias startapp="scrcpy --always-on-top & adb reverse tcp:8081 tcp:8081 && cd ~/React\ Native\ /MeraFirstApp && npx expo start --localhost"' >> ~/.bashrc && source ~/.bashrc
```

**Daily Usage:**
1. Connect your Vivo phone via USB, unlock the screen, and set the USB mode to **File Transfer**.
2. Open your terminal and run:
   ```bash
   startapp
   ```
3. Once the QR code appears in the terminal, press **`a`** to open the app on your phone (and mirrored laptop window).

---

### 2. Manual Step-by-Step Commands

If you prefer running services in separate terminals:

* **Terminal 1 — Mirror Phone Screen to Laptop (`scrcpy`):**
  ```bash
  scrcpy --always-on-top
  ```
  *(Optional: Add `-S` to turn off the physical phone screen while mirroring to save battery: `scrcpy --always-on-top -S`)*

* **Terminal 2 — Verify Device, Create USB Tunnel & Start Server:**
  ```bash
  adb devices
  adb reverse tcp:8081 tcp:8081
  cd ~/React\ Native\ /MeraFirstApp
  npx expo start --localhost
  ```

* **Running Strictly Offline (Zero Internet):**
  ```bash
  adb reverse tcp:8081 tcp:8081
  npx expo start --localhost --offline
  ```

---

## ⌨️ Metro Bundler Interactive Shortcuts

While `npx expo start` is active in your terminal, use these single-key shortcuts:

| Shortcut | Description |
| :--- | :--- |
| **`a`** | Launch or focus the app on your connected Android device |
| **`r`** | Manually reload the JavaScript bundle |
| **`m`** | Toggle the in-app Developer Menu on the phone |
| **`j`** | Open the Chrome / Hermes JavaScript debugger |
| **`Ctrl + S`** | *(In VS Code)* Save file and trigger instant **Fast Refresh** |
| **`Ctrl + C`** | Stop the running Metro server or `scrcpy` instance |

---

## 🧰 Project Management & Scaffolding Commands

* **Reset Starter Template (Clean Slate):**
  Moves default boilerplate files into `app-example/` and creates a clean `app/` directory:
  ```bash
  npm run reset-project
  ```

* **Create a New Expo Project:**
  ```bash
  cd ~/React\ Native\ 
  npx create-expo-app@latest ProjectName
  cd ProjectName
  ```

* **Install Expo-Compatible Packages (Requires Internet):**
  ```bash
  npx expo install <package-name>
  ```

---

## 🔧 Troubleshooting Reference

| Issue | Resolution |
| :--- | :--- |
| **`Something went wrong` blue screen in Expo Go** | The USB tunnel reset after cable disconnection. Run `adb reverse tcp:8081 tcp:8081`, tap **Home** in Expo Go, and connect to `exp://localhost:8081`. |
| **`adb devices` shows empty or `unauthorized`** | Unlock your phone, switch USB connection mode from *Charging* to *File Transfer*, and accept the RSA debugging prompt. |
| **Mouse clicks not working inside `scrcpy` window** | On your Vivo phone, go to **Settings > System > Developer Options** and enable **USB debugging (Security settings)**. |
| **`adb` command not found in a new terminal** | Reload your environment variables using `source ~/.bashrc`. |




Phone ki screen ko laptop par dikhane ke liye bas yeh command chalani hai:
Bash
scrcpy --always-on-top
Isko chalane ka tarika:

Phone ko USB cable se laptop mein lagayein (screen unlock rakhein aur USB mode File Transfer par ho).
Terminal kholkar scrcpy --always-on-top type karein aur Enter dabayein.

2 second ke andar aapke laptop ki screen par phone ki live window khul jayegi (aap laptop ke mouse se us par click/scroll bhi kar sakti hain).
Extra Useful Options:
Phone ki screen band rakhne ke liye (sirf laptop par dikhe): scrcpy --always-on-top -S
Band karne ke liye: Khuli hui phone window ko close (X) kar dein ya terminal mein Ctrl + C dabayein.# Background-Changer-React-Native-
