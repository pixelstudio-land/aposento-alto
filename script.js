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
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));


/* ── 5. VERSÍCULOS ───────────────────────── */
const VERSICULOS = [
  // SALMOS
  { text: "O Senhor é meu pastor e nada me faltará.", ref: "Salmo 23:1" },
  { text: "Deus é o nosso refúgio e força, socorro bem presente na angústia.", ref: "Salmo 46:1" },
  { text: "Sede quietos e sabei que eu sou Deus.", ref: "Salmo 46:10" },
  { text: "O Senhor é a minha luz e a minha salvação; a quem temerei?", ref: "Salmo 27:1" },
  { text: "Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.", ref: "Salmo 119:105" },
  { text: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.", ref: "Salmo 91:1" },
  { text: "Porque o Senhor Deus é um sol e um escudo; o Senhor dará graça e glória.", ref: "Salmo 84:11" },
  { text: "Alegra-te no Senhor, e ele satisfará os desejos do teu coração.", ref: "Salmo 37:4" },
  { text: "O Senhor é bom, um forte refúgio no dia da angústia.", ref: "Naum 1:7" },
  { text: "Louvai ao Senhor, porque ele é bom; porque a sua benignidade dura para sempre.", ref: "Salmo 136:1" },
  { text: "O Senhor guardará a tua saída e a tua entrada, desde agora e para sempre.", ref: "Salmo 121:8" },
  { text: "Espera no Senhor; tem bom ânimo, e ele fortalecerá o teu coração.", ref: "Salmo 27:14" },
  { text: "Os que semeiam em lágrimas, em alegria ceifarão.", ref: "Salmo 126:5" },
  { text: "Bendito seja o Senhor, que dia a dia leva o nosso fardo.", ref: "Salmo 68:19" },
  { text: "Canta ao Senhor um cântico novo; toda a terra cante ao Senhor.", ref: "Salmo 96:1" },
  { text: "Da boca dos pequeninos e dos que mamam fundaste a tua força.", ref: "Salmo 8:2" },
  { text: "O Senhor é o meu pastor, nada me faltará. Em pastos suaves me fará repousar.", ref: "Salmo 23:1-2" },
  { text: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo.", ref: "Salmo 23:4" },
  { text: "A bondade e a misericórdia me seguirão todos os dias da minha vida.", ref: "Salmo 23:6" },
  { text: "O Senhor te guardará de todo o mal; ele guardará a tua alma.", ref: "Salmo 121:7" },
  { text: "O Senhor está perto de todos os que o invocam, de todos os que o invocam em verdade.", ref: "Salmo 145:18" },
  { text: "Forte é o teu amor, mais do que os que andam pelas alturas.", ref: "Salmo 103:11" },
  { text: "Como um pai se compadece dos filhos, assim o Senhor se compadece dos que o temem.", ref: "Salmo 103:13" },
  { text: "Benze, ó minha alma, ao Senhor, e não te esqueças de nenhum dos seus benefícios.", ref: "Salmo 103:2" },
  // JOÃO
  { text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.", ref: "João 3:16" },
  { text: "Eu sou o caminho, e a verdade, e a vida.", ref: "João 14:6" },
  { text: "Não se turbe o vosso coração; credes em Deus, crede também em mim.", ref: "João 14:1" },
  { text: "Eu vim para que tenham vida, e a tenham em abundância.", ref: "João 10:10" },
  { text: "Nisto todos conhecerão que sois meus discípulos, se vos amardes uns aos outros.", ref: "João 13:35" },
  { text: "Eu sou a ressurreição e a vida; quem crê em mim, ainda que esteja morto, viverá.", ref: "João 11:25" },
  { text: "A verdade vos libertará.", ref: "João 8:32" },
  // FILIPENSES E PAULO
  { text: "Tudo posso naquele que me fortalece.", ref: "Filipenses 4:13" },
  { text: "Alegrai-vos sempre no Senhor; outra vez digo: alegrai-vos!", ref: "Filipenses 4:4" },
  { text: "Por nada sejais ansiosos; antes em tudo sejam os vossos pedidos conhecidos diante de Deus.", ref: "Filipenses 4:6" },
  { text: "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos.", ref: "Filipenses 4:7" },
  { text: "O amor é paciente, é benigno; o amor não arde em ciúmes.", ref: "1 Coríntios 13:4" },
  { text: "O amor nunca falha.", ref: "1 Coríntios 13:8" },
  { text: "Agora, pois, permanecem a fé, a esperança e o amor, estes três; mas o maior deles é o amor.", ref: "1 Coríntios 13:13" },
  { text: "O fruto do Espírito é: amor, alegria, paz, longanimidade, benignidade, bondade, fidelidade.", ref: "Gálatas 5:22" },
  { text: "Não vos conformeis com este século, mas transformai-vos pela renovação do vosso entendimento.", ref: "Romanos 12:2" },
  { text: "Porque sou convicto de que nem a morte, nem a vida nos poderá separar do amor de Deus.", ref: "Romanos 8:38-39" },
  { text: "Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus.", ref: "Romanos 8:28" },
  { text: "Se Deus é por nós, quem será contra nós?", ref: "Romanos 8:31" },
  { text: "Portanto, se alguém está em Cristo, é nova criatura; as coisas velhas já passaram.", ref: "2 Coríntios 5:17" },
  { text: "Orai sem cessar.", ref: "1 Tessalonicenses 5:17" },
  { text: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus.", ref: "1 Tessalonicenses 5:18" },
  { text: "Sede uns para com os outros benignos, misericordiosos, perdoando-vos mutuamente.", ref: "Efésios 4:32" },
  { text: "Não nos cansemos de fazer o bem, porque a seu tempo ceifaremos, se não desanimarmos.", ref: "Gálatas 6:9" },
  // MATEUS E LUCAS
  { text: "Buscai primeiro o Reino de Deus e a sua justiça, e todas essas coisas vos serão acrescentadas.", ref: "Mateus 6:33" },
  { text: "Vinde a mim todos os que estais cansados e sobrecarregados, e eu vos aliviarei.", ref: "Mateus 11:28" },
  { text: "Onde dois ou três estiverem reunidos em meu nome, ali estou no meio deles.", ref: "Mateus 18:20" },
  { text: "Pedi e dar-se-vos-á; buscai e achareis; batei e abrir-se-vos-á.", ref: "Mateus 7:7" },
  { text: "Nada será impossível para Deus.", ref: "Lucas 1:37" },
  { text: "Bem-aventurados os puros de coração, porque eles verão a Deus.", ref: "Mateus 5:8" },
  { text: "Bem-aventurados os que fazem as pazes, porque eles serão chamados filhos de Deus.", ref: "Mateus 5:9" },
  { text: "O céu e a terra passarão, mas as minhas palavras não passarão.", ref: "Mateus 24:35" },
  // ISAÍAS E PROFETAS
  { text: "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus.", ref: "Isaías 41:10" },
  { text: "Porque eu sei os planos que tenho para vocês, diz o Senhor, planos de dar-lhes esperança e um futuro.", ref: "Jeremias 29:11" },
  { text: "Os que esperam no Senhor renovarão as suas forças; subirão com asas como águias.", ref: "Isaías 40:31" },
  { text: "O Senhor mesmo vai diante de ti; ele estará contigo, não te deixará, nem te abandonará.", ref: "Deuteronômio 31:8" },
  { text: "Com amor eterno eu te amei; por isso te atraí com benignidade.", ref: "Jeremias 31:3" },
  { text: "Porque os montes se retirarão e os outeiros serão removidos, mas a minha benignidade não se retirará de ti.", ref: "Isaías 54:10" },
  { text: "Como um pastor apascenta o seu rebanho, reúne os cordeiros nos seus braços.", ref: "Isaías 40:11" },
  { text: "Clama a mim e responder-te-ei, e anunciar-te-ei coisas grandes e ocultas.", ref: "Jeremias 33:3" },
  { text: "Sede fortes e corajosos. Não temais; não vos assusteis.", ref: "Josué 1:9" },
  // HEBREUS E CARTAS
  { text: "A palavra de Deus é viva e eficaz, mais afiada do que qualquer espada de dois gumes.", ref: "Hebreus 4:12" },
  { text: "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.", ref: "Hebreus 11:1" },
  { text: "Jesus Cristo é o mesmo, ontem, hoje e para sempre.", ref: "Hebreus 13:8" },
  { text: "Portanto, aproximemo-nos com confiança do trono da graça.", ref: "Hebreus 4:16" },
  { text: "Confessai, pois, os vossos pecados uns aos outros e orai uns pelos outros.", ref: "Tiago 5:16" },
  // PROVÉRBIOS E SABEDORIA
  { text: "Confia no Senhor de todo o seu coração e não se apoie em seu próprio entendimento.", ref: "Provérbios 3:5" },
  { text: "Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.", ref: "Provérbios 3:6" },
  { text: "O coração alegre é um bom remédio, mas o espírito abatido seca os ossos.", ref: "Provérbios 17:22" },
  { text: "A esperança que se dilata adoece o coração, mas o desejo cumprido é árvore de vida.", ref: "Provérbios 13:12" },
  { text: "O temor do Senhor é o princípio da sabedoria.", ref: "Provérbios 9:10" },
  // APOCALIPSE
  { text: "Eis que estou à porta e bato; se alguém ouvir a minha voz e abrir a porta, entrarei.", ref: "Apocalipse 3:20" },
  { text: "Eu sou o Alfa e o Ômega, o primeiro e o último, o princípio e o fim.", ref: "Apocalipse 22:13" },
  { text: "E enxugará Deus toda lágrima dos seus olhos, e não haverá mais morte.", ref: "Apocalipse 21:4" },
  // MARCOS E ATOS
  { text: "Tudo é possível ao que crê.", ref: "Marcos 9:23" },
  { text: "Ide por todo o mundo e pregai o evangelho a toda criatura.", ref: "Marcos 16:15" },
  { text: "Recebereis poder quando o Espírito Santo vier sobre vós.", ref: "Atos 1:8" },
  // 1 JOÃO
  { text: "Deus é amor, e quem permanece no amor permanece em Deus, e Deus nele.", ref: "1 João 4:16" },
  { text: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar.", ref: "1 João 1:9" },
  { text: "Maior é aquele que está em vós do que o que está no mundo.", ref: "1 João 4:4" },
  // TIAGO E PEDRO
  { text: "Se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente.", ref: "Tiago 1:5" },
  { text: "Humilhai-vos perante o Senhor, e ele vos exaltará.", ref: "Tiago 4:10" },
  { text: "Bem-aventurado o homem que suporta a provação; porque, depois de aprovado, receberá a coroa da vida.", ref: "Tiago 1:12" },
  { text: "Lançai sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.", ref: "1 Pedro 5:7" },
  { text: "Pois não nos deu Deus espírito de covardia, mas de poder, de amor e de moderação.", ref: "2 Timóteo 1:7" },
  { text: "Combati o bom combate, acabei a carreira, guardei a fé.", ref: "2 Timóteo 4:7" },
  // OUTROS
  { text: "No princípio, criou Deus os céus e a terra.", ref: "Gênesis 1:1" },
  { text: "O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti.", ref: "Números 6:24-25" },
  { text: "Ao rei dos séculos, imortal, invisível, ao único Deus, honra e glória pelos séculos dos séculos.", ref: "1 Timóteo 1:17" },
];

const TIMER_VERSES = [
  '"Sede quietos e sabei que eu sou Deus." (Salmo 46:10)',
  '"Clama a mim e responder-te-ei, e anunciar-te-ei coisas grandes." (Jeremias 33:3)',
  '"Orai sem cessar." (1 Tessalonicenses 5:17)',
  '"O Senhor está perto de todos os que o invocam em verdade." (Salmo 145:18)',
  '"Quando orares, entra no teu quarto e fecha a porta." (Mateus 6:6)',
  '"Aproximemo-nos com confiança do trono da graça." (Hebreus 4:16)',
  '"Em tudo pela oração e súplica com acoes de gracas." (Filipenses 4:6)',
  '"O sacrifício que agrada a Deus é o espírito quebrantado." (Salmo 51:17)',
];

let currentVerseIndex = -1;

function getDailyVerseIndex() {
  const day = new Date().getDate() + new Date().getMonth() * 31;
  return day % VERSICULOS.length;
}

function displayVerse(v) {
  const textEl = document.getElementById('verse-text');
  const refEl  = document.getElementById('verse-ref');
  if (!textEl || !refEl) return;
  textEl.style.opacity = '0';
  setTimeout(() => {
    textEl.textContent = `"${v.text}"`;
    refEl.textContent  = v.ref;
    textEl.style.opacity = '1';
  }, 300);
  textEl.style.transition = 'opacity 0.3s ease';
}

function newVerse() {
  currentVerseIndex = (currentVerseIndex + 1) % VERSICULOS.length;
  displayVerse(VERSICULOS[currentVerseIndex]);
}

function shareVerse() {
  const v    = VERSICULOS[currentVerseIndex];
  const text = `"${v.text}" (${v.ref})\n\nAposento Alto`;
  if (navigator.share) {
    navigator.share({ text });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    alert('Versículo copiado para a área de transferência!');
  }
}

currentVerseIndex = getDailyVerseIndex();
displayVerse(VERSICULOS[currentVerseIndex]);


/* ── 6. TIMER DE ORAÇÃO ──────────────────── */
let timerDuration  = 5 * 60;
let timerRemaining = timerDuration;
let timerInterval  = null;
let timerRunning   = false;
let soundEnabled   = true;
let audioCtx       = null;

function updateTimerDisplay() {
  const m  = Math.floor(timerRemaining / 60);
  const s  = timerRemaining % 60;
  const el = document.getElementById('timer-display');
  if (el) el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

  const circle       = document.getElementById('timer-circle');
  const circumference = 628.3;
  if (circle) circle.style.strokeDashoffset = circumference * (1 - timerRemaining / timerDuration);
}

function toggleTimer() {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
  } else {
    if (timerRemaining <= 0) timerRemaining = timerDuration;
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
  const play  = document.getElementById('icon-play');
  const pause = document.getElementById('icon-pause');
  if (play)  play.style.display  = timerRunning ? 'none'  : 'block';
  if (pause) pause.style.display = timerRunning ? 'block' : 'none';
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning   = false;
  timerRemaining = timerDuration;
  updateTimerDisplay();
  updatePlayPauseIcon();
}

function setPreset(minutes) {
  clearInterval(timerInterval);
  timerRunning   = false;
  timerDuration  = minutes * 60;
  timerRemaining = timerDuration;
  updateTimerDisplay();
  updatePlayPauseIcon();
  const idx = Math.floor(Math.random() * TIMER_VERSES.length);
  const el  = document.getElementById('timer-verse');
  if (el) el.textContent = TIMER_VERSES[idx];
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  document.getElementById('icon-sound-on').style.display  = soundEnabled ? 'block' : 'none';
  document.getElementById('icon-sound-off').style.display = soundEnabled ? 'none'  : 'block';
}

function playEndSound() {
  if (!soundEnabled) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc  = audioCtx.createOscillator();
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
  const count     = document.getElementById('entries-count');
  if (!container) return;
  if (count) count.textContent = diarioEntries.length;

  if (diarioEntries.length === 0) {
    container.innerHTML = `<div class="empty-state"><span>Nenhuma entrada ainda.</span><p>Comece registrando o que Deus tem falado ao seu coração.</p></div>`;
    return;
  }

  container.innerHTML = [...diarioEntries].reverse().map(e => `
    <div class="diario-entry">
      <div class="diario-entry-header">
        <span class="diario-entry-title">${e.title || 'Entrada'}</span>
        <span class="diario-entry-date">${e.date || ''}</span>
      </div>
      ${e.verse ? `<div class="diario-entry-verse">${e.verse}</div>` : ''}
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

  ['diario-title', 'diario-verse', 'diario-text'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

const dateInput = document.getElementById('diario-date');
if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

renderDiario();


/* ── 8. PEDIDOS DE ORAÇÃO ────────────────── */
let pedidos = JSON.parse(localStorage.getItem('aposento_pedidos') || '[]');

function renderPedidos() {
  const container = document.getElementById('pedidos-list');
  if (!container) return;

  if (pedidos.length === 0) {
    container.innerHTML = `<div class="empty-state"><span>Nenhum pedido ainda.</span><p>Seja o primeiro a enviar um pedido de oração.</p></div>`;
    return;
  }

  container.innerHTML = [...pedidos].reverse().map((p, i) => `
    <div class="pedido-item">
      <div class="pedido-item-header">
        <span class="pedido-item-nome">${p.nome || 'Anonimo'}</span>
        <span class="pedido-item-hora">${p.hora || ''}</span>
      </div>
      <div class="pedido-item-text">${p.text}</div>
      <button class="pedido-item-pray" onclick="prayFor(this)">Interceder por este pedido</button>
    </div>
  `).join('');
}

function savePedido() {
  const nome = document.getElementById('pedido-nome')?.value.trim();
  const text = document.getElementById('pedido-text')?.value.trim();
  if (!text) { alert('Escreva seu pedido de oração.'); return; }

  const now  = new Date();
  const hora = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  pedidos.push({ nome, text, hora, ts: Date.now() });
  localStorage.setItem('aposento_pedidos', JSON.stringify(pedidos));
  renderPedidos();

  const nomeEl = document.getElementById('pedido-nome');
  const textEl = document.getElementById('pedido-text');
  if (nomeEl) nomeEl.value = '';
  if (textEl) textEl.value = '';
}

function prayFor(btn) {
  btn.textContent = 'Intercedendo...';
  setTimeout(() => { btn.textContent = 'Intercedido!'; }, 1500);
}

renderPedidos();


/* ── 9. NEWSLETTER ───────────────────────── */
function subscribeNewsletter() {
  const email = document.getElementById('newsletter-email')?.value.trim();
  if (!email || !email.includes('@')) { alert('Por favor, insira um e-mail válido.'); return; }
  const btn = event.target;
  btn.textContent = 'Cadastrado!';
  btn.disabled    = true;
  btn.style.opacity = '0.7';
}
