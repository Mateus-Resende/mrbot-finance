class NotFound extends Error {
  name: string
  status: number

  constructor (message: string) {
    super(message)
    this.name = 'not_found'
    this.status = 404
  }
}

export = NotFound
