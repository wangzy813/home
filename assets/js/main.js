var iUp = (function () {
		var t = 0,
			d = 150,
			clean = function () {
				t = 0;
			},
			up = function (e) {
				setTimeout(function () {
					$(e).addClass("up")
				}, t);
				t += d;
			},
			down = function (e) {
				$(e).removeClass("up");
			},
			toggle = function (e) {
				setTimeout(function () {
					$(e).toggleClass("up")
				}, t);
				t += d;
			};
		return {
			clean: clean,
			up: up,
			down: down,
			toggle: toggle
		}
	})();

	$(document).ready(function () {

		// 获取一言数据
		fetch('https://v1.hitokoto.cn').then(function (res) {
			return res.json();
		}).then(function (e) {
			$('#description').html(e.hitokoto + "<br/> -「<strong>" + e.from + "</strong>」")
		}).catch(function (err) {
			console.error(err);
		})

		/**
		 * 获取Bing每日壁纸
		 * 使用 CSS background-image 直接加载，无需 CORS 代理
		 * bing.img.run 会 302 重定向到 Bing 原图
		 */
		var $panel = $('#panel');
		/*
		 * 1920x1080.php - 今天的壁纸
		 * rand.php - 随机一张历史壁纸
		 * 这里使用今天的壁纸，每次页面加载自动获取最新
		 */
		$panel.css("background", "url('https://bing.img.run/1920x1080.php') center center no-repeat #666");
		$panel.css("background-size", "cover");

		// 背景图加载失败时使用降级渐变
		$('<img/>').attr('src', 'https://bing.img.run/1920x1080.php').on('error', function () {
			$panel.css("background", "#2c3e50 linear-gradient(135deg, #2c3e50 0%, #3498db 100%)");
		});

		$(".iUp").each(function (i, e) {
			iUp.up(e);
		});

		$(".js-avatar")[0].onload = function () {
			$(".js-avatar").addClass("show");
		}
	});

	$('.btn-mobile-menu__icon').click(function() {
	    if ($('.navigation-wrapper').css('display') == "block") {
	      $('.navigation-wrapper').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
	        $('.navigation-wrapper').toggleClass('visible animated bounceOutUp');
	        $('.navigation-wrapper').off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
	      });
	      $('.navigation-wrapper').toggleClass('animated bounceInDown animated bounceOutUp');

	    } else {
	      $('.navigation-wrapper').toggleClass('visible animated bounceInDown');
	    }
	    $('.btn-mobile-menu__icon').toggleClass('social iconfont icon-list social iconfont icon-angleup animated fadeIn');
	});
