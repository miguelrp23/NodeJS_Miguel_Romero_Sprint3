const http = require('http')
const bl = require('bl')

http.get(process.argv[2], function (response: any ) {
  response.pipe(bl(function (err: NodeJS.ErrnoException , data: string | string[]) {
    if (err) {
      return console.error(err)
    }
    data = data.toString()
    console.log(data.length)
    console.log(data)
  }))
})

export {}