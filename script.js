/* ==========================================
   APOSENTO ALTO - JavaScript & Supabase Realtime
   ========================================== */

/* ── 0. SUPABASE CLIENT & UTILS ──────────── */
const SUPABASE_URL = 'https://usecyyevfegavaxughbk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzZWN5eWV2ZmVnYXZheHVnaGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwMzQwOTQsImV4cCI6MjEwNTYxMDA5NH0.VHX13wfyS9pKriMZYFBeqvRSDNTZScn-5oEjx32M-Y0';
const supabaseClient = (window.supabase && typeof window.supabase.createClient === 'function')
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function timeAgo(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffSec = Math.floor((now - date) / 1000);
  if (diffSec < 60) return 'Agora mesmo';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `há ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `há ${diffH}h`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 7) return `há ${diffD}d`;
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

function showFeedback(el, msg, type) {
  if (!el) return;
  el.textContent = msg;
  el.className = `form-feedback ${type}`;
  el.style.display = 'block';
  setTimeout(() => {
    el.style.display = 'none';
  }, 6000);
}

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
document.querySelectorAll('.reveal-up').forEach(el => el.classList.add('visible'));


/* ── 5. VERSÍCULOS ───────────────────────── */
const VERSICULOS = [
  // SALMOS
  { text: "O Senhor é meu pastor e nada me faltará.", ref: "Salmo 23:1", cat: "paz" },
  { text: "Deus é o nosso refúgio e força, socorro bem presente na angústia.", ref: "Salmo 46:1", cat: "forca" },
  { text: "Sede quietos e sabei que eu sou Deus.", ref: "Salmo 46:10", cat: "paz" },
  { text: "O Senhor é a minha luz e a minha salvação; a quem temerei?", ref: "Salmo 27:1", cat: "ansiedade" },
  { text: "Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.", ref: "Salmo 119:105", cat: "paz" },
  { text: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.", ref: "Salmo 91:1", cat: "paz" },
  { text: "Porque o Senhor Deus é um sol e um escudo; o Senhor dará graça e glória.", ref: "Salmo 84:11", cat: "forca" },
  { text: "Alegra-te no Senhor, e ele satisfará os desejos do teu coração.", ref: "Salmo 37:4", cat: "gratidao" },
  { text: "O Senhor é bom, um forte refúgio no dia da angústia.", ref: "Naum 1:7", cat: "ansiedade" },
  { text: "Louvai ao Senhor, porque ele é bom; porque a sua benignidade dura para sempre.", ref: "Salmo 136:1", cat: "gratidao" },
  { text: "O Senhor guardará a tua saída e a tua entrada, desde agora e para sempre.", ref: "Salmo 121:8", cat: "paz" },
  { text: "Espera no Senhor; tem bom ânimo, e ele fortalecerá o teu coração.", ref: "Salmo 27:14", cat: "forca" },
  { text: "Os que semeiam em lágrimas, em alegria ceifarão.", ref: "Salmo 126:5", cat: "cura" },
  { text: "Bendito seja o Senhor, que dia a dia leva o nosso fardo.", ref: "Salmo 68:19", cat: "paz" },
  { text: "Canta ao Senhor um cântico novo; toda a terra cante ao Senhor.", ref: "Salmo 96:1", cat: "gratidao" },
  { text: "Da boca dos pequeninos e dos que mamam fundaste a tua força.", ref: "Salmo 8:2", cat: "forca" },
  { text: "O Senhor é o meu pastor, nada me faltará. Em pastos suaves me fará repousar.", ref: "Salmo 23:1-2", cat: "paz" },
  { text: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo.", ref: "Salmo 23:4", cat: "ansiedade" },
  { text: "A bondade e a misericórdia me seguirão todos os dias da minha vida.", ref: "Salmo 23:6", cat: "gratidao" },
  { text: "O Senhor te guardará de todo o mal; ele guardará a tua alma.", ref: "Salmo 121:7", cat: "paz" },
  { text: "O Senhor está perto de todos os que o invocam, de todos os que o invocam em verdade.", ref: "Salmo 145:18", cat: "cura" },
  { text: "Forte é o teu amor, mais do que os que andam pelas alturas.", ref: "Salmo 103:11", cat: "gratidao" },
  { text: "Como um pai se compadece dos filhos, assim o Senhor se compadece dos que o temem.", ref: "Salmo 103:13", cat: "paz" },
  { text: "Benze, ó minha alma, ao Senhor, e não te esqueças de nenhum dos seus benefícios.", ref: "Salmo 103:2", cat: "gratidao" },
  // JOÃO
  { text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.", ref: "João 3:16", cat: "gratidao" },
  { text: "Eu sou o caminho, e a verdade, e a vida.", ref: "João 14:6", cat: "forca" },
  { text: "Não se turbe o vosso coração; credes em Deus, crede também em mim.", ref: "João 14:1", cat: "ansiedade" },
  { text: "Eu vim para que tenham vida, e a tenham em abundância.", ref: "João 10:10", cat: "cura" },
  { text: "Nisto todos conhecerão que sois meus discípulos, se vos amardes uns aos outros.", ref: "João 13:35", cat: "paz" },
  { text: "Eu sou a ressurreição e a vida; quem crê em mim, ainda que esteja morto, viverá.", ref: "João 11:25", cat: "cura" },
  { text: "A verdade vos libertará.", ref: "João 8:32", cat: "forca" },
  // FILIPENSES E PAULO
  { text: "Tudo posso naquele que me fortalece.", ref: "Filipenses 4:13", cat: "forca" },
  { text: "Alegrai-vos sempre no Senhor; outra vez digo: alegrai-vos!", ref: "Filipenses 4:4", cat: "gratidao" },
  { text: "Por nada sejais ansiosos; antes em tudo sejam os vossos pedidos conhecidos diante de Deus.", ref: "Filipenses 4:6", cat: "ansiedade" },
  { text: "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos.", ref: "Filipenses 4:7", cat: "paz" },
  { text: "O amor é paciente, é benigno; o amor não arde em ciúmes.", ref: "1 Coríntios 13:4", cat: "paz" },
  { text: "O amor nunca falha.", ref: "1 Coríntios 13:8", cat: "forca" },
  { text: "Agora, pois, permanecem a fé, a esperança e o amor, estes três; mas o maior deles é o amor.", ref: "1 Coríntios 13:13", cat: "gratidao" },
  { text: "O fruto do Espírito é: amor, alegria, paz, longanimidade, benignidade, bondade, fidelidade.", ref: "Gálatas 5:22", cat: "paz" },
  { text: "Não vos conformeis com este século, mas transformai-vos pela renovação do vosso entendimento.", ref: "Romanos 12:2", cat: "forca" },
  { text: "Porque sou convicto de que nem a morte, nem a vida nos poderá separar do amor de Deus.", ref: "Romanos 8:38-39", cat: "ansiedade" },
  { text: "Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus.", ref: "Romanos 8:28", cat: "paz" },
  { text: "Se Deus é por nós, quem será contra nós?", ref: "Romanos 8:31", cat: "forca" },
  { text: "Portanto, se alguém está em Cristo, é nova criatura; as coisas velhas já passaram.", ref: "2 Coríntios 5:17", cat: "cura" },
  { text: "Orai sem cessar.", ref: "1 Tessalonicenses 5:17", cat: "paz" },
  { text: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus.", ref: "1 Tessalonicenses 5:18", cat: "gratidao" },
  { text: "Sede uns para com os outros benignos, misericordiosos, perdoando-vos mutuamente.", ref: "Efésios 4:32", cat: "cura" },
  { text: "Não nos cansemos de fazer o bem, porque a seu tempo ceifaremos, se não desanimarmos.", ref: "Gálatas 6:9", cat: "forca" },
  // MATEUS E LUCAS
  { text: "Buscai primeiro o Reino de Deus e a sua justiça, e todas essas coisas vos serão acrescentadas.", ref: "Mateus 6:33", cat: "paz" },
  { text: "Vinde a mim todos os que estais cansados e sobrecarregados, e eu vos aliviarei.", ref: "Mateus 11:28", cat: "ansiedade" },
  { text: "Onde dois ou três estiverem reunidos em meu nome, ali estou no meio deles.", ref: "Mateus 18:20", cat: "paz" },
  { text: "Pedi e dar-se-vos-á; buscai e achareis; batei e abrir-se-vos-á.", ref: "Mateus 7:7", cat: "forca" },
  { text: "Nada será impossível para Deus.", ref: "Lucas 1:37", cat: "forca" },
  { text: "Bem-aventurados os puros de coração, porque eles verão a Deus.", ref: "Mateus 5:8", cat: "paz" },
  { text: "Bem-aventurados os que fazem as pazes, porque eles serão chamados filhos de Deus.", ref: "Mateus 5:9", cat: "paz" },
  { text: "O céu e a terra passarão, mas as minhas palavras não passarão.", ref: "Mateus 24:35", cat: "forca" },
  // ISAÍAS E PROFETAS
  { text: "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus.", ref: "Isaías 41:10", cat: "ansiedade" },
  { text: "Porque eu sei os planos que tenho para vocês, diz o Senhor, planos de dar-lhes esperança e um futuro.", ref: "Jeremias 29:11", cat: "paz" },
  { text: "Os que esperam no Senhor renovarão as suas forças; subirão com asas como águias.", ref: "Isaías 40:31", cat: "forca" },
  { text: "O Senhor mesmo vai diante de ti; ele estará contigo, não te deixará, nem te abandonará.", ref: "Deuteronômio 31:8", cat: "ansiedade" },
  { text: "Com amor eterno eu te amei; por isso te atraí com benignidade.", ref: "Jeremias 31:3", cat: "cura" },
  { text: "Porque os montes se retirarão e os outeiros serão removidos, mas a minha benignidade não se retirará de ti.", ref: "Isaías 54:10", cat: "paz" },
  { text: "Como um pastor apascenta o seu rebanho, reúne os cordeiros nos seus braços.", ref: "Isaías 40:11", cat: "cura" },
  { text: "Clama a mim e responder-te-ei, e anunciar-te-ei coisas grandes e ocultas.", ref: "Jeremias 33:3", cat: "forca" },
  { text: "Sede fortes e corajosos. Não temais; não vos assusteis.", ref: "Josué 1:9", cat: "forca" },
  // HEBREUS E CARTAS
  { text: "A palavra de Deus é viva e eficaz, mais afiada do que qualquer espada de dois gumes.", ref: "Hebreus 4:12", cat: "forca" },
  { text: "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.", ref: "Hebreus 11:1", cat: "forca" },
  { text: "Jesus Cristo é o mesmo, ontem, hoje e para sempre.", ref: "Hebreus 13:8", cat: "paz" },
  { text: "Portanto, aproximemo-nos com confiança do trono da graça.", ref: "Hebreus 4:16", cat: "cura" },
  { text: "Confessai, pois, os vossos pecados uns aos outros e orai uns pelos outros.", ref: "Tiago 5:16", cat: "cura" },
  // PROVÉRBIOS E SABEDORIA
  { text: "Confia no Senhor de todo o seu coração e não se apoie em seu próprio entendimento.", ref: "Provérbios 3:5", cat: "paz" },
  { text: "Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.", ref: "Provérbios 3:6", cat: "forca" },
  { text: "O coração alegre é um bom remédio, mas o espírito abatido seca os ossos.", ref: "Provérbios 17:22", cat: "cura" },
  { text: "A esperança que se dilata adoece o coração, mas o desejo cumprido é árvore de vida.", ref: "Provérbios 13:12", cat: "cura" },
  { text: "O temor do Senhor é o princípio da sabedoria.", ref: "Provérbios 9:10", cat: "forca" },
  // APOCALIPSE
  { text: "Eis que estou à porta e bato; se alguém ouvir a minha voz e abrir a porta, entrarei.", ref: "Apocalipse 3:20", cat: "paz" },
  { text: "Eu sou o Alfa e o Ômega, o primeiro e o último, o princípio e o fim.", ref: "Apocalipse 22:13", cat: "forca" },
  { text: "E enxugará Deus toda lágrima dos seus olhos, e não haverá mais morte.", ref: "Apocalipse 21:4", cat: "cura" },
  // MARCOS E ATOS
  { text: "Tudo é possível ao que crê.", ref: "Marcos 9:23", cat: "forca" },
  { text: "Ide por todo o mundo e pregai o evangelho a toda criatura.", ref: "Marcos 16:15", cat: "forca" },
  { text: "Recebereis poder quando o Espírito Santo vier sobre vós.", ref: "Atos 1:8", cat: "forca" },
  // 1 JOÃO
  { text: "Deus é amor, e quem permanece no amor permanece em Deus, e Deus nele.", ref: "1 João 4:16", cat: "paz" },
  { text: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar.", ref: "1 João 1:9", cat: "cura" },
  { text: "Maior é aquele que está em vós do que o que está no mundo.", ref: "1 João 4:4", cat: "forca" },
  // TIAGO E PEDRO
  { text: "Se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente.", ref: "Tiago 1:5", cat: "paz" },
  { text: "Humilhai-vos perante o Senhor, e ele vos exaltará.", ref: "Tiago 4:10", cat: "paz" },
  { text: "Bem-aventurado o homem que suporta a provação; porque, depois de aprovado, receberá a coroa da vida.", ref: "Tiago 1:12", cat: "forca" },
  { text: "Lançai sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.", ref: "1 Pedro 5:7", cat: "ansiedade" },
  { text: "Pois não nos deu Deus espírito de covardia, mas de poder, de amor e de moderação.", ref: "2 Timóteo 1:7", cat: "ansiedade" },
  { text: "Combati o bom combate, acabei a carreira, guardei a fé.", ref: "2 Timóteo 4:7", cat: "forca" },
  // OUTROS
  { text: "No princípio, criou Deus os céus e a terra.", ref: "Gênesis 1:1", cat: "gratidao" },
  { text: "O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti.", ref: "Números 6:24-25", cat: "paz" },
  { text: "Ao rei dos séculos, imortal, invisível, ao único Deus, honra e glória pelos séculos dos séculos.", ref: "1 Timóteo 1:17", cat: "gratidao" }
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
let currentCategory = 'todos';

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

function filterVerses(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.verse-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const filtered = (cat === 'todos')
    ? VERSICULOS
    : VERSICULOS.filter(v => v.cat === cat);

  if (filtered.length > 0) {
    const randomIdx = Math.floor(Math.random() * filtered.length);
    const chosenVerse = filtered[randomIdx];
    currentVerseIndex = VERSICULOS.indexOf(chosenVerse);
    displayVerse(chosenVerse);
  }
}

function newVerse() {
  const filtered = (currentCategory === 'todos')
    ? VERSICULOS
    : VERSICULOS.filter(v => v.cat === currentCategory);

  if (filtered.length === 0) return;

  let nextVerse;
  if (filtered.length === 1) {
    nextVerse = filtered[0];
  } else {
    const pool = filtered.filter(v => VERSICULOS.indexOf(v) !== currentVerseIndex);
    nextVerse = pool[Math.floor(Math.random() * pool.length)];
  }
  currentVerseIndex = VERSICULOS.indexOf(nextVerse);
  displayVerse(nextVerse);
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

function generateVerseCard() {
  const v = VERSICULOS[currentVerseIndex] || { text: "O Senhor é meu pastor e nada me faltará.", ref: "Salmo 23:1" };
  const btn = document.getElementById('btn-card-verse');
  const originalHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="12"/></svg>
      Gerando Imagem...
    `;
  }

  setTimeout(() => {
    try {
      const W = 1080;
      const H = 1920;
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');

      // 1. Fundo celestial
      const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, '#050814');
      bgGrad.addColorStop(0.3, '#0b1126');
      bgGrad.addColorStop(0.65, '#15102d');
      bgGrad.addColorStop(1, '#070a16');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // 2. Aura dourada celestial central
      const aura = ctx.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, 620);
      aura.addColorStop(0, 'rgba(212, 175, 55, 0.16)');
      aura.addColorStop(0.4, 'rgba(80, 50, 160, 0.09)');
      aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, W, H);

      // 3. Estrelas celestiais
      let seed = 0;
      for (let i = 0; i < v.text.length; i++) seed += v.text.charCodeAt(i);
      function pseudoRandom() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      }

      ctx.save();
      for (let i = 0; i < 160; i++) {
        const sx = pseudoRandom() * W;
        const sy = pseudoRandom() * H;
        const sr = pseudoRandom() * 1.8 + 0.5;
        const sa = pseudoRandom() * 0.7 + 0.25;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fillStyle = (i % 5 === 0) ? `rgba(255, 230, 150, ${sa})` : `rgba(240, 240, 255, ${sa})`;
        ctx.fill();
      }
      ctx.restore();

      // 4. Moldura dupla dourada
      const padOuter = 70;
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(padOuter, padOuter, W - padOuter * 2, H - padOuter * 2);

      const padInner = 86;
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.85)';
      ctx.lineWidth = 2;
      ctx.strokeRect(padInner, padInner, W - padInner * 2, H - padInner * 2);

      // Estrelas nos cantos
      ctx.font = '22px sans-serif';
      ctx.fillStyle = '#D4AF37';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦', padInner, padInner);
      ctx.fillText('✦', W - padInner, padInner);
      ctx.fillText('✦', padInner, H - padInner);
      ctx.fillText('✦', W - padInner, H - padInner);

      // 5. Cabeçalho
      ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#D4AF37';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('✦   A P O S E N T O   A L T O   ✦', W / 2, 220);

      ctx.beginPath();
      ctx.moveTo(W / 2 - 140, 245);
      ctx.lineTo(W / 2 + 140, 245);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
      ctx.fillText('PALAVRA VIVA & DEVOCIONAL', W / 2, 280);

      // Emblema Sagrado e Halo Celestial (Substituindo a antiga vela por selo dourado angelical)
      ctx.save();
      const emblemCenterY = 400;

      // Aura dourada suave
      const auraGrad = ctx.createRadialGradient(W / 2, emblemCenterY, 4, W / 2, emblemCenterY, 65);
      auraGrad.addColorStop(0, 'rgba(212, 175, 55, 0.4)');
      auraGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.12)');
      auraGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(W / 2, emblemCenterY, 65, 0, Math.PI * 2);
      ctx.fill();

      // Círculo delicado contínuo
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(W / 2, emblemCenterY, 32, 0, Math.PI * 2);
      ctx.stroke();

      // Círculo pontilhado externo
      ctx.setLineDash([3, 5]);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
      ctx.beginPath();
      ctx.arc(W / 2, emblemCenterY, 40, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Estrela sagrada reluzente central
      ctx.font = '32px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#F5D77F';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(212, 175, 55, 0.85)';
      ctx.shadowBlur = 18;
      ctx.fillText('✦', W / 2, emblemCenterY);
      ctx.restore();

      // 6. Texto do versículo (Tipografia serifada e quebra inteligente)
      const maxTextWidth = 760;
      let fontSize = 54;
      if (v.text.length > 180) fontSize = 44;
      else if (v.text.length > 110) fontSize = 48;
      else if (v.text.length < 50) fontSize = 58;

      ctx.font = `italic ${fontSize}px "Cormorant Garamond", Georgia, serif`;
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';

      const words = v.text.split(' ');
      const lines = [];
      let currentLine = '';

      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxTextWidth && currentLine) {
          lines.push(currentLine);
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);

      const lineHeight = fontSize * 1.55;
      const totalTextHeight = lines.length * lineHeight;
      const startY = (H / 2) - (totalTextHeight / 2) + 20;

      ctx.font = 'italic 72px "Cormorant Garamond", Georgia, serif';
      ctx.fillStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.fillText('“', W / 2, startY - 30);

      ctx.font = `italic ${fontSize}px "Cormorant Garamond", Georgia, serif`;
      ctx.fillStyle = '#F8F7F4';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 4;

      lines.forEach((line, index) => {
        ctx.fillText(line, W / 2, startY + index * lineHeight);
      });

      ctx.shadowColor = 'transparent';

      // 7. Referência bíblica
      const refY = startY + (lines.length - 1) * lineHeight + 85;
      ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#D4AF37';
      ctx.fillText(v.ref.toUpperCase(), W / 2, refY);

      ctx.beginPath();
      ctx.moveTo(W / 2 - 60, refY + 28);
      ctx.lineTo(W / 2 + 60, refY + 28);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#D4AF37';
      ctx.fillText('✦', W / 2, refY + 30);

      // 8. Rodapé elegante e dinâmico
      ctx.font = '400 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(240, 238, 232, 0.7)';
      ctx.fillText('Um lugar de encontro com Deus  ✦  Aposento Alto', W / 2, H - 200);

      // Domínio limpo e dinâmico (usa o domínio atual ou o oficial)
      let displayDomain = 'aposentoalto.com.br';
      if (typeof window !== 'undefined' && window.location && window.location.hostname) {
        const host = window.location.hostname;
        if (!host.includes('localhost') && !host.includes('127.0.0.1') && !host.includes('github.io')) {
          displayDomain = host;
        }
      }

      ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(212, 175, 55, 0.85)';
      ctx.fillText(displayDomain, W / 2, H - 165);

      // Baixar arquivo PNG
      const safeName = (v.ref || 'versiculo').toLowerCase().replace(/[^a-z0-9]/g, '-');
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `aposento-alto-${safeName}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Card Baixado! ✦
        `;
        setTimeout(() => {
          btn.innerHTML = originalHtml;
        }, 3000);
      }
    } catch (err) {
      console.error('Erro ao gerar imagem:', err);
      alert('Não foi possível gerar a imagem no momento.');
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalHtml;
      }
    }
  }, 50);
}

