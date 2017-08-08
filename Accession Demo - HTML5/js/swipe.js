/*
 * Swipe 1.0
 *
 * Brad Birdsall, Prime
 * Copyright 2011, Licensed GPL & MIT
 *
*/

window.Swipe = function(element, options) {

  // return immediately if element doesn't exist
  if (!element) return null;

  var _this = this;

  // retreive options
  this.options = options || {};
  this.index = this.options.startSlide || 0;
  this.speed = this.options.speed || 300;
  this.callback = this.options.callback || function() {};
  this.delay = this.options.auto || 0;

  // reference dom elements
  this.container = element;
  this.element = this.container.children[0]; // the slide pane

  // static css
  this.container.style.overflow = 'hidden';
  this.element.style.listStyle = 'none';

  // trigger slider initialization
  this.setup();

  // begin auto slideshow
  this.begin();

  // add event listeners
  if (this.element.addEventListener) {
    this.element.addEventListener('touchstart', this, false);
    this.element.addEventListener('touchmove', this, false);
    this.element.addEventListener('touchend', this, false);
    this.element.addEventListener('webkitTransitionEnd', this, false);
    this.element.addEventListener('msTransitionEnd', this, false);
    this.element.addEventListener('oTransitionEnd', this, false);
    this.element.addEventListener('transitionend', this, false);
    window.addEventListener('resize', this, false);
  }

};

function adjustHeight()
{


}



