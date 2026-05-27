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
//
//  HOW TO FILL THIS IN:
//  1. Go to console.firebase.google.com
//  2. Click your project "lumora-foundation"
//  3. Click the gear icon ⚙ → Project Settings
//  4. Scroll down to "Your apps" → click your web app
//  5. Copy each value below from the firebaseConfig shown there
//  6. Replace every PASTE_YOUR_..._HERE with your real value
//  7. Save this file
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyA7OOQ2RNR2fGfQHpYlswpB4R4YpOChztQ",
  authDomain: "lumora-foundation.firebaseapp.com",
  projectId: "lumora-foundation",
  storageBucket: "lumora-foundation.firebasestorage.app",
  messagingSenderId: "210575585156",
  appId: "1:210575585156:web:894d041b4a9058827637d1"
};

// ── Initialize ────────────────────────────────────────────────────────────────
const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

// ── Track a page view ─────────────────────────────────────────────────────────
export async function trackPageView(pageName) {
  try {
    await update(ref(db), {
      ["pageViews/total"]:               increment(1),
      ["pageViews/today"]:               increment(1),
      [`pageViews/byPage/${pageName}`]:  increment(1),
    });
    await push(ref(db, "pageViews/sessions"), {
      page:      pageName,
      timestamp: serverTimestamp(),
    });
  } catch (e) {
    console.warn("trackPageView error:", e.message);
  }
}

// ── Track a unique visitor ────────────────────────────────────────────────────
export async function trackVisitor() {
  try {
    if (sessionStorage.getItem("lumora_visited")) return;
    sessionStorage.setItem("lumora_visited", "1");
    await update(ref(db), {
      "visitors/total": increment(1),
      "visitors/today": increment(1),
      "visitors/week":  increment(1),
      "visitors/month": increment(1),
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

// ── Record a donation ─────────────────────────────────────────────────────────
export async function recordDonation({ name, email, amount, tier, frequency }) {
  try {
    const amountNum = Number(amount);
    await update(ref(db), {
      "donations/total":      increment(1),
      "donations/totalValue": increment(amountNum),
      "donations/todayValue": increment(amountNum),
      "donations/weekValue":  increment(amountNum),
      "donations/monthValue": increment(amountNum),
    });
    await push(ref(db, "donations/log"), {
      name:      name  || "Anonymous",
      email:     email || "",
      amount:    amountNum,
      tier:      tier  || "Custom",
      frequency: frequency || "once",
      status:    "initiated",
      timestamp: serverTimestamp(),
    });
  } catch (e) {
    console.warn("recordDonation error:", e.message);
  }
}

// ── Export Firebase primitives so pages can use them directly ─────────────────
export { db, ref, onValue, set, push, increment, serverTimestamp, get, update, off };
