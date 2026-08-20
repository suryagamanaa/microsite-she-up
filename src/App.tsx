import { useState, useEffect } from 'react'

const C = {
  blue: '#0077BB',
  sky: '#4DC4E5',
  amber: '#FFB721',
  dark: '#1A2332',
  gray: '#6B7280',
  bgAlt: '#F4FAFC',
  green: '#1FA97C',
  orange: '#E0722E',
  white: '#FFFFFF',
}

// ─── Radar SVG decoration ─────────────────────────────────────────────────────
function Radar({ size = 320, color = C.blue, opacity = 0.08 }: { size?: number; color?: string; opacity?: number }) {
  const cx = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden style={{ opacity }}>
      {[0.96, 0.74, 0.52, 0.30].map((r, i) => (
        <circle key={i} cx={cx} cy={cx} r={cx * r} fill="none" stroke={color} strokeWidth="1.2" />
      ))}
      <line x1={cx} y1="0" x2={cx} y2={size} stroke={color} strokeWidth="0.7" />
      <line x1="0" y1={cx} x2={size} y2={cx} stroke={color} strokeWidth="0.7" />
      <line x1="0" y1="0" x2={size} y2={size} stroke={color} strokeWidth="0.4" />
      <line x1={size} y1="0" x2="0" y2={size} stroke={color} strokeWidth="0.4" />
    </svg>
  )
}

// ─── Top Navigation ───────────────────────────────────────────────────────────
const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Cek Risiko', href: '#risiko', accent: true },
  { label: 'Edukasi', href: '#edukasi' },
  { label: 'Berita', href: '#berita' },
  { label: 'Komunitas', href: '#komunitas' },
  { label: 'Proteksi', href: '#proteksi' },
]

