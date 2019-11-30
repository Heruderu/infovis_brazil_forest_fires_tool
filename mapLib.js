let loadFullData = 1;
let firesPerState = d3.map();

let margin = 75,
    width = 1500 - margin,
    height = 600 - margin;

let jsonFile;
let svg;

let projection = d3.geoMercator()
    .center([-20, -15])
    .scale(600)
    .translate([width / 2, height / 2]);

let path = d3.geoPath().projection(projection);

function loadMap(brazilstates) {
    firesPerState = d3.map();
    if (loadFullData != 1) {
        d3.selectAll("svg").remove();
    }
    loadFullData = 1;
    svg = d3.select("#divMap")
        //.classed("svg-container", true)
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 600 600")
        //.classed("svg-content-responsive", true)
        .append('g')
        .attr('class', 'map');

    jsonFile = brazilstates;

    d3.csv("new_csv.csv")
        .then((data) => {
            let newdata = data.map(d => {
                d["Número"] = +d["Número"];
                d["Estado"] = d["Estado"];
                d["Periodo"] = +d["Periodo"];
                d["Ano"] = +d["Ano"]
                return d;
            });
            rawData = newdata;
            let nested = d3.nest()
                .key(function (d) {
                    return d["Estado"];
                })
                .rollup(function (leaves) {
                    let total = d3.sum(leaves, function (d) {
                        return d["Número"];
                    });

                    return +total;
                })

                .entries(newdata);
            fillStates(nested);

            countryYearSum = getYearSum(newdata);
            countryMonthSum = getMonthSum(newdata);
            let ret = setupVis(countryYearSum, "#div2");//funçoes
            let ret2 = setupVis(countryMonthSum, "#div3");
            svgBars = ret.svg;
            barScales = ret.scales;
            svgBars1 = ret.svg;

            svgBars2 = ret2.svg;

            filteredState = newdata
            filteredState1 = filteredState;
            filteredState2 = countryMonthSum;


            document.getElementById("d1").firstChild.data = "Brazil"
            document.getElementById("d2").firstChild.data = "Brazil";
        })
        .catch(err => {
            console.log(err)
        });

    d3.csv("new_csv.csv")
        .then((data) => {
            let newData = data.map(d => {
                d["Ano"] = +d["Ano"]; //cast to float
                d["Numero"] = +d["Numero"]
                return d;
            });

        });    

}

function fillStates(nested) {
    let dataNested;
    nested.forEach(function (d) {
        if (d.key != "undefined") {
            if (d.values) {
                dataNested = d.values;
            }
        }
    });
    if (dataNested)
        nested = dataNested;

    let numero_extent = d3.extent(nested, function (d) {
        return d.value;
    });

    console.log(nested);

    let states = topojson.feature(jsonFile, jsonFile.objects.foo);
    let states_contour = topojson.mesh(jsonFile, jsonFile.objects.foo.geometries);

    let color = d3.scaleQuantize()
        .domain(numero_extent)
        .range(d3.schemeReds[9]);

    let total = 0;
    svg.append("g")
        .selectAll("path")
        .data(states.features)
        .enter()
            .append("path")
            .attr("class", "state")
            .attr("stroke", "gray")
            .attr("fill", function (d) {
                nested.forEach(function (n) {
                    if (n.key != "undefined") {
                        if (n.values) {
                            let data_array = n.values;
                            total = data_array.forEach(function (n) {
                                firesPerState.set(n.key, n.value);
                                if (n.key === d.properties.codarea) {
                                    total = n.value;
                                }
                                return color(total);
                            })
                        }
                        firesPerState.set(n.key, n.value);
                        if (n.key === d.properties.codarea) {
                            total = n.value;
                        }
                    }
                })
                return color(total);
            })
            .attr("d", path)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .on("click", function (d) {
                getSingleStateData(d.properties.codarea);
            });

    function handleMouseOver(d, i) {
        let format = d3.format(",");
        let label = "Estado: " + d.properties.codarea + "<br>" + "Queimadas: "
            + format(firesPerState.get(d.properties.codarea));
        tip.transition()
            .duration(200)
            .style("opacity", 1);
        tip.html(label)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px");
        d3.select(this).attr("stroke", "black");
        d3.select(this).attr("stroke-width", 3);
    }

    function handleMouseOut(d, i) {
        tip.transition()
            .duration(400)
            .style("opacity", 0);
        d3.select(this).attr("stroke", "gray");
        d3.select(this).attr("stroke-width", 1);
    }

    svg.append("g")
        .append("path")
        .datum(states_contour)
        .attr("d", path)
        .attr("class", "state_contour");

    svg.append('text')
        .attr('font-size', 20)
        .attr('x', margin )
        .attr('y', 30)
        .text("VI: Trabalho de Design - Queimadas no Brasil")

    createLegends(numero_extent, color);

    slider("#filter_slider", "#label");
    slider("#filter_slider2", "#label2");
    updateMapSlider("#filter_slider_map", "#label_map");
}

