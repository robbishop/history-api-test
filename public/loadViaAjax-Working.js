var load = function (url) {
    $.get(url + "?ajax=1").done(function (data) {
        $("#content").html(data);
    })
};