const voices = [
  name:"0尹 佳 绮 ", role:"湖 南 云 山 学 校  · 00后 校 长 ", preview:"毕 竟 是 我 毕 业 之 后 第 一 个 学 校 、 第 一 批 学 生 ", quote:["毕 竟 是 我 毕 业 之 后 第 一 个 学 校 、 第 一 批 学 生 、 第 一 个 环 境 。 ","希 望 我 们 未 来 都 会 越 来 越 好 ， 我 会 永 远 记 得 我 是 从 这 里 出 发 的 。 "],
  name:"0张 娜 ", role:"陕 西 策 村 小 学  · 16年 教 龄 教 师 ", preview:"撤 不 撤 我 也 没 有 办 法 ", quote:["撤 不 撤 我 也 没 有 办 法 。 ","所 有 学 习 都 要 靠 我 们 去 抓 ， 没 有 别 的 环 境 可 以 依 靠 。 "],
  name:"0曾 良 平 ", role:"湖 南 云 山 学 校  · 41年 教 龄 老 教 师 ", preview:"我 最 放 心 不 下 的 ， 是 那 些 没 钱 没 势 的 穷 孩 子 ", quote:["我 最 放 心 不 下 的 ， 是 那 些 没 钱 没 势 的 穷 孩 子 。 ","形 式 主 义 表 格 太 多 ， 把 教 书 的 时 间 都 占 了 。 "],
  name:"0黄 老 师 ", role:"广 西 恭 城 瑶 族 自 治 县  · 双 科 教 师 ", preview:"山 里 面 不 会 听 我 们 外 地 人 的 ", quote:["山 里 面 不 会 听 我 们 外 地 人 的 。 ","撤 校 的 事 情 我 们 在 学 校 都 是 避 而 不 谈 的 。 "],
  name:"0王 志 超 ", role:"衡 水 建 国 镇 中 心 校 主 任 ", preview:"撤 不 撤 都 会 有 困 难 ", quote:["撤 不 撤 都 会 有 困 难 。 ","学 生 比 较 少 的 成 绩 却 很 好 ， 这 是 不 是 和 小 班 有 关 系 。 "],
  name:"0赵 小 旺 ", role:"兴 平 市 教 育 局 基 教 科 科 长 ", preview:"教 育 永 远 围 绕 以 学 生 为 中 心 ", quote:["教 育 永 远 围 绕 以 学 生 为 中 心 ， 服 务 辖 区 人 民 群 众 。 ","未 来 村 小 撤 并 的 趋 势 必 然 是 教 育 资 源 全 面 整 合 升 级 。 "],
  name:"0曾 皓 轩 ", role:"湖 南 云 山 学 校  · 学 生 ", preview:"因 为 我 讨 厌 妈 妈 ", quote:["因 为 我 讨 厌 妈 妈 。 ","我 不 想 爷 爷 给 我 送 饭 了 ， 不 然 他 会 快 一 点 变 老 的 。 "],
  name:"0华 芝 涵 ", role:"扬 州 市 渌 洋 湖 中 心 小 学  · 学 生 ", preview:"老 师 有 时 候 会 拿 教 棍 打 手 ", quote:["老 师 有 时 候 会 拿 教 棍 打 手 ， 或 者 打 几 下 头 ， 在 学 业 方 面 比 较 负 责 ， 但 是 育 人 方 面 不 太 行 。 ","在 农 村 读 的 小 学 让 我 看 不 到 希 望 。 "]
];

const grid = document.getElementById('voicesGrid');
voices.forEach((v,i)=>
  const card = document.createElement('div');
  card.className = 'voice-card reveal';
  card.style.transitionDelay = (i % 4 * 0.08) + 's';
  card.innerHTML = `
    <div class="v-name">$v.name</div>
    <div class="v-role">$v.role</div>
    <div class="v-preview">"$v.preview"</div>
    <div class="v-expand">$v.quote.map(q=>`<p>"$q"</p>`).join('')</div>
    <div class="v-toggle"><span class="icon">+</span><span class="txt">0展 开 完 整 语 录 </span></div>
  `;
  card.addEventListener('click',(e)=>
    e.stopPropagation();
    card.classList.toggle('expanded');
    const txt = card.querySelector('.v-toggle .txt');
    txt.textContent = card.classList.contains('expanded') ? '0收 起 ' : '展 开 完 整 语 录 ';
  );
  grid.appendChild(card);
);

