import Help from '../../../app/use-cases/help';

test('sends returns the HTML with the commands', () => {
  const commands = [
    '<b>List of commands:</b>',
    '    <b>/help</b> - <i>Show all available commands</i>',
    '    <b>/addcategory</b> - <i>Create a new category</i>',
    '    <b>/getcategory</b> - <i>Find category</i>'
  ].join('\n')
  expect(Help.getCommands()).toEqual(commands)
})
