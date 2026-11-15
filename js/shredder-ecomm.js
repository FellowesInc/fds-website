
function Product(data) {
  var self = this;

  self.name = data.name;
  self.category = data.category;
  self.shredderType = data.shredderType;
  self.image = data.image;
  self.imageAlt = data.imageAlt;
  self.description = data.description;
  self.features = data.features;
  self.itemNumber = data.itemNumber;
  self.colors = data.colors;
  self.price = data.price;
  self.productUrl = data.productUrl;

  // Ecommerce settings
  self.ecommerceEnabled = data.ecommerceEnabled === true;
  self.buyNowUrl = data.buyNowUrl || '#';

  // Default to the first color
  self.selectedColor = ko.observable(
    data.colors.length ? data.colors[0].value : ''
  );

  // Get selected color display name
  self.selectedColorName = ko.pureComputed(function () {
    var selectedValue = self.selectedColor();

    for (var i = 0; i < self.colors.length; i++) {
      if (self.colors[i].value === selectedValue) {
        return self.colors[i].name;
      }
    }

    return '';
  });
}


function ProductListingViewModel() {
  var self = this;

  // ==========================================
  // SHREDDER TYPES
  // ==========================================

  self.shredderTypes = [
    {
      name: 'Personal',
      value: 'personal',
      image: './img/shredder-ecomm/Type-Personal.jpg'
    },
    {
      name: 'Small Office',
      value: 'small-office',
      image: './img/shredder-ecomm/Type-Small-Office.jpg'
    },
    {
      name: 'AutoFeed',
      value: 'autofeed',
      image: './img/shredder-ecomm/Type-AutoFeed.jpg'
    },
    {
      name: 'Commercial',
      value: 'commercial',
      image: './img/shredder-ecomm/Type-Commercial.jpg'
    }
  ];


  // ==========================================
  // SHREDDER TYPE FILTER
  // ==========================================

  // No category selected initially
  self.selectedShredderType = ko.observable(null);

  // Clear selected category
  self.clearTypeFilter = function () {
    self.selectedShredderType(null);
  };



  // ==========================================
  // PRODUCT DATA
  // ==========================================

  var productData = [

    // PERSONAL SHREDDER
    {
      name: 'POWERSHRED® LX170',
      category: 'Cross-Cut Shredder',
      shredderType: 'personal',

      image: './img/shredder-ecomm/product-img.png',
      imageAlt: 'Powershred LX170 Personal Shredder',

      description: 'Sleek shredder with a sheet capacity',

      features: [
        'Ideal for personal use',
        'Cross-cut shredding for security',
        'Convenient waste bin',
        'Compact design for home offices'
      ],

      itemNumber: '5500101',

      colors: [
        {
          name: 'White/Silver',
          value: 'white-silver',
          cssClass: 'bg-white-silver'
        },
        {
          name: 'Black/Silver',
          value: 'black-silver',
          cssClass: 'bg-black-silver'
        }
      ],

      price: '$249.99',
      productUrl: '#',

      ecommerceEnabled: true,
      buyNowUrl: '/shop/5500101'
    },


    // SMALL OFFICE SHREDDER
    {
      name: 'POWERSHRED® LX170',
      category: 'Cross-Cut Shredder',
      shredderType: 'small-office',

      image: './img/shredder-ecomm/product-img.png',
      imageAlt: 'Powershred Small Office Shredder',

      description: 'Reliable shredding for small offices',

      features: [
        'Designed for small office environments',
        'Cross-cut security',
        'Easy-empty waste bin',
        'Durable everyday performance'
      ],

      itemNumber: '5500102',

      colors: [
        {
          name: 'White/Silver',
          value: 'white-silver',
          cssClass: 'bg-white-silver'
        },
        {
          name: 'Black/Silver',
          value: 'black-silver',
          cssClass: 'bg-black-silver'
        }
      ],

      price: '$299.99',
      productUrl: '#',

      ecommerceEnabled: true,
      buyNowUrl: '/shop/5500102'
    },


    // AUTOFEED SHREDDER
    {
      name: 'POWERSHRED® LX170',
      category: 'AutoFeed Shredder',
      shredderType: 'autofeed',

      image: './img/shredder-ecomm/product-img.png',
      imageAlt: 'Powershred AutoFeed Shredder',

      description: 'Convenient automatic shredding',

      features: [
        'Automatic document feeding',
        'Hands-free shredding convenience',
        'Cross-cut security',
        'Ideal for busy workspaces'
      ],

      itemNumber: '5500103',

      colors: [
        {
          name: 'White/Silver',
          value: 'white-silver',
          cssClass: 'bg-white-silver'
        },
        {
          name: 'Black/Silver',
          value: 'black-silver',
          cssClass: 'bg-black-silver'
        }
      ],

      price: '$349.99',
      productUrl: '#',

      ecommerceEnabled: true,
      buyNowUrl: '/shop/5500103'
    },


    // COMMERCIAL SHREDDER
    {
      name: 'POWERSHRED® LX170',
      category: 'Commercial Shredder',
      shredderType: 'commercial',

      image: './img/shredder-ecomm/product-img.png',
      imageAlt: 'Powershred Commercial Shredder',

      description: 'Powerful shredding for demanding offices',

      features: [
        'Designed for commercial environments',
        'High-capacity shredding',
        'Durable construction',
        'Reliable performance'
      ],

      itemNumber: '5500104',

      colors: [
        {
          name: 'White/Silver',
          value: 'white-silver',
          cssClass: 'bg-white-silver'
        },
        {
          name: 'Black/Silver',
          value: 'black-silver',
          cssClass: 'bg-black-silver'
        }
      ],

      price: '$449.99',
      productUrl: '#',

      ecommerceEnabled: true,
      buyNowUrl: '/shop/5500104'
    }

  ];


  // ==========================================
  // PRODUCT OBSERVABLE ARRAY
  // ==========================================

  self.products = ko.observableArray(
    productData.map(function (product) {
      return new Product(product);
    })
  );


  // ==========================================
  // FILTERED PRODUCTS
  // ==========================================

  self.filteredProducts = ko.pureComputed(function () {
    var selectedType = self.selectedShredderType();

    // No filter selected: show all products
    if (!selectedType) {
      return self.products();
    }

    // Return only matching products
    return ko.utils.arrayFilter(
      self.products(),
      function (product) {
        return product.shredderType === selectedType;
      }
    );
  });


  // ==========================================
  // FAQ DATA
  // ==========================================

  var faqData = [
    {
      question: 'FAQ Title #1',
      answer: 'lorem ipsum dolor sit amet consectetur adipiscing elit expedita veniam dolor et est est aliqua et et laborum pariatur eiusmod esse dignissimos est quo distinctio incididunt commodo illum consequat quas quidem rerum aliqua culpa omnis ad nulla nostrud facilis eiusmod soluta aliqua placeat sit est velit irure pariatur dolores aut'
    },
    {
      question: 'FAQ Title #2',
      answer: 'lorem ipsum dolor sit amet consectetur adipiscing elit expedita veniam dolor et est est aliqua et et laborum pariatur eiusmod esse dignissimos est quo distinctio incididunt commodo illum consequat quas quidem rerum aliqua culpa omnis ad nulla nostrud facilis eiusmod soluta aliqua placeat sit est velit irure pariatur dolores aut'
    },
    {
      question: 'FAQ Title #3',
      answer: 'lorem ipsum dolor sit amet consectetur adipiscing elit expedita veniam dolor et est est aliqua et et laborum pariatur eiusmod esse dignissimos est quo distinctio incididunt commodo illum consequat quas quidem rerum aliqua culpa omnis ad nulla nostrud facilis eiusmod soluta aliqua placeat sit est velit irure pariatur dolores aut'
    },
    {
      question: 'FAQ Title #4',
      answer: 'lorem ipsum dolor sit amet consectetur adipiscing elit expedita veniam dolor et est est aliqua et et laborum pariatur eiusmod esse dignissimos est quo distinctio incididunt commodo illum consequat quas quidem rerum aliqua culpa omnis ad nulla nostrud facilis eiusmod soluta aliqua placeat sit est velit irure pariatur dolores aut'
    }
  ];

  self.faqs = ko.observableArray(faqData);


  // ==========================================
  // RELATED PRODUCTS
  // ==========================================

  var relatedProductData = [
    {
      name: 'Saturn™ 95',
      category: 'Laminator with Pouch Starter Kit',
      description: 'Fast, reliable, flawless thermal laminating',
      image: './img/product-listing-page/related-product-img.png',
      imageAlt: 'Saturn 95 Laminator',
      productUrl: '#'
    },
    {
      name: 'Saturn™ 95',
      category: 'Laminator with Pouch Starter Kit',
      description: 'Fast, reliable, flawless thermal laminating',
      image: './img/product-listing-page/related-product-img.png',
      imageAlt: 'Saturn 95 Laminator',
      productUrl: '#'
    },
    {
      name: 'Saturn™ 95',
      category: 'Laminator with Pouch Starter Kit',
      description: 'Fast, reliable, flawless thermal laminating',
      image: './img/product-listing-page/related-product-img.png',
      imageAlt: 'Saturn 95 Laminator',
      productUrl: '#'
    }
  ];

  self.relatedProducts = ko.observableArray(
    relatedProductData
  );

}


// ==========================================
// INITIALIZE KNOCKOUT
// ==========================================

ko.applyBindings(new ProductListingViewModel());
