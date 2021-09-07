new Glider(document.querySelector('.gliderRelacion'), {
  // Mobile-first defaults
  slidesToShow: 1,
  slidesToScroll: 1,
  scrollLock: true,
  dots: '.dotsRelacion',
  arrows: {
    prev: '.glider-prevRelacion',
    next: '.glider-nextRelacion'
  },
  responsive: [
    {
      // screens greater than >= 775px
      breakpoint: 768,
      settings: {
        // Set to `auto` and provide item width to adjust to viewport
        slidesToShow: 1,
        slidesToScroll: 1,
        itemWidth: 150,
        duration: 0.25
      }
    },{
      // screens greater than >= 1024px
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        itemWidth: 150,
        duration: 0.25
      }
    }
  ]
});