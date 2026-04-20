// ════════════════════════════════════════════════
//   FAM MONEY SCHOOL v2 — JAVASCRIPT
// ════════════════════════════════════════════════

// ── IMPROVEMENT 01: CURATED YOUTUBE VIDEOS ──
// Each video matched to the right lesson/track topic
// Replace video IDs with your preferred links
const ytVideos = {
  credit_basics: {
    id: 'byMTOZ3lIls',
    title: 'What is Credit? Explained Simply',
    channel: 'Finance with Sharan · 3.2M subs',
    url: 'https://youtube.com/watch?v=byMTOZ3lIls'
  },
  credit_score: {
    id: '5tYSPQHLdNE',
    title: 'CIBIL Score Explained — How It Works',
    channel: 'Ankur Warikoo · 4M subs',
    url: 'https://youtube.com/watch?v=5tYSPQHLdNE'
  },
  credit_cards: {
    id: 'Q3Z9d_5uKFM',
    title: 'Credit Cards for Beginners in India',
    channel: 'CA Rachana Ranade · 4.9M subs',
    url: 'https://youtube.com/watch?v=Q3Z9d_5uKFM'
  },
  emi_loans: {
    id: '4oMNyG0ANiQ',
    title: 'EMI Calculator & How Loans Work',
    channel: 'Asset Yogi · 3.6M subs',
    url: 'https://youtube.com/watch?v=4oMNyG0ANiQ'
  },
  stock_market: {
    id: 'p7HKvqRI_Bo',
    title: 'Stock Market for Beginners — Hindi',
    channel: 'Pranjal Kamra · 2.8M subs',
    url: 'https://youtube.com/watch?v=p7HKvqRI_Bo'
  },
  mutual_funds: {
    id: 'N-jBnJ6s11w',
    title: 'Mutual Funds Explained in 10 mins',
    channel: 'Finance with Sharan · 3.2M subs',
    url: 'https://youtube.com/watch?v=N-jBnJ6s11w'
  },
  sip: {
    id: 'wgJlLWDkmpM',
    title: 'SIP — The Most Powerful Habit in Finance',
    channel: 'Ankur Warikoo · 4M subs',
    url: 'https://youtube.com/watch?v=wgJlLWDkmpM'
  },
  taxes: {
    id: 'KZmDfRHBiRU',
    title: 'Income Tax for Beginners — Full Guide',
    channel: 'CA Rachana Ranade · 4.9M subs',
    url: 'https://youtube.com/watch?v=KZmDfRHBiRU'
  },
  compounding: {
    id: 'JHRnqJJ0rhc',
    title: 'The Power of Compounding — Explained',
    channel: 'Yadnya Investment · 840K subs',
    url: 'https://youtube.com/watch?v=JHRnqJJ0rhc'
  }
};

// Current lesson's video
let currentVideoKey = 'credit_cards';

// ── IMPROVEMENT 10: GLOSSARY ──
const glossary = {
  'Credit': {icon:'💳', def:'Money borrowed with a promise to repay later, usually with interest. Think of it as financial trust — lenders trust you\'ll pay back.'},
  'CIBIL': {icon:'📊', def:'Credit Information Bureau India Limited. India\'s main credit bureau that maintains your credit history and generates your credit score (300–900).'},
  'Interest': {icon:'💰', def:'The cost of borrowing money. If you borrow ₹1,000 at 10% interest, you pay back ₹1,100 — that extra ₹100 is the interest.'},
  'APR': {icon:'📈', def:'Annual Percentage Rate — the yearly cost of credit expressed as a percentage. Credit cards in India typically charge 36–48% APR.'},
  'Lender': {icon:'🏦', def:'The person or institution (usually a bank) who gives you the loan. They earn interest as profit.'},
  'NAV': {icon:'📈', def:'Net Asset Value — the per-unit price of a mutual fund. If NAV is ₹100 today and ₹110 tomorrow, your fund grew 10%.'},
  'SIP': {icon:'🔁', def:'Systematic Investment Plan — investing a fixed amount every month automatically in a mutual fund. The most powerful wealth-building habit.'},
  'EMI': {icon:'📅', def:'Equated Monthly Instalment — a fixed monthly payment that covers both the loan amount and interest charges.'},
  'Sensex': {icon:'📊', def:'BSE Sensex tracks India\'s 30 largest companies. When Sensex goes up, the stock market is generally doing well.'},
  'Demat': {icon:'🗂️', def:'Dematerialised account — a digital locker that holds your shares electronically. Required to invest in stocks in India.'},
  'Compounding': {icon:'🌱', def:'Earning returns on your returns. Your money grows exponentially over time. ₹10,000 at 12% for 20 years = ₹96,000 — without adding any more!'},
  'Volatility': {icon:'📉', def:'How much a stock\'s price moves up and down. High volatility = big swings. Normal for stocks — don\'t panic.'},
};

