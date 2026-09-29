document.addEventListener('DOMContentLoaded', function () {
  const videoPosters = document.querySelectorAll('.video-poster');

  videoPosters.forEach(function (poster) {
    poster.addEventListener('click', function () {
      const videoId = poster.dataset.videoId;
      const videoContainer = poster.parentElement;

      const iframe = document.createElement('iframe');

      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;
      iframe.title = 'HVAKR IAQP Overview';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;

      videoContainer.replaceChildren(iframe);
    });
  });
});