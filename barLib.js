
        function setupVis(data){
            let dEntries= Object.values(data)
            
                // scatterplot setup
            let svgBars = d3.select("#div2").append("svg")
                .attr("width", width)
                .attr("height", height);
            let xBars = d3.scaleLinear()
                .rangeRound([margin, width-margin])
                .domain([0,d3.max(data,function(data,i){return i;})]);
           
            let yBars = d3.scaleLinear()
                    .range([margin,height - margin])
                    .domain([d3.max(data, d=>+d.Número),0]);
        
            console.log(d3.max(data, d=>+d.Número));  //PROBLEMA
            barScales = {"x":xBars, "y": yBars}
        
            
            drawBars(svgBars, barScales, data);
            ret={"svg":svgBars, "scales":barScales }
            return ret;


        }
       function drawBars(svgBars, scales, data){
        let xBars = d3.scaleLinear()
        .rangeRound([margin, width-margin])
        .domain([0,d3.max(data,function(data,i){return i;})]);
        let yBars = d3.scaleLinear()
                    .range([margin,height - margin])
                    .domain([d3.max(data, d=>+d.Número),0]);

    
        barsRect = svgBars.selectAll("rect")
            .data(data)
                .join("rect")
                    .attr("x",function(d,i){return xBars(i)})
                    .attr("y", function(d){return yBars(d.Número);})
                    .attr("width", (width/2 - margin)/data.length)
                    .attr("height", d =>height- yBars(d.Número))
                    .style("fill","teal")
                    .style("stroke","black")
                    .on("mouseover",function(d){    
                            console.log(d.Número);
                    })
                }    
        function updateBars(svgBars, scales, data){
         

            let yBars = d3.scaleLinear()
                    .range([margin,height - margin])
                    .domain([d3.max(data, d=>+d.Número),0]);
            barsRect=svgBars.selectAll("rect")
                .data(data)
                    .transition()
                        .duration(2000)
                        .ease(d3.easeLinear)
                    // .delay(function (d) {
                        //    return (d * 100);    //transição proporcional ao valor
                        //})
                        .attr("y", function(d){return yBars(d.Número);})
                        
                        .attr("height", d =>height- yBars(d.Número))
                    console.log(d =>height- yBars(d.Número))
                
        }
        function computeScales(data){
            let xBars = d3.scaleLinear()
                .rangeRound([margin, width-margin])
                .domain([0,d3.max(data,function(data,i){return i;})]);
           
            let yBars = d3.scaleLinear()
                    .range([margin,height - margin])
                    .domain([d3.max(data, d=>+d.Número),0]);
        }