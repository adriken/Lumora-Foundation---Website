import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  increment,
  serverTimestamp,
  get,
  update,
  off,
} from "firebase/database";

// ─────────────────────────────────────────────────────────────────────────────
//  LUMORA FOUNDATION — FIREBASE CONFIGURATION
//  Replace every PASTE_YOUR_..._HERE with your real Firebase values
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyA7OOQ2RNR2fGfQHpYlswpB4R4YpOChztQ",
  authDomain: "lumora-foundation.firebaseapp.com",
  projectId: "lumora-foundation",
  storageBucket: "lumora-foundation.firebasestorage.app",
  messagingSenderId: "210575585156",
  appId: "1:210575585156:web:894d041b4a9058827637d1"
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

// ── Detect visitor country via free IP geolocation API ───────────────────────
async function getCountry() {
  try {
    const res  = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return {
      country:     data.country_name || "Unknown",
      countryCode: data.country_code || "XX",
      city:        data.city         || "",
      region:      data.region       || "",
    };
  } catch {
    return { country: "Unknown", countryCode: "XX", city: "", region: "" };
  }
}

// ── Track a page view (with country) ─────────────────────────────────────────
export async function trackPageView(pageName) {
  try {
    const geo = await getCountry();
    await update(ref(db), {
      ["pageViews/total"]:                        increment(1),
      ["pageViews/today"]:                        increment(1),
      [`pageViews/byPage/${pageName}`]:            increment(1),
      [`pageViews/byCountry/${geo.countryCode}`]: increment(1),
    });
    await push(ref(db, "pageViews/sessions"), {
      page:        pageName,
      country:     geo.country,
      countryCode: geo.countryCode,
      city:        geo.city,
      region:      geo.region,
      timestamp:   serverTimestamp(),
    });
  } catch (e) {
    console.warn("trackPageView error:", e.message);
  }
}

// ── Track a unique visitor (with country) ────────────────────────────────────
export async function trackVisitor() {
  try {
    if (sessionStorage.getItem("lumora_visited")) return;
    sessionStorage.setItem("lumora_visited", "1");
    const geo = await getCountry();
    await update(ref(db), {
      "visitors/total":                          increment(1),
      "visitors/today":                          increment(1),
      "visitors/week":                           increment(1),
      "visitors/month":                          increment(1),
      [`visitors/byCountry/${geo.countryCode}`]: increment(1),
    });
    // Store country name mapping
    await update(ref(db, `meta/countries/${geo.countryCode}`), {
      name: geo.country,
      code: geo.countryCode,
    });
  } catch (e) {
    console.warn("trackVisitor error:", e.message);
  }
}

// ── Track live user presence ──────────────────────────────────────────────────
export async function trackLiveUser(isOnline) {
  try {
    await update(ref(db), {
      liveUsers: increment(isOnline ? 1 : -1),
    });
  } catch (e) {
    console.warn("trackLiveUser error:", e.message);
  }
}

// ── Record a donation (with country) ─────────────────────────────────────────
export async function recordDonation({ name, email, amount, tier, frequency }) {
  try {
    const amountNum = Number(amount);
    const geo = await getCountry();
    await update(ref(db), {
      "donations/total":                            increment(1),
      "donations/totalValue":                       increment(amountNum),
      "donations/todayValue":                       increment(amountNum),
      "donations/weekValue":                        increment(amountNum),
      "donations/monthValue":                       increment(amountNum),
      [`donations/byCountry/${geo.countryCode}`]:   increment(1),
    });
    await push(ref(db, "donations/log"), {
      name:        name        || "Anonymous",
      email:       email       || "",
      amount:      amountNum,
      tier:        tier        || "Custom",
      frequency:   frequency   || "once",
      status:      "initiated",
      country:     geo.country,
      countryCode: geo.countryCode,
      city:        geo.city,
      region:      geo.region,
      timestamp:   serverTimestamp(),
    });
    // Store country name mapping
    await update(ref(db, `meta/countries/${geo.countryCode}`), {
      name: geo.country,
      code: geo.countryCode,
    });
  } catch (e) {
    console.warn("recordDonation error:", e.message);
  }
}

export { db, ref, onValue, set, push, increment, serverTimestamp, get, update, off };
