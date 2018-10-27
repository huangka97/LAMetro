const METRO_API = 'https://cors.io/?https://api.metro.net'

function getNewData() {
  console.log('updating data')
  fetch(`${METRO_API}/agencies/lametro-rail/routes/806/stops/80134/predictions/`)
    .then(res => res.json())
    .then(updatePage)
    .catch(couldntUpdate)
}

function couldntUpdate(reason) {
  // TODO: Do something reasonable
  window.alert("Couldn't update now.")
  console.error(reason)
}

function updatePage(predictions) {
  let toSM = []
  let toLA = []
  for (item of predictions.items) {
    if(item.run_id === '806_0_var0') {
      toLA.push(item.minutes)
    } else if (item.run_id === '806_1_var1') {
      toSM.push(item.minutes)
    }
  }
  let addMin = (item) => item + ' min'
  let sm = toSM.sort((a, b) => a - b).map(addMin).join(', ')
  let la = toLA.sort((a, b) => a - b).map(addMin).join(', ')
  putOnPage({ sm, la })
}

function putOnPage({ sm, la }) {
  document.getElementById('countdown-sm').innerHTML = sm
  document.getElementById('countdown-la').innerHTML = la
}

getNewData()
window.setInterval(getNewData, 5000)