function Navbar({ active }: { active: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.97)' : C.white,
        borderBottom: `1px solid ${scrolled ? '#E8EEF2' : 'transparent'}`,
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1140,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#beranda"
          onClick={e => { e.preventDefault(); handleNav('#beranda') }}
          style={{ textDecoration: 'none' }}
        >
          <span style={{ fontSize: 22, fontWeight: 800, color: C.blue, letterSpacing: -0.5 }}>
            SHE-<span style={{ color: C.amber }}>UP!</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => { e.preventDefault(); handleNav(link.href) }}
              style={{
                textDecoration: 'none',
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: link.accent ? 700 : 500,
                color: link.accent ? C.white : (active === link.href.slice(1) ? C.blue : C.dark),
                background: link.accent ? C.amber : (active === link.href.slice(1) ? `${C.blue}10` : 'transparent'),
                transition: 'all 0.2s',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setOpen(o => !o)}
          className="hamburger"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 6,
            display: 'none',
          }}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2" strokeLinecap="round">
            {open
              ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ background: C.white, borderTop: '1px solid #E8EEF2', padding: '12px 24px 20px' }}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => { e.preventDefault(); handleNav(link.href) }}
              style={{
                display: 'block',
                padding: '12px 0',
                textDecoration: 'none',
                fontSize: 15,
                fontWeight: link.accent ? 700 : 500,
                color: link.accent ? C.amber : C.dark,
                borderBottom: '1px solid #F4FAFC',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({
  id,
  bg = C.white,
  children,
  style: extraStyle,
}: {
  id?: string
  bg?: string
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <section
      id={id}
      style={{ background: bg, padding: '80px 0', ...extraStyle }}
    >
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
        {children}
      </div>
    </section>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="beranda"
      style={{
        background: `linear-gradient(150deg, ${C.bgAlt} 0%, ${C.white} 55%)`,
        paddingTop: 140,
        paddingBottom: 96,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radar dekor kanan atas */}
      <div style={{ position: 'absolute', top: -60, right: -60, pointerEvents: 'none' }}>
        <Radar size={400} opacity={0.09} />
      </div>
      {/* Radar dekor kiri bawah */}
      <div style={{ position: 'absolute', bottom: -80, left: -80, pointerEvents: 'none' }}>
        <Radar size={280} color={C.sky} opacity={0.13} />
      </div>

      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ maxWidth: 680 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: `${C.amber}20`,
              border: `1px solid ${C.amber}40`,
              borderRadius: 99,
              padding: '5px 14px',
              marginBottom: 24,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.amber, display: 'inline-block' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: C.amber, letterSpacing: 1, textTransform: 'uppercase' }}>
              ACTION! 2026 — Asuransi Astra
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(36px, 6vw, 62px)',
              fontWeight: 800,
              color: C.dark,
              lineHeight: 1.15,
              letterSpacing: -1.5,
              marginBottom: 22,
            }}
          >
            Kenali Risikomu,{' '}
            <span style={{ color: C.blue }}>Sebelum Risiko</span>{' '}
            <br />
            <span
              style={{
                position: 'relative',
                display: 'inline-block',
              }}
            >
              Kenal Kamu
              <svg
                style={{ position: 'absolute', bottom: -6, left: 0, width: '100%' }}
                viewBox="0 0 300 10"
                preserveAspectRatio="none"
                height="10"
              >
                <path d="M0 8 Q75 2 150 6 Q225 10 300 4" fill="none" stroke={C.amber} strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p style={{ fontSize: 18, color: C.gray, lineHeight: 1.7, marginBottom: 40, maxWidth: 520 }}>
            Ekosistem literasi & proteksi finansial untuk perempuan Indonesia — dari ibu pelaku UMKM sampai mahasiswi dan pekerja muda.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="#risiko"
              onClick={e => { e.preventDefault(); document.querySelector('#risiko')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: C.amber,
                color: C.dark,
                textDecoration: 'none',
                borderRadius: 12,
                padding: '15px 28px',
                fontSize: 16,
                fontWeight: 800,
                boxShadow: `0 6px 20px ${C.amber}50`,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 10px 28px ${C.amber}60`
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 6px 20px ${C.amber}50`
              }}
            >
              Cek Risiko Finansialku
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#edukasi"
              onClick={e => { e.preventDefault(); document.querySelector('#edukasi')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                color: C.blue,
                textDecoration: 'none',
                fontSize: 15,
                fontWeight: 600,
                padding: '15px 4px',
              }}
            >
              Jelajahi Edukasi
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 32, marginTop: 52, flexWrap: 'wrap' }}>
            {[
              { num: '81%', label: 'UMKM belum paham asuransi' },
              { num: '71,5%', label: 'Belum akses proteksi finansial' },
              { num: '150+', label: 'Perempuan sudah cek risikonya' },
            ].map(s => (
              <div key={s.num}>
                <p style={{ fontSize: 28, fontWeight: 800, color: C.blue, lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontSize: 12, color: C.gray, marginTop: 4, maxWidth: 120 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── riSHEko Tracker Section ──────────────────────────────────────────────────
type QuizAnswer = Record<number, string | number>

function GaugeMeter({ score }: { score: number }) {
  const level = score < 35 ? 'SIAGA' : score < 65 ? 'WASPADA' : 'GENTING'
  const levelColor = score < 35 ? C.green : score < 65 ? C.amber : C.orange
  const toRad = (d: number) => (d * Math.PI) / 180
  const r = 90, cx = 110, cy = 110
  const startAngle = 225
  const sweepAngle = 270
  const endAngle = startAngle - sweepAngle
  const arcEnd = startAngle - (score / 100) * sweepAngle

  const arcPath = (from: number, to: number) => {
    const f = { x: cx + r * Math.cos(toRad(from)), y: cy - r * Math.sin(toRad(from)) }
    const t = { x: cx + r * Math.cos(toRad(to)), y: cy - r * Math.sin(toRad(to)) }
    const large = Math.abs(from - to) > 180 ? 1 : 0
    const sweep = from > to ? 1 : 0
    return `M${f.x} ${f.y} A${r} ${r} 0 ${large} ${sweep} ${t.x} ${t.y}`
  }

  const needleAngle = startAngle - (score / 100) * sweepAngle
  const needleLen = r - 18
  const nx = cx + needleLen * Math.cos(toRad(needleAngle))
  const ny = cy - needleLen * Math.sin(toRad(needleAngle))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width="220" height="140" viewBox="0 0 220 140">
        <path d={arcPath(startAngle, endAngle)} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="18" strokeLinecap="round" />
        <path d={arcPath(startAngle, arcEnd)} fill="none" stroke={levelColor} strokeWidth="18" strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="8" fill="white" />
        <circle cx={cx} cy={cy} r="4" fill={levelColor} />
      </svg>
      <p style={{ fontSize: 32, fontWeight: 800, color: levelColor, marginTop: -16 }}>{level}</p>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>Level Risiko Finansialmu</p>
    </div>
  )
}

function RisikoSection() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro')
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer>({})
  const [sliderVal, setSliderVal] = useState(3000000)

  const questions = [
    { q: 'Punya tabungan darurat pribadi?', opts: ['Belum ada sama sekali', 'Ada, tapi sering terpakai', 'Sudah ada & aman'] },
    { q: 'Uang usaha/penghasilan dan keperluan sehari-hari sudah dipisah?', opts: ['Masih campur jadi satu', 'Kadang-kadang dipisah', 'Sudah dipisah rapi'] },
    { q: 'Pernah pakai paylater atau pinjaman online?', opts: ['Sering & belum lunas', 'Pernah, sudah lunas', 'Tidak pernah'] },
    { q: 'Punya asuransi kesehatan pribadi (BPJS/swasta)?', opts: ['Belum punya', 'Punya BPJS saja', 'Punya BPJS + swasta'] },
    { q: 'Rata-rata penghasilan/omzet per bulan?', type: 'slider' },
  ]

  const total = questions.length
  const calcScore = () => {
    let risk = 0
    if (String(answers[0]).includes('Belum')) risk += 30
    else if (String(answers[0]).includes('terpakai')) risk += 15
    if (String(answers[1]).includes('campur')) risk += 25
    else if (String(answers[1]).includes('Kadang')) risk += 10
    if (String(answers[2]).includes('Sering')) risk += 30
    else if (String(answers[2]).includes('lunas')) risk += 5
    if (String(answers[3]).includes('Belum')) risk += 15
    return Math.min(risk + 5, 95)
  }

  const handleAnswer = (ans: string) => {
    const next = { ...answers, [qIndex]: ans }
    setAnswers(next)
    if (qIndex < total - 1) setQIndex(i => i + 1)
    else setStep('result')
  }

  const score = calcScore()
  const estimasi = Math.round(sliderVal * (score / 100) * 0.45)

  const tips = [
    score >= 65 && 'Mulai pisahkan rekening usaha dan pribadi minggu ini — langkah ini saja bisa kurangi risiko secara signifikan.',
    score >= 35 && 'Sisihkan minimal 10% penghasilan untuk dana darurat sebelum belanja apapun.',
    'Cek tagihan paylater atau utangmu sekarang — lunasi yang bunganya paling besar lebih dulu.',
    !String(answers[3]).includes('swasta') && 'Kalau belum punya BPJS, daftar sekarang — premi mulai Rp42.000/bulan bisa cover banyak risiko.',
  ].filter(Boolean) as string[]

  if (step === 'result') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
        <div>
          <GaugeMeter score={score} />
          <div
            style={{
              background: 'rgba(255,255,255,0.07)',
              borderRadius: 16,
              padding: '20px',
              marginTop: 24,
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>
              Estimasi potensi kerugian per bulan
            </p>
            <p style={{ fontSize: 40, fontWeight: 800, color: C.white }}>
              Rp{estimasi.toLocaleString('id-ID')}
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
              jika musibah terjadi tanpa persiapan
            </p>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: C.white, marginBottom: 16 }}>
            Langkah yang bisa kamu mulai sekarang
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {tips.slice(0, 3).map((tip, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  borderRadius: 12,
                  padding: '14px 16px',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ color: C.amber, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>→</span>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{tip}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setStep('intro'); setQIndex(0); setAnswers({}) }}
            style={{
              background: 'transparent',
              border: `1.5px solid rgba(255,255,255,0.3)`,
              borderRadius: 10,
              padding: '10px 20px',
              fontSize: 13,
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Cek Ulang
          </button>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 20, lineHeight: 1.6 }}>
            🔒 Jawabanmu dihitung langsung di perangkat — tidak dikirim ke server manapun.
          </p>
        </div>
      </div>
    )
  }

  if (step === 'intro') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div style={{ position: 'absolute', right: -40, top: -40, pointerEvents: 'none' }}>
            <Radar size={280} color={C.sky} opacity={0.15} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.amber, letterSpacing: 1.2, textTransform: 'uppercase' }}>
            ri<span style={{ color: C.white }}>SHE</span>ko Tracker
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: C.white, lineHeight: 1.25, margin: '12px 0 16px', letterSpacing: -0.8 }}>
            Cek risiko finansialmu<br />dalam 2 menit
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 28 }}>
            5 pertanyaan singkat — hasilnya langsung, personal, dan privat. Tidak ada jawaban salah, tidak ada data yang dikirim.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Gratis & tanpa registrasi', 'Hasil personal & langsung terlihat', 'Tips konkret berdasarkan jawabanmu'].map(f => (
              <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                <span style={{ color: C.green, fontWeight: 800 }}>✓</span> {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setStep('quiz')}
            style={{
              background: C.amber,
              border: 'none',
              borderRadius: 12,
              padding: '15px 28px',
              fontSize: 16,
              fontWeight: 800,
              color: C.dark,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: `0 6px 20px ${C.amber}40`,
            }}
          >
            Mulai Cek Sekarang
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Visual sisi kanan */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 280 }}>
            <Radar size={280} color={C.sky} opacity={0.25} />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: 52, fontWeight: 800, color: C.white }}>?</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: 1 }}>RISIKO FINANSIALMU</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Quiz
  const q = questions[qIndex]
  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      {/* Progress bar */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Pertanyaan {qIndex + 1} dari {total}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.amber }}>{Math.round(((qIndex + 1) / total) * 100)}%</span>
        </div>
        <div style={{ height: 3, background: 'rgba(255,255,255,0.12)', borderRadius: 99 }}>
          <div
            style={{
              height: '100%',
              width: `${((qIndex + 1) / total) * 100}%`,
              background: `linear-gradient(90deg, ${C.blue}, ${C.sky})`,
              borderRadius: 99,
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </div>

      <h3 style={{ fontSize: 22, fontWeight: 800, color: C.white, lineHeight: 1.4, marginBottom: 28 }}>
        {q.q}
      </h3>

      {q.type === 'slider' ? (
        <div>
          <p style={{ fontSize: 38, fontWeight: 800, color: C.white, marginBottom: 4 }}>
            Rp{sliderVal.toLocaleString('id-ID')}
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>per bulan</p>
          <input
            type="range" min={500000} max={20000000} step={200000}
            value={sliderVal}
            onChange={e => setSliderVal(Number(e.target.value))}
            style={{ width: '100%', accentColor: C.amber, marginBottom: 8 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>
            <span>Rp500 rb</span><span>Rp20 juta</span>
          </div>
          <button
            onClick={() => { setAnswers(p => ({ ...p, [qIndex]: sliderVal })); setStep('result') }}
            style={{
              background: C.amber, border: 'none', borderRadius: 12, padding: '14px 32px',
              fontSize: 15, fontWeight: 700, color: C.dark, cursor: 'pointer',
            }}
          >
            Lihat Hasil Risikomu →
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.opts!.map(opt => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1.5px solid rgba(255,255,255,0.12)',
                borderRadius: 12,
                padding: '16px 20px',
                fontSize: 15,
                color: C.white,
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'background 0.2s, border-color 0.2s',
                fontWeight: 500,
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'
                ;(e.currentTarget as HTMLElement).style.borderColor = C.amber
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'
              }}
            >
              {opt}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          ))}
        </div>
      )}

      {qIndex > 0 && (
        <button
          onClick={() => setQIndex(i => i - 1)}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 13, cursor: 'pointer', marginTop: 20, padding: 0 }}
        >
          ← Kembali
        </button>
      )}
    </div>
  )
}

