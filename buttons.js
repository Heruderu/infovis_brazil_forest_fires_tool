function slider(str,str1)
{
    let slider = d3.select(str);
           let label = d3.select(str1);
           let min = 1999 
               max = 2016
            slider
               .attr("min", min)
               .attr("max", max)
               .attr("value", 1)
               .attr("step", 1)
               .on("input", function(d) {
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
    filteredState=filteredState1;
    svgBars = svgBars1;
}
function setCurrentDiv3()
{
  currentDiv= "#div3";
  filteredState=filteredState2;
  svgBars = svgBars2;

}

function action1()
{
  document.getElementById("filter_slider").style.display = 'none';
  
  let dados;
  if(countryState1==1)
    dados =rawData;
  else
    dados= filteredState; 
  
  barState=1;
  let yearSum=getYearSum(dados)
  let xBars =  computeXScale(yearSum);
  let yBars =  computeYScale(yearSum);
  scales = {"x":xBars, "y": yBars}
  updateBars(svgBars, scales, yearSum);
  flag=1;
  
}
function action2()
{
  document.getElementById("filter_slider").style.display = 'none';
  barState=1;
  let dados;
  if(countryState1==1)
    dados =getMonthSum(rawData);
  else
    dados= filteredState; 
  
  let xBars =  computeXScale(dados);
  let yBars =  computeYScale(dados);
  scales = {"x":xBars, "y": yBars}
  updateBars(svgBars, scales, dados);
  flag=2;
}
function action3()
{
  document.getElementById("filter_slider").style.display = 'inline';
    countryState=countryState1;
    let filteredStatePerYear=getFilteredStatePerYearInit()
    barState=1;
    console.log(filteredStatePerYear)
    updateBars(svgBars, barScales, filteredStatePerYear);
    flag=3;

}


function action4()
{
  document.getElementById("filter_slider2").style.display = 'none';

  barState=1;
  let dados;
  if(countryState2==1)
    dados =rawData;
  else
    dados= filteredState; 


  let yearSum=getYearSum(dados)
  let xBars =  computeXScale(yearSum);
  let yBars =  computeYScale(yearSum);
  scales = {"x":xBars, "y": yBars}
  barState=1;
  updateBars(svgBars, scales, yearSum)
  flag=1;

}
function action5()
{
  document.getElementById("filter_slider2").style.display = 'none';
  barState=1;
  
  let dados;
  if(countryState2==1)
    dados =getMonthSum(rawData);
  else
    dados= filteredState; 

  let xBars =  computeXScale(filteredState);
  let yBars =  computeYScale(filteredState);
  scales = {"x":xBars, "y": yBars}
  updateBars(svgBars, scales, filteredState);
  flag=2;

}

function action6()
{
  document.getElementById("filter_slider2").style.display = 'inline';
  countryState=countryState1;
  let filteredStatePerYear=getFilteredStatePerYearInit()
    barState=1;
    console.log(filteredStatePerYear)
    updateBars(svgBars, barScales, filteredStatePerYear);

    flag=3;

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
  
  // Close the dropdown if the user clicks outside of it
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