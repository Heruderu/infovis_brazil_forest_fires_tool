function slider(str,str1)
{
    let slider = d3.select(str);
           let label = d3.select(str1);
           let min = 1999
               max = 2017
            slider
               .attr("min", min)
               .attr("max", max)
               .attr("value", 1)
               .attr("step", 1)
               .on("input", function(d) {

                
                  if(str=="#filter_slider"){
                      setCurrentDiv2();
                      prevSlider1=tmpSlider1;
                      tmpSlider1=this.value;
                  }
                  else{
                      setCurrentDiv3();
                      prevSlider2=tmpSlider2;
                      tmpSlider2=this.value;
                  }

                   label.text(this.value); // use `this` on the place of slider
                   //console.log(this.value)
                   let filteredStatePerYear;
                  let dados;
                   if(countryState==1)
                   { 
                      dados =getMonthSum(rawData);
                     filteredStatePerYear= dados.filter(d=> d.Periodo%10000===+this.value);
                         console.log(+this.value)
                     }
                     else
                     {
                         dados= filteredState; 
                      filteredStatePerYear= dados.filter(d=> d.Ano===+this.value);
                     }
                  
                        barState=1;
                       updateBars(svgBars, barScales, filteredStatePerYear);
               })        
}
function setCurrentDiv2()
{
    currentDiv= "#div2";
    document.getElementById("d0").firstChild.data="Top Panel";
    filteredState=filteredState1;
    svgBars = svgBars1;
    flag=flag2;
    countryState=countryState1;
    brushFlag=brushFlag1;
    zoomFlag=zoomFlag1;
    brushGroup=brushGroup1;
}
function setCurrentDiv3()
{
  currentDiv= "#div3";
  document.getElementById("d0").firstChild.data="Bottom Panel";
  filteredState=filteredState2;
  svgBars = svgBars2;
  flag=flag3;
  countryState=countryState2;
  brushFlag=brushFlag2;
  zoomFlag=zoomFlag2;
  brushGroup=brushGroup2;
}

function action1()
{
  document.getElementById("filter_slider").style.display = 'none';
  d3.select("#label").text("");
  updateDropName("Year");
  let dados;
  if(countryState1==1)
    dados =rawData;
  else
    dados= filteredState; 
  
  barState=1;
  previousFlag1=flag2;
  flag2=1;
  let yearSum=getYearSum(dados)
  let xBars =  computeXScale(yearSum);
  let yBars =  computeYScale(yearSum);
  scales = {"x":xBars, "y": yBars}
  saveName();
  updateBars(svgBars, scales, yearSum);
  
  
}
function action2()
{
  document.getElementById("filter_slider").style.display = 'none';
  d3.select("#label").text("");
  updateDropName("Month");
  barState=1;
  previousFlag1=flag2;
  flag2=2;
  
  let dados;
  if(countryState1==1)
    dados =getMonthSum(rawData);
  else
    dados= filteredState; 
  
  let xBars =  computeXScale(dados);
  let yBars =  computeYScale(dados);
  scales = {"x":xBars, "y": yBars}
  saveName();

  updateBars(svgBars, scales, dados);
  
}
function action3()
{
  document.getElementById("filter_slider").style.display = 'inline';
  d3.select("#label").text("");
  updateDropName("Single Year");
    countryState=countryState1;
    let filteredStatePerYear=getFilteredStatePerYearInit()
    barState=1;
    previousFlag1=flag2;
    flag2=3;
    console.log(filteredStatePerYear)
    saveName();
    updateBars(svgBars, barScales, filteredStatePerYear);
    

}


function action4()
{
  document.getElementById("filter_slider2").style.display = 'none';
  d3.select("#label2").text("")
  updateDropName("Year");
  barState=1;
  previousFlag2=flag3;
  flag3=1;
  let dados;
  if(countryState2==1)
    dados =rawData;
  else
    dados= filteredState; 


  let yearSum=getYearSum(dados)
  let xBars =  computeXScale(yearSum);
  let yBars =  computeYScale(yearSum);
  scales = {"x":xBars, "y": yBars}
  saveName();
  updateBars(svgBars, scales, yearSum)
  

}
function action5()
{
  document.getElementById("filter_slider2").style.display = 'none';
  d3.select("#label2").text("");
  updateDropName("Month");
  barState=1;
  previousFlag2=flag3;
  flag3=2;

  let dados;
  if(countryState2==1)
  {
    console.log(rawData)
    dados =getMonthSum(rawData);
  }
    else
    dados= filteredState; 

  let xBars =  computeXScale(dados);
  let yBars =  computeYScale(dados);
  scales = {"x":xBars, "y": yBars}
  saveName();
  updateBars(svgBars, scales, dados);
  

}