// ─── Article / News Modal ─────────────────────────────────────────────────────
interface ArticleData {
  img: string
  alt: string
  title: string
  cat: string
  menit: string
  content?: React.ReactNode
}

function ArticleModal({ article, onClose }: { article: ArticleData; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(26,35,50,0.75)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px 16px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.white, borderRadius: 24, maxWidth: 680, width: '100%',
          maxHeight: '90vh', overflowY: 'auto', position: 'relative',
          boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
        }}
      >
        {/* Hero image */}
        <div style={{ height: 220, overflow: 'hidden', background: C.bgAlt, borderRadius: '24px 24px 0 0', position: 'relative' }}>
          <img src={article.img} alt={article.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,35,50,0.4) 0%, transparent 60%)' }} />
        </div>
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(0,0,0,0.45)', border: 'none', borderRadius: 99,
            width: 36, height: 36, cursor: 'pointer', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {/* Content */}
        <div style={{ padding: '28px 32px 36px' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
            <span style={{ background: catColors[article.cat]?.bg || C.bgAlt, color: catColors[article.cat]?.text || C.gray, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99 }}>
              {article.cat}
            </span>
            <span style={{ fontSize: 12, color: C.gray }}>{article.menit} baca</span>
          </div>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: C.dark, lineHeight: 1.3, marginBottom: 20 }}>
            {article.title}
          </h2>
          <div style={{ fontSize: 15, color: '#374151', lineHeight: 1.8 }}>
            {article.content ?? (
              <p style={{ color: C.gray, fontStyle: 'italic' }}>Artikel lengkap segera hadir.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Edukasi Section ──────────────────────────────────────────────────────────
const catColors: Record<string, { bg: string; text: string }> = {
  'Dasar Keuangan': { bg: `${C.blue}15`, text: C.blue },
  'Bahaya Pinjol': { bg: `${C.orange}15`, text: C.orange },
  'Dana Darurat': { bg: `${C.green}15`, text: C.green },
  'Kenalan Asuransi': { bg: `${C.sky}25`, text: '#0088AA' },
}

const p = (text: string) => (
  <p style={{ marginBottom: 16 }}>{text}</p>
)
const h = (text: string) => (
  <p style={{ fontWeight: 700, fontSize: 17, color: C.dark, margin: '24px 0 10px' }}>{text}</p>
)
const tip = (text: string) => (
  <div style={{ background: `${C.amber}15`, borderLeft: `3px solid ${C.amber}`, borderRadius: 8, padding: '12px 16px', margin: '16px 0', fontSize: 14 }}>
    <strong>💡 Tips:</strong> {text}
  </div>
)

const modulEdukasi: ArticleData[] = [
  {
    img: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&h=420&fit=crop&auto=format',
    alt: 'Koin ditumpuk di atas meja',
    title: 'Kenapa Uang Usaha dan Uang Dapur Harus Dipisah?',
    cat: 'Dasar Keuangan',
    menit: '3 menit',
    content: (
      <>
        {p('Kamu punya usaha kue kering, warung online, atau jasa titip belanja — dan semua uangnya masuk ke satu rekening yang sama dengan uang belanja bulanan? Kalau iya, kamu tidak sendirian. Hampir 70% pelaku UMKM perempuan di Indonesia masih mengelola keuangan dengan cara ini. Dan tanpa sadar, kebiasaan ini bisa jadi jebakan tersembunyi.')}
        {h('Apa bahayanya mencampur uang usaha dan pribadi?')}
        {p('Pertama, kamu tidak akan pernah tahu usahamu benar-benar untung atau tidak. Kalau uang masuk Rp3 juta dari jualan, tapi langsung kamu pakai untuk belanja kebutuhan rumah, kamu kehilangan jejak modal yang berputar. Usahamu terasa jalan, tapi sebenarnya bisa jadi kamu sedang "makan" modalmu sendiri.')}
        {p('Kedua, saat keuangan keluarga sedang seret — misalnya ada anggota sakit atau kebutuhan mendadak — kamu akan cenderung mengambil uang dari "stok usaha" yang harusnya jadi modal produksi. Ini siklus yang berbahaya: usaha kekurangan modal, produksi terganggu, penghasilan turun.')}
        {p('Ketiga, sulit mengajukan pinjaman modal usaha yang resmi. Bank atau koperasi biasanya meminta laporan keuangan usaha yang terpisah. Kalau semuanya campur, kamu tidak bisa membuktikan omzet usahamu secara akurat.')}
        {h('Langkah konkret mulai minggu ini')}
        {p('Kabar baiknya: kamu tidak perlu langsung membuka rekening bisnis formal yang ada biaya adminnya. Mulai saja dengan rekening tabungan biasa yang khusus untuk usaha — banyak bank digital yang bebas biaya admin.')}
        {p('Alur yang bisa langsung kamu coba: setiap ada pemasukan dari usaha, masukkan 100% ke rekening usaha. Dari situ, keluarkan untuk modal bahan baku, biaya pengiriman, dan lain-lain. Sisanya — itu baru "gaji" yang bisa kamu pindah ke rekening pribadi.')}
        {tip('Mulai dengan membuka rekening baru di aplikasi bank digital seperti Jenius, TMRW, atau Blu. Bebas biaya admin, bisa dibuat dalam 10 menit dari HP.')}
        {p('Tidak ada yang terlambat untuk mulai. Satu langkah kecil ini — memisahkan rekening — bisa mengubah cara kamu melihat usahamu secara keseluruhan.')}
      </>
    ),
  },
  {
    img: 'https://images.unsplash.com/photo-1713947506242-8fcae733d158?w=800&h=420&fit=crop&auto=format',
    alt: 'Perempuan menggunakan smartphone untuk berbelanja online',
    title: '5 Ciri Pinjol Ilegal yang Wajib Kamu Tahu',
    cat: 'Bahaya Pinjol',
    menit: '3 menit',
    content: (
      <>
        {p('Di tengah kebutuhan modal mendadak atau kebutuhan konsumsi yang mendesak, pinjaman online (pinjol) memang terasa seperti solusi instan. Tapi di antara ratusan platform yang beredar, banyak yang ternyata ilegal — dan korbannya mayoritas adalah perempuan pelaku UMKM dan pekerja muda.')}
        {p('OJK mencatat ada ribuan pinjol ilegal yang masih beroperasi setiap tahunnya. Berikut 5 ciri yang wajib kamu kenali sebelum menyetujui pinjaman apapun:')}
        {h('1. Tidak terdaftar atau tidak berizin OJK')}
        {p('Ini adalah ciri paling dasar. Setiap platform keuangan resmi wajib terdaftar di Otoritas Jasa Keuangan. Cara ceknya mudah: buka situs ojk.go.id atau hubungi kontak OJK 157, ketik nama aplikasinya. Kalau tidak ada — langsung tinggalkan.')}
        {h('2. Minta akses ke kontak, galeri foto, dan SMS')}
        {p('Pinjol ilegal biasanya meminta izin akses ke seluruh kontak HP, galeri foto, bahkan SMS kamu. Ini bukan kebutuhan teknis — ini alat intimidasi. Saat kamu telat bayar, mereka akan menghubungi seluruh kontak kamu dan menyebarkan foto pribadimu. Platform resmi tidak pernah meminta akses seperti ini.')}
        {h('3. Bunga dan biaya tidak transparan')}
        {p('Pinjol ilegal sering menyembunyikan bunga harian yang sangat tinggi di balik kalimat "biaya administrasi" atau "biaya layanan". Pinjaman Rp1 juta bisa berubah menjadi tagihan Rp3 juta dalam dua minggu. Platform resmi wajib menampilkan total biaya pinjaman secara jelas sebelum kamu setuju.')}
        {h('4. Penagihan kasar dan mengancam')}
        {p('Penagih pinjol ilegal dikenal menggunakan cara yang sangat tidak manusiawi: ancaman, kata-kata kasar, bahkan mempermalukan di depan keluarga atau rekan kerja. Lembaga keuangan resmi terikat aturan etika penagihan OJK — penagihan hanya boleh dilakukan pada jam dan cara tertentu.')}
        {h('5. Pencairan sangat cepat tanpa verifikasi')}
        {p('Kalau sebuah platform menjanjikan "cair dalam 5 menit tanpa perlu dokumen apapun" — itu tanda bahaya. Platform resmi melakukan minimal verifikasi identitas untuk melindungi kamu dan mereka.')}
        {tip('Sebelum menginstal aplikasi pinjaman apapun, cek dulu di cekfintech.id atau aplikasi SPRINT OJK. Kalau tidak ada namanya, jangan lanjutkan.')}
        {p('Kalau kamu sedang butuh dana darurat, pertimbangkan alternatif yang lebih aman: koperasi simpan pinjam di lingkungan kamu, program KUR (Kredit Usaha Rakyat) dari bank pemerintah, atau arisan yang sudah kamu percaya. Tidak ada solusi instan yang benar-benar gratis dari risiko.')}
      </>
    ),
  },
  {
    img: 'https://images.unsplash.com/photo-1634474588707-de99f09285c0?w=400&h=260&fit=crop&auto=format',
    alt: 'Toples tabungan dana darurat',
    title: 'Dana Darurat: Berapa yang Cukup?',
    cat: 'Dana Darurat',
    menit: '3 menit',
  },
  {
    img: 'https://images.unsplash.com/photo-1599050751795-6cdaafbc2319?w=400&h=260&fit=crop&auto=format',
    alt: 'Kartu kredit dan smartphone untuk belanja online',
    title: 'FOMO Belanja: Kenapa Kita Susah Berhenti Checkout?',
    cat: 'Dasar Keuangan',
    menit: '5 menit',
  },
  {
    img: 'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=400&h=260&fit=crop&auto=format',
    alt: 'Keluarga bahagia di pantai — melambangkan proteksi keluarga',
    title: 'Asuransi Mikro: Proteksi dengan Premi Mulai Rp30.000',
    cat: 'Kenalan Asuransi',
    menit: '4 menit',
  },
  {
    img: 'https://images.unsplash.com/photo-1746010114944-75c04f221da4?w=400&h=260&fit=crop&auto=format',
    alt: 'Perempuan pelaku usaha kecil berjualan',
    title: 'Cara Hitung Harga Jual yang Untung, Bukan Cuma Balik Modal',
    cat: 'Dasar Keuangan',
    menit: '8 menit',
  },
]

const cats = ['Semua', 'Dasar Keuangan', 'Bahaya Pinjol', 'Dana Darurat', 'Kenalan Asuransi']

function EdukasiSection() {
  const [active, setActive] = useState('Semua')
  const [openArticle, setOpenArticle] = useState<ArticleData | null>(null)
  const filtered = active === 'Semua' ? modulEdukasi : modulEdukasi.filter(m => m.cat === active)

  return (
    <>
      {openArticle && <ArticleModal article={openArticle} onClose={() => setOpenArticle(null)} />}
      <Section id="edukasi" bg={C.bgAlt}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, letterSpacing: 1.2, textTransform: 'uppercase' }}>
              Buku Saku SHE-UP!
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: C.dark, lineHeight: 1.25, marginTop: 8, letterSpacing: -0.5 }}>
              Belajar Kelola Uang,<br />Bahasa Sehari-Hari
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {cats.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  background: active === cat ? C.blue : C.white,
                  color: active === cat ? C.white : C.gray,
                  border: `1.5px solid ${active === cat ? C.blue : '#E0E8EE'}`,
                  borderRadius: 99,
                  padding: '7px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {filtered.map((m, i) => (
            <article
              key={i}
              onClick={() => setOpenArticle(m)}
              style={{
                background: C.white,
                borderRadius: 18,
                overflow: 'hidden',
                border: '1px solid #E8EEF2',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <div style={{ height: 180, overflow: 'hidden', background: C.bgAlt, position: 'relative' }}>
                <img src={m.img} alt={m.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                {m.content && (
                  <div style={{ position: 'absolute', bottom: 10, right: 10, background: C.blue, borderRadius: 99, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: 'white' }}>
                    Baca Artikel
                  </div>
                )}
              </div>
              <div style={{ padding: '18px 20px 20px' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'center' }}>
                  <span style={{ background: catColors[m.cat]?.bg, color: catColors[m.cat]?.text, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99 }}>
                    {m.cat}
                  </span>
                  <span style={{ fontSize: 11, color: C.gray }}>{m.menit} baca</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: C.dark, lineHeight: 1.45, marginBottom: 12 }}>{m.title}</h3>
                <span style={{ fontSize: 13, color: m.content ? C.blue : C.gray, fontWeight: m.content ? 600 : 400 }}>
                  {m.content ? 'Baca selengkapnya →' : 'Segera hadir'}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  )
}

