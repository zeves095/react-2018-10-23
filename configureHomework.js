// https://stackoverflow.com/questions/51150956/how-to-fix-this-error-typeerror-err-invalid-callback-callback-must-be-a-funct/51155728
const fs = require('fs')
const path = './node_modules/react-scripts/config/paths.js'
const user = 'zeves097'
const lesson = 'HT3'
const folder = `homework/${user}/${lesson}`
const fromFolder = /src/g

// !fs.existsSync(folder) && fs.mkdirSync(folder, '0755', true);

fs.readFile(path, 'utf8', (err, data) => {
  if (err) throw err
  data = data.replace(fromFolder, folder)
  //  console.log(data);
  fs.writeFile(path, data, function(err, result) {
    if (err) console.log('error', err)
  })
})
