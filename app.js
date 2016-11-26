var express = require('express');
var app = express();

app.set('views', __dirname + '/public/');
app.set('view engine', 'ejs');

function getContent(item) {
    switch (item) {
        case 'item1': return 'item 2 content ....';
        case 'item2': return 'item 2 content ....';
        case 'item3': return 'item 3 content ....';
        case 'item4': return 'item 4 content ....';
    }
    return null;
}

var exampleMatcher = /^\/(local|ajax|ajax-working)\/?$/;
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.get(exampleMatcher, (req, res) => res.render('test.ejs', { example: req.path.match(exampleMatcher)[1], content: "" }) );
app.get('/history.js', (req, res) => res.sendFile(__dirname + '/public' + req.path));
app.get('/local/load.js', (req, res) => res.sendFile(__dirname + '/public/loadViaLocal.js') );
app.get('/ajax/load.js',  (req, res) => res.sendFile(__dirname + '/public/loadViaAjax.js') );
app.get('/ajax-working/load.js', (req, res) => res.sendFile(__dirname + '/public/loadViaAjax-Working.js') );

app.get('/ajax/:item', function (req, res, next) {
    var content = getContent(req.params.item);
    if (!content) return next();
    res.send('AJAX <br />' + content);
});

app.get('/ajax-working/:item', function (req, res, next) {
    var isAjax = req.query.ajax;
    var content = getContent(req.params.item);
    if (!content) return next();

    if (isAjax === '1') {
        res.send('AJAX <br />' + content);
    } else {
        res.render('index.ejs', { example: "ajax-working", content: "SERVER TEMPLATE<br />" + content });
    }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});