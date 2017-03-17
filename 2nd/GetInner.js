
		for(var j = 0; j < listMissionUrls.length; j += 1) {
			superagent.get(listMissionUrls[j])
				.end(function(err, res) {
					if (err) {
						console.log(err);
					}
					var $ = cheerio.load(res.text, {
			            decodeEntities: false
			        });

					var temp = $("#mytable a[name=tpc]").attr("href").split("(")[1].split(")")[0].substr(1);
					var temp2 = temp.substring(0, temp.length - 1);
					var tempArr = temp2.split("','");
					console.log(tempArr);

				});
		}

		var n = 0;
        Promise.map(listMissionUrls, function(url) {
				console.log("正在爬取：" + url);
                return requestAsync.get(url);
            }, {
                concurrency: 5
            })
            .then(function(res) {

				n += 1;
				console.log(n);
            })
