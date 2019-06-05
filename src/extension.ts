// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {
export function activate({ subscriptions }: vscode.ExtensionContext) {

	// register a command to invoke when the status bar item is selected
	// const myCommandId = 'sample.showSelectionCount';
	// context.subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
	// 	let n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
	// 	vscode.window.showInformationMessage(`Yeah, ${n} line(s) selected... Keep going!`);
	// }));

	// create a new status bar item that we can now manage
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	// statusBarItem.command = myCommandId;
	subscriptions.push(statusBarItem);

	// register some listener that make sure the status bar item always up-to-date
	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

	// update status bar item once at start
	updateStatusBarItem();
}

function updateStatusBarItem(): void {
	console.log(`updating status bar item`);
	let n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
	statusBarItem.show();
	if (n > 0) {
		statusBarItem.text = `$(megaphone) ${n} line(s) selected`;
	}
}

function getNumberOfSelectedLines(editor: vscode.TextEditor | undefined): number {
	let lines = 0;
	if (editor) {
		lines = editor.selections.reduce((prev, curr) => prev + (curr.end.line - curr.start.line), 0);
	}
	return lines;
}

// this method is called when your extension is deactivated
export function deactivate() {}
