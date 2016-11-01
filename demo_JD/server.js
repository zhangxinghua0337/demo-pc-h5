/*服务启动图片资源得不到加载还存在缺陷*/
var http = require("http"),
    url = require("url"),
    fs = require("fs");
var server = http.createServer(function (req, res) {
    var pathname = url.parse(req.url,true).pathname;
    var reg = /\.([a-z]+)/i;
    if (reg.test(pathname)) {
        //->处理静态资源文件
        var suffix = reg.exec(pathname)[1].toUpperCase(),
            suffixMIME = 'text/plain';
        switch (suffix) {
            case "HTML":
                suffixMIME = "text/html";
                break;
            case "CSS":
                suffixMIME = "text/css";
                break;
            case "JS":
                suffixMIME = "text/javascript";
                break;
            case "PNG":
                suffixMIME = "image/png";
                break;
            case "JPEG":
                suffixMIME = "image/jpeg";
                break;
            case 'JPG':
                suffixMIME = 'image/jpeg';
                break;
            case "GIF":
                suffixMIME = "image/gif";
                break;
            case "BMP":
                suffixMIME = " application/x-MS-bmp";
                break;
            case "SVG":
                suffixMIME = "image/svg+xml";
                break;
            case "ICON":
                suffixMIME = "image/x-icon";
                break;
            case "MP3":
                suffixMIME = "audio/mpeg";
                break;
            case "OGG":
                suffixMIME = "audio/ogg";
                break;
            case "WAV":
                suffixMIME = "audio/wav";
                break;
            case "MP4":
                suffixMIME = "video/mp4";
                break;
            case "WEBM":
                suffixMIME = "video/webm";
                break;
        }
        try {
            var conFile = fs.readFileSync('.' + pathname, 'utf-8');
            res.writeHead(200, {'content-type': suffixMIME + ';charset=utf-8'});
            res.end(conFile);
        } catch (ex) {
            res.writeHead(404);
            res.end('file is not Found!');
        }
        return;
    }
});
server.listen(61149, function () {
    console.log('server is success,listening on 8080 port!');
});
