// JavaScript Document
function addDataToResult(results) {
	$("#resultdiv ul li").remove();
	$.each(results, function (ind, ele) {
		var $thisli = $('<li><p class="resulttitle" >' + ele.name
			+ '</p><p class="resultprice">$' + ele.price + ' / Day</p><p class="resultaddr">'
			+ ele.addr2 + ', ' + ele.addr2 + ', ' + ele.addr3 + '</p><p class="hid" style="display:none;">'
			+ ele.index + '</p></li>').appendTo($("#resultdiv ul"));
		$thisli.on("click", function (obj) {
			var str = $(obj.target).parent("li").find(".hid")[0].innerText;
			navigateToMap(str);
		});
	});
}

var results = [];

function sortResult(rs, key) {
	for (var i = 0; i < rs.length; i++) {
		for (j = i + 1; j < rs.length; j++) {
			if (key == "name") {
				if (rs[i][key] > rs[j][key]) {
					swap(rs, i, j);
				}
			}
			else {
				if (parseFloat(rs[i][key]) > parseFloat(rs[j][key])) {
					swap(rs, i, j);
				}
			}
		}
	}
}

function swap(rs, i, j) {
	var tmp = rs[i];
	rs[i] = rs[j];
	rs[j] = tmp;
}

function refreshPage() {
	var name = $("#filter-text").val();
	var min = $("#filter-min-price").val();
	var max = $("#filter-max-price").val();
	var urlPar = '';
	if (name.length > 0 || min.length > 0 || max.length > 0) {
		urlPar = 'queryByFilter?name=' + name + '&left=' + min + '&right=' + max + '&filed=' + $("#filter-sort").val();
	} else {
		urlPar = 'queryAll';
	}
	$.ajax({
		url: '/house/' + urlPar,
		type: "GET",
		data: {},
		success: function (data, textStatus, jqXHR) {
			var totalDT = data;
			results = [];
			$.each(totalDT, function (ind, ele) {
				ele.index = ind; // the index in originData
				results.push(ele);
			});

			if ($("#filter-sort").val() == "safety") {
				sortResult(results, "safety");
			}
			else if ($("#filter-sort").val() == "price") {
				sortResult(results, "price");
			}
			else {//sort by name, default
				sortResult(results, "name");
			}
			addDataToResult(results);
			//TODO 
			displayInMap(results);
		}
	});

}

function afterDocMapReady() {
	var $resdiv = $("#resultdiv");
	$resdiv.css("height", $("#filterdiv").parent("div").height() - $("#filterdiv").height() - 40 + "px");
	$("#filter-sort").bind("change", function (eve) {
		var key = $("#filter-sort").val();
		sortResult(results, key);
		addDataToResult(results);
	});
	$("#filter-search-button").click(refreshPage);
}
