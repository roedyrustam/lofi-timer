# ADR-002: Penghapusan Crate-Type `cdylib` untuk MinGW Windows

**Status**: Accepted
**Date**: 2026-08-05
**Deciders**: AI Agent & User

## Context
Saat membangun (build) atau menjalankan aplikasi (`npm run tauri dev`) di mesin Windows yang menggunakan toolchain GNU/MinGW, proses kompilasi gagal di tahap akhir saat *linker* `ld.exe` bekerja. Pesan error yang muncul adalah `export ordinal too large: 94826`. Hal ini dikarenakan adanya batasan 65535 simbol (*symbol export limit*) pada linker MinGW saat mencoba membuat file `.dll`.

## Decision
Kami mengubah konfigurasi `crate-type` dalam file `src-tauri/Cargo.toml` dari default:
`crate-type = ["staticlib", "cdylib", "rlib"]` 
menjadi:
`crate-type = ["staticlib", "rlib"]`

## Rationale
Karena aplikasi ini adalah aplikasi desktop mandiri, kami tidak memerlukan *library dinamis berbasis C* (`.dll` dari `cdylib`) yang umumnya digunakan untuk integrasi ke bahasa lain atau platform *mobile* tertentu. Menghapus konfigurasi ini mem-bypass pembuatan file `.dll` yang besar, sehingga menuntaskan masalah limit ekspor simbol MinGW secara instan.

## Consequences
**Positive:**
- Masalah build/linker teratasi tanpa perlu beralih ke toolchain MSVC.
- Waktu build berpotensi sedikit lebih cepat karena *dynamic library* tidak dibuat.

**Negative:**
- Jika di masa depan kami ingin mem-porting aplikasi ini ke *mobile* via Tauri v2 dan membutuhkan C-ABI dynamic library, kami mungkin harus mengembalikan opsi `cdylib` ini atau mencari toolchain linker alternatif (misalnya LLD).
