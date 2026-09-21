/* ==========================================
   APOSENTO ALTO — JavaScript
   ========================================== */

/* ── 1. ESTRELAS ─────────────────────────── */
(function initStars() {
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createStars(n) {
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.003 + 0.001,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      const a = s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240, 230, 200, ${a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  createStars(280);
  window.addEventListener('resize', () => { resize(); createStars(280); });
  requestAnimationFrame(draw);
})();


/* ── 2. HEADER SCROLL ────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 40);
});


/* ── 3. MENU MOBILE ──────────────────────── */
const menuToggle = document.getElementById('menu-toggle');
const drawer = document.getElementById('mobile-drawer');
const drawerClose = document.getElementById('mobile-drawer-close');

menuToggle?.addEventListener('click', () => drawer?.classList.add('open'));
drawerClose?.addEventListener('click', () => drawer?.classList.remove('open'));
drawer?.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => drawer.classList.remove('open'));
});


/* ── 4. REVEAL ON SCROLL ─────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));


/* ── 5. VERSÍCULOS ───────────────────────── */
const VERSICULOS = [
  { text: "O Senhor é meu pastor e nada me faltará.", ref: "Salmo 23:1" },
  { text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.", ref: "João 3:16" },
  { text: "Tudo posso naquele que me fortalece.", ref: "Filipenses 4:13" },
  { text: "Sede quietos e sabei que eu sou Deus.", ref: "Salmo 46:10" },
  { text: "O Senhor é a minha luz e a minha salvação; a quem temerei?", ref: "Salmo 27:1" },
  { text: "Confia no Senhor de todo o seu coração e não se apoie em seu próprio entendimento.", ref: "Provérbios 3:5" },
  { text: "Buscai primeiro o Reino de Deus e a sua justiça, e todas essas coisas vos serão acrescentadas.", ref: "Mateus 6:33" },
  { text: "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus.", ref: "Isaías 41:10" },
  { text: "A palavra de Deus é viva e eficaz, mais afiada do que qualquer espada de dois gumes.", ref: "Hebreus 4:12" },
  { text: "Porque sou convicto de que nem a morte, nem a vida... nos poderá separar do amor de Deus.", ref: "Romanos 8:38-39" },
  { text: "Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.", ref: "Salmo 119:105" },
  { text: "Deus é o nosso refúgio e força, socorro bem presente na angústia.", ref: "Salmo 46:1" },
  { text: "Porque eu sei os planos que tenho para vocês, diz o Senhor, planos de dar-lhes esperança e um futuro.", ref: "Jeremias 29:11" },
  { text: "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.", ref: "Hebreus 11:1" },
  { text: "Alegrai-vos sempre no Senhor; outra vez digo: alegrai-vos!", ref: "Filipenses 4:4" },
  { text: "Onde dois ou três estiverem reunidos em meu nome, ali estou no meio deles.", ref: "Mateus 18:20" },
  { text: "O fruto do Espírito é: amor, alegria, paz, longanimidade, benignidade, bondade, fidelidade.", ref: "Gálatas 5:22" },
  { text: "Não se turbe o vosso coração; credes em Deus, crede também em mim.", ref: "João 14:1" },
  { text: "Por nada sejais ansiosos; antes em tudo sejam os vossos pedidos conhecidos diante de Deus.", ref: "Filipenses 4:6" },
  { text: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.", ref: "Salmo 91:1" },
  { text: "Porque o Senhor Deus é um sol e um escudo; o Senhor dará graça e glória.", ref: "Salmo 84:11" },
  { text: "Vinde a mim todos os que estais cansados e sobrecarregados, e eu vos aliviarei.", ref: "Mateus 11:28" },
  { text: "O amor nunca falha.", ref: "1 Coríntios 13:8" },
  { text: "Eu vim para que tenham vida, e a tenham em abundância.", ref: "João 10:10" },
  { text: "Jesus Cristo é o mesmo, ontem, hoje e para sempre.", ref: "Hebreus 13:8" },
];

const TIMER_VERSES = [
  "\"Sede quietos e sabei que eu sou Deus.\" — Salmo 46:10",
  "\"Clama a mim e responder-te-ei.\" — Jeremias 33:3",
  "\"Orai sem cessar.\" — 1 Tessalonicenses 5:17",
  "\"O Senhor está perto de todos os que o invocam.\" — Salmo 145:18",
  "\"Quando orares, entra no teu quarto e fecha a porta.\" — Mateus 6:6",
];

let currentVerseIndex = -1;

function getDailyVerseIndex() {
  const day = new Date().getDate() + new Date().getMonth() * 31;
  return day % VERSICULOS.length;
}

function displayVerse(v) {
  const textEl = document.getElementById('verse-text');
  const refEl = document.getElementById('verse-ref');
  if (!textEl || !refEl) return;
  textEl.style.opacity = '0';
  setTimeout(() => {
    textEl.textContent = `"${v.text}"`;
    refEl.textContent = `— ${v.ref}`;
    textEl.style.opacity = '1';
  }, 300);
  textEl.style.transition = 'opacity 0.3s ease';
}

function newVerse() {
  currentVerseIndex = (currentVerseIndex + 1) % VERSICULOS.length;
  displayVerse(VERSICULOS[currentVerseIndex]);
}

function shareVerse() {
  const v = VERSICULOS[currentVerseIndex];
  const text = `"${v.text}" — ${v.ref}\n\n🙏 Aposento Alto`;
  if (navigator.share) {
    navigator.share({ text });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    alert('Versículo copiado para a área de transferência!');
  }
}

// Inicializar versículo
currentVerseIndex = getDailyVerseIndex();
displayVerse(VERSICULOS[currentVerseIndex]);


/* ── 6. TIMER DE ORAÇÃO ──────────────────── */
let timerDuration = 5 * 60;
let timerRemaining = timerDuration;
let timerInterval = null;
let timerRunning = false;
let soundEnabled = true;
let audioCtx = null;

function getTimerCircle() { return document.getElementById('timer-circle'); }
function getTimerDisplay() { return document.getElementById('timer-display'); }

function updateTimerDisplay() {
  const m = Math.floor(timerRemaining / 60);
  const s = timerRemaining % 60;
  const el = getTimerDisplay();
  if (el) el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

  const circle = getTimerCircle();
  if (circle) {
    const circumference = 628.3;
    const progress = timerRemaining / timerDuration;
    circle.style.strokeDashoffset = circumference * (1 - progress);
  }
}

function toggleTimer() {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
  } else {
    if (timerRemaining <= 0) { timerRemaining = timerDuration; }
    timerInterval = setInterval(() => {
      timerRemaining--;
      updateTimerDisplay();
      if (timerRemaining <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        playEndSound();
        updatePlayPauseIcon();
      }
    }, 1000);
    timerRunning = true;
  }
  updatePlayPauseIcon();
}

function updatePlayPauseIcon() {
  const play = document.getElementById('icon-play');
  const pause = document.getElementById('icon-pause');
  if (play) play.style.display = timerRunning ? 'none' : 'block';
  if (pause) pause.style.display = timerRunning ? 'block' : 'none';
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerRemaining = timerDuration;
  updateTimerDisplay();
  updatePlayPauseIcon();
}

function setPreset(minutes) {
  clearInterval(timerInterval);
  timerRunning = false;
  timerDuration = minutes * 60;
  timerRemaining = timerDuration;
  updateTimerDisplay();
  updatePlayPauseIcon();

  // Trocar versículo do timer
  const idx = Math.floor(Math.random() * TIMER_VERSES.length);
  const el = document.getElementById('timer-verse');
  if (el) el.textContent = TIMER_VERSES[idx];
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  document.getElementById('icon-sound-on').style.display = soundEnabled ? 'block' : 'none';
  document.getElementById('icon-sound-off').style.display = soundEnabled ? 'none' : 'block';
}

function playEndSound() {
  if (!soundEnabled) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, audioCtx.currentTime + i * 0.4);
      gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + i * 0.4 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.4 + 1.2);
      osc.start(audioCtx.currentTime + i * 0.4);
      osc.stop(audioCtx.currentTime + i * 0.4 + 1.2);
    });
  } catch(e) {}
}

