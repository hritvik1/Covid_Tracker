'use strict'

const covidAPI_1 = 'https://api.covid19api.com/country/',
      covidAPI_2 = '?from=',
      covidAPI_3 = 'T00:00:00Z',
      covidAPI_4 = '&to='

async function submitData() {
  event.preventDefault()
  document.getElementById("display_cases").style.display = "none"

  const countryName = document.getElementById('countryName').value,
        startDate   = document.getElementById('startDate').value,
        endDate     = document.getElementById('endDate').value,
        confirmed   = document.getElementById("confirmedCase"),
        active      = document.getElementById("activeCase"),
        deaths      = document.getElementById("deathsCase")

  const finalApiUrl = covidAPI_1 + countryName + covidAPI_2 + startDate + covidAPI_3 + covidAPI_4 + endDate + covidAPI_3,
        date_start  = new Date(startDate).getTime(),
        date_end    = new Date(endDate).getTime(),
        date_today  = new Date().getTime()

  if(countryName === '' || startDate === '' || endDate === '') {
    alert("Please Fill Complete Form!!!!")
  }
  else if(date_end < date_start) {
    alert("END date can't be smaller than START date!!!!")
  }
  else if(date_start > date_today || date_end > date_today) {
    alert("Start/End date must not greater than today's date!!!!!")
  }
  else {
      document.getElementById("loading").style.display = "block"

      await fetch(finalApiUrl)
          .then(response => response.json())
          .then(response => {
              const length = response.length,
                  index  = length - 1

              const conf = response[index].Confirmed,
                  act = response[index].Active,
                  dth = response[index].Deaths

              confirmed.innerHTML = conf
              active.innerHTML    = act
              deaths.innerHTML    = dth

              document.getElementById("main_form").reset()
              document.getElementById("loading").style.display = "none"
              document.getElementById("display_cases").style.display = "block"
          })
          .catch(function(error) {
            console.log(error)
            document.getElementById("loading").style.display = "none"
            alert('Error fetching data/Data not available/Request timed out....')
          })
  }
}
