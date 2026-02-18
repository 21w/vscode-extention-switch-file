// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'node:path';

// Get configuration value
function getConfig<T>(key: string): T | undefined {
	const config = vscode.workspace.getConfiguration('openTestFile');
	return config.get<T>(key);
}

export function activate(context: vscode.ExtensionContext) {

	console.log('Extension "open-test-file" is now active!');

	const disposable = vscode.commands.registerCommand('open-test-file.openTestFile', async () => {
		// Check if the extension is enabled
		const enabled = getConfig<boolean>('enabled');
		if (enabled === false) {
			vscode.window.showInformationMessage('Open Test File extension is disabled. Enable it in settings.');
			return;
		}

		const activeEditor = vscode.window.activeTextEditor;

		if (!activeEditor) {
			vscode.window.showErrorMessage('No file is currently open');
			return;
		}

		const currentUri = activeEditor.document.uri;
		const currentPath = currentUri.fsPath;
		const fileName = path.basename(currentPath);

		// Determine file type based on extension
		if (fileName.endsWith('.java')) {
			// Java file handling
			if (fileName.endsWith('Test.java')) {
				// Open the implementation file from a test file
				await openImplementationFileJava(currentPath, fileName);
			} else {
				// Open the test file from an implementation file
				await openTestFileJava(currentPath, fileName);
			}
		} else if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) {
			// TypeScript file handling
			if (currentPath.includes('.test.')) {
				// Open the implementation file from a test file
				await openImplementationFile(currentPath, fileName);
			} else {
				// Open the test file from an implementation file
				await openTestFile(currentPath, fileName);
			}
		} else {
			vscode.window.showErrorMessage('Only TypeScript (.ts, .tsx) and Java (.java) files are supported');
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

	// Get the test pattern from configuration
	const testPattern = getConfig<string>('typescriptTestPattern') || '{name}.test.{ext}';
	const testFileName = testPattern.replace('{name}', fileNameWithoutExt).replace('{ext}', fileExt);

	// Get search scope from configuration
	const searchScope = getConfig<string>('searchScope') || 'workspace';

	// Create a glob pattern to search for the test file
	const testFilePattern = searchScope === 'sameDirectory' 
		? path.join(path.dirname(currentPath), testFileName).replaceAll('\\', '/')
		: `**/${testFileName}`;

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
	// Extract the base name and extension
	// For default pattern {name}.test.{ext}, we remove .test.ts or .test.tsx
	const fileNameWithoutTestExt = fileName.replace(/\.test\.(ts|tsx)$/, '');

	// If the path didn't change, it means the file doesn't match the test pattern
	if (fileNameWithoutTestExt === fileName) {
		vscode.window.showErrorMessage('Current file is not a test file');
		return;
	}

	// Determine the file extension
	const fileExt = fileName.endsWith('.test.tsx') ? 'tsx' : 'ts';

	// Get search scope from configuration
	const searchScope = getConfig<string>('searchScope') || 'workspace';

	// Create a glob pattern to search for the implementation file
	const implementationFileName = `${fileNameWithoutTestExt}.${fileExt}`;
	const implementationFilePattern = searchScope === 'sameDirectory'
		? path.join(path.dirname(currentPath), implementationFileName).replaceAll('\\', '/')
		: `**/${implementationFileName}`;

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

async function openTestFileJava(currentPath: string, fileName: string) {
	// Get the file name without .java extension
	const fileNameWithoutExt = fileName.replace(/\.java$/, '');

	// Get the test pattern from configuration
	const testPattern = getConfig<string>('javaTestPattern') || '{name}Test.java';
	const testFileName = testPattern.replace('{name}', fileNameWithoutExt);

	// Get search scope from configuration
	const searchScope = getConfig<string>('searchScope') || 'workspace';

	// Create a glob pattern to search for the test file
	const testFilePattern = searchScope === 'sameDirectory'
		? path.join(path.dirname(currentPath), testFileName).replaceAll('\\', '/')
		: `**/${testFileName}`;

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

async function openImplementationFileJava(currentPath: string, fileName: string) {
	// Get the file name without Test.java extension
	const fileNameWithoutTestExt = fileName.replace(/Test\.java$/, '');

	// If the path didn't change, it means the file doesn't end with Test.java
	if (fileNameWithoutTestExt === fileName.replace(/\.java$/, '')) {
		vscode.window.showErrorMessage('Current file is not a Test.java file');
		return;
	}

	// Get search scope from configuration
	const searchScope = getConfig<string>('searchScope') || 'workspace';

	// Create a glob pattern to search for the implementation file
	const implementationFileName = `${fileNameWithoutTestExt}.java`;
	const implementationFilePattern = searchScope === 'sameDirectory'
		? path.join(path.dirname(currentPath), implementationFileName).replaceAll('\\', '/')
		: `**/${implementationFileName}`;

	try {
		// Search for the implementation file in the workspace
		// Filter out test files
		const allFiles = await vscode.workspace.findFiles(implementationFilePattern);
		const implementationFiles = allFiles.filter(uri => !uri.fsPath.includes('Test.java'));

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

// This method is called when your extension is deactivated
export function deactivate() {
	// Cleanup code can be added here if needed
}
