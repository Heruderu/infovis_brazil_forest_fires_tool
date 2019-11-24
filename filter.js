function getMonthSum(data) {
    countrySum  = d3.nest()
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
           
        console.log(countrySum)
       
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