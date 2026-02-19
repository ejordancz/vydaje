import React, { useState, useEffect, useCallback, useRef } from 'react'

const WHO_OPTIONS = [
  { value: 'Mira', label: 'Mira', icon: PersonIcon },
  { value: 'Bohunka', label: 'Bohunka', icon: WomanIcon },
]
const CURRENCY_OPTIONS = [
  { value: 'CZK', label: 'CZK', symbol: 'Kč', icon: CzkIcon },
  { value: 'EUR', label: 'EUR', symbol: '€', icon: EurIcon },
]
const TYPE_OPTIONS = [
  { value: 'jídlo', label: 'Jídlo', icon: FoodIcon },
  { value: 'doprava', label: 'Doprava', icon: TransportIcon },
  { value: 'ubytování', label: 'Ubytování', icon: BedIcon },
  { value: 'vstupné', label: 'Vstupné', icon: TicketIcon },
  { value: 'ostatní', label: 'Ostatní', icon: OtherIcon },
]

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
function WomanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <path d="M8 9.5 Q5 14 5 21" />
      <path d="M16 9.5 Q19 14 19 21" />
    </svg>
  )
}
function CzkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}
function EurIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 2h-4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h4M9 8h6M9 12h6" />
    </svg>
  )
}
function FoodIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  )
}
function TransportIcon() {
  // jednoduchá ikonka auta
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h14l2 3v4H3v-4z" />          {/* karoserie */}
      <path d="M6 12l1.5-4h7L16 12" />           {/* kabina */}
      <circle cx="7" cy="19" r="1.5" />         {/* levé kolo */}
      <circle cx="17" cy="19" r="1.5" />        {/* pravé kolo */}
      <path d="M5 12h3" />                       {/* levé světlo / detail */}
      <path d="M14 12h3" />                      {/* pravé světlo / detail */}
    </svg>
  )
}
function BedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16" />
      <path d="M2 8h20a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
    </svg>
  )
}
function OtherIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}
function TicketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  )
}
function PaymentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M9 15h2" />
      <path d="M13 15h2" />
    </svg>
  )
}
function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  )
}
function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

const API = '/api'

