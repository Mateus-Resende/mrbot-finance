/* eslint-disable no-undef */
const help = require('./help')

test('sends returns the HTML with the commands', () => {
  const commands = [
    '<b>List of commands:</b>',
    '  <i>\\help</i> - Show all available commands'
  ].join('\n')
  expect(help.getCommands()).toEqual(commands)
})

/* eslint-enable no-undef */
