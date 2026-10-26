// мобильное меню
const burger = document.querySelector('.burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  burger.setAttribute('aria-expanded', false);
}));

// аккордеон: открыт один этап
const steps = document.querySelectorAll('.step');
steps.forEach(step => {
  step.querySelector('.step-head').addEventListener('click', () => {
    const wasOpen = step.classList.contains('open');
    steps.forEach(s => {
      s.classList.remove('open');
      s.querySelector('.step-head').setAttribute('aria-expanded', false);
    });
    if (!wasOpen) {
      step.classList.add('open');
      step.querySelector('.step-head').setAttribute('aria-expanded', true);
    }
  });
});

// слайдер отзывов
const track = document.getElementById('track');
const slides = [...track.children];
const dotsBox = document.getElementById('dots');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let current = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.setAttribute('aria-label', 'Slide ' + (i + 1));
  dot.addEventListener('click', () => goTo(i));
  dotsBox.appendChild(dot);
});

function goTo(i) {
  current = Math.max(0, Math.min(i, slides.length - 1));
  const view = track.parentElement.offsetWidth;
  const slide = slides[current];
  // сдвигаем так, чтобы активный отзыв стоял по центру
  track.style.transform = `translateX(${view / 2 - slide.offsetLeft - slide.offsetWidth / 2}px)`;
  slides.forEach((s, n) => s.classList.toggle('active', n === current));
  dotsBox.querySelectorAll('.dot').forEach((d, n) => d.classList.toggle('active', n === current));
  prev.disabled = current === 0;
  next.disabled = current === slides.length - 1;
}
prev.addEventListener('click', () => goTo(current - 1));
next.addEventListener('click', () => goTo(current + 1));
addEventListener('resize', () => goTo(current));
// первый показ без анимации: сразу ставим первый отзыв по центру
track.style.transition = 'none';
goTo(0);
requestAnimationFrame(() => requestAnimationFrame(() => { track.style.transition = ''; }));

// форма: учебный проект, отправки нет
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  e.target.querySelector('button[type="submit"]').textContent = 'Thank you!';
});
document.querySelector('.subscribe').addEventListener('submit', e => e.preventDefault());

// блоки появляются при прокрутке
const io = new IntersectionObserver(items => items.forEach(i => {
  if (i.isIntersecting) { i.target.classList.add('in'); io.unobserve(i.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