currentVerseIndex = getDailyVerseIndex();
displayVerse(VERSICULOS[currentVerseIndex]);


/* ── 6. TIMER DE ORAÇÃO & PAD CELESTIAL (432Hz) ──── */
let timerDuration  = 5 * 60;
let timerRemaining = timerDuration;
let timerInterval  = null;
let timerRunning   = false;
let soundEnabled   = true;
let audioCtx       = null;

let currentSoundPreset = 'cenaculo';
let masterSoundVolume  = 0.7;
let ambientAudioCtx    = null;
let ambientGainNode    = null;
let ambientOscs        = [];
let ambientNoiseSource = null;
let ambientLfoNode     = null;
let isAmbientPlaying   = false;

// ── REPRODUÇÃO INSTRUMENTAL COM LOOP SUAVE (FADE PIANÍSSIMO -> FORTÍSSIMO) ──
let musicAudio         = null;
let musicFadeInterval  = null;
let isMusicLoopFading  = false;

const MUSIC_TRACKS = {
  cenaculo: {
    title: 'Cenáculo Sereno',
    src: 'audio/cenaculo_sereno.mp3'
  },
  graca: {
    title: 'Graça & Descanso',
    src: 'audio/graca_e_descanso.mp3'
  }
};

function createProceduralWarmNoiseBuffer(ctx, durationSec = 4) {
  const bufferSize = ctx.sampleRate * durationSec;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = (Math.random() * 2 - 1) * 0.5;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    data[i] = (b0 + b1 + b2 + white * 0.5) * 0.65;
  }
  return buffer;
}

