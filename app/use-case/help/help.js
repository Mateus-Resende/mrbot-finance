
class Help {
  static getCommands () {
    let html = []
    html.push(
      '<b>List of commands:</b>',
      '    <b>/help</b> - <i>Show all available commands</i>'
    )
    return html.join('\n')
  }
}

module.exports = Help
