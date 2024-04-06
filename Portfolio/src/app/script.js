let bg = document.getElementById('bg');
let cliff = document.getElementById('cliff');
let grad = document.getElementById('grad');
let parallax = document.getElementById('parallax');

let downArrow = document.getElementById("down-arrow")
let myName = document.getElementById("name")

window.addEventListener('scroll', () => {
  let value = window.scrollY;
  let x = myName;
  if (value > 750) {
    value = 750;
    myName.remove();
  }

  let bgY = -210 + value * 0.26;
  if (bgY < 0) {
      bg.style.top = bgY + 'px';
  }

  let cliffY = -210 + value * -0.5;
  if (cliffY > -700) {
    cliff.style.top = cliffY + 'px';
  }

  parallax.style.height = 1080 -  (value * 1.13)  + 'px';

  downArrow.style.color = "rgba(255, 255, 255, "+ (750 - value*3) / 750 +")"
  myName.style.color = "rgba(255, 255, 255, "+ (600 - value*2) / 750 +")"
  myName.style.textShadow = "7px 2px 4px rgba(0, 0, 0, "+ (150 - value*2) / 750 +")"
})