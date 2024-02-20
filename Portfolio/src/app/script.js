let bg = document.getElementById('bg');
let cliff = document.getElementById('cliff');
let grad = document.getElementById('grad');
let p = document.getElementById('parallax');

window.addEventListener('scroll', () => {
  let value = window.scrollY;
  if (value > 750) value = 750;

  

  let bgY = -210 + value * 0.26;
  if (bgY < 0) {
      bg.style.transform = "translateY(" + bgY + 'px)';
  }

  let cliffY = -270 + value * -0.5;
  if (cliffY > -700) {
    cliff.style.transform = "translateY(" + cliffY + 'px)';
  }

  // grad.style.height = 10 + value * 0.02  + 'vh';
  p.style.height = 100 -  (value * 0.11)  + 'vh';
})