function ge (s) { return document.querySelector(s) };

window.addEventListener('load', async (e) => {
  transit('#wave1', 'wave1--animate', '2s');
  transit('#wave2', 'wave2--animate', '2s', '1.3s');
  await transit('.logoName', 'logoName--appear', '1s'/*, '.8s'*/);
  await transit('.logoName', 'logoName--intert', '.5s');
  await transit('.logoName', 'logoName--intert-out', '.5s');
  transit('#wave3', 'wave3--animate', '2s');
  await transit('.logoName', 'logoName--appear-out', '1s', '5s');

  new Sky(ge('#sky'));
  ge('#guys').style.opacity = 1;
  ge('#guys').playbackRate = .7;
  transit('.logo', 'logo--appear').then(
    () => ge('.logo').classList.add('logo--blink')
  );


  transit('.desc', 'desc--appear').then(
    () => {
      ge('.desc').classList.add('desc--blink');
      ge('.vk-link').style.opacity = .5;
    }
  );

  // const $it = ge('#type-it');
  // const $desc = ge('.desc');
  // $desc.style.height = $desc.offsetHeight;
  // $desc.style.width = $desc.offsetWidth;
  // let txt = $it.innerHTML;
  // $it.innerHTML = '';
  // const specials = ['<br>', '\n', '&nbsp;'];
  
  // (function type () {
  //   let found = specials.find(word => txt.startsWith(word));
  //   if (found) {
  //     $it.innerHTML += found;
  //     txt = txt.slice(found.length);
  //   } else {
  //     $it.innerHTML += txt[0];
  //     txt = txt.slice(1);
  //   }

  //   if (txt.length)
  //     setTimeout(type, 10 + Math.random() * 50);
  // })();

  const $yous = [...document.querySelectorAll('.you')];
  $yous.forEach($you => {
    $you.style.transformOrigin = 
      $you.getAttribute('cx') + 'px ' +
      $you.getAttribute('cy') + 'px'
  });
  logoAnimate();

  document.addEventListener('mousedown', onTouch);
  // document.addEventListener('touchstart', onTouch);
});

window.addEventListener('orientationchange', e => location.reload());

function onTouch (e) {
  const $waves = ge('.waves');
  const $wave = document.createElement('div');
  $wave.classList.add('wave');
  $wave.classList.add('wave-pointer');
  $wave.style.left = e.clientX + 'px';
  $wave.style.top = e.clientY + 'px';
  if (Math.random() > .8)
    $wave.style.borderColor = '#FFA51F';
  $waves.appendChild($wave);
  $wave.addEventListener('transitionend', e => $wave.remove());
  setTimeout(() => $wave.classList.add('wave-pointer--animate'));
}

function wait (time) {
  return new Promise(r => setTimeout(r, time));
}

function transit ($el, className, dur, delay) {
  return new Promise(r => {
    $el = typeof $el === 'string' ? ge($el) : $el;
    if (dur)
      $el.style.transitionDuration = dur;
    if (delay)
      $el.style.transitionDelay = delay;
    $el.addEventListener('transitionend', r);
    if ($el.classList.contains(className))
      $el.classList.remove(className);
    else
      $el.classList.add(className);
  });
}

const youAppearCl = 'you--appear';
async function logoAnimate () {
  const $prevYou = document.querySelector('.' + youAppearCl);
  const $yous = [...document.querySelectorAll('.you')];
  const prevInd = $yous.indexOf($prevYou);
  if (~prevInd) {
    await wait(Math.random() * 2000);
    await transit($prevYou, youAppearCl);
  }
  const nextYouInd = ~prevInd ? ((prevInd+1) % 4) : 0;
  await transit($yous[nextYouInd], youAppearCl);
  setTimeout(logoAnimate, 500 + Math.random() * 2000);
}