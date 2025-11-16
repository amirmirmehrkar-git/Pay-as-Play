<!-- ===== Base Styles (Light + RTL/LTR + Animations) ===== -->
<style>
:root{
  --grad:linear-gradient(135deg,#7c8cf8,#2de1c2);
  --bg:#ffffff; --card:#f8f9fb; --border:#e7e9ef;
  --text:#1e233a; --muted:#667089; --radius:14px; --max:1100px;
}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui,"Segoe UI",Roboto,Helvetica,Arial;line-height:1.7}
.container{max-width:var(--max);margin:auto;padding:48px 20px}
.section{padding:56px 0;border-bottom:1px solid var(--border)}
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:24px}
h1{font-size:clamp(28px,4vw,40px);margin:0 0 10px}
h2{font-size:clamp(22px,3vw,30px);margin:0 0 10px;color:#3e4386}
p,li{color:var(--muted)}
.btn{display:inline-flex;align-items:center;justify-content:center;padding:12px 18px;border-radius:12px;background:var(--grad);color:#fff;text-decoration:none;font-weight:700}
.btn.ghost{background:#fff;border:1px solid var(--border);color:var(--text)}
.row{display:grid;gap:24px}
@media(min-width:900px){.row-2{grid-template-columns:1.1fr .9fr}}
ul{margin:12px 0 0}
.badge{display:inline-block;padding:4px 10px;border-radius:999px;background:var(--card);border:1px solid var(--border);font-size:12px;color:var(--muted)}
/* Language visibility */
.lang{display:none}
.lang.is-active{display:block}
/* Animations (mobile-first) */
.reveal{opacity:0;transform:translateY(14px);transition:opacity .6s ease, transform .6s ease}
.reveal.is-in{opacity:1;transform:translateY(0)}
/* Center CTAs on mobile */
.cta{display:flex;gap:10px;flex-wrap:wrap}
@media(max-width:768px){.cta{justify-content:center}}
/* Direction helpers */
[dir="rtl"] .dir-note{display:none}
[dir="ltr"] .dir-note-fa{display:none}
</style>

<!-- ===== Language Switcher + Reveal JS (include once, before </body>) ===== -->
<script>
(function(){
  // Global language state
  window.__pp_lang = 'fa'; // default - change to 'en' or 'de' for different default

  function setLang(l){
    __pp_lang = l;
    document.documentElement.lang = l;
    document.documentElement.dir = (l==='fa'?'rtl':'ltr');
    document.querySelectorAll('[data-lang]').forEach(el=>{
      el.querySelectorAll('.lang').forEach(n=>n.classList.remove('is-active'));
      const target = el.querySelector('.lang[data-i18n="'+l+'"]');
      if(target) target.classList.add('is-active');
    });
    document.querySelectorAll('[data-lang-switch]').forEach(btn=>{
      btn.classList.toggle('active', btn.dataset.langSwitch===l);
    });
  }

  window.__pp_setLang = setLang;

  // click handlers for any language switcher buttons in page
  document.addEventListener('click', (e)=>{
    const b = e.target.closest('[data-lang-switch]');
    if(!b) return;
    e.preventDefault();
    setLang(b.dataset.langSwitch);
  });

  // Reveal on view
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){ en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  },{threshold:.12});

  document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
    setLang(__pp_lang);
  });
})();
</script>

