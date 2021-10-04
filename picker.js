var shoe = require('shoe')

var stream = shoe('/picker')

document.getElementById('target').addEventListener('click', ev => {
  const mouseY = ev.clientY
  const clientHeight = document.body.clientHeight
  const normalizedY = mouseY / clientHeight
  stream.write(JSON.stringify(normalizedY))
  stream.end()
})
