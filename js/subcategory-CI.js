$(window).on('load', function () {
  const seriesWrapper = document.querySelectorAll('.series-filter-section-wrapper');

  if (seriesWrapper) {
    seriesWrapper.forEach((seriesSet) => {
      const seriesFilters = seriesSet.querySelectorAll('.series-filter-item');

      seriesFilters.forEach((filter) => {
        filter.addEventListener('click', function () {
          seriesFilters.forEach((el) => {
            el.classList.remove('selected');
          });
          filter.classList.add('selected');
        });
      });
    });
  }
});
