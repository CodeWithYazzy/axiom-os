// --- CONFIGURATION ---
// Replace this with your actual Ngrok URL (e.g., https://123-abc.ngrok-free.app)
const NGROK_URL = "https://premonarchical-lamellirostral-kathryn.ngrok-free.dev"; 

// Derived URLs
const API_URL = NGROK_URL;
const WS_URL = NGROK_URL.replace("https://", "wss://") + "/ws";

// --- UPDATED WS CONNECTION ---
let ws;
function connectWS() {
  try {
    // Vercel handles HTTPS, so we MUST use WSS for Ngrok
    ws = new WebSocket(WS_URL);
    ws.onopen = () => { 
      log('Neural uplink established via Tunnel.', 'ok'); 
      addAct('Cloud-to-Local Connected', 'ok'); 
    };
    ws.onclose = () => { 
      log('Tunnel lost. Laptop might be offline.', 'err'); 
      setTimeout(connectWS, 5000); 
    };
    // ... rest of your existing message logic ...
  } catch(e) { 
    log('Tunnel init failed.', 'err'); 
    setTimeout(connectWS, 5000); 
  }
}

// --- UPDATED MISSION FETCH ---
async function launchMission() {
  // ... your existing UI disabling logic ...
  try {
    const t0 = performance.now();
    // Using full API_URL instead of relative path
    const res = await fetch(`${API_URL}/api/mission`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q })
    });
    // ... rest of your success/fail logic ...
  } catch(e) {
    log(`Mission failed: Check if Ngrok is running.`, 'err');
  }
}