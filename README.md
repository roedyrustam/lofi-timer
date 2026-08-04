# Lofi Focus Timer

Lofi Focus Timer is a minimalist, offline-first desktop application designed to help you stay productive and relaxed. Built with modern web technologies and the blazing-fast Tauri framework, it combines the popular Pomodoro technique with soothing lofi audio and charming pixel art aesthetics.

## Features

- **Focus & Break Timer**: Simple and effective Pomodoro logic to keep you on track.
- **Background Lofi Audio**: An integrated audio player that syncs with your timer states to keep you in the zone.
- **Pixel Art Aesthetics**: A clean, distraction-free interface featuring retro typography (`Silkscreen` & `VT323` fonts).
- **Lightweight & Fast**: Powered by Rust and Tauri, ensuring minimal resource usage.

## Tech Stack

- **Desktop Core**: [Tauri v2.x](https://tauri.app/)
- **Backend**: Rust
- **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Rust](https://www.rust-lang.org/tools/install)
- Relevant [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/) for your operating system.

### Installation & Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server with Hot Module Replacement (HMR):
   ```bash
   npm run tauri dev
   ```

### Building for Production

To compile and build the application into a native installer/executable for your operating system (e.g., `.exe` or `.msi` on Windows):

```bash
npm run tauri build
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
