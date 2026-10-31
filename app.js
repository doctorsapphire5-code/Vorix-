firebase.initializeApp({apiKey:"AIzaSyDT8ptPBHO0n6nDAs10ut9mJ25AbDyYehw",authDomain:"vorix-business.firebaseapp.com",projectId:"vorix-business",storageBucket:"vorix-business.firebasestorage.app",messagingSenderId:"410333933991",appId:"1:410333933991:web:64fc53a7db1dd2d49ec682",measurementId:"G-B2KWQQ1TSY"});
const auth=firebase.auth(),db=firebase.firestore(),$=s=>document.querySelector(s),col=n=>db.collection(n);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safe=u=>/^https?:\/\//i.test(u)?u:'#',opts=a=>a.map(x=>`<option>${x}</option>`).join('');
const V={cats:['Web and Software','Design','Writing','Marketing','Video and Audio','Business','Data and AI'],
prj:p=>`<a class="card b" href="project.html?id=${esc(p.id)}"><span class="tag">${esc(p.category)}, ${esc(p.budgetType)}</span><h3>${esc(p.title)}</h3><p>${esc(p.businessName)}</p><p class="mu">Budget $${esc(p.budget)}${p.deadline?', '+esc(p.deadline):''}</p></a>`,
fcard:f=>`<a class="card b" href="profile.html?id=${esc(f.id)}"><span class="tag">${f.verified?'Verified freelancer':'Freelancer'}</span><h3>${esc(f.name)}</h3><p>${esc(f.title||'')}</p><p class="mu">${f.rate?'$'+esc(f.rate)+'/hour, ':''}${esc(f.skills||'')}</p></a>`,
async all(n,l=100){const s=await col(n).orderBy('created','desc').limit(l).get();return s.docs.map(d=>({id:d.id,...d.data()}))},
init(o,cb){auth.onAuthStateChanged(async u=>{let me={};
if(u){try{me=(await col('users').doc(u.uid).get()).data()||{}}catch(e){}}
if(o.auth&&!u)return location.href='login.html?next='+encodeURIComponent(location.pathname.split('/').pop()+location.search);
if(o.roles&&!o.roles.includes(me.role)){alert('You do not have access to this page.');return location.href='index.html'}
const r=me.role;
$('#h').innerHTML=`<div class="wrap"><a class="logo" href="index.html">Vorix Work</a><nav><a href="projects.html">Projects</a><a href="freelancers.html">Freelancers</a>${r=='freelancer'?'<a href="studio.html">My work</a>':''}${r=='client'?'<a href="client.html">Dashboard</a>':''}${r=='admin'?'<a href="admin.html">Admin</a>':''}${u?'<a href="#" id="lo">Log out</a>':'<a class="btn" href="login.html">Log in</a>'}</nav></div>`;
$('#f').innerHTML=`<div class="wrap">© ${new Date().getFullYear()} Vorix Work. All rights reserved.</div>`;
if(u)$('#lo').onclick=e=>{e.preventDefault();auth.signOut().then(()=>location.href='index.html')};
cb&&cb(u,me)})}};
