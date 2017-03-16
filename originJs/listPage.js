	var ajax;

	function InitAjax() {
	    if (window.XMLHttpRequest) {
	        ajax = new XMLHttpRequest(); //FireFox、Opera等浏览器支持的创建方式非IE浏览建立ajax对象方法 IE8 9
	    } else {
	        ajax = new ActiveXObject("Microsoft.XMLHTTP"); //IE6浏览器支持的创建方式
	    }
	}

	//页面跳转固定下拉值
	function toval() {
	    if ('' != null) {
	        var roleval = document.getElementById("roleid");
	        roleval.value = '';
	    }
	    if ('' != null) {

	        var brand = document.getElementById("brand");
	        brand.value = '';
	    }

	}
	//点击行链接
	function trclick(author) {
	    window.location.href = "CarModelsServlet?method=getCarModels&author=" + author;
	}
	// 翻页链接状态
	function pageload() {
	    /* if('3'<=1){
			//document.getElementById("fpage").style.display = 'none';
			document.getElementById("upage").disabled='disabled';
			document.getElementById("upage").href='#';
			document.getElementById("upage").style.cursor="default";
		}
		if('3'>='756'){
			document.getElementById("npage").disabled='disabled';
			document.getElementById("npage").href='#';
			document.getElementById("npage").style.cursor="default";
			//document.getElementById("epage").style.display = 'none';
		}
 */
	}

	//传递车型品牌
	//查询车型系列
	function selver() {
	    InitAjax();
	    ajax.onreadystatechange = function() {
	        if (ajax.readyState == 4 && ajax.status == 200) {
	            var arr = ajax.responseText.split(",");
	            var seltps = document.getElementById("vehiceseries");
	            seltps.options.length = 1;
	            for (var i = 0; i < arr.length; i++) {
	                if (arr[i] != "") {
	                    seltps.options.add(new Option(arr[i], arr[i]));
	                }
	            }

	        }
	    };
	    var brand = document.getElementById("brand").value;
	    var url = "DVMProducerServlet?method=getVehiceSeries&brand=" + encodeURIComponent(brand);
	    ajax.open("GET", url, true); // true是异步请求
	    ajax.send(null);
	}

	function toselver() {
	    InitAjax();
	    ajax.onreadystatechange = function() {
	        if (ajax.readyState == 4 && ajax.status == 200) {
	            var varr = ajax.responseText.split(",");
	            var vseltps = document.getElementById("vehiceseries");
	            var seltps = document.getElementById("typename");
	            var seltpcos = document.getElementById("typecode");
	            var vst = '';
	            vseltps.length = 0;
	            seltps.length = 0;
	            seltpcos.length = 0;
	            vseltps.options.add(new Option("=请选择=", ""));
	            seltps.options.add(new Option("=请选择=", ""));
	            seltpcos.options.add(new Option("=请选择=", ""));
	            if (varr[0] != null && varr[0] != "") {
	                for (var v = 0; v < varr.length; v++) {
	                    if (varr[v] != "") {
	                        vseltps.options.add(new Option(varr[v], varr[v]));
	                    }
	                }
	                for (var vh = 0; vh < vseltps.length; vh++) {
	                    if (vseltps.options[vh].innerHTML == vst) {
	                        vseltps.options[vh].selected = true;
	                        tofortpn();
	                        break;
	                    }
	                }

	            }

	        }
	    };
	    var brand = document.getElementById("brand").value;
	    var url = "DVMProducerServlet?method=getVehiceSeries&brand=" + encodeURIComponent(brand);
	    ajax.open("GET", url, true); // true是异步请求
	    ajax.send(null);
	}
	/*
	 *通过车型系列
	 *查询车型名称
	 */
	function fortpn() {
	    InitAjax();
	    ajax.onreadystatechange = function() {
	        if (ajax.readyState == 4 && ajax.status == 200) {
	            var arr = ajax.responseText.split(",");
	            var seltps = document.getElementById("typename");
	            //seltps.options.length=0;
	            seltps.length = 0;
	            seltps.options.add(new Option("=请选择=", ""));
	            for (var i = 0; i < arr.length; i++) {
	                if (arr[i] != "") {
	                    seltps.options.add(new Option(arr[i], arr[i]));
	                }
	            }
	        }
	    };
	    var brand = document.getElementById("brand").value;
	    var vehiceseries = document.getElementById("vehiceseries").value;
	    var url = "DVMProducerServlet?method=getTpname&brand=" + encodeURIComponent(brand) + "&vehiceseries=" + encodeURIComponent(vehiceseries);
	    ajax.open("GET", url, true); // true是异步请求
	    ajax.send(null);
	}

	function tofortpn() {
	    InitAjax();
	    ajax.onreadystatechange = function() {
	        if (ajax.readyState == 4 && ajax.status == 200) {
	            var arr = ajax.responseText.split(",");
	            var seltps = document.getElementById("typename");
	            var st = '';
	            seltps.length = 0;

	            seltps.options.add(new Option("=请选择=", ""));

	            if (arr[0] != null && arr[0] != "") {
	                for (var i = 0; i < arr.length; i++) {
	                    if (arr[i] != "") {
	                        seltps.options.add(new Option(arr[i], arr[i]));
	                    }
	                }
	                for (var h = 0; h < seltps.length; h++) {
	                    if (seltps.options[h].innerHTML == st) {
	                        seltps.options[h].selected = true;
	                        toselcode();
	                        break;
	                    }
	                }
	            }
	        }
	    };
	    var brand = document.getElementById("brand").value;
	    var vehiceseries = document.getElementById("vehiceseries").value;
	    var url = "DVMProducerServlet?method=getTpname&brand=" + encodeURIComponent(brand) + "&vehiceseries=" + encodeURIComponent(vehiceseries);
	    ajax.open("GET", url, true); // true是异步请求
	    ajax.send(null);

	}
	// 查询车型型号
	function selcode() {
	    InitAjax();
	    ajax.onreadystatechange = function() {
	        if (ajax.readyState == 4 && ajax.status == 200) {
	            var arr = ajax.responseText.split(",");
	            var seltps = document.getElementById("typecode");
	            seltps.options.length = 1;
	            for (var i = 0; i < arr.length; i++) {
	                if (arr[i] != "") {
	                    seltps.options.add(new Option(arr[i], arr[i]));
	                }
	            }

	        }
	    };
	    var brand = document.getElementById("brand").value;
	    var vehiceseries = document.getElementById("vehiceseries").value;
	    var typename = document.getElementById("typename").value;
	    var url = "DVMProducerServlet?method=getTpcode&brand=" + encodeURIComponent(brand) + "&vehiceseries=" + encodeURIComponent(vehiceseries) + "&typename=" + encodeURIComponent(typename);
	    ajax.open("GET", url, true); // true是异步请求
	    ajax.send(null);
	}

	function toselcode() {
	    InitAjax();
	    ajax.onreadystatechange = function() {
	        if (ajax.readyState == 4 && ajax.status == 200) {
	            var coarr = ajax.responseText.split(",");
	            var coseltps = document.getElementById("typecode");
	            var cst = '';
	            coseltps.length = 0;
	            coseltps.options.add(new Option("=请选择=", ""));
	            if (coarr[0] != null && coarr[0] != "") {
	                for (var ci = 0; ci < coarr.length; ci++) {
	                    if (coarr[ci] != "") {
	                        coseltps.options.add(new Option(coarr[ci], coarr[ci]));
	                    }
	                }
	                for (var ch = 0; ch < coseltps.length; ch++) {
	                    if (coseltps.options[ch].innerHTML == cst) {
	                        coseltps.options[ch].selected = true;
	                        break;
	                    }
	                }
	            }
	        }
	    };
	    var brand = document.getElementById("brand").value;
	    var vehiceseries = document.getElementById("vehiceseries").value;
	    var typename = document.getElementById("typename").value;
	    var url = "DVMProducerServlet?method=getTpcode&brand=" + encodeURIComponent(brand) + "&vehiceseries=" + encodeURIComponent(vehiceseries) + "&typename=" + encodeURIComponent(typename);
	    ajax.open("GET", url, true); // true是异步请求
	    ajax.send(null);
	}

	function showtable() {
	    var tablename = document.getElementById("mytable");
	    var li = tablename.getElementsByTagName("tr");
	    for (var i = 1; i < li.length; i++) {
	        li[i].onmouseover = function() {
	            this.style.cursor = "pointer";
	        };
	        li[i].onmouseout = function() {
	            this.style.cursor = "default";
	        };
	    }
	}
	//查询生产者名称对应的首字母
	function toProducer() {
	    //window.openMode("DVMProducerServlet?method=getProducerName","width=300","height=200");
	    window.open('DVMProducerServlet?method=getProducerName', 'newwindow', 'height=300,width=800,top=200,left=200,toolbar=no,scrollbars=auto,menubar=no,resizable=no,location=no,status=no');
	    //window.open("DVMProducerServlet?method=getProducerName");
	}

	function setValue(name, author) {
	    document.getElementById("baseInfoName").value = name;
	    document.getElementById("baseauthor").value = author;
	    InitAjax();
	    ajax.onreadystatechange = function() {
	        if (ajax.readyState == 4 && ajax.status == 200) {
	            var arr = ajax.responseText.split(",");
	            var seltps = document.getElementById("brand");

	            seltps.options.length = 1;
	            for (var i = 0; i < arr.length; i++) {
	                if (arr[i] != "") {
	                    seltps.options.add(new Option(arr[i], arr[i]));
	                }
	            }

	        }
	    };

	    var url = "DVMProducerServlet?method=toProducerNameVal&author=" + encodeURIComponent(author);
	    ajax.open("GET", url, true); // true是异步请求
	    ajax.send(null);
	}

	function tobrand() {
	    //var author=document.getElementById("baseauthor").value;
	    InitAjax();
	    ajax.onreadystatechange = function() {
	        if (ajax.readyState == 4 && ajax.status == 200) {
	            var arr = ajax.responseText.split(",");
	            var vseltps = document.getElementById("vehiceseries");
	            var seltpns = document.getElementById("typename");
	            var seltpcos = document.getElementById("typecode");
	            var seltps = document.getElementById("brand");
	            var temp = '';
	            seltps.options.length = 1;
	            vseltps.options.add(new Option("=请选择=", ""));
	            seltpns.options.add(new Option("=请选择=", ""));
	            seltpcos.options.add(new Option("=请选择=", ""));
	            for (var i = 0; i < arr.length; i++) {
	                if (arr[i] != "") {
	                    seltps.options.add(new Option(arr[i], arr[i]));
	                }
	            }
	            for (var bi = 0; bi < seltps.length; bi++) {
	                if (seltps.options[bi].innerHTML == temp) {
	                    seltps.options[bi].selected = true;
	                    toselver();
	                    break;
	                }
	            }
	        }
	    };
	    var author = document.getElementById("baseauthor").value;
	    //alert(author);
	    var url = "DVMProducerServlet?method=toProducerNameVal&author=" + encodeURIComponent(author);
	    ajax.open("GET", url, true); // true是异步请求
	    ajax.send(null);
	}

	function tocomp() {
	    window.location.href = "CarModelsServlet?method=getBrands";
	}

	function totestbasen(aut) {
	    window.location.href = "CarModelsServlet?method=getCarModels&author=" + encodeURIComponent(aut);

	}

	function totestbrand(aut, bran) {
	    window.location.href = "CarModelsServlet?method=getCarModels&author=" + encodeURIComponent(aut) + "&brand=" + encodeURIComponent(bran);

	}

	function totestver(aut, bran, ver) {
	    window.location.href = "CarModelsServlet?method=getCarModels&author=" + encodeURIComponent(aut) + "&brand=" + encodeURIComponent(bran) + "&vehiceSeries=" + encodeURIComponent(ver);

	}

	function totesttpn(aut, bran, ver, tpn) {
	    window.location.href = "CarModelsServlet?method=getCarModels&author=" + encodeURIComponent(aut) + "&brand=" + encodeURIComponent(bran) + "&vehiceSeries=" + encodeURIComponent(ver) + "&typeName=" + encodeURIComponent(tpn);

	}

	function totesttpc(aut, bran, ver, tpn, tpc) {
	    window.location.href = "CarModelsServlet?method=getCarModels&author=" + encodeURIComponent(aut) + "&brand=" + encodeURIComponent(bran) + "&vehiceSeries=" + encodeURIComponent(ver) + "&typeName=" + encodeURIComponent(tpn) + "&typecode=" + encodeURIComponent(tpc);

	}

	function getIsagreeDvm() {
	    //window.location.href="DVMProducerServlet?method=getIsagreeDvmproducer";
	    window.open("DVMProducerServlet?method=getIsagreeDvmproducer", 'newwindow', 'height=480, width=300, top=100, left=700, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
	}

	function getwhereservicelist() {
	    window.location.href = "ServiceServlet?method=getWhereServiceList";
	}

	function mover(id) {
	    document.getElementById(id).style.backgroundImage = "url('images/btn2.png')";
	}

	function mout(id) {
	    document.getElementById(id).style.backgroundImage = "url('images/btnBgp.png')";
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