const observer = new IntersectionObserver((entries)=>
  entries.forEach(entry=>
    if(entry.isIntersecting)
      entry.target.classList.add('visible');

      if(entry.target.classList.contains('stat-row'))
        entry.target.querySelectorAll('.stat-num').forEach(el=>animateCount(el));
      
    
  );
,threshold:.12);

document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale,.reveal-blur').forEach(el=>observer.observe(el));

function animateCount(el)
  if(el.dataset.done) return;
  el.dataset.done = 1;
  const target = +el.dataset.count;
  const dur = 1400;
  const start = performance.now();
  function step(t)
    const p = Math.min(1,(t-start)/dur);
    const eased = 1 - Math.pow(1-p,3);
    el.textContent = Math.round(target*eased);
    if(p<1) requestAnimationFrame(step);
  
  requestAnimationFrame(step);


window.addEventListener('scroll',()=>
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  document.getElementById('progress').style.width = scrolled + '%';

  const nav = document.querySelector('nav');
  if(window.scrollY > 50)
    nav.style.background = 'rgba(244,245,238,0.93)';
    nav.style.boxShadow = '0 4px 20px rgba(61,107,74,0.08)';
  else
    nav.style.background = 'rgba(244,245,238,0.80)';
    nav.style.boxShadow = 'none';
  

  document.querySelectorAll('.big-chapter').forEach(el=>
    const rect = el.getBoundingClientRect();
    const offset = (window.innerHeight / 2 - rect.top) * 0.08;
    el.style.transform = `translateY(calc(-50% + $offsetpx))`;
  );
);

const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

window.addEventListener('mousemove', e=>
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
);

function loop()
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(loop);

loop();

function bindHover()
  document.querySelectorAll('a,.voice-card,.school-card,.stat-item,.scholar,.kid-card,button,.data-card,.phase-item').forEach(el=>
    el.addEventListener('mouseenter', ()=>ring.classList.add('hover'));
    el.addEventListener('mouseleave', ()=>ring.classList.remove('hover'));
  );

bindHover();
setTimeout(bindHover, 120);

window.addEventListener('mousedown', e=>
  ring.classList.add('click');
  const r = document.createElement('div');
  r.className = 'ripple';
  r.style.left = e.clientX + 'px';
  r.style.top = e.clientY + 'px';
  document.body.appendChild(r);
  setTimeout(()=>r.remove(),800);
);
window.addEventListener('mouseup', ()=>ring.classList.remove('click'));

const heroGlow = document.getElementById('heroGlow');
const hero = document.querySelector('.hero');
hero.addEventListener('mousemove', e=>
  const rect = hero.getBoundingClientRect();
  heroGlow.style.left = (e.clientX - rect.left) + 'px';
  heroGlow.style.top = (e.clientY - rect.top) + 'px';
  heroGlow.style.opacity = '1';
);
hero.addEventListener('mouseleave', ()=>heroGlow.style.opacity='0');

window.addEventListener('scroll',()=>
  const sc = window.scrollY;
  if(sc < window.innerHeight)
    const hc = document.querySelector('.hero-content');
    hc.style.transform = `translateY($sc * 0.22px)`;
    hc.style.opacity = 1 - sc / (window.innerHeight * 0.9);
  
);

