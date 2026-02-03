// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

	console.log('Extension "open-test-file" is now active!');

	const disposable = vscode.commands.registerCommand('open-test-file.openTestFile', async () => {
		const activeEditor = vscode.window.activeTextEditor;

		if (!activeEditor) {
			vscode.window.showErrorMessage('No file is currently open');
			return;
		}

		const currentUri = activeEditor.document.uri;
		const currentPath = currentUri.fsPath;
		const fileName = path.basename(currentPath);

		// Check if the current file is a test file
		if (currentPath.includes('.test.')) {
			// Open the implementation file from a test file
			await openImplementationFile(currentPath, fileName);
		} else {
			// Open the test file from an implementation file
			await openTestFile(currentPath, fileName);
		}
	});

	context.subscriptions.push(disposable);
}

async function openTestFile(currentPath: string, fileName: string) {
	// Get the file name without extension
	const fileNameWithoutExt = fileName.replace(/\.(ts|tsx)$/, '');

	// If the path didn't change, it means the file doesn't end with .ts or .tsx
	if (fileNameWithoutExt === fileName) {
		vscode.window.showErrorMessage('Current file is not a .ts or .tsx file');
		return;
	}

	// Determine the file extension
	const fileExt = fileName.endsWith('.tsx') ? 'tsx' : 'ts';

	// Create a glob pattern to search for the test file
	const testFilePattern = `**/${fileNameWithoutExt}.test.${fileExt}`;

	try {
		// Search for the test file in the workspace
		const testFiles = await vscode.workspace.findFiles(testFilePattern);

		if (testFiles.length === 0) {
			vscode.window.showErrorMessage(`Test file not found for: ${fileName}`);
			return;
		}

		// If multiple test files are found, open the first one
		const testFileUri = testFiles[0];
		await vscode.window.showTextDocument(testFileUri);
	} catch (error) {
		vscode.window.showErrorMessage(`Failed to open test file: ${error}`);
	}
}

async function openImplementationFile(currentPath: string, fileName: string) {
	// Get the file name without .test.ts or .test.tsx extension
	const fileNameWithoutTestExt = fileName.replace(/\.test\.(ts|tsx)$/, '');

	// If the path didn't change, it means the file doesn't end with .test.ts or .test.tsx
	if (fileNameWithoutTestExt === fileName) {
		vscode.window.showErrorMessage('Current file is not a .test.ts or .test.tsx file');
		return;
	}

	// Determine the file extension
	const fileExt = fileName.endsWith('.test.tsx') ? 'tsx' : 'ts';

	// Create a glob pattern to search for the implementation file
	const implementationFilePattern = `**/${fileNameWithoutTestExt}.${fileExt}`;

	try {
		// Search for the implementation file in the workspace
		// Filter out test files
		const allFiles = await vscode.workspace.findFiles(implementationFilePattern);
		const implementationFiles = allFiles.filter(uri => !uri.fsPath.includes('.test.'));

		if (implementationFiles.length === 0) {
			vscode.window.showErrorMessage(`Implementation file not found for: ${fileName}`);
			return;
		}

		// If multiple implementation files are found, open the first one
		const implementationFileUri = implementationFiles[0];
		await vscode.window.showTextDocument(implementationFileUri);
	} catch (error) {
		vscode.window.showErrorMessage(`Failed to open implementation file: ${error}`);
	}
}

export function deactivate() {}