// ── STATE ──
let currentCard = 0;
const totalCards = 4;
let currentQuestion = 0;
let quizAnswered = false;
let quizScore = 0;
let hearts = 5;
let currentWrappedSlide = 0;
const totalWrappedSlides = 6;
let bookmarked = false;
let obLevel = '';
let obGoal = '';
let calcMode = 'emi';

// ── IMPROVEMENT 04: ONBOARDING ──
function obNext(step, choice) {
  document.querySelectorAll('.ob-opt').forEach(o => o.classList.remove('selected'));
  if(step === 1) obLevel = choice;
  if(step === 2) {
    obGoal = choice;
    setObRecommendation(choice);
  }
  document.getElementById('ob-' + step).classList.remove('active');
  const next = step + 1;
  const el = document.getElementById('ob-' + next);
  if(el) { el.classList.add('active'); }
}

function setObRecommendation(goal) {
  const recs = {
    credit: {emoji:'💳', text:'I recommend starting with <strong>Credit 101</strong> — it\'s the foundation of all adult finance and takes just 25 minutes total.'},
    invest: {emoji:'📈', text:'Start with <strong>Markets 101</strong> — you\'ll understand stocks, Sensex, and how to read any company in 5 lessons.'},
    tax: {emoji:'🧾', text:'Jump into <strong>Taxes Made Simple</strong> — understand slabs, 80C deductions, and how to legally save thousands.'},
    '18': {emoji:'🎓', text:'<strong>Life After 18 with FAMPay</strong> is your track — your 18-birthday checklist, insurance, Demat, and everything that unlocks.'}
  };
  const r = recs[goal] || recs.credit;
  document.getElementById('ob-rec-emoji').textContent = r.emoji;
  document.getElementById('ob-rec-text').innerHTML = r.text;
}

function startApp() {
  document.getElementById('onboard-screen').classList.remove('active');
  document.getElementById('home-screen').classList.add('active');
  document.getElementById('bottom-nav').style.display = 'flex';
  // Animate XP bar
  setTimeout(() => { document.getElementById('xp-fill').style.width = '68%'; }, 400);
  // Animate ring
  setTimeout(() => {
    const ring = document.getElementById('ring-credit');
    if(ring) { ring.style.strokeDashoffset = 72; } // 40% of 120
  }, 600);
  // Welcome toast
  setTimeout(() => {
    showToast('🦉 Welcome to Money School!', 'Your Credit 101 track is unlocked. Start today\'s lesson!', 'badge-toast');
  }, 800);
  // Badge toast
  setTimeout(() => {
    showToast('🏆 Badge Unlocked: Early Bird!', 'You joined within the first week. Rare.', 'badge-toast');
  }, 2200);
}

// ── SCREEN MANAGEMENT ──
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id + '-screen').classList.add('active');
  const hideOn = ['lesson','quiz','complete','wrapped','onboard'];
  document.getElementById('bottom-nav').style.display = hideOn.includes(id) ? 'none' : 'flex';
  // Update active nav
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navMap = {home:'nav-home',track:'nav-learn',leaderboard:'nav-lb',wrapped:'nav-wrapped'};
  if(navMap[id]) document.getElementById(navMap[id]).classList.add('active');
}

function goBack(to) { showScreen(to); }
function openTrack() { showScreen('track'); }
function showLeaderboard() { showScreen('leaderboard'); }
function showWrapped() {
  showScreen('wrapped');
  currentWrappedSlide = 0;
  buildWrappedDots();
  goToWrappedSlide(0);
  document.getElementById('bottom-nav').style.display = 'none';
}

// ── IMPROVEMENT 07: THEME TOGGLE ──
function toggleTheme() {
  const isLight = document.body.getAttribute('data-theme') === 'light';
  document.body.setAttribute('data-theme', isLight ? '' : 'light');
  document.getElementById('theme-btn').textContent = isLight ? '🌙' : '☀️';
  playSound('click');
}

