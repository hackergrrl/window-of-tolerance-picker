const picker = require('.')

picker((err, value) => {
  if (err) throw err
  console.log(value)
})

