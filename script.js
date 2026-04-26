const voices = [
 {name:"尹佳绮", role:"湖南云山学校 · 00后校长", preview:"毕竟是我毕业之后第一个学校、第一批学生……", quote:["毕竟是我毕业之后第一个学校、第一批学生、第一个环境。","希望我们未来都会越来越好，我会永远记得我是从这里出发的。"]},
 {name:"张娜", role:"陕西策村小学 · 16年教龄教师", preview:"撤不撤我也没有办法……", quote:["撤不撤我也没有办法。","所有学习都要靠我们去抓，没有别的环境可以依靠。"]},
 {name:"曾良平", role:"湖南云山学校 · 41年教龄老教师", preview:"我最放心不下的，是那些没钱没势的穷孩子……", quote:["我最放心不下的，是那些没钱没势的穷孩子。","形式主义表格太多，把教书的时间都占了。"]},
 {name:"黄老师", role:"广西恭城瑶族自治县 · 双科教师", preview:"山里面不会听我们外地人的……", quote:["山里面不会听我们外地人的。","撤校的事情我们在学校都是避而不谈的。"]},
 {name:"王志超", role:"衡水建国镇中心校主任", preview:"撤不撤都会有困难……", quote:["撤不撤都会有困难。","学生比较少的成绩却很好，这是不是和小班有关系。"]},
 {name:"赵小旺", role:"兴平市教育局基教科科长", preview:"教育永远围绕以学生为中心……", quote:["教育永远围绕以学生为中心，服务辖区人民群众。","未来村小撤并的趋势必然是教育资源全面整合升级。"]},
 {name:"曾皓轩", role:"湖南云山学校 · 学生", preview:"因为我讨厌妈妈……", quote:["因为我讨厌妈妈。","我不想爷爷给我送饭了，不然他会快一点变老的。"]},
 {name:"华芝涵", role:"扬州市渌洋湖中心小学 · 学生", preview:"老师有时候会拿教棍打手……", quote:["老师有时候会拿教棍打手，或者打几下头，在学业方面比较负责，但是育人方面不太行。","在农村读的小学让我看不到希望。"]}
];

const grid = document.getElementById('voicesGrid');
voices.forEach((v,i)=>{
 const card = document.createElement('div');
 card.className = 'voice-card reveal';
 card.style.transitionDelay = (i % 4 * 0.08) + 's';
 card.innerHTML = `
 <div class="v-name">${v.name}</div>
 <div class="v-role">${v.role}</div>
 <div class="v-preview">"${v.preview}"</div>
 <div class="v-expand">${v.quote.map(q=>`<p>"${q}"</p>`).join('')}</div>
 <div class="v-toggle"><span class="icon">+</span><span class="txt">展开完整语录</span></div>
 `;
 card.addEventListener('click',(e)=>{
 e.stopPropagation();
 card.classList.toggle('expanded');
 const txt = card.querySelector('.v-toggle .txt');
 txt.textContent = card.classList.contains('expanded') ? '收起' : '展开完整语录';
 });
 grid.appendChild(card);
});

const observer = new IntersectionObserver((entries)=>{
 entries.forEach(entry=>{
 if(entry.isIntersecting){
 entry.target.classList.add('visible');

 if(entry.target.classList.contains('stat-row')){
 entry.target.querySelectorAll('.stat-num').forEach(el=>animateCount(el));
 }
 }
 });
},{threshold:.12});

document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale,.reveal-blur').forEach(el=>observer.observe(el));

function animateCount(el){
 if(el.dataset.done) return;
 el.dataset.done = 1;
 const target = +el.dataset.count;
 const dur = 1400;
 const start = performance.now();
 function step(t){
 const p = Math.min(1,(t-start)/dur);
 const eased = 1 - Math.pow(1-p,3);
 el.textContent = Math.round(target*eased);
 if(p<1) requestAnimationFrame(step);
 }
 requestAnimationFrame(step);
}

window.addEventListener('scroll',()=>{
 const h = document.documentElement;
 const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
 document.getElementById('progress').style.width = scrolled + '%';

 const nav = document.querySelector('nav');
 if(window.scrollY > 50){
 nav.style.background = 'rgba(244,245,238,0.93)';
 nav.style.boxShadow = '0 4px 20px rgba(61,107,74,0.08)';
 }else{
 nav.style.background = 'rgba(244,245,238,0.80)';
 nav.style.boxShadow = 'none';
 }

 document.querySelectorAll('.big-chapter').forEach(el=>{
 const rect = el.getBoundingClientRect();
 const offset = (window.innerHeight / 2 - rect.top) * 0.08;
 el.style.transform = `translateY(calc(-50% + ${offset}px))`;
 });
});

