const _excluded = ["id"],
  _excluded2 = ["csvText", "fileName"],
  _excluded3 = ["id"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
const _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useCallback = _React.useCallback;
const CLUBS = ["4i", "5i", "6i", "7i", "8i", "9i", "PW", "GW", "SW", "LW"];
const STORAGE_KEY = "golf-fitting-lab-v4";

// ── Corrected smash factor ranges (physically realistic, elite ball striker scale)
// Green = elite, Yellow = solid amateur, Red = below threshold
// All other ranges: tour-level benchmarks scaled per club
const CLUB_RANGES = {
  "4i": {
    smash: [1.38, 1.42, 1.33, 1.38],
    launchAngle: [14, 17, 12, 19],
    attackAngle: [-5, -1, -7, 1],
    totalSpin: [4000, 5200, 3500, 5800],
    offlineSpread: [0, 28, 28, 38],
    peakHeight: [90, 130, 70, 145],
    descentAngle: [38, 46, 34, 50]
  },
  "5i": {
    smash: [1.37, 1.41, 1.32, 1.37],
    launchAngle: [15, 18, 13, 20],
    attackAngle: [-5, -1, -7, 1],
    totalSpin: [4500, 5700, 4000, 6300],
    offlineSpread: [0, 26, 26, 36],
    peakHeight: [88, 128, 68, 142],
    descentAngle: [39, 47, 35, 51]
  },
  "6i": {
    smash: [1.35, 1.39, 1.30, 1.35],
    launchAngle: [16, 20, 14, 22],
    attackAngle: [-5, -1, -7, 1],
    totalSpin: [5000, 6300, 4500, 6900],
    offlineSpread: [0, 24, 24, 34],
    peakHeight: [86, 124, 66, 138],
    descentAngle: [40, 48, 36, 52]
  },
  "7i": {
    smash: [1.33, 1.37, 1.28, 1.33],
    launchAngle: [18, 22, 16, 24],
    attackAngle: [-5, -1, -7, 1],
    totalSpin: [5500, 6800, 5000, 7400],
    offlineSpread: [0, 22, 22, 32],
    peakHeight: [84, 120, 64, 134],
    descentAngle: [42, 50, 38, 54]
  },
  "8i": {
    smash: [1.30, 1.34, 1.25, 1.30],
    launchAngle: [20, 24, 18, 26],
    attackAngle: [-5, -1, -7, 1],
    totalSpin: [6200, 7600, 5600, 8200],
    offlineSpread: [0, 20, 20, 30],
    peakHeight: [82, 116, 62, 130],
    descentAngle: [44, 52, 40, 56]
  },
  "9i": {
    smash: [1.27, 1.32, 1.22, 1.27],
    launchAngle: [22, 26, 20, 28],
    attackAngle: [-6, -2, -8, 0],
    totalSpin: [7000, 8500, 6400, 9200],
    offlineSpread: [0, 18, 18, 28],
    peakHeight: [78, 112, 58, 126],
    descentAngle: [46, 54, 42, 58]
  },
  "PW": {
    smash: [1.24, 1.29, 1.19, 1.24],
    launchAngle: [24, 28, 22, 30],
    attackAngle: [-6, -2, -8, 0],
    totalSpin: [8000, 9500, 7400, 10200],
    offlineSpread: [0, 15, 15, 24],
    peakHeight: [74, 108, 54, 122],
    descentAngle: [48, 56, 44, 60]
  },
  "GW": {
    smash: [1.22, 1.27, 1.17, 1.22],
    launchAngle: [26, 30, 24, 32],
    attackAngle: [-6, -2, -8, 0],
    totalSpin: [8500, 10200, 7900, 11000],
    offlineSpread: [0, 13, 13, 22],
    peakHeight: [70, 104, 50, 118],
    descentAngle: [50, 58, 46, 62]
  },
  "SW": {
    smash: [1.18, 1.24, 1.13, 1.18],
    launchAngle: [28, 34, 26, 36],
    attackAngle: [-8, -3, -10, 0],
    totalSpin: [9000, 11000, 8400, 12000],
    offlineSpread: [0, 12, 12, 20],
    peakHeight: [65, 100, 45, 115],
    descentAngle: [52, 62, 48, 66]
  },
  "LW": {
    smash: [1.15, 1.21, 1.10, 1.15],
    launchAngle: [30, 38, 28, 42],
    attackAngle: [-9, -4, -12, 0],
    totalSpin: [9500, 12000, 9000, 13000],
    offlineSpread: [0, 12, 12, 20],
    peakHeight: [60, 95, 40, 110],
    descentAngle: [54, 66, 50, 70]
  }
};
function getRangeColor(club, metric, value) {
  if (value == null || !CLUB_RANGES[club]?.[metric]) return "#ddeedd";
  const _CLUB_RANGES$club$met = _slicedToArray(CLUB_RANGES[club][metric], 4),
    gMin = _CLUB_RANGES$club$met[0],
    gMax = _CLUB_RANGES$club$met[1],
    yMin = _CLUB_RANGES$club$met[2],
    yMax = _CLUB_RANGES$club$met[3];
  const v = metric === "offlineSpread" ? Math.abs(value) : value;
  if (v >= gMin && v <= gMax) return "#4ade80";
  if (v >= yMin && v <= yMax) return "#facc15";
  return "#f87171";
}

// How far is a value from the green zone? 0 = inside green, >0 = outside.
// Used to determine if a delta is an improvement (B closer to optimal than A).
function distFromOptimal(club, metric, value) {
  if (value == null || !CLUB_RANGES[club]?.[metric]) return null;
  const _CLUB_RANGES$club$met2 = _slicedToArray(CLUB_RANGES[club][metric], 2),
    gMin = _CLUB_RANGES$club$met2[0],
    gMax = _CLUB_RANGES$club$met2[1];
  const v = metric === "offlineSpread" ? Math.abs(value) : value;
  if (v >= gMin && v <= gMax) return 0;
  return v < gMin ? gMin - v : v - gMax;
}

// ── Storage with explicit fallback to in-memory only
const memoryStore = {
  configs: [],
  sessions: []
};

// ── Hdcp equivalence table (dispersion score → handicap level)
const HDCP_BENCHMARKS = [{
  score: 100,
  hdcp: 0
},
// Tour / scratch
{
  score: 93,
  hdcp: 2
}, {
  score: 85,
  hdcp: 5
}, {
  score: 71,
  hdcp: 10
}, {
  score: 54,
  hdcp: 15
}, {
  score: 37,
  hdcp: 20
}, {
  score: 15,
  hdcp: 25
}, {
  score: 0,
  hdcp: 30
}];
function scoreToHdcp(score) {
  if (score >= 100) return 0;
  if (score <= 0) return 30;
  for (let i = 0; i < HDCP_BENCHMARKS.length - 1; i++) {
    const hi = HDCP_BENCHMARKS[i],
      lo = HDCP_BENCHMARKS[i + 1];
    if (score >= lo.score && score <= hi.score) {
      const t = (score - lo.score) / (hi.score - lo.score);
      return Math.round((lo.hdcp + t * (hi.hdcp - lo.hdcp)) * 10) / 10;
    }
  }
  return 30;
}

// Approximate shots hit per round by club (for SG/round estimate)
// Normalize club type strings from Arccos to our format (e.g. "8I" → "8i", "PW" → "PW")
function normalizeClub(str) {
  if (!str) return "";
  return str.trim().replace(/iron/i, "i").replace(/wood/i, "w").replace(/driver/i, "Dr").replace(/Driver/, "Dr").replace(/putter/i, "Pt").replace(/Putter/, "Pt").replace(/([0-9]+)I$/i, (_, n) => n + "i").replace(/([0-9]+)W$/i, (_, n) => n + "w").toUpperCase().replace(/^([0-9]+)([IW])$/, (_, n, t) => n + t.toLowerCase());
}

// Find arccos club data matching a config club (e.g. "8i")
function findArccosClub(arccosData, clubLabel) {
  if (!arccosData?.clubs?.length || !clubLabel) return null;
  const target = clubLabel.toLowerCase().trim();
  return arccosData.clubs.find(c => {
    const t = (c.clubType || c.type || c.name || "").toLowerCase().trim();
    return t === target;
  }) || null;
}
const SHOTS_PER_ROUND = {
  "4i": 2,
  "5i": 2,
  "6i": 3,
  "7i": 3,
  "8i": 3,
  "9i": 4,
  "PW": 4,
  "GW": 5,
  "SW": 5,
  "LW": 3
};
const SG_PER_HDCP = 0.055; // strokes per hdcp point per approach shot (from Shot Scope data)

async function storageLoad() {
  // Try localStorage first (works in PWA and standalone)
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("localStorage.getItem failed:", e);
  }
  // Try window.storage (Claude artifact environment)
  if (typeof window !== "undefined" && window.storage?.get) {
    try {
      const r = await window.storage.get(STORAGE_KEY);
      if (r?.value) return JSON.parse(r.value);
    } catch (e) {
      console.warn("window.storage.get failed:", e);
    }
  }
  return {
    configs: [...memoryStore.configs],
    sessions: [...memoryStore.sessions]
  };
}
async function storageSave(data) {
  memoryStore.configs = data.configs;
  memoryStore.sessions = data.sessions;
  // Save to localStorage (PWA + standalone)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("localStorage.setItem failed:", e);
  }
  // Also save to window.storage (Claude artifact environment)
  if (typeof window !== "undefined" && window.storage?.set) {
    try {
      await window.storage.set(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }
  return true;
}

// ── CSV parser
function parseCSV(text) {
  const shots = [];
  for (const line of text.trim().split("\n")) {
    const c = line.split(",");
    const num = parseInt(c[0]);
    if (isNaN(num) || num < 1) continue;
    const pd = s => {
      if (!s) return null;
      s = s.trim();
      const m = s.match(/([\d.]+)\s*(L|R|DN|UP|I-O|O-I)?/);
      if (!m) return null;
      const v = parseFloat(m[1]);
      return m[2] === "L" || m[2] === "DN" || m[2] === "I-O" ? -v : v;
    };
    const ps = s => {
      if (!s) return null;
      s = s.trim();
      const m = s.match(/([\d.]+)\s*(L|R)?/);
      if (!m) return null;
      return m[2] === "L" ? -parseFloat(m[1]) : parseFloat(m[1]);
    };
    shots.push({
      num,
      carry: parseFloat(c[3]) || null,
      total: parseFloat(c[4]) || null,
      peakHeight: parseFloat(c[5]) || null,
      offline: pd(c[6]),
      curve: pd(c[7]),
      // col 7: curve yds (L=drew left, R=faded right)
      descentAngle: parseFloat(c[8]) || null,
      hangTime: parseFloat(c[9]) || null,
      ballSpeed: parseFloat(c[10]) || null,
      launchAngle: parseFloat(c[11]) || null,
      launchDir: pd(c[12]),
      // col 12: launch direction (L=started left, R=started right)
      sideSpin: ps(c[13]),
      // col 13: side spin rpm (L=draw, R=fade)
      totalSpin: parseFloat(c[14]) || null,
      // col 14: total spin rpm (~6500 for 8i — combined back+side)
      backSpin: parseFloat(c[15]) || null,
      // col 15: back spin rpm (~4900 for 8i — backward component only)
      // col 16 (Spin Axis) NOT parsed — Launch Pro derives it from side/back spin, unreliable
      // col 18 (Club Speed at Impact) NOT parsed — not tracked by Launch Pro
      // Club fields: store raw value, no ||null coercion
      // Device sends 0 when no club data captured — 0||null would hide this
      clubSpeed: parseFloat(c[17]) || 0,
      // 0 = no club data
      smash: parseFloat(c[19]) || 0,
      attackAngle: pd(c[20]) || 0,
      clubPath: pd(c[21]) || 0
      // cols 22-28 (Face to Path, Lie Angle, Dynamic Loft, Closure Rate,
      //             Horizontal Impact, Vertical Impact, Face to Target) — not tracked
    });
  }
  return shots;
}

// ── Shot shape classifier
// ── Shot shape classifier
// Thresholds calibrated to ~150-yard iron shots:
//   Launch dir: ±2 yds = straight start; >2 = started right; <-2 = started left
//   Curve: <3 yds = essentially straight; 3+ yds = meaningful curve; >8 yds = aggressive
//   Offline: ±12 yds = on target; beyond = a miss
//
// Shape set (left → right):
//   Pull Hook | Hook | Pull | Draw | Straight | Fade | Slice | Push | Push Slice
//
// Draw/Fade logic: if the ball started right and curved left (any amount) and finished
// on target OR came back — it's a Draw. Only a Hook if it actually missed left.
// Mirror applies for Fade/Slice on the right.
function classifyShot(s) {
  const off = s.offline || 0;
  const launch = s.launchDir || 0;
  const curve = s.curve || 0;
  const spin = s.sideSpin || 0;
  const leftCurve = curve < 0 ? Math.abs(curve) : spin < -200 ? 1 : 0;
  const rightCurve = curve > 0 ? Math.abs(curve) : spin > 200 ? 1 : 0;
  const LAUNCH_T = 2; // yds — left/right start threshold
  const GENTLE = 3; // yds — minimum meaningful curve
  const MISS_T = 12; // yds — miss threshold

  const startL = launch < -LAUNCH_T;
  const startR = launch > LAUNCH_T;
  const startS = !startL && !startR;
  const missL = off < -MISS_T;
  const missR = off > MISS_T;
  const curvL = leftCurve >= GENTLE;
  const curvR = rightCurve >= GENTLE;

  // ── LEFT SHAPES ─────────────────────────────────────────
  // Pull Hook: started left AND curved further left
  if (startL && curvL) return "Pull Hook";
  // Pull: started left, minimal curve
  if (startL && !curvR) return "Pull";
  // Hook: any left curve that missed left (includes big draws gone wrong)
  if (curvL && missL) return "Hook";
  // Draw: started right or straight, curved left, finished on target
  if ((startR || startS) && curvL) return "Draw";

  // ── RIGHT SHAPES (exact mirror) ─────────────────────────
  // Push Slice: started right AND curved further right
  if (startR && curvR) return "Push Slice";
  // Push: started right, minimal curve
  if (startR && !curvL) return "Push";
  // Slice: any right curve that missed right
  if (curvR && missR) return "Slice";
  // Fade: started left or straight, curved right, finished on target
  if ((startL || startS) && curvR) return "Fade";

  // ── FALLBACK ────────────────────────────────────────────
  if (missL) return "Pull";
  if (missR) return "Push";
  return "Straight";
}

// ── Analysis
// Step 1: remove worst 20% by offline distance from target
// Step 2: from remaining shots, split into:
//   - ball pool: all kept shots (ball data always valid)
//   - club pool: kept shots where clubSpeed > 0 (device records 0 when no club data captured)
function analyze(shots) {
  if (!shots.length) return null;

  // STEP 1: sort by |offline| ascending (closest to target = best), remove worst 20%
  const sorted = [...shots].sort((a, b) => Math.abs(a.offline || 0) - Math.abs(b.offline || 0));
  const kept = sorted.slice(0, Math.ceil(shots.length * 0.8));

  // STEP 2: club pool = shots where clubSpeed is a real positive number (not 0 or null)
  // Two data pools:
  //   kept         — Ball Data Shots: all kept shots (ball flight data always valid)
  //   keptFullClub — Club Data Shots: shots where optical club tracking fired (attackAngle or clubPath non-zero)
  const keptFullClub = kept.filter(s => s.attackAngle !== 0 || s.clubPath !== 0);

  // Averages over a pool
  const avg = (pool, k) => {
    const v = pool.map(s => s[k]).filter(x => x != null && !isNaN(x));
    return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
  };
  const spd = (pool, k) => {
    const v = pool.map(s => s[k]).filter(x => x != null && !isNaN(x));
    return v.length ? Math.max(...v) - Math.min(...v) : null;
  };

  // Ball averages — full kept pool
  const avgB = k => avg(kept, k);
  const spdB = k => spd(kept, k);

  // Club averages — club pool only
  // avgFC: club data from optical-tracking shots only
  const avgFC = k => {
    const v = keptFullClub.map(s => s[k]).filter(x => x != null && !isNaN(x) && x !== 0);
    return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
  };

  // Shot shapes
  const shapes = {};
  kept.forEach(s => {
    const sh = classifyShot(s);
    shapes[sh] = (shapes[sh] || 0) + 1;
  });
  const offSpd = spdB("offline") || 0;
  const crySpd = spdB("carry") || 0;
  const consistency = Math.max(0, Math.round(100 - offSpd * 1.2 - crySpd * 0.3));

  // Dispersion score: 0 = 30 hdcp, 100 = tour pro
  // Linear scale between anchors. 80% spread, 20% bias.
  const avgOff = avgB("offline") || 0;
  const TOUR_SPREAD = 20,
    MAX_SPREAD = 80; // tour pro → 30 hdcp spread anchors
  const TOUR_BIAS = 2,
    MAX_BIAS = 15; // tour pro → 30 hdcp bias anchors
  const sizeScore = 80 * Math.max(0, Math.min(1, (MAX_SPREAD - offSpd) / (MAX_SPREAD - TOUR_SPREAD)));
  const biasScore = 20 * Math.max(0, Math.min(1, (MAX_BIAS - Math.abs(avgOff)) / (MAX_BIAS - TOUR_BIAS)));
  const dispersionScore = Math.round(sizeScore + biasScore);
  return {
    n: kept.length,
    nTotal: shots.length,
    nBall: kept.length,
    // all kept shots — ball data
    nClub: keptFullClub.length,
    // optical tracking shots — club data
    kept,
    // Ball data — all kept shots
    carry: avgB("carry"),
    carrySpread: spdB("carry"),
    offline: avgB("offline"),
    offlineSpread: spdB("offline"),
    ballSpeed: avgB("ballSpeed"),
    launchAngle: avgB("launchAngle"),
    peakHeight: avgB("peakHeight"),
    descentAngle: avgB("descentAngle"),
    hangTime: avgB("hangTime"),
    totalSpin: avgB("totalSpin"),
    backSpin: avgB("backSpin"),
    sideSpin: avgB("sideSpin"),
    launchDir: avgB("launchDir"),
    curve: avgB("curve"),
    // Club Data — optical tracking shots only (attackAngle or clubPath non-zero)
    clubSpeed: avgFC("clubSpeed"),
    smash: avgFC("smash"),
    attackAngle: avgFC("attackAngle"),
    clubPath: avgFC("clubPath"),
    leftMisses: kept.filter(s => (s.offline || 0) < -15).length,
    rightMisses: kept.filter(s => (s.offline || 0) > 15).length,
    straightShots: kept.filter(s => Math.abs(s.offline || 0) <= 15).length,
    shapes,
    consistency,
    dispersionScore
  };
}

// ── Shot shape classifier
// Uses launch direction (col 12) + curve yards (col 7) + side spin (col 13)
// Spin Axis NOT used — Launch Pro derives it, unreliable
// Launch dir: negative = started left, positive = started right
// Curve: negative = curved left (draw/hook), positive = curved right (fade/slice)
// Side spin: negative = draw spin (left), positive = fade spin (right)

// ── Claude API
async function callClaude(prompt) {
  const apiKey = localStorage.getItem("anthropic-api-key") || "";
  if (!apiKey) return "⚙ Add your Anthropic API key in Settings to enable AI analysis.";
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-iab": "true"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: prompt
      }]
    })
  });
  const d = await r.json();
  if (d.error) return `API error: ${d.error.message}`;
  return d.content?.[0]?.text || "Analysis unavailable.";
}