// ── IMPROVEMENT 06: SOUND FEEDBACK ──
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
function getAudio() { if(!audioCtx) audioCtx = new AudioCtx(); return audioCtx; }
function playSound(type) {
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    const configs = {
      correct: {freq:[523,659,784], dur:0.15, vol:0.15, type:'sine'},
      wrong:   {freq:[220,196],     dur:0.2,  vol:0.12, type:'sawtooth'},
      complete:{freq:[523,659,784,1047], dur:0.12, vol:0.15, type:'sine'},
      click:   {freq:[440],         dur:0.05, vol:0.05, type:'sine'},
      xp:      {freq:[880,1108],    dur:0.1,  vol:0.1,  type:'sine'},
    };
    const c = configs[type] || configs.click;
    osc.type = c.type;
    let t = ctx.currentTime;
    c.freq.forEach((f,i) => {
      osc.frequency.setValueAtTime(f, t + i * c.dur);
    });
    gain.gain.setValueAtTime(c.vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + c.freq.length * c.dur);
    osc.start(t);
    osc.stop(t + c.freq.length * c.dur + 0.05);
  } catch(e) {}
}

// ── IMPROVEMENT 15: HAPTIC ──
function haptic(type) {
  if(!navigator.vibrate) return;
  const patterns = {light:[10], medium:[20], heavy:[10,10,20], success:[10,5,10,5,30], error:[20,10,20]};
  navigator.vibrate(patterns[type] || [10]);
}