document.querySelectorAll('.tilt').forEach(card=>
  card.addEventListener('mousemove', e=>
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width/2, cy = rect.height/2;
    const rx = (y - cy) / cy * -5;
    const ry = (x - cx) / cx * 5;
    card.style.transform = `translateY(-10px) perspective(1000px) rotateX($rxdeg) rotateY($rydeg)`;
  );
  card.addEventListener('mouseleave', ()=>card.style.transform='');
);

document.querySelectorAll('nav a').forEach(a=>
  a.addEventListener('click', ()=>
    ring.classList.add('hover');
    setTimeout(()=>ring.classList.remove('hover'), 400);
  );
);

/* 0数 据 图  */
const schoolData = [
   year: 1997, value: 51.3, phase: 0 ,
   year: 2000, value: 44.7, phase: 0 ,
   year: 2001, value: 41.62, phase: 1 ,
   year: 2010, value: 21.8, phase: 2 ,
   year: 2012, value: 15.5, phase: 2 ,
   year: 2023, value: 7.06, phase: 3 
];

const yearRange = document.getElementById('yearRange');
const yearNow = document.getElementById('yearNow');
const schoolValue = document.getElementById('schoolValue');
const xLabels = document.getElementById('xLabels');
const linePath = document.getElementById('linePath');
const lineGlow = document.getElementById('lineGlow');
const areaPath = document.getElementById('areaPath');
const pointsGroup = document.getElementById('points');
const focusDot = document.getElementById('focusDot');
const focusRing = document.getElementById('focusRing');
const tooltip = document.getElementById('tooltip');
const valueBadge = document.getElementById('valueBadge');

const chart =  left:74, right:670, top:50, bottom:320, height:270, maxY:55 ;

function xPos(i)
  const step = (chart.right - chart.left) / (schoolData.length - 1);
  return chart.left + i * step;

function yPos(val)
  return chart.bottom - (val / chart.maxY) * chart.height;


function renderChart()
  xLabels.innerHTML = '';
  pointsGroup.innerHTML = '';

  let lineD = '';
  let areaD = '';

  schoolData.forEach((d,i)=>
    const x = xPos(i);
    const y = yPos(d.value);

    lineD += `$i===0?'M':'L' $x $y `;
    if(i===0) areaD = `M $x $chart.bottom L $x $y `;
    else areaD += `L $x $y `;

    const tx = document.createElementNS('http://www.w3.org/2000/svg','text');
    tx.setAttribute('x', x - 18);
    tx.setAttribute('y', 352);
    tx.setAttribute('fill', '#5f6f61');
    tx.setAttribute('font-size', '12');
    tx.setAttribute('font-family', 'Cormorant Garamond, serif');
    tx.textContent = d.year;
    xLabels.appendChild(tx);

    const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('cx', x);
    c.setAttribute('cy', y);
    c.setAttribute('r', 5);
    c.setAttribute('fill', '#214230');
    c.style.cursor = 'pointer';

    c.addEventListener('mouseenter', ()=>showTip(x,y,d));
    c.addEventListener('mouseleave', hideTip);
    c.addEventListener('click', ()=>
      yearRange.value = i;
      updateFocus(i);
    );

    pointsGroup.appendChild(c);
  );

  const lastX = xPos(schoolData.length-1);
  areaD += `L $lastX $chart.bottom Z`;

  linePath.setAttribute('d', lineD.trim());
  lineGlow.setAttribute('d', lineD.trim());
  areaPath.setAttribute('d', areaD.trim());

  const total = linePath.getTotalLength();
  linePath.style.strokeDasharray = total;
  linePath.style.strokeDashoffset = total;
  lineGlow.style.strokeDasharray = total;
  lineGlow.style.strokeDashoffset = total;


function showTip(x,y,d)
  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
  tooltip.innerHTML = `$d.year0年 ： $d.value 万 所 `;
  tooltip.style.opacity = 1;

function hideTip()
  tooltip.style.opacity = 0;


