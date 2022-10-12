export default class Help {
  static getCommands() {
    const html = [
      '<b>List of commands:</b>',
      '    <b>/help</b> - <i>Show all available commands</i>',
      '    <b>/addcategory</b> - <i>Create a new category</i>',
      '    <b>/getcategory</b> - <i>Find category</i>',
    ];
    return html.join('\n');
  }
}