// ── IMPROVEMENT 20: TOAST ──
function showToast(title, sub, type='success') {
  const wrap = document.getElementById('toast-wrap');
  const toast = document.createElement('div');
  const icons = {success:'✅', badge_toast:'🏆', 'badge-toast':'🏆'};
  toast.className = 'toast ' + type;
  toast.innerHTML = `<div class="toast-icon">${icons[type]||'✅'}</div><div class="toast-content"><div class="toast-title">${title}</div><div class="toast-sub">${sub}</div></div>`;
  wrap.appendChild(toast);
  haptic('success');
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ── IMPROVEMENT 16: XP COIN ANIMATION ──
function spawnXPCoin(x, y) {
  const coin = document.createElement('div');
  coin.className = 'xp-coin';
  coin.textContent = '+XP';
  coin.style.cssText = `left:${x}px;top:${y}px;color:var(--yellow);font-family:Syne,sans-serif;font-weight:800;font-size:16px`;
  document.body.appendChild(coin);
  setTimeout(() => coin.remove(), 1000);
}

// ── LESSON DATA ──
const lessonCards = [
  {num:'💳 Card 1 of 4', title:'How credit cards work', body:'A credit card gives you a spending limit (say ₹1 lakh). You spend now, pay later. If you pay the FULL amount by the due date — you pay <strong>ZERO interest</strong>. This is the secret most people miss.', showGlossary:true},
  {num:'💳 Card 2 of 4', title:'The Minimum Due Trap', body:'Banks show you a "minimum due" of maybe ₹500. Pay only that, and the remaining ₹9,500 is charged <strong>interest at 36–48% per year</strong>. That\'s the most expensive debt in existence. Never pay only the minimum due.', showGlossary:false},
  {num:'💳 Card 3 of 4', title:'Credit Card Benefits', body:'<strong>Cashback</strong> (1–5% on every purchase). <strong>Reward points</strong> (redeem for travel/shopping). Airport lounge access. Zero-cost EMI on big purchases. These benefits are FREE if you pay the full bill every month.', showGlossary:false},
  {num:'💳 Card 4 of 4', title:'The Rule of 1 Card', body:'When you get your first credit card at 18, only get <strong>1</strong>. Use it for ONE category (like groceries). Pay the <strong>FULL bill EVERY month</strong>. Treat it like a debit card that has superpowers — not free money.', showGlossary:false},
];

// IMPROVEMENT 13: Fun facts between questions
const funFacts = [
  {emoji:'🤯', title:'Mind = blown', text:'Indians had ₹2.14 lakh crore in credit card outstanding dues in 2024. That\'s 2.14 TRILLION rupees in debt.'},
  {emoji:'📈', title:'The math is wild', text:'If you invest ₹500/month from age 15 at 12% return, by 35 you\'ll have ₹4.8 lakhs. The same ₹500/month from age 25 gives only ₹1.5 lakhs by 35.'},
  {emoji:'💡', title:'Rule of 72', text:'Divide 72 by your return rate to find how many years to double your money. At 12% = 6 years. At 6% = 12 years. At 24% = 3 years.'},
];

// ── LESSON SCREEN ──
function openLesson() {
  currentCard = 0;
  hearts = 5;
  currentVideoKey = 'credit_cards';
  renderCards();
  updateLessonUI();
  renderYouTube();
  showScreen('lesson');
}

function renderCards() {
  const stage = document.getElementById('card-stage');
  stage.innerHTML = '';
  lessonCards.forEach((c,i) => {
    const el = document.createElement('div');
    el.className = 'lesson-card ' + (i===0?'active':i===1?'behind':'next');
    el.dataset.card = i;
    let bodyHtml = c.body;
    // IMPROVEMENT 10: Glossary — wrap terms
    Object.keys(glossary).forEach(term => {
      const re = new RegExp('\\b' + term + '\\b', 'g');
      bodyHtml = bodyHtml.replace(re, `<span class="glossary-term" onclick="openGlossary('${term}')">${term}</span>`);
    });
    el.innerHTML = `<div class="card-num">${c.num}</div><div class="card-title">${c.title}</div><div class="card-body">${bodyHtml}</div><div class="card-hint">👆 Tap Next to continue</div>`;
    stage.appendChild(el);
  });
}

function updateLessonUI() {
  const cards = document.querySelectorAll('#card-stage .lesson-card');
  const dots = document.querySelectorAll('#card-dots .dot');
  const btnNext = document.getElementById('btn-next');
  const btnPrev = document.getElementById('btn-prev');
  const ytSection = document.getElementById('youtube-section');
  const calcWgt = document.getElementById('calc-widget');
  cards.forEach((c,i) => {
    c.classList.remove('active','prev','next','behind');
    if(i===currentCard) c.classList.add('active');
    else if(i===currentCard+1) c.classList.add('behind');
    else if(i>currentCard+1) c.classList.add('next');
    else c.classList.add('prev');
  });
  // Rebuild dots
  document.getElementById('card-dots').innerHTML = '';
  lessonCards.forEach((_,i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i===currentCard?' active':'');
    document.getElementById('card-dots').appendChild(d);
  });
  document.getElementById('lesson-progress').style.width = ((currentCard+1)/totalCards*100)+'%';
  document.getElementById('lesson-step-label').textContent = `${currentCard+1} of ${totalCards}`;
  btnPrev.style.display = currentCard > 0 ? 'flex' : 'none';
  const isLast = currentCard === totalCards - 1;
  btnNext.textContent = isLast ? '📝 Take the Quiz →' : 'Next Card →';
  ytSection.style.display = isLast ? 'block' : 'none';
  calcWgt.style.display = isLast ? 'block' : 'none';
  updateHeartsDisplay();
}

function updateHeartsDisplay() {
  let html = '';
  for(let i=0;i<5;i++) html += i<hearts ? '❤️' : '🩶';
  document.getElementById('lesson-hearts').textContent = html;
}

function nextCard() {
  playSound('click'); haptic('light');
  if(currentCard < totalCards-1) { currentCard++; updateLessonUI(); }
  else startQuiz();
}
function prevCard() {
  playSound('click'); haptic('light');
  if(currentCard>0) { currentCard--; updateLessonUI(); }
}

// ── SWIPE SUPPORT ──
let tx=0;
document.getElementById('card-stage').addEventListener('touchstart',e=>{tx=e.touches[0].clientX},{passive:true});
document.getElementById('card-stage').addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].clientX-tx;
  if(dx<-50) nextCard();
  else if(dx>50) prevCard();
},{passive:true});

// ── IMPROVEMENT 01: YOUTUBE RENDER ──
function renderYouTube() {
  const v = ytVideos[currentVideoKey];
  if(!v) return;
  const thumbHtml = `<img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="Video thumbnail" onerror="this.parentElement.innerHTML='<div class=\\'yt-placeholder\\'><span style=\\'font-size:32px\\'>▶️</span><span>${v.title}</span></div>'">`
  + `<div class="yt-play-overlay"><div class="yt-play-btn-inner"><div class="yt-play-arrow"></div></div></div>`
  + `<div class="yt-channel-badge">▶ YouTube</div>`;
  document.getElementById('yt-thumb').innerHTML = thumbHtml;
  document.getElementById('yt-title').textContent = v.title;
  document.getElementById('yt-channel').textContent = v.channel;
  document.getElementById('yt-placeholder') && (document.getElementById('yt-placeholder').style.display='none');
}

