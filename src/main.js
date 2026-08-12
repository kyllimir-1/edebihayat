import './styles.css';

const ADMIN_PASSWORD = 'admin123';
const savedState = JSON.parse(localStorage.getItem('edebiatlas-content') || 'null');
let state = savedState || {
  admin: false,
  active: 'ana-sayfa',
  topics: [
    ['ana-sayfa', '🏡', 'Ana Sayfa'], ['edebiyat', '📚', 'Edebiyat'], ['siir', '✒️', 'Şiir'],
    ['tiyatro', '🎭', 'Tiyatro'], ['deneme', '🪶', 'Deneme'], ['roman', '📖', 'Roman'],
  ],
  posts: [
    { id: 1, topic: 'edebiyat', title: 'Servetifünun Edebiyatı’nın Genel Özellikleri', date: '12 Ağustos 2026', image: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=1100&q=80', body: 'Servetifünun dönemi; sanat kaygısı, güçlü tasvirler, bireysel temalar ve titiz dil işçiliğiyle öne çıkar. Bu başlıkta dönemin temsilcileri, türleri ve metin anlayışı özetlenir.', comments: [{ name: 'Elif Yılmaz', text: 'Konu çok düzenli anlatılmış, özellikle dönem özellikleri faydalı oldu.' }] },
    { id: 2, topic: 'siir', title: 'Şiirde İmge ve Ahenk', date: '10 Ağustos 2026', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1100&q=80', body: 'Şiirde ahenk; ölçü, uyak, ses tekrarları ve kelime seçimiyle kurulur. İmge ise okurun zihninde yeni ve güçlü anlam alanları açar.', comments: [] },
  ]
};
state.admin = false;
const persist = () => localStorage.setItem('edebiatlas-content', JSON.stringify({ ...state, admin: false }));

const $ = (s) => document.querySelector(s);
const character = () => `<div class="character" aria-label="Kitap okuyan piksel karakter"><div class="hair h1"></div><div class="hair h2"></div><div class="face"><span></span><span></span></div><div class="body"></div><div class="book"><i></i></div><div class="desk"><b></b><em></em></div><div class="cup"></div><div class="apple"></div></div>`;
const icon = (name) => ({lock:'🔒',out:'↪',plus:'+',cal:'📅',msg:'💬',send:'➤'}[name]);
function render(){
 const activeName = state.topics.find(t=>t[0]===state.active)?.[2] || 'Ana Sayfa';
 const posts = state.active === 'ana-sayfa' ? state.posts : state.posts.filter(p=>p.topic===state.active);
 document.querySelector('#app').innerHTML = `<div class="shell"><aside class="sidebar"><div class="brand">${character()}<div><h1>edebiatlas.com</h1><p>Edebiyat • Kültür • Paylaşım</p></div></div><div class="topic-head"><span>Konu Başlıkları</span><button id="quickAdd" ${state.admin?'':'disabled'} title="Yeni konu ekle">${icon('plus')}</button></div>${state.admin?`<div class="topic-add"><input id="topicName" placeholder="Yeni konu başlığı"><button id="addTopic">Ekle</button></div>`:''}<nav>${state.topics.map(t=>`<button data-topic="${t[0]}" class="${state.active===t[0]?'active':''}"><span>${t[1]}</span>${t[2]}<b>›</b></button>`).join('')}</nav><div class="admin-card"><b>🛡️</b><div><strong>Admin paneli</strong><small>${state.admin?'Gönderi ve başlık ekleme açık':'Sadece admin içerik ekler'}</small></div></div></aside><main><header><button class="menu">☰</button><div class="search">🔎<input placeholder="Konu, yazar veya gönderi ara..."></div><button class="login" id="loginBtn">${state.admin?icon('out'):icon('lock')} ${state.admin?'Çıkış':'Admin'}</button></header><section class="hero"><div><p class="kicker">✨ Profesyonel edebiyat platformu</p><h2>${activeName}</h2><p>Modern, sade ve akademik bir paylaşım alanı. Üyelik yok; ziyaretçiler gönderileri okuyup ad-soyad ile yorum bırakabilir.</p></div>${character()}</section><div id="loginArea"></div>${state.admin&&state.active!=='ana-sayfa'?`<form class="post-form" id="postForm"><h3>✍️ Yeni gönderi ekle</h3><input name="title" placeholder="Gönderi başlığı" required><input name="image" placeholder="Kapak görsel URL (opsiyonel)"><textarea name="body" placeholder="Gönderi içeriği" required></textarea><button>Gönderiyi Yayınla</button></form>`:''}<div class="layout"><section class="feed">${posts.map(postCard).join('') || '<div class="empty">Bu konuda henüz gönderi yok.</div>'}</section><aside class="right"><h3>Topluluk</h3><p>Okurlar üye olmadan yorum yapabilir. İçerik yönetimi yalnızca admin girişinden sonra görünür.</p><div class="big">📖</div><h3>Günün Notu</h3><p>“Edebiyat, insanın kendine tuttuğu zarif aynadır.”</p></aside></div></main></div>`;
 bind();
}
function postCard(p){return `<article class="post"><img src="${p.image}" alt="Gönderi kapağı"><div class="post-body"><div class="meta">${icon('cal')} ${p.date}</div><h2>${p.title}</h2><p class="excerpt">${p.body.slice(0,120)}...</p><p>${p.body}</p><div class="tags"><span>Profesyonel</span><span>Edebiyat</span><span>Notlar</span></div><div class="comments"><h4>${icon('msg')} Yorumlar (${p.comments.length})</h4>${p.comments.map(c=>`<div class="comment"><b>👤 ${c.name}</b><p>${c.text}</p></div>`).join('')}<div class="comment-form"><input id="n${p.id}" placeholder="İsim Soyisim"><textarea id="t${p.id}" placeholder="Yorumunuzu yazın"></textarea><button data-comment="${p.id}">${icon('send')} Yorum Yap</button></div></div></div></article>`}
function bind(){
 document.querySelectorAll('[data-topic]').forEach(b=>b.onclick=()=>{state.active=b.dataset.topic;render()});
 $('#loginBtn').onclick=()=> state.admin ? (state.admin=false,render()) : ($('#loginArea').innerHTML=`<form class="login-panel" id="loginForm">🔒<input type="password" name="pass" placeholder="Admin şifresi: admin123"><button>Giriş Yap</button></form>`, $('#loginForm').onsubmit=e=>{e.preventDefault(); if(e.target.pass.value===ADMIN_PASSWORD){state.admin=true;render()}else alert('Şifre hatalı')});
 const add = ()=>{const input=$('#topicName'); if(!input||!input.value.trim())return; const id=input.value.toLocaleLowerCase('tr-TR').replace(/[^a-z0-9ğüşöçıİĞÜŞÖÇ]+/gi,'-')+'-'+Date.now(); state.topics.push([id,'📝',input.value.trim()]); state.active=id; persist(); render();};
 if($('#addTopic')) $('#addTopic').onclick=add; if($('#quickAdd')) $('#quickAdd').onclick=add;
 if($('#postForm')) $('#postForm').onsubmit=e=>{e.preventDefault(); const f=e.target; state.posts.unshift({id:Date.now(),topic:state.active,title:f.title.value,date:new Date().toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'}),image:f.image.value||'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1100&q=80',body:f.body.value,comments:[]}); persist(); render();};
 document.querySelectorAll('[data-comment]').forEach(b=>b.onclick=()=>{const id=Number(b.dataset.comment), n=$('#n'+id).value.trim(), t=$('#t'+id).value.trim(); if(!n||!t)return; state.posts=state.posts.map(p=>p.id===id?{...p,comments:[...p.comments,{name:n,text:t}]}:p); persist(); render();});
}
render();
