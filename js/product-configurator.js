$(window).on('load', function () {
  // Header and Title Functionality

  // Setup Data Object
  var prodConfigData = '';

  // // Define Data Object
  var prodConfigData = {
    heroDesktopUrl: 'https://raw.githubusercontent.com/FellowesInc/fds-website/40c5c99130d25ca3b731e1abf5ad64ca01eded8d/img/product-configurator/header-img-desktop.jpg',
    heroMobileUrl: 'https://raw.githubusercontent.com/FellowesInc/fds-website/40c5c99130d25ca3b731e1abf5ad64ca01eded8d/img/product-configurator/header-img-mobile.jpg',
    bannerTitle: 'Volo Configurator',
    pageTitle: 'Select a Volo Typical',
    pageDesc: 'Select an image below to customize in 3D and see pricing.',
  };

  // Setup the Hero Image section if there is data in the prodConfigData object

  if (prodConfigData != '') {
    var prodConfigHeader = '';

    if (prodConfigData.heroDesktopUrl != '') {
      prodConfigHeader += '<img src="' + prodConfigData.heroDesktopUrl + '" class="header-img img-fluid w-100 d-none d-sm-block" /><img src="' + prodConfigData.heroMobileUrl + '" class="header-img img-fluid w-100 d-sm-none" /><div class="header-banner-text"><h1 class="banner-text__header">' + prodConfigData.bannerTitle + '</h1></div>';

      $('.hero-section').html(prodConfigHeader);
    }

    // Setup The Title Section Dynamically if there is data in the prodConfigData object

    var prodConfigTitleSection = '';

    if (prodConfigData.pageTitle != '') {
      prodConfigTitleSection += '<h2 class="page_title">' + prodConfigData.pageTitle + '</h2><div class="page_description">' + prodConfigData.pageDesc + '</div>';

      $('.title-section').html(prodConfigTitleSection);
    }
  }

  // Filters Functionality

  // Setup Data Object
  var filters = '';

  // Define Data Object
  var filters = [
    {
      header: 'Office Front Sizes',
      slug: 'office-front-size-filter',
      checkboxes: [
        {
          checkboxId: 'eight-foot',
          checkboxLabel: "8'",
        },
        {
          checkboxId: 'ten-foot',
          checkboxLabel: "10'",
        },
        {
          checkboxId: 'forteen-foot',
          checkboxLabel: "14'",
        },
      ],
    },
    {
      header: 'Glass Type',
      slug: 'glass-type-filter',
      checkboxes: [
        {
          checkboxId: 'framed-quarter-inch',
          checkboxLabel: 'Framed 1/4"',
        },
        {
          checkboxId: 'frameless-half-inch',
          checkboxLabel: 'Frameless 1/2"',
        },
      ],
    },
    {
      header: 'Door Type',
      slug: 'door-type-filter',
      checkboxes: [
        {
          checkboxId: 'sliding-door',
          checkboxLabel: 'Sliding Door',
        },
        {
          checkboxId: 'swing-door',
          checkboxLabel: 'Swing Door',
        },
      ],
    },
    {
      header: 'Model Type',
      slug: 'model-type-filter',
      checkboxes: [
        {
          checkboxId: 'front-only',
          checkboxLabel: 'Front Only',
        },
        {
          checkboxId: 'front-and-side',
          checkboxLabel: 'Front and 1 side',
        },
      ],
    },
  ];

  if (filters != '') {
    // Setup the repeating Filter section if there is data in the filters object

    var prodConfigFilterSection = '';

    $.each(filters, function (index, filter) {
      prodConfigFilterSection += "<div class='filter-section__block'><div class='filter-header'>" + filter.header + "</div><div class='filters'>";

      if (filter.checkboxes != 0) {
        $.each(filter.checkboxes, function (index, checkbox) {
          prodConfigFilterSection += "<div class='form-check'><input name='" + filter.slug + "' class='filter-form-check-input form-check-input rounded-0' type='checkbox' value='' id='" + checkbox.checkboxId + "' /><label class='form-check-label' for='" + checkbox.checkboxId + "'></label>" + checkbox.checkboxLabel + '</div>';
        });
      }

      prodConfigFilterSection += '</div></div>';
    });

    $('#prod-config-filters').html(prodConfigFilterSection);
  }

  // Config Results Functionality

  // Setup Data Object
  var configResults = '';

  // Define Data Object
  var configResults = [
    {
      resImgUrl: 'https://raw.githubusercontent.com/FellowesInc/fds-website/refs/heads/main/img/product-configurator/typical-img-1.jpg',
      resImgAlt: "8' Frameless Front and Swing Door",
      resTitle: "8' Frameless Front and Swing Door",
    },
    {
      resImgUrl: 'https://raw.githubusercontent.com/FellowesInc/fds-website/refs/heads/main/img/product-configurator/typical-img-2.jpg',
      resImgAlt: "8' with Framed Front and Frameless Sliding Door",
      resTitle: "8' with Framed Front and Frameless Sliding Door",
    },
    {
      resImgUrl: 'https://raw.githubusercontent.com/FellowesInc/fds-website/refs/heads/main/img/product-configurator/typcial-img-3.jpg',
      resImgAlt: "8' Frameless Front and Frameless Sliding Door",
      resTitle: "8' Frameless Front and Frameless Sliding Door",
    },
    {
      resImgUrl: 'https://raw.githubusercontent.com/FellowesInc/fds-website/refs/heads/main/img/product-configurator/typical-img-1.jpg',
      resImgAlt: "8' Frameless Front and Swing Door",
      resTitle: "8' Frameless Front and Swing Door",
    },
    {
      resImgUrl: 'https://raw.githubusercontent.com/FellowesInc/fds-website/refs/heads/main/img/product-configurator/typical-img-2.jpg',
      resImgAlt: "8' with Framed Front and Frameless Sliding Door",
      resTitle: "8' with Framed Front and Frameless Sliding Door",
    },
    {
      resImgUrl: 'https://raw.githubusercontent.com/FellowesInc/fds-website/refs/heads/main/img/product-configurator/typcial-img-3.jpg',
      resImgAlt: "8' Frameless Front and Frameless Sliding Door",
      resTitle: "8' Frameless Front and Frameless Sliding Door",
    },
  ];

  if (configResults != '') {
    // Setup Config Results section if there is data in the configResults data object

    var configResultsSection = '';

    $.each(configResults, function (index, configResult) {
      configResultsSection += '<div class="config-item"><img src="' + configResult.resImgUrl + '" alt="' + configResult.resImgAlt + '" class="config-item__img w-100"><div class="config-item__title">' + configResult.resTitle + '</div></div>';
    });

    $('#configResults').html(configResultsSection);
  }
});
