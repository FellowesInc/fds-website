function GalleryViewModel() {
    var self = this;

    self.assets = ko.observableArray([
        {
            href: 'https://www.youtube.com/embed/gsHKWmBhT04?si=459aAg6gt-_QwtdE',
            type: 'video',
            heading: 'Video 1',
            imageSrc: './img/aqm-videos-tutorials/video-thumb-1.jpg',
            lightBoxID: 'glightbox1',
        },
        {
            href: 'https://www.youtube.com/embed/rfYtzvNU1GU?si=WNwnllD0OFen7JOG',
            type: 'video',
            heading: 'Video 2',
            imageSrc: './img/aqm-videos-tutorials/video-thumb-2.jpg',
            lightBoxID: 'glightbox2',
        },
        {
            href: 'https://www.youtube.com/embed/AUoNjCAAkns?si=HRBw9zfiAC5QeYwn',
            type: 'video',
            heading: 'Video 3',
            imageSrc: './img/aqm-videos-tutorials/video-thumb-3.jpg',
            lightBoxID: 'glightbox3',
        },
    ]);

    // Initialize GLightbox with all assets
    const glightbox = GLightbox({
        elements: self.assets(),
        autoplayVideos: true,
    });

    // Open based on lightBoxID
    self.openByLightboxID = function (element) {
        const elClass = element.lightBoxID;
        const index = self.assets().findIndex(asset => asset.lightBoxID === elClass);

        if (index !== -1) {
            console.log('I clicked the element with the lightBoxID of ' + elClass + ', and the index of ' + index);
            glightbox.settings.startAt = index
            glightbox.open();
        }
    };

}

ko.applyBindings(new GalleryViewModel());