// ─── Berita Section ───────────────────────────────────────────────────────────
interface BeritaItem {
  img: string
  alt: string
  title: string
  ringkasan: string
  sumber: string
  tanggal: string
  content?: React.ReactNode
}

function BeritaModal({ item, onClose }: { item: BeritaItem; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(26,35,50,0.75)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.white, borderRadius: 24, maxWidth: 680, width: '100%',
          maxHeight: '90vh', overflowY: 'auto', position: 'relative',
          boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
        }}
      >
        <div style={{ height: 220, overflow: 'hidden', background: C.bgAlt, borderRadius: '24px 24px 0 0', position: 'relative' }}>
          <img src={item.img} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,35,50,0.5) 0%, transparent 60%)' }} />
        </div>
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(0,0,0,0.45)', border: 'none', borderRadius: 99,
            width: 36, height: 36, cursor: 'pointer', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div style={{ padding: '28px 32px 36px' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
            <span style={{ background: `${C.blue}15`, color: C.blue, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99 }}>
              {item.sumber}
            </span>
            <span style={{ fontSize: 12, color: C.gray }}>{item.tanggal}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: C.dark, lineHeight: 1.3, marginBottom: 12 }}>
            {item.title}
          </h2>
          <p style={{ fontSize: 15, color: C.gray, lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic', borderLeft: `3px solid ${C.sky}`, paddingLeft: 14 }}>
            {item.ringkasan}
          </p>
          <div style={{ fontSize: 15, color: '#374151', lineHeight: 1.8 }}>
            {item.content ?? <p style={{ color: C.gray, fontStyle: 'italic' }}>Konten lengkap segera hadir.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

const beritaData: BeritaItem[] = [
  {
    img: 'https://images.unsplash.com/photo-1607703703520-bb638e84caf2?w=800&h=420&fit=crop&auto=format',
    alt: 'Kampanye literasi keuangan nasional',
    title: 'OJK Luncurkan Kampanye Literasi Keuangan Nasional untuk Perempuan',
    ringkasan: 'Otoritas Jasa Keuangan memperkuat program inklusi finansial yang menyasar perempuan pelaku UMKM di seluruh Indonesia — termasuk pelatihan dan akses ke produk proteksi mikro.',
    sumber: 'OJK',
    tanggal: '24 Jul 2026',
    content: (
      <>
        <p style={{ marginBottom: 16 }}>
          Otoritas Jasa Keuangan (OJK) resmi meluncurkan kampanye literasi keuangan nasional bertajuk <strong>"Perempuan Cerdas Finansial"</strong> pada pertengahan Juli 2026. Program ini menargetkan lebih dari 2 juta perempuan pelaku UMKM di 34 provinsi di Indonesia dalam jangka waktu 18 bulan ke depan.
        </p>
        <p style={{ marginBottom: 16 }}>
          Kepala Eksekutif Pengawas Perilaku Pelaku Usaha Jasa Keuangan OJK menyatakan bahwa meski tingkat kepemilikan rekening bank di kalangan perempuan sudah meningkat signifikan, pemahaman soal produk proteksi dan pengelolaan risiko finansial masih jauh tertinggal. "Inklusi tanpa literasi adalah ilusi," ungkapnya dalam acara peluncuran.
        </p>
        <p style={{ marginBottom: 16 }}>
          Program ini mencakup tiga komponen utama: pelatihan tatap muka melalui jaringan koperasi dan PKK di tingkat kelurahan, modul literasi digital yang bisa diakses melalui aplikasi dan microsite mitra, serta program pendampingan UMKM perempuan yang bekerja sama dengan lembaga keuangan termasuk Asuransi Astra melalui program LENTERA.
        </p>
        <p style={{ marginBottom: 0 }}>
          OJK juga mengumumkan percepatan proses perizinan produk asuransi mikro, dengan target minimal 10 produk baru dari berbagai perusahaan asuransi yang dirancang khusus untuk segmen UMKM perempuan dengan premi di bawah Rp50.000 per bulan.
        </p>
      </>
    ),
  },
  {
    img: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=400&h=260&fit=crop&auto=format',
    alt: 'Celengan di atas meja kayu',
    title: 'Tips Kelola THR/Bonus Biar Nggak Habis dalam Seminggu',
    ringkasan: 'Strategi sederhana alokasikan pendapatan ekstra agar tetap punya tabungan setelah momen spesial.',
    sumber: 'Kontan',
    tanggal: '20 Jul 2026',
    content: (
      <>
        <p style={{ marginBottom: 16 }}>
          THR atau bonus akhir tahun sering terasa seperti "uang tiba-tiba" — dan karena terasa seperti rezeki nomplok, godaan untuk langsung membelanjakannya sangat besar. Survei dari salah satu platform perbankan digital menunjukkan bahwa rata-rata THR masyarakat Indonesia habis dalam 10 hari pertama setelah diterima.
        </p>
        <p style={{ fontWeight: 700, fontSize: 16, color: C.dark, marginBottom: 10 }}>Formula alokasi THR yang masuk akal</p>
        <p style={{ marginBottom: 16 }}>
          Keuangan pribadimu akan jauh lebih sehat jika kamu mengalokasikan THR sebelum membelanjakannya. Formula yang bisa kamu coba: <strong>50% untuk kebutuhan pokok dan cicilan</strong> yang mungkin tertunda, <strong>20% untuk tabungan atau dana darurat</strong>, <strong>20% untuk proteksi</strong> (bayar premi asuransi tahunan, misalnya), dan baru <strong>10% sisanya untuk kesenangan</strong>.
        </p>
        <p style={{ marginBottom: 16 }}>
          Tidak ada formula ajaib yang cocok untuk semua orang — yang penting ada komitmen untuk tidak menghabiskan semuanya sebelum ada porsi yang masuk tabungan.
        </p>
        <div style={{ background: `${C.amber}15`, borderLeft: `3px solid ${C.amber}`, borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 14 }}>
          <strong>💡 Tips:</strong> Langsung transfer porsi tabungan ke rekening terpisah di hari yang sama saat THR masuk. Kalau menunggu, biasanya tidak jadi ditabung.
        </div>
      </>
    ),
  },
  {
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=260&fit=crop&auto=format',
    alt: 'Kalkulasi keuangan',
    title: 'Kenapa Makin Banyak Anak Muda Beli Asuransi Lewat Aplikasi?',
    ringkasan: 'Kemudahan digital mendorong generasi muda mulai melek perlindungan finansial sejak dini.',
    sumber: 'Kompas',
    tanggal: '17 Jul 2026',
  },
  {
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=260&fit=crop&auto=format',
    alt: 'Suasana toko usaha kecil',
    title: 'Cerita Sukses: Dari Warung Rumahan ke Omzet Puluhan Juta',
    ringkasan: 'Pemisahan keuangan usaha ternyata adalah kunci yang mengubah segalanya bagi Bu Lestari.',
    sumber: 'Tempo',
    tanggal: '14 Jul 2026',
  },
  {
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=260&fit=crop&auto=format',
    alt: 'Grafik investasi',
    title: 'Waspada Pinjol Berkedok Investasi: Ini Ciri-cirinya',
    ringkasan: 'OJK kembali memperingatkan modus baru pinjaman online ilegal yang menyaru sebagai platform investasi.',
    sumber: 'OJK',
    tanggal: '10 Jul 2026',
  },
]

function BeritaSection() {
  const [openBerita, setOpenBerita] = useState<BeritaItem | null>(null)
  const featured = beritaData[0]
  const feed = beritaData.slice(1)

  return (
    <>
      {openBerita && <BeritaModal item={openBerita} onClose={() => setOpenBerita(null)} />}
      <Section id="berita" bg={C.white}>
        <div style={{ marginBottom: 40 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, letterSpacing: 1.2, textTransform: 'uppercase' }}>
            Update Finansial
          </span>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: C.dark, lineHeight: 1.25, marginTop: 8, letterSpacing: -0.5 }}>
            Buat Kamu — Dikurasi Setiap Minggu
          </h2>
          <p style={{ fontSize: 15, color: C.gray, marginTop: 10 }}>
            Bukan berita acak, tapi yang relevan untuk perjalanan finansialmu.
          </p>
        </div>

        {/* Featured */}
        <div
          onClick={() => setOpenBerita(featured)}
          style={{
            borderRadius: 20, overflow: 'hidden', display: 'grid',
            gridTemplateColumns: '1fr 1fr', background: C.bgAlt,
            border: '1px solid #E8EEF2', marginBottom: 32, cursor: 'pointer',
            transition: 'box-shadow 0.2s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(0,0,0,0.1)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = 'none')}
        >
          <div style={{ height: 300, overflow: 'hidden', background: C.bgAlt }}>
            <img src={featured.img} alt={featured.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
              <span style={{ background: `${C.blue}15`, color: C.blue, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99 }}>
                {featured.sumber}
              </span>
              <span style={{ fontSize: 12, color: C.gray }}>Paling Dibaca</span>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: C.dark, lineHeight: 1.35, marginBottom: 14 }}>{featured.title}</h3>
            <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.65, marginBottom: 20 }}>{featured.ringkasan}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: C.gray }}>{featured.tanggal}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.blue }}>Baca selengkapnya →</span>
            </div>
          </div>
        </div>

        {/* Feed grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {feed.map((item, i) => (
            <article
              key={i}
              onClick={() => setOpenBerita(item)}
              style={{
                background: C.white, border: '1px solid #E8EEF2', borderRadius: 16,
                overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <div style={{ height: 150, overflow: 'hidden', background: C.bgAlt }}>
                <img src={item.img} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'center' }}>
                  <span style={{ background: C.bgAlt, color: C.gray, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99 }}>
                    {item.sumber}
                  </span>
                  <span style={{ fontSize: 11, color: C.gray }}>{item.tanggal}</span>
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: C.dark, lineHeight: 1.45, marginBottom: 8 }}>{item.title}</h3>
                {item.content && <span style={{ fontSize: 12, color: C.blue, fontWeight: 600 }}>Baca →</span>}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  )
}

// ─── Komunitas Section ────────────────────────────────────────────────────────
const videoThumb = [
  { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&h=420&fit=crop&auto=format', name: '@nadia_preloved' },
  { img: 'https://images.unsplash.com/photo-1604742520944-332677d8dda8?w=240&h=420&fit=crop&auto=format', name: '@busari_kue' },
  { img: 'https://images.unsplash.com/photo-1712129461267-9de68dfc6fcb?w=240&h=420&fit=crop&auto=format', name: '@fitri_arisan' },
  { img: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=240&h=420&fit=crop&auto=format', name: '@retno_umkm' },
]

function KomunitasSection() {
  return (
    <Section id="komunitas" bg={C.bgAlt}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        {/* Left */}
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, letterSpacing: 1.2, textTransform: 'uppercase' }}>
            Komunitas
          </span>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, color: C.dark, lineHeight: 1.25, margin: '10px 0 16px', letterSpacing: -0.5 }}>
            Kamu Nggak Sendirian
          </h2>
          <p style={{ fontSize: 15, color: C.gray, lineHeight: 1.7, marginBottom: 32 }}>
            Ribuan perempuan Indonesia sudah mulai perjalanan proteksi finansialnya bersama SHE-UP! — di arisan RT, di kampus, maupun di media sosial.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 36, flexWrap: 'wrap' }}>
            {[
              { num: '42', label: 'Kelompok Arisan Proteksi' },
              { num: '1.200+', label: 'Peserta Aktif' },
              { num: '380+', label: 'Video Challenge' },
            ].map(s => (
              <div key={s.num} style={{ borderLeft: `3px solid ${C.amber}`, paddingLeft: 14 }}>
                <p style={{ fontSize: 26, fontWeight: 800, color: C.dark }}>{s.num}</p>
                <p style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Challenge CTA */}
          <div
            style={{
              background: `linear-gradient(135deg, ${C.blue}, #005490)`,
              borderRadius: 18,
              padding: '24px',
              marginBottom: 20,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', right: -30, bottom: -30, pointerEvents: 'none' }}>
              <Radar size={140} color={C.sky} opacity={0.2} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.amber, letterSpacing: 1, textTransform: 'uppercase' }}>
              #SHEUPChallenge
            </span>
            <p style={{ fontSize: 16, fontWeight: 700, color: C.white, lineHeight: 1.4, margin: '8px 0 16px' }}>
              Bikin Video Langkah Finansialmu & Menangkan Hadiah!
            </p>
            <button
              style={{
                background: C.amber, border: 'none', borderRadius: 9,
                padding: '10px 20px', fontSize: 13, fontWeight: 700,
                color: C.dark, cursor: 'pointer',
              }}
            >
              Ikutan Sekarang →
            </button>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <a
              href="https://chat.whatsapp.com/IVMV6hF4LqeDatmc5KrnOs"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                background: '#25D366', border: 'none', borderRadius: 12,
                padding: '13px', fontSize: 13, fontWeight: 700,
                color: C.white, cursor: 'pointer', textDecoration: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Bunda SHE-aga
            </a>
            <a
              href="https://chat.whatsapp.com/FFZWdkUKOV1Iqg1rXU5CSF"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                background: C.white, border: `2px solid #25D366`, borderRadius: 12,
                padding: '13px', fontSize: 13, fontWeight: 700,
                color: '#25D366', cursor: 'pointer', textDecoration: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              SHEUP Squad Kampus
            </a>
          </div>
        </div>

        {/* Right — video grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {videoThumb.map((v, i) => (
            <div
              key={i}
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                aspectRatio: '9/16',
                background: C.bgAlt,
                position: 'relative',
                cursor: 'pointer',
                marginTop: i % 2 === 1 ? 24 : 0,
              }}
            >
              <img src={v.img} alt={`Video dari ${v.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />
              <div
                style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%,-50%)',
                  background: 'rgba(0,0,0,0.35)',
                  borderRadius: 99, width: 40, height: 40,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              </div>
              <p style={{ position: 'absolute', bottom: 10, left: 10, fontSize: 11, fontWeight: 600, color: 'white' }}>
                {v.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── Proteksi Section ────────────────────────────────────────────────────────
const produkProteksi = [
  {
    tag: 'Paling Terjangkau',
    name: 'Asuransi Mikro Warisanku',
    by: 'Asuransi Astra',
    desc: 'Proteksi kecelakaan diri dengan premi paling terjangkau. Memberikan santunan tunai kepada ahli waris jika peserta meninggal dunia karena kecelakaan atau sakit.',
    premi: 'Rp30.000',
    periode: '',
    manfaat: 'Santunan tunai ke ahli waris',
    highlights: [
      'Premi hanya Rp30.000 — cocok untuk siapapun',
      'Santunan tunai langsung ke keluarga',
      'Aktivasi mudah via SMS voucher',
    ],
    cocokUntuk: 'Semua perempuan',
    persona: 'both',
    cta: 'Lihat Produk',
    url: 'https://www.asuransiastra.com/retail/mikro/',
    color: C.blue,
  },
  {
    tag: 'Untuk Kesehatan',
    name: 'Garda Healthtech',
    by: 'Asuransi Astra',
    desc: 'Asuransi kesehatan individual dengan manfaat rawat jalan. Jaringan provider rumah sakit luas di dalam dan luar negeri untuk ketenangan pikiranmu.',
    premi: 'Hubungi Asuransi Astra',
    periode: '',
    manfaat: 'Rawat jalan & rawat inap',
    highlights: [
      'Jaringan RS luas dalam & luar negeri',
      'Manfaat rawat jalan inklusif',
      '#SehatmuTerlindungi',
    ],
    cocokUntuk: 'Semua perempuan',
    persona: 'both',
    cta: 'Lihat Produk',
    url: 'https://www.asuransiastra.com/health/',
    color: C.green,
  },
  {
    tag: 'Proteksi Diri & Keluarga',
    name: 'Garda Me',
    by: 'Asuransi Astra',
    desc: 'Produk asuransi personal yang dirancang untuk perlindungan diri dan keluarga dalam kehidupan sehari-hari — dari risiko kecelakaan hingga kebutuhan darurat.',
    premi: 'Premi fleksibel',
    periode: '',
    manfaat: 'Proteksi personal & keluarga',
    highlights: [
      'Proteksi diri & keluarga',
      'Mudah diakses secara digital',
      'Klaim cepat dan transparan',
    ],
    cocokUntuk: 'Keluarga muda & mompreneur',
    persona: 'both',
    cta: 'Lihat Produk',
    url: 'https://www.asuransiastra.com/retail/',
    color: '#9B59B6',
  },
  {
    tag: 'Untuk Kendaraan Usaha',
    name: 'Garda Motor',
    by: 'Asuransi Astra',
    desc: 'Proteksi sepeda motor dari risiko kerusakan dan kehilangan. Untuk kamu yang mengandalkan motor untuk operasional usaha harian — agar usaha tidak terganggu saat musibah datang.',
    premi: 'Premi sesuai kendaraan',
    periode: '',
    manfaat: 'Proteksi kerusakan & kehilangan',
    highlights: [
      'Proteksi kerusakan & kehilangan motor',
      'Layanan darurat 24 jam Garda Siaga',
      'Klaim mudah dan cepat',
    ],
    cocokUntuk: 'Ibu pelaku UMKM',
    persona: 'mom',
    cta: 'Lihat Produk',
    url: 'https://www.asuransiastra.com/retail/',
    color: C.amber,
  },
]

function ProteksiSection() {
  const [filter, setFilter] = useState<'all' | 'mom' | 'muda'>('all')

  const filtered =
    filter === 'all'
      ? produkProteksi
      : produkProteksi.filter(p => p.persona === filter || p.persona === 'both')

  return (
    <section
      id="proteksi"
      style={{
        background: C.dark,
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture */}
      <div style={{ position: 'absolute', right: -100, top: -100, pointerEvents: 'none' }}>
        <Radar size={480} color={C.sky} opacity={0.05} />
      </div>
      <div style={{ position: 'absolute', left: -80, bottom: -80, pointerEvents: 'none' }}>
        <Radar size={300} color={C.amber} opacity={0.05} />
      </div>

      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
          <div style={{ maxWidth: 520 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.amber, letterSpacing: 1.2, textTransform: 'uppercase' }}>
                Didukung oleh
              </span>
              <span
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 6,
                  padding: '3px 10px',
                  fontSize: 12,
                  fontWeight: 700,
                  color: C.white,
                  letterSpacing: 0.3,
                }}
              >
                Asuransi Astra
              </span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.5vw, 40px)',
                fontWeight: 800,
                color: C.white,
                lineHeight: 1.2,
                letterSpacing: -0.8,
                marginBottom: 14,
              }}
            >
              Sudah tahu risikomu?<br />Saatnya pilih proteksinya.
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
              Proteksi bukan soal takut — ini soal siap. Produk-produk di bawah ini kami pilihkan khusus sesuai kebutuhan perempuan Indonesia, dengan premi yang nyata terjangkau.
            </p>
          </div>

          {/* Filter */}
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { id: 'all' as const, label: 'Semua' },
              { id: 'mom' as const, label: 'Untuk Mompreneurs' },
              { id: 'muda' as const, label: 'Untuk Perempuan Muda' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  background: filter === f.id ? C.amber : 'rgba(255,255,255,0.07)',
                  border: `1.5px solid ${filter === f.id ? C.amber : 'rgba(255,255,255,0.12)'}`,
                  borderRadius: 99,
                  padding: '8px 18px',
                  fontSize: 13,
                  fontWeight: 600,
                  color: filter === f.id ? C.dark : 'rgba(255,255,255,0.65)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Program LENTERA strip */}
        <div
          style={{
            background: 'rgba(255,183,33,0.08)',
            border: '1px solid rgba(255,183,33,0.2)',
            borderRadius: 14,
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 32,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: `${C.amber}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: 20,
            }}
          >
            💡
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.amber, marginBottom: 3 }}>
              Program LENTERA — Literasi Keuangan Terpadu Asuransi Astra
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
              Program edukasi keuangan digital khusus perempuan pelaku UMKM. Bagian dari kampanye{' '}
              <span style={{ color: C.amber }}>#PerempuanBermakna</span> Asuransi Astra.
            </p>
          </div>
          <a
            href="https://www.astralife.co.id"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'rgba(255,183,33,0.15)',
              border: '1px solid rgba(255,183,33,0.3)',
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 12,
              fontWeight: 700,
              color: C.amber,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Info Lebih Lanjut →
          </a>
        </div>

        {/* Product cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {filtered.map((p, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = p.color + '60'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              {/* Card top bar */}
              <div style={{ height: 4, background: p.color }} />

              <div style={{ padding: '22px 22px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span
                    style={{
                      background: p.color + '20',
                      color: p.color,
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 99,
                      letterSpacing: 0.3,
                    }}
                  >
                    {p.tag}
                  </span>
                </div>

                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: 0.5, marginBottom: 4 }}>
                  {p.by}
                </p>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: C.white, marginBottom: 10, lineHeight: 1.2 }}>
                  {p.name}
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: 20 }}>
                  {p.desc}
                </p>

                {/* Premi block */}
                <div
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 12,
                    padding: '14px 16px',
                    marginBottom: 18,
                    borderLeft: `3px solid ${p.color}`,
                  }}
                >
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Premi / Biaya</p>
                  <p style={{ fontSize: 20, fontWeight: 800, color: C.white }}>
                    {p.premi}
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.45)' }}>{p.periode}</span>
                  </p>
                  <p style={{ fontSize: 12, color: p.color, marginTop: 4, fontWeight: 600 }}>
                    {p.manfaat}
                  </p>
                </div>

                {/* Highlights */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {p.highlights.map((h, j) => (
                    <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                      <span style={{ color: p.color, fontWeight: 800, flexShrink: 0 }}>✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cocok untuk */}
              <div
                style={{
                  margin: '0 22px 16px',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 8,
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Cocok untuk:</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{p.cocokUntuk}</span>
              </div>

              {/* CTA */}
              <div style={{ padding: '0 22px 22px', marginTop: 'auto' }}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    background: p.color,
                    border: 'none',
                    borderRadius: 12,
                    padding: '13px',
                    fontSize: 14,
                    fontWeight: 700,
                    color: p.color === C.amber ? C.dark : C.white,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                >
                  {p.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: 10 }}>
                  Kamu akan diarahkan ke situs resmi Asuransi Astra
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.3)',
            textAlign: 'center',
            marginTop: 36,
            lineHeight: 1.6,
            maxWidth: 600,
            margin: '36px auto 0',
          }}
        >
          Informasi produk bersifat edukatif dan dapat berubah sewaktu-waktu. Untuk detail lengkap, syarat & ketentuan,
          serta pembelian resmi silakan kunjungi situs resmi Asuransi Astra atau hubungi agen terverifikasi.
        </p>
      </div>
    </section>
  )
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section
      style={{
        background: `linear-gradient(135deg, ${C.dark} 0%, #0D1929 100%)`,
        padding: '80px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
        <Radar size={500} color={C.sky} opacity={0.06} />
      </div>
      <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: C.amber, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16 }}>
          Mulai Sekarang
        </p>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: C.white, lineHeight: 1.2, letterSpacing: -1, marginBottom: 16 }}>
          Satu langkah kecil hari ini,<br />proteksi besar untuk masa depanmu.
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: 36 }}>
          Bergabung bersama lebih dari 1.200 perempuan Indonesia yang sudah mulai perjalanan finansialnya.
        </p>
        <a
          href="#risiko"
          onClick={e => { e.preventDefault(); document.querySelector('#risiko')?.scrollIntoView({ behavior: 'smooth' }) }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: C.amber, color: C.dark, textDecoration: 'none',
            borderRadius: 12, padding: '16px 32px',
            fontSize: 17, fontWeight: 800,
            boxShadow: `0 8px 28px ${C.amber}50`,
          }}
        >
          Cek Risiko Finansialku →
        </a>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.dark, padding: '48px 24px 32px' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 40, marginBottom: 48, flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontSize: 22, fontWeight: 800, color: C.white }}>
              SHE-<span style={{ color: C.amber }}>UP!</span>
            </span>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginTop: 14, maxWidth: 280 }}>
              Ekosistem literasi dan proteksi finansial untuk perempuan Indonesia lintas generasi.
            </p>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
              Fitur
            </p>
            {['Cek Risiko', 'Edukasi', 'Berita', 'Komunitas'].map(l => (
              <p key={l} style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginBottom: 8, cursor: 'pointer' }}>{l}</p>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
              Info
            </p>
            {['Instagram', 'Kontak', 'Kebijakan Privasi', 'Tentang Program'].map(l => (
              <p key={l} style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginBottom: 8, cursor: 'pointer' }}>{l}</p>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
            SHE-UP! adalah bagian dari inisiatif ACTION! 2026 — Asuransi Astra · © 2026
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Responsive CSS ───────────────────────────────────────────────────────────
const responsiveStyle = `
  @media (max-width: 700px) {
    .desktop-nav { display: none !important; }
    .hamburger { display: flex !important; }
  }
  @media (min-width: 701px) {
    .hamburger { display: none !important; }
  }
  @media (max-width: 768px) {
    .two-col { grid-template-columns: 1fr !important; }
    .feat-grid { grid-template-columns: 1fr !important; }
  }
`

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState('beranda')

  // Intersection observer for active nav
  useEffect(() => {
    const ids = ['beranda', 'risiko', 'edukasi', 'berita', 'komunitas', 'proteksi']
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{responsiveStyle}</style>
      <Navbar active={activeSection} />
      <main>
        <Hero />

        {/* riSHEko Tracker — dark section */}
        <section
          id="risiko"
          style={{
            background: `linear-gradient(135deg, ${C.dark} 0%, #0B1520 100%)`,
            padding: '96px 24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative' }}>
            <RisikoSection />
          </div>
        </section>

        <EdukasiSection />
        <BeritaSection />
        <KomunitasSection />
        <ProteksiSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