// ── Formatters
const f = function (v) {
  let d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return v == null ? "—" : Number(v).toFixed(d);
};
const fd = function (v) {
  let d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return v == null ? "—" : Math.abs(v) < 0.05 ? "0" : `${Math.abs(v).toFixed(d)}${v < 0 ? "L" : "R"}`;
};
const fa = v => v == null ? "—" : Math.abs(v) < 0.05 ? "0°" : `${Math.abs(v).toFixed(1)}° ${v < 0 ? "DN" : "UP"}`;

// ── Defaults
// Standard bag order for grouping configs by club
const BAG_ORDER = ["Dr", "3w", "5w", "Hy", "4i", "5i", "6i", "7i", "8i", "9i", "PW", "GW", "SW", "LW", "Pt"];
const BLANK_CFG = {
  name: "",
  club: "8i",
  head: "",
  loft: "",
  lie: "3° Upright",
  length: '+3/4"',
  shaft: "",
  shaftWeight: "",
  flex: "Stiff",
  grip: "MCC+4 Midsize",
  gripSize: "Midsize",
  swingWeight: "",
  notes: ""
};
const BLANK_SESS = {
  name: "",
  configId: "",
  csvText: "",
  fileName: "",
  date: new Date().toISOString().slice(0, 10),
  surface: "Mat",
  chokeDown: "None"
};

