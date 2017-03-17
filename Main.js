// http://www.qcsanbao.cn/webqcba/DVMProducerServlet?method=getWhereList

var Promise = require("bluebird");
var constantUtil = require("./utils/ConstantUtil.js");
var superagent = require('superagent');
var async = require("async");
// var superagentAsnyc = Promise.promisifyAll(require("superagent"));
var cheerio = require("cheerio");
var _ = require("lodash");
var fs = require("fs");
// var request = require("superagent-bluebird-promise");
// var requestAsync = Promise.promisifyAll(require("superagent-bluebird-promise"));

var listMissionUrls = {};
var pageNum;

superagent.get(constantUtil.LIST_PAGE_PREFIX_URL + "1")
    .end(function(err, res) {
        if (err) {
            console.log(err);
        }
        var $ = cheerio.load(res.text, {
            decodeEntities: false
        });
        var str = $(".dateTable .tableHeadBg").last().html();
        // 总页数
        pageNum = parseInt(str.split("页&nbsp;")[0].split('1/')[1]);

        for (var i = 0; i < pageNum; i += 1) {
            listMissionUrls[i + 1] = constantUtil.LIST_PAGE_PREFIX_URL + (i + 1);
        }

		var temp = JSON.stringify(listMissionUrls);
		fs.writeFileSync("./2nd/2nd.txt", temp, 'utf8');

    });
