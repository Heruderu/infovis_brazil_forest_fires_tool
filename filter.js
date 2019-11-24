function getMonthSum(data) {
   let countrySum  = d3.nest()
            .key(function (d) {
                return d.Periodo;
                })
            
            
           .rollup(function (leaves) {
                let tot = d3.sum(leaves, function (d) {
                    return d.Número;
                });

                return +tot;
                })

           .entries(data)
           .map(function(sms){
            return{ Periodo: sms.key,
                    Número:sms.value}
       });
           
        return countrySum;
       
}
function getYearSum(data) {
    let yearSum  = d3.nest()
            .key(function (d) {
                return d.Ano;
                })
            
            
           .rollup(function (leaves) {
                let tot = d3.sum(leaves, function (d) {
                    return d.Número;
                });

                return +tot;
                })

           .entries(data)
           .map(function(sms){
                return{ Ano: sms.key,
                        Número:sms.value}
           });
    return yearSum; 
       
}


function getFilteredStatePerYearInit()
{ 
  let filteredStatePerYear;
  let dados;
  if(countryState==1)
  { 
     dados =getMonthSum(rawData);
    filteredStatePerYear= dados.filter(d=> d.Periodo%10000===1999);
    }
      else
    {dados= filteredState; 
     filteredStatePerYear= dados.filter(d=> d.Ano===1999);
    }

  return filteredStatePerYear;  

}
function getFilteredStatePerYear()
{ 
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

  return filteredStatePerYear;  

}