var httpProxy = require('http-proxy'),
    request = require('request'),
    fs = require('fs'),
    baseUrl = process.argv.splice(2)[0] || 'http://192.168.1.127:8000',
    proxy,
    port = 8005;

require('node-fs');


console.log('Please visit http://localhost:' + port + ' .');
console.log('All requests will be redirected to ' + baseUrl + ' .');
console.log('Please check output/ directory for saved files');

proxy = httpProxy.createServer({
    target: baseUrl
});

proxy.listen(port);

//
// Listen for the `error` event on `proxy`.
proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });

    res.end('Something went wrong. And we are reporting a custom error message.');
});

//
// Listen for the `proxyRes` event on `proxy`.
//
proxy.on('proxyRes', function (proxyRes, req, res) {
    console.log(req.url);

    var url = req.url,
        folder, file;
    url = url.split('?')[0];
    url = url.split('#')[0];
    if (url === '/') {
        url = '/index.html';
    }

    folder = url.substr(0, url.lastIndexOf('/'));
    folder = __dirname + '/output' + folder;
    file = __dirname + '/output' + url;

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, null, true);
    }

    try {
        request(baseUrl + req.url).pipe(fs.createWriteStream(file));
    } catch (e) {
        console.log(e);
    }
});