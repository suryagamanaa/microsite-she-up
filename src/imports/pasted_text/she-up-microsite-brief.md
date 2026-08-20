====================================================================
KONTEKS PRODUK (baca dulu sebelum mendesain)
====================================================================

Kamu akan membuat prototype microsite mobile-first bernama "SHE-UP!" 
(dibaca "she up", dengan wordmark stilasi "ri-SHE-ko" untuk fitur 
kalkulatornya — huruf SHE di tengah kata "risiko" sengaja ditonjolkan).

SHE-UP! adalah ekosistem literasi dan proteksi finansial untuk perempuan 
Indonesia lintas generasi, dikembangkan untuk kompetisi ACTION! 2026 
(Agent of Change for Financial Literacy & Inclusion) yang diselenggarakan 
Asuransi Astra dalam rangka ulang tahun ke-70 perusahaan tersebut.

MASALAH YANG DISELESAIKAN:
Perempuan Indonesia mengalami "ilusi inklusi" — mereka sudah lancar 
bertransaksi digital (pakai e-wallet, QRIS, m-banking), tapi pemahaman 
soal risiko finansial dan proteksi (asuransi, dana darurat) masih sangat 
rendah. Ini terjadi di dua fase kehidupan berbeda:
- Ibu-ibu pelaku UMKM rumahan: uang usaha dan uang rumah tangga sering 
  bercampur, tidak punya dana darurat, rentan terjebak pinjaman online 
  ilegal saat butuh modal mendadak.
- Perempuan muda (mahasiswi/pekerja awal karier): rentan gaya hidup 
  konsumtif digital (FOMO belanja online, paylater), menganggap 
  asuransi sebagai "pengeluaran tidak perlu" padahal satu insiden 
  kesehatan/kecelakaan kecil bisa menghabiskan tabungan mereka.

SOLUSI (KONSEP BESAR):
Alih-alih ceramah/seminar biasa, SHE-UP! mengubah kesadaran jadi rasa 
jadi tindakan lewat 3 komponen:
1. riSHEko Tracker — kalkulator risiko finansial digital yang membuat 
   bahaya finansial "terasa nyata" lewat simulasi personal
2. SHE-aga Keluarga — untuk komunitas arisan/PKK (offline, board game 
   fisik bernama "Kartu DAG DIG DUG!" yang di-bridging ke microsite lewat QR code)
3. SHE-aga Muda — untuk mahasiswi/perempuan muda (kanal digital kampus, 
   berisi kelas literasi singkat, simulasi risiko, dan tantangan video 
   sosial #SHEUPChallenge)

Microsite yang akan kamu buat ini adalah RUMAH DIGITAL dari ketiga 
komponen di atas — diakses baik lewat scan QR code di board game fisik 
(pengguna: ibu-ibu arisan) MAUPUN lewat link yang dibagikan di media 
sosial/kampus (pengguna: mahasiswi/perempuan muda).

====================================================================
DUA PERSONA PENGGUNA (desain harus terasa relevan untuk keduanya)
====================================================================

PERSONA A — "Bu Sari", 34 tahun, Mompreneur
Jualan kue kering rumahan, aktif di arisan RT, baru pertama kali dengar 
istilah "asuransi mikro". Datang ke microsite lewat scan QR code di 
papan permainan saat sesi arisan. Butuh bahasa yang sederhana, tidak 
menggurui, dan visual yang tidak bikin dia merasa "kurang pintar".

PERSONA B — "Nadia", 21 tahun, mahasiswi semester 6 sambil jualan 
thrift preloved online. Melek digital, sering lihat konten finansial 
di TikTok/Instagram tapi belum pernah benar-benar cek kondisi 
keuangannya sendiri. Datang lewat link yang dibagikan teman kampus atau 
dari Instagram. Butuh tampilan yang terasa modern dan tidak "kaku 
kayak web pemerintah".

====================================================================
IDENTITAS VISUAL
====================================================================

WARNA (gunakan HANYA hex ini, jangan improvisasi warna baru selain 
untuk neutral/teks):
- Primer (Deep Blue): #0077BB — untuk header, tombol utama, elemen 
  navigasi aktif, teks penting. Ini warna "kepercayaan & proteksi".
- Sekunder (Sky Blue): #4DC4E5 — untuk background section bergantian, 
  ilustrasi, elemen dekoratif, state hover/highlight lembut. Ini warna 
  "keterbukaan & kemudahan".
- Aksen (Amber/Gold): #FFB721 — HANYA untuk elemen yang butuh perhatian 
  tinggi: CTA utama (tombol "Cek Risikoku"), badge/notifikasi, ikon 
  reward/challenge, garis bawah highlight pada teks penting. Jangan 
  pakai untuk background luas — dia warna aksen, bukan warna dasar.
- Neutral gelap (teks): #1A2332 (hampir hitam, bukan hitam pekat, 
  untuk headline dan body text)
