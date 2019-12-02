
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
            
           let  x_axis = d3.axisBottom(xBars);
            svgBars.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (height-40) + ")")
                .call(x_axis);
            //y axis
             let y_axis = d3.axisLeft(yBars);
            svgBars.append("g")
                    .attr("class", "y axis")
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
        updateFlag();
        let brush=d3.brush().on("end",brushed);
       /* if(brushGroup!=null) 
        {
            console.log("wtf")
            svgBars.call(brush.move, null);
        }
*/
       svgBars.selectAll("*").remove();
       //d3.selectAll("g.brush").call(brush.clear());
           
       let  x_axis = d3.axisBottom(xBars);
       svgBars.append("g")
           .attr("class", "x axis")
           .attr("transform", "translate(0," + (height-40) + ")")
           .call(x_axis);
       //y axis
        let y_axis = d3.axisLeft(yBars);
       svgBars.append("g")
               .attr("class", "y axis")
               .attr("transform", "translate("+margin+" ,-40)")
               .call(y_axis); 




        //Draw empty bar chart
        barsRect = svgBars.selectAll("rect")
            .data(data)
                .join("rect")
                    .attr("x",function(d,i){return xBars(i)})
                    .attr("y", height-40)
                    .attr("width", (width - margin)/data.length)
                    .attr("height", 0)
                    .style("fill", "#fed976")
                    .style("stroke","black")
                    .on("mouseover",function(d){    
                            console.log(d.Ano, d.Mês,d.Periodo);
                    });
      
      


        //Transition to real values
        barsRect=svgBars.selectAll("rect")
        .data(data)
            .transition()
                .duration(400)
                .ease(d3.easeLinear)
                .attr("y", function(d){return yBars(d.Número)-40;})
                .attr("height", d =>height- yBars(d.Número));
     
        //Draw axis skeleton
        y_axis = d3.axisLeft(yBars);
        svgBars.selectAll("g.y.axis")
            .transition()
            .call(y_axis);

         if(flag==3)   
            xTime= computeMonthScale(data);
         else
            xTime= computeTimeScale_G(data);
                 
        x_axis = d3.axisBottom(xTime);
        svgBars.selectAll("g.x.axis")
                .call(x_axis);

       




            
            brushGroup=svgBars.join("g")
                        .attr("class", "brush")
                        .call(brush);


                        function brushed() {
                            // console.log( d3.event.selection );
                            if (!d3.event.sourceEvent) return;
                               
                            sel = d3.event.selection;
                            if(sel != null)
                            {
                                let selX=[Math.floor(xBars.invert(sel[0][0])),Math.floor(xBars.invert(sel[1][0]))]
                                let selY=[yBars.invert(sel[0][1]),yBars.invert(sel[1][1])]
                            
                                let zoomed= data.filter((d,i)=> i>=selX[0] && i<=selX[1] )
                                svgBars.selectAll("g.brush").remove();    

                                 return drawBars(svgBars,[],zoomed)
                            }
                        }
                
           
        }    


        




        function updateBars(svgBars, scales, data){
            let height=barheight;
            let width =barWidth;
            let yBars = computeYScale(data);
            let xBars = computeXScale(data);
         
            
            if(barState==1)
                return drawBars(svgBars, scales, data);

           
            

            y_axis = d3.axisLeft(yBars);
           
            y_axis.scale(yBars);
            svgBars.selectAll("g.y.axis")
                .transition()
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
            let width =barWidth-margin;
            let xBars = d3.scaleLinear()
                .rangeRound([margin, width])
                .domain([0,d3.max(data,function(data,i){return i;})]);
            return xBars;  
            
        }   

        function computeTimeScale(data){
            let width =barWidth-margin;
            let xTime = d3.scaleLinear()
                .rangeRound([margin, width])
                .domain([d3.min(data,function(d,i){return d.Ano;}),d3.max(data,function(d,i){return d.Ano;})]);
                //.domain([1998,2017])
            return xTime;  
            
        }
        function computeTimeScale(data){
            let width =barWidth-margin;
            let xTime = d3.scaleLinear()
                .rangeRound([margin, width])
                //.domain([d3.min(data,function(d,i){return d.Ano;}),d3.max(data,function(d,i){return d.Ano;})]);
                .domain([1998,2017])
            return xTime;  
            
        }   
        function computeMonthScale(data){
            let width =barWidth-margin;
            let sms= width/24;
            let xTime = d3.scalePoint()
                .domain(["January","February","March","April","May","June","July","August","September","October","November","December"])
                .range([margin+sms, width+sms]);
            return xTime;  
            
        }   
        function computeTimeScale_G(data){
            
            let width =barWidth-margin;
            let sms= width/40;
            let domain=[+ new Date(1998,0,0),+ new Date(2017,0,12)]
            let xTime = d3.scaleTime()
                .rangeRound([margin+sms, width+sms])
                .domain(domain);
            return xTime;
        }
        
        function computeYScale(data){
            let width = barWidth;
            let height = barheight;
            yBars = d3.scaleLinear()
                    .range([margin,height ])
                    .domain([d3.max(data, d=>+d.Número),0]);
                    //console.log(d3.max(data, d=>+d.Número))
            return yBars;   
        }