const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

window.addEventListener('mousemove', e=>{
 mouseX = e.clientX;
 mouseY = e.clientY;
 dot.style.left = mouseX + 'px';
 dot.style.top = mouseY + 'px';
});

function loop(){
 ringX += (mouseX - ringX) * 0.18;
 ringY += (mouseY - ringY) * 0.18;
 ring.style.left = ringX + 'px';
 ring.style.top = ringY + 'px';
 requestAnimationFrame(loop);
}
loop();

function bindHover(){
 document.querySelectorAll('a,.voice-card,.school-card,.stat-item,.scholar,.kid-card,button,.data-card,.phase-item').forEach(el=>{
 el.addEventListener('mouseenter', ()=>ring.classList.add('hover'));
 el.addEventListener('mouseleave', ()=>ring.classList.remove('hover'));
 });
}
bindHover();
setTimeout(bindHover, 120);

window.addEventListener('mousedown', e=>{
 ring.classList.add('click');
 const r = document.createElement('div');
 r.className = 'ripple';
 r.style.left = e.clientX + 'px';
 r.style.top = e.clientY + 'px';
 document.body.appendChild(r);
 setTimeout(()=>r.remove(),800);
});
window.addEventListener('mouseup', ()=>ring.classList.remove('click'));

const heroGlow = document.getElementById('heroGlow');
const hero = document.querySelector('.hero');
hero.addEventListener('mousemove', e=>{
 const rect = hero.getBoundingClientRect();
 heroGlow.style.left = (e.clientX - rect.left) + 'px';
 heroGlow.style.top = (e.clientY - rect.top) + 'px';
 heroGlow.style.opacity = '1';
});
hero.addEventListener('mouseleave', ()=>heroGlow.style.opacity='0');

window.addEventListener('scroll',()=>{
 const sc = window.scrollY;
 if(sc < window.innerHeight){
 const hc = document.querySelector('.hero-content');
 hc.style.transform = `translateY(${sc * 0.22}px)`;
 hc.style.opacity = 1 - sc / (window.innerHeight * 0.9);
 }
});

document.querySelectorAll('.tilt').forEach(card=>{
 card.addEventListener('mousemove', e=>{
 const rect = card.getBoundingClientRect();
 const x = e.clientX - rect.left;
 const y = e.clientY - rect.top;
 const cx = rect.width/2, cy = rect.height/2;
 const rx = (y - cy) / cy * -5;
 const ry = (x - cx) / cx * 5;
 card.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
 });
 card.addEventListener('mouseleave', ()=>card.style.transform='');
});

document.querySelectorAll('nav a').forEach(a=>{
 a.addEventListener('click', ()=>{
 ring.classList.add('hover');
 setTimeout(()=>ring.classList.remove('hover'), 400);
 });
});

