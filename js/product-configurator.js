$(window).on('load', function () {
  // Setup JSON data fetch
  fetch('./data/ConfiguratorDataStructure.json')
    .then((response) => response.json())
    .then((data) => {
      // Filter data with URL Param

      const prodId = getUrlParams().id ?? 0;
      let prodData = data.configurator.products;

      function getUrlParams() {
        let result = []; // [] empty array at the start

        const stringArray = location.search // "?id=number&other=string&another=string" , this get the last part of the URL
          .substring(1) // delete the "?" character from the location.search
          .split('&'); // ["id=number", "other=string", "another=string"]

        stringArray.forEach((string) => {
          result.push(string.split('='));
        }); // [[id, number], [other, string], [another, string]]

        return Object.fromEntries(result); // {id: number, other: string, another: string}
      }

      const filteredData = prodData
        .filter((product) => {
          return product.id === prodId;
        })
        .map((product) => {
          return product.data;
        });

      // Header and Title Functionality

      // Setup the Hero Image section if there is data in the prodConfigData object
      let hero = filteredData[0].hero_section;

      function displayHeader(hero) {
        let prodConfigHeader = '';

        if (hero.desktopImage != '') {
          prodConfigHeader += '<img src="' + hero.desktopImage + '" class="header-img img-fluid w-100 d-none d-sm-block" alt="' + hero.alt + '" /><img src="' + hero.mobileImage + '" class="header-img img-fluid w-100 d-sm-none" alt="' + hero.alt + '" /><div class="header-banner-text"><h1 class="banner-text__header">' + hero.title + '</h1></div>';

          $('.hero-section').html(prodConfigHeader);
        }
      }

      displayHeader(hero);

      // Setup The Title Section Dynamically if there is data in the prodConfigData object

      let pageTitle = filteredData[0].page_title;
      let pageDesc = filteredData[0].page_description;

      function displayTitles(title, descr) {
        let prodConfigTitleSection = '';

        if (title != '') {
          prodConfigTitleSection += '<h2 class="page_title">' + pageTitle + '</h2><div class="page_description">' + pageDesc + '</div>';

          $('.title-section').html(prodConfigTitleSection);
        }
      }

      displayTitles(pageTitle, pageDesc);

      // Filters Functionality

      // Setup the repeating Filter section if there is data in the filters object
      let filters = filteredData[0].filters;

      function displayFilters(filters) {
        let prodConfigFilterSection = '';

        $.each(filters, function (index, filter) {
          prodConfigFilterSection += "<div class='filter-section__block'><div class='filter-header'>" + filter.name + "</div><div class='filters'>";

          if (filter.options != 0) {
            $.each(filter.options, function (index, checkbox) {
              prodConfigFilterSection += "<div class='form-check'><input name='" + filter.slug + "' class='filter-checkbox filter-form-check-input form-check-input rounded-0' type='checkbox' value='' id='" + checkbox.checkboxId + "' data-feature='" + checkbox.checkboxId + "' /><label class='form-check-label' for='" + checkbox.checkboxId + "'></label>" + checkbox.checkboxLabel + '</div>';
            });
          }

          prodConfigFilterSection += '</div></div>';
        });

        $('#prod-config-filters').html(prodConfigFilterSection);

        const filterSection = document.querySelector('.filter-section');
        const mediaQueryMax992 = window.matchMedia('(max-width: 992px)');
        if (mediaQueryMax992.matches && filterSection) {
          const clickHeader = document.querySelector('.filter-section__title');
          const clickIcon = document.querySelectorAll('.filter-icon');
          const btnWrapper = document.querySelector('.filter-section__btn-wrapper');
          const filterWrapper = document.querySelector('.filter-section__filter-wrapper');
          const openIcon = document.querySelector('.filter-open');
          const closeIcon = document.querySelector('.filter-close');
          const filterHeader = document.querySelectorAll('.filter-header');

          $(clickHeader).click(function () {
            $(btnWrapper).toggleClass('show');
            $(filterWrapper).toggleClass('show');
            $(closeIcon).toggleClass('show');
            $(openIcon).toggleClass('hide');
          });
          $(clickIcon).click(function () {
            $(btnWrapper).toggleClass('show');
            $(filterWrapper).toggleClass('show');
            $(closeIcon).toggleClass('show');
            $(openIcon).toggleClass('hide');
          });

          $(filterHeader).each(function () {
            $(this).click(function () {
              const filterSection = $(this).siblings('.filters');
              $(filterSection).toggleClass('show');
              $(this).find('.filter-subhead__open').toggleClass('hide');
              $(this).find('.filter-subhead__close').toggleClass('show');
            });
          });
        }
      }

      displayFilters(filters);

      // Config Results Functionality

      // Setup Config Results section if there is data in the configResults data object
      let results = filteredData[0].results;

      function displayProducts(results) {
        let configResultsSection = '';

        $.each(results, function (index, configResult) {
          configResultsSection += '<a href="' + configResult.url + '" class="config-item"><img src="' + configResult.image + '" alt="' + configResult.alt + '" class="config-item__img w-100"><img src="' + configResult.imageHover + '" alt="' + configResult.alt + '" class="config-item__img-hover w-100"><div class="config-item__title">' + configResult.title + '</div></a>';
        });

        $('#configResults').html(configResultsSection);

        //Update Results Count
        let resultsCount = document.querySelector('#results-count');
        $(resultsCount).html(results.length);

        //Animated image on hover functionality
        let resultWrappers = document.querySelectorAll('a.config-item');

        resultWrappers.forEach((resultWrapper) => {
          $(resultWrapper)
            .on('mouseenter', function () {
              resultWrapper.classList.add('show');
            })
            .on('mouseleave', function () {
              resultWrapper.classList.remove('show');
            });
        });
      }

      displayProducts(results);

      // Filtering of Results functionality starts here

      const checkboxes = document.querySelectorAll('.filter-checkbox');

      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
          // Collect selected features
          let selectedFeatures = Array.from(checkboxes)
            .filter((cb) => cb.checked)
            .map((cb) => cb.getAttribute('data-feature'));

          // Function to filter products based on selected features
          filterProducts(selectedFeatures);
        });
      });

      function filterProducts(features) {
        //Filter products that match the selected features

        let filteredProducts = results.filter((product) => {
          return features.every((feature) => product.filters.includes(feature));
        });

        displayProducts(filteredProducts);
      }

      //Clear Filters resets data
      const filterClear = document.querySelector('#filter-clear-btn');
      $(filterClear).click(function () {
        displayProducts(results);
      });
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error:', error);
    });
});
