var channels = ['lgamezzonel','freecodecamp','easportsfifa','bethesda','halo', 'OgamingSC2', 'nba', 'ubisoft', 'rockstar', '2kgames', 'EA','cdprojektred'];

var url = "https://api.twitch.tv/kraken/channels/";
var streams = "https://api.twitch.tv/kraken/streams/";

function getUrls() {
    for(var i=0; i<channels.length; i++){
        getAjax(url+channels[i]);
    }
}

function getStreams() {
    for(var i=0; i<channels.length; i++){
        getStatus(streams+channels[i]);
    }
}

function getAjax(url) {
    $.ajax({
        type:"GET",
        url:url,
        headers: {
            'Client-ID': 'axjhfp777tflhy0yjb5sftsil'
        },
        dataType: "json",
        success: function (data) {
            var descriptionText = data.status;
            var descriptionImg = data.profile_banner;
            var streamImg = data.logo;
            var localurl = data.url;


            $('.stream-board').append('<div class="stream-body">\n' +
                '            <div class="row justify-content-center">\n' +
                '                <div class="col-sm-2 col-md-1 col-lg-1"><img class="stream-img" src='+streamImg+' alt=""></div>\n' +
                '                <div class="col-sm-8 col-md-6 col-lg-6"><img class="description-img" src='+descriptionImg+' alt="">' +
                '<a href='+localurl+'>' +
                '<p class="description"> ' +
                ''+descriptionText+' ' +
                '</p></a>' +
                '</div>\n' +
                '                <div class="col-sm-2 col-md-1 col-lg-1"><p class="status"><span class="offline"></span></p></div>\n' +
                '            </div>\n' +
                '        </div>');

        },
        error: function (errorMessage) {
            console.log('Error')
        }
    });
}

function getStatus(streams) {
    $.ajax({
        type:"GET",
        url:streams,
        headers: {
            'Client-ID': 'axjhfp777tflhy0yjb5sftsil'
        },
        dataType: "json",
        success: function (data) {
            if(data.stream !== null){
                console.log(data);
                var descriptionText = data.stream.channel.status;
                var descriptionImg = data.stream.channel.profile_banner;
                var streamImg = data.stream.channel.logo;
                var localurl = data.stream.channel.url;

                $('.stream-board').append('<div class="stream-body">\n' +
                    '            <div class="row justify-content-center">\n' +
                    '                <div class="col-sm-2 col-md-1 col-lg-1"><img class="stream-img" src='+streamImg+' alt=""></div>\n' +
                    '                <div class="col-sm-8 col-md-6 col-lg-6"><img class="description-img" src='+descriptionImg+' alt="">' +
                    '<a href='+localurl+'>' +
                    '<p class="description"> ' +
                    ''+descriptionText+' ' +
                    '</p></a>' +
                    '</div>\n' +
                    '                <div class="col-sm-2 col-md-1 col-lg-1"><p class="status"><span class="online"></span></p></div>\n' +
                    '            </div>\n' +
                    '        </div>');
            }

        },
        error: function (errorMessage) {
            console.log('Error')
        }
    });
}

$(document).ready(function () {
    getStreams();
});
$('.all-channels').click(function () {
    $('.stream-board').html('');
    getStreams();
    getUrls();
});
$('.online-channels').click(function () {
    $('.stream-board').html('');
    getStreams();
});
$('.offline-channels').click(function () {
    $('.stream-board').html('');
    getUrls();
});
