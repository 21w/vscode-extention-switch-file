// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Extension "open-test-file" is now active!');

	// Register the command to open the test file
	const disposable = vscode.commands.registerCommand('open-test-file.openTestFile', async () => {
		const activeEditor = vscode.window.activeTextEditor;

		if (!activeEditor) {
			vscode.window.showErrorMessage('No file is currently open');
			return;
		}

		const currentUri = activeEditor.document.uri;
		const currentPath = currentUri.fsPath;

		// Check if the current file is already a test file
		if (currentPath.includes('.test.')) {
			vscode.window.showInformationMessage('The current file is already a test file');
			return;
		}

		// Replace .ts with .test.ts
		const testFilePath = currentPath.replace(/\.ts$/, '.test.ts');

		// If the path didn't change, it means the file doesn't end with .ts
		if (testFilePath === currentPath) {
			vscode.window.showErrorMessage('Current file is not a .ts file');
			return;
		}

		try {
			const testFileUri = vscode.Uri.file(testFilePath);
			await vscode.window.showTextDocument(testFileUri);
		} catch (error) {
			vscode.window.showErrorMessage(`Failed to open test file: ${testFilePath}`);
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