function updateFocus(index)
  const d = schoolData[index];
  const x = xPos(index);
  const y = yPos(d.value);

  focusDot.setAttribute('cx', x);
  focusDot.setAttribute('cy', y);
  focusRing.setAttribute('cx', x);
  focusRing.setAttribute('cy', y);

  yearNow.textContent = d.year;
  schoolValue.textContent = d.value;

  valueBadge.classList.add('flash');
  setTimeout(()=>valueBadge.classList.remove('flash'), 240);

  document.querySelectorAll('.phase-item').forEach(p=>p.classList.remove('active'));
  const targetPhase = document.querySelector(`.phase-item[data-phase="$d.phase"]`);
  if(targetPhase) targetPhase.classList.add('active');


yearRange.addEventListener('input', e=>
  updateFocus(parseInt(e.target.value,10));
);

renderChart();
updateFocus(0);

const chartObserver = new IntersectionObserver((entries)=>
  entries.forEach(entry=>
    if(entry.isIntersecting)
      requestAnimationFrame(()=>
        linePath.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(.2,.7,.2,1)';
        lineGlow.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(.2,.7,.2,1)';
        linePath.style.strokeDashoffset = '0';
        lineGlow.style.strokeDashoffset = '0';

        document.querySelectorAll('.bar i').forEach((bar,i)=>
          setTimeout(()=>bar.style.width = bar.dataset.width + '%', i * 120);
        );
      );
      chartObserver.unobserve(entry.target);
    
  );
,threshold:.3);
chartObserver.observe(document.querySelector('.data-card'));

function animateTextNumber(el, end, suffix = '')
  const start = performance.now();
  const duration = 1400;
  function frame(now)
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = end * ease;
    el.textContent = Number.isInteger(end) ? Math.floor(val) + suffix : val.toFixed(1) + suffix;
    if(p < 1) requestAnimationFrame(frame);
    else el.textContent = (Number.isInteger(end) ? end : end.toFixed(1)) + suffix;
  
  requestAnimationFrame(frame);


const statObserver = new IntersectionObserver((entries)=>
  entries.forEach(entry=>
    if(entry.isIntersecting)
      animateTextNumber(document.getElementById('dropPercent'), 86.2, '%');
      animateTextNumber(document.getElementById('dailyRate'), 63);
      animateTextNumber(document.getElementById('remainValue'), 7.06);
      statObserver.unobserve(entry.target);
    
  );
,threshold:.4);
statObserver.observe(document.querySelector('.stats-grid'));

function makeLeaves(id, count = 12)
  const layer = document.getElementById(id);
  if(!layer) return;
  const colors = ['green','gold','brown'];
  for(let i=0;i<count;i++)
    const leaf = document.createElement('span');
    leaf.className = `leaf $colors[Math.floor(Math.random()*colors.length)]`;
    leaf.style.left = Math.random() * 100 + '%';
    leaf.style.animationDuration = (10 + Math.random()*12) + 's';
    leaf.style.animationDelay = (Math.random()*10) + 's';
    leaf.style.width = (10 + Math.random()*14) + 'px';
    leaf.style.height = (7 + Math.random()*10) + 'px';
    leaf.style.opacity = 0.14 + Math.random()*0.28;
    layer.appendChild(leaf);
  


function makeDust(id, count = 18)
  const layer = document.getElementById(id);
  if(!layer) return;
  for(let i=0;i<count;i++)
    const d = document.createElement('span');
    d.className = 'dust';
    d.style.left = Math.random()*100 + '%';
    d.style.top = (40 + Math.random()*60) + '%';
    const size = 1 + Math.random()*3;
    d.style.width = size + 'px';
    d.style.height = size + 'px';
    d.style.animationDuration = (8 + Math.random()*10) + 's';
    d.style.animationDelay = (Math.random()*8) + 's';
    layer.appendChild(d);
  


['leaf-hero','leaf-shaanxi','leaf-hunan','leaf-scholars','leaf-ending'].forEach(id=>makeLeaves(id,12));
['dust-hero','dust-shaanxi','dust-hunan','dust-scholars','dust-ending'].forEach(id=>makeDust(id,18));