/* 数据图 */
const schoolData = [
 { year: 1997, value: 51.3, phase: 0 },
 { year: 2000, value: 44.7, phase: 0 },
 { year: 2001, value: 41.62, phase: 1 },
 { year: 2010, value: 21.8, phase: 2 },
 { year: 2012, value: 15.5, phase: 2 },
 { year: 2023, value: 7.06, phase: 3 }
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

const chart = { left:74, right:670, top:50, bottom:320, height:270, maxY:55 };

function xPos(i){
 const step = (chart.right - chart.left) / (schoolData.length - 1);
 return chart.left + i * step;
}
function yPos(val){
 return chart.bottom - (val / chart.maxY) * chart.height;
}

function renderChart(){
 xLabels.innerHTML = '';
 pointsGroup.innerHTML = '';

 let lineD = '';
 let areaD = '';

 schoolData.forEach((d,i)=>{
 const x = xPos(i);
 const y = yPos(d.value);

 lineD += `${i===0?'M':'L'} ${x} ${y} `;
 if(i===0) areaD = `M ${x} ${chart.bottom} L ${x} ${y} `;
 else areaD += `L ${x} ${y} `;

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
 c.addEventListener('click', ()=>{
 yearRange.value = i;
 updateFocus(i);
 });

 pointsGroup.appendChild(c);
 });

 const lastX = xPos(schoolData.length-1);
 areaD += `L ${lastX} ${chart.bottom} Z`;

 linePath.setAttribute('d', lineD.trim());
 lineGlow.setAttribute('d', lineD.trim());
 areaPath.setAttribute('d', areaD.trim());

 const total = linePath.getTotalLength();
 linePath.style.strokeDasharray = total;
 linePath.style.strokeDashoffset = total;
 lineGlow.style.strokeDasharray = total;
 lineGlow.style.strokeDashoffset = total;
}

function showTip(x,y,d){
 tooltip.style.left = x + 'px';
 tooltip.style.top = y + 'px';
 tooltip.innerHTML = `${d.year}年：${d.value} 万所`;
 tooltip.style.opacity = 1;
}
function hideTip(){
 tooltip.style.opacity = 0;
}

function updateFocus(index){
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
 const targetPhase = document.querySelector(`.phase-item[data-phase="${d.phase}"]`);
 if(targetPhase) targetPhase.classList.add('active');
}

yearRange.addEventListener('input', e=>{
 updateFocus(parseInt(e.target.value,10));
});

renderChart();
updateFocus(0);

const chartObserver = new IntersectionObserver((entries)=>{
 entries.forEach(entry=>{
 if(entry.isIntersecting){
 requestAnimationFrame(()=>{
 linePath.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(.2,.7,.2,1)';
 lineGlow.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(.2,.7,.2,1)';
 linePath.style.strokeDashoffset = '0';
 lineGlow.style.strokeDashoffset = '0';

 document.querySelectorAll('.bar i').forEach((bar,i)=>{
 setTimeout(()=>bar.style.width = bar.dataset.width + '%', i * 120);
 });
 });
 chartObserver.unobserve(entry.target);
 }
 });
},{threshold:.3});
chartObserver.observe(document.querySelector('.data-card'));

function animateTextNumber(el, end, suffix = ''){
 const start = performance.now();
 const duration = 1400;
 function frame(now){
 const p = Math.min((now - start) / duration, 1);
 const ease = 1 - Math.pow(1 - p, 3);
 const val = end * ease;
 el.textContent = Number.isInteger(end) ? Math.floor(val) + suffix : val.toFixed(1) + suffix;
 if(p < 1) requestAnimationFrame(frame);
 else el.textContent = (Number.isInteger(end) ? end : end.toFixed(1)) + suffix;
 }
 requestAnimationFrame(frame);
}

const statObserver = new IntersectionObserver((entries)=>{
 entries.forEach(entry=>{
 if(entry.isIntersecting){
 animateTextNumber(document.getElementById('dropPercent'), 86.2, '%');
 animateTextNumber(document.getElementById('dailyRate'), 63);
 animateTextNumber(document.getElementById('remainValue'), 7.06);
 statObserver.unobserve(entry.target);
 }
 });
},{threshold:.4});
statObserver.observe(document.querySelector('.stats-grid'));

function makeLeaves(id, count = 12){
 const layer = document.getElementById(id);
 if(!layer) return;
 const colors = ['green','gold','brown'];
 for(let i=0;i<count;i++){
 const leaf = document.createElement('span');
 leaf.className = `leaf ${colors[Math.floor(Math.random()*colors.length)]}`;
 leaf.style.left = Math.random() * 100 + '%';
 leaf.style.animationDuration = (10 + Math.random()*12) + 's';
 leaf.style.animationDelay = (Math.random()*10) + 's';
 leaf.style.width = (10 + Math.random()*14) + 'px';
 leaf.style.height = (7 + Math.random()*10) + 'px';
 leaf.style.opacity = 0.14 + Math.random()*0.28;
 layer.appendChild(leaf);
 }
}

function makeDust(id, count = 18){
 const layer = document.getElementById(id);
 if(!layer) return;
 for(let i=0;i<count;i++){
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
 }
}

['leaf-hero','leaf-shaanxi','leaf-hunan','leaf-scholars','leaf-ending'].forEach(id=>makeLeaves(id,12));
['dust-hero','dust-shaanxi','dust-hunan','dust-scholars','dust-ending'].forEach(id=>makeDust(id,18));