- Neutral abu (teks sekunder/caption): #6B7280
- Neutral background: #FFFFFF (dasar) dan #F4FAFC (variasi section, 
  turunan sangat muda dari Sky Blue)
- Sukses/aman: #1FA97C (dipakai terbatas, misal status "sudah aktivasi 
  proteksi")
- Waspada: #E0722E (dipakai terbatas, misal skor risiko "tinggi" di 
  kalkulator — jangan pakai merah terang, ini bukan warna galat, 
  cuma level urgensi)

Rasio penggunaan: 60% putih/neutral, 25% Deep Blue & Sky Blue 
(bergantian sebagai warna section), 10% Amber (aksen CTA saja), 
5% warna status (sukses/waspada).

TIPOGRAFI:
Gunakan HANYA font "Plus Jakarta Sans" untuk seluruh teks (heading 
maupun body) — jangan campur font lain.
- Heading besar (Hero, judul section): Plus Jakarta Sans ExtraBold 
  (800), ukuran 28-32px di mobile
- Sub-heading: Plus Jakarta Sans Bold (700), 18-20px
- Body text: Plus Jakarta Sans Regular (400) atau Medium (500), 
  14-16px
- Caption/label kecil: Plus Jakarta Sans Medium (500), 11-12px, 
  letter-spacing sedikit lebar untuk label kategori (huruf kapital)
- Angka besar (skor risiko, statistik): Plus Jakarta Sans ExtraBold 
  (800), ukuran besar 36-40px

GAYA VISUAL LAIN:
- Card membulat, radius 16-20px, shadow lembut (jangan flat/tajam, 
  jangan juga terlalu neumorphic/timbul berlebihan)
- Ikon line-style dengan ketebalan garis konsisten (stroke ~1.8-2px), 
  bukan ikon filled/solid, bukan campuran gaya emoji
- Ilustrasi (kalau ada): gaya flat modern dengan warna dari palet di 
  atas, hindari ilustrasi stok generik yang terasa "beli dari internet"
- Elemen radar/scan sebagai motif berulang (lingkaran konsentris tipis) 
  untuk mewakili fitur riSHEko Tracker — bisa muncul sebagai dekorasi 
  halus di background hero atau di sekitar hasil kalkulator

====================================================================
NAVIGASI UTAMA (bottom navigation bar, 5 ikon)
====================================================================
1. Beranda (ikon rumah)
2. Cek Risiko (ikon radar/target — ini fitur andalan, beri sedikit 
   penekanan visual seperti badge kecil warna Amber)
3. Edukasi (ikon buku terbuka)
4. Berita (ikon dokumen/newspaper)
5. Komunitas (ikon dua orang/grup)

====================================================================
STRUKTUR HALAMAN & KONTEN LENGKAP
====================================================================

--------------------------------------------------------------------
HALAMAN 1 — BERANDA / HERO
--------------------------------------------------------------------
- Header: logo teks "SHE-UP!" (Deep Blue, huruf "UP" bisa diberi 
  aksen Amber) di kiri atas, ikon profil/menu di kanan atas
- Hero section (background gradasi halus Sky Blue ke putih, dengan 
  motif lingkaran radar tipis di belakang):
  Headline: "Kenali Risikomu, Sebelum Risiko Kenal Kamu"
  Sub-headline: "Ekosistem literasi & proteksi finansial untuk 
  perempuan Indonesia — dari ibu pelaku usaha sampai mahasiswi."
- Dua kartu pilihan besar berdampingan (atau ditumpuk di mobile):
  Kartu 1: ikon rumah/usaha, teks "Saya Mompreneur", sub-teks 
  "Punya usaha rumahan & aktif di arisan"
  Kartu 2: ikon topi wisuda, teks "Saya Perempuan Muda", sub-teks 
  "Mahasiswi, kerja pertama, atau usaha sampingan"
  (Pilihan ini menentukan bahasa/rekomendasi yang muncul di halaman 
  berikutnya — Bu Sari akan lihat istilah "usaha", Nadia akan lihat 
  istilah "kuliah/kerja")
