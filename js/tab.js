$(document).ready(function(){

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