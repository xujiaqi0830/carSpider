function compare() {
    var ckbarr = document.getElementsByName('ckb');
    var temp = 0;
    var strid = "";
    var authorid = "";
    for (var i = 0; i < ckbarr.length; i++) {
        //alert(ckbarr[i].value);
        if (ckbarr[i].checked == true) {
            temp += 1;
            strid += ckbarr[i].value + ",";
            authorid += document.getElementById(ckbarr[i].value).value + ",";
        }
    }
    if (temp < 1) {
        alert('求至少选择一条记录！');
    } else if (temp > 2) {
        alert('最多选择2条记录！');
    } else if (temp == 1) {
        alert('请选择另一条对比记录！');
    } else {
        var strids = strid.substring(0, strid.length - 1);
        var authorids = authorid.substring(0, authorid.length - 1);
        //alert(strids+"      "+authorids);
        window.location.href = "ThreeServlet?method=getCompareTree&strids=" + strids + "&authorids=" + authorids + "";
    }

}

function ckchange(val) {
    alert(val);
    document.getElementById("str").value = val;
}

function disback() {
    if ('' == '0') {
        document.getElementById("backobj").style.display = 'none';
    }
}

function toqualityClause(author, qualityClauseNameID) {
    window.location.href = "ThreeServlet?method=getThree&author=" + encodeURIComponent(author) + "&qualityClauseName=" + encodeURIComponent(qualityClauseNameID) + "";
}


function openMode(url, width, height) {
    var ie6 = navigator.appVersion.indexOf('MSIE 6');
    if (ie6 != -1 && ie6 < 20) {
        height = parseInt(height) + 49;
    }
    var strModalInfo = "dialogWidth:" + width + "px;dialogHeight:" + height +
        "px;help:no;resizable:no;status:no;scroll:yes;";
    strModalInfo += "center:yes;";
    var returnValue = window.showModalDialog(url, window, strModalInfo);
    return returnValue;
}

function tocount(urls) {
    openMode(urls, '700px', '350px');
    //window.open(urls);
}
