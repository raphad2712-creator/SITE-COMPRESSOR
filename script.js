const menu=document.querySelector('.menu'),nav=document.querySelector('nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');nav.classList.toggle('open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');nav.classList.remove('open')}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){menu.click();menu.focus()}});
document.querySelectorAll('[data-service]').forEach(a=>a.addEventListener('click',()=>{document.getElementById('servico').value=a.dataset.service;if(a.dataset.product){document.getElementById('mensagem').value='Gostaria de consultar: '+a.dataset.product+'.'}}));
const solutions=[{label:'EQUIPAMENTOS',title:'O compressor certo faz a diferença.',description:'Cada aplicação tem uma demanda. Consulte opções de compressores e receba orientação considerando a pressão, a vazão e a rotina de uso da sua empresa.',cta:'Consultar equipamentos',service:'Compressores e equipamentos',type:'SELEÇÃO DO EQUIPAMENTO',rows:['Aplicação e rotina de trabalho','Pressão e vazão necessárias','Estrutura de instalação']},{label:'COMPONENTES E INSUMOS',title:'O cuidado também está nos detalhes.',description:'Peças e lubrificantes fazem parte da rotina de manutenção. Informe a marca e o modelo do equipamento para consultar itens compatíveis e disponibilidade.',cta:'Consultar peças',service:'Peças e lubrificantes',type:'PARA UMA CONSULTA MAIS PRECISA',rows:['Marca e modelo do compressor','Código ou referência do componente','Quantidade e necessidade de uso']},{label:'SISTEMAS DE AR COMPRIMIDO',title:'Conecte o ar à sua operação.',description:'Projetos de redes de ar comprimido e montagem de mangueiras hidráulicas de baixa e alta pressão. Converse com a equipe sobre o seu projeto.',cta:'Conversar sobre meu projeto',service:'Redes de ar e mangueiras',type:'ENTENDENDO O SEU PROJETO',rows:['Pontos de uso e aplicação','Pressão e demanda da operação','Estrutura e local de instalação']}];
const tabs=[...document.querySelectorAll('[role=tab]')];
function selectTab(index){tabs.forEach((t,i)=>{t.setAttribute('aria-selected',String(i===index));t.tabIndex=i===index?0:-1});const s=solutions[index];document.getElementById('solution-panel').setAttribute('aria-labelledby',tabs[index].id);['label','title','description'].forEach(k=>document.getElementById('solution-'+k).textContent=s[k]);const a=document.getElementById('solution-cta');a.replaceChildren(document.createTextNode(s.cta+' '));const arrow=document.createElement('span');arrow.textContent='→';a.append(arrow);a.dataset.service=s.service;a.href='https://wa.me/5511948455597?text='+encodeURIComponent('Olá, equipe Comptec! Gostaria de informações sobre '+s.service.toLowerCase()+'.');document.getElementById('technical-type').textContent=s.type;const rows=document.getElementById('technical-rows');rows.replaceChildren();s.rows.forEach((row,i)=>{const p=document.createElement('p'),n=document.createElement('span');n.textContent='0'+(i+1);p.append(n,document.createTextNode(' '+row));rows.append(p)});document.getElementById('solution-panel').dispatchEvent(new Event('solutionchange'))}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectTab(i));tab.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!==undefined){e.preventDefault();selectTab(n);tabs[n].focus()}})});
document.getElementById('quote-form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const text=`Olá, equipe Comptec! Gostaria de solicitar um orçamento.\n\nNome: ${f.get('nome').trim()}\nEmpresa: ${f.get('empresa').trim()||'Não informada'}\nCidade: ${f.get('cidade').trim()}\nSolução: ${f.get('servico')}\n\n${f.get('mensagem').trim()}`;window.open('https://wa.me/5511948455597?text='+encodeURIComponent(text),'_blank','noopener,noreferrer')});
document.getElementById('year').textContent=new Date().getFullYear();

(() => {
  const systemPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const running = new Set();

  function syncMotion() {
    document.documentElement.dataset.motion = systemPreference.matches ? 'off' : 'on';
    if (systemPreference.matches) running.forEach(animation => animation.cancel());
  }
  function animate(element, frames, options) {
    if (systemPreference.matches || typeof element.animate !== 'function') return;
    const animation = element.animate(frames, options);
    running.add(animation);
    animation.finished.then(() => running.delete(animation), () => running.delete(animation));
  }
  syncMotion();
  systemPreference.addEventListener('change', syncMotion);

  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const index = Array.from(entry.target.parentElement.children).indexOf(entry.target) % 4;
        animate(entry.target, [
          { opacity: 0, transform: 'translateY(24px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 650, delay: index * 55, fill: 'backwards', easing: 'cubic-bezier(.2,.7,.2,1)' });
        reveal.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.section-heading,.benefit-grid>div,.service,.about-grid>div,.lubricant-layout>div,.product-card,.complementary-services>div,.steps>div,.faq-grid>div,.contact-grid>div,#quote-form').forEach(element => reveal.observe(element));
    const header = document.querySelector('header');
    const headerObserver = new IntersectionObserver(entries => {
      header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    });
    headerObserver.observe(document.querySelector('.topbar'));
  }
  document.getElementById('solution-panel').addEventListener('solutionchange', event => {
    animate(event.currentTarget, [
      { opacity: 0.55, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 270, easing: 'ease-out' });
  });
})();
