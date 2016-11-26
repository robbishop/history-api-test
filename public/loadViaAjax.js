var load = function (url) {
    $.get(url).done(function (data) {
        $("#content").html(data);
    })
};