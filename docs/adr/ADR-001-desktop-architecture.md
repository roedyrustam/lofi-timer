# ADR-001: Gunakan Tauri v2 dan React untuk Aplikasi Desktop

**Status**: Accepted
**Date**: 2026-08-05
**Deciders**: AI Agent & User

## Context
Kami membutuhkan cara terbaik untuk membuat aplikasi desktop lokal berukuran kecil untuk fitur *timer fokus* dan *audio player* tanpa membebani sistem operasi (OS) dengan resource yang besar (RAM dan penyimpanan). 

## Decision
Kami menggunakan **Tauri v2** dengan frontend **React (Vite)** dan **Tailwind CSS v4**.

## Rationale
- **Performa & Ukuran:** Tidak seperti Electron yang memaketkan seluruh runtime Chromium dan Node.js di setiap aplikasi, Tauri menggunakan *Webview* bawaan sistem operasi (seperti Edge WebView2 di Windows). Ini membuat ukuran *build* sangat kecil dan pemakaian memori jauh lebih hemat.
- **Kenyamanan Pengembangan:** Menggunakan ekosistem web modern (React & Vite) memungkinkan kami memanfaatkan pustaka web (Zustand, Tailwind, HTML5 Audio) yang sudah matang tanpa harus menulis UI di *native code*.

## Consequences
**Positive:**
- Aplikasi berjalan sangat ringan.
- Distribusi binari sangat kecil.
- Desain UI cepat dibuat dengan CSS.

**Negative:**
- Tergantung pada konsistensi Webview dari OS masing-masing pengguna (misalnya, perbedaan minor antara WebView2 Windows dan WebKit Mac).
- Menambahkan kompleksitas karena menggabungkan bahasa Rust dan ekosistem Node.js.
