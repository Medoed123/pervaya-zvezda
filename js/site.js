// общий скрипт сайта «Первая Звезда»
const hdr=document.getElementById('hdr');
if(hdr) addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>40));
const burger=document.getElementById('burger'), menu=document.getElementById('menu');
if(burger&&menu){
  burger.onclick=()=>menu.classList.toggle('open');
  menu.querySelectorAll('a').forEach(a=>a.onclick=()=>menu.classList.remove('open'));
}
// приём заявок (бот @pervayazvezda_bot). На проде заменить на https://домен/lead
const LEAD_ENDPOINT='http://localhost:8097/lead';
async function sendLead(e){
  e.preventDefault();
  const f=e.target;
  const data={name:f.name.value,phone:f.phone.value,email:f.email?f.email.value:'',product:f.product?f.product.value:'',msg:f.msg?f.msg.value:'',website:f.website?f.website.value:'',source:'сайт '+location.pathname};
  const btn=f.querySelector('button[type=submit]');
  const old=btn.textContent; btn.textContent='Отправляем…'; btn.disabled=true;
  try{
    const r=await fetch(LEAD_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    if(!r.ok) throw 0;
    await r.json();
    btn.textContent='Заявка отправлена'; btn.style.background='#2e7d32'; btn.style.color='#fff';
    f.reset();
    setTimeout(()=>{btn.textContent=old;btn.style.background='';btn.style.color='';btn.disabled=false;},4000);
  }catch(err){
    const t=`Заявка с сайта Первая Звезда%0AИмя: ${encodeURIComponent(data.name)}%0AТел: ${encodeURIComponent(data.phone)}%0AПродукт: ${encodeURIComponent(data.product)}%0AЗадача: ${encodeURIComponent(data.msg)}`;
    window.open('https://wa.me/79502922999?text='+t,'_blank');
    btn.textContent=old; btn.disabled=false;
  }
  return false;
}