function playMusicTrack(key) {
  stopProceduralAudio();
  if (!soundEnabled || key === 'silencio') return;

  const track = MUSIC_TRACKS[key];
  if (!track) return;

  if (!musicAudio) {
    musicAudio = new Audio();
    musicAudio.preload = 'auto';
  }

  // Se trocar de faixa
  if (musicAudio.dataset.trackKey !== key) {
    musicAudio.src = track.src;
    musicAudio.dataset.trackKey = key;
    musicAudio.currentTime = 0;
  }

  attachMusicEvents();

  // Inicia no pianíssimo (0.015) e faz crescendo até o fortíssimo do usuário (volume definido)
  musicAudio.volume = 0.015;
  const playPromise = musicAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isAmbientPlaying = true;
      isMusicLoopFading = false;
      fadeMusicTo(masterSoundVolume, 4000);
    }).catch(err => {
      console.warn('Audio play prevented or interrupted:', err);
    });
  }
}

function attachMusicEvents() {
  if (!musicAudio) return;

  musicAudio.ontimeupdate = () => {
    if (!musicAudio || !isAmbientPlaying || isMusicLoopFading) return;
    const dur = musicAudio.duration;
    if (!dur || isNaN(dur)) return;

    // Faltando 8 segundos para o final da faixa:
    // Reduz o som gradualmente para pianíssimo (sussurro)
    const remaining = dur - musicAudio.currentTime;
    if (remaining <= 8 && remaining > 0.4) {
      isMusicLoopFading = true;
      fadeMusicTo(0.015, Math.max(1200, (remaining - 0.4) * 1000));
    }
  };

  musicAudio.onended = () => {
    if (!isAmbientPlaying || !soundEnabled) return;
    restartMusicLoop();
  };
}

function restartMusicLoop() {
  if (!musicAudio) return;
  musicAudio.currentTime = 0;
  musicAudio.volume = 0.015; // Pianíssimo absoluto no início
  const playPromise = musicAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isMusicLoopFading = false;
      // Crescendo suave: eleva do pianíssimo de volta para o volume fortíssimo (definido pelo usuário) em 5 segundos
      fadeMusicTo(masterSoundVolume, 5000);
    }).catch(err => console.warn('Music restart error:', err));
  }
}

function fadeMusicTo(targetVol, durationMs = 4000) {
  if (!musicAudio) return;
  clearInterval(musicFadeInterval);
  const startVol = Math.max(0, musicAudio.volume);
  const target = Math.min(1, Math.max(0, targetVol));
  const steps = 40;
  const stepTime = Math.max(25, Math.floor(durationMs / steps));
  let step = 0;

  musicFadeInterval = setInterval(() => {
    step++;
    const progress = Math.min(1, step / steps);
    // Curva senoidal elegante de transição dinâmica
    const factor = (1 - Math.cos(progress * Math.PI)) / 2;
    const currentVal = startVol + (target - startVol) * factor;
    if (musicAudio) {
      musicAudio.volume = Math.min(1, Math.max(0, currentVal));
    }

    if (step >= steps) {
      clearInterval(musicFadeInterval);
      if (musicAudio) musicAudio.volume = target;
    }
  }, stepTime);
}

function startAmbientPad() {
  if (!soundEnabled) return;
  if (currentSoundPreset === 'silencio') return;

  if (currentSoundPreset === 'cenaculo' || currentSoundPreset === 'graca') {
    playMusicTrack(currentSoundPreset);
    return;
  }

  if (currentSoundPreset === 'aguas') {
    if (musicAudio) {
      musicAudio.pause();
    }
    startProceduralWater();
  }
}

