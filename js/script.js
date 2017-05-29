$(function () {
    $('.slick').slick({
        dots: false,
        arrows: true,
        infinite: false,
        rtl: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: true,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    arrows: true,
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
    });

    $('#button1').on('click', function () {
        $('#button2').show();
    });
    $('#button2').on('click', function (e) {
        e.preventDefault();
        $('#button1').hide();
        $('#button2').hide();
        $('#image-container').show();
        imageContainerRender();
        loadImages();
    });

    // $('.slider-item').on('click', function (e) {
    //     e.preventDefault();
    //     console.log(this.data);
    // });

    $('.slide').each(function () {
        var $this = $(this);
        $this.on("click", function (e) {
            e.preventDefault();
            var slideNum = $this.data().slide;
            $('#brightness').hide();
            showImage(slideNum);
        });
    });
    $('.question').each(function () {
        var $this = $(this);
        $this.on("click", function (e) {
            e.preventDefault();
            var questionNum = $this.data().question;
            $('.modal').hide();
            $('#modal' + questionNum).show();
        });
    });
    $('.close').on('click', function () {
        $('.modal').hide();
    });
    $(window).resize(function (e) {
        // console.log(e);
        resizeContainer();
    });
    // $('#image-container').on('click', function () {
    //     resetAnchors();
    // });

    var slider = document.getElementById('brightness');
    slider.onchange = function() {
        changBrightness(slider.value);
    };
});