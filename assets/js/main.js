'use strict'

const covidAPI_1 = 'https://api.covid19api.com/country/',
      covidAPI_2 = '?from=',
      covidAPI_3 = 'T00:00:00Z',
      covidAPI_4 = '&to='

async function submitData() {
  event.preventDefault();

  const countryName = document.getElementById('countryName').value,
        startDate   = document.getElementById('startDate').value,
        endDate     = document.getElementById('endDate').value

  var confirmed = document.getElementById("confirmed");
  var active    = document.getElementById("active");
  var deaths    = document.getElementById("deaths");


  let finalApiUrl = covidAPI_1 + countryName + covidAPI_2 + startDate + covidAPI_3 + covidAPI_4 + endDate + covidAPI_3;

  fetch(finalApiUrl)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        var length=res.length;
        var index=length-1;

        var c=res[index].Confirmed;
        var a=res[index].Active;
        var d=res[index].Deaths;

        confirmed.innerHTML=c;
        active.innerHTML=a;
        deaths.innerHTML=d;

        document.getElementById("res").style.display="block";

      })
}
