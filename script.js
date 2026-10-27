const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');
if(menu&&nav){
  const mobileMenu=window.matchMedia('(max-width: 620px)');
  const navMarker=document.createComment('navigation position');
  nav.parentNode.insertBefore(navMarker,nav);
  const placeNavigation=()=>{
    if(mobileMenu.matches){
      document.body.appendChild(nav);
      if(menu.getAttribute('aria-expanded')!=='true'){
        nav.style.setProperty('display','none','important');
        nav.style.setProperty('visibility','hidden','important');
        nav.style.setProperty('opacity','0','important');
        nav.style.setProperty('pointer-events','none','important');
      }
    }else if(navMarker.parentNode){navMarker.parentNode.insertBefore(nav,navMarker.nextSibling)}
  };
  placeNavigation();
  const setMenuOpen=open=>{
    nav.classList.toggle('open',open);
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');
    if(mobileMenu.matches){
      nav.style.setProperty('display',open?'flex':'none','important');
      nav.style.setProperty('visibility',open?'visible':'hidden','important');
      nav.style.setProperty('opacity',open?'1':'0','important');
      nav.style.setProperty('pointer-events',open?'auto':'none','important');
      nav.style.setProperty('position','fixed','important');
      nav.style.setProperty('top','64px','important');
      nav.style.setProperty('left','0','important');
      nav.style.setProperty('right','0','important');
      nav.style.setProperty('bottom','auto','important');
      nav.style.setProperty('z-index','9999','important');
      nav.style.setProperty('width','100vw','important');
      nav.style.setProperty('height','auto','important');
      nav.style.setProperty('max-height','calc(100dvh - 64px)','important');
      nav.style.setProperty('overflow-y','auto','important');
      nav.style.setProperty('flex-direction','column','important');
      nav.style.setProperty('align-items','stretch','important');
      nav.style.setProperty('gap','0','important');
      nav.style.setProperty('padding','10px 18px 18px','important');
      nav.style.setProperty('background','var(--paper)','important');
      nav.style.setProperty('color','var(--ink)','important');
      nav.style.setProperty('transform','none','important');
    }
  };
  const closeMenu=()=>setMenuOpen(false);
  menu.addEventListener('click',()=>{
    const isOpen=menu.getAttribute('aria-expanded')!=='true';
    setMenuOpen(isOpen);
  });
  mobileMenu.addEventListener('change',()=>{nav.removeAttribute('style');nav.classList.remove('open');menu.setAttribute('aria-expanded','false');placeNavigation()});
  nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});
  document.addEventListener('click',event=>{if(!event.target.closest('.top'))closeMenu()});
}
const year=document.querySelector('#yr');
if(year)year.textContent=new Date().getFullYear();

const customCursorQuery=window.matchMedia('(hover: hover) and (pointer: fine)');
if(customCursorQuery.matches){
  const cursorDot=document.createElement('span');
  cursorDot.className='custom-cursor-image';
  cursorDot.setAttribute('aria-hidden','true');
  document.body.append(cursorDot);
  document.documentElement.classList.add('custom-cursor-enabled');
  window.addEventListener('pointermove',event=>{
    cursorDot.style.setProperty('--cursor-x',`${event.clientX}px`);
    cursorDot.style.setProperty('--cursor-y',`${event.clientY}px`);
    cursorDot.classList.remove('is-hidden');
  },{passive:true});
  document.documentElement.addEventListener('pointerleave',()=>cursorDot.classList.add('is-hidden'));
}

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