Swipe.prototype = {

  setup: function() {

    // get and measure amt of slides
    this.slides = this.element.children;
    this.length = this.slides.length;

    // return immediately if their are less than two slides
    if (this.length < 2) return null;

    // determine width of each slide
    this.width = this.container.getBoundingClientRect().width;

    // return immediately if measurement fails
    if (!this.width) return null;

    // hide slider element but keep positioning during setup
    this.container.style.visibility = 'hidden';



    // dynamic css
    this.element.style.width = (this.slides.length * this.width) + 'px';
    var index = this.slides.length;
    while (index--) {
      var el = this.slides[index];
      el.style.width = this.width + 'px';
      el.style.display = 'table-cell';
      el.style.verticalAlign = 'top';


	var getHeight = window.innerHeight - 840;
	var getHeightElse = window.innerHeight - 140;
	var getHeightTable = window.innerHeight - 140;

	if(getHeight > 0)
		{
			document.getElementById('bodyContainerId').style.padding = getHeight/2 + 'px 0px 0px 0px';
			document.getElementById('navTable').style.margin = getHeight/2 + 'px auto 0px';
			document.getElementById('slider1').style.height = '700px';		
			document.getElementById('slideIntro').style.height = '700px';
			document.getElementById('slideIntro2').style.height = '700px';				
			document.getElementById('slideAudioCalls').style.height = '700px';
			document.getElementById('slideAudioDetails').style.height = '700px';
			document.getElementById('slideVideoCalls').style.height = '700px';
			document.getElementById('slideMoveCalls').style.height = '700px';
			document.getElementById('slidePullCalls').style.height = '700px';
			document.getElementById('slidePushCalls').style.height = '700px';
			document.getElementById('videoIntro13').style.height = '700px';
			document.getElementById('videoSlide13').style.height = '700px';
			document.getElementById('slide4HubInteractive').style.height = '700px';
			document.getElementById('videoIntro11').style.height = '700px';
			document.getElementById('videoSlide11').style.height = '700px';			
			document.getElementById('slide6ChatInteractive').style.height = '700px';
			document.getElementById('videoIntro15').style.height = '700px';
			document.getElementById('videoSlide15').style.height = '700px';
			document.getElementById('slideVVM').style.height = '700px';
			document.getElementById('slideVVMVideo').style.height = '700px';
			document.getElementById('slideECM').style.height = '700px';
			document.getElementById('slideRoadmap').style.height = '700px';
			document.getElementById('slideOutro').style.height = '700px';
			document.getElementById('ecm_img').style.height = '700px';
		}
	else
		{
			document.getElementById('bodyContainerId').style.padding = '0px';
			document.getElementById('navTable').style.margin = getHeight/2 + 'px auto 0px';
			document.getElementById('slider1').style.height = getHeightElse + 'px';
			document.getElementById('slideIntro').style.height = getHeightTable + 'px';
			document.getElementById('slideIntro2').style.height = getHeightTable + 'px';
			document.getElementById('slideAudioCalls').style.height = getHeightTable + 'px';				
			document.getElementById('slideAudioDetails').style.height = getHeightTable + 'px';
			document.getElementById('slideVideoCalls').style.height = getHeightTable + 'px';
			document.getElementById('slideMoveCalls').style.height = getHeightTable + 'px';
			document.getElementById('slidePushCalls').style.height = getHeightTable + 'px';
			document.getElementById('slidePullCalls').style.height = getHeightTable + 'px';
			document.getElementById('videoIntro13').style.height = getHeightTable + 'px';
			document.getElementById('videoSlide13').style.height = getHeightTable + 'px';
			document.getElementById('slide4HubInteractive').style.height = getHeightTable + 'px';
			document.getElementById('videoIntro11').style.height = getHeightTable + 'px';
			document.getElementById('videoSlide11').style.height = getHeightTable + 'px';
			document.getElementById('slide6ChatInteractive').style.height = getHeightTable + 'px';
			document.getElementById('videoIntro15').style.height = getHeightTable + 'px';
			document.getElementById('videoSlide15').style.height = getHeightTable + 'px';
			document.getElementById('slideVVM').style.height = getHeightTable + 'px';
			document.getElementById('slideVVMVideo').style.height = getHeightTable + 'px';
			document.getElementById('slideECM').style.height = getHeightTable + 'px';
			document.getElementById('slideRoadmap').style.height = getHeightTable + 'px';
			document.getElementById('slideOutro').style.height = getHeightTable + 'px';
			document.getElementById('ecm_img').style.height = getHeightTable + 'px';
		}		
	
    }

    // set start position and force translate to remove initial flickering
    this.slide(this.index, 0); 

    // show slider element
    this.container.style.visibility = 'visible';

  },

  slide: function(index, duration) {

    var style = this.element.style;

    // fallback to default speed
    if (duration == undefined) {
        duration = this.speed;
    }

    // set duration speed (0 represents 1-to-1 scrolling)
    style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + 'ms';

    // translate to given index position
    style.MozTransform = style.webkitTransform = 'translate3d(' + -(index * this.width) + 'px,0,0)';
    style.msTransform = style.OTransform = 'translateX(' + -(index * this.width) + 'px)';
	//style.MozTransform = style.WebkitTransform = 'translate(' + -(index * this.width) + 'px)';

    // set new index to allow for expression arguments
    this.index = index;

  },

	gotoSlide: function(slideNumber){
		if (playStop == 'Playing')
		{
			playVideo(this.index);
		};
    var style = this.element.style;
		var getPosition = slideNumber * -30;
		document.getElementById('sliderelement').style.MozTransform = style.webkitTransform = 'translate3d(' + -(slideNumber * this.width) + 'px,0,0)';
	  document.getElementById('sliderelement').style.msTransform = style.OTransform = 'translateX(' + -(slideNumber * this.width) + 'px)';
		document.getElementById("navigation").style.backgroundPosition = '0px '+getPosition+'px'
		document.getElementById('navoverlay').style.display = 'none';
		this.index = slideNumber;
	},

  getPos: function() {
    
    // return current index position
    return this.index;

  },

  prev: function(delay) 
  {

    // cancel next scheduled automatic transition, if any
    this.delay = delay || 0;
    clearTimeout(this.interval);
	var getVideoIndex = this.index;
	var getPageIndex = this.index - 1;
	var getPosition = getPageIndex * -30;
    // if not at first slide
    if (this.index)
		{ 
			if (playStop == 'Playing')
			{
				if (getVideoIndex == 12)
				{
					playVideo(11);
				}
				else
				{
					playVideo(getVideoIndex);
				}
			}
			this.slide(this.index-1, this.speed);
			document.getElementById("navigation").style.backgroundPosition = '0px '+getPosition+'px'
			
		}
  },

  next: function(delay) {

    // cancel next scheduled automatic transition, if any
    this.delay = delay || 0;
    clearTimeout(this.interval);
    var getVideoIndex = this.index;
		var getPageIndex = this.index + 1;
		var getPosition = getPageIndex * -30;
    if (this.index < this.length - 1) {
			if (playStop == 'Playing')
			{
				if (getVideoIndex == 12)
				{
					playVideo(11);
				}
				else
				{
					playVideo(getVideoIndex);
				}
			}
			this.slide(this.index+1, this.speed); // if not last slide
			document.getElementById("navigation").style.backgroundPosition = '0px '+getPosition+'px'
	}
    else {
			if (playStop == 'Playing')
			{
				playVideo(getVideoIndex);
			}
	}
  },

  begin: function() {

    var _this = this;

    this.interval = (this.delay)
      ? setTimeout(function() { 
        _this.next(_this.delay);
      }, this.delay)
      : 0;
  
  },
  
  stop: function() {
    this.delay = 0;
    clearTimeout(this.interval);
  },
  
  resume: function() {
    this.delay = this.options.auto || 0;
    this.begin();
  },

  handleEvent: function(e) {
    switch (e.type) {
      case 'touchstart': this.onTouchStart(e); break;
      case 'touchmove': this.onTouchMove(e); break;
      case 'touchend': this.onTouchEnd(e); break;
      case 'webkitTransitionEnd':
      case 'msTransitionEnd':
      case 'oTransitionEnd':
      case 'transitionend': this.transitionEnd(e); break;
      case 'resize': this.setup(); break;
    }
  },

  transitionEnd: function(e) {    
    if (this.delay) this.begin();

    this.callback(e, this.index, this.slides[this.index]);
	if (this.index > 10 && this.index !== this.length - 1)
	{
		document.getElementById("slideSurroundRoadmap").style.opacity = 1;

	}
	else
	{
		document.getElementById("slideSurroundRoadmap").style.opacity = 0;
	}
  },

  onTouchStart: function(e) {
    
    this.start = {

      // get touch coordinates for delta calculations in onTouchMove
      pageX: e.touches[0].pageX,
      pageY: e.touches[0].pageY,

      // set initial timestamp of touch sequence
      time: Number( new Date() )

    };

    // used for testing first onTouchMove event
    this.isScrolling = undefined;
    
    // reset deltaX
    this.deltaX = 0;

    // set transition time to 0 for 1-to-1 touch movement
    this.element.style.MozTransitionDuration = this.element.style.webkitTransitionDuration = 0;

  },

  onTouchMove: function(e) {

    // ensure swiping with one touch and not pinching
    if(e.touches.length > 1 || e.scale && e.scale !== 1) return;

    this.deltaX = e.touches[0].pageX - this.start.pageX;

    // determine if scrolling test has run - one time test
    if ( typeof this.isScrolling == 'undefined') {
      this.isScrolling = !!( this.isScrolling || Math.abs(this.deltaX) < Math.abs(e.touches[0].pageY - this.start.pageY) );
    }

    // if user is not trying to scroll vertically
    if (!this.isScrolling) {

      // prevent native scrolling 
      e.preventDefault();

      // cancel slideshow
      clearTimeout(this.interval);

      // increase resistance if first or last slide
      this.deltaX = 
        this.deltaX / 
          ( (!this.index && this.deltaX > 0               // if first slide and sliding left
            || this.index == this.length - 1              // or if last slide and sliding right
            && this.deltaX < 0                            // and if sliding at all
          ) ?                      
          ( Math.abs(this.deltaX) / this.width + 1 )      // determine resistance level
          : 1 );                                          // no resistance if false
      
      // translate immediately 1-to-1
      this.element.style.MozTransform = this.element.style.webkitTransform = 'translate3d(' + (this.deltaX - this.index * this.width) + 'px,0,0)';

    }

  },

  onTouchEnd: function(e) {
	var getVideoIndex = this.index;
		if (playStop == 'Playing')
		{
			if (getVideoIndex == 12)
			{
				playVideo(11);
			}
			else
			{
				playVideo(getVideoIndex);
			}
		};

    // determine if slide attempt triggers next/prev slide
    var isValidSlide = 
          Number(new Date()) - this.start.time < 250      // if slide duration is less than 250ms
          && Math.abs(this.deltaX) > 20                   // and if slide amt is greater than 20px
          || Math.abs(this.deltaX) > this.width/2,        // or if slide amt is greater than half the width

    // determine if slide attempt is past start and end
        isPastBounds = 
          !this.index && this.deltaX > 0                          // if first slide and slide amt is greater than 0
          || this.index == this.length - 1 && this.deltaX < 0;    // or if last slide and slide amt is less than 0

    // if not scrolling vertically
    if (!this.isScrolling) {

      // call slide function with slide end value based on isValidSlide and isPastBounds tests
      this.slide( this.index + ( isValidSlide && !isPastBounds ? (this.deltaX < 0 ? 1 : -1) : 0 ), this.speed );
			document.getElementById("navigation").style.backgroundPositionY = this.index * -30 + 'px';

    }

  }

};