firebase.initializeApp({apiKey:"AIzaSyBhEY3Igjv0oWcQ3cAQQy6KU8d0StydJdY",authDomain:"vorix-career.firebaseapp.com",projectId:"vorix-career",storageBucket:"vorix-career.firebasestorage.app",messagingSenderId:"601220299726",appId:"1:601220299726:web:21888081707f5d35c9899f"});
const auth=firebase.auth(),db=firebase.firestore(),st=firebase.storage(),$=s=>document.querySelector(s),col=n=>db.collection(n);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safe=u=>/^https?:\/\//i.test(u)?u:'#',opts=a=>a.map(x=>`<option>${x}</option>`).join('');
const V={cats:['Technology','Healthcare','Finance','Education','Engineering','Marketing','Design','Sales'],
types:['Full-time','Part-time','Contract','Internship'],modes:['On-site','Hybrid','Remote'],
jcard:j=>`<a class="card b" href="job.html?id=${esc(j.id)}"><span class="tag">${esc(j.type)}, ${esc(j.mode)}</span><h3>${esc(j.title)}</h3><p>${esc(j.company)}</p><p class="mu">${esc(j.location)}${j.salary?', '+esc(j.salary):''}</p></a>`,
async all(n,l=100){const s=await col(n).orderBy('created','desc').limit(l).get();return s.docs.map(d=>({id:d.id,...d.data()}))},
init(o,cb){auth.onAuthStateChanged(async u=>{let me={};
if(u){try{me=(await col('users').doc(u.uid).get()).data()||{}}catch(e){}}
if(o.auth&&!u)return location.href='login.html?next='+encodeURIComponent(location.pathname.split('/').pop()+location.search);
if(o.roles&&!o.roles.includes(me.role)){alert('You do not have access to this page.');return location.href='index.html'}
const r=me.role;
$('#h').innerHTML=`<div class="wrap"><a class="logo" href="index.html">Vorix Careers</a><nav><a href="jobs.html">Jobs</a>${r=='seeker'?'<a href="applications.html">My applications</a><a href="profile.html">My profile</a>':''}${r=='employer'?'<a href="employer.html">Employer</a>':''}${r=='admin'?'<a href="admin.html">Admin</a>':''}${u?'<a href="#" id="lo">Log out</a>':'<a class="btn" href="login.html">Log in</a>'}</nav></div>`;
$('#f').innerHTML=`<div class="wrap">© ${new Date().getFullYear()} Vorix Careers. All rights reserved.</div>`;
if(u)$('#lo').onclick=e=>{e.preventDefault();auth.signOut().then(()=>location.href='index.html')};
cb&&cb(u,me)})}};