- Tombol CTA besar warna Amber: "Cek Risiko Finansialku Sekarang →" 
  mengarah ke halaman riSHEko Tracker
- Section kecil di bawahnya: 3 angka statistik berjejer (gaya kartu 
  kecil), contoh: "81% UMKM belum paham asuransi" / "71,5% masyarakat 
  belum akses proteksi" / "150+ perempuan sudah cek risikonya"

--------------------------------------------------------------------
HALAMAN 2 — riSHEko TRACKER (Kalkulator Risiko)
--------------------------------------------------------------------
- Judul halaman: "riSHEko Tracker" dengan sub-teks "Cek risiko 
  finansialmu dalam 2 menit, hasilnya langsung & privat"
- Alur bertahap ala kuis (satu pertanyaan per layar, progress bar 
  tipis di atas):
  Pertanyaan contoh untuk Mompreneur:
  1. "Usahamu dijalankan dari mana?" (Rumah sendiri / Di luar rumah)
  2. "Punya tabungan darurat khusus usaha?" (Belum ada / Sudah ada)
  3. "Uang usaha dan uang rumah tangga masih satu rekening?" 
     (Masih campur / Sudah pisah)
  4. "Rata-rata omzet usahamu per bulan?" (slider Rupiah)
  
  Pertanyaan contoh untuk Perempuan Muda:
  1. "Pernah pakai paylater atau pinjaman online?" (Pernah/Belum)
  2. "Punya tabungan pribadi di luar uang kuliah/gaji?" 
     (Belum ada/Sudah ada)
  3. "Sudah punya asuransi kesehatan pribadi?" (Belum/Sudah)
  4. "Rata-rata uang saku/gaji per bulan?" (slider Rupiah)

- Halaman hasil:
  - Gauge/speedometer visual (warna hijau-kuning-oranye sesuai level) 
    menunjukkan "Level Risiko: SIAGA / WASPADA / GENTING"
  - Angka besar: "Estimasi potensi kerugian per bulan: Rp2.400.000" 
    dengan sub-teks "jika musibah terjadi & kamu belum siap"
  - Section "Langkah yang Bisa Kamu Mulai Sekarang" — 2-3 kartu tips 
    pencegahan konkret (BUKAN promosi produk asuransi langsung), 
    contoh: "Pisahkan rekening usaha dan pribadi minggu ini"
  - CTA lembut di bawah (bukan hard-sell): tombol "Gabung Komunitas 
    SHE-UP" mengarah ke halaman Komunitas
  - Catatan privasi kecil di bawah: "Jawabanmu dihitung langsung di 
    perangkatmu, tidak disimpan ke server mana pun"

--------------------------------------------------------------------
HALAMAN 3 — EDUKASI (Buku Saku SHE-UP)
--------------------------------------------------------------------
- Judul: "Belajar Kelola Uang, Bahasa Sehari-Hari"
- Filter chip di atas: "Semua", "Dasar Keuangan", "Bahaya Pinjol", 
  "Dana Darurat", "Kenalan Asuransi" (chip aktif warna Deep Blue, 
  tidak aktif abu-abu)
- Grid kartu modul (2 kolom di mobile), tiap kartu punya:
  ikon topik, judul modul, estimasi waktu baca ("4 menit baca"), 
  tag kategori kecil
  Contoh judul modul nyata:
  - "Kenapa Uang Usaha dan Uang Dapur Harus Dipisah?"
  - "5 Ciri Pinjol Ilegal yang Wajib Kamu Tahu"
  - "Dana Darurat: Berapa Sih yang Cukup?"
  - "FOMO Belanja: Kenapa Kita Susah Berhenti Checkout?"
  - "Asuransi Mikro: Proteksi dengan Premi Mulai Rp10.000"
  - "Cara Hitung Harga Jual yang Untung, Bukan Cuma Balik Modal"

--------------------------------------------------------------------
HALAMAN 4 — BERITA & UPDATE FINANSIAL
--------------------------------------------------------------------
- Judul: "Update Finansial Buat Kamu"
- Sub-teks kecil: "Dikurasi tim SHE-UP setiap minggu — bukan berita 
  acak, tapi yang relevan buat kamu"
- Section "Paling Dibaca Minggu Ini" — 1 kartu besar horizontal 
  (gambar + judul + ringkasan 2 baris + sumber & tanggal)
