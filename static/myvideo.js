$(document).ready(function() {
    $.ajax({
        url: 'https://tik-video.github.io/news/video_list.json',
        success:function(resp){
            //请求成功
            video_list = resp
            console.log(resp)
            video_list.forEach(element => {
                rec_id = 'rec_' + element.img.split('.')[0].split('/').pop()
                new_ele = $(".recommend-item:first").clone()
                new_ele.attr('id', rec_id).appendTo(".recommend")
                $('#' + rec_id + ' .rec-img img').attr('src', 'https://tik-video.github.io/news' + element.img)
                $('#' + rec_id + ' .rec-title').text(element.title)
            });
            $(".recommend-item:first").addClass('high')
        },
        error:function(){
            //请求出错
        },
        complete:function(){
            //请求完成
        }
    });
    var i = 0
    function nextVideo() {
        i ++;
        if(i > video_list.length){
            i = 0
        }
        pl.src('https://tik-video.github.io/news/' + video_list[i].video)
        // $('video').setAttribute('src', video_list[i].video)
    }
    function preVideo() {
        i --;
        if(i < 0){
            i = video_list.length - 1
        }
        pl.src('https://tik-video.github.io/news/' + video_list[i].video)
    }
    
    pl = videojs('my-player', {
        height: 600,
        width: 600,
        playbackRates: [0.8, 1, 1.2],
    }, function() {
        this.on('ended', function() {
            nextVideo()
        });
        this.on('error', function() {
            console.log('not supported.');
            nextVideo()
        })
    });
    $('.next').click(() => nextVideo())
    $('.pre').click(() => preVideo())
    
    isWork = true;
    $(document).keydown( function(event) {
        console.log(event.keyCode);
        if(isWork){
            $('.back').removeClass('high');
            $('.work').removeClass('high');
        }
    });
    
    $('.back').click(function() {
        $('.back').addClass('high');
        $('.work').addClass('high');
    });
})