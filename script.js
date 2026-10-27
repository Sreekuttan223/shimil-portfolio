const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');
menu.addEventListener('click',()=>{menu.setAttribute('aria-expanded',nav.classList.toggle('open'))});
nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
document.querySelector('#yr').textContent=new Date().getFullYear();

const reelTrack=document.querySelector('.reels');
if(reelTrack){
  const previous=document.querySelector('[data-reel-prev]');
  const next=document.querySelector('[data-reel-next]');
  const updateReelControls=()=>{
    const maxScroll=reelTrack.scrollWidth-reelTrack.clientWidth;
    previous.disabled=reelTrack.scrollLeft<=1;
    next.disabled=reelTrack.scrollLeft>=maxScroll-1;
  };
  previous.addEventListener('click',()=>reelTrack.scrollBy({left:-reelTrack.clientWidth,behavior:'smooth'}));
  next.addEventListener('click',()=>reelTrack.scrollBy({left:reelTrack.clientWidth,behavior:'smooth'}));
  reelTrack.addEventListener('scroll',()=>requestAnimationFrame(updateReelControls),{passive:true});
  window.addEventListener('resize',updateReelControls);
  updateReelControls();
}

const prefersLessMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!prefersLessMotion){
  const motionTargets=[...document.querySelectorAll('.hero-t,.hero-p,.sec .w > *,footer .w > *')];
  motionTargets.forEach((element,index)=>{
    element.classList.add('motion-reveal');
    element.style.setProperty('--motion-delay',`${Math.min(index*70,280)}ms`);
  });
  document.documentElement.classList.add('motion-ready');
  if('IntersectionObserver' in window){
    const motionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');motionObserver.unobserve(entry.target)}
    }),{threshold:.12,rootMargin:'0px 0px -35px 0px'});
    motionTargets.forEach(element=>motionObserver.observe(element));
  }else motionTargets.forEach(element=>element.classList.add('is-visible'));
}
