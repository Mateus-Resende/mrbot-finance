
class Help {
  static getCommands () {
    let html = []
    html.push(
      '<b>List of commands:</b>',
      '  <i>\\help</i> - Show all available commands'
    )
    return html.join('\n')
  }
}

module.exports = Help
