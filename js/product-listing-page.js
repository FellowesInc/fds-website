function Product(data) {
  var self = this;

  self.name = data.name;
  self.category = data.category;
  self.image = data.image;
  self.imageAlt = data.imageAlt;
  self.description = data.description;
  self.features = data.features;
  self.itemNumber = data.itemNumber;
  self.colors = data.colors;
  self.price = data.price;
  self.productUrl = data.productUrl;

  // Default to the first color
  self.selectedColor = ko.observable(data.colors[0].value);

  // Get the display name of the currently selected color
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

  var productData = [
    {
      name: 'Ion™ 95 Test 1',
      category: 'Home Laminator with Pouch Starter Kit',
      image: './img/product-listing-page/product-img.png',
      imageAlt: 'Ion 95 Home Laminator',
      description: 'Compact easy-to-use personal laminator',
      features: [
        'Ready in 4 minutes, compact design',
        'Laminates thermal pouches up to 5 mil',
        'Auto shut off',
        'Jam release lever disengages pouch for easy removal'
      ],
      itemNumber: '5247201',
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
        },
        {
          name: 'Dark Green/Light Green',
          value: 'darkgreen-lightgreen',
          cssClass: 'bg-darkgreen-lightgreen'
        },
        {
          name: 'Dark Teal/White',
          value: 'darkteal-white',
          cssClass: 'bg-darkteal-white'
        }
      ],
      price: '$59.99',
      productUrl: '#'
    },

    {
      name: 'Ion™ 95 Test 2',
      category: 'Home Laminator with Pouch Starter Kit',
      image: './img/product-listing-page/product-img.png',
      imageAlt: 'Ion 95 Home Laminator',
      description: 'Compact easy-to-use personal laminator',
      features: [
        'Ready in 4 minutes, compact design',
        'Laminates thermal pouches up to 5 mil',
        'Auto shut off',
        'Jam release lever disengages pouch for easy removal'
      ],
      itemNumber: '5247202',
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
        },
        {
          name: 'Dark Green/Light Green',
          value: 'darkgreen-lightgreen',
          cssClass: 'bg-darkgreen-lightgreen'
        },
        {
          name: 'Dark Teal/White',
          value: 'darkteal-white',
          cssClass: 'bg-darkteal-white'
        }
      ],
      price: '$59.99',
      productUrl: '#'
    },

    {
      name: 'Ion™ 95 Test 3',
      category: 'Home Laminator with Pouch Starter Kit',
      image: './img/product-listing-page/product-img.png',
      imageAlt: 'Ion 95 Home Laminator',
      description: 'Compact easy-to-use personal laminator',
      features: [
        'Ready in 4 minutes, compact design',
        'Laminates thermal pouches up to 5 mil',
        'Auto shut off',
        'Jam release lever disengages pouch for easy removal'
      ],
      itemNumber: '5247203',
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
        },
        {
          name: 'Dark Green/Light Green',
          value: 'darkgreen-lightgreen',
          cssClass: 'bg-darkgreen-lightgreen'
        },
        {
          name: 'Dark Teal/White',
          value: 'darkteal-white',
          cssClass: 'bg-darkteal-white'
        }
      ],
      price: '$59.99',
      productUrl: '#'
    },

    {
      name: 'Ion™ 95 Test 4',
      category: 'Home Laminator with Pouch Starter Kit',
      image: './img/product-listing-page/product-img.png',
      imageAlt: 'Ion 95 Home Laminator',
      description: 'Compact easy-to-use personal laminator',
      features: [
        'Ready in 4 minutes, compact design',
        'Laminates thermal pouches up to 5 mil',
        'Auto shut off',
        'Jam release lever disengages pouch for easy removal'
      ],
      itemNumber: '5247204',
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
        },
        {
          name: 'Dark Green/Light Green',
          value: 'darkgreen-lightgreen',
          cssClass: 'bg-darkgreen-lightgreen'
        },
        {
          name: 'Dark Teal/White',
          value: 'darkteal-white',
          cssClass: 'bg-darkteal-white'
        }
      ],
      price: '$59.99',
      productUrl: '#'
    }
  ];


  self.products = ko.observableArray(
    productData.map(function (product) {
      return new Product(product);
    })
  );


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


  self.relatedProducts = ko.observableArray(relatedProductData);
}


ko.applyBindings(new ProductListingViewModel());