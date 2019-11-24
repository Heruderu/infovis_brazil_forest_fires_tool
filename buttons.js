function slider()
{
    let slider = d3.select("#filter_slider");
           let label = d3.select("#label");
           let min = 1999 
               max = 2016
            slider
               .attr("min", min)
               .attr("max", max)
               .attr("value", 1)
               .attr("step", 1)
               .on("input", function(d) {
                   label.text(this.value); // use `this` on the place of slider
                   let filteredStatePerYear= filteredState.filter(d=> d.Ano===+this.value);
                  
                   //if(barState==0){
                      // drawBars(svgBars, barScales, filteredStatePerYear);
                    // }
                //   else
                        barState=1;
                       updateBars(svgBars, barScales, filteredStatePerYear);
               })        
}
function setCurrentDiv2()
{
    currentDiv= "#Div2";
    svgBars = svgBars1;
}
function setCurrentDiv3()
{
  currentDiv= "#Div3";
  svgBars = svgBars2;

}

function action1()
{
  document.getElementById("filter_slider").style.display = 'none';

  let yearSum=getYearSum(filteredState)
  let xBars =  computeXScale(yearSum);
  let yBars =  computeYScale(yearSum);
  scales = {"x":xBars, "y": yBars}
  barState=1;
  updateBars(svgBars, scales, yearSum)
}

function action2()
{
  document.getElementById("filter_slider").style.display = 'inline';
  let filteredStatePerYear= filteredState.filter(d=> d.Ano===1999);
    barState=1;
    console.log(filteredStatePerYear)
    updateBars(svgBars, barScales, filteredStatePerYear);


}

function action4()
{
  document.getElementById("filter_slider2").style.display = 'none';

  let yearSum=getYearSum(filteredState)
  let xBars =  computeXScale(yearSum);
  let yBars =  computeYScale(yearSum);
  scales = {"x":xBars, "y": yBars}
  barState=1;
  updateBars(svgBars, scales, yearSum)
}

function action5()
{
  document.getElementById("filter_slider2").style.display = 'inline';
  let filteredStatePerYear= filteredState.filter(d=> d.Ano===1999);
    barState=1;
    console.log(filteredStatePerYear)
    updateBars(svgBars, barScales, filteredStatePerYear);


}


//WEB FUNCTIONS
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction(str) {
    document.getElementById(str).classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
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
  }
/*
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn1')) {
      var dropdowns = document.getElementsByClassName("dropdown-content1");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  */