// Preset buttons
document.querySelectorAll('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    setPreset(parseInt(btn.dataset.min));
  });
});

updateTimerDisplay();


/* ── 7. DIÁRIO ESPIRITUAL ────────────────── */
let diarioEntries = JSON.parse(localStorage.getItem('aposento_diario') || '[]');

function renderDiario() {
  const container = document.getElementById('diario-entries');
  const count = document.getElementById('entries-count');
  if (!container) return;

  count && (count.textContent = diarioEntries.length);

  if (diarioEntries.length === 0) {
    container.innerHTML = `<div class="empty-state"><span>📖</span><p>Seu diário está vazio. Comece registrando o que Deus tem falado ao seu coração.</p></div>`;
    return;
  }

  container.innerHTML = [...diarioEntries].reverse().map((e, i) => `
    <div class="diario-entry">
      <div class="diario-entry-header">
        <span class="diario-entry-title">${e.title || 'Entrada'}</span>
        <span class="diario-entry-date">${e.date || ''}</span>
      </div>
      ${e.verse ? `<div class="diario-entry-verse">📖 ${e.verse}</div>` : ''}
      <div class="diario-entry-text">${e.text}</div>
    </div>
  `).join('');
}

function saveDiarioEntry() {
  const title = document.getElementById('diario-title')?.value.trim();
  const date  = document.getElementById('diario-date')?.value;
  const verse = document.getElementById('diario-verse')?.value.trim();
  const text  = document.getElementById('diario-text')?.value.trim();

  if (!text) { alert('Escreva algo em sua reflexão.'); return; }

  diarioEntries.push({ title, date, verse, text, ts: Date.now() });
  localStorage.setItem('aposento_diario', JSON.stringify(diarioEntries));
  renderDiario();

  // Limpar form
  ['diario-title', 'diario-verse', 'diario-text'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

// Setar data de hoje
const dateInput = document.getElementById('diario-date');
if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

renderDiario();


/* ── 8. PEDIDOS DE ORAÇÃO ────────────────── */
let pedidos = JSON.parse(localStorage.getItem('aposento_pedidos') || '[]');

function renderPedidos() {
  const container = document.getElementById('pedidos-list');
  if (!container) return;

  if (pedidos.length === 0) {
    container.innerHTML = `<div class="empty-state"><span>🕊️</span><p>Seja o primeiro a enviar um pedido de oração.</p></div>`;
    return;
  }

  container.innerHTML = [...pedidos].reverse().map((p, i) => `
    <div class="pedido-item">
      <div class="pedido-item-header">
        <span class="pedido-item-nome">🙏 ${p.nome || 'Anônimo'}</span>
        <span class="pedido-item-hora">${p.hora || ''}</span>
      </div>
      <div class="pedido-item-text">${p.text}</div>
      <button class="pedido-item-pray" onclick="prayFor(${pedidos.length - 1 - i})">
        🙏 Interceder por este pedido
      </button>
    </div>
  `).join('');
}

function savePedido() {
  const nome = document.getElementById('pedido-nome')?.value.trim();
  const text = document.getElementById('pedido-text')?.value.trim();

  if (!text) { alert('Escreva seu pedido de oração.'); return; }

  const now = new Date();
  const hora = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  pedidos.push({ nome, text, hora, ts: Date.now() });
  localStorage.setItem('aposento_pedidos', JSON.stringify(pedidos));
  renderPedidos();

  document.getElementById('pedido-nome').value = '';
  document.getElementById('pedido-text').value = '';
}

function prayFor(index) {
  const btn = event.target;
  btn.textContent = '✅ Intercedendo...';
  btn.style.color = '#D4AF37';
  btn.style.borderColor = '#D4AF37';
  setTimeout(() => {
    btn.textContent = '🙏 Intercedido!';
  }, 1500);
}

renderPedidos();


/* ── 9. NEWSLETTER ───────────────────────── */
function subscribeNewsletter() {
  const email = document.getElementById('newsletter-email')?.value.trim();
  if (!email || !email.includes('@')) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }
  const btn = event.target;
  btn.textContent = '✅ Cadastrado!';
  btn.disabled = true;
  btn.style.opacity = '0.7';
}
