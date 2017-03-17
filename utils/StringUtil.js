var StringUtil = {

    outerUrlAssemble: function(number) {
        return "http://www.qcsanbao.cn/webqcba/DVMProducerServlet?method=getWhereList&p=" + (number + 1);
    },
    innnerUrlAssemble: function(aut, bran, ver, tpn) {
        return "http://www.qcsanbao.cn/webqcba/CarModelsServlet?method=getCarModels&author=" + encodeURIComponent(aut) + "&brand=" + encodeURIComponent(bran) + "&vehiceSeries=" + encodeURIComponent(ver) + "&typeName=" + encodeURIComponent(tpn);
    },
    finalUrlAssemble: function(href) {
        return "http://www.qcsanbao.cn/webqcba/" + href;
    }
};

module.exports = StringUtil;
