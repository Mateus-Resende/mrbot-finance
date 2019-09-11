const notFound: Array<string> = ['not_found']
const badRequest: Array<string> = ['bad_request']

namespace Handler {
  export function run (err: Error, _req: any, res: any, _next: Function) {
    let status: number = 500

    if (badRequest.includes(err.name)) {
      status = 400
    } else if (notFound.includes(err.name)) {
      status = 404
    }

    return res
      .status(status)
      .send({ name: err.name, message: err.message })
  }
}

export = Handler
