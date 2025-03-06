var urlBase = "./../../php/graficos/";

$(function() {
	CalcularVentasTotales();
	CalcularSaldoAdeudado();
	CalcularSaldoAFavor();
	CalcularClientesActivos();
	CalcularVentasMensuales();
	CalcularPorMedioDePago();
	ObtenerUltimosPedidos();
});

function CalcularVentasTotales(){
	var options = {
	series: [{
		name: "Total Orders",
		data: [240, 160, 671, 414, 555, 257]
	}],
	chart: {
		type: "line",
		//width: 100%,
		height: 40,
		toolbar: {
			show: !1
		},
		zoom: {
			enabled: !1
		},
		dropShadow: {
			enabled: 0,
			top: 3,
			left: 14,
			blur: 4,
			opacity: .12,
			color: "#e72e7a"
		},
		sparkline: {
			enabled: !0
		}
	},
	markers: {
		size: 0,
		colors: ["#e72e7a"],
		strokeColors: "#fff",
		strokeWidth: 2,
		hover: {
			size: 7
		}
	},
	plotOptions: {
		bar: {
			horizontal: !1,
			columnWidth: "35%",
			endingShape: "rounded"
		}
	},
	dataLabels: {
		enabled: !1
	},
	stroke: {
		show: !0,
		width: 2.5,
		curve: "smooth"
	},
	colors: ["#fff"],
	xaxis: {
		categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	},
	fill: {
		opacity: 1
	},
	tooltip: {
		theme: "dark",
		fixed: {
			enabled: !1
		},
		x: {
			show: !1
		},
		y: {
			title: {
				formatter: function(e) {
					return ""
				}
			}
		},
		marker: {
			show: !1
		}
	}
  };

  var chart = new ApexCharts(document.querySelector("#chart1"), options);
  chart.render();

}

function CalcularSaldoAdeudado(){
// chart 2
	var options = {
	series: [{
		name: "Total Views",
		data: [571, 414, 555, 257, 640, 460]
	}],
	chart: {
		type: "line",
		//width: 100%,
		height: 40,
		toolbar: {
			show: !1
		},
		zoom: {
			enabled: !1
		},
		dropShadow: {
			enabled: 0,
			top: 3,
			left: 14,
			blur: 4,
			opacity: .12,
			color: "#8932ff"
		},
		sparkline: {
			enabled: !0
		}
	},
	markers: {
		size: 0,
		colors: ["#8932ff"],
		strokeColors: "#fff",
		strokeWidth: 2,
		hover: {
			size: 7
		}
	},
	plotOptions: {
		bar: {
			horizontal: !1,
			columnWidth: "35%",
			endingShape: "rounded"
		}
	},
	dataLabels: {
		enabled: !1
	},
	stroke: {
		show: !0,
		width: 2.5,
		curve: "smooth"
	},
	colors: ["#fff"],
	xaxis: {
		categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	},
	fill: {
		opacity: 1
	},
	tooltip: {
		theme: "dark",
		fixed: {
			enabled: !1
		},
		x: {
			show: !1
		},
		y: {
			title: {
				formatter: function(e) {
					return ""
				}
			}
		},
		marker: {
			show: !1
		}
	}
  };

  var chart = new ApexCharts(document.querySelector("#chart2"), options);
  chart.render();


}

function CalcularSaldoAFavor(){
var options = {
	series: [{
		name: "Revenue",
		data: [240, 160, 555, 257, 671, 414]
	}],
	chart: {
		type: "line",
		//width: 100%,
		height: 40,
		toolbar: {
			show: !1
		},
		zoom: {
			enabled: !1
		},
		dropShadow: {
			enabled: 0,
			top: 3,
			left: 14,
			blur: 4,
			opacity: .12,
			color: "#12bf24"
		},
		sparkline: {
			enabled: !0
		}
	},
	markers: {
		size: 0,
		colors: ["#12bf24"],
		strokeColors: "#fff",
		strokeWidth: 2,
		hover: {
			size: 7
		}
	},
	plotOptions: {
		bar: {
			horizontal: !1,
			columnWidth: "35%",
			endingShape: "rounded"
		}
	},
	dataLabels: {
		enabled: !1
	},
	stroke: {
		show: !0,
		width: 2.5,
		curve: "smooth"
	},
	colors: ["#fff"],
	xaxis: {
		categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	},
	fill: {
		opacity: 1
	},
	tooltip: {
		theme: "dark",
		fixed: {
			enabled: !1
		},
		x: {
			show: !1
		},
		y: {
			title: {
				formatter: function(e) {
					return ""
				}
			}
		},
		marker: {
			show: !1
		}
	}
  };

  var chart = new ApexCharts(document.querySelector("#chart3"), options);
  chart.render();
}

