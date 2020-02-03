// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {
export function activate({ subscriptions }: vscode.ExtensionContext) {
	// create a new status bar item that we can now manage
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	subscriptions.push(statusBarItem);

	// register some listener that make sure the status bar item always up-to-date
	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

	// update status bar item once at start
	updateStatusBarItem();
}

function updateStatusBarItem(): void {
	statusBarItem.show();
	statusBarItem.text = getOffsetString(vscode.window.activeTextEditor);
}

function getOffsetString(editor: vscode.TextEditor | undefined): string {
	let offset = "";
	if (editor) {
		for (let i = 0; i < editor.selections.length; i++) {
			const selection = editor.selections[i];
			let startB = "#"+byteOffsetAt(editor.document, selection.start);
			let endB = "#"+byteOffsetAt(editor.document, selection.end);
			let b = startB;
			if (startB != endB) {
				b = startB+"-"+endB;
			}
			
			if (offset.length > 0) {
				offset += ",";
			}
			offset += b;
		}
	}
	return offset;
}

function byteOffsetAt(document: vscode.TextDocument, position: vscode.Position): number {
	const offset = document.offsetAt(position);
	const text = document.getText();
	return Buffer.byteLength(text.substr(0, offset));
}

// this method is called when your extension is deactivated
export function deactivate() {}
