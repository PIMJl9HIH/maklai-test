$(document).ready(function () {
	console.log('document-ready');


	// for menu
	var menuItem 	 = $('.menu__item'),
	menuButton = $('.menu__button'),
	menu = $('.menu__nav');

	menuButton.click(function(e) {
		e.preventDefault();
		menu.slideToggle();
	});

	menuItem.click(function(e) {
		e.preventDefault();
		menuItem.removeClass('menu__item_active');
		$(this).addClass('menu__item_active');
	});

	$(window).resize(function() {

		var width = $(window).width();
		if (width > 767 ){
			menu.removeAttr('style');
			console.log('bolwe 767');
		}
	});

	// for slider 
	var slider = $('#slider');
	slider.owlCarousel({
		items:1,
		loop:false,
		nav:true,
		dots: false,
		navText: ['', ''],
		autoHeight:true,
		responsiveClass:true,
		onChanged: callback

	});

	var owlButton = $('.owl-carousel .owl-nav button');
	var sliderFooter = $('.slider-footer');
	var sliderFooterItem = $('.slider-footer__item');
	var sliderIndexNum = 0;

	owlButton.on('click', function (e) {
		e.preventDefault();
		var sliderFooterItemActive = sliderFooter.find('.slider-footer__item.active');
		console.log(sliderIndexNum);

		if($(this).hasClass('owl-prev')){
			console.log('prev');
			
			if(sliderIndexNum){
				sliderFooterItem.removeClass('active');
				sliderFooterItemActive.prev().addClass('active');
				sliderIndexNum--;
			} else {
				sliderFooterItem.removeClass('active');
				$('.slider-footer__item_revol').addClass('active');
			}
		} 
		if($(this).hasClass('owl-next')){
			console.log('next');
			
			if(sliderIndexNum < sliderFooterItem.length - 1){
				sliderFooterItem.removeClass('active');
				sliderFooterItemActive.next().addClass('active');
				sliderIndexNum++;
			} else {
				sliderFooterItem.removeClass('active');
				$('.slider-footer__item_safety').addClass('active');
			}
		}

	});



	function callback(e) {

		var sliderFooterContainer = $('.slider-footer');
		var sliderCount     = e.item.count;
		var sliderIndex = e.item.index;

		$('.slider-footer__item').on('click', function(e) {
			e.preventDefault();
			// console.log(this);
			sliderFooterItem.removeClass('active');
			$(this).addClass('active');

			if($(this).hasClass('slider-footer__item_revol')) {
				slider.trigger('to.owl.carousel', 0);
			} else if($(this).hasClass('slider-footer__item_desig')) {
				slider.trigger('to.owl.carousel', 1);
			} else if($(this).hasClass('slider-footer__item_safety')) {
				slider.trigger('to.owl.carousel', 2);
			}
			
		});

	};


	// for search
	$('.search__pic').on('click', function() {
		$('.search').toggleClass('search_active');
	});

	var searchField = $('.search__input'),
	searchButton = $(".search__button");

	searchField.blur(function() {

		if(searchField.val() != 0 && $('.search').hasClass('search_active')) {
			searchField.removeClass('search__input_error');
			searchButton.removeAttr('disabled');
			
		} else {
			searchField.addClass('search__input_error');
			searchButton.attr('disabled', 'disabled');
			
		}
	});

	// scroll top
	$('#toTop').on('click', function() {
		$('body,html').animate({scrollTop:0},800);
	});

	// accordeon
	$('.accordeon__trigger').on('click', function(e) {
		e.preventDefault();

		var $this = $(this),
		list = $this.closest('.accordeon__list'),
		item = $this.closest('.accordeon__item'),
		items = list.find('.accordeon__item'),
		content = item.find('.accordeon__inner'),
		allContent = list.find('.accordeon__inner'),
		duration = 300;

		if(!item.hasClass('active')){
			//items.removeClass('active');
			item.toggleClass('active');
			//allContent.stop(true,true).slideUp(duration);
			content.stop(true,true).slideDown(duration);
		} else {
			content.stop(true,true).slideUp(duration);
			item.stop(true,true).toggleClass('active');
		}
	});


	// change images

	$('.product-block__item').on('click', function(e) {
		e.preventDefault();

		var $this = $(this),
		curItem = $this.closest('.product-block__item'),
		curList = $this.closest('.product-block__list'),
		curColor = curItem.find('.product-block__link').data('src'),
		allItems = curList.find('.product-block__item'),
		productPic = $('.product-block__pic img');

		allItems.removeClass('active');
		curItem.addClass('active');


		if(curList.hasClass('product-block__list_colors')){
			productPic.attr('src', curColor);
		}

		  // starter kit 
		  // logic similiar radio input
		  if(curList.hasClass('product-block__list_connection')){
		  	console.log('connect');
		  }

		});

		// large pic change
		(function () {
			$('.product-small__item').on('click', function(e) {
				e.preventDefault();
				var $this = $(this),
				curItem = $this.closest('.product-small__item'),
				curList = $this.closest('.product-small__list'),
				curImg = curItem.find('img').attr('src'),
				largePic = $('.product-large__pic img'),
				allItems = curList.find('.product-small__item');

				allItems.removeClass('active');
				curItem.addClass('active');
				console.log(curImg);

				largePic.attr('src', curImg);

			});
		})();


		// copy 
		(function () {
			var copyEmailBtn = document.querySelector('.copybtn');  

			if(copyEmailBtn) {

				copyEmailBtn.addEventListener('click', function(event) {  
			  // Select the email link anchor text  
			  var emailLink = document.querySelector('#personal-link-copy');  
			  var range = document.createRange();  
			  range.selectNode(emailLink);  
			  window.getSelection().addRange(range);  

			  try {  
			    // Now that we've selected the anchor text, execute the copy command  
			    var successful = document.execCommand('copy');  
			    var msg = successful ? 'successful' : 'unsuccessful';  
			    console.log('Copy email command was ' + msg);  
			  } catch(err) {  
			  	console.log('Oops, unable to copy');  
			  }  

			  // Remove the selections - NOTE: Should use
			  // removeRange(range) when it is supported  
			  window.getSelection().removeAllRanges();  
			});				
			}
		})();


		// btn controls feature using evolve
		(function () {

			$('.control-block__pic').on('click', function (e) {
				var _this = $(this),
				btnsWrap = _this.closest('.control-block__btns'),
				btns = 	btnsWrap.find('.control-block__pic'),
				curBtn = _this.closest('.control-block__pic'),
				dataBtn = curBtn.attr('data-btn'),
				infoContainer = $('.control-block__info-container'),
				curInfoContainer = $('.control-block__info-container' + '[data-container="' + dataBtn + '"]');
				e.preventDefault();

				if (!curBtn.hasClass('active')) {
					btns.removeClass('active');
					curBtn.addClass('active');
					infoContainer.hide();
					curInfoContainer.show();
				}

			});

		})();


		(function () {
			$('.region__item').on('click', function (e) {
						var _this = $(this),
						list = _this.closest('.region__list'),
						item = _this.closest('.region__item'),
						items = 	list.find('.region__item'),
						itemUSA = list.find('.region__item_usa'),
						itemEuropeJapan = list.find('.region__item_europe-japan'),
						container = _this.closest('.region'),
						hideUsa = container.find('.hide-block_usa'),
						hideEuropeJapan = container.find('.hide-block_europe-japan');

						e.preventDefault();	

					item.toggleClass('active');

					if(item.hasClass('active') && item.hasClass('region__item_usa'))  {
						
						hideUsa.css({
							'display': 'flex'
						});
						hideUsa.addClass('active');
					} else if(!item.hasClass('active')){
						hideUsa.removeClass('active');
						itemUSA.removeClass('active');
						hideUsa.hide();
					}
						
					if(item.hasClass('active') && item.hasClass('region__item_europe-japan'))  {
						hideEuropeJapan.css({
							'display': 'flex'
						})
						hideEuropeJapan.addClass('active');
					} else if(!item.hasClass('active')){
						hideEuropeJapan.removeClass('active');
						itemEuropeJapan.removeClass('active');
						hideEuropeJapan.hide();
					}


				});
			})();


	});