function startProceduralWater() {
  if (isAmbientPlaying) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!ambientAudioCtx) {
      ambientAudioCtx = new AudioContextClass();
    }
    if (ambientAudioCtx.state === 'suspended') {
      ambientAudioCtx.resume();
    }

    const baseGain = 0.36;
    ambientGainNode = ambientAudioCtx.createGain();
    ambientGainNode.gain.setValueAtTime(0.001, ambientAudioCtx.currentTime);
    const targetGain = Math.max(0.005, baseGain * masterSoundVolume);
    ambientGainNode.gain.exponentialRampToValueAtTime(targetGain, ambientAudioCtx.currentTime + 1.2);

    const waterLowpass = ambientAudioCtx.createBiquadFilter();
    waterLowpass.type = 'lowpass';
    waterLowpass.frequency.setValueAtTime(1400, ambientAudioCtx.currentTime);
    waterLowpass.Q.setValueAtTime(0.3, ambientAudioCtx.currentTime);

    const waterPeak = ambientAudioCtx.createBiquadFilter();
    waterPeak.type = 'peaking';
    waterPeak.frequency.setValueAtTime(720, ambientAudioCtx.currentTime);
    waterPeak.Q.setValueAtTime(1.4, ambientAudioCtx.currentTime);
    waterPeak.gain.setValueAtTime(8, ambientAudioCtx.currentTime);

    ambientGainNode.connect(waterLowpass);
    waterLowpass.connect(waterPeak);
    waterPeak.connect(ambientAudioCtx.destination);

    ambientLfoNode = ambientAudioCtx.createOscillator();
    ambientLfoNode.frequency.setValueAtTime(0.28, ambientAudioCtx.currentTime);
    const lfoGain = ambientAudioCtx.createGain();
    lfoGain.gain.setValueAtTime(160, ambientAudioCtx.currentTime);
    ambientLfoNode.connect(lfoGain);
    lfoGain.connect(waterPeak.frequency);
    ambientLfoNode.start();

    const noiseBuf = createProceduralWarmNoiseBuffer(ambientAudioCtx, 4);
    ambientNoiseSource = ambientAudioCtx.createBufferSource();
    ambientNoiseSource.buffer = noiseBuf;
    ambientNoiseSource.loop = true;
    ambientNoiseSource.connect(ambientGainNode);
    ambientNoiseSource.start();

    isAmbientPlaying = true;
  } catch (err) {
    console.warn('Water audio error:', err);
  }
}

function stopProceduralAudio() {
  if (!ambientGainNode || !ambientAudioCtx) return;
  try {
    const now = ambientAudioCtx.currentTime;
    ambientGainNode.gain.setValueAtTime(ambientGainNode.gain.value, now);
    ambientGainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
    setTimeout(() => {
      if (ambientNoiseSource) {
        try { ambientNoiseSource.stop(); ambientNoiseSource.disconnect(); } catch(e) {}
        ambientNoiseSource = null;
      }
      if (ambientLfoNode) {
        try { ambientLfoNode.stop(); ambientLfoNode.disconnect(); } catch(e) {}
        ambientLfoNode = null;
      }
    }, 450);
  } catch(e) {}
}

function stopAmbientPad() {
  if (musicAudio) {
    clearInterval(musicFadeInterval);
    isMusicLoopFading = false;
    const start = musicAudio.volume;
    let s = 0;
    const quickFade = setInterval(() => {
      s++;
      if (musicAudio) musicAudio.volume = Math.max(0, start * (1 - s / 10));
      if (s >= 10) {
        clearInterval(quickFade);
        if (musicAudio) {
          musicAudio.pause();
          musicAudio.volume = masterSoundVolume;
        }
      }
    }, 35);
  }

  stopProceduralAudio();
  isAmbientPlaying = false;
}

