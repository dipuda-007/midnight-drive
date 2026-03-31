const revealTargets = document.querySelectorAll('.trend-card, .car-showcase');
const heroVideoWrap = document.querySelector('.mega-hero__video-wrap');
const heroContent = document.querySelector('.mega-hero__content');

let scrollTicking = false;

function updateScrollEffects() {
  const scrollY = window.scrollY || 0;
  const heroOffset = Math.min(scrollY * 0.18, 88);
  const contentOffset = Math.min(scrollY * 0.045, 18);

  if (heroVideoWrap) {
    heroVideoWrap.style.transform = `translate3d(0, ${heroOffset}px, 0)`;
  }

  if (heroContent) {
    heroContent.style.setProperty('--hero-content-y', `${-contentOffset}px`);
  }

  scrollTicking = false;
}

function requestScrollUpdate() {
  if (scrollTicking) {
    return;
  }

  scrollTicking = true;
  window.requestAnimationFrame(updateScrollEffects);
}

window.addEventListener('load', () => {
  document.body.classList.add('is-loaded');
  updateScrollEffects();
  
  window.setTimeout(() => {
    document.querySelectorAll('.reveals').forEach((element) => element.classList.add('is-visible'));
  }, 1500);

  const observer = new IntersectionObserver(
    (entries, observe) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observe.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  revealTargets.forEach((element) => observer.observe(element));

  document.querySelectorAll('.spotlight-stage, .reveals').forEach((element) => observer.observe(element));

  window.setTimeout(() => {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  }, 200);

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate);
});
