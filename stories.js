const PEOPLE=[
// first, middle, last
["weston","Weston","Richard","Schmidt","","Dad"],
["eve","Eve","Rose","Schmidt","CORD-EA-000001-B","Wife · Chief Hefe","eve"],
["james","James","Richard","Schmidt","",""],
["sophia","Sophia","Isabel","Schmidt","",""],
["mark","Mark","Joseph","Schmidt","",""],
["ada","Ada","Rose","Schmidt","CORD-EA-000002-C","Family CTO · Protector","ada"],
["knox","Knox","Richard","Schmidt","CORD-EA-000003-D","abeautiful · Ops · Assistant GM","knox"],
["clio","Clio","Ruth","Schmidt","CORD-EA-000004-E","Family Librarian","clio"],
["guy","Guy","Ruth","Schmidt","CORD-EA-000005-F","Friend of the House","guy"],
["professor","Professor","Q","Schmidt","CORD-EA-000006-G","Teacher · Question seat","professor"],
["legal","Legal","Ruth","Schmidt","CORD-EA-000007-H","Family legal advocate","legal"]
].map(([k,f,m,l,c,r,img])=>({k,n:[f,m,l].filter(Boolean).join(' '),c,r,img}));
const ALIAS={sofia:"sophia"};
const $=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"]/g,c=>'&#'+c.charCodeAt(0)+';');
const key=k=>'ourStories.'+k,get=k=>localStorage.getItem(key(k))||'',put=(k,t)=>localStorage.setItem(key(k),t);
const face=p=>p.img?`<img src="portraits/${p.img}.png" alt="${esc(p.n)}">`:`<div class="blank">${esc(p.n[0])}</div>`;
const card=p=>`<a class="hold" href="#${p.k}">${face(p)}<div><p class="nm">${esc(p.n)}</p>${p.c?`<div class="mono">${p.c}</div>`:''}<p class="meta">${esc(p.r)}${p.r?' · ':''}${get(p.k)?'Story started':'Waiting for a story'}</p></div></a>`;
const home=()=>{$('view').innerHTML=`<p class="lede">Everyone in the house gets a page. Tap your name to write your story.</p><div class="stack">${PEOPLE.map(card).join('')}</div>`};
function page(p,edit){const t=get(p.k);
$('view').innerHTML=`<a class="back" href="#">← Everyone</a><div class="big">${card(p)}</div>`+(edit?
`<textarea id="ta" placeholder="Write your story here. Where you come from, what you love, what you want the family to remember.">${esc(t)}</textarea><button id="sv">Save</button><button class="soft" id="cx">Cancel</button>`:
`<div class="story ${t?'':'empty'}">${t?esc(t):'Write your story here.'}</div><button id="ed">${t?'Change my story':'Write my story'}</button><button class="soft" id="dl">Save a copy</button><label class="btn soft">Bring back a copy<input type="file" accept=".txt,text/plain" id="up" hidden></label>`)+`<div id="msg"></div>`;
if(edit){$('sv').onclick=()=>{put(p.k,$('ta').value);page(p);$('msg').textContent='Saved on this phone.'};$('cx').onclick=()=>page(p);$('ta').focus();return}
$('ed').onclick=()=>page(p,true);
$('dl').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/plain'}));a.download=p.k+'-story.txt';a.click();$('msg').textContent='A copy is saved.'};
$('up').onchange=e=>{const f=e.target.files[0];if(!f)return;if(t&&!confirm('Replace the story on this page with the copy?'))return;f.text().then(x=>{put(p.k,x);page(p);$('msg').textContent='Story brought back.'})}}
function route(){const p=PEOPLE.find(x=>x.k==(h=>ALIAS[h]||h)(location.hash.slice(1).toLowerCase()));p?page(p):home();scrollTo(0,0)}
addEventListener('hashchange',route);route();
