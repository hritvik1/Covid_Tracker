'use strict'

const covidAPI_1 = 'https://api.covid19api.com/country/',
      covidAPI_2 = '?from=',
      covidAPI_3 = 'T00:00:00Z',
      covidAPI_4 = '&to='

async function submitData() {
  event.preventDefault()

  const countryName = document.getElementById('countryName').value,
        startDate   = document.getElementById('startDate').value,
        endDate     = document.getElementById('endDate').value,
        confirmed   = document.getElementById("confirmedCase"),
        active      = document.getElementById("activeCase"),
        deaths      = document.getElementById("deathsCase")

  const finalApiUrl = covidAPI_1 + countryName + covidAPI_2 + startDate + covidAPI_3 + covidAPI_4 + endDate + covidAPI_3

  fetch(finalApiUrl)
      .then((response) => response.json())
      .then((response) => {
          const length = response.length,
                index  = length - 1

          const conf = response[index].Confirmed,
                act = response[index].Active,
                dth = response[index].Deaths

          confirmed.innerHTML = conf
          active.innerHTML    = act
          deaths.innerHTML    = dth

          document.getElementById("display_cases").style.display = "block"
      })
}
