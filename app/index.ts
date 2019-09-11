import ErrorHandler from './errors/handler'
import NotFoundError from './errors/not-found'

const express = require('express')

const PORT: number = parseInt(process.env.PORT || '4687')

namespace App {
  export function init() {
    const app = express()

    app.use(function (_req: any, _res: any, next: Function) {
      const err = new NotFoundError('Route not found')
      next(err)
    })

    app.use(ErrorHandler.run)
    app.listen(PORT, () => console.log(`MrBot Finance listing on port ${PORT}`))
  }
}

export = App
