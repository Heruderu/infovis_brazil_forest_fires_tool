
        function setupVis(data,str){
            height=barheight;
           
            
                // scatterplot setup
            let svgBars = d3.select(str).append("svg")
                .attr("width", width)
                .attr("height", height);
            let xBars =  computeXScale(data);
           
            let yBars =  computeYScale(data);
        
           
            barScales = {"x":xBars, "y": yBars}
            
            x_axis = d3.axisBottom(xBars);
            svgBars.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (height-40) + ")")
                .call(x_axis);
            //y axis
             y_axis = d3.axisLeft(yBars);
            svgBars.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate("+margin+" ,-40)")
                    .call(y_axis);

            drawBars(svgBars, barScales, data);
            ret={"svg":svgBars, "scales":barScales }
            return ret;


        }
       function drawBars(svgBars, scales, data){
         height=barheight;
        let xBars = computeXScale(data);
        let yBars = computeYScale(data);
        barsRect = svgBars.selectAll("rect")
            .data(data)
                .join("rect")
                    .attr("x",function(d,i){return xBars(i)})
                    .attr("y", function(d){return yBars(d.Número)-40;})
                    .attr("width", (width/2 - margin)/data.length)
                    .attr("height", d =>height- yBars(d.Número))
                    .style("fill","teal")
                    .style("stroke","black")
                    .on("mouseover",function(d){    
                            console.log(d.Número);
                    })

        x_axis = d3.axisBottom(xBars);
        svgBars.selectAll("g.x.axis")
                .call(x_axis);

        y_axis = d3.axisLeft(yBars);
        svgBars.selectAll("g.y.axes")
            .call(y_axis);

        
        
        }    
        function updateBars(svgBars, scales, data){
            height=barheight;

            let yBars = computeYScale(data);
            barsRect=svgBars.selectAll("rect")
                .data(data)
                    .transition()
                        .duration(400)
                        .ease(d3.easeLinear)
                    // .delay(function (d) {
                        //    return (d * 100);    //transição proporcional ao valor
                        //})
                        .attr("y", function(d){return yBars(d.Número)-40;})
                        
                        .attr("height", d =>height- yBars(d.Número))
                    console.log(d =>height- yBars(d.Número))
                
        }
        function computeXScale(data){
            let xBars = d3.scaleLinear()
                .rangeRound([margin, width])
                .domain([0,d3.max(data,function(data,i){return i;})]);
            return xBars;  
            
        }   
        function computeYScale(data){
            height=barheight;
            let yBars = d3.scaleLinear()
                    .range([margin,height ])
                    .domain([d3.max(data, d=>+d.Número),0]);
            
            return yBars;   
        }