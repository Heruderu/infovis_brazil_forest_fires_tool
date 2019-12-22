// Miguel Rosa - 76655
// Helder Serra - 96307
// Information Visualization Development Assignment

// function to get a sum of a single month
function getMonthSum(data) {
  let countrySum = d3.nest()
    .key(function (d) {
      return d.Periodo;
    })


    .rollup(function (leaves) {
      let tot = d3.sum(leaves, d => d.Número);
      let order = d => d.Número
      return {a: +tot, n: order};
    })

    .entries(data)
    .map(function (sms) {
      return {
        Periodo: +sms.key,
        Número: sms.value.a,
        Order: (((+sms.key) % 10000) * 100) + Math.floor((+sms.key) / 10000)


      }
    });

  countrySum.sort(function (x, y) {
    return d3.ascending(x.Order, y.Order);
  })

  return countrySum;

}

// function to get the sum of a single year
function getYearSum(data) {
  let yearSum = d3.nest()
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
    .map(function (sms) {
      return {
        Ano: sms.key,
        Número: sms.value
      }
    });
  return yearSum;

}

// function to initialize data for each state per year
function getFilteredStatePerYearInit() {
  let filteredStatePerYear;
  let dados;
  if (countryState == 1) {
    dados = getMonthSum(rawData);
    filteredStatePerYear = dados.filter(d => d.Periodo % 10000 == 1999);
  } else {
    dados = filteredState;
    filteredStatePerYear = dados.filter(d => d.Ano == 1999);
  }

  return filteredStatePerYear;

}

// function to get the previous information
function getFilteredStatePerYear() {
  let filteredStatePerYear;
  let dados;
  if (countryState == 1) {
    dados = getMonthSum(rawData);
    filteredStatePerYear = dados.filter(d => d.Periodo % 10000 == +this.value);

  } else {
    dados = filteredState;
    filteredStatePerYear = dados.filter(d => d.Ano == +this.value);
  }

  return filteredStatePerYear;

}