- Feed kartu berita vertikal di bawahnya, tiap kartu: thumbnail, 
  judul, ringkasan singkat, sumber (contoh: "OJK", "Kompas", 
  "Kontan"), tanggal
  Contoh judul berita (buat dummy content yang realistis):
  - "OJK Luncurkan Kampanye Literasi Keuangan Nasional untuk Perempuan"
  - "Tips Kelola THR/Bonus Biar Nggak Habis dalam Seminggu"
  - "Kenapa Makin Banyak Anak Muda Beli Asuransi Lewat Aplikasi?"
  - "Cerita Sukses: Dari Warung Rumahan ke Usaha Beromzet Puluhan Juta"
- Catatan desain: bedakan visual section ini dari "Edukasi" — kalau 
  Edukasi terasa seperti modul belajar (kartu rapi, ikon topik), 
  Berita harus terasa seperti feed media (foto lebih dominan, gaya 
  jurnalistik)

--------------------------------------------------------------------
HALAMAN 5 — SIMULASI RISK SHIELD
--------------------------------------------------------------------
- Judul: "Simulasi: Kalau Ini Terjadi ke Kamu?"
- Pilihan kartu skenario (3-4 kartu horizontal scroll):
  "Sakit mendadak 1 minggu", "Motor rusak/kecelakaan", 
  "Usaha kena musibah (banjir/kebakaran)", "Kena PHK mendadak"
- Setelah pilih satu skenario: tampilkan simulasi dampak finansial 
  sederhana (angka kerugian estimasi + hari produktivitas hilang), 
  lalu perkenalkan singkat jenis proteksi mikro yang relevan sebagai 
  REFERENSI EDUKATIF (bukan halaman pembelian/checkout)

--------------------------------------------------------------------
HALAMAN 6 — KOMUNITAS & #SHEUPChallenge
--------------------------------------------------------------------
- Judul: "Kamu Nggak Sendirian"
- Section progress komunitas (3 angka besar berjejer): jumlah 
  kelompok Arisan Proteksi terbentuk, jumlah peserta aktif, jumlah 
  video #SHEUPChallenge
- Galeri video/testimoni gaya grid Reels (thumbnail vertikal 9:16, 
  ikon play di tengah)
- Dua tombol gabung grup (sesuai persona): "Gabung Grup Arisan 
  Proteksi" dan "Gabung Komunitas Kampus"
- CTA ikut challenge: "Bikin Video #SHEUPChallenge-mu"

--------------------------------------------------------------------
HALAMAN 7 — TENTANG PROGRAM
--------------------------------------------------------------------
- Penjelasan singkat SHE-UP! (1 paragraf, ambil dari konteks produk 
  di atas, versi ringkas)
- Section mitra: sebutkan "Asuransi Astra" dan "ACTION! 2026" sebagai 
  penyelenggara/mitra (teks saja, jangan reproduksi logo asli — 
  gunakan wordmark teks sederhana)
- Timeline singkat program (opsional, 3-4 titik)

--------------------------------------------------------------------
FOOTER (di semua halaman)
--------------------------------------------------------------------
- CTA ulang: "Belum cek risikomu? Yuk mulai →"
- Link: Instagram, kontak, kebijakan privasi
- Teks kecil: "SHE-UP! adalah bagian dari inisiatif ACTION! 2026 — 
  Asuransi Astra"

====================================================================
NADA BAHASA (PENTING)
====================================================================
- Semua teks pakai Bahasa Indonesia sehari-hari, sapaan "kamu", 
  bukan "Anda"
- Hangat dan suportif, bukan menggurui atau menakut-nakuti — hindari 
  kalimat yang membuat pengguna merasa bodoh karena belum paham 
  finansial
- Hindari istilah teknis asuransi/keuangan tanpa penjelasan — kalau 
  pakai istilah seperti "premi" atau "polis", selalu beri konteks 
  sederhana di sebelahnya
- Tidak ada kesan "jualan produk" di halaman mana pun kecuali yang 
  memang eksplisit tentang proteksi/asuransi, dan bahkan di situ tetap 
  edukatif dulu, bukan hard-sell

====================================================================
CATATAN TEKNIS
====================================================================
- Mobile-first, viewport dasar sekitar 390px lebar
- Tidak perlu backend/database — kalkulator dan kuis semua berjalan 
  di sisi client (browser), tidak ada login/registrasi wajib
- Harus bisa langsung di-publish dari tool ini dan menghasilkan link 
  yang bisa dibagikan, tanpa proses deploy tambahan