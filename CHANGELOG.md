# Changelog
Semua perubahan penting pada proyek ini akan didokumentasikan dalam file ini.
Format berdasarkan [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- Proyek Tauri v2 + React + TypeScript + Vite.
- Konfigurasi Tailwind CSS v4 dengan tema kustom Retro Pixel Art.
- Komponen Antarmuka Pengguna: Header, Timer Display, Mode Selector, dan Kontrol.
- State Management menggunakan Zustand untuk mengatur timer (Fokus & Break).
- Integrasi Audio Lofi menggunakan HTML5 Audio Player.
- Ikon kustom menggunakan grafik vektor (SVG) retro pixel art.

### Fixed
- Memperbaiki error linker MinGW (`export ordinal too large`) di Windows dengan menghapus tipe crate `cdylib` dari `src-tauri/Cargo.toml`.
- Memperbaiki error TypeScript pada properti `volume` di tag `audio`.