async function apiJson(res) {
  const contentType = res.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    const text = await res.text()
    if (text.trimStart().startsWith('<')) {
      throw new Error('Server vrátil HTML místo dat. Zkontrolujte, že API běží na správné adrese.')
    }
    throw new Error(text || 'Chyba serveru')
  }
  return res.json()
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleTimeString('cs-CZ', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatNum(n) {
  if (n == null) return '–'
  return Number(n).toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatCzk(n) {
  if (n == null) return '–'
  return Math.round(Number(n)).toLocaleString('cs-CZ', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

function formatByCurrency(n, currency) {
  if (n == null) return '–'
  let digits = 2
  if (currency === 'CZK') digits = 0
  else if (currency === 'EUR') digits = 1
  return Number(n).toLocaleString('cs-CZ', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

function dateDayKey(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toISOString().slice(0, 10)
}

function formatDayLabel(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('cs-CZ', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })
}

function toDatetimeLocal(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${day}T${h}:${min}`
}

function fromDatetimeLocal(s) {
  if (!s) return null
  const d = new Date(s)
  return isNaN(d.getTime()) ? null : d.toISOString()
}

function getTypeIcon(rec) {
  const key = rec.payee ? 'splátka' : rec.type
  switch (key) {
    case 'jídlo':
      return FoodIcon
    case 'doprava':
      return TransportIcon
    case 'ubytování':
      return BedIcon
    case 'vstupné':
      return TicketIcon
    case 'splátka':
      return PaymentIcon
    default:
      return OtherIcon
  }
}

const PREF_KEY = 'vydajePrefs'

export default function App({ token, onUnauthorized }) {
  const authFetch = useCallback(
    (url, opts = {}) => {
      const headers = { ...opts.headers, Authorization: `Bearer ${token}` }
      return fetch(url, { ...opts, headers }).then((res) => {
        if (res.status === 401) onUnauthorized()
        return res
      })
    },
    [token, onUnauthorized]
  )
  const [records, setRecords] = useState([])
  const [rates, setRates] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [showForm, setShowForm] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [who, setWho] = useState('Mira')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('CZK')
  const [type, setType] = useState('ostatní')
  const [dateTime, setDateTime] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [note, setNote] = useState('')
  const [paymentWho, setPaymentWho] = useState('Mira')
  const [paymentTo, setPaymentTo] = useState('Bohunka')
  const [paymentAmount, setPaymentAmount] = useState('')
  const [paymentCurrency, setPaymentCurrency] = useState('CZK')
  const [paymentDateTime, setPaymentDateTime] = useState('')
  const [paymentSubmitting, setPaymentSubmitting] = useState(false)
  const [editingPaymentId, setEditingPaymentId] = useState(null)
  const [detailRecord, setDetailRecord] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const amountInputRef = useRef(null)

  // Po otevření formuláře fokus na pole částky (pro zobrazení klávesnice na mobilu)
  useEffect(() => {
    if (showForm) {
      const t = setTimeout(() => amountInputRef.current?.focus(), 100)
      return () => clearTimeout(t)
    }
  }, [showForm])

  // Načtení předchozích voleb (kdo, měna, typ, kdo platí, měna splátky)
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = window.localStorage.getItem(PREF_KEY)
      if (!raw) return
      const prefs = JSON.parse(raw)
      if (prefs.who) setWho(prefs.who)
      if (prefs.currency) setCurrency(prefs.currency)
      if (prefs.type) setType(prefs.type)
      if (prefs.paymentWho) setPaymentWho(prefs.paymentWho)
      if (prefs.paymentCurrency) setPaymentCurrency(prefs.paymentCurrency)
    } catch (_) {
      // ignoruj chyby při parsování
    }
  }, [])

  const savePrefs = (partial) => {
    if (typeof window === 'undefined') return
    try {
      const raw = window.localStorage.getItem(PREF_KEY)
      const current = raw ? JSON.parse(raw) : {}
      const next = { ...current, ...partial }
      window.localStorage.setItem(PREF_KEY, JSON.stringify(next))
    } catch (_) {
      // při chybě jen neukládej
    }
  }

  const loadRecords = useCallback(async () => {
    try {
      const r = await authFetch(`${API}/records`)
      if (!r.ok) throw new Error('Načtení se nezdařilo')
      const data = await apiJson(r)
      setRecords(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [authFetch])

  const loadRates = useCallback(async () => {
    try {
      const r = await authFetch(`${API}/rates`)
      if (r.ok) {
        const data = await apiJson(r)
        setRates(data)
      }
    } catch (_) {}
  }, [authFetch])

  useEffect(() => {
    loadRecords()
    loadRates()
  }, [loadRecords, loadRates])

  const currentRate = currency === 'CZK' ? 1 : rates[currency]
  const amountNum = parseFloat(amount) || 0
  const czkPreview = currentRate != null && amountNum > 0
    ? formatCzk(amountNum * (currency === 'CZK' ? 1 : currentRate)) + ' CZK'
    : null

  const openNewForm = () => {
    setEditingId(null)
    setAmount('')
    // výchozí hodnoty necháme podle posledního použití (uložené v state/localStorage)
    setDateTime(toDatetimeLocal(new Date().toISOString()))
    setNote('')
    setShowForm(true)
    setError(null)
  }

  const startEdit = (rec) => {
    setEditingId(rec.id)
    setWho(rec.who)
    setAmount(String(rec.amount))
    setCurrency(rec.currency)
    setType(rec.type)
    setNote(rec.note || '')
    setDateTime(toDatetimeLocal(rec.date))
    setShowForm(true)
    setError(null)
  }

  const cancelForm = () => {
    setShowForm(false)
    setEditingId(null)
    setAmount('')
    setCurrency('CZK')
    setType('ostatní')
    setDateTime('')
    setNote('')
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const am = parseFloat(amount)
    if (!amount || isNaN(am) || am <= 0) {
      setError('Zadejte platnou částku.')
      return
    }
    setSubmitting(true)
    try {
      if (editingId) {
        const body = { who, amount: am, type, note }
        const dateIso = fromDatetimeLocal(dateTime)
        if (dateIso) body.date = dateIso
        const r = await authFetch(`${API}/records/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await apiJson(r)
        if (!r.ok) throw new Error(data.detail || 'Uložení se nezdařilo')
        setRecords((prev) => prev.map((rec) => (rec.id === editingId ? data : rec)))
        cancelForm()
      } else {
        const body = {
          who,
          amount: am,
          currency,
          type,
          note,
        }
        const dateIso = fromDatetimeLocal(dateTime)
        if (dateIso) body.date = dateIso
        if (currency !== 'CZK' && currentRate != null) {
          body.rate = currentRate
        }
        const r = await authFetch(`${API}/records`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await apiJson(r)
        if (!r.ok) throw new Error(data.detail || 'Uložení se nezdařilo')
        setRecords((prev) => [data, ...prev])
        savePrefs({ who, currency, type })
        setAmount('')
        setShowForm(false)
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    const numId = Number(id)
    const r = await authFetch(`${API}/records/${numId}`, { method: 'DELETE' })
    if (!r.ok) {
      const err = await r.json().catch(() => ({}))
      throw new Error(err.detail || 'Smazání se nezdařilo')
    }
    setRecords((prev) => prev.filter((rec) => Number(rec.id) !== numId))
    if (editingId === numId) cancelForm()
  }

  const openDetail = (rec) => {
    setDetailRecord(rec)
    setConfirmDelete(false)
    setError(null)
  }

  const closeDetail = () => {
    setDetailRecord(null)
    setConfirmDelete(false)
  }

  const handleDetailEdit = () => {
    if (!detailRecord) return
    if (detailRecord.payee) {
      startEditPayment(detailRecord)
    } else {
      startEdit(detailRecord)
      setDetailRecord(null)
    }
  }

  const handleDetailDelete = async () => {
    if (!detailRecord) return
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    try {
      await handleDelete(detailRecord.id)
      setDetailRecord(null)
      setConfirmDelete(false)
    } catch (e) {
      setError(e.message)
    }
  }

  const openPaymentForm = () => {
    setEditingPaymentId(null)
    setPaymentTo(paymentWho === 'Mira' ? 'Bohunka' : 'Mira')
    setPaymentAmount('')
    setPaymentCurrency('CZK')
    setPaymentDateTime(toDatetimeLocal(new Date().toISOString()))
    setShowPaymentForm(true)
    setError(null)
  }

  const startEditPayment = (rec) => {
    setEditingPaymentId(rec.id)
    setPaymentWho(rec.who)
    setPaymentTo(rec.payee || (rec.who === 'Mira' ? 'Bohunka' : 'Mira'))
    setPaymentAmount(String(rec.amount))
    setPaymentCurrency(rec.currency || 'CZK')
    setPaymentDateTime(toDatetimeLocal(rec.date))
    setNote(rec.note || '')
    setShowPaymentForm(true)
    setDetailRecord(null)
    setError(null)
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const am = parseFloat(paymentAmount)
    if (!paymentAmount || isNaN(am) || am <= 0) {
      setError('Zadejte platnou částku.')
      return
    }
    if (paymentWho === paymentTo) {
      setError('Kdo a komu musí být různé osoby.')
      return
    }
    setPaymentSubmitting(true)
    try {
      const dateIso = fromDatetimeLocal(paymentDateTime) || new Date().toISOString()
      if (editingPaymentId) {
        const body = {
          who: paymentWho,
          amount: am,
          type: 'splátka',
          payee: paymentTo,
          date: dateIso,
          note,
        }
        const r = await authFetch(`${API}/records/${editingPaymentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await apiJson(r)
        if (!r.ok) throw new Error(data.detail || 'Uložení se nezdařilo')
        setRecords((prev) => prev.map((rec) => (rec.id === editingPaymentId ? data : rec)))
        setShowPaymentForm(false)
        setPaymentAmount('')
        setPaymentDateTime('')
        setEditingPaymentId(null)
      } else {
        const body = {
          who: paymentWho,
          amount: am,
          currency: paymentCurrency,
          type: 'splátka',
          payee: paymentTo,
          date: dateIso,
          note,
        }
        if (paymentCurrency !== 'CZK') {
          const rate = rates[paymentCurrency]
          if (rate != null) body.rate = rate
        }
        const r = await authFetch(`${API}/records`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await apiJson(r)
        if (!r.ok) throw new Error(data.detail || 'Uložení se nezdařilo')
        setRecords((prev) => [data, ...prev])
        savePrefs({ paymentWho, paymentCurrency })
        setShowPaymentForm(false)
        setPaymentAmount('')
        setPaymentDateTime('')
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setPaymentSubmitting(false)
    }
  }

  const expenseRecords = records.filter((r) => !r.payee)
  const totalCzk = expenseRecords.reduce((s, r) => s + Number(r.amount_czk || 0), 0)
  const expenseDayKeys = [...new Set(expenseRecords.map((r) => dateDayKey(r.date)))].sort().reverse()
  const dayCount = expenseDayKeys.length
  const avgPerDay = dayCount > 0 ? totalCzk / dayCount : 0

  const totalByWho = { Mira: 0, Bohunka: 0 }
  expenseRecords.forEach((r) => {
    if (totalByWho[r.who] !== undefined) totalByWho[r.who] += Number(r.amount_czk || 0)
  })
  const paidByMiraToBohunka = records
    .filter((r) => r.payee === 'Bohunka' && r.who === 'Mira')
    .reduce((s, r) => s + Number(r.amount_czk || 0), 0)
  const paidByBohunkaToMira = records
    .filter((r) => r.payee === 'Mira' && r.who === 'Bohunka')
    .reduce((s, r) => s + Number(r.amount_czk || 0), 0)
  const fairShare = totalCzk / 2
  // Mira má zaplaceno: výdaje - splátky, které poslala, + splátky, které přijala.
  // Kladný balanceMira => Bohunka dluží Míře.
  const balanceMira = totalByWho.Mira - fairShare - paidByBohunkaToMira + paidByMiraToBohunka
  const debtAmount = balanceMira > 0 ? balanceMira : -balanceMira
  const debtSharePercent =
    totalCzk > 0 && debtAmount > 0
      ? Math.round((Number(debtAmount) / Number(totalCzk)) * 1000) / 10
      : 0

  const dayKeys = [...new Set(records.map((r) => dateDayKey(r.date)))].sort().reverse()
  const recordsByDay = dayKeys.map((key) => {
    const dayRecords = records.filter((r) => dateDayKey(r.date) === key)
    const dayTotal = dayRecords.filter((r) => !r.payee).reduce((s, r) => s + Number(r.amount_czk || 0), 0)
    return { key, label: formatDayLabel(dayRecords[0]?.date), records: dayRecords, dayTotal }
  })

  // Statistika podle typu (jen výdaje, bez splátek)
  const typeTotals = expenseRecords.reduce(
    (acc, r) => {
      const key = r.type || 'ostatní'
      acc[key] = (acc[key] || 0) + Number(r.amount_czk || 0)
      return acc
    },
    {},
  )

  return (
    <div className="app">
      {!showForm && !showPaymentForm && (
        <button
          type="button"
          className="fab-add"
          onClick={openNewForm}
          aria-label="Přidat záznam"
        >
          <PlusIcon />
        </button>
      )}

      {showForm && (
        <div className="modal-backdrop" onClick={cancelForm} aria-hidden="true">
          <div className="modal-content form-card" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <div className="form-stack">
              <div className="form-group">
                <div className="amount-label-row">
                  <label htmlFor="record-amount">Částka platby</label>
                  {!editingId && currency !== 'CZK' && currentRate != null && (
                    <>
                      <span className="czk-preview czk-preview-inline">Kurz: {formatNum(currentRate)} Kč / 1 {currency}</span>
                      {amountNum > 0 && czkPreview && (
                        <span className="czk-preview czk-preview-inline">≈ {czkPreview}</span>
                      )}
                    </>
                  )}
                  {editingId && (() => {
                    const rec = records.find((r) => r.id === editingId)
                    return rec && rec.currency !== 'CZK' && rec.rate != null
                      ? <span className="czk-preview czk-preview-inline">Kurz: {formatNum(rec.rate)} Kč / 1 {rec.currency}</span>
                      : null
                  })()}
                </div>
                <div className="amount-currency-row">
                  <input
                    ref={amountInputRef}
                    id="record-amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0,00"
                    className="input-amount input-amount-short"
                  />
                  <button
                    type="button"
                    className="currency-square-btn"
                    onClick={() => setCurrency(currency === 'CZK' ? 'EUR' : 'CZK')}
                    disabled={!!editingId}
                    title={currency === 'CZK' ? 'Kliknutím přepnete na EUR' : 'Kliknutím přepnete na CZK'}
                  >
                    {currency === 'CZK' ? 'Kč' : '€'}
                  </button>
                  <button
                    type="button"
                    className={`who-square-btn who-${who === 'Mira' ? 'mira' : 'bohunka'}`}
                    onClick={() => setWho(who === 'Mira' ? 'Bohunka' : 'Mira')}
                    disabled={!!editingId}
                    title={who === 'Mira' ? 'Kliknutím přepnete na Bohunka' : 'Kliknutím přepnete na Mira'}
                  >
                    {(() => {
                      const WhoIcon = WHO_OPTIONS.find((o) => o.value === who)?.icon || PersonIcon
                      return <WhoIcon />
                    })()}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Typ</label>
                <div className="btn-group">
                  {TYPE_OPTIONS.map((opt) => {
                    const Icon = opt.icon
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        className={`btn-option btn-option-type ${type === opt.value ? 'selected' : ''}`}
                        onClick={() => setType(opt.value)}
                      >
                        <Icon />
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="form-group">
                <label>Popisek (volitelný)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  className="input-full input-note"
                  placeholder="Krátký popis platby…"
                />
              </div>
              <div className="form-group form-group-datetime">
                <label htmlFor="record-datetime">Datum a čas</label>
                <input
                  id="record-datetime"
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="input-datetime"
                />
              </div>
              <div className="form-group">
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Ukládám…' : 'Uložit'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={cancelForm}
                  >
                    Zrušit
                  </button>
                </div>
              </div>
            </div>
            {error && <p className="error-msg">{error}</p>}
          </form>
        </div>
        </div>
      )}

      {showPaymentForm && (
        <div className="modal-backdrop" onClick={() => { setShowPaymentForm(false); setError(null); setEditingPaymentId(null); }} aria-hidden="true">
          <div className="modal-content form-card" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handlePaymentSubmit}>
              <div className="form-stack">
                <div className="form-group form-group-datetime">
                  <label htmlFor="payment-datetime">Datum a čas</label>
                  <input
                    id="payment-datetime"
                    type="datetime-local"
                    value={paymentDateTime}
                    onChange={(e) => setPaymentDateTime(e.target.value)}
                    className="input-datetime"
                  />
                </div>
                <div className="form-group">
                  <label>Kdo platí</label>
                  <div className="btn-group">
                    {WHO_OPTIONS.map((opt) => {
                      const Icon = opt.icon
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          className={`btn-option ${paymentWho === opt.value ? 'selected' : ''}`}
                          onClick={() => {
                            setPaymentWho(opt.value)
                            setPaymentTo(opt.value === 'Mira' ? 'Bohunka' : 'Mira')
                          }}
                        >
                          <Icon />
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className="form-group">
                  <label>Komu</label>
                  <div className="btn-group">
                    {WHO_OPTIONS.filter((o) => o.value !== paymentWho).map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        className={`btn-option ${paymentTo === opt.value ? 'selected' : ''}`}
                        onClick={() => setPaymentTo(opt.value)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Částka</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="0,00"
                    className="input-full input-amount"
                  />
                </div>
                <div className="form-group">
                  <label>Měna</label>
                  <div className="btn-group">
                    {CURRENCY_OPTIONS.map((opt) => {
                      const Icon = opt.icon
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          className={`btn-option ${paymentCurrency === opt.value ? 'selected' : ''}`}
                          onClick={() => setPaymentCurrency(opt.value)}
                        >
                          <Icon />
                          {opt.label} {opt.symbol && `(${opt.symbol})`}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={paymentSubmitting}>
                    {paymentSubmitting ? 'Ukládám…' : 'Uložit splátku'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => { setShowPaymentForm(false); setError(null); setEditingPaymentId(null); }}
                  >
                    Zrušit
                  </button>
                </div>
              </div>
              {error && <p className="error-msg">{error}</p>}
            </form>
          </div>
        </div>
      )}

      {detailRecord && (
        <div className="modal-backdrop" onClick={closeDetail} aria-hidden="true">
          <div className="modal-content form-card" onClick={(e) => e.stopPropagation()}>
            <div className="detail-body">
              <div className="detail-icons-row">
                <span className={`detail-who-icon who-${detailRecord.who === 'Mira' ? 'mira' : 'bohunka'}`} title={detailRecord.who}>
                  {(() => {
                    const WhoIcon = WHO_OPTIONS.find((o) => o.value === detailRecord.who)?.icon || PersonIcon
                    return <WhoIcon />
                  })()}
                </span>
                <span className="detail-type-icon" title={detailRecord.payee ? `Splátka → ${detailRecord.payee}` : detailRecord.type}>
                  {React.createElement(getTypeIcon(detailRecord))}
                </span>
                <span className="detail-amount-inline">
                  {formatCzk(detailRecord.amount_czk)} Kč
                </span>
              </div>
              <div className="detail-datetime">
                {detailRecord.date
                  ? `${formatDayLabel(detailRecord.date)}, ${new Date(detailRecord.date).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}`
                  : '–'}
              </div>
              {detailRecord.currency !== 'CZK' && (
                <div className="detail-currency-muted">
                  {formatByCurrency(detailRecord.amount, detailRecord.currency)} {detailRecord.currency}
                  {detailRecord.rate != null && (
                    <> · Kurz: {formatNum(detailRecord.rate)} Kč / 1 {detailRecord.currency}</>
                  )}
                </div>
              )}
              {detailRecord.payee && (
                <div className="detail-grid-item">
                  <strong>Komu:</strong> {detailRecord.payee}
                </div>
              )}
              {detailRecord.note && (
                <div className="detail-note">
                  <span className="detail-note-text">{detailRecord.note}</span>
                </div>
              )}
            </div>
            <div className="detail-footer">
              {!confirmDelete ? (
                <>
                  <div className="detail-footer-left">
                    <button type="button" className="btn btn-secondary" onClick={handleDetailEdit}>
                      <EditIcon />
                    </button>
                    <button type="button" className="btn btn-danger" onClick={handleDetailDelete}>
                      <TrashIcon />
                    </button>
                  </div>
                  <button type="button" className="btn btn-secondary" onClick={closeDetail}>
                    Zavřít
                  </button>
                </>
              ) : (
                <div className="detail-confirm-row">
                  <span className="detail-confirm-text">Opravdu smazat?</span>
                  <div className="detail-confirm-btns">
                    <button type="button" className="btn btn-danger detail-confirm-btn" onClick={handleDetailDelete}>
                      Ano
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary detail-confirm-btn"
                      onClick={() => setConfirmDelete(false)}
                    >
                      Ne
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <h2 className="table-heading">
        <span className="table-heading-gray">Výdaje</span>
        <span className="table-heading-accent"> Malta 2026.02</span>
      </h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Čas</th>
              <th>Kdo</th>
              <th>Typ</th>
              <th className="num">CZK</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>Načítám…</td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td colSpan={4}>Zatím žádné záznamy.</td>
              </tr>
            ) : (
              recordsByDay.map(({ key, label, records: dayRecords, dayTotal }) => (
                <React.Fragment key={key}>
                  <tr className="day-header-row">
                    <td colSpan={3}>{label}</td>
                    <td className="num day-total">{formatCzk(dayTotal)} Kč</td>
                  </tr>
                  {dayRecords.map((rec) => (
                    <tr
                      key={rec.id}
                      className={rec.payee ? 'row-payment' : ''}
                      onClick={() => openDetail(rec)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{formatDate(rec.date)}</td>
                      <td>
                        <div className={`who-icon who-${rec.who === 'Mira' ? 'mira' : 'bohunka'}`} title={rec.who}>
                          {(() => {
                            const WhoIcon = WHO_OPTIONS.find((o) => o.value === rec.who)?.icon || PersonIcon
                            return <WhoIcon />
                          })()}
                        </div>
                      </td>
                      <td>
                        {(() => {
                          const TypeIcon = getTypeIcon(rec)
                          const label = rec.payee ? `Splátka → ${rec.payee}` : rec.type
                          return (
                            <div className="type-icon" title={label}>
                              <TypeIcon />
                            </div>
                          )
                        })()}
                      </td>
                      <td className="num">{formatCzk(rec.amount_czk)} Kč</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalCzk > 0 && (
        <div className="stats-panel">
          <div className="stats-block">
            <h3>Souhrn</h3>
            <ul>
              <li>
                <span>Celkem utraceno</span>
                <span className="stats-celkem-value">{formatCzk(totalCzk)} Kč</span>
              </li>
              <li>
                <span>Průměr za den</span>
                <span>{formatCzk(avgPerDay)} Kč</span>
              </li>
            </ul>
          </div>
          <div className="stats-block">
            <h3>Podle typu</h3>
            <ul>
              {Object.entries(typeTotals).map(([t, v]) => (
                <li key={t}>
                  <span>{t}</span>
                  <span>{formatCzk(v)} Kč</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="stats-block">
            <h3>Kdo komu dluží</h3>
            <ul>
              {Math.abs(balanceMira) < 0.01 ? (
                <li>
                  <span>Stav</span>
                  <span className="stats-debt-balanced">Účet vyrovnán.</span>
                </li>
              ) : (
                <>
                  <li>
                    <span>{balanceMira > 0 ? 'Bohunka dluží Mira' : 'Mira dluží Bohunka'}</span>
                    <button type="button" className="stats-debt-link" onClick={openPaymentForm}>
                      {formatCzk(debtAmount)} Kč
                    </button>
                  </li>
                  {debtSharePercent > 0 && (
                    <li>
                      <span>Sleva</span>
                      <span className="stats-debt-sleva-value">{debtSharePercent}%</span>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      )}
      <footer className="app-footer">
        <button type="button" className="footer-link" onClick={() => window.location.reload()}>
          Reload
        </button>
        <span className="footer-sep"> · </span>
        <button type="button" className="footer-logout" onClick={onUnauthorized}>
          Odhlásit
        </button>
      </footer>
    </div>
  )
}
