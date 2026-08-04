# Lofi Focus Timer — Technical Blueprint

## Architecture Overview
Lofi Focus Timer adalah aplikasi desktop lokal *offline-first* yang dikembangkan menggunakan arsitektur Tauri. Tauri memanfaatkan Rust di sisi *backend* untuk manajemen OS dan Jendela (sangat ringan), dan React (berjalan di atas WebView OS) sebagai *frontend* aplikasi.

## Tech Stack
| Layer | Technology | Version |
|---|---|---|
| Desktop Core / OS | Tauri | v2.x |
| Backend | Rust | 2021 Edition |
| Frontend | React + Vite | 18.x / 19.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | v4.x |
| State Management | Zustand | 5.x |

## Entry Points
| Eksekusi | Tujuan |
|---|---|
| `npm run tauri dev` | Menjalankan aplikasi di mode development dengan Hot Module Replacement (HMR). |
| `npm run tauri build` | Mengkompilasi dan mem-build aplikasi menjadi installer/executable native Windows (`.exe` atau `.msi`). |

## Fitur Utama
- **Fokus & Break Timer**: Logika Pomodoro sederhana.
- **Background Lofi Audio**: Pemutar audio yang terikat dengan state timer.
- **Estetika Pixel Art**: Antarmuka minimalis, dengan font Google `Silkscreen` & `VT323`.

## Environment Variables Required
- *Tidak ada variabel lingkungan yang diperlukan untuk saat ini.* Murni berjalan secara lokal.
