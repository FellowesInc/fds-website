const desktopQuery = window.matchMedia("(min-width: 992px)");

if (desktopQuery.matches) {
  initTableAnimations();
}

function initTableAnimations() {

  const totalFrames = 13;
  const fps = 15;
  const frameDuration = 1000 / fps;

  document.querySelectorAll('.table-sprite').forEach(sprite => {

    let currentFrame = 0;
    let targetFrame = 0;
    let direction = 1;
    let animationId = null;
    let lastTime = 0;

    const spriteUrl = sprite.dataset.sprite;
    sprite.style.backgroundImage = `url(${spriteUrl})`;

    function updateFrame() {
      const percentage = (currentFrame / (totalFrames - 1)) * 100;
      sprite.style.backgroundPosition = `${percentage}% 0`;
    }

    function animate(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;

      if (elapsed > frameDuration) {
        lastTime = timestamp;

        if (currentFrame !== targetFrame) {
          currentFrame += direction;
          updateFrame();
        } else {
          cancelAnimationFrame(animationId);
          animationId = null;
          return;
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    function startAnimation(newTarget, newDirection) {
      targetFrame = newTarget;
      direction = newDirection;

      if (!animationId) {
        lastTime = 0;
        animationId = requestAnimationFrame(animate);
      }
    }

    sprite.addEventListener('mouseenter', () => {
      startAnimation(totalFrames - 1, 1);
    });

    sprite.addEventListener('mouseleave', () => {
      startAnimation(0, -1);
    });

  });
}