function openCurrentYoutube() {
  const v = ytVideos[currentVideoKey];
  if(v) window.open(v.url, '_blank');
  showToast('📺 Opening YouTube...', v ? v.channel : 'Loading video...', 'success');
}

// ── IMPROVEMENT 12: BOOKMARK ──
function toggleBookmark() {
  bookmarked = !bookmarked;
  document.getElementById('bookmark-btn').textContent = bookmarked ? '🔖' : '🔖';
  document.getElementById('bookmark-btn').style.opacity = bookmarked ? '1' : '0.4';
  if(bookmarked) { showToast('🔖 Lesson Bookmarked!','Find it in your profile under Saved Lessons.','success'); haptic('success'); }
  else showToast('🔖 Bookmark removed','Lesson removed from your saved list.','success');
}

// ── IMPROVEMENT 10: GLOSSARY ──
function openGlossary(term) {
  const g = glossary[term];
  if(!g) return;
  document.getElementById('g-icon').textContent = g.icon;
  document.getElementById('g-term').textContent = term;
  document.getElementById('g-def').textContent = g.def;
  document.getElementById('glossary-modal').classList.add('open');
  playSound('click'); haptic('light');
}
function closeGlossaryModal(e) {
  if(!e || e.target === document.getElementById('glossary-modal')) document.getElementById('glossary-modal').classList.remove('open');
}

// ── QUIZ ──
const questions = [
  {q:'What happens if you pay only the "minimum due" on your credit card?',opts:['Nothing, you\'re fine','You get charged 36–48% annual interest on the remaining balance','Your credit score goes up','The bank forgives the rest'],correct:1,explain:'✅ Right! Banks make huge profits from the minimum due trap. Always pay the FULL bill — every single month.'},
  {q:'When do you pay ZERO interest on a credit card?',opts:['When you pay the minimum due','When you don\'t use the card','When you pay the full amount before the due date','Never — cards always charge interest'],correct:2,explain:'✅ Correct! Pay the full outstanding amount by the due date and you pay zero interest. Use the grace period wisely.'},
  {q:'What is a "grace period"?',opts:['Extra credit for good customers','Time between statement date and due date — pay in full here = zero interest','A period when interest is doubled','A bank holiday'],correct:1,explain:'✅ Nailed it! The grace period is your window to pay in full and avoid all interest. Typically 20–50 days.'},
];

function startQuiz() {
  currentQuestion = 0;
  quizScore = 0;
  showScreen('quiz');
  document.getElementById('quiz-progress').style.width = '0%';
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('quiz-counter').textContent = `Question ${currentQuestion+1} of ${questions.length}`;
  document.getElementById('quiz-question').textContent = q.q;
  document.getElementById('quiz-progress').style.width = ((currentQuestion/questions.length)*100)+'%';
  const letters = ['A','B','C','D'];
  const optsEl = document.getElementById('quiz-options');
  optsEl.innerHTML = '';
  q.opts.forEach((opt,i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.innerHTML = `<span class="quiz-opt-letter">${letters[i]}</span>${opt}`;
    btn.onclick = () => selectAnswer(i, btn);
    optsEl.appendChild(btn);
  });
  document.getElementById('quiz-feedback').className = 'quiz-feedback';
  document.getElementById('quiz-feedback').textContent = '';
  document.getElementById('quiz-next-btn').style.display = 'none';
  document.getElementById('funfact-wrap').style.display = 'none';
  quizAnswered = false;
  updateHeartsDisplay();
  // Update quiz hearts
  let h = '';
  for(let i=0;i<5;i++) h += i<hearts ? '❤️' : '🩶';
  document.getElementById('quiz-hearts').textContent = h;
}

