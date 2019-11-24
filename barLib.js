
        function setupVis(data,str){
            let height=barheight;
            let width =barWidth;
            
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
                    .attr("class", "yaxis")
                    .attr("transform", "translate("+margin+" ,-40)")
                    .call(y_axis);

            drawBars(svgBars, barScales, data);
            ret={"svg":svgBars, "scales":barScales }
            return ret;


        }
       function drawBars(svgBars, scales, data){
         let height=barheight;
         let width =barWidth;
        let xBars = computeXScale(data);
        let yBars = computeYScale(data);
        barsRect = svgBars.selectAll("rect")
            .data(data)
                .join("rect")
                    .attr("x",function(d,i){return xBars(i)})
                    .attr("y", height-40)
                    .attr("width", (width - margin)/data.length)
                    .attr("height", 0)
                    .style("fill","teal")
                    .style("stroke","black")
                    .on("mouseover",function(d){    
                            console.log(d.Número);
                    })


        barsRect=svgBars.selectAll("rect")
        .data(data)
            .transition()
                .duration(400)
                .ease(d3.easeLinear)
                .attr("y", function(d){return yBars(d.Número)-40;})
                .attr("height", d =>height- yBars(d.Número));
     
        y_axis = d3.axisLeft(yBars);
        svgBars.selectAll("g.yaxes")
            .call(y_axis);

        x_axis = d3.axisBottom(xBars);
        svgBars.selectAll("g.x.axis")
                .call(x_axis);

  

        
        
        }    
        function updateBars(svgBars, scales, data){
            let height=barheight;
            let width =barWidth;
            let yBars = computeYScale(data);
            let xBars = computeXScale(data);

            
            if(barState==1)
                return    drawBars(svgBars, scales, data);

          

            x_axis = d3.axisBottom(xBars);
            svgBars.selectAll("g.x.axis")
                    .call(x_axis);
    
            y_axis = d3.axisLeft(yBars);
            svgBars.selectAll("g.y.axes")
                .call(y_axis);    
                
            barsRect=svgBars.selectAll("rect")
                .data(data)
                    .transition()
                       // .delay(400)
                        .duration(400)
                        .ease(d3.easeLinear)
                        .attr("y", function(d){return yBars(d.Número)-40;})
                        .attr("height", d =>height- yBars(d.Número));
                
        }
        function computeXScale(data){
            let width =barWidth;
            let xBars = d3.scaleLinear()
                .rangeRound([margin, width])
                .domain([0,d3.max(data,function(data,i){return i;})]);
            return xBars;  
            
        }   
        function computeYScale(data){
            let width =barWidth;
            height=barheight;
            let yBars = d3.scaleLinear()
                    .range([margin,height ])
                    .domain([d3.max(data, d=>+d.Número),0]);
            
            return yBars;   
        }