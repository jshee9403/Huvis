$(document).ready(function (){
	/* indicator 메뉴 슬라이딩 */
	var $menu=$("#indicator ul li");
	var $cnt=$("#content article");
	var headHei=$("#header").outerHeight()+100;	
	//상단으로 100만큼 추가 여백제공, 만약 $cnt 상단에 header가 fixed 속성으로 고정되어 있지 않다면 불필요
	//console.log(headHei);

	//첫번째 li.list1에 on 추가
	$menu.eq(0).addClass("on");

	//1) click
	$menu.children().on("click",function  () {
		//class 제어
		$(this).parent().addClass("on").siblings().removeClass("on");
		//animate
		var tg=$(this).attr("href");
		var posY=$(tg).offset().top-headHei;
		console.log(tg, posY);

		$(window).off("scroll");
		$("html, body").animate({scrollTop:posY}, 400, function  () {
			$(window).on("scroll", scrollMove);
		});
		
		return false;
	});

	//2) scroll
	$(window).on("scroll", scrollMove);

	function scrollMove () {
		var scrollY=$(window).scrollTop();
		//console.log(scrollY);

		$cnt.each(function  (idx) {
			if (scrollY>=$(this).offset().top-headHei) $menu.eq(idx).addClass("on").siblings().removeClass("on");
			else if (scrollY == $(document).height()-$(window).height()) $menu.eq(-1).addClass("on").siblings().removeClass("on");
		});
	}

	/* PRODUCTS :click 활성화 */
	var $list=$(".prodcut_list > li");

	$list.hover(
		function  () {	//mouseenter
			$(this).addClass("on");
		},
		function  () {	//mouseleave
			$(this).removeClass("on");
		}
	);

	$list.find("button").on("click",function  () {
		$(this).closest("li").addClass("on").siblings().removeClass("on");
	});

	$list.on("focusout",function  () {
		var tg=$(this);
		setTimeout(function  () {
			if (!tg.find("a").is(":focus")) {
				tg.removeClass("on");
			}
		})
	});


	//생활속 휴비스 탭브라우징
	$("#storyTab .tab:first-of-type, #storyTab .tabpanel:first-of-type").addClass("active");
    $("#storyTab .tab:first-of-type").attr({tabIndex: 0, "aria-selected": true}).addClass("active");
    $("#storyTab .tabpanel:first-of-type").attr({tabIndex: 0, "aria-hidden": false});

    $(".tab").on("keydown", function(e){

        var key = e.keyCode;
        console.log(key); //37 39   32 13

        switch(key){
            case 37:
                $(this).attr({tabIndex: -1, "aria-selected": false});
                if($(this).hasClass("first")) {
                    $(this).siblings(".last").attr({tabIndex: 0, "aria-selected": true}).focus();
                } else {
                    $(this).prev().attr({tabIndex: 0, "aria-selected": true}).focus();
                }
                break;
            case 39:
                $(this).attr({tabIndex: -1, "aria-selected": false});

                if($(this).hasClass("last")) {
                    $(this).siblings(".first").attr({tabIndex: 0, "aria-selected": true}).focus();
                } else {
                    $(this).next().attr({tabIndex: 0, "aria-selected": true}).focus();
                }
				break;
			case 36:
				e.preventDefault();
				$(this).siblings('.first').focus();
				break;
			case 35:
				e.preventDefault();
				$(this).siblings('.last').focus();
				break;
            case 32:
            case 13:
                var $tg = $(this);
                tabPan($tg);
        }

    });

    $(".tab").on("click", function(){
        var $tg = $(this);
        tabPan($tg);
    })


    function tabPan($target){
        $("#" + $target.attr("aria-controls")).attr({tabIndex: 0, "aria-hidden": false}).addClass("active").siblings(".tabpanel").removeClass("active").attr({tabIndex: -1, "aria-hidden": true});

        $($target).addClass("active").attr({tabIndex: 0, "aria-selected": true}).siblings(".tab").removeClass("active").attr({tabIndex: -1, "aria-selected": false});
    }


    //생활속휴비스 탭패널 클릭 팝업창열기
    var popupArr = new Array(3);
    popupArr[0] = "https://www.youtube-nocookie.com/embed/GXm9FPp5Vak?rel=0&amp;showinfo=0";
    popupArr[1] = "https://www.youtube.com/embed/Yzl5pLwSqwg?rel=0&showinfo=0";
    popupArr[2] = "https://www.youtube.com/embed/vj_dzmE_Qek?rel=0";
   
    $("#storyTab .tabpanel button").on("click", function(){

        //var btnNum = $(this).closest(".tabpanel").attr("id").slice(8)-1;
        var btnNum = $(this).data("index");
        var leftPos = (screen.availWidth - 853)/2;
        var topPos = (screen.availHeight - 480)/2;
        window.open(popupArr[btnNum-1], "popup" , "left=" + leftPos + ", top=" + topPos + "width=853, height=480");

    });
});