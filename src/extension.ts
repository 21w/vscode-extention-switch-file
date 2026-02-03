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
		const fileName = path.basename(currentPath);

		// Check if the current file is already a test file
		if (currentPath.includes('.test.')) {
			vscode.window.showInformationMessage('The current file is already a test file');
			return;
		}

		// Get the file name without extension
		const fileNameWithoutExt = fileName.replace(/\.ts$/, '');

		// If the path didn't change, it means the file doesn't end with .ts
		if (fileNameWithoutExt === fileName) {
			vscode.window.showErrorMessage('Current file is not a .ts file');
			return;
		}

		// Create a glob pattern to search for the test file
		const testFilePattern = `**/${fileNameWithoutExt}.test.ts`;

		try {
			// Search for the test file in the workspace
			const testFiles = await vscode.workspace.findFiles(testFilePattern);

			if (testFiles.length === 0) {
				vscode.window.showErrorMessage(`Test file not found for: ${fileName}`);
				return;
			}

			// If multiple test files are found, open the first one
			// (Usually there should be only one, but handle edge cases)
			const testFileUri = testFiles[0];
			await vscode.window.showTextDocument(testFileUri);
		} catch (error) {
			vscode.window.showErrorMessage(`Failed to open test file: ${error}`);
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