function CalcularClientesActivos(){
	var options = {
	series: [{
		name: "Customers",
		data: [414, 555, 257, 640, 160, 671]
	}],
	chart: {
		type: "line",
		//width: 100%,
		height: 40,
		toolbar: {
			show: !1
		},
		zoom: {
			enabled: !1
		},
		dropShadow: {
			enabled: 0,
			top: 3,
			left: 14,
			blur: 4,
			opacity: .12,
			color: "#ff6632"
		},
		sparkline: {
			enabled: !0
		}
	},
	markers: {
		size: 0,
		colors: ["#ff6632"],
		strokeColors: "#fff",
		strokeWidth: 2,
		hover: {
			size: 7
		}
	},
	plotOptions: {
		bar: {
			horizontal: !1,
			columnWidth: "35%",
			endingShape: "rounded"
		}
	},
	dataLabels: {
		enabled: !1
	},
	stroke: {
		show: !0,
		width: 2.5,
		curve: "smooth"
	},
	colors: ["#fff"],
	xaxis: {
		categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	},
	fill: {
		opacity: 1
	},
	tooltip: {
		theme: "dark",
		fixed: {
			enabled: !1
		},
		x: {
			show: !1
		},
		y: {
			title: {
				formatter: function(e) {
					return ""
				}
			}
		},
		marker: {
			show: !1
		}
	}
  };

  var chart = new ApexCharts(document.querySelector("#chart4"), options);
  chart.render();
}

function CalcularPorMedioDePago(){
	new Chart(document.getElementById("chart5"), {
	type: 'doughnut',
	data: {
		labels: ["Mobile", "Desktop", "Tablet"],
		datasets: [{
			label: "Device Users",
			backgroundColor: ["#12bf24", "#3461ff", "#ff6632"],
			data: [2478, 5267, 1834]
		}]
	},
	options: {
		maintainAspectRatio: false,
		cutoutPercentage: 77,
		legend: {
		  position: 'bottom',
		  display: false,
		  labels: {
			boxWidth:8
		  }
		},
		tooltips: {
		  displayColors:false,
		}
	}
});
}

function CalcularVentasMensuales(){
var options = {
	series: [{
		name: "Sales",
		data: [300, 555, 257, 901, 613, 727, 314]
	}],
	chart: {
		type: "area",
		//width: 130,
		height: 160,
		toolbar: {
			show: !1
		},
		zoom: {
			enabled: !1
		},
		dropShadow: {
			enabled: 0,
			top: 3,
			left: 14,
			blur: 4,
			opacity: .12,
			color: "#12bf24"
		},
		sparkline: {
			enabled: !1
		}
	},
	markers: {
		size: 0,
		colors: ["#12bf24"],
		strokeColors: "#fff",
		strokeWidth: 2,
		hover: {
			size: 7
		}
	},
	plotOptions: {
		bar: {
			horizontal: !1,
			columnWidth: "35%",
			endingShape: "rounded"
		}
	},
	dataLabels: {
		enabled: !1
	},
	stroke: {
		show: !0,
		width: 2.5,
		curve: "straight"
	},
	xaxis: {
		categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
		axisBorder: {
			show: false
		}
	},
	grid: {
		show: !1
	},
	fill: {
		type: 'gradient',
		gradient: {
		  shade: 'light',
		  type: 'vertical',
		  shadeIntensity: 0.5,
		  gradientToColors: ['#12bf24'],
		  inverseColors: false,
		  opacityFrom: 0.5,
		  opacityTo: 0.0,
		  //stops: [0, 100]
		}
	  },
	colors: ["#12bf24"],
	yaxis: {
		show: false
	},
	tooltip: {
		theme: "dark",
		fixed: {
			enabled: !1
		},
		x: {
			show: !1
		},
		y: {
			title: {
				formatter: function(e) {
					return ""
				}
			}
		},
		marker: {
			show: !1
		}
	}
  };

  var chart = new ApexCharts(document.querySelector("#chart15"), options);
  chart.render();
}