function action6()
{
  document.getElementById("filter_slider2").style.display = 'inline';
  d3.select("#label2").text("")
  updateDropName("Single Year");
  countryState=countryState2;
  let filteredStatePerYear=getFilteredStatePerYearInit()
    barState=1;
    previousFlag2=flag3;
    flag3=3;

    console.log(filteredStatePerYear)
    saveName();
    updateBars(svgBars, barScales, filteredStatePerYear);

    

}


//WEB FUNCTIONS
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction(str) {
    document.getElementById(str).classList.toggle("show");
    if (str=="myDropdown1")
        setCurrentDiv2();
    else     
        setCurrentDiv3();
  }
  
  function myFunction0(str) {
    document.getElementById(str).classList.toggle("show");
  }
  // Close the dropdown if the user clicks outside of it
  window.addEventListener("click", function(event) {
    if (!event.target.matches('.dropbtn0')) {
      var dropdowns = document.getElementsByClassName("dropdown-content0");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  });

  
  
  
  window.addEventListener("click", function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  });

  


window.addEventListener("click", function(event) {

    if (!event.target.matches('.dropbtn1') ) {
      var dropdowns = document.getElementsByClassName("dropdown-content1");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  });
  window.addEventListener("click", function(event) {
    if (event.target.matches("#div1") )
        countryPlot();
  });
  function countryPlot()
            {
                countryState=updateCountryState(1);
                updateName("Brazil");
                if (currentDiv=="#div2")
                  action1()
                else if(currentDiv=="#div3")
                  action4()   

            }

function updateCountryState(newState)
{
    if (currentDiv=="#div2")
    {    
        countryState1=newState;
        return countryState1;
    }
    else if(currentDiv=="#div3")
    {
        
        countryState2=newState;
        return countryState2;
    }   
}

function updateStates(state)
{
     if (currentDiv=="#div2")
     {    console.log("hello")
         filteredState1=state;
     }
     else if(currentDiv=="#div3")
     {
         console.log("hello2")
     filteredState2=state;
     }   
 }
 function updateName(name)
{
     if (currentDiv=="#div2")
     {    
         document.getElementById("d1").firstChild.data=name;
     }
     else if(currentDiv=="#div3")
     {
         document.getElementById("d2").firstChild.data=name;
     }   
 }
function updateSlider(prevSlider){
  if (currentDiv=="#div2")
  {   
    if(prevSlider!=0) 
      d3.select( "#label").text(prevSlider);
    document.getElementById("filter_slider").value=prevSlider;
      
  }
  else if(currentDiv=="#div3")
  {
    if(prevSlider!=0)
      d3.select( "#label2").text(prevSlider);
    document.getElementById("filter_slider2").value=prevSlider;
  }   

}
 function reset(jsonFile) {
  document.getElementById("reset").disabled = true;
  document.getElementById("filter_slider_map").value = 0;
  let mapLoaded = d3.json(jsonFile);
  mapLoaded.then(loadMap);
 }

 function rollBack1(){
  barState=1;
  updateName(previousName1);
  updateSlider(prevSlider1)
  updateBars(svgBars1, [], previousState1);
 }
 function rollBack2(){
  barState=1;
  updateName(previousName2);
  updateSlider(prevSlider2)
  updateBars(svgBars2, [], previousState2);
 }
 function zoom(){
    zoomFlag1=1;
    brushFlag1=0;
    document.getElementById("zoom1").style.color="teal";
    document.getElementById("brush1").style.color="";

 }
 function zoom2(){
  zoomFlag2=1;
  brushFlag2=0;

  document.getElementById("zoom2").style.color="teal";
    document.getElementById("brush2").style.color="";

}
 function brush2Map(){
  brushFlag1=1;
  zoomFlag1=0;
  document.getElementById("zoom1").style.color="";
  document.getElementById("brush1").style.color="teal";

}
function brush2Map2(){
  brushFlag2=1;
  zoomFlag2=0;
  document.getElementById("zoom2").style.color="";
  document.getElementById("brush2").style.color="teal";

}

function updateDropName(name) {
    
  if (currentDiv == "#div2") {
      previousDropName1=document.getElementById("d1").firstChild.data
      document.getElementById("d1").firstChild.data = name;
  } else if (currentDiv == "#div3") {
      previousName2=document.getElementById("d2").firstChild.data
      document.getElementById("d2").firstChild.data = name;
  }
}
function saveDropName(){

  if (currentDiv == "#div2") {
      previousDropName1=document.getElementById("d1").firstChild.data
      
  } else if (currentDiv == "#div3") {
      previousDropName2=document.getElementById("d2").firstChild.data
      
  }


}