function createLegends(numero_extent, color) {

    if (loadFullData != 1) {
        d3.selectAll('g.legendEntry').remove();
    }
    let legend = svg.selectAll('g.legendEntry')
        .data(color.range())
        .enter()
            .append('g').attr('class', 'legendEntry');

    legend
        .append('rect')
        .attr("x", 20)
        .attr("y", function (d, i) {
            return height - margin*2 - i * 12.5;
        })
        .attr("width", 10)
        .attr("height", 10)
        .style("stroke", "black")
        .style("stroke-width", 0.5)
        .style("fill", function (d) {
            return d;
        });

    legend
        .append('text')
        .attr('font-size', 12)
        .attr("x", 35)
        .attr("y", function (d, i) {
            return height - margin*2 - i * 12.5;
        })
        .attr("dy", "0.8em")
        .text(function (d, i) {
            let extent = color.invertExtent(d);
            let format = d3.format(".2s");
            if (i === 0) {
                return 0.0 + " < " + format(+extent[1]);
            }
            if (i === d.length + 1) {
                return "> " + format(+extent[0]);
            }
            return format(+extent[0]) + " - " + format(+extent[1]);
        });
    if (loadFullData == 1) {
        let year = "1998-2017";
        loadFullData = 0;
        let label = d3.select("#label_map");
        label.text(year);
    }
}

function updateMapSlider(str, str1) {
    let slider = d3.select(str);
    let label = d3.select(str1);
    let min = 1999;
    let max = 2016;
    let dados = d3.csv("new_csv.csv")
        .then((data) => {
            let newdata = data.map(d => {
                d["Número"] = +d["Número"];
                d["Estado"] = d["Estado"];
                d["Periodo"] = +d["Periodo"];
                d["Ano"] = +d["Ano"]
                return d;
            });
            slider
                .attr("min", min)
                .attr("max", max)
                .attr("value", 1)
                .attr("step", 1)
                .on("input", function input() {
                    getMapByYear(newdata, label, this.value)
                });
        })

}

function getMapByYear(data, label, year) {
    console.log(document.getElementById("reset").attributes);
    document.getElementById("reset").disabled = false;
    firesPerState = d3.map();
    label.text(year);
    let nested = d3.nest()
        .key(function (d) {
            if (d["Ano"] == year)
                return d["Ano"];
        })
        .key(function (d) {
            return d["Estado"];
        })
        .rollup(function (leaves) {
            let total = d3.sum(leaves, function (d) {
                return d["Número"];
            });

            return +total;
        })
        .entries(data);
    fillStates(nested);
}

function getSingleStateData(key) {

    updateName(key);
    countryState = updateCountryState(0);
    filteredState = rawData.filter(d => d.Estado === key);
    let dados;
    if (flag == 1)
        dados = getYearSum(filteredState);
    else if (flag == 2)
        dados = filteredState;
    else if (flag == 3)
        dados = getFilteredStatePerYearInit();


    updateStates(filteredState);
    // console.table(filteredState)
    // if(barState==0){
    updateBars(svgBars, barScales, dados);

    //}
    //else{
    //  drawBars(svgBars, barScales, filteredState);
    barState = 0;
    //}
}

function updateStates(state) {
    if (currentDiv == "#div2") {
        console.log("hello")
        filteredState1 = state;
    } else if (currentDiv == "#div3") {
        console.log("hello2")
        filteredState2 = state;
    }
}

function updateName(name) {
    if (currentDiv == "#div2") {
        document.getElementById("d1").firstChild.data = name;
    } else if (currentDiv == "#div3") {
        document.getElementById("d2").firstChild.data = name;
    }
}