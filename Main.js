// http://www.qcsanbao.cn/webqcba/DVMProducerServlet?method=getWhereList

var Promise = require("bluebird");
var constantUtil = require("./utils/ConstantUtil.js");
var stringUtil = require("./utils/StringUtil.js");
var cheerio = require("cheerio");
var fs = require("fs");
var superagent = require("superagent");
var request = require("sync-request");

// 外层页面url
var outerPageUrls = [];
// 外层页数
var pageNum = 0;
// 失败计数器
var outerErrNum = 0;
var innerErrNum = 0;
var finalErrNum = 0;

superagent.get(stringUtil.outerUrlAssemble(0))
    .end(function(err, res) {

        if (err) {
            console.log(err);
        }

        var $ = cheerio.load(res.text, {
            decodeEntities: false
        });
        var str = $(".dateTable .tableHeadBg").last().html();
        pageNum = parseInt(str.split("页&nbsp;")[0].split('1/')[1]);

        for (var i = 0; i < 2; i += 1) {
            outerPageUrls.push(stringUtil.outerUrlAssemble(i));
        }

        Promise.map(outerPageUrls, function(url) {

                console.log("正在爬取外层：" + url);
                var innerUrl;

                try {
                    var res = request('GET', url);
                    var $ = cheerio.load(res.getBody(), {
                        decodeEntities: false
                    });
                    var temp = $("#mytable a[name=tpc]").attr("href").split("(")[1].split(")")[0].substr(1);
                    var temp2 = temp.substring(0, temp.length - 1);
                    var tempArr = temp2.split("','");
                    innerUrl = stringUtil.innnerUrlAssemble(tempArr[0], tempArr[1], tempArr[2], tempArr[3]);
                } catch (err) {
                    console.log(err);
                    outerErrNum += 1;
                }

                return innerUrl;
            }, {
                // 外层并发数目
                concurrency: constantUtil.REQUEST_CONCURRENCY_OUTER
            })
            .then(function(urls) {

                Promise.map(urls, function(url) {
                        console.log("正在爬取内层：" + url);
                        var finalUrl;

                        try {
                            var res = request('GET', url);
                            var $ = cheerio.load(res.getBody(), {
                                decodeEntities: false
                            });
                            var temp = $("a[name=tpc]").attr("href");
                            finalUrl = stringUtil.finalUrlAssemble(temp);
                        } catch (err) {
                            console.log(err);
                            innerErrNum += 1;
                        }

                        return finalUrl;
                    }, {
                        // 内层并发数目
                        concurrency: constantUtil.REQUEST_CONCURRENCY_INNER
                    })
                    .then(function(urls) {
                        Promise.map(urls, function(url, index) {

                                console.log("正在爬取最终结果：" + url);

                                var html;
                                var txtStr = "";

                                try {
                                    var res = request('GET', url);
                                    html = res.getBody();
                                    // 生成html
                                    fs.writeFileSync(__dirname + "/pageDist/" + index + ".html", html, 'utf8');
                                    var $ = cheerio.load(html, {
                                        decodeEntities: false
                                    });

                                    // 生成txt
                                    var inner = $("td").each(function(index, ele) {
                                        if (index >= 8) {
                                            var tempStr = ($(this).html()).replace(/<p>|<\/p>|<strong>|<\/strong>/ig, "").trim();
                                            if (tempStr !== "其他配置信息") {
                                                txtStr += (tempStr + "\n");
                                            }
                                        }
                                    });
                                    fs.writeFileSync(__dirname + "/txtDist/" + index + ".txt", txtStr, 'utf8');

                                } catch (err) {
                                    console.log(err);
                                    finalErrNum += 1;
                                }

                                return html;
                            }, {
                                // 最终层并发数目
                                concurrency: constantUtil.REQUEST_CONCURRENCY_FINAL
                            })
                            .then(function() {
                                console.log("爬取完成!");
                                console.log("外层错误数：" + outerErrNum);
                                console.log("内层错误数：" + innerErrNum);
                                console.log("终层错误数：" + finalErrNum);
                            });
                    });
            });
    });