function selectSoundPreset(type, btn) {
  currentSoundPreset = type;
  document.querySelectorAll('.sound-preset-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  stopAmbientPad();

  if (type === 'silencio' || !soundEnabled) {
    return;
  }

  // Reprodução imediata da nova faixa para teste e oração
  setTimeout(() => {
    startAmbientPad();
  }, 120);
}

function setSoundVolume(val) {
  masterSoundVolume = val / 100;
  if (musicAudio && !isMusicLoopFading) {
    musicAudio.volume = masterSoundVolume;
  }
  if (ambientGainNode && ambientAudioCtx && currentSoundPreset === 'aguas') {
    const baseGain = 0.36;
    const target = Math.max(0.001, baseGain * masterSoundVolume);
    ambientGainNode.gain.setValueAtTime(target, ambientAudioCtx.currentTime);
  }
}

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
    stopAmbientPad();
  } else {
    if (timerRemaining <= 0) timerRemaining = timerDuration;
    startAmbientPad();
    timerInterval = setInterval(() => {
      timerRemaining--;
      updateTimerDisplay();
      if (timerRemaining <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        stopAmbientPad();
        playEndSound();
        updatePlayPauseIcon();
        recordPrayerCompletion(Math.max(1, Math.round(timerDuration / 60)));
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
  stopAmbientPad();
  updateTimerDisplay();
  updatePlayPauseIcon();
}

function setPreset(minutes) {
  clearInterval(timerInterval);
  timerRunning   = false;
  stopAmbientPad();
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
  if (!soundEnabled) {
    stopAmbientPad();
  } else if (timerRunning) {
    startAmbientPad();
  }
}

function playEndSound() {
  if (!soundEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioCtx = audioCtx || new AudioContextClass();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    // Sino do Santuário Sagrado (528Hz Frequência da Paz + harmônicos celestiais com reverberação longa)
    const bellHarmonics = [
      { freq: 264.0,  gain: 0.16, decay: 4.2 }, // Sub-harmônico quente
      { freq: 528.0,  gain: 0.28, decay: 3.8 }, // Tom fundamental da paz
      { freq: 1056.0, gain: 0.12, decay: 2.5 }, // Brilho de oitava
      { freq: 1584.0, gain: 0.05, decay: 1.8 }  // Cristal delicado
    ];

    bellHarmonics.forEach(h => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(h.freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(h.gain * masterSoundVolume, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + h.decay);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + h.decay + 0.1);
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

function exportDiario() {
  if (!diarioEntries || diarioEntries.length === 0) {
    alert('Ainda não há entradas no seu diário para exportar. Registre sua primeira reflexão antes de exportar.');
    return;
  }
  window.print();
}

renderDiario();


/* ── 8. CONTADOR GLOBAL DE ORAÇÕES ───────── */
async function loadGlobalPrayers() {
  const statEl = document.getElementById('global-prayers-stat');
  if (!statEl) return;
  if (!supabaseClient) {
    statEl.textContent = 'Tempo sagrado em oração com Deus';
    return;
  }
  try {
    const { data, error } = await supabaseClient
      .from('oracoes_globais')
      .select('total_oracoes, minutos_orados')
      .eq('id', 1)
      .single();

    if (data && data.total_oracoes !== undefined) {
      const total = Number(data.total_oracoes);
      const minutos = Number(data.minutos_orados || 0);
      statEl.innerHTML = `<strong>${total.toLocaleString('pt-BR')}</strong> orações realizadas neste Aposento Alto (<strong>${minutos.toLocaleString('pt-BR')} min</strong> dedicados)`;
    } else {
      statEl.textContent = 'Tempo sagrado em oração com Deus';
    }
  } catch(e) {
    statEl.textContent = 'Tempo sagrado em oração com Deus';
  }
}

async function recordPrayerCompletion(durationMinutes) {
  if (!supabaseClient) return;
  try {
    await supabaseClient.rpc('registrar_oracao_concluida', { minutos: durationMinutes });
    loadGlobalPrayers();
  } catch(e) {
    console.warn('Erro ao registrar oração:', e);
  }
}


/* ── 9. PEDIDOS DE ORAÇÃO (SUPABASE) ─────── */
let intercedidosLocais = JSON.parse(localStorage.getItem('aposento_intercedidos') || '[]');
let currentPedidoCatFilter = 'todas';

async function loadPedidos() {
  const container = document.getElementById('pedidos-list');
  if (!container) return;

  if (!supabaseClient) {
    renderLocalPedidos();
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from('pedidos_oracao')
      .select('*')
      .eq('ativo', true)
      .order('created_at', { ascending: false })
      .limit(40);

    if (error) throw error;

    if (!data || data.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M7 12h10"/></svg>
          <p>Nenhum pedido ainda. Seja o primeiro a compartilhar sua causa de oração.</p>
        </div>`;
      return;
    }

    container.innerHTML = data.map(p => {
      const prayed = intercedidosLocais.includes(p.id);

      // Extrair ou detectar categoria
      let cat = p.categoria || 'Geral';
      let cleanPedido = p.pedido || '';
      const tagMatch = cleanPedido.match(/^\[(.*?)\]\s*(.*)$/);
      if (tagMatch) {
        cat = tagMatch[1];
        cleanPedido = tagMatch[2];
      }

      const isHidden = (currentPedidoCatFilter !== 'todas' && cat.toLowerCase() !== currentPedidoCatFilter.toLowerCase()) ? 'style="display:none;"' : '';
      const safeNome = escapeHtml(p.nome || 'Anônimo');
      const safePedido = escapeHtml(cleanPedido);
      const safeQuote = safePedido.replace(/'/g, "\\'").replace(/"/g, '&quot;');

      return `
        <div class="pedido-item" id="pedido-${p.id}" data-category="${escapeHtml(cat)}" ${isHidden}>
          <div class="pedido-item-header">
            <span class="pedido-item-nome">
              ${safeNome}
              ${p.cidade ? `<span class="pedido-item-cidade"> · ${escapeHtml(p.cidade)}</span>` : ''}
              <span class="pedido-cat-badge">${escapeHtml(cat)}</span>
            </span>
            <span class="pedido-item-hora">${timeAgo(p.created_at)}</span>
          </div>
          <div class="pedido-item-text">${safePedido}</div>
          <div class="pedido-item-footer">
            <button class="pedido-item-pray ${prayed ? 'prayed' : ''}" onclick="interceder('${p.id}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M5 8h14"/></svg>
              <span>${prayed ? 'Intercedido!' : 'Interceder'}</span>
              <span class="pray-count">(${p.intercessoes || 0})</span>
            </button>
            <button class="btn-contar-graca" onclick="celebrarRespostaOração('${p.id}', '${safeNome}', '${safeQuote}')" title="Contar que Deus respondeu esse pedido">
              ✦ Deus Respondeu!
            </button>
            ${(p.intercessoes || 0) > 0 ? `<span class="intercessoes-text">${p.intercessoes} ${p.intercessoes === 1 ? 'irmão orou' : 'irmãos oraram'}</span>` : ''}
          </div>
        </div>
      `;
    }).join('');
  } catch(e) {
    console.error('Erro ao carregar pedidos do Supabase:', e);
    renderLocalPedidos();
  }
}

function filterPedidosCat(cat, btn) {
  currentPedidoCatFilter = cat;
  document.querySelectorAll('.filter-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const items = document.querySelectorAll('#pedidos-list .pedido-item');
  items.forEach(item => {
    const itemCat = item.getAttribute('data-category') || 'Geral';
    if (cat === 'todas' || itemCat.toLowerCase() === cat.toLowerCase()) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

function celebrarRespostaOração(id, nome, pedidoTexto) {
  const testemunhosSection = document.getElementById('testemunhos');
  const nomeInput = document.getElementById('testemunho-nome');
  const textoInput = document.getElementById('testemunho-text');
  const cardForm = document.querySelector('.testemunho-form-card');

  if (testemunhosSection) {
    testemunhosSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  if (nomeInput && nome !== 'Anônimo') {
    nomeInput.value = nome;
  }

  if (textoInput) {
    const resumo = pedidoTexto ? `pela causa de "${pedidoTexto.substring(0, 60)}..."` : 'por esta causa';
    textoInput.value = `Glória a Deus! Em resposta à oração ${resumo}, o Senhor manifestou o Seu poder e operou a vitória: `;
    setTimeout(() => textoInput.focus(), 600);
  }

  if (cardForm) {
    cardForm.classList.remove('highlight-testemunho');
    void cardForm.offsetWidth;
    cardForm.classList.add('highlight-testemunho');
  }
}

function renderLocalPedidos() {
  const container = document.getElementById('pedidos-list');
  if (!container) return;
  const pedidos = JSON.parse(localStorage.getItem('aposento_pedidos') || '[]');
  if (pedidos.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>Nenhum pedido ainda.</p></div>`;
    return;
  }
  container.innerHTML = [...pedidos].reverse().map(p => `
    <div class="pedido-item" data-category="${escapeHtml(p.categoria || 'Geral')}">
      <div class="pedido-item-header">
        <span class="pedido-item-nome">
          ${escapeHtml(p.nome || 'Anônimo')}
          <span class="pedido-cat-badge">${escapeHtml(p.categoria || 'Geral')}</span>
        </span>
        <span class="pedido-item-hora">${p.hora || ''}</span>
      </div>
      <div class="pedido-item-text">${escapeHtml(p.pedido || p.text)}</div>
    </div>
  `).join('');
}

async function savePedido() {
  const nome = document.getElementById('pedido-nome')?.value.trim() || 'Anônimo';
  const cidade = document.getElementById('pedido-cidade')?.value.trim() || null;
  const categoria = document.getElementById('pedido-categoria')?.value || 'Geral';
  const pedido = document.getElementById('pedido-text')?.value.trim();
  const feedback = document.getElementById('pedido-feedback');
  const btn = document.getElementById('btn-save-pedido');

  if (!pedido || pedido.length < 5) {
    showFeedback(feedback, 'Por favor, escreva um pedido com mais de 5 caracteres.', 'error');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Enviando...';
  }

  try {
    const formattedPedido = (categoria && categoria !== 'Geral') ? `[${categoria}] ${pedido}` : pedido;

    if (supabaseClient) {
      const { error } = await supabaseClient.from('pedidos_oracao').insert([{
        nome,
        cidade,
        pedido: formattedPedido
      }]);
      if (error) throw error;
      showFeedback(feedback, 'Pedido publicado com sucesso! A comunidade estará orando por você.', 'success');
      loadPedidos();
    } else {
      const pedidos = JSON.parse(localStorage.getItem('aposento_pedidos') || '[]');
      pedidos.push({ nome, cidade, pedido: formattedPedido, categoria, created_at: new Date().toISOString() });
      localStorage.setItem('aposento_pedidos', JSON.stringify(pedidos));
      showFeedback(feedback, 'Pedido salvo localmente!', 'success');
      renderLocalPedidos();
    }

    if (document.getElementById('pedido-nome')) document.getElementById('pedido-nome').value = '';
    if (document.getElementById('pedido-cidade')) document.getElementById('pedido-cidade').value = '';
    if (document.getElementById('pedido-text')) document.getElementById('pedido-text').value = '';
  } catch(e) {
    console.error('Erro ao enviar pedido:', e);
    showFeedback(feedback, 'Ocorreu um erro ao enviar seu pedido. Tente novamente.', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = '✦ Enviar Pedido para o Mural';
    }
  }
}

async function interceder(id) {
  if (intercedidosLocais.includes(id)) return;
  intercedidosLocais.push(id);
  localStorage.setItem('aposento_intercedidos', JSON.stringify(intercedidosLocais));

  const item = document.getElementById(`pedido-${id}`);
  if (item) {
    const btn = item.querySelector('.pedido-item-pray');
    if (btn) {
      btn.classList.add('prayed');
      btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M5 8h14"/></svg> <span>Intercedido!</span>`;
    }
  }

  if (supabaseClient) {
    try {
      await supabaseClient.rpc('interceder_pedido', { pedido_id: id });
    } catch(e) {
      console.warn('Erro ao registrar intercessão:', e);
    }
  }
}


/* ── 10. TESTEMUNHOS (SUPABASE) ──────────── */
async function loadTestemunhos() {
  const container = document.getElementById('testemunhos-list');
  const countEl = document.getElementById('testemunhos-count');
  if (!container) return;

  if (!supabaseClient) return;

  try {
    const { data, error } = await supabaseClient
      .from('testemunhos')
      .select('*')
      .eq('aprovado', true)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) throw error;
    if (countEl) countEl.textContent = data ? data.length : 0;

    if (!data || data.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <svg width="32" height="32" viewBox="0 0 60 60" fill="none" class="empty-state-svg" xmlns="http://www.w3.org/2000/svg"><path d="M30 8C22 8 10 16 10 28C10 34 14 39 20 42C18 45 14 48 10 50C16 50 24 47 28 44C29 44.3 30 44.5 30 44.5C38 44.5 50 37 50 28C50 16 38 8 30 8Z" fill="#D4AF37" opacity="0.85"/><circle cx="23" cy="24" r="2" fill="#0a0f1e"/><path d="M30 8L38 2L34 12" stroke="#D4AF37" stroke-width="2" stroke-linecap="round"/></svg>
          <p>Nenhum testemunho registrado ainda. Seja o primeiro a glorificar o nome de Deus!</p>
        </div>`;
      return;
    }

    container.innerHTML = data.map(t => `
      <div class="testemunho-item">
        <div class="testemunho-item-header">
          <span class="testemunho-item-nome">${escapeHtml(t.nome || 'Anônimo')}</span>
          <span class="testemunho-item-hora">${timeAgo(t.created_at)}</span>
        </div>
        <div class="testemunho-item-text">"${escapeHtml(t.testemunho)}"</div>
      </div>
    `).join('');
  } catch(e) {
    console.error('Erro ao carregar testemunhos:', e);
  }
}

async function saveTestemunho() {
  const nome = document.getElementById('testemunho-nome')?.value.trim() || 'Anônimo';
  const testemunho = document.getElementById('testemunho-text')?.value.trim();
  const feedback = document.getElementById('testemunho-feedback');
  const btn = document.getElementById('btn-save-testemunho');

  if (!testemunho || testemunho.length < 5) {
    showFeedback(feedback, 'Por favor, escreva um testemunho com mais de 5 caracteres.', 'error');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Publicando...';
  }

  try {
    if (supabaseClient) {
      const { error } = await supabaseClient.from('testemunhos').insert([{
        nome,
        testemunho
      }]);
      if (error) throw error;
      showFeedback(feedback, 'Glória a Deus! Seu testemunho foi publicado com sucesso.', 'success');
      loadTestemunhos();
    }

    if (document.getElementById('testemunho-nome')) document.getElementById('testemunho-nome').value = '';
    if (document.getElementById('testemunho-text')) document.getElementById('testemunho-text').value = '';
  } catch(e) {
    console.error('Erro ao enviar testemunho:', e);
    showFeedback(feedback, 'Ocorreu um erro ao publicar o testemunho. Tente novamente.', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = '✦ Publicar Testemunho';
    }
  }
}


/* ── 11. NEWSLETTER (SUPABASE) ───────────── */
async function subscribeNewsletter() {
  const emailInput = document.getElementById('newsletter-email');
  const email = emailInput?.value.trim();
  const feedback = document.getElementById('newsletter-feedback');
  const btn = document.getElementById('btn-newsletter');

  if (!email || !email.includes('@') || !email.includes('.')) {
    showFeedback(feedback, 'Por favor, insira um e-mail válido.', 'error');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Cadastrando...';
  }

  try {
    // 1. Enviar para a tabela do Supabase (newsletter_leads)
    if (supabaseClient) {
      try {
        await supabaseClient.from('newsletter_leads').insert([{
          email,
          interesse: 'loja_devocionais'
        }]);
      } catch (subErr) {
        console.warn('Supabase lead notice:', subErr);
      }
    }

    // 2. Backup local garantido no localStorage
    try {
      const localLeads = JSON.parse(localStorage.getItem('aposento_newsletter_leads') || '[]');
      if (!localLeads.some(l => l.email === email)) {
        localLeads.push({ email, data: new Date().toISOString() });
        localStorage.setItem('aposento_newsletter_leads', JSON.stringify(localLeads));
      }
    } catch(locErr) {}

    showFeedback(feedback, 'E-mail cadastrado com sucesso! Avisaremos assim que os materiais estiverem disponíveis.', 'success');
    if (emailInput) emailInput.value = '';
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Cadastrado! ✦';
      setTimeout(() => { btn.textContent = 'Quero ser avisado'; }, 3000);
    }
  } catch(e) {
    console.error('Erro ao cadastrar e-mail:', e);
    showFeedback(feedback, 'Não foi possível cadastrar seu e-mail. Tente novamente.', 'error');
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Quero ser avisado';
    }
  }
}


/* ── 12. REALTIME & INICIALIZAÇÃO ────────── */
function setupRealtime() {
  if (!supabaseClient) return;
  try {
    supabaseClient
      .channel('aposento-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pedidos_oracao' }, () => {
        loadPedidos();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'oracoes_globais' }, () => {
        loadGlobalPrayers();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'testemunhos' }, () => {
        loadTestemunhos();
      })
      .subscribe();
  } catch(e) {
    console.warn('Realtime subscription not available:', e);
  }
}

// Inicializar dados do Supabase
loadGlobalPrayers();
loadPedidos();
loadTestemunhos();
setupRealtime();

// Atualizar ano do rodapé dinamicamente
const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* ── 13. STREAK DIAS COM DEUS ────────────── */
function getStreakData() {
  const defaultData = {
    streak: 1,
    lastDate: '',
    history: []
  };
  try {
    const raw = localStorage.getItem('aposento_streak_data');
    if (!raw) return defaultData;
    return JSON.parse(raw);
  } catch(e) {
    return defaultData;
  }
}

function saveStreakData(data) {
  try {
    localStorage.setItem('aposento_streak_data', JSON.stringify(data));
  } catch(e) {}
}

function getTodayString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getYesterdayString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function updateStreakDisplay() {
  const data = getStreakData();
  const streakCountEl = document.getElementById('streak-text');
  const modalCountEl = document.getElementById('streak-modal-days');

  const daysLabel = data.streak === 1 ? '1 dia com Deus' : `${data.streak} dias com Deus`;
  if (streakCountEl) streakCountEl.textContent = daysLabel;
  if (modalCountEl) modalCountEl.textContent = data.streak;
}

function recordPrayerDay() {
  const data = getStreakData();
  const today = getTodayString();
  const yesterday = getYesterdayString();

  if (data.lastDate === today) {
    return;
  }

  if (data.lastDate === yesterday) {
    data.streak += 1;
  } else if (!data.lastDate) {
    data.streak = 1;
  } else {
    data.streak = 1;
  }

  data.lastDate = today;
  if (!data.history.includes(today)) {
    data.history.push(today);
  }
  saveStreakData(data);
  updateStreakDisplay();
}

function openStreakModal() {
  const modal = document.getElementById('streak-modal-overlay');
  if (!modal) return;

  const data = getStreakData();
  updateStreakDisplay();

  const weekDaysContainer = document.getElementById('streak-week-days');
  if (weekDaysContainer) {
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const now = new Date();
    const currentDayOfWeek = now.getDay();

    let html = '';
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(now.getDate() - (currentDayOfWeek - i));
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const isCompleted = data.history.includes(dateStr) || (data.lastDate === dateStr);
      const isToday = (i === currentDayOfWeek);

      html += `
        <div class="streak-day-item ${isCompleted ? 'completed' : ''} ${isToday ? 'today' : ''}">
          <span class="streak-day-name">${dayNames[i]}</span>
          <div class="streak-day-circle">
            ${isCompleted ? '✦' : (isToday ? '•' : '○')}
          </div>
        </div>
      `;
    }
    weekDaysContainer.innerHTML = html;
  }

  modal.classList.add('open');
}

function closeStreakModal() {
  const modal = document.getElementById('streak-modal-overlay');
  if (modal) modal.classList.remove('open');
}


/* ── 14. MOMENTO NO APOSENTO (EXPERIÊNCIA GUIADA) ── */
let momentoCurrentStep = 1;
let momentoBreathingInterval = null;
let momentoBreathingCycle = 1;
let momentoTimerInterval = null;
let momentoTimerRemaining = 3 * 60;

function openMomentoAposento() {
  const overlay = document.getElementById('momento-overlay');
  if (!overlay) return;

  overlay.classList.add('open');
  momentoCurrentStep = 1;
  momentoTimerRemaining = 3 * 60;
  updateMomentoStepUI(1);

  startBreathingCycle();
  startAmbientPad();
}

function closeMomentoAposento() {
  const overlay = document.getElementById('momento-overlay');
  if (overlay) overlay.classList.remove('open');
  stopBreathingCycle();
  clearInterval(momentoTimerInterval);

  if (!timerRunning) {
    stopAmbientPad();
  }
}

function nextMomentoStep(step) {
  momentoCurrentStep = step;
  updateMomentoStepUI(step);

  if (step === 1) {
    startBreathingCycle();
    clearInterval(momentoTimerInterval);
  } else if (step === 2) {
    stopBreathingCycle();
    clearInterval(momentoTimerInterval);
    const currentVerseText = document.getElementById('verse-text')?.textContent;
    const currentVerseRef = document.getElementById('verse-ref')?.textContent;
    if (currentVerseText && currentVerseText !== 'Carregando...') {
      const vTextEl = document.getElementById('momento-verse-text');
      const vRefEl = document.getElementById('momento-verse-ref');
      if (vTextEl) vTextEl.textContent = `"${currentVerseText}"`;
      if (vRefEl) vRefEl.textContent = currentVerseRef;
    }
  } else if (step === 3) {
    stopBreathingCycle();
    startMomentoTimer();
  }
}

function updateMomentoStepUI(step) {
  for (let i = 1; i <= 3; i++) {
    const nav = document.getElementById(`step-nav-${i}`);
    const pane = document.getElementById(`momento-step-${i}`);
    if (nav) nav.classList.toggle('active', i === step);
    if (pane) pane.classList.toggle('active', i === step);
  }
}

function startBreathingCycle() {
  stopBreathingCycle();
  momentoBreathingCycle = 1;
  const circle = document.getElementById('breathing-circle');
  const textEl = document.getElementById('breathing-text');
  const cycleEl = document.getElementById('breathing-cycle-num');

  const phases = [
    { text: 'Inspire a Paz...', cls: 'inhale', dur: 4000 },
    { text: 'Descanse em Deus...', cls: 'hold', dur: 4000 },
    { text: 'Expire o fardo...', cls: 'exhale', dur: 4000 }
  ];

  let currentPhaseIdx = 0;

  function runPhase() {
    const p = phases[currentPhaseIdx];
    if (circle) {
      circle.className = `breathing-circle ${p.cls}`;
    }
    if (textEl) textEl.textContent = p.text;

    currentPhaseIdx = (currentPhaseIdx + 1) % phases.length;
    if (currentPhaseIdx === 0) {
      momentoBreathingCycle++;
      if (cycleEl) cycleEl.textContent = Math.min(3, momentoBreathingCycle);
    }
  }

  runPhase();
  momentoBreathingInterval = setInterval(runPhase, 4000);
}

function stopBreathingCycle() {
  if (momentoBreathingInterval) {
    clearInterval(momentoBreathingInterval);
    momentoBreathingInterval = null;
  }
  const circle = document.getElementById('breathing-circle');
  if (circle) circle.className = 'breathing-circle';
}

function startMomentoTimer() {
  clearInterval(momentoTimerInterval);
  const displayEl = document.getElementById('momento-timer-display');

  function updateMDisp() {
    const m = Math.floor(momentoTimerRemaining / 60);
    const s = momentoTimerRemaining % 60;
    if (displayEl) displayEl.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  updateMDisp();

  momentoTimerInterval = setInterval(() => {
    momentoTimerRemaining--;
    updateMDisp();
    if (momentoTimerRemaining <= 0) {
      clearInterval(momentoTimerInterval);
      finishMomentoAposento();
    }
  }, 1000);
}

function finishMomentoAposento() {
  clearInterval(momentoTimerInterval);
  recordPrayerDay();
  recordPrayerCompletion(3);
  playEndSound();

  const finishBtn = document.getElementById('btn-finish-momento');
  if (finishBtn) {
    finishBtn.innerHTML = '<span>✦ Bênção Guardada! Glória a Deus!</span>';
    finishBtn.style.background = '#2ecc71';
  }

  setTimeout(() => {
    closeMomentoAposento();
    if (finishBtn) {
      finishBtn.innerHTML = '<span>✦ Concluir e Guardar Bênção</span>';
      finishBtn.style.background = '';
    }
    openStreakModal();
  }, 1200);
}


/* ── 15. JORNADAS DEVOCIONAIS (7 DIAS) ───── */
const JORNADAS_DATA = {
  ansiedade: {
    id: 'ansiedade',
    title: 'Vencendo a Ansiedade e o Medo',
    description: '7 dias mergulhando nas promessas do Pai que trazem descanso sereno à sua mente.',
    days: [
      {
        day: 1,
        title: 'A Paz que Excede Todo Entendimento',
        verse: 'Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças.',
        ref: 'Filipenses 4:6-7',
        devotional: 'A ansiedade tenta nos convencer de que precisamos controlar o incontrolável. A oração é o antídoto santo: entregar nas mãos Daquele que sustenta as estrelas os detalhes do seu amanhã.',
        prayer: 'Senhor Jesus, entrego agora em Tuas mãos tudo aquilo que aperta meu peito. Eu escolho confiar no Teu cuidado e recebo a Tua paz hoje. Amém.'
      },
      {
        day: 2,
        title: 'O Dia de Amanhã Pertence a Deus',
        verse: 'Não vos inquieteis, pois, pelo dia de amanhã, porque o dia de amanhã cuidará de si mesmo. Basta a cada dia o seu mal.',
        ref: 'Mateus 6:34',
        devotional: 'Viver no futuro é roubar a graça que Deus preparou para o dia de hoje. A cada manhã, as misericórdias do Senhor se renovam com a porção exata para suas forças.',
        prayer: 'Pai celestial, liberta-me do anseio pelo amanhã. Ensina-me a saborear o dia de hoje com gratidão e na certeza de que Tu já estás no meu futuro. Amém.'
      },
      {
        day: 3,
        title: 'O Senhor é Meu Pastor, Nada Me Faltará',
        verse: 'O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas mansas.',
        ref: 'Salmo 23:1-2',
        devotional: 'Ovelhas não se preocupam de onde virá a próxima pastagem porque confiam nos passos do Pastor. Descanse no fato de que o Senhor conhece suas carências antes mesmo de você pedir.',
        prayer: 'Bom Pastor, aquieta minha alma agitada. Leva-me às Tuas águas de descanso e restaura o meu fôlego espiritual. Amém.'
      },
      {
        day: 4,
        title: 'Sob a Sombra do Onipotente',
        verse: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará. Direi do Senhor: Ele é o meu refúgio e a minha fortaleza, o meu Deus, em quem confio.',
        ref: 'Salmo 91:1-2',
        devotional: 'Não há lugar mais seguro no universo do que a presença de Deus. Não importa o tamanho da tempestade lá fora, no Aposento Alto você está sob a cobertura do Altíssimo.',
        prayer: 'Meu Deus e refúgio, coloco minha vida e minha família sob as Tuas asas protetoras. Nenhum mal tem autoridade sobre a minha paz. Amém.'
      },
      {
        day: 5,
        title: 'Não Temas, Pois Eu Sou Contigo',
        verse: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.',
        ref: 'Isaías 41:10',
        devotional: 'O medo perde a força quando nos lembramos de quem segura a nossa mão direita. Deus não apenas caminha ao seu lado; Ele te sustenta com Sua força infalível.',
        prayer: 'Senhor, cala a voz do medo em minha mente. Enche meu coração com a Tua coragem e a certeza do Teu abraço protetor. Amém.'
      },
      {
        day: 6,
        title: 'Lançando Todo o Fardo Sobre Ele',
        verse: 'Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.',
        ref: '1 Pedro 5:7',
        devotional: 'Lançar significa soltar intencionalmente. Não carregue peso que não foi desenhado para as suas costas. Deus tem prazer em carregar o que te oprime.',
        prayer: 'Pai, eu solto agora o fardo pesado. Despejo diante do Teu altar minhas preocupações financeiras, de saúde e familiares. Tu cuidas de mim. Amém.'
      },
      {
        day: 7,
        title: 'A Minha Paz Vos Dou',
        verse: 'Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.',
        ref: 'João 14:27',
        devotional: 'A paz de Jesus não depende de circunstâncias calmas; ela é uma âncora viva no meio da tempestade. Celebre hoje a vitória da mente guardada por Cristo.',
        prayer: 'Senhor Jesus, obrigado por esses 7 dias de renovação. Eu recebo e tomo posse da Tua paz definitiva. Minha mente pertence a Ti. Amém!'
      }
    ]
  },
  familia: {
    id: 'familia',
    title: 'Edificando o Lar na Presença de Deus',
    description: '7 dias clamando por proteção, união, cura de feridas e bênçãos sobre cada familiar.',
    days: [
      {
        day: 1,
        title: 'Eu e a Minha Casa Serviremos ao Senhor',
        verse: 'Porém eu e a minha casa serviremos ao Senhor.',
        ref: 'Josué 24:15',
        devotional: 'Uma declaração de fé que atravessa gerações. Quando você se posiciona no Aposento Alto pela sua família, o ambiente espiritual da sua casa é transformado.',
        prayer: 'Senhor Deus, consagro a minha casa e cada um dos meus familiares ao Teu senhorio. Que haja reverência e amor debaixo do nosso teto. Amém.'
      },
      {
        day: 2,
        title: 'Bem-Aventurado o Lar que Teme a Deus',
        verse: 'Bem-aventurado aquele que teme ao Senhor e anda nos seus caminhos! A tua mulher será como a videira frutífera aos lados da tua casa; os teus filhos como plantas de oliveira à roda da tua mesa.',
        ref: 'Salmo 128:1,3',
        devotional: 'O temor do Senhor atrai fartura emocional, proteção e estabilidade para dentro do lar. A bênção de Deus não acrescenta dores.',
        prayer: 'Pai bendito, derrama do Teu Espírito sobre os meus relacionamentos familiares. Faze da minha casa um manancial de alegria e frutificação. Amém.'
      },
      {
        day: 3,
        title: 'Perdão e Graça Entre Nós',
        verse: 'Suportai-vos uns aos outros, perdoai-vos mutuamente, caso alguém tenha motivo de queixa contra outrem. Assim como o Senhor vos perdoou, assim também perdoai vós.',
        ref: 'Colossenses 3:13',
        devotional: 'Famílias fortes não são aquelas que nunca erram, mas aquelas que dominam a arte de perdoar depressa e acolher com o mesmo amor que receberam da Cruz.',
        prayer: 'Jesus, sara as feridas de palavras duras ou desentendimentos no meu lar. Dá-me um coração manso para perdoar e pedir perdão. Amém.'
      },
      {
        day: 4,
        title: 'A Proteção e Sabedoria dos Filhos',
        verse: 'Ensina a criança no caminho em que deve andar, e, ainda quando for velho, não se desviará dele.',
        ref: 'Provérbios 22:6',
        devotional: 'Nossos filhos e jovens são flechas nas mãos do Guerreiro. Que eles cresçam protegidos das ciladas do mundo e com raízes firmes na verdade.',
        prayer: 'Senhor, cerca os meus filhos e parentes mais jovens com Teus anjos. Guarda os passos deles e ilumina suas decisões. Amém.'
      },
      {
        day: 5,
        title: 'Armadura Espiritual Sobre as Nossas Portas',
        verse: 'Revesti-vos de toda a armadura de Deus, para que possais estar firmes contra as astutas ciladas do diabo.',
        ref: 'Efésios 6:11',
        devotional: 'Toda contenda e divisão são neutralizadas quando colocamos o sangue do Cordeiro nos umbrais das nossas portas através da oração diária.',
        prayer: 'Senhor, blinda a minha casa contra todo dardo inflamado de discórdia, enfermidade ou escassez. Reina em nosso meio com autoridade santa. Amém.'
      },
      {
        day: 6,
        title: 'O Amor que Tudo Sofre e Jamais Acaba',
        verse: 'O amor é paciente, é benigno; o amor não arde em ciúmes, não se ufana, não se ensoberbe... tudo sofre, tudo crê, tudo espera, tudo suporta.',
        ref: '1 Coríntios 13:4,7',
        devotional: 'O amor bíblico é uma decisão diária de honrar e abençoar o outro, mesmo nos dias difíceis. Ele renova os laços conjugais e fraternos.',
        prayer: 'Pai de amor, enche meu coração da Tua paciência e doçura. Que o amor de Cristo seja o idioma falado em nossa convivência. Amém.'
      },
      {
        day: 7,
        title: 'A Casa Edificada sobre a Rocha',
        verse: 'Se o Senhor não edificar a casa, em vão trabalham os que a edificam; se o Senhor não guardar a cidade, em vão vigia a sentinela.',
        ref: 'Salmo 127:1',
        devotional: 'Entregue o governo do seu lar a Deus. Quando Ele é o alicerce, nenhuma ventania ou enchente pode derrubar a sua família.',
        prayer: 'Senhor, a minha família é Tua! Concluo esses 7 dias com fé inabalável de que Tu és o Senhor absoluto do meu lar. Amém!'
      }
    ]
  },
  renovacao: {
    id: 'renovacao',
    title: 'Renovação Espiritual e Poder do Alto',
    description: '3 dias intensos de quebrantamento, sede pela presença de Deus e renovação do primeiro amor.',
    days: [
      {
        day: 1,
        title: 'Cria em Mim um Coração Puro',
        verse: 'Cria em mim, ó Deus, um coração puro e renova dentro de mim um espírito inabalável. Não me lances fora da tua presença e não retires de mim o teu Espírito Santo.',
        ref: 'Salmo 51:10-11',
        devotional: 'O avivamento começa no espelho. Quando nos despimos de todo orgulho e nos achegamos com sinceridade a Deus, o fogo sagrado volta a queimar em nosso peito.',
        prayer: 'Senhor, sonda o meu íntimo. Lava-me de toda mornidão espiritual e reacende a chama do Teu amor em mim hoje. Amém.'
      },
      {
        day: 2,
        title: 'O Vento Impetuoso do Espírito',
        verse: 'E de repente veio do céu um som, como de um vento veemente e impetuoso... e todos foram cheios do Espírito Santo.',
        ref: 'Atos 2:2,4',
        devotional: 'Assim como no cenáculo em Jerusalém, o Aposento Alto é o lugar da promessa. Não dependemos da nossa própria força, mas do poder do Espírito Santo que habita em nós.',
        prayer: 'Espírito Santo, sopra Tua brisa e Teu poder sobre a minha vida agora. Enche-me até transbordar de alegria e autoridade espiritual. Amém.'
      },
      {
        day: 3,
        title: 'Renovados como a Águia',
        verse: 'Mas os que esperam no Senhor renovam as suas forças, sobem com asas como águias, correm e não se cansam, caminham e não se fatigam.',
        ref: 'Isaías 40:31',
        devotional: 'O cansaço da alma desaparece na presença do Todo-Poderoso. Saia deste lugar renovado, ungido e pronto para vencer qualquer desafio em nome de Jesus.',
        prayer: 'Senhor Todo-Poderoso, recebo novas forças neste dia! Renovo meu compromisso de Te buscar todos os dias. Tu és o meu tudo. Amém e amém!'
      }
    ]
  }
};

let currentJornadaKey = 'ansiedade';
let currentJornadaDay = 1;

function getJornadasProgress() {
  try {
    const raw = localStorage.getItem('aposento_jornadas_progress');
    return raw ? JSON.parse(raw) : { ansiedade: [], familia: [], renovacao: [] };
  } catch(e) {
    return { ansiedade: [], familia: [], renovacao: [] };
  }
}

function saveJornadasProgress(progress) {
  try {
    localStorage.setItem('aposento_jornadas_progress', JSON.stringify(progress));
  } catch(e) {}
}

function renderJornada(key, dayNum = 1) {
  const container = document.getElementById('jornada-container');
  if (!container) return;

  const data = JORNADAS_DATA[key];
  if (!data) return;

  currentJornadaKey = key;
  currentJornadaDay = dayNum;

  const progressData = getJornadasProgress();
  const completedDays = progressData[key] || [];
  const totalDays = data.days.length;
  const percent = Math.round((completedDays.length / totalDays) * 100);

  const dayInfo = data.days.find(d => d.day === dayNum) || data.days[0];
  const isDayCompleted = completedDays.includes(dayNum);

  container.innerHTML = `
    <div class="jornada-header-info">
      <div class="jornada-title-wrap">
        <h3>${escapeHtml(data.title)}</h3>
        <p>${escapeHtml(data.description)}</p>
      </div>
      <div class="jornada-progress-box">
        <div class="jornada-progress-labels">
          <span>Progresso da Trilha</span>
          <span>${completedDays.length}/${totalDays} dias (${percent}%)</span>
        </div>
        <div class="jornada-progress-bar">
          <div class="jornada-progress-fill" style="width: ${percent}%;"></div>
        </div>
      </div>
    </div>

    <!-- Navegação de Dias -->
    <div class="jornada-days-nav">
      ${data.days.map(d => {
        const done = completedDays.includes(d.day);
        const active = (d.day === dayNum);
        return `
          <button class="day-tab-btn ${active ? 'active' : ''} ${done ? 'completed' : ''}" onclick="renderJornada('${key}', ${d.day})">
            <span class="day-num">Dia ${d.day}</span>
            <span class="day-status-icon">${done ? '✓' : '✦'}</span>
          </button>
        `;
      }).join('')}
    </div>

    <!-- Conteúdo do Dia -->
    <div class="jornada-day-body">
      <div class="jornada-day-title-badge">✦ DIA ${dayInfo.day} DE ${totalDays}</div>
      <h4 class="jornada-day-heading">${escapeHtml(dayInfo.title)}</h4>

      <div class="jornada-verse-card">
        <p class="jornada-verse-text">"${escapeHtml(dayInfo.verse)}"</p>
        <span class="jornada-verse-ref">${escapeHtml(dayInfo.ref)}</span>
      </div>

      <div class="jornada-devocional-text">
        <p>${escapeHtml(dayInfo.devotional)}</p>
      </div>

      <div class="jornada-prayer-card">
        <h4>✦ Clamor Dirigido para Hoje</h4>
        <p>"${escapeHtml(dayInfo.prayer)}"</p>
      </div>

      <div class="jornada-day-actions">
        <button class="btn btn-glass btn-sm" onclick="shareJornadaDay('${escapeHtml(dayInfo.title)}', '${escapeHtml(dayInfo.verse)}', '${escapeHtml(dayInfo.ref)}')">
          Compartilhar Bênção
        </button>
        <button class="btn ${isDayCompleted ? 'btn-glass' : 'btn-primary btn-glow'}" id="btn-complete-day" onclick="completeJornadaDay('${key}', ${dayInfo.day})">
          <span>${isDayCompleted ? '✓ Dia Concluído' : '✦ Concluir Dia de Oração'}</span>
        </button>
      </div>
    </div>
  `;
}

function switchJornada(key, btn) {
  document.querySelectorAll('.jornada-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderJornada(key, 1);
}

function completeJornadaDay(key, dayNum) {
  const progress = getJornadasProgress();
  if (!progress[key]) progress[key] = [];

  if (!progress[key].includes(dayNum)) {
    progress[key].push(dayNum);
    saveJornadasProgress(progress);
    recordPrayerDay();
    recordPrayerCompletion(2);
  }

  renderJornada(key, dayNum);

  const btn = document.getElementById('btn-complete-day');
  if (btn) {
    btn.innerHTML = '<span>✓ Glória a Deus! Dia Registrado</span>';
  }
}

function shareJornadaDay(title, verse, ref) {
  const shareText = `*Aposento Alto — ${title}*\n\n"${verse}" (${ref})\n\nVenha orar conosco: ${window.location.origin || 'https://aposentoalto.org'}`;
  if (navigator.share) {
    navigator.share({ title: `Aposento Alto: ${title}`, text: shareText }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Versículo da jornada copiado com sucesso para compartilhar!');
    });
  }
}

// Inicializar novos módulos
updateStreakDisplay();
renderJornada('ansiedade', 1);

// ── 21. PWA & SERVICE WORKER ────────────────
let deferredInstallPrompt = null;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => {
        console.log('Aposento Alto PWA ativado:', reg.scope);
      })
      .catch(err => {
        console.warn('PWA service worker aviso:', err);
      });
  });
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const btn = document.getElementById('btn-pwa-install');
  if (btn && window.innerWidth > 768) btn.style.display = 'inline-flex';
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  const btn = document.getElementById('btn-pwa-install');
  if (btn) btn.style.display = 'none';
  console.log('Aposento Alto instalado com sucesso!');
});

function triggerPwaInstall() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        const btn = document.getElementById('btn-pwa-install');
        if (btn) btn.style.display = 'none';
      }
      deferredInstallPrompt = null;
    });
  } else {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
      alert('Para instalar no seu iPhone ou iPad:\n\n1. Toque no botão de Compartilhar (o ícone de quadrado com a seta para cima na barra do Safari)\n2. Role para baixo e selecione "Adicionar à Tela de Início"\n3. Toque em "Adicionar".\n\nO Aposento Alto ficará disponível como um app nativo!');
    } else {
      alert('Para instalar no seu dispositivo:\n\nAbra o menu do seu navegador (três pontinhos no topo) e selecione "Instalar aplicativo" ou "Adicionar à tela inicial".');
    }
  }
}

// ── 22. BARRA DE NAVEGAÇÃO MOBILE (ESTILO APP NATIVO) ──────
function setActiveAppTab(element) {
  if (!element) return;
  document.querySelectorAll('.mobile-app-bar .app-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  element.classList.add('active');
}

// Atualizar aba ativa no scroll da página
function initMobileAppScrollSpy() {
  const sections = [
    { id: 'hero', tab: 'hero' },
    { id: 'versiculo', tab: 'versiculo' },
    { id: 'jornadas', tab: 'jornadas' },
    { id: 'diario', tab: 'diario' }
  ];

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const tabId = entry.target.id;
          const matchingTab = document.querySelector(`.mobile-app-bar .app-tab[data-tab="${tabId}"]`);
          if (matchingTab) {
            document.querySelectorAll('.mobile-app-bar .app-tab').forEach(t => t.classList.remove('active'));
            matchingTab.classList.add('active');
          }
        }
      });
    }, {
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0.15
    });

    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileAppScrollSpy);
} else {
  initMobileAppScrollSpy();
}



