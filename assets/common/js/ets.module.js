import Swiper from '../js/libs/swiper.min';
import '../js/libs/intersection-observer';

(function($) { 'use strict';
    Etoos.module(function(){
        var UI = {
            _bMouseOver: false,
            init: function() {
                this._EventLoad();
                this._Todaypop();
                this._assignElements();
                this._attachEventHandlers();
                this._AsideMenu();
                this.siteLink();
                this.serviceList();
                this.topButton();
                this.Tabs();
                this.Swiper();
                this.Lazyload();
                this.openLayer();
                this._RandomImg();
                this._RollingText();
                this._Rollingimg();
            },
            _Todaypop: function() {
                var duration = 2; 
                var fadeAmount = 0.1;
                $(document).ready(function (){
                    var images = $("#slide img");
                    var numImages = images.size();
                    var durationMs = duration * 1000;
                    var imageTime = durationMs / numImages; 
                    var fadeTime = imageTime * fadeAmount; 
                    var visibleTime = imageTime  - (imageTime * fadeAmount * 2);
                    var animDelay = visibleTime * (numImages - 1) + fadeTime * (numImages - 2);
                    
                    images.each( function( index, element ){
                        if(index != 0){
                            $(element).css("opacity","0");
                            setTimeout(function(){
                            doAnimationLoop(element,fadeTime, visibleTime, fadeTime, animDelay);
                            },visibleTime*index + fadeTime*(index-1));
                        }else{
                            setTimeout(function(){
                            $(element).animate({opacity:0},fadeTime, function(){
                                    setTimeout(function(){
                                    doAnimationLoop(element,fadeTime, visibleTime, fadeTime, animDelay);
                                    },animDelay )
                                });
                            },visibleTime);
                        }
                    });
                });
                function doAnimationLoop(element, fadeInTime, visibleTime, fadeOutTime, pauseTime){
                  fadeInOut(element,fadeInTime, visibleTime, fadeOutTime ,function(){
                    setTimeout(function(){
                      doAnimationLoop(element, fadeInTime, visibleTime, fadeOutTime, pauseTime);
                    },pauseTime);
                  });
                }
                function fadeInOut( element, fadeIn, visible, fadeOut, onComplete){
                  return $(element).animate( {opacity:1}, fadeIn ).delay( visible ).animate( {opacity:0}, fadeOut, onComplete);
                }
            },
            _layerPopCookies: function() {
                function setCookies( name, value, expiredays ) { 
                    var todayDate = new Date(); 
                    todayDate.setDate( todayDate.getDate() + expiredays );
                    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
                }
                var cookiedata = document.cookie;
                for (i = 0; i < 2; i++){
                    if (cookiedata.indexOf("_layerpop" + i + "=done") < 0) {
                        document.getElementById("_layerpop" + i).style.display = "show";
                    } else {
                        document.getElementById("_layerpop" + i).style.display = "none";
                    }
                }
                function popClose(id) {
                    document.getElementById("_layerpop" + id).style.display = "none";
                }
                function popTodayClose(id){
                    if (document.getElementById("chkbox" + id).checked) {
                        setCookies("_layerpop" + id, "done", 1);
                    }
                    document.getElementById("_layerpop" + id).style.display = "none";
                    document.getElementById("chkbox" + id).checked = false;
                }
            },
            _EventLoad: function(){
                var qsctop = $('#etoosHead').offset().top + $('#etoosHead').outerHeight();
                var qhstop = $('#etoosHead').offset().top;
                var qhastop = $('#etoosHead').offset().top + $('.side_list').height();
                $('#quickSearch, #search_lay, .nav_sub_area').css('top', qsctop+'px');
                $('#_asideCard').css('top', qhstop + 'px');
                $('#search_lay .search_best ol').clone().appendTo('#search_lay .sealbox > div');
                $('.today_banner').css({'top': qhastop + 'px', 'opacity':1});
                var laysealscbon = $('#search_lay .sealbox > div');
                laysealscbonsetInv();
                function layseatopbon(){laysealscbon.find('ol').animate({top:"-26px"},400,function(){laysealscbon.find('ol').css({'top':'0'}).append(laysealscbon.find('li').eq(0));});}
                function laysealscbonsetInv(){
                    setInterval(function(){ layseatopbon(); }, 2000);
                }
                laysealscbon.find('a').mouseenter(function(){
                    clearInterval(function(){ layseatopbon(); }, 2000);
                    $('#search_lay .search_best > div').show();
                }).mouseleave(function(){

                });
                $('#search_lay .search_best > div').mouseenter(function(){
                    $('#search_lay .search_best > div').show();
                }).mouseleave(function(){
                    $('#search_lay .search_best > div').hide();
                });
            },
            _RandomImg: function (){
                var image = new Array ();
                image[0] = "https://img.etoos.com/enp/front/resource/images/main/banner_allplan_teacher01.png";
                image[1] = "https://img.etoos.com/enp/front/resource/images/main/banner_allplan_teacher02.png";
                var size = image.length
                var x = Math.floor(size*Math.random())
                $('.random_img').attr('src',image[x]);
            },
            _RollingText: function(){
                function rolling_rank() {
                    setTimeout(function(){
                        $('.notice_list li:first').animate( {marginTop: '-23px'}, 500, function()
                        {
                            $(this).detach().appendTo('ul.notice_list').removeAttr('style');
                        });
                        rolling_rank();
                    }, 3000);
                };
                rolling_rank();   
            },
            _Rollingimg: function(){
                var duration = 1000, 
                activeIndex = 0;
                function activateNext() {
                    var boxes = $('.img_box > img');
                    boxes.addClass('hide').eq(activeIndex).removeClass('hide');
                    if (++activeIndex >= boxes.length) activeIndex = 0;
                    setTimeout(function() {
                        activateNext(activeIndex);
                    }, duration)
                }
                activateNext()
            },
            _assignElements: function() {
                this._EtoosNavWrap = $(".common_nav_bar");
                this._EtoosNavMain = this._EtoosNavWrap.find(".common_nav_menu");
                this._EtoosNavTopMenu = this._EtoosNavMain.find(".nav_mn");
                this._EtoosAsideBar = $('#_asideCard');
                this._EtoosQuickSearch = $('.search_mn');
                this._EtoosSearchLay = $('.searchlay');
            },
            _attachEventHandlers: function() {
                this._EtoosNavTopMenu.on("mouseenter", $.proxy(this._onMouseenterTopMenu, this));
                this._EtoosNavTopMenu.on("mouseleave", $.proxy(this._onMouseleaveTopMenu, this));
                //this._EtoosNavTopMenu.on("click", ".nav_top_lnk", $.proxy(this._onClickNavTopLink, this));
                this._EtoosQuickSearch.on('click', '.class_search', $.proxy(this._onClickToggle, this));
                this._EtoosSearchLay.on('click', $.proxy(this._onClickShowSearch, this));
            },
            _onMouseenterTopMenu: function(e) {
                var EtoosTarget = $(e.currentTarget);
                this._showNavSubMenu(EtoosTarget);
            },
            _onMouseleaveTopMenu: function(e) {
                this._hideNavSubMenu();
            },
            _onClickNavTopLink: function(e) {
                e.preventDefault();
                var EtoosTarget = $(e.currentTarget);
                var EtoosTargetList = EtoosTarget.parent();
                if (this._bMouseOver) {
                    return;
                }
                if (EtoosTargetList.hasClass("on")) {
                    this._hideNavSubMenu();
                    EtoosTarget.attr("aria-expanded", "false");
                } else {
                    this._hideNavSubMenu();
                    this._showNavSubMenu(EtoosTargetList);
                    EtoosTarget.attr("aria-expanded", "true");
                    EtoosTargetList
                        .siblings()
                        .find(".nav_top_lnk")
                        .attr("aria-expanded", "false");
                }
            },
            _onClickToggle: function(e) {
                e.preventDefault();
                $("#_asideCard .side_list li.active a").trigger("click");
                var EtoosTarget = $(e.currentTarget),
                EtoosTargetList = EtoosTarget.parent().find('.search_cont'),
                EtoosSlink = $('.search_area'),
                curHeight = EtoosTargetList.height(),
                autoHeight = EtoosTargetList.css('height', 'auto').height();
                EtoosTargetList
                .toggleClass('open');
                if( curHeight === 0 ){
                    EtoosTargetList.height(curHeight).animate({height: autoHeight}, 200, function(){
                        $(this).css({'height':'auto'});
                    });
                    EtoosSlink.removeClass('open');
                }else{
                    EtoosTargetList.animate({height: 0}, 200);
                }
                this._showCheckToggle();
            },
            _showCheckToggle: function() {
                $('.jq_tabonoff_auto>.jq_cont div:first-child').css('display', 'block');
                $('.jq_tabonoff_auto>.jq_tab li:first-child').addClass('on');
                $('.jq_tabonoff').delegate('.jq_tab>li', 'click', function() {
                    $('.tab_quick_cont').show();
                    $('.sel_option').contents().find('label').removeClass('check_on2');
                    $('.sel_option').contents().find('label').removeClass('check_on');
                    var index = $(this).parent().children().index(this);
                    $(this).siblings().removeClass('on');
                    $(this).addClass('on');
                    $(this).parent().next('.jq_cont').children().hide().eq(index).show();
                    $('.quick_search_intro').css('display', 'none');
                });
                //체크박스
                $('.quick_check_label').click(function() {
                    $(this).toggleClass('check_on');
                });
                $('.jq_inp_check').click(function() {
                    $(this).siblings().toggleClass('check_on2');
                });
            },
            _onClickShowSearch: function(e){
                e.preventDefault();
                $("#_asideCard .side_list li.active a").trigger("click");
                var EtoosSlink = $('.search_area'),
                    EtoosTargetList = $('.quick_search .search_cont');
                EtoosSlink
                .toggleClass('open');
                if(EtoosTargetList.hasClass('open')){
                    EtoosSlink.addClass('open');
                    EtoosTargetList
                    .removeClass('open')
                    .animate({height: 0}, 200);
                }else{
                    EtoosSlink.addClass('open');
                }
                $(".layerclose").on('click',function(){
                    EtoosSlink.removeClass('open');
                });
            },
            _showNavSubMenu: function(EtoosCurrent) {
                var bAppend = EtoosCurrent.data("append") === "complete" ? true : false;
                EtoosCurrent
                    .addClass("on")
                    .siblings()
                    .removeClass("on");
                EtoosCurrent
                    .find(".nav_sub_area")
                    .attr("aria-hidden", "false")
                    .end()
                    .siblings()
                    .find(".nav_sub_area")
                    .attr("aria-hidden", "true");
                this._EtoosAsideBar.addClass("off");
                if (bAppend) {
                    return;
                }
            },
            _hideNavSubMenu: function(e) {
                var EtoosCurrent = this._EtoosNavTopMenu.filter(".on");
                EtoosCurrent.find(".nav_sub_area").attr("aria-hidden", "true");
                EtoosCurrent.removeClass("on");
                this._EtoosAsideBar.removeClass("off");
            },
            _AsideMenu: function() {
                var isEventActive = false;
                var pannelVar = "event";
                var EtoosTargetList = $('.quick_search .search_cont'),
                    EtoosSlink = $('.search_area');
                $("._tabconts").hide();
                $(".side_list li a").click(function(e){
                    var eventMoveNum = $(".list_box").innerWidth();
                    e.preventDefault();
                    var clickPannel = $(this).parent().attr("rel");
                    $("._tabconts").hide();
                    $("." + clickPannel).fadeIn(300);
                    if (EtoosTargetList.hasClass('open')) {
                        $(".nav_search").find(".class_search").trigger("click");
                    }
                    if (EtoosSlink.hasClass('open')) {
                        $("#search_lay").find(".layerclose").trigger("click");
                    }
                    $(this).parent().addClass('active').siblings().removeClass('active');
                    if( isEventActive == false){
                        if(pannelVar != clickPannel){
                            pannelVar = clickPannel;
                        }
                        $(".common_aside").css({'position':'absolute'}).addClass('open').animate({left: 0},200, function(){
                            isEventActive = true;
                        });
                    }
                    else{
                        if(pannelVar == clickPannel){
                            $(this).parent().removeClass('active');
                            $(".common_aside").css({'position':'absolute'}).removeClass('open').animate({left: '-' + eventMoveNum},200,function(){
                                isEventActive = false;
                            });
                        }
                        else{
                            pannelVar = clickPannel;
                        }
                    }
                });
            },
            siteLink: function() {
                $("#etoosFoot .site_link .btn_tooltip").on('click', function() {
                    $(this).parents('.site_link').toggleClass('on');
                });
            },
            serviceList: function() {
                var $button = $("#etoosFoot .box_service .btn_toggle");
                var $tabModule = $("#etoosFoot .box_service .wrap_cont").find('.module_tab');
                var $tabButton = $tabModule.find(".btn_tab");

                $button.on('click', function() {
                    var idx = $tabModule.find('.tab_navi li').index();
                    if ($button.hasClass('on')) {
                        $tabModule.find('.tab_panel .on').removeClass('on');
                        $button.removeClass('on');
                    } else {
                        $tabModule.find('.tab_panel .panel').eq(idx).addClass('on');
                        $button.addClass('on');
                    }
                });
                $tabButton.on('click', function() {
                    if (!$button.hasClass('on')) {
                        $button.addClass('on');
                    }
                });
            },
            topButton: function() {
                $(window).scroll(function() {
                    if ($(this).scrollTop() > 500) {
                        $('#etoosFoot .btn_top').addClass('on');
                    } else {
                        $('#etoosFoot .btn_top').removeClass('on');
                    }
                });

                $('#etoosFoot .btn_top').click(function() {
                    $('html, body').animate({
                        scrollTop : 0
                    }, 400);
                    return false;
                });
            },
            Tabs: function () {
                $(".module_tab").find(".tab_navi .btn_tab").on("click", function() {
                    var idx = $(this).parents("li").index();
                    var tab = $(this).parents(".module_tab");
                    var navi = tab.find(".tab_navi");
                    var panel = tab.find(".tab_panel");
                    navi.find("li").removeClass("on");
                    panel.find(".panel").removeClass("on");
                    navi.find("li").eq(idx).addClass("on");
                    panel.find(".panel").eq(idx).addClass("on");
                });
            },
            Swiper: function () {
                $('.full_service .table .swiper-container').each(function(idx, el) {
                    var options = {
                        direction: 'vertical',
                        speed: 300,
                        loop: true,
                        simulateTouch: false,
                        touchReleaseOnEdges: false,
                        slidesPerView: 3,
                        spaceBetween: 0,
                        slidesPerGroup: 3,
                        autoplay: {
                            delay: 5000,
                            disableOnInteraction: false,
                        },
                    };
                    var slider = new Swiper('.full_service .table .swiper-container', options);
                });
                $('.box_slider.main_banner .swiper-container').each(function() {
                    var options = {
                        direction: 'vertical',
                        calculateHeight:true,
                        loop: true,
                        slidesPerView: 1,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        autoplay: {
                            delay: 3000,
                            disableOnInteraction: false,
                        }
                    };
                    var slider = new Swiper('.box_slider.main_banner .swiper-container', options);
                    $(".box_slider.main_banner .swiper-container").hover(function() {
                        (this).swiper.autoplay.stop();
                    }, function() {
                        (this).swiper.autoplay.start();
                    });
                });
                $('.box_slider.fixed_banner .swiper-container').each(function() {
                    var options = {
                        direction: 'vertical',
                        calculateHeight:true,
                        loop: true,
                        slidesPerView: 1,
                        simulateTouch: false,
                        touchReleaseOnEdges: false,
                        autoplay: {
                            delay:5000,
                            disableOnInteraction: true,
                        }
                    };
                    var slider = new Swiper('.box_slider.fixed_banner .swiper-container', options);
                    $(".box_slider.fixed_banner .swiper-container").hover(function() {
                        (this).swiper.autoplay.stop();
                    }, function() {
                        (this).swiper.autoplay.start();
                    });
                });
                $('.box_slider.lecture .swiper-container').each(function(idx, el) {
                    $(this).addClass('separator_lecture' + idx);
                    $(this).find('.swiper-pagination, .swiper-button-prev, .swiper-button-next').addClass('separator_lecture' + idx);
                    var options = {
                        direction: 'horizontal',
                        speed: 300,
                        loop: false,
                        simulateTouch: true,
                        touchReleaseOnEdges: true,
                        slidesPerView: 5,
                        spaceBetween: 10,
                        slidesPerGroup: 5,
                        navigation: {
                            nextEl: '.swiper-button-next.separator_lecture' + idx,
                            prevEl: '.swiper-button-prev.separator_lecture' + idx,
                        },
                        pagination: {
                            el: '.swiper-pagination.separator_lecture' + idx,
                            clickable: true,
                        },
                    };
                    var slider = new Swiper('.box_slider.lecture .swiper-container.separator_lecture' + idx, options);
                });
                $('.box_slider.promo .swiper-container').each(function(idx, el) {
                    $(this).addClass('separator_promo' + idx);
                    $(this).find('.swiper-pagination, .swiper-button-prev, .swiper-button-next').addClass('separator_promo' + idx);
                    var options = {
                        direction: 'horizontal',
                        speed: 300,
                        loop: true,
                        simulateTouch: true,
                        touchReleaseOnEdges: true,
                        slidesPerView: 3,
                        spaceBetween: 10,
                        slidesPerGroup: 1,
                        loopFillGroupWithBlank: true,
                        navigation: {
                            nextEl: '.swiper-button-next.separator_promo' + idx,
                            prevEl: '.swiper-button-prev.separator_promo' + idx,
                        },
                        pagination: {
                            el: '.swiper-pagination.separator_promo' + idx,
                            clickable: true,
                        },
                        autoplay: {
                            delay: 2500,
                            disableOnInteraction: false,
                        }
                    };
                    var slider = new Swiper('.box_slider.promo .swiper-container.separator_promo' + idx, options);
                });
                $('.box_slider.review .swiper-container').each(function(idx, el) {
                    $(this).addClass('separator_review' + idx);
                    $(this).find('.swiper-pagination, .swiper-button-prev, .swiper-button-next').addClass('separator_review' + idx);
                    var options = {
                        direction: 'horizontal',
                        speed: 300,
                        loop: false,
                        simulateTouch: true,
                        touchReleaseOnEdges: true,
                        slidesPerView: 5,
                        spaceBetween: 10,
                        slidesPerGroup: 5,
                        navigation: {
                            nextEl: '.swiper-button-next.separator_review' + idx,
                            prevEl: '.swiper-button-prev.separator_review' + idx,
                        },
                        pagination: {
                            el: '.swiper-pagination.separator_review' + idx,
                            clickable: true,
                        },
                    };
                    var slider = new Swiper('.box_slider.review .swiper-container.separator_review' + idx, options);
                });
                $('.box_slider.tcc .swiper-container').each(function(idx, el) {
                    $(this).addClass('separator_tcc_col4' + idx);
                    $(this).find('.swiper-pagination, .swiper-button-prev, .swiper-button-next').addClass('separator_tcc_col4' + idx);
                    var options = {
                        direction: 'horizontal',
                        speed: 300,
                        loop: true,
                        simulateTouch: true,
                        touchReleaseOnEdges: true,
                        slidesPerView: 4,
                        spaceBetween: 10,
                        slidesPerGroup: 1,
                        loopFillGroupWithBlank: true,
                        navigation: {
                            nextEl: '.swiper-button-next.separator_tcc_col4' + idx,
                            prevEl: '.swiper-button-prev.separator_tcc_col4' + idx,
                        },
                        pagination: {
                            el: '.swiper-pagination.separator_tcc_col4' + idx,
                            clickable: true,
                        },
                        autoplay: {
                            delay: 2500,
                            disableOnInteraction: true,
                        }
                    };
                    var slider = new Swiper('.box_slider.tcc .swiper-container.separator_tcc_col4' + idx, options);
                    $(".box_slider.tcc .swiper-container").hover(function() {
                        (this).swiper.autoplay.stop();
                    }, function() {
                        (this).swiper.autoplay.start();
                    });
                });
                $('.box_slider.video .swiper-container.col4').each(function(idx, el) {
                    $(this).addClass('separator_video_col4' + idx);
                    $(this).find('.swiper-pagination, .swiper-button-prev, .swiper-button-next').addClass('separator_video_col4' + idx);
                    var options = {
                        direction: 'horizontal',
                        speed: 300,
                        loop: false,
                        simulateTouch: true,
                        touchReleaseOnEdges: true,
                        slidesPerView: 4,
                        spaceBetween: 10,
                        slidesPerGroup: 4,
                        navigation: {
                            nextEl: '.swiper-button-next.separator_video_col4' + idx,
                            prevEl: '.swiper-button-prev.separator_video_col4' + idx,
                        },
                        pagination: {
                            el: '.swiper-pagination.separator_video_col4' + idx,
                            clickable: true,
                        },
                    };
                    var slider = new Swiper('.box_slider.video .swiper-container.separator_video_col4' + idx, options);
                });
                $('.box_slider.video .swiper-container.col5').each(function(idx, el) {
                    $(this).addClass('separator_video_col5' + idx);
                    $(this).find('.swiper-pagination, .swiper-button-prev, .swiper-button-next').addClass('separator_video_col5' + idx);
                    var options = {
                        direction: 'horizontal',
                        speed: 300,
                        loop: false,
                        simulateTouch: true,
                        touchReleaseOnEdges: true,
                        slidesPerView: 5,
                        spaceBetween: 10,
                        slidesPerGroup: 5,
                        navigation: {
                            nextEl: '.swiper-button-next.separator_video_col5' + idx,
                            prevEl: '.swiper-button-prev.separator_video_col5' + idx,
                        },
                        pagination: {
                            el: '.swiper-pagination.separator_video_col5' + idx,
                            clickable: true,
                        },
                    };
                    var slider = new Swiper('.box_slider.video .swiper-container.col5.separator_video_col5' + idx, options);
                });
                $('.box_slider.book .swiper-container').each(function(idx, el) {
                    $(this).addClass('separator_book' + idx);
                    $(this).find('.swiper-pagination, .swiper-button-prev, .swiper-button-next').addClass('separator_book' + idx);
                    var options = {
                        direction: 'horizontal',
                        speed: 300,
                        loop: false,
                        simulateTouch: true,
                        touchReleaseOnEdges: true,
                        slidesPerView: 7,
                        spaceBetween: 38,
                        slidesPerGroup: 7,
                        navigation: {
                            nextEl: '.swiper-button-next.separator_book' + idx,
                            prevEl: '.swiper-button-prev.separator_book' + idx,
                        },
                        pagination: {
                            el: '.swiper-pagination.separator_book' + idx,
                            clickable: true,
                        },
                    };
                    var slider = new Swiper('.box_slider.book .swiper-container.separator_book' + idx, options);
                });
                $('.box_academy .swiper-container').each(function(idx, el) {
                    $(this).addClass('separator_academy' + idx);
                    $(this).find('.swiper-pagination, .swiper-button-prev, .swiper-button-next').addClass('separator_academy' + idx);
                    var options = {
                        direction: 'horizontal',
                        speed: 0,
                        loop: false,
                        simulateTouch: false,
                        touchReleaseOnEdges: false,
                        navigation: {
                            nextEl: '.swiper-button-next.separator_academy' + idx,
                            prevEl: '.swiper-button-prev.separator_academy' + idx,
                        },
                        pagination: {
                            el: '.swiper-pagination.separator_academy' + idx,
                            clickable: true,
                        },
                        slidesPerView: 1,
                        spaceBetween: 0,
                    }
                    var slider = new Swiper('.box_academy .swiper-container.separator_academy' + idx, options);
                });
            },
            openLayer: function() {
                $(".openlayer").click(function(e){
                    e.preventDefault();
                    var showLayer = $(this).attr('rel')
                    $('body').find('#' + showLayer).show();
                });
                $(".popup_cont .pop_close").click(function(e){
                    e.preventDefault();
                    var popLayer = $(this).parent().attr('id')
                    $('body').find('#' + popLayer).hide();
                });
            },
            Lazyload: function(){
                if (window.NodeList && !NodeList.prototype.forEach) {
                    NodeList.prototype.forEach = function (callback, thisArg) {
                        thisArg = thisArg || window;
                        for (var i = 0; i < this.length; i++) {
                            callback.call(thisArg, this[i], i, this);
                        }
                    };
                }
                var images = document.querySelectorAll("[data-src]");
                var lazyLoad = function lazyLoad(target) {
                    var io = new IntersectionObserver(function (entries, observer) {
                        entries.forEach(function (entry) {
                            if (entry.isIntersecting) {
                                var img = entry.target;
                                var src = img.getAttribute("data-src");
                                img.setAttribute("src", src);
                                img.classList.add("loaded");
                                observer.disconnect();
                            }
                        });
                    });
                    io.observe(target);
                };
                images.forEach(lazyLoad);
            }
        }
        UI.init();
    });
    Etoos.externalCall = {
        swiperLecture: function(id) {
            $('#' + id + ' .swiper-container').each(function(idx, el) {
                $(this).find('.swiper-pagination, .swiper-button-prev, .swiper-button-next').addClass('separator_swiper' + idx);
                var options = {
                    direction: 'horizontal',
                    speed: 300,
                    loop: false,
                    simulateTouch: true,
                    touchReleaseOnEdges: true,
                    slidesPerView: 5,
                    spaceBetween: 10,
                    slidesPerGroup: 5,
                    navigation: {
                        nextEl: '.swiper-button-next.separator_swiper' + idx,
                        prevEl: '.swiper-button-prev.separator_swiper' + idx,
                    },
                    pagination: {
                        el: '.swiper-pagination.separator_swiper' + idx,
                        clickable: true,
                    },
                };
                var slider = new Swiper('#' + id + ' .swiper-container', options);
            });
        }
    };
})(jQuery);