function selectAnswer(idx, btn) {
  if(quizAnswered) return;
  quizAnswered = true;
  const q = questions[currentQuestion];
  const opts = document.querySelectorAll('.quiz-opt');
  opts.forEach(o => { o.classList.add('disabled'); o.style.pointerEvents = 'none'; });
  const fb = document.getElementById('quiz-feedback');
  if(idx === q.correct) {
    btn.classList.add('selected-correct');
    fb.className = 'quiz-feedback correct';
    fb.textContent = q.explain;
    quizScore++;
    playSound('correct'); haptic('success');
    showToast('✅ Correct!', '+10 Accuracy bonus!', 'success');
  } else {
    btn.classList.add('selected-wrong');
    opts[q.correct].classList.add('reveal-correct');
    fb.className = 'quiz-feedback wrong';
    fb.textContent = `❌ Not quite. ${q.explain}`;
    // IMPROVEMENT 02: Lose a heart
    hearts = Math.max(0, hearts-1);
    updateHeartsDisplay();
    playSound('wrong'); haptic('error');
    if(hearts === 0) showToast('💔 No lives left!','Lives refill in 3 hours. Streak freeze activated!','badge-toast');
  }
  // IMPROVEMENT 13: Fun fact
  const isLast = currentQuestion === questions.length - 1;
  const ff = funFacts[currentQuestion % funFacts.length];
  const ffWrap = document.getElementById('funfact-wrap');
  ffWrap.innerHTML = `<div class="funfact-card"><div class="funfact-tag">${ff.emoji} Did You Know?</div><div class="funfact-title">${ff.title}</div><div class="funfact-body">${ff.text}</div></div>`;
  ffWrap.style.display = 'block';
  const nBtn = document.getElementById('quiz-next-btn');
  nBtn.style.display = 'block';
  nBtn.textContent = isLast ? '🎉 See Results!' : 'Next Question →';
}

function nextQuestion() {
  playSound('click'); haptic('light');
  if(currentQuestion < questions.length-1) {
    currentQuestion++;
    renderQuestion();
  } else {
    document.getElementById('quiz-progress').style.width = '100%';
    showComplete();
  }
}

// ── COMPLETE SCREEN ──
function showComplete() {
  showScreen('complete');
  spawnConfetti();
  playSound('complete'); haptic('success');
  const xpEarned = 50 + (quizScore * 10);
  document.getElementById('complete-xp').textContent = `+${xpEarned} XP`;
  document.getElementById('cs-score').textContent = `${quizScore}/${questions.length}`;
  document.getElementById('cs-totalxp').textContent = 340 + xpEarned;
  // IMPROVEMENT 16: XP coin
  setTimeout(() => spawnXPCoin(window.innerWidth/2, window.innerHeight/2), 300);
  // IMPROVEMENT 20: Badge toast
  setTimeout(() => showToast('🏅 Badge Unlocked: Credit Wise!','You completed the Credit 101 track. Well done.','badge-toast'), 1400);
  // IMPROVEMENT 09: Streak repair check
  if(hearts === 0) setTimeout(() => showToast('🔥 Streak Repair!','Complete 2 lessons tomorrow to keep your streak alive.','badge-toast'), 2600);
}

function spawnConfetti() {
  const wrap = document.getElementById('confetti-wrap');
  wrap.innerHTML = '';
  const colors = ['#FFD147','#4ADE80','#60A5FA','#A78BFA','#F472B6','#FB923C'];
  for(let i=0;i<50;i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.cssText = `left:${Math.random()*100}%;top:${-10+Math.random()*-20}px;background:${colors[Math.floor(Math.random()*colors.length)]};animation-delay:${Math.random()*1.5}s;animation-duration:${2+Math.random()*2}s;width:${5+Math.random()*8}px;height:${5+Math.random()*8}px;border-radius:${Math.random()>0.5?'50%':'2px'}`;
    wrap.appendChild(p);
  }
}

function shareLesson() {
  if(navigator.share) navigator.share({title:'FAM Money School',text:'I just completed Credit Cards lesson on FAM Money School! 🧠 Financial IQ: 74',url:'https://famwish.app'});
  else showToast('📣 Share link ready!','famwish.app — copy and send to friends.','success');
  haptic('success');
}

// ── WRAPPED ──
function buildWrappedDots() {
  const el = document.getElementById('wrapped-dots');
  el.innerHTML = '';
  for(let i=0;i<totalWrappedSlides;i++) {
    const d = document.createElement('div');
    d.className = 'wrapped-dot';
    d.innerHTML = '<div class="wrapped-dot-fill"></div>';
    el.appendChild(d);
  }
}