// ── Palette
const C = {
  bg: "#030a03",
  card: "#050d05",
  accent: "#4ade80",
  muted: "#2a5a2a",
  faint: "#0d1a0d",
  text: "#ddeedd",
  dim: "#2a5a2a",
  dimmer: "#1a3a1a"
};
function App() {
  const _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    ready = _useState2[0],
    setReady = _useState2[1];
  const _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    storageOK = _useState4[0],
    setStorageOK = _useState4[1]; // null=unknown, true=ok, false=memory-only
  const _useState5 = useState([]),
    _useState6 = _slicedToArray(_useState5, 2),
    configs = _useState6[0],
    setConfigs = _useState6[1];
  const _useState7 = useState([]),
    _useState8 = _slicedToArray(_useState7, 2),
    sessions = _useState8[0],
    setSessions = _useState8[1];
  const _useState9 = useState("sessions"),
    _useState0 = _slicedToArray(_useState9, 2),
    tab = _useState0[0],
    setTab = _useState0[1];
  const _useState1 = useState([]),
    _useState10 = _slicedToArray(_useState1, 2),
    sel = _useState10[0],
    setSel = _useState10[1]; // selected config ids
  const _useState11 = useState([]),
    _useState12 = _slicedToArray(_useState11, 2),
    selSess = _useState12[0],
    setSelSess = _useState12[1]; // selected session ids
  const _useState13 = useState(() => {
      try {
        return parseFloat(localStorage.getItem("player-hdcp") || "13") || 13;
      } catch {
        return 13;
      }
    }),
    _useState14 = _slicedToArray(_useState13, 2),
    playerHdcp = _useState14[0],
    setPlayerHdcp = _useState14[1];
  const _useState15 = useState(() => {
      try {
        const raw = localStorage.getItem("arccos-data");
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    }),
    _useState16 = _slicedToArray(_useState15, 2),
    arccosData = _useState16[0],
    setArccosData = _useState16[1];
  const _useState17 = useState("configs"),
    _useState18 = _slicedToArray(_useState17, 2),
    cmpMode = _useState18[0],
    setCmpMode = _useState18[1]; // "configs" | "sessions"
  const _useState19 = useState(null),
    _useState20 = _slicedToArray(_useState19, 2),
    analyzing = _useState20[0],
    setAnalyzing = _useState20[1];
  const _useState21 = useState(""),
    _useState22 = _slicedToArray(_useState21, 2),
    cmpAI = _useState22[0],
    setCmpAI = _useState22[1];
  const _useState23 = useState(BLANK_CFG),
    _useState24 = _slicedToArray(_useState23, 2),
    newCfg = _useState24[0],
    setNewCfg = _useState24[1];
  const _useState25 = useState(null),
    _useState26 = _slicedToArray(_useState25, 2),
    editingCfgId = _useState26[0],
    setEditingCfgId = _useState26[1]; // null = creating new, string = editing existing
  const _useState27 = useState(new Set()),
    _useState28 = _slicedToArray(_useState27, 2),
    collapsedClubs = _useState28[0],
    setCollapsedClubs = _useState28[1];
  const _useState29 = useState(new Set()),
    _useState30 = _slicedToArray(_useState29, 2),
    collapsedSessions = _useState30[0],
    setCollapsedSessions = _useState30[1];
  const _useState31 = useState(false),
    _useState32 = _slicedToArray(_useState31, 2),
    autoNaming = _useState32[0],
    setAutoNaming = _useState32[1]; // live name generation from field diffs
  const _useState33 = useState(BLANK_SESS),
    _useState34 = _slicedToArray(_useState33, 2),
    newSess = _useState34[0],
    setNewSess = _useState34[1];
  const _useState35 = useState(""),
    _useState36 = _slicedToArray(_useState35, 2),
    err = _useState36[0],
    setErr = _useState36[1];
  const _useState37 = useState(""),
    _useState38 = _slicedToArray(_useState37, 2),
    toast = _useState38[0],
    setToast = _useState38[1];
  const _useState39 = useState("ok"),
    _useState40 = _slicedToArray(_useState39, 2),
    toastType = _useState40[0],
    setToastType = _useState40[1]; // "ok" | "warn" | "err"
  const timer = useRef(null);

  // Load on mount
  useEffect(() => {
    storageLoad().then(d => {
      setConfigs(d.configs || []);
      setSessions(d.sessions || []);
      setReady(true);
    });
  }, []);

  // Persist on every change after load — explicitly pass current state
  const persist = useCallback(async (nextConfigs, nextSessions) => {
    const ok = await storageSave({
      configs: nextConfigs,
      sessions: nextSessions
    });
    setStorageOK(ok);
  }, []);
  const pop = function (msg) {
    let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "ok";
    setToast(msg);
    setToastType(type);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 3000);
  };

  // ── Config actions
  const saveCfg = () => {
    if (!newCfg.name.trim()) {
      pop("Config name is required", "err");
      return;
    }
    let next;
    if (editingCfgId) {
      next = configs.map(c => c.id === editingCfgId ? {
        ...newCfg,
        id: editingCfgId
      } : c);
      pop("Configuration updated ✓");
    } else {
      next = [...configs, {
        ...newCfg,
        id: Date.now().toString()
      }];
      pop("Configuration saved ✓");
    }
    setConfigs(next);
    persist(next, sessions);
    setNewCfg(BLANK_CFG);
    setEditingCfgId(null);
    setAutoNaming(false);
    setTab("configs");
  };
  const editCfg = cfg => {
    setNewCfg({
      ...cfg
    });
    setEditingCfgId(cfg.id);
    setAutoNaming(false); // editing existing — no auto-naming
    setTab("add-config");
  };

  // Pre-fill club when adding from a specific club group
  const addCfgForClub = club => {
    const stock = configs.find(c => c.club === club && c.name.toLowerCase() === `${club.toLowerCase()} stock`) || configs.filter(c => c.club === club)[0] || null;
    const isFirstForClub = !configs.some(c => c.club === club);
    if (isFirstForClub) {
      // First config for this club → it becomes the stock, pre-name it
      setNewCfg({
        ...BLANK_CFG,
        club,
        name: `${club} Stock`
      });
      setAutoNaming(false);
    } else if (stock) {
      // Subsequent config → clone stock, clear name, auto-naming on
      const id = stock.id,
        stockFields = _objectWithoutProperties(stock, _excluded);
      const draft = {
        ...stockFields,
        name: ""
      };
      draft.name = generateCfgName(club, draft, stock);
      setNewCfg(draft);
      setAutoNaming(true);
    } else {
      setNewCfg({
        ...BLANK_CFG,
        club
      });
      setAutoNaming(false);
    }
    setEditingCfgId(null);
    setTab("add-config");
  };
  const toggleSessionCollapse = id => setCollapsedSessions(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const toggleClubCollapse = club => setCollapsedClubs(prev => {
    const next = new Set(prev);
    next.has(club) ? next.delete(club) : next.add(club);
    return next;
  });

  // Stock config = the one named "[club] Stock" (case-insensitive), or first config for that club
  const getStockCfg = club => {
    const clubCfgs = configs.filter(c => c.club === club);
    return clubCfgs.find(c => c.name.toLowerCase() === `${club.toLowerCase()} stock`) || clubCfgs[0] || null;
  };

  // Build a name from the diffs between newCfg and stock
  // Joins changed field labels in order: lie → loft → length → shaft/flex → swingWeight
  const generateCfgName = (club, cfg, stock) => {
    if (!stock) return `${club} Stock`;
    const parts = [];
    if (cfg.lie !== stock.lie && cfg.lie) parts.push(cfg.lie);
    if (cfg.loft !== stock.loft && cfg.loft) parts.push(`${cfg.loft}°`);
    if (cfg.length !== stock.length && cfg.length) parts.push(cfg.length);
    if (cfg.shaft !== stock.shaft && cfg.shaft) parts.push(cfg.shaft);
    if (cfg.flex !== stock.flex && cfg.shaft === stock.shaft && cfg.flex) parts.push(cfg.flex);
    if (cfg.swingWeight !== stock.swingWeight && cfg.swingWeight) parts.push(`SW ${cfg.swingWeight}`);
    if (cfg.head !== stock.head && cfg.head) parts.push(cfg.head);
    return parts.length ? `${club} ${parts.join(' ')}` : `${club} Stock`;
  };

  // Called when any form field changes — update name if auto-naming is on
  const onCfgFieldChange = (field, value) => {
    setNewCfg(prev => {
      const updated = {
        ...prev,
        [field]: value
      };
      if (autoNaming) {
        const stock = getStockCfg(prev.club);
        updated.name = generateCfgName(prev.club, updated, stock);
      }
      return updated;
    });
  };
  const cancelEdit = () => {
    setNewCfg(BLANK_CFG);
    setEditingCfgId(null);
    setAutoNaming(false);
    setTab("configs");
  };
  const delCfg = id => {
    const nextC = configs.filter(c => c.id !== id);
    const nextS = sessions.filter(s => s.configId !== id);
    setConfigs(nextC);
    setSessions(nextS);
    setSel(p => p.filter(x => x !== id));
    persist(nextC, nextS);
  };

  // ── Session actions
  const importSess = () => {
    setErr("");
    if (!newSess.name.trim() || !newSess.configId || !newSess.csvText.trim()) {
      setErr("Fill all fields and upload a CSV file.");
      return;
    }
    try {
      const shots = parseCSV(newSess.csvText);
      if (!shots.length) {
        setErr("No valid shot rows found — check CSV format.");
        return;
      }
      console.log("First parsed shot:", JSON.stringify(shots[0]));
      const analysis = analyze(shots);
      console.log("Analysis result:", JSON.stringify(analysis));
      // Strip csvText before storing — not needed once shots are parsed
      const csvText = newSess.csvText,
        fileName = newSess.fileName,
        sessRest = _objectWithoutProperties(newSess, _excluded2);
      // Store shots only — analysis is always derived fresh on render, never cached
      const sess = {
        ...sessRest,
        id: Date.now().toString(),
        shots,
        aiAnalysis: null
      };
      const next = [...sessions, sess];
      setSessions(next);
      persist(configs, next);
      setNewSess(BLANK_SESS);
      pop(`Imported ${shots.length} shots — kept best ${analysis.n} ✓`);
      setTab("sessions");
    } catch (e) {
      setErr("Parse error: " + e.message);
    }
  };
  const delSess = id => {
    const next = sessions.filter(s => s.id !== id);
    setSessions(next);
    persist(configs, next);
  };

  // ── AI analysis
  const analyzeSession = async id => {
    const sess = sessions.find(s => s.id === id);
    const cfg = configs.find(c => c.id === sess?.configId);
    if (!sess || !cfg) return;
    setAnalyzing(id);
    try {
      // Use the stored analysis object directly — it was computed at import time
      // and the StatGrid already proves it has valid data
      const a = sess.shots?.length ? analyze(sess.shots) : null;
      if (!a) {
        pop("No shot data found. Try re-importing the session.", "err");
        setAnalyzing(null);
        return;
      }
      // Debug: log first shot and analysis to console
      if (sess.shots?.length) console.log("First shot:", JSON.stringify(sess.shots[0]));
      console.log("Analysis object:", JSON.stringify(a));
      const surfNote = sess.surface === "Mat" ? "Hit off a mat — AoA and spin may read differently vs grass." : "Hit off grass.";
      const chokeNote = sess.chokeDown && sess.chokeDown !== "None" ? `Choked down ${sess.chokeDown}.` : "Full grip.";
      const prompt = `You are an expert golf club fitter. Here is a real launch monitor session with real numbers. Do NOT say the data is missing or show dashes — these are the actual values. Analyze them directly.

PLAYER: Daniel Routh. Height 6'3.5", wrist-to-floor 39", 13 handicap, early extension tendency, pull-hook miss pattern. Blueprint S irons baseline at +1.5" over standard / Modus 105 Stiff shafts.

CLUB CONFIGURATION:
- Club: ${cfg.club}
- Lie angle: ${cfg.lie}
- Length: ${cfg.length}
- Shaft: ${cfg.shaft} ${cfg.flex} ${cfg.shaftWeight}g
- Grip: ${cfg.grip} ${cfg.gripSize}
- Swing weight: ${cfg.swingWeight}
- Notes: ${cfg.notes || "none"}
- Surface: ${sess.surface} — ${surfNote}
- Choke-down: ${sess.chokeDown || "None"} — ${chokeNote}

SESSION STATS (worst 20% already filtered out, ${a.n} of ${a.nTotal} shots used):
- Average carry: ${f(a.carry)} yards
- Carry spread: ${f(a.carrySpread)} yards
- Average offline: ${fd(a.offline)} yards
- Offline spread (dispersion): ${f(a.offlineSpread)} yards
- Smash factor: ${f(a.smash, 2)}
- Ball speed: ${f(a.ballSpeed)} mph
- Club speed: ${f(a.clubSpeed)} mph
- Launch angle: ${f(a.launchAngle)} degrees
- Peak height: ${f(a.peakHeight)} feet
- Descent angle: ${f(a.descentAngle)} degrees
- Hang time: ${f(a.hangTime)} seconds
- Attack angle: ${fa(a.attackAngle)}
- Club path: ${fd(a.clubPath)} degrees (positive = in-to-out)
- Spin axis: ${fd(a.spinAxis)} degrees (positive = right tilt)
- Total spin: ${f(a.totalSpin, 0)} rpm
- Back spin: ${f(a.backSpin, 0)} rpm
- Left misses (>15 yds): ${a.leftMisses}
- Right misses (>15 yds): ${a.rightMisses}
- Straight shots: ${a.straightShots}

Write 4-5 paragraphs analyzing this session. Cover: contact quality (smash factor), dispersion pattern, face-to-path relationship, attack angle implications, and whether this configuration is working for this player. Be direct and reference the actual numbers above. No generic advice.`;
      const text = await callClaude(prompt);
      if (text) {
        const next = sessions.map(s => s.id === id ? {
          ...s,
          aiAnalysis: text
        } : s);
        setSessions(next);
        persist(configs, next);
      }
    } catch (e) {
      pop("AI Analysis failed: " + e.message, "err");
    }
    setAnalyzing(null);
  };

  // ── Compare AI
  const runCmpAI = async () => {
    setAnalyzing("cmp");
    setCmpAI("");
    try {
      const blocks = sel.map(cid => {
        const cfg = configs.find(c => c.id === cid);
        const slist = sessions.filter(s => s.configId === cid);
        const shots = slist.flatMap(s => s.shots || []);
        const a = shots.length ? analyze(shots) : null;
        const surfs = [...new Set(slist.map(s => s.surface).filter(Boolean))].join("/") || "unknown";
        const chokes = [...new Set(slist.map(s => s.chokeDown).filter(x => x && x !== "None"))].join(", ") || "none";
        if (!a) return `Config: ${cfg?.name}\nNo data.`;
        return `Config: ${cfg?.name} | Lie: ${cfg?.lie} | Length: ${cfg?.length} | Shaft: ${cfg?.shaft} ${cfg?.flex} | SW: ${cfg?.swingWeight} | Surface: ${surfs} | Choke: ${chokes}
Smash: ${f(a.smash, 2)} | Carry: ${f(a.carry)} yds | Offline: ${fd(a.offline)} avg / ${f(a.offlineSpread)} yd spread
AoA: ${fa(a.attackAngle)} | Path: ${fd(a.clubPath)}° | Spin Axis: ${fd(a.spinAxis)}° | Misses: ${a.leftMisses}L/${a.straightShots}str/${a.rightMisses}R`;
      }).join("\n\n");
      const text = await callClaude(`Expert golf fitter comparing configs for Daniel: 6'3.5", WTF 39", 13 hdcp, early extension, pull-hook. Identify which variables drive differences, note surface/choke context. Clear recommendation.\n\n${blocks}\n\n3-4 paragraphs, direct.`);
      setCmpAI(text);
    } catch (e) {
      pop("AI Comparison failed: " + e.message, "err");
    }
    setAnalyzing(null);
  };
  const toggleSel = id => setSel(p => p.includes(id) ? p.filter(x => x !== id) : p.length < 3 ? [...p, id] : p);
  const toggleSelSess = id => setSelSess(p => p.includes(id) ? p.filter(x => x !== id) : p.length < 3 ? [...p, id] : p);
  const cmpData = sel.map(cid => {
    const cfg = configs.find(c => c.id === cid);
    const shots = sessions.filter(s => s.configId === cid).flatMap(s => s.shots || []);
    return {
      cfg,
      a: shots.length ? analyze(shots) : null,
      n: sessions.filter(s => s.configId === cid).length
    };
  });

  // ── Shared styles
  const SI = {
    background: "#071007",
    border: `1px solid ${C.faint}`,
    borderRadius: 5,
    color: C.text,
    padding: "7px 10px",
    fontSize: 13,
    width: "100%",
    boxSizing: "border-box",
    outline: "none"
  };
  const SL = {
    color: "#4a7a4a",
    fontSize: 11,
    marginBottom: 3,
    display: "block",
    letterSpacing: 0.5,
    textTransform: "uppercase"
  };
  const SB = {
    background: C.accent,
    border: "none",
    color: C.bg,
    borderRadius: 5,
    padding: "9px 22px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer"
  };
  const SBO = {
    background: "none",
    border: `1px solid ${C.muted}`,
    color: C.accent,
    borderRadius: 5,
    padding: "6px 14px",
    fontSize: 12,
    cursor: "pointer"
  };
  const SCd = {
    border: `1px solid ${C.faint}`,
    borderRadius: 8,
    padding: "14px 16px",
    marginBottom: 10,
    background: C.card
  };
  const tb = active => ({
    background: "none",
    border: "none",
    borderBottom: `2px solid ${active ? C.accent : "transparent"}`,
    color: active ? C.accent : C.muted,
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: active ? 700 : 400,
    cursor: "pointer",
    fontFamily: "Georgia,serif"
  });

  // ── Color-coded stat row
  const StatRow = _ref => {
    let label = _ref.label,
      val = _ref.val,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? "#ddeedd" : _ref$color,
      _ref$sub = _ref.sub,
      sub = _ref$sub === void 0 ? "" : _ref$sub,
      _ref$gap = _ref.gap,
      gap = _ref$gap === void 0 ? null : _ref$gap,
      _ref$showGap = _ref.showGap,
      showGap = _ref$showGap === void 0 ? false : _ref$showGap;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        borderBottom: `1px solid ${C.faint}`,
        padding: "5px 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#3a6a3a",
        fontSize: 11
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        color,
        fontSize: 13,
        fontFamily: "monospace",
        fontWeight: color !== "#ddeedd" ? 600 : 400
      }
    }, val, sub && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#2a4a2a",
        fontSize: 11,
        fontWeight: 400
      }
    }, " ", sub)), showGap && gap && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 3,
        padding: "3px 7px",
        background: "#0d1a0d",
        borderLeft: `2px solid ${color}`,
        borderRadius: "0 3px 3px 0"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color,
        fontSize: 10
      }
    }, gap.delta), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#1a3a1a",
        fontSize: 10
      }
    }, " \xB7 optimal "), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#4ade80",
        fontSize: 10
      }
    }, gap.range)));
  };
  const StatGrid = _ref2 => {
    let a = _ref2.a,
      club = _ref2.club;
    if (!a) return null;
    const _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      showGaps = _React$useState2[0],
      setShowGaps = _React$useState2[1];
    const cl = club || "8i";
    const rc = (metric, val) => getRangeColor(cl, metric, val);

    // Build gap info for a metric: how far from optimal and what the optimal range is
    const gap = function (metric, val) {
      let unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      let fmt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : v => f(v, 1);
      if (val == null || !CLUB_RANGES[cl]?.[metric]) return null;
      const _CLUB_RANGES$cl$metri = _slicedToArray(CLUB_RANGES[cl][metric], 2),
        gMin = _CLUB_RANGES$cl$metri[0],
        gMax = _CLUB_RANGES$cl$metri[1];
      const v = metric === "offlineSpread" ? Math.abs(val) : val;
      if (v >= gMin && v <= gMax) return null; // already optimal
      const dist = v < gMin ? gMin - v : v - gMax;
      const side = v < gMin ? "below" : "above";
      const center = (gMin + gMax) / 2;
      const toward = v < gMin ? "↑" : "↓";
      return {
        delta: `${fmt(dist)}${unit} ${side} optimal ${toward}`,
        range: `${fmt(gMin)}–${fmt(gMax)}${unit}`
      };
    };
    const rows = [{
      label: "Carry",
      val: `${f(a.carry)} yds`,
      sub: `±${f((a.carrySpread || 0) / 2)} spread`
    }, {
      label: "Offline Avg",
      val: fd(a.offline),
      sub: `${f(a.offlineSpread)} yd spread`,
      color: rc("offlineSpread", a.offlineSpread),
      gap: gap("offlineSpread", a.offlineSpread, " yds", v => f(v, 1))
    }, {
      label: "Smash Factor",
      val: f(a.smash, 2),
      color: rc("smash", a.smash),
      gap: gap("smash", a.smash, "", v => v.toFixed(3))
    }, {
      label: "Ball Speed",
      val: `${f(a.ballSpeed)} mph`
    }, {
      label: "Club Speed",
      val: `${f(a.clubSpeed)} mph`
    }, {
      label: "Launch Angle",
      val: `${f(a.launchAngle)}°`,
      color: rc("launchAngle", a.launchAngle),
      gap: gap("launchAngle", a.launchAngle, "°")
    }, {
      label: "Peak Height",
      val: `${f(a.peakHeight)} ft`,
      color: rc("peakHeight", a.peakHeight),
      gap: gap("peakHeight", a.peakHeight, " ft", v => f(v, 0))
    }, {
      label: "Descent Angle",
      val: `${f(a.descentAngle)}°`,
      color: rc("descentAngle", a.descentAngle),
      gap: gap("descentAngle", a.descentAngle, "°")
    }, {
      label: "Attack Angle",
      val: fa(a.attackAngle),
      color: rc("attackAngle", a.attackAngle),
      gap: gap("attackAngle", a.attackAngle, "°")
    }, {
      label: "Club Path",
      val: `${fd(a.clubPath)}° I-O`
    }, {
      label: "Total Spin",
      val: `${f(a.totalSpin, 0)} rpm`,
      color: rc("totalSpin", a.totalSpin),
      gap: gap("totalSpin", a.totalSpin, " rpm", v => f(v, 0))
    }, {
      label: "Back Spin",
      val: `${f(a.backSpin, 0)} rpm`
    }, {
      label: "Side Spin",
      val: `${fd(a.sideSpin, 0)} rpm`
    }, {
      label: "Launch Dir",
      val: `${fd(a.launchDir)} yds`
    }, {
      label: "Curve",
      val: `${fd(a.curve)} yds`
    }, {
      label: "Miss Pattern",
      val: `${a.leftMisses}L / ${a.straightShots}str / ${a.rightMisses}R`
    }, {
      label: "Ball Data Shots",
      val: `${a.nBall ?? a.n} / ${a.nTotal}`,
      sub: "(worst 20% removed)"
    }, {
      label: "Club Data Shots",
      val: a.nClub != null ? `${a.nClub} / ${a.nBall ?? a.n}` : "—",
      sub: "(optical tracking)"
    }];
    const outsideCount = rows.filter(r => r.gap).length;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10
      }
    }, outsideCount > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setShowGaps(v => !v),
      style: {
        background: "none",
        border: `1px solid ${showGaps ? "#facc15" : "#1a3a1a"}`,
        color: showGaps ? "#facc15" : "#2a5a2a",
        fontSize: 10,
        padding: "3px 10px",
        borderRadius: 4,
        cursor: "pointer",
        letterSpacing: 0.5
      }
    }, showGaps ? "Hide gaps ▲" : `Show ${outsideCount} gap${outsideCount !== 1 ? "s" : ""}▼`)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2px 14px"
      }
    }, rows.map(r => /*#__PURE__*/React.createElement(StatRow, _extends({
      key: r.label
    }, r, {
      showGap: showGaps
    })))));
  };
  const Legend = () => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "center",
      marginBottom: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted,
      fontSize: 10,
      letterSpacing: 1
    }
  }, "RANGE:"), [["#4ade80", "Optimal"], ["#facc15", "Near"], ["#f87171", "Outside"]].map(_ref3 => {
    let _ref4 = _slicedToArray(_ref3, 2),
      clr = _ref4[0],
      lbl = _ref4[1];
    return /*#__PURE__*/React.createElement("span", {
      key: lbl,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: clr,
        display: "inline-block"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: clr,
        fontSize: 11
      }
    }, lbl));
  }));
  const Badge = _ref5 => {
    let children = _ref5.children;
    return /*#__PURE__*/React.createElement("span", {
      style: {
        background: "#0a1a0a",
        color: "#3a7a3a",
        fontSize: 10,
        padding: "2px 8px",
        borderRadius: 3,
        border: `1px solid ${C.faint}`
      }
    }, children);
  };

  // ── Dispersion score badge
  const DispersionScoreBadge = _ref6 => {
    let a = _ref6.a,
      club = _ref6.club;
    if (!a || a.dispersionScore == null) return null;
    const score = a.dispersionScore;
    const color = score >= 80 ? "#4ade80" : score >= 50 ? "#facc15" : "#f87171";
    const label = score >= 90 ? "Tour Level" : score >= 80 ? "Elite" : score >= 65 ? "Solid" : score >= 50 ? "Developing" : score >= 25 ? "High Hdcp" : "Beginner";
    // Benchmark labels
    const benchmarks = [{
      score: 100,
      label: "Tour"
    }, {
      score: 85,
      label: "5 hdcp"
    }, {
      score: 71,
      label: "10 hdcp"
    }, {
      score: 37,
      label: "20 hdcp"
    }, {
      score: 0,
      label: "30 hdcp"
    }];
    const dispHdcp = scoreToHdcp(score);
    const shotsPerRnd = SHOTS_PER_ROUND[club] || 3;
    const sgDelta = (playerHdcp - dispHdcp) * SG_PER_HDCP * shotsPerRnd;
    const sgColor = sgDelta >= 0 ? "#4ade80" : "#f87171";
    const sgLabel = sgDelta >= 0 ? `+${sgDelta.toFixed(2)} SG/round` : `${sgDelta.toFixed(2)} SG/round`;
    const barWidth = `${score}%`;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        margin: "14px 0 10px",
        padding: "14px 16px",
        background: "#040a04",
        borderRadius: 8,
        border: `1px solid ${color}33`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#3a6a3a",
        fontSize: 10,
        letterSpacing: 1.5,
        marginBottom: 4
      }
    }, "DISPERSION SCORE"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color,
        fontSize: 42,
        fontWeight: 900,
        fontFamily: "monospace",
        lineHeight: 1
      }
    }, score), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#2a5a2a",
        fontSize: 16
      }
    }, "/100"), /*#__PURE__*/React.createElement("span", {
      style: {
        color,
        fontSize: 13,
        fontWeight: 700,
        marginLeft: 4
      }
    }, label)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 16,
        marginTop: 6,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "#6a9a6a"
      }
    }, "\u2248 ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#ddeedd",
        fontWeight: 700
      }
    }, dispHdcp, " hdcp"), " equivalent"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: sgColor,
        fontWeight: 700
      }
    }, sgLabel, " vs ", playerHdcp, " hdcp"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: "#2a4a2a"
      }
    }, "(~", shotsPerRnd, " shots/rnd est.)"))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#2a5a2a",
        fontSize: 11,
        marginBottom: 2
      }
    }, "Spread: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#8ab58a",
        fontFamily: "monospace"
      }
    }, (a.offlineSpread || 0).toFixed(1), " yds")), /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#2a5a2a",
        fontSize: 11
      }
    }, "Bias: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#8ab58a",
        fontFamily: "monospace"
      }
    }, Math.abs(a.offline || 0).toFixed(1), " yds ", (a.offline || 0) < 0 ? "L" : (a.offline || 0) > 0 ? "R" : "")))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        height: 8,
        background: "#0a1a0a",
        borderRadius: 4,
        overflow: "visible",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: barWidth,
        background: color,
        borderRadius: 4,
        transition: "width 0.5s",
        opacity: 0.9
      }
    }), benchmarks.map(b => /*#__PURE__*/React.createElement("div", {
      key: b.label,
      style: {
        position: "absolute",
        top: -3,
        left: `${b.score}%`,
        transform: "translateX(-50%)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 1,
        height: 14,
        background: "#1a3a1a"
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        height: 14
      }
    }, benchmarks.map(b => /*#__PURE__*/React.createElement("div", {
      key: b.label,
      style: {
        position: "absolute",
        left: `${b.score}%`,
        transform: "translateX(-50%)",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#1a3a1a",
        fontSize: 9,
        whiteSpace: "nowrap"
      }
    }, b.label)))), /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#1a4a1a",
        fontSize: 10,
        marginTop: 6
      }
    }, "0 = 30 hdcp (80 yd spread, 15 yd bias) \xA0\xB7\xA0 100 = Tour Pro (20 yd spread, 2 yd bias) \xA0\xB7\xA0 80% spread \xB7 20% bias"));
  };

  // ── Average shot tracer — bird's-eye simulator-style view
  const ShotTracer = _ref7 => {
    let a = _ref7.a;
    if (!a) return null;
    const avgOff = a.offline || 0;
    const avgLaunch = a.launchDir || 0;
    const avgCurve = a.curve || 0;
    const avgSpin = a.sideSpin || 0;
    const shape = classifyShot({
      offline: avgOff,
      launchDir: avgLaunch,
      curve: avgCurve,
      sideSpin: avgSpin
    });
    const W = 170,
      H = 260;
    const PL = 22,
      PR = 14,
      PT = 28,
      PB = 36;
    const IW = W - PL - PR,
      IH = H - PT - PB;

    // X scale: ±30 yds maps to IW/2
    const RANGE = 30;
    const cx = PL + IW / 2;
    const sx = v => cx + v / RANGE * (IW / 2);

    // Start bottom-center, end at avgOff near top
    const startX = cx,
      startY = PT + IH;
    const endX = sx(avgOff),
      endY = PT + 12;

    // Control point — offset by launch direction to create natural arc shape
    // Amplify launch by 2x for visual clarity
    const ctrlX = sx(avgLaunch * 2.2);
    const ctrlY = PT + IH * 0.48;
    const path = `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`;

    // Shape color
    const SHAPE_C = {
      "Pull Hook": "#dc2626",
      "Hook": "#f87171",
      "Pull": "#fca5a5",
      "Draw": "#34d399",
      "Straight": "#4ade80",
      "Fade": "#a3e635",
      "Slice": "#fb923c",
      "Push": "#fde68a",
      "Push Slice": "#c2410c"
    };
    const shapeColor = SHAPE_C[shape] || "#4ade80";

    // Offline ticks
    const ticks = [-20, -10, 0, 10, 20].filter(v => Math.abs(v) <= RANGE);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: W
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#3a6a3a",
        fontSize: 10,
        letterSpacing: 1,
        marginBottom: 6
      }
    }, "AVG SHOT SHAPE"), /*#__PURE__*/React.createElement("svg", {
      width: W,
      height: H,
      style: {
        display: "block",
        overflow: "visible"
      }
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
      id: "tg",
      x1: "0",
      y1: "1",
      x2: "0",
      y2: "0",
      gradientUnits: "objectBoundingBox"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: "#facc15",
      stopOpacity: "0.15"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "50%",
      stopColor: shapeColor,
      stopOpacity: "0.7"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: "#ffffff",
      stopOpacity: "1"
    })), /*#__PURE__*/React.createElement("filter", {
      id: "glow"
    }, /*#__PURE__*/React.createElement("feGaussianBlur", {
      stdDeviation: "2",
      result: "blur"
    }), /*#__PURE__*/React.createElement("feMerge", null, /*#__PURE__*/React.createElement("feMergeNode", {
      in: "blur"
    }), /*#__PURE__*/React.createElement("feMergeNode", {
      in: "SourceGraphic"
    })))), /*#__PURE__*/React.createElement("rect", {
      x: PL,
      y: PT,
      width: IW,
      height: IH,
      fill: "#010801",
      rx: "2"
    }), /*#__PURE__*/React.createElement("rect", {
      x: sx(-5),
      y: PT,
      width: sx(5) - sx(-5),
      height: IH,
      fill: "#0a1a0a",
      opacity: "0.6"
    }), ticks.map(t => /*#__PURE__*/React.createElement("g", {
      key: t
    }, /*#__PURE__*/React.createElement("line", {
      x1: sx(t),
      y1: PT,
      x2: sx(t),
      y2: PT + IH,
      stroke: t === 0 ? "#1a4a1a" : "#0d1a0d",
      strokeWidth: t === 0 ? 1 : 0.5,
      strokeDasharray: t === 0 ? "3,2" : "1,4"
    }), /*#__PURE__*/React.createElement("text", {
      x: sx(t),
      y: PT + IH + 11,
      textAnchor: "middle",
      fill: t === 0 ? "#2a5a2a" : "#1a3a1a",
      fontSize: "7"
    }, t === 0 ? "0" : Math.abs(t) + (t < 0 ? "L" : "R")))), /*#__PURE__*/React.createElement("line", {
      x1: cx,
      y1: PT + 2,
      x2: cx,
      y2: PT + 14,
      stroke: "#2a5a2a",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("polygon", {
      points: `${cx},${PT + 2} ${cx + 8},${PT + 6} ${cx},${PT + 10}`,
      fill: "#2a5a2a",
      opacity: "0.8"
    }), /*#__PURE__*/React.createElement("path", {
      d: path,
      fill: "none",
      stroke: shapeColor,
      strokeWidth: "6",
      opacity: "0.15",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: path,
      fill: "none",
      stroke: "url(#tg)",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      filter: "url(#glow)"
    }), /*#__PURE__*/React.createElement("line", {
      x1: startX,
      y1: startY,
      x2: sx(avgLaunch * 0.8),
      y2: startY - IH * 0.22,
      stroke: "#3a5a3a",
      strokeWidth: "1",
      strokeDasharray: "2,3",
      opacity: "0.6"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: endX,
      cy: endY,
      r: "5",
      fill: shapeColor,
      opacity: "0.9",
      filter: "url(#glow)"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: endX,
      cy: endY,
      r: "10",
      fill: "none",
      stroke: shapeColor,
      strokeWidth: "1",
      opacity: "0.3"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: startX,
      cy: startY,
      r: "3",
      fill: "#facc15",
      opacity: "0.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: W / 2,
      y: PT - 8,
      textAnchor: "middle",
      fill: shapeColor,
      fontSize: "9",
      fontWeight: "700"
    }, shape), /*#__PURE__*/React.createElement("text", {
      x: endX + (avgOff <= 0 ? -7 : 7),
      y: endY + 1,
      textAnchor: avgOff <= 0 ? "end" : "start",
      fill: shapeColor,
      fontSize: "8",
      fontWeight: "700"
    }, Math.abs(avgOff).toFixed(1), avgOff < 0 ? "L" : avgOff > 0 ? "R" : ""), /*#__PURE__*/React.createElement("text", {
      x: W / 2,
      y: H - 4,
      textAnchor: "middle",
      fill: "#1a3a1a",
      fontSize: "7"
    }, "\u2190 yds offline \u2192")));
  };

  // ── Dispersion plot: heatmap canvas + SVG overlay with dispersion ellipse
  const DispersionPlot = _ref8 => {
    let a = _ref8.a;
    if (!a?.kept?.length) return null;
    const shots = a.kept.filter(s => s.offline != null && s.carry != null);
    if (!shots.length) return null;
    const canvasRef = useRef(null);
    const W = 480,
      H = 260,
      PL = 44,
      PR = 20,
      PT = 18,
      PB = 32;
    const IW = W - PL - PR,
      IH = H - PT - PB;
    const offVals = shots.map(s => s.offline);
    const cryVals = shots.map(s => s.carry);
    const offMax = Math.max(40, Math.ceil(Math.max(...offVals.map(Math.abs)) / 5) * 5 + 8);
    const cryMin = Math.min(...cryVals) - 8;
    const cryMax = Math.max(...cryVals) + 8;
    const avgOff = a.offline || 0;
    const avgCry = a.carry || 150;
    const sx = v => PL + (v + offMax) / (offMax * 2) * IW;
    const sy = v => PT + (1 - (v - cryMin) / (cryMax - cryMin)) * IH;

    // Covariance ellipse — computed in pixel space so tilt is correct in the display
    // Working in pixel coords naturally handles the y-axis inversion (SVG y increases downward)
    const xPx = shots.map(s => sx(s.offline));
    const yPx = shots.map(s => sy(s.carry));
    const covFn = (u, v) => {
      const n = u.length;
      const mu = u.reduce((s, x) => s + x, 0) / n;
      const mv = v.reduce((s, x) => s + x, 0) / n;
      return u.reduce((s, x, i) => s + (x - mu) * (v[i] - mv), 0) / n;
    };
    const vx = covFn(xPx, xPx); // variance x (offline, pixels)
    const vy = covFn(yPx, yPx); // variance y (carry, pixels)
    const cxy = covFn(xPx, yPx); // covariance — captures draw/fade tilt
    // 2×2 covariance matrix eigendecomposition
    const tr = vx + vy;
    const det = vx * vy - cxy * cxy;
    const disc = Math.sqrt(Math.max(0, tr * tr / 4 - det));
    const lam1 = tr / 2 + disc; // major eigenvalue
    const lam2 = tr / 2 - disc; // minor eigenvalue
    // Rotation angle of major axis (radians → degrees)
    const ellAngle = 0.5 * Math.atan2(2 * cxy, vx - vy) * 180 / Math.PI;
    // Semi-axes: 1 SD and 2 SD
    const rMaj1 = Math.sqrt(Math.max(0, lam1));
    const rMin1 = Math.sqrt(Math.max(0, lam2));
    const rMaj2 = rMaj1 * 2;
    const rMin2 = rMin1 * 2;

    // Draw heatmap on canvas
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, W, H);
      // For each pixel in the inner plot area, compute kernel density
      const radius = 28; // gaussian kernel radius in pixels
      const imgData = ctx.createImageData(IW, IH);
      const density = new Float32Array(IW * IH);
      let maxD = 0;
      for (let px = 0; px < IW; px++) {
        for (let py = 0; py < IH; py++) {
          let d = 0;
          for (const s of shots) {
            const dx = sx(s.offline) - PL - px;
            const dy = sy(s.carry) - PT - py;
            const dist2 = dx * dx + dy * dy;
            d += Math.exp(-dist2 / (2 * radius * radius));
          }
          density[py * IW + px] = d;
          if (d > maxD) maxD = d;
        }
      }
      // Map density to RGBA — dark green → yellow → red heat
      for (let i = 0; i < density.length; i++) {
        const t = maxD > 0 ? density[i] / maxD : 0;
        if (t < 0.04) {
          imgData.data[i * 4 + 3] = 0;
          continue;
        }
        // colour ramp: deep green → teal → yellow → orange → red
        let r, g, b;
        if (t < 0.25) {
          const u = t / 0.25;
          r = 0;
          g = Math.round(80 + u * 100);
          b = Math.round(60 * u);
        } else if (t < 0.5) {
          const u = (t - 0.25) / 0.25;
          r = Math.round(u * 200);
          g = Math.round(180 + u * 40);
          b = 0;
        } else if (t < 0.75) {
          const u = (t - 0.5) / 0.25;
          r = Math.round(200 + u * 55);
          g = Math.round(220 - u * 80);
          b = 0;
        } else {
          const u = (t - 0.75) / 0.25;
          r = 255;
          g = Math.round(140 - u * 140);
          b = 0;
        }
        const alpha = Math.round(Math.min(1, t * 1.4) * 200);
        imgData.data[i * 4 + 0] = r;
        imgData.data[i * 4 + 1] = g;
        imgData.data[i * 4 + 2] = b;
        imgData.data[i * 4 + 3] = alpha;
      }
      ctx.putImageData(imgData, PL, PT);
    }, [shots, W, H, PL, PT, IW, IH]);
    const SHAPE_COLORS = {
      "Pull Hook": "#dc2626",
      // deep red
      "Hook": "#f87171",
      // red
      "Pull": "#fca5a5",
      // light pink
      "Draw": "#34d399",
      // teal/mint
      "Straight": "#4ade80",
      // bright green
      "Fade": "#a3e635",
      // lime
      "Slice": "#fb923c",
      // orange
      "Push": "#fde68a",
      // light yellow
      "Push Slice": "#c2410c" // deep orange
    };
    const dotColor = s => SHAPE_COLORS[classifyShot(s)] || "#4ade80";
    const offTicks = [-30, -20, -10, 0, 10, 20, 30].filter(v => Math.abs(v) <= offMax);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#3a6a3a",
        fontSize: 10,
        letterSpacing: 1,
        marginBottom: 6
      }
    }, "DISPERSION MAP"), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        display: "inline-block",
        width: "100%",
        maxWidth: W
      }
    }, /*#__PURE__*/React.createElement("canvas", {
      ref: canvasRef,
      width: W,
      height: H,
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "auto",
        pointerEvents: "none"
      }
    }), /*#__PURE__*/React.createElement("svg", {
      width: "100%",
      viewBox: `0 0 ${W} ${H}`,
      style: {
        display: "block",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: PL,
      y: PT,
      width: IW,
      height: IH,
      fill: "#030a03",
      rx: "2"
    }), offTicks.map(t => /*#__PURE__*/React.createElement("g", {
      key: t
    }, t === 0 ? /*#__PURE__*/React.createElement("line", {
      x1: sx(0),
      y1: PT,
      x2: sx(0),
      y2: PT + IH,
      stroke: "#3a9a3a",
      strokeWidth: "2",
      opacity: "0.85"
    }) : /*#__PURE__*/React.createElement("line", {
      x1: sx(t),
      y1: PT,
      x2: sx(t),
      y2: PT + IH,
      stroke: "#0d1a0d",
      strokeWidth: "0.5",
      strokeDasharray: "2,4"
    }), /*#__PURE__*/React.createElement("text", {
      x: sx(t),
      y: PT + IH + 14,
      textAnchor: "middle",
      fill: t === 0 ? "#4ade80" : "#2a5a2a",
      fontSize: t === 0 ? "10" : "9",
      fontWeight: t === 0 ? "700" : "400"
    }, t > 0 ? `${t}R` : t < 0 ? `${Math.abs(t)}L` : "0"))), /*#__PURE__*/React.createElement("line", {
      x1: PL,
      y1: sy(avgCry),
      x2: PL + IW,
      y2: sy(avgCry),
      stroke: "#1a4a1a",
      strokeWidth: "1",
      strokeDasharray: "4,3"
    }), /*#__PURE__*/React.createElement("text", {
      x: PL - 5,
      y: PT + 5,
      textAnchor: "end",
      fill: "#2a5a2a",
      fontSize: "8"
    }, Math.round(cryMax)), /*#__PURE__*/React.createElement("text", {
      x: PL - 5,
      y: PT + IH + 2,
      textAnchor: "end",
      fill: "#2a5a2a",
      fontSize: "8"
    }, Math.round(cryMin)), /*#__PURE__*/React.createElement("text", {
      x: PL - 5,
      y: sy(avgCry) + 3,
      textAnchor: "end",
      fill: "#3a6a3a",
      fontSize: "7"
    }, "avg"), /*#__PURE__*/React.createElement("text", {
      x: PL + IW / 2,
      y: H - 3,
      textAnchor: "middle",
      fill: "#2a5a2a",
      fontSize: "8"
    }, "\u2190 Left \xB7 Offline (yds) \xB7 Right \u2192"), /*#__PURE__*/React.createElement("ellipse", {
      cx: sx(avgOff),
      cy: sy(avgCry),
      rx: rMaj2,
      ry: rMin2,
      transform: `rotate(${ellAngle}, ${sx(avgOff)}, ${sy(avgCry)})`,
      fill: "none",
      stroke: "#2a5a2a",
      strokeWidth: "1",
      strokeDasharray: "5,3",
      opacity: "0.6"
    }), /*#__PURE__*/React.createElement("ellipse", {
      cx: sx(avgOff),
      cy: sy(avgCry),
      rx: rMaj1,
      ry: rMin1,
      transform: `rotate(${ellAngle}, ${sx(avgOff)}, ${sy(avgCry)})`,
      fill: "none",
      stroke: "#3a8a3a",
      strokeWidth: "1.5",
      strokeDasharray: "4,2",
      opacity: "0.9"
    }), shots.map((s, i) => /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: sx(s.offline),
      cy: sy(s.carry),
      r: "3.5",
      fill: dotColor(s),
      fillOpacity: "0.75",
      stroke: "#030a03",
      strokeWidth: "0.8"
    })), /*#__PURE__*/React.createElement("line", {
      x1: sx(avgOff) - 8,
      y1: sy(avgCry),
      x2: sx(avgOff) + 8,
      y2: sy(avgCry),
      stroke: "#4ade80",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: sx(avgOff),
      y1: sy(avgCry) - 8,
      x2: sx(avgOff),
      y2: sy(avgCry) + 8,
      stroke: "#4ade80",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: sx(avgOff),
      cy: sy(avgCry),
      r: "5",
      fill: "none",
      stroke: "#4ade80",
      strokeWidth: "1.5"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 8,
        flexWrap: "wrap",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#2a5a2a",
        fontSize: 9,
        letterSpacing: 0.5
      }
    }, "\u2190MISS"), [["#dc2626", "Pull Hook"], ["#f87171", "Hook"], ["#fca5a5", "Pull"], ["#34d399", "Draw"], ["#4ade80", "Straight"], ["#a3e635", "Fade"], ["#fb923c", "Slice"], ["#fde68a", "Push"], ["#c2410c", "Push Slice"]].map(_ref9 => {
      let _ref0 = _slicedToArray(_ref9, 2),
        c = _ref0[0],
        l = _ref0[1];
      return /*#__PURE__*/React.createElement("span", {
        key: l,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 3,
          fontSize: 9,
          color: c
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: c,
          display: "inline-block"
        }
      }), l);
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#2a5a2a",
        fontSize: 9
      }
    }, "MISS\u2192")));
  };

  // ── Shot shape breakdown bar chart
  const ShotShapes = _ref1 => {
    let a = _ref1.a;
    if (!a?.shapes) return null;
    const total = a.n;
    const order = ["Pull Hook", "Hook", "Pull", "Draw", "Straight", "Fade", "Slice", "Push", "Push Slice"];
    const colors = {
      "Pull Hook": "#dc2626",
      "Hook": "#f87171",
      "Pull": "#fca5a5",
      "Draw": "#34d399",
      "Straight": "#4ade80",
      "Fade": "#a3e635",
      "Slice": "#fb923c",
      "Push": "#fde68a",
      "Push Slice": "#c2410c"
    };
    const entries = order.filter(k => a.shapes[k]).map(k => ({
      k,
      v: a.shapes[k],
      pct: Math.round(a.shapes[k] / total * 100)
    }));
    if (!entries.length) return null;
    const consColor = a.consistency >= 70 ? "#4ade80" : a.consistency >= 45 ? "#facc15" : "#f87171";
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#3a6a3a",
        fontSize: 10,
        letterSpacing: 1
      }
    }, "SHOT SHAPE BREAKDOWN"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: consColor,
        fontFamily: "monospace"
      }
    }, "Consistency: ", /*#__PURE__*/React.createElement("strong", null, a.consistency), "/100")), entries.map(_ref10 => {
      let k = _ref10.k,
        v = _ref10.v,
        pct = _ref10.pct;
      return /*#__PURE__*/React.createElement("div", {
        key: k,
        style: {
          marginBottom: 5
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: colors[k],
          fontSize: 11
        }
      }, k), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "#3a6a3a",
          fontSize: 11,
          fontFamily: "monospace"
        }
      }, v, " shots (", pct, "%)")), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 5,
          background: "#0a1a0a",
          borderRadius: 3,
          overflow: "hidden"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: "100%",
          width: `${pct}%`,
          background: colors[k],
          borderRadius: 3,
          transition: "width 0.4s"
        }
      })));
    }));
  };
  const toastColor = toastType === "err" ? "#f87171" : toastType === "warn" ? "#facc15" : C.accent;
  if (!ready) return /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.bg,
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: C.dimmer,
      fontFamily: "Georgia,serif"
    }
  }, "Loading\u2026");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.bg,
      minHeight: "100vh",
      color: C.text,
      fontFamily: "Georgia,serif",
      maxWidth: 880,
      margin: "0 auto",
      padding: "20px 14px"
    }
  }, toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: 14,
      right: 14,
      background: "#071407",
      border: `1px solid ${toastColor}`,
      color: toastColor,
      padding: "8px 16px",
      borderRadius: 6,
      fontSize: 13,
      zIndex: 999,
      boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
      maxWidth: 300
    }
  }, toast), storageOK === false && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#1a0e00",
      border: "1px solid #7a5a00",
      borderRadius: 6,
      padding: "8px 14px",
      marginBottom: 14,
      fontSize: 12,
      color: "#facc15"
    }
  }, "\u26A0 Persistent storage unavailable \u2014 data is saved in-memory this session only. Refreshing will clear it."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: 4,
      color: "#1a4a1a",
      marginBottom: 2
    }
  }, "DANIEL ROUTH \xB7 DFW"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 26,
      fontWeight: 900,
      color: C.text,
      letterSpacing: -0.5
    }
  }, "Club Fitting Lab"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.dimmer,
      fontSize: 12,
      marginTop: 3
    }
  }, "Track variables \xB7 Import sessions \xB7 Isolate what works \xB7 Worst 20% auto-filtered")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      borderBottom: `1px solid ${C.faint}`,
      marginBottom: 22,
      flexWrap: "wrap"
    }
  }, [["sessions", `Sessions (${sessions.length})`], ["configs", `Configs (${configs.length})`], ["compare", "Compare"], ["add-config", editingCfgId ? "Edit Config" : "+ Config"], ["add-session", "+ Session"], ["settings", "⚙"]].map(_ref11 => {
    let _ref12 = _slicedToArray(_ref11, 2),
      k = _ref12[0],
      l = _ref12[1];
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      style: tb(tab === k),
      onClick: () => setTab(k)
    }, l);
  })), tab === "sessions" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.dimmer,
      fontSize: 12
    }
  }, selSess.length > 0 ? `${selSess.length} session${selSess.length > 1 ? "s" : ""} selected` : "Select sessions to compare"), selSess.length >= 2 && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setCmpMode("sessions");
      setTab("compare");
    },
    style: {
      ...SBO,
      fontSize: 12
    }
  }, "Compare ", selSess.length, " Sessions \u2192"), selSess.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelSess([]),
    style: {
      background: "none",
      border: "none",
      color: C.dimmer,
      cursor: "pointer",
      fontSize: 11,
      marginLeft: 8
    }
  }, "Clear")), !sessions.length && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#0e2a0e",
      fontSize: 14,
      padding: "50px 0",
      textAlign: "center"
    }
  }, "No sessions yet \u2014 create a config first, then import a session."), sessions.map((sess, sessIdx) => {
    const cfg = configs.find(c => c.id === sess.configId);
    const a = sess.shots?.length ? analyze(sess.shots) : null;
    const dc = a ? a.dispersionScore >= 80 ? "#4ade80" : a.dispersionScore >= 50 ? "#facc15" : "#f87171" : "#2a5a2a";
    const selected = selSess.includes(sess.id);
    const collapsed = collapsedSessions.has(sess.id);
    return /*#__PURE__*/React.createElement("div", {
      key: sess.id,
      style: {
        marginBottom: 24,
        borderRadius: 8,
        border: `1px solid ${selected ? C.accent : "#1a3a1a"}`,
        overflow: "hidden",
        boxShadow: selected ? `0 0 0 1px ${C.accent}22` : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: () => toggleSessionCollapse(sess.id),
      style: {
        background: `linear-gradient(135deg, #0a1f0a 0%, #061206 100%)`,
        borderBottom: collapsed ? "none" : `1px solid ${dc}44`,
        padding: "14px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        userSelect: "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
        background: dc,
        opacity: 0.9
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        paddingLeft: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#2a5a2a",
        fontSize: 11,
        fontFamily: "monospace",
        fontWeight: 700
      }
    }, "#", String(sessIdx + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#ddeedd",
        fontWeight: 800,
        fontSize: 18,
        letterSpacing: -0.3
      }
    }, sess.name), /*#__PURE__*/React.createElement("span", {
      style: {
        color: dc,
        fontSize: 13,
        marginLeft: 4,
        transition: "transform 0.2s",
        display: "inline-block",
        transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)"
      }
    }, "\u25BE")), /*#__PURE__*/React.createElement("div", {
      style: {
        color: C.muted,
        fontSize: 12,
        marginTop: 3,
        display: "flex",
        gap: 12,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", null, cfg?.name || "Unknown config"), sess.date && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#2a5a2a"
      }
    }, "\xB7"), sess.date && /*#__PURE__*/React.createElement("span", null, sess.date)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginTop: 8,
        flexWrap: "wrap",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Badge, null, sess.surface || "Mat"), sess.chokeDown && sess.chokeDown !== "None" && /*#__PURE__*/React.createElement(Badge, null, "\u2193 ", sess.chokeDown), a && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Badge, null, a.nTotal, " shots"), /*#__PURE__*/React.createElement(Badge, null, a.nBall ?? a.n, " ball \xB7 ", a.nClub, " club"), /*#__PURE__*/React.createElement("span", {
      style: {
        background: "#030803",
        border: `1px solid ${dc}`,
        color: dc,
        fontSize: 12,
        padding: "2px 10px",
        borderRadius: 3,
        fontFamily: "monospace",
        fontWeight: 800,
        letterSpacing: 0.5
      }
    }, "D ", a.dispersionScore)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "flex-start",
        flexShrink: 0,
        marginLeft: 12
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => toggleSelSess(sess.id),
      style: {
        background: selected ? "#0a2a0a" : "none",
        border: `1px solid ${selected ? C.accent : C.muted}`,
        color: selected ? C.accent : C.muted,
        borderRadius: 5,
        padding: "6px 12px",
        fontSize: 11,
        cursor: "pointer",
        whiteSpace: "nowrap"
      }
    }, selected ? "✓ Selected" : "Compare"), /*#__PURE__*/React.createElement("button", {
      onClick: () => analyzeSession(sess.id),
      disabled: !!analyzing,
      style: SBO
    }, analyzing === sess.id ? "Analyzing…" : "AI Analysis"), /*#__PURE__*/React.createElement("button", {
      onClick: () => delSess(sess.id),
      style: {
        background: "none",
        border: "none",
        color: C.dimmer,
        cursor: "pointer",
        fontSize: 22,
        lineHeight: 1,
        padding: "0 4px"
      }
    }, "\xD7"))), !collapsed && /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.card,
        padding: "0 16px 16px"
      }
    }, a && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        margin: "16px -16px 14px",
        padding: "8px 16px",
        background: "linear-gradient(90deg,#0a1f0a 0%,#071407 60%,transparent 100%)",
        borderTop: "1px solid #1a3a1a",
        borderBottom: "1px solid #1a3a1a",
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 3,
        height: 18,
        background: "#4ade80",
        borderRadius: 2,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#8ab58a",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 1.5,
        textTransform: "uppercase"
      }
    }, "Configuration")), cfg && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "10px 16px",
        marginBottom: 4
      }
    }, [{
      label: "Club",
      value: cfg.club
    }, {
      label: "Length",
      value: cfg.length,
      highlight: true
    }, {
      label: "Lie Angle",
      value: cfg.lie,
      highlight: true
    }, {
      label: "Loft",
      value: cfg.loft ? `${cfg.loft}°` : "—",
      highlight: true
    }, {
      label: "Head",
      value: cfg.head || "—"
    }, {
      label: "Swing Weight",
      value: cfg.swingWeight || "—"
    }, {
      label: "Shaft",
      value: cfg.shaft || "—"
    }, {
      label: "Flex",
      value: cfg.flex || "—"
    }, {
      label: "Shaft Weight",
      value: cfg.shaftWeight ? `${cfg.shaftWeight}g` : "—"
    }, {
      label: "Grip",
      value: cfg.grip || "—"
    }, {
      label: "Grip Size",
      value: cfg.gripSize || "—"
    }, {
      label: "Surface",
      value: sess.surface || "—"
    }, {
      label: "Choke Down",
      value: sess.chokeDown && sess.chokeDown !== "None" ? sess.chokeDown : "None"
    }].map(_ref13 => {
      let label = _ref13.label,
        value = _ref13.value,
        highlight = _ref13.highlight;
      return /*#__PURE__*/React.createElement("div", {
        key: label,
        style: {
          borderBottom: `1px solid ${C.faint}`,
          paddingBottom: 6
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#3a6a3a",
          fontSize: 10,
          marginBottom: 2
        }
      }, label), /*#__PURE__*/React.createElement("div", {
        style: {
          color: highlight ? "#ddeedd" : "#8ab58a",
          fontSize: 13,
          fontFamily: "monospace",
          fontWeight: highlight ? 700 : 400
        }
      }, value));
    }), cfg.notes && /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: "1 / -1",
        borderBottom: `1px solid ${C.faint}`,
        paddingBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#3a6a3a",
        fontSize: 10,
        marginBottom: 2
      }
    }, "Notes"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#6a8a6a",
        fontSize: 12
      }
    }, cfg.notes)), arccosData && (() => {
      const ac = findArccosClub(arccosData, cfg.club);
      if (!ac) return null;
      const smart = ac.smartCarry ?? ac.smartDistance?.distance ?? null;
      const rMin = ac.rangeMin ?? null;
      const rMax = ac.rangeMax ?? null;
      const shots = ac.shotCount ?? ac.shots ?? null;
      const longest = ac.longestDistance ?? ac.longest ?? null;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          gridColumn: "1 / -1",
          borderTop: `1px solid ${C.faint}`,
          paddingTop: 8,
          marginTop: 4
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#3a8a6a",
          fontSize: 10,
          letterSpacing: 1,
          marginBottom: 6
        }
      }, "ARCCOS ON-COURSE DATA"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 16,
          flexWrap: "wrap"
        }
      }, smart != null && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#3a6a3a",
          fontSize: 9
        }
      }, "Smart Carry"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#4ade80",
          fontSize: 14,
          fontFamily: "monospace",
          fontWeight: 700
        }
      }, Math.round(smart), " yds")), rMin != null && rMax != null && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#3a6a3a",
          fontSize: 9
        }
      }, "Smart Range"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#8ab58a",
          fontSize: 12,
          fontFamily: "monospace"
        }
      }, Math.round(rMin), "\u2013", Math.round(rMax), " yds")), longest != null && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#3a6a3a",
          fontSize: 9
        }
      }, "Longest"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#6a8a6a",
          fontSize: 12,
          fontFamily: "monospace"
        }
      }, Math.round(longest), " yds")), shots != null && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#3a6a3a",
          fontSize: 9
        }
      }, "On-course shots"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#6a8a6a",
          fontSize: 12,
          fontFamily: "monospace"
        }
      }, shots))));
    })())), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        margin: "16px -16px 14px",
        padding: "8px 16px",
        background: "linear-gradient(90deg,#0a1f0a 0%,#071407 60%,transparent 100%)",
        borderTop: "1px solid #1a3a1a",
        borderBottom: "1px solid #1a3a1a",
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 3,
        height: 18,
        background: "#4ade80",
        borderRadius: 2,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#8ab58a",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 1.5,
        textTransform: "uppercase"
      }
    }, "Session Data")), /*#__PURE__*/React.createElement(Legend, null), /*#__PURE__*/React.createElement(StatGrid, {
      a: a,
      club: cfg?.club
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        margin: "16px -16px 14px",
        padding: "8px 16px",
        background: "linear-gradient(90deg,#0a1f0a 0%,#071407 60%,transparent 100%)",
        borderTop: "1px solid #1a3a1a",
        borderBottom: "1px solid #1a3a1a",
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 3,
        height: 18,
        background: "#4ade80",
        borderRadius: 2,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#8ab58a",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 1.5,
        textTransform: "uppercase"
      }
    }, "Dispersion")), /*#__PURE__*/React.createElement(DispersionScoreBadge, {
      a: a,
      club: cfg?.club
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        flexWrap: "wrap",
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 280
      }
    }, /*#__PURE__*/React.createElement(DispersionPlot, {
      a: a
    })), /*#__PURE__*/React.createElement(ShotTracer, {
      a: a
    })), /*#__PURE__*/React.createElement(ShotShapes, {
      a: a
    }))), sess.aiAnalysis && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        padding: "12px 14px",
        background: C.bg,
        borderRadius: 6,
        border: `1px solid ${C.faint}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: C.muted,
        fontSize: 10,
        letterSpacing: 2,
        marginBottom: 8
      }
    }, "AI ANALYSIS"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#8ab58a",
        fontSize: 13,
        lineHeight: 1.7,
        whiteSpace: "pre-wrap"
      }
    }, sess.aiAnalysis))));
  })), tab === "configs" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.dimmer,
      fontSize: 12
    }
  }, sel.length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, sel.length, " config", sel.length > 1 ? "s" : "", " selected \xA0\xB7\xA0 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted
    }
  }, "click cards to select")) : /*#__PURE__*/React.createElement("span", null, configs.length, " config", configs.length !== 1 ? "s" : "", " across ", [...new Set(configs.map(c => c.club))].length, " clubs")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, sel.length >= 2 && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setCmpMode("configs");
      setTab("compare");
    },
    style: {
      ...SB,
      padding: "6px 14px",
      fontSize: 12
    }
  }, "Compare ", sel.length, " \u2192"), sel.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setSel([]),
    style: {
      background: "none",
      border: `1px solid ${C.faint}`,
      color: C.dimmer,
      fontSize: 11,
      padding: "5px 10px",
      borderRadius: 5,
      cursor: "pointer"
    }
  }, "Clear"))), !configs.length && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#0e2a0e",
      fontSize: 14,
      padding: "50px 0",
      textAlign: "center"
    }
  }, "No configurations yet \u2014 click + Config to add one."), (() => {
    const byClub = {};
    configs.forEach(cfg => {
      (byClub[cfg.club || "Other"] = byClub[cfg.club || "Other"] || []).push(cfg);
    });
    const clubs = [...BAG_ORDER.filter(c => byClub[c]), ...Object.keys(byClub).filter(c => !BAG_ORDER.includes(c))];
    return clubs.map(club => {
      const clubCfgs = byClub[club];
      const collapsed = collapsedClubs.has(club);
      const clubSel = clubCfgs.filter(c => sel.includes(c.id));
      const allShots = sessions.filter(s => clubCfgs.some(c => c.id === s.configId)).flatMap(s => s.shots || []);
      return /*#__PURE__*/React.createElement("div", {
        key: club,
        style: {
          marginBottom: 20
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 8,
          padding: "7px 12px",
          background: "linear-gradient(90deg,#0a1f0a,#071407 70%,transparent)",
          borderTop: `1px solid ${C.faint}`,
          borderBottom: `1px solid ${C.faint}`,
          borderRadius: 4
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => toggleClubCollapse(club),
        style: {
          background: "none",
          border: "none",
          color: C.accent,
          fontSize: 13,
          cursor: "pointer",
          width: 18,
          fontFamily: "monospace",
          padding: 0,
          flexShrink: 0
        }
      }, collapsed ? "▶" : "▼"), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "#ddeedd",
          fontWeight: 700,
          fontSize: 15,
          minWidth: 36
        }
      }, club), /*#__PURE__*/React.createElement("span", {
        style: {
          color: C.dimmer,
          fontSize: 11
        }
      }, clubCfgs.length, " config", clubCfgs.length !== 1 ? "s" : ""), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }), clubSel.length >= 2 && /*#__PURE__*/React.createElement("button", {
        onClick: e => {
          e.stopPropagation();
          setCmpMode("configs");
          setTab("compare");
        },
        style: {
          ...SB,
          padding: "4px 12px",
          fontSize: 11
        }
      }, "Compare ", clubSel.length, " \u2192"), /*#__PURE__*/React.createElement("button", {
        onClick: () => addCfgForClub(club),
        style: {
          background: "none",
          border: `1px solid ${C.muted}`,
          color: C.muted,
          fontSize: 11,
          padding: "4px 10px",
          borderRadius: 4,
          cursor: "pointer"
        }
      }, "+ Config")), !collapsed && clubCfgs.map(cfg => {
        const active = sel.includes(cfg.id);
        const sessCount = sessions.filter(s => s.configId === cfg.id).length;
        const cfgShots = sessions.filter(s => s.configId === cfg.id).flatMap(s => s.shots || []);
        const cfgA = cfgShots.length ? analyze(cfgShots) : null;
        return /*#__PURE__*/React.createElement("div", {
          key: cfg.id,
          onClick: () => toggleSel(cfg.id),
          style: {
            ...SCd,
            marginLeft: 28,
            marginBottom: 8,
            border: `2px solid ${active ? C.accent : C.faint}`,
            background: active ? "#061206" : C.card,
            cursor: "pointer",
            transition: "all 0.12s"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            flex: 1
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap"
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            color: C.text,
            fontWeight: 700,
            fontSize: 14
          }
        }, cfg.name), active && /*#__PURE__*/React.createElement("span", {
          style: {
            background: "#0a2a0a",
            color: C.accent,
            fontSize: 10,
            padding: "2px 7px",
            borderRadius: 3,
            border: `1px solid ${C.muted}`
          }
        }, "\u2713"), /*#__PURE__*/React.createElement("span", {
          style: {
            color: C.dimmer,
            fontSize: 11
          }
        }, sessCount, " session", sessCount !== 1 ? "s" : "")), /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            gap: 14,
            marginTop: 7,
            flexWrap: "wrap"
          }
        }, [{
          l: "Length",
          v: cfg.length,
          hi: true
        }, {
          l: "Lie",
          v: cfg.lie,
          hi: true
        }, {
          l: "Loft",
          v: cfg.loft ? `${cfg.loft}°` : "—",
          hi: true
        }, {
          l: "Shaft",
          v: `${cfg.shaft || "—"} ${cfg.flex || ""}`.trim()
        }, {
          l: "SW",
          v: cfg.swingWeight || "—"
        }].map(_ref14 => {
          let l = _ref14.l,
            v = _ref14.v,
            hi = _ref14.hi;
          return /*#__PURE__*/React.createElement("div", {
            key: l
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              color: "#3a6a3a",
              fontSize: 9
            }
          }, l), /*#__PURE__*/React.createElement("div", {
            style: {
              color: hi ? C.text : C.dim,
              fontSize: 12,
              fontFamily: "monospace",
              fontWeight: hi ? 700 : 400
            }
          }, v));
        })), cfgA && /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            gap: 12,
            marginTop: 8,
            flexWrap: "wrap"
          }
        }, [{
          l: "Carry",
          v: `${f(cfgA.carry)} yds`
        }, {
          l: "Smash",
          v: f(cfgA.smash, 2),
          color: getRangeColor(cfg.club, "smash", cfgA.smash)
        }, {
          l: "Spread",
          v: `${f(cfgA.offlineSpread)} yds`,
          color: getRangeColor(cfg.club, "offlineSpread", cfgA.offlineSpread)
        }, {
          l: "D-Score",
          v: `${cfgA.dispersionScore}`,
          color: cfgA.dispersionScore >= 80 ? "#4ade80" : cfgA.dispersionScore >= 50 ? "#facc15" : "#f87171"
        }].map(_ref15 => {
          let l = _ref15.l,
            v = _ref15.v,
            _ref15$color = _ref15.color,
            color = _ref15$color === void 0 ? "#6a8a6a" : _ref15$color;
          return /*#__PURE__*/React.createElement("div", {
            key: l
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              color: "#3a5a3a",
              fontSize: 9
            }
          }, l), /*#__PURE__*/React.createElement("div", {
            style: {
              color,
              fontSize: 12,
              fontFamily: "monospace",
              fontWeight: 700
            }
          }, v));
        })), cfg.notes && /*#__PURE__*/React.createElement("div", {
          style: {
            color: "#1a3a1a",
            fontSize: 11,
            marginTop: 5
          }
        }, cfg.notes)), /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            gap: 6,
            marginLeft: 10,
            flexShrink: 0
          }
        }, /*#__PURE__*/React.createElement("button", {
          onClick: e => {
            e.stopPropagation();
            editCfg(cfg);
          },
          style: {
            background: "none",
            border: `1px solid ${C.muted}`,
            color: C.muted,
            cursor: "pointer",
            fontSize: 11,
            padding: "3px 9px",
            borderRadius: 4
          }
        }, "Edit"), /*#__PURE__*/React.createElement("button", {
          onClick: e => {
            e.stopPropagation();
            delCfg(cfg.id);
          },
          style: {
            background: "none",
            border: "none",
            color: C.dimmer,
            cursor: "pointer",
            fontSize: 20,
            lineHeight: 1
          }
        }, "\xD7"))));
      }));
    });
  })(), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab("add-config"),
    style: {
      ...SB,
      width: "100%",
      marginTop: 4,
      background: "none",
      border: `1px dashed ${C.faint}`,
      color: C.dimmer
    }
  }, "+ New Club Config")), tab === "compare" && (() => {
    // numVal: extract raw numeric from an analysis object for delta calculation
    // higherBetter: true = green when delta>0, false = green when delta<0, null = neutral grey
    const metricRows = [{
      label: "Dispersion Score",
      metric: null,
      fn: a => a?.dispersionScore != null ? `${a.dispersionScore}/100` : "—",
      numVal: a => a?.dispersionScore,
      higherBetter: true,
      unit: "pts"
    }, {
      label: "Strokes Gained",
      metric: null,
      cfgFn: (a, cfg) => {
        if (a?.dispersionScore == null) return "—";
        const dh = scoreToHdcp(a.dispersionScore);
        const sg = (playerHdcp - dh) * SG_PER_HDCP * (SHOTS_PER_ROUND[cfg?.club] || 3);
        return (sg >= 0 ? "+" : "") + sg.toFixed(2) + " SG/rnd";
      },
      numVal: (a, cfg) => {
        if (a?.dispersionScore == null) return null;
        const dh = scoreToHdcp(a.dispersionScore);
        return (playerHdcp - dh) * SG_PER_HDCP * (SHOTS_PER_ROUND[cfg?.club] || 3);
      },
      higherBetter: true,
      unit: "SG/rnd"
    }, {
      label: "Carry",
      metric: null,
      fn: a => `${f(a.carry)} yds`,
      numVal: a => a?.carry,
      higherBetter: true,
      unit: "yds"
    }, {
      label: "Carry Spread",
      metric: null,
      fn: a => `${f(a.carrySpread)} yds`,
      numVal: a => a?.carrySpread,
      higherBetter: false,
      unit: "yds"
    }, {
      label: "Offline Avg",
      metric: null,
      fn: a => fd(a.offline),
      numVal: a => Math.abs(a?.offline || 0),
      higherBetter: false,
      unit: "yds"
    }, {
      label: "Offline Spread",
      metric: "offlineSpread",
      fn: a => `${f(a.offlineSpread)} yds`,
      numVal: a => a?.offlineSpread,
      higherBetter: false,
      unit: "yds"
    }, {
      label: "Smash Factor",
      metric: "smash",
      fn: a => f(a.smash, 2),
      numVal: a => a?.smash,
      higherBetter: true,
      unit: ""
    }, {
      label: "Ball Speed",
      metric: null,
      fn: a => `${f(a.ballSpeed)} mph`,
      numVal: a => a?.ballSpeed,
      higherBetter: true,
      unit: "mph"
    }, {
      label: "Club Speed",
      metric: null,
      fn: a => `${f(a.clubSpeed)} mph`,
      numVal: a => a?.clubSpeed,
      higherBetter: null,
      unit: "mph"
    }, {
      label: "Launch Angle",
      metric: "launchAngle",
      fn: a => `${f(a.launchAngle)}°`,
      numVal: a => a?.launchAngle,
      higherBetter: null,
      unit: "°"
    }, {
      label: "Peak Height",
      metric: "peakHeight",
      fn: a => `${f(a.peakHeight)} ft`,
      numVal: a => a?.peakHeight,
      higherBetter: null,
      unit: "ft"
    }, {
      label: "Descent Angle",
      metric: "descentAngle",
      fn: a => `${f(a.descentAngle)}°`,
      numVal: a => a?.descentAngle,
      higherBetter: null,
      unit: "°"
    }, {
      label: "Attack Angle",
      metric: "attackAngle",
      fn: a => fa(a.attackAngle),
      numVal: a => a?.attackAngle,
      higherBetter: null,
      unit: "°"
    }, {
      label: "Club Path",
      metric: null,
      fn: a => `${fd(a.clubPath)}°`,
      numVal: null,
      unit: "°"
    }, {
      label: "Total Spin",
      metric: "totalSpin",
      fn: a => `${f(a.totalSpin, 0)} rpm`,
      numVal: a => a?.totalSpin,
      higherBetter: null,
      unit: "rpm"
    }, {
      label: "Back Spin",
      metric: null,
      fn: a => `${f(a.backSpin, 0)} rpm`,
      numVal: null,
      unit: "rpm"
    }, {
      label: "Side Spin",
      metric: null,
      fn: a => `${fd(a.sideSpin, 0)} rpm`,
      numVal: null,
      unit: "rpm"
    }, {
      label: "Launch Dir",
      metric: null,
      fn: a => `${fd(a.launchDir)} yds`,
      numVal: null,
      unit: "yds"
    }, {
      label: "Curve",
      metric: null,
      fn: a => `${fd(a.curve)} yds`,
      numVal: null,
      unit: "yds"
    }, {
      label: "Left Misses",
      metric: null,
      fn: a => a.leftMisses,
      numVal: a => a?.leftMisses,
      higherBetter: false,
      unit: "shots"
    }, {
      label: "Right Misses",
      metric: null,
      fn: a => a.rightMisses,
      numVal: a => a?.rightMisses,
      higherBetter: false,
      unit: "shots"
    }, {
      label: "Straight",
      metric: null,
      fn: a => a.straightShots,
      numVal: a => a?.straightShots,
      higherBetter: true,
      unit: "shots"
    }];
    const cellColor = (clubName, metric, label, a) => {
      if (label === "Dispersion Score" && a?.dispersionScore != null) return a.dispersionScore >= 80 ? "#4ade80" : a.dispersionScore >= 50 ? "#facc15" : "#f87171";
      if (a && metric) return getRangeColor(clubName, metric, a[metric]);
      return C.text;
    };

    // ── Mode toggle
    const ModeToggle = () => /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 0,
        marginBottom: 18,
        border: `1px solid ${C.faint}`,
        borderRadius: 6,
        overflow: "hidden",
        width: "fit-content"
      }
    }, [["configs", "By Config"], ["sessions", "By Session"]].map(_ref16 => {
      let _ref17 = _slicedToArray(_ref16, 2),
        m = _ref17[0],
        l = _ref17[1];
      return /*#__PURE__*/React.createElement("button", {
        key: m,
        onClick: () => setCmpMode(m),
        style: {
          background: cmpMode === m ? "#0a2a0a" : "none",
          border: "none",
          color: cmpMode === m ? C.accent : C.muted,
          padding: "7px 18px",
          fontSize: 12,
          cursor: "pointer",
          fontFamily: "Georgia,serif",
          borderRight: m === "configs" ? `1px solid ${C.faint}` : "none"
        }
      }, l);
    }));

    // ── CONFIG COMPARE view
    if (cmpMode === "configs") return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ModeToggle, null), sel.length < 2 && /*#__PURE__*/React.createElement("div", {
      style: {
        color: C.dimmer,
        fontSize: 14
      }
    }, "Select 2\u20133 configurations from the Configs tab."), cmpData.length >= 2 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Legend, null), (() => {
      const showDelta = cmpData.length === 2;
      const cols = showDelta ? `140px repeat(${cmpData.length},1fr) 80px` : `140px repeat(${cmpData.length},1fr)`;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: cols,
          gap: 4,
          marginBottom: 14
        }
      }, /*#__PURE__*/React.createElement("div", null), cmpData.map((_ref18, i) => {
        let cfg = _ref18.cfg,
          n = _ref18.n;
        return /*#__PURE__*/React.createElement("div", {
          key: cfg.id,
          style: {
            background: "#071007",
            borderRadius: 6,
            padding: "8px 10px",
            borderLeft: i === 0 ? "3px solid #4ade80" : "3px solid #22d3ee"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            color: i === 0 ? "#4ade80" : "#22d3ee",
            fontWeight: 700,
            fontSize: 13
          }
        }, cfg.name), /*#__PURE__*/React.createElement("div", {
          style: {
            color: C.muted,
            fontSize: 10,
            marginTop: 2
          }
        }, cfg.lie, " \xB7 ", cfg.length), /*#__PURE__*/React.createElement("div", {
          style: {
            color: C.dimmer,
            fontSize: 10
          }
        }, n, " session(s)"));
      }), showDelta && /*#__PURE__*/React.createElement("div", {
        style: {
          background: "#07100f",
          borderRadius: 6,
          padding: "8px 10px",
          borderLeft: "3px solid #6b7280"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#9ca3af",
          fontWeight: 700,
          fontSize: 12
        }
      }, "\u0394 Diff"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: C.dimmer,
          fontSize: 10,
          marginTop: 2
        }
      }, "B vs A"))), metricRows.map(row => {
        // Compute delta (B - A) for 2-config compare
        let delta = null,
          deltaColor = "#6b7280",
          deltaStr = "—";
        if (showDelta && row.numVal) {
          // Support numVal(a) or numVal(a, cfg) signatures
          const getNum = item => row.numVal.length > 1 ? row.numVal(item.a, item.cfg) : row.numVal(item.a);
          const vA = getNum(cmpData[0]);
          const vB = getNum(cmpData[1]);
          if (vA != null && vB != null && !isNaN(vA) && !isNaN(vB)) {
            delta = vB - vA;
            const abs = Math.abs(delta);
            const unit = row.unit || "";
            // Format delta string with unit label
            const dec = abs >= 10 ? 1 : abs >= 1 ? 2 : 3;
            deltaStr = (delta > 0 ? "+" : "") + f(delta, dec) + (unit ? " " + unit : "");
            if (Math.abs(delta) < 0.005) {
              deltaStr = "—";
              deltaColor = "#3a5a3a";
            } else {
              // Use range-based improvement detection when a CLUB_RANGES entry exists
              // for this metric — B closer to green zone = improvement (green)
              const clubA = cmpData[0].cfg.club;
              const clubB = cmpData[1].cfg.club;
              const dA = row.metric ? distFromOptimal(clubA, row.metric, vA) : null;
              const dB = row.metric ? distFromOptimal(clubB, row.metric, vB) : null;
              if (dA !== null && dB !== null) {
                // Range-based: B closer to optimal = green
                if (dB < dA - 0.01) deltaColor = "#4ade80"; // improvement
                else if (dB > dA + 0.01) deltaColor = "#f87171"; // regression
                else deltaColor = "#9ca3af"; // same zone
              } else if (row.higherBetter === true) {
                deltaColor = delta > 0 ? "#4ade80" : "#f87171";
              } else if (row.higherBetter === false) {
                deltaColor = delta < 0 ? "#4ade80" : "#f87171";
              } else {
                deltaColor = "#9ca3af"; // neutral
              }
            }
          }
        }
        return /*#__PURE__*/React.createElement("div", {
          key: row.label,
          style: {
            display: "grid",
            gridTemplateColumns: cols,
            borderBottom: `1px solid ${C.faint}`,
            padding: "4px 0"
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            color: C.dim,
            fontSize: 11,
            display: "flex",
            alignItems: "center"
          }
        }, row.label), cmpData.map((_ref19, i) => {
          let cfg = _ref19.cfg,
            a = _ref19.a;
          const color = cellColor(cfg.club, row.metric, row.label, a);
          const val = a ? row.cfgFn ? row.cfgFn(a, cfg) : row.fn(a) : "—";
          return /*#__PURE__*/React.createElement("span", {
            key: cfg.id,
            style: {
              color,
              fontSize: 13,
              fontFamily: "monospace",
              padding: "0 10px",
              fontWeight: color !== C.text ? 600 : 400
            }
          }, val);
        }), showDelta && /*#__PURE__*/React.createElement("span", {
          style: {
            color: deltaColor,
            fontSize: 12,
            fontFamily: "monospace",
            fontWeight: deltaColor !== "#6b7280" && deltaColor !== "#3a5a3a" && deltaColor !== "#9ca3af" ? 700 : 400,
            paddingLeft: 8
          }
        }, deltaStr));
      }));
    })(), /*#__PURE__*/React.createElement("button", {
      onClick: runCmpAI,
      disabled: !!analyzing,
      style: {
        ...SB,
        width: "100%",
        marginTop: 18
      }
    }, analyzing === "cmp" ? "Analyzing…" : "Get AI Comparison"), cmpAI && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        padding: "14px 16px",
        background: C.bg,
        borderRadius: 6,
        border: `1px solid ${C.faint}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: C.muted,
        fontSize: 10,
        letterSpacing: 2,
        marginBottom: 8
      }
    }, "AI COMPARISON"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#8ab58a",
        fontSize: 13,
        lineHeight: 1.7,
        whiteSpace: "pre-wrap"
      }
    }, cmpAI))));

    // ── SESSION COMPARE view
    const selSessData = selSess.map(sid => {
      const sess = sessions.find(s => s.id === sid);
      const cfg = configs.find(c => c.id === sess?.configId);
      const a = sess?.shots?.length ? analyze(sess.shots) : null;
      return {
        sess,
        cfg,
        a
      };
    }).filter(x => x.sess);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ModeToggle, null), selSessData.length < 2 && /*#__PURE__*/React.createElement("div", {
      style: {
        color: C.dimmer,
        fontSize: 14
      }
    }, "Select 2\u20133 sessions using the Compare button on each session card."), selSessData.length >= 2 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Legend, null), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: `140px repeat(${selSessData.length},1fr)`,
        gap: 4,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", null), selSessData.map(_ref20 => {
      let sess = _ref20.sess,
        cfg = _ref20.cfg,
        a = _ref20.a;
      return /*#__PURE__*/React.createElement("div", {
        key: sess.id,
        style: {
          background: "#071007",
          borderRadius: 6,
          padding: "10px 12px"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          color: C.accent,
          fontWeight: 700,
          fontSize: 13
        }
      }, sess.name), /*#__PURE__*/React.createElement("div", {
        style: {
          color: C.muted,
          fontSize: 10,
          marginTop: 2
        }
      }, cfg?.club, " \xB7 ", cfg?.lie, " \xB7 ", cfg?.length), /*#__PURE__*/React.createElement("div", {
        style: {
          color: C.dimmer,
          fontSize: 10,
          marginTop: 1
        }
      }, sess.date, " \xB7 ", sess.surface), sess.chokeDown && sess.chokeDown !== "None" && /*#__PURE__*/React.createElement("div", {
        style: {
          color: C.dimmer,
          fontSize: 10
        }
      }, "Choke: ", sess.chokeDown), a?.dispersionScore != null && /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 6,
          fontSize: 18,
          fontWeight: 900,
          fontFamily: "monospace",
          color: a.dispersionScore >= 80 ? "#4ade80" : a.dispersionScore >= 50 ? "#facc15" : "#f87171"
        }
      }, a.dispersionScore, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: C.muted,
          fontWeight: 400
        }
      }, "/100")));
    })), metricRows.map(row => {
      const vals = selSessData.map(_ref21 => {
        let cfg = _ref21.cfg,
          a = _ref21.a;
        return {
          cfg,
          a,
          val: a ? row.cfgFn ? row.cfgFn(a, cfg) : row.fn ? row.fn(a) : "—" : "—"
        };
      });
      // Compute numeric delta for 2-session compare
      let delta = null;
      if (selSessData.length === 2) {
        const v0 = selSessData[0].a && (row.fn || row.cfgFn) ? parseFloat(row.cfgFn ? row.cfgFn(selSessData[0].a, selSessData[0].cfg) : row.fn(selSessData[0].a)) : NaN;
        const v1 = selSessData[1].a && (row.fn || row.cfgFn) ? parseFloat(row.cfgFn ? row.cfgFn(selSessData[1].a, selSessData[1].cfg) : row.fn(selSessData[1].a)) : NaN;
        if (!isNaN(v0) && !isNaN(v1)) delta = v1 - v0;
      }
      return /*#__PURE__*/React.createElement("div", {
        key: row.label,
        style: {
          display: "grid",
          gridTemplateColumns: `140px repeat(${selSessData.length},1fr)${selSessData.length === 2 ? " 64px" : ""}`,
          borderBottom: `1px solid ${C.faint}`,
          padding: "4px 0"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: C.dim,
          fontSize: 11,
          display: "flex",
          alignItems: "center"
        }
      }, row.label), vals.map(_ref22 => {
        let cfg = _ref22.cfg,
          a = _ref22.a,
          val = _ref22.val;
        const color = cellColor(cfg?.club || "8i", row.metric, row.label, a);
        return /*#__PURE__*/React.createElement("span", {
          key: cfg?.id || Math.random(),
          style: {
            color,
            fontSize: 13,
            fontFamily: "monospace",
            padding: "0 10px",
            fontWeight: color !== C.text ? 600 : 400
          }
        }, val);
      }), selSessData.length === 2 && delta != null && Math.abs(delta) > 0.01 && /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          fontFamily: "monospace",
          textAlign: "right",
          color: delta > 0 ? "#4ade80" : "#f87171",
          paddingRight: 4
        }
      }, delta > 0 ? "+" : "", delta.toFixed(1)), selSessData.length === 2 && (delta == null || Math.abs(delta) <= 0.01) && /*#__PURE__*/React.createElement("span", null));
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: C.muted,
        fontSize: 10,
        letterSpacing: 1,
        marginBottom: 10
      }
    }, "DISPERSION MAPS"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(${selSessData.length},1fr)`,
        gap: 12
      }
    }, selSessData.map(_ref23 => {
      let sess = _ref23.sess,
        a = _ref23.a;
      return /*#__PURE__*/React.createElement("div", {
        key: sess.id
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          color: C.dim,
          fontSize: 10,
          marginBottom: 4
        }
      }, sess.name), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 8,
          alignItems: "flex-start",
          flexWrap: "wrap"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 200
        }
      }, /*#__PURE__*/React.createElement(DispersionPlot, {
        a: a
      })), /*#__PURE__*/React.createElement(ShotTracer, {
        a: a
      })));
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: C.muted,
        fontSize: 10,
        letterSpacing: 1,
        marginBottom: 10
      }
    }, "SHOT SHAPES"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(${selSessData.length},1fr)`,
        gap: 12
      }
    }, selSessData.map(_ref24 => {
      let sess = _ref24.sess,
        a = _ref24.a;
      return /*#__PURE__*/React.createElement("div", {
        key: sess.id
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          color: C.dim,
          fontSize: 10,
          marginBottom: 4
        }
      }, sess.name), /*#__PURE__*/React.createElement(ShotShapes, {
        a: a
      }));
    }))), /*#__PURE__*/React.createElement("button", {
      onClick: runCmpAI,
      disabled: !!analyzing,
      style: {
        ...SB,
        width: "100%",
        marginTop: 18
      }
    }, analyzing === "cmp" ? "Analyzing…" : "Get AI Comparison"), cmpAI && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        padding: "14px 16px",
        background: C.bg,
        borderRadius: 6,
        border: `1px solid ${C.faint}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: C.muted,
        fontSize: 10,
        letterSpacing: 2,
        marginBottom: 8
      }
    }, "AI COMPARISON"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#8ab58a",
        fontSize: 13,
        lineHeight: 1.7,
        whiteSpace: "pre-wrap"
      }
    }, cmpAI))));
  })(), tab === "add-config" && /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 11,
      letterSpacing: 2
    }
  }, editingCfgId ? "EDIT CONFIGURATION" : "NEW CONFIGURATION"), editingCfgId && /*#__PURE__*/React.createElement("button", {
    onClick: cancelEdit,
    style: {
      background: "none",
      border: `1px solid ${C.faint}`,
      color: C.dimmer,
      fontSize: 11,
      padding: "4px 10px",
      borderRadius: 4,
      cursor: "pointer"
    }
  }, "Cancel")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, [{
    k: "name",
    l: "Config Name *",
    ph: 'e.g. 8i — 3° Upright +3/4"',
    full: true,
    isName: true
  }, {
    k: "club",
    l: "Club",
    type: "sel",
    opts: CLUBS,
    isClub: true
  }, {
    k: "head",
    l: "Head / Model",
    ph: "Ping Blueprint S"
  }, {
    k: "loft",
    l: "Loft (°)",
    ph: "37"
  }, {
    k: "lie",
    l: "Lie Angle",
    ph: "3° Upright"
  }, {
    k: "length",
    l: "Length",
    ph: '+3/4"'
  }, {
    k: "shaft",
    l: "Shaft",
    ph: "Modus 105"
  }, {
    k: "shaftWeight",
    l: "Shaft Weight (g)",
    ph: "105"
  }, {
    k: "flex",
    l: "Flex",
    ph: "Stiff"
  }, {
    k: "grip",
    l: "Grip",
    ph: "MCC+4 Midsize"
  }, {
    k: "gripSize",
    l: "Grip Size",
    ph: "Midsize"
  }, {
    k: "swingWeight",
    l: "Swing Weight",
    ph: "E2"
  }, {
    k: "notes",
    l: "Notes",
    ph: "Other variables, context…",
    full: true
  }].map(fi => /*#__PURE__*/React.createElement("div", {
    key: fi.k,
    style: {
      gridColumn: fi.full ? "1 / -1" : "auto"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: SL
  }, fi.l, fi.isName && autoNaming && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#3a9a6a",
      fontSize: 10,
      marginLeft: 8,
      fontWeight: 400,
      letterSpacing: 0.3
    }
  }, "\u2726 auto \u2014 edit to override")), fi.type === "sel" ? /*#__PURE__*/React.createElement("select", {
    value: newCfg[fi.k],
    onChange: e => {
      if (fi.isClub) {
        // Club changed — reset auto-naming relative to new club's stock
        const newClub = e.target.value;
        const stock = configs.find(c => c.club === newClub && c.name.toLowerCase() === `${newClub.toLowerCase()} stock`) || configs.filter(c => c.club === newClub)[0] || null;
        if (stock && autoNaming) {
          const id = stock.id,
            sf = _objectWithoutProperties(stock, _excluded3);
          setNewCfg(prev => ({
            ...sf,
            ...prev,
            club: newClub,
            name: generateCfgName(newClub, {
              ...prev,
              club: newClub
            }, stock)
          }));
        } else {
          setNewCfg(prev => ({
            ...prev,
            club: newClub
          }));
        }
      } else {
        onCfgFieldChange(fi.k, e.target.value);
      }
    },
    style: SI
  }, fi.opts.map(o => /*#__PURE__*/React.createElement("option", {
    key: o
  }, o))) : /*#__PURE__*/React.createElement("input", {
    value: newCfg[fi.k],
    onChange: e => {
      if (fi.isName) {
        // User is manually typing the name — disable auto-naming
        setAutoNaming(false);
        setNewCfg(prev => ({
          ...prev,
          name: e.target.value
        }));
      } else {
        onCfgFieldChange(fi.k, e.target.value);
      }
    },
    placeholder: fi.ph,
    style: SI
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: saveCfg,
    style: {
      ...SB,
      marginTop: 18
    }
  }, editingCfgId ? "Update Configuration" : "Save Configuration")), tab === "add-session" && /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 11,
      letterSpacing: 2,
      marginBottom: 16
    }
  }, "IMPORT SESSION"), !configs.length && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#f87171",
      fontSize: 13,
      marginBottom: 12
    }
  }, "Create a configuration first."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: SL
  }, "Session Name *"), /*#__PURE__*/React.createElement("input", {
    value: newSess.name,
    onChange: e => setNewSess({
      ...newSess,
      name: e.target.value
    }),
    placeholder: "e.g. 8i Session 1 \u2014 Range",
    style: SI
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: SL
  }, "Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: newSess.date,
    onChange: e => setNewSess({
      ...newSess,
      date: e.target.value
    }),
    style: SI
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: SL
  }, "Configuration *"), /*#__PURE__*/React.createElement("select", {
    value: newSess.configId,
    onChange: e => setNewSess({
      ...newSess,
      configId: e.target.value
    }),
    style: SI
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select a configuration\u2026"), configs.map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: SL
  }, "Hitting Surface"), /*#__PURE__*/React.createElement("select", {
    value: newSess.surface,
    onChange: e => setNewSess({
      ...newSess,
      surface: e.target.value
    }),
    style: SI
  }, /*#__PURE__*/React.createElement("option", null, "Mat"), /*#__PURE__*/React.createElement("option", null, "Grass"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: SL
  }, "Choke-Down"), /*#__PURE__*/React.createElement("select", {
    value: newSess.chokeDown,
    onChange: e => setNewSess({
      ...newSess,
      chokeDown: e.target.value
    }),
    style: SI
  }, /*#__PURE__*/React.createElement("option", null, "None"), /*#__PURE__*/React.createElement("option", null, "1/4\""), /*#__PURE__*/React.createElement("option", null, "1/2\""), /*#__PURE__*/React.createElement("option", null, "3/4\""), /*#__PURE__*/React.createElement("option", null, "1\""), /*#__PURE__*/React.createElement("option", null, "1.5\""), /*#__PURE__*/React.createElement("option", null, "2\""))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: SL
  }, "Upload CSV File * \u2014 worst 20% auto-removed on import"), /*#__PURE__*/React.createElement("div", {
    onClick: () => document.getElementById("csv-file-input").click(),
    style: {
      ...SI,
      cursor: "pointer",
      padding: "20px",
      textAlign: "center",
      borderStyle: "dashed",
      borderColor: newSess.csvText ? C.accent : "#1a3a1a",
      background: "#040a04"
    }
  }, newSess.fileName ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.accent
    }
  }, "\u2713 ", newSess.fileName, " \u2014 ", newSess.csvText.split("\n").length, " rows loaded") : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#2a5a2a"
    }
  }, "Click to choose CSV file")), /*#__PURE__*/React.createElement("input", {
    id: "csv-file-input",
    type: "file",
    accept: ".csv,text/csv",
    style: {
      display: "none"
    },
    onChange: e => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        const text = ev.target.result;
        setNewSess(s => ({
          ...s,
          csvText: text,
          fileName: file.name
        }));
        // Auto-fill session name from filename if blank
        setNewSess(s => ({
          ...s,
          csvText: text,
          fileName: file.name,
          name: s.name || file.name.replace(/\.csv$/i, "").replace(/_/g, " ")
        }));
      };
      reader.readAsText(file);
      e.target.value = ""; // reset so same file can be re-selected
    }
  }), newSess.csvText && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      padding: "8px 10px",
      background: "#040a04",
      border: `1px solid ${C.faint}`,
      borderRadius: 4,
      fontFamily: "monospace",
      fontSize: 10,
      color: "#2a5a2a",
      maxHeight: 120,
      overflow: "auto",
      whiteSpace: "pre"
    }
  }, newSess.csvText.split("\n").slice(0, 6).join("\n"), newSess.csvText.split("\n").length > 6 && `\n… +${newSess.csvText.split("\n").length - 6} more rows`))), err && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#f87171",
      fontSize: 12,
      marginBottom: 10
    }
  }, err), /*#__PURE__*/React.createElement("button", {
    onClick: importSess,
    style: SB
  }, "Import Session")), tab === "settings" && /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 480
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 11,
      letterSpacing: 2,
      marginBottom: 18
    }
  }, "SETTINGS"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...SCd,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.text,
      fontWeight: 700,
      marginBottom: 6
    }
  }, "Player Handicap"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.dimmer,
      fontSize: 12,
      marginBottom: 10
    }
  }, "Used to calculate Strokes Gained estimates on the Dispersion Score badge."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: "54",
    step: "1",
    value: playerHdcp,
    onChange: e => {
      const v = Math.max(0, Math.min(54, parseFloat(e.target.value) || 0));
      setPlayerHdcp(v);
      try {
        localStorage.setItem("player-hdcp", String(v));
      } catch {}
    },
    style: {
      ...SI,
      width: 80,
      textAlign: "center"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.dim,
      fontSize: 13
    }
  }, "handicap index"))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...SCd,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.text,
      fontWeight: 700,
      marginBottom: 6
    }
  }, "Anthropic API Key"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.dimmer,
      fontSize: 12,
      marginBottom: 10,
      lineHeight: 1.6
    }
  }, "Required for AI Analysis. Get yours at", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#4ade80"
    }
  }, "console.anthropic.com"), ". Stored locally on this device only \u2014 never transmitted except to Anthropic."), /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: "sk-ant-...",
    defaultValue: typeof localStorage !== "undefined" ? localStorage.getItem("anthropic-api-key") || "" : "",
    onBlur: e => {
      try {
        localStorage.setItem("anthropic-api-key", e.target.value.trim());
      } catch {}
      pop("API key saved ✓");
    },
    style: {
      ...SI,
      width: "100%",
      fontFamily: "monospace"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...SCd,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.text,
      fontWeight: 700,
      marginBottom: 4
    }
  }, "Arccos Smart Distances"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.dimmer,
      fontSize: 12,
      marginBottom: 14,
      lineHeight: 1.6
    }
  }, "Enter your Smart Carry distances from", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#4ade80"
    }
  }, "arccosgolf.com \u2192 Club Distances"), ". These will appear in each session card alongside your range carry for comparison."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "64px 1fr 1fr 1fr 64px",
      gap: 6,
      marginBottom: 6,
      paddingBottom: 6,
      borderBottom: `1px solid ${C.faint}`
    }
  }, ["Club", "Smart Carry", "Range Low", "Range High", "Shots"].map(h => /*#__PURE__*/React.createElement("div", {
    key: h,
    style: {
      color: "#3a6a3a",
      fontSize: 10,
      letterSpacing: 0.5
    }
  }, h))), ["4i", "5i", "6i", "7i", "8i", "9i", "PW", "GW", "SW", "LW", "Dr", "3w", "5w", "Hy"].map(club => {
    const existing = arccosData?.clubs?.find(c => c.clubType === club) || {};
    return /*#__PURE__*/React.createElement("div", {
      key: club,
      style: {
        display: "grid",
        gridTemplateColumns: "64px 1fr 1fr 1fr 64px",
        gap: 6,
        marginBottom: 4,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: C.text,
        fontSize: 12,
        fontFamily: "monospace",
        fontWeight: 700
      }
    }, club), ["smartCarry", "rangeMin", "rangeMax", "shots"].map(field => /*#__PURE__*/React.createElement("input", {
      key: field,
      type: "number",
      defaultValue: existing[field] || "",
      placeholder: "\u2014",
      onBlur: e => {
        const val = parseFloat(e.target.value) || null;
        setArccosData(prev => {
          const clubs = prev?.clubs ? [...prev.clubs] : [];
          const idx = clubs.findIndex(c => c.clubType === club);
          const updated = {
            ...(clubs[idx] || {
              clubType: club
            }),
            [field]: val
          };
          const next = idx >= 0 ? clubs.map((c, i) => i === idx ? updated : c) : [...clubs, updated];
          const newData = {
            ...(prev || {}),
            clubs: next
          };
          try {
            localStorage.setItem("arccos-data", JSON.stringify(newData));
          } catch {}
          return newData;
        });
      },
      style: {
        ...SI,
        padding: "5px 8px",
        fontSize: 12,
        textAlign: "center"
      }
    })));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#1a3a1a",
      fontSize: 11
    }
  }, "Changes save automatically on blur"), arccosData?.clubs?.some(c => c.smartCarry) && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setArccosData(null);
      try {
        localStorage.removeItem("arccos-data");
      } catch {}
      pop("Arccos data cleared");
    },
    style: {
      background: "none",
      border: `1px solid ${C.faint}`,
      color: C.dimmer,
      fontSize: 11,
      padding: "4px 10px",
      borderRadius: 4,
      cursor: "pointer"
    }
  }, "Clear All"))), /*#__PURE__*/React.createElement("div", {
    style: SCd
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.text,
      fontWeight: 700,
      marginBottom: 6
    }
  }, "Data"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.dimmer,
      fontSize: 12,
      marginBottom: 12
    }
  }, configs.length, " configs \xB7 ", sessions.length, " sessions"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (window.confirm("Delete all configs and sessions? Cannot be undone.")) {
        setConfigs([]);
        setSessions([]);
        setSel([]);
        setSelSess([]);
        storageSave({
          configs: [],
          sessions: []
        });
        pop("All data cleared");
      }
    },
    style: {
      background: "none",
      border: "1px solid #3a1a1a",
      color: "#f87171",
      borderRadius: 5,
      padding: "7px 16px",
      fontSize: 12,
      cursor: "pointer"
    }
  }, "Clear All Data"))));
}
window.__App = App;