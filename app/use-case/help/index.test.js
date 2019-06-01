/* eslint-disable no-undef */
const help = require('./index.js.js')

test('sends returns the HTML with the commands', () => {
  const commands = [
    '<b>List of commands:</b>',
    '    <b>/help</b> - <i>Show all available commands</i>'
  ].join('\n')
  expect(help.getCommands()).toEqual(commands)
})

/* eslint-enable no-undef */