function goToWrappedSlide(idx) {
  document.querySelectorAll('.wrapped-slide').forEach((s,i) => {
    s.classList.remove('active','done');
    if(i===idx) s.classList.add('active');
    else if(i<idx) s.classList.add('done');
  });
  document.querySelectorAll('#wrapped-dots .wrapped-dot').forEach((d,i) => {
    d.classList.toggle('done',i<idx);
    d.querySelector('.wrapped-dot-fill').style.width = i<idx?'100%':'0%';
  });
  if(idx===2) setTimeout(()=>document.getElementById('iq-ring-fill').classList.add('animate'),100);
  else document.getElementById('iq-ring-fill').classList.remove('animate');
  if(idx===3) {
    document.querySelectorAll('.topic-pill').forEach(p=>{p.style.animation='none';p.offsetHeight;p.style.animation='';});
  }
  currentWrappedSlide = idx;
  haptic('light');
}

function nextWrappedSlide() {
  if(currentWrappedSlide < totalWrappedSlides-1) goToWrappedSlide(currentWrappedSlide+1);
}

// ── LOCK MODAL ──
function openLockModal(name) {
  document.getElementById('modal-track-name').textContent = `🔒 Unlock "${name}"`;
  document.getElementById('lock-modal').classList.add('open');
  haptic('light');
}
function closeLockModal(e) {
  if(!e || e.target===document.getElementById('lock-modal')) document.getElementById('lock-modal').classList.remove('open');
}
function sendParentRequest() {
  closeLockModal();
  showToast('📲 Request sent to parent!','They\'ll get a notification to approve it in one tap.','success');
  haptic('success');
}

// ── IMPROVEMENT 19: GOAL MODAL ──
function showGoalModal() { document.getElementById('goal-modal').classList.add('open'); }
function closeGoalModal(e) {
  if(!e || e.target===document.getElementById('goal-modal')) { document.getElementById('goal-modal').classList.remove('open'); showToast('🎯 Goal set!','Your monthly learning target is saved.','success'); }
}
function setGoal(n) {
  document.querySelectorAll('#goal-modal .ob-opt').forEach(o=>o.classList.remove('selected'));
  event.target.closest('.ob-opt').classList.add('selected');
}

// ── IMPROVEMENT 17: CALCULATORS ──
function switchCalc(mode) {
  calcMode = mode;
  document.querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('calc-emi').style.display = mode==='emi'?'block':'none';
  document.getElementById('calc-sip').style.display = mode==='sip'?'block':'none';
  document.getElementById('calc-interest').style.display = mode==='interest'?'block':'none';
}
function fmt(n) { return '₹' + Math.round(n).toLocaleString('en-IN'); }
function calcEMI() {
  const P=parseFloat(document.getElementById('emi-amount').value)||0;
  const r=parseFloat(document.getElementById('emi-rate').value)/100/12||0;
  const n=parseInt(document.getElementById('emi-tenure').value)||1;
  if(!P||!r) return;
  const emi = r>0 ? P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1) : P/n;
  const total = emi*n;
  document.getElementById('calc-result-emi').innerHTML = `<div class="calc-result-val">${fmt(emi)}</div><div class="calc-result-label">Monthly EMI · Total payback: ${fmt(total)} · Interest: ${fmt(total-P)}</div>`;
}
function calcSIP() {
  const P=parseFloat(document.getElementById('sip-amount').value)||0;
  const r=parseFloat(document.getElementById('sip-rate').value)/100/12||0;
  const n=parseInt(document.getElementById('sip-years').value)*12||1;
  const corpus = P * ((Math.pow(1+r,n)-1)/r) * (1+r);
  const invested = P*n;
  document.getElementById('calc-result-sip').innerHTML = `<div class="calc-result-val">${fmt(corpus)}</div><div class="calc-result-label">Estimated corpus · Invested: ${fmt(invested)} · Gains: ${fmt(corpus-invested)}</div>`;
}
function calcInterest() {
  const P=parseFloat(document.getElementById('int-principal').value)||0;
  const r=parseFloat(document.getElementById('int-rate').value)/100||0;
  const m=parseInt(document.getElementById('int-months').value)||1;
  const interest = P*r*(m/12);
  document.getElementById('calc-result-interest').innerHTML = `<div class="calc-result-val">${fmt(interest)}</div><div class="calc-result-label">Interest for ${m} month(s) · You repay: ${fmt(P+interest)}</div>`;
}

// ── INIT ──
window.addEventListener('load', () => {
  // Rings animate when home loads after onboarding
});
