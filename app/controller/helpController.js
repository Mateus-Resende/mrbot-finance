
class HelpController {
  static getCommands () {
    let html = []
    html.push(
      '<b>List of commands:</b>',
      '  <i>Help</i> - Show all available commands'
    )
    return html.join('\n')
  }
}

module.exports = HelpController
