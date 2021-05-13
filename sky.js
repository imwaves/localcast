const STARS_MAX = 100;

class Sky {
  constructor ($el) {
    this.$el = $el;
    
    const { offsetWidth: W, offsetHeight: H } = this.$el;

    for (let i = 0; i < STARS_MAX; i++) {
      const $star = document.createElement('div');
      $star.classList.add('star');
      $star.style.setProperty('--size', Math.random() * 3);
      $star.style.left = Math.random() * W + 'px';
      $star.style.top = Math.random() * H + 'px';

      $star.style.animationName = 'star-blink' + ((i % 3) + 1);
      $star.style.animationDelay = (Math.random() * -2) +'s';
      $star.style.animationDuration = (1 + Math.random() * 2) + 's';

      this.$el.appendChild($star);

      this.$el.style.opacity = 1;
    };
  }
};