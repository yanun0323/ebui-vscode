import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as util from 'util';
import * as path from 'path';

const execPromise = util.promisify(cp.exec);

// Create output channel for logging
const outputChannel = vscode.window.createOutputChannel('ebui-vscode');

// Debounce timer
let debounceTimer: NodeJS.Timeout | undefined;

export async function activate(context: vscode.ExtensionContext) {
	// Output activation message
	outputChannel.appendLine('EBUI extension activated');

	try {
		// Try to install EBUI tool
		await installEbuiTool();
	} catch (error) {
		vscode.window.showErrorMessage(`Failed to install EBUI tool: ${error}`);
		outputChannel.appendLine(`Failed to install EBUI tool: ${error}`);
	}

	// Register command: Install EBUI tool
	let installEbuiCommand = vscode.commands.registerCommand('ebui-vscode.installEbui', async () => {
		try {
			await installEbuiTool();
			vscode.window.showInformationMessage('EBUI tool installed successfully!');
			outputChannel.appendLine('EBUI tool installed successfully!');
		} catch (error) {
			vscode.window.showErrorMessage(`Failed to install EBUI tool: ${error}`);
			outputChannel.appendLine(`Failed to install EBUI tool: ${error}`);
		}
	});
	context.subscriptions.push(installEbuiCommand);

	// Register command: Run EBUI on current file
	let runEbuiCommand = vscode.commands.registerCommand('ebui-vscode.runEbui', async () => {
		await runEbuiOnCurrentFile();
	});
	context.subscriptions.push(runEbuiCommand);

	// Register file save event listener with debouncing
	let onSaveListener = vscode.workspace.onDidSaveTextDocument((document) => {
		// Check if auto-run is enabled and the file is a Go file
		const config = vscode.workspace.getConfiguration('ebui-vscode');
		if (config.get<boolean>('enableAutoRun') && document.languageId === 'go') {
			// Get the user-defined debounce delay (default to 500ms if not set)
			const debounceDelay = config.get<number>('debounceDelay') || 500;
			
			// Clear any existing timer
			if (debounceTimer) {
				clearTimeout(debounceTimer);
			}
			
			// Create a new timer
			debounceTimer = setTimeout(async () => {
				await runEbuiOnCurrentFile();
				debounceTimer = undefined;
			}, debounceDelay);
		}
	});
	context.subscriptions.push(onSaveListener);
}

async function installEbuiTool(): Promise<void> {
	vscode.window.showInformationMessage('Installing EBUI tool...');
	outputChannel.appendLine('Installing EBUI tool...');
	
	try {
		const { stdout, stderr } = await execPromise('go install github.com/yanun0323/ebui/tool/ebui@latest');
		outputChannel.appendLine('EBUI tool installation successful:');
		outputChannel.appendLine(stdout);
		if (stderr) {
			outputChannel.appendLine('EBUI tool installation warnings:');
			outputChannel.appendLine(stderr);
		}
		
		return;
	} catch (error) {
		outputChannel.appendLine(`EBUI tool installation failed: ${error}`);
		throw new Error('Unable to install EBUI tool, make sure Go is installed on your system');
	}
}

async function runEbuiOnCurrentFile(): Promise<void> {
	// Get current active editor
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		vscode.window.showInformationMessage('No file is open');
		outputChannel.appendLine('No file is open');
		return;
	}

	// Check if the file is a Go file
	if (editor.document.languageId !== 'go') {
		vscode.window.showInformationMessage('Current file is not a Go file');
		outputChannel.appendLine('Current file is not a Go file');
		return;
	}

	// Get the absolute path of the file
	const filePath = editor.document.uri.fsPath;
	
	// Create status bar item to display progress
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	statusBarItem.text = `$(sync~spin) Running ebui...`;
	statusBarItem.show();

	try {
		// Execute ebui command
		const command = `ebui -f "${filePath}"`;
		outputChannel.appendLine(`Executing command: ${command}`);
		
		const { stdout, stderr } = await execPromise(command);
		
		// Output command results
		outputChannel.appendLine('EBUI execution results:');
		outputChannel.appendLine(stdout);
		if (stderr) {
			outputChannel.appendLine('EBUI execution warnings:');
			outputChannel.appendLine(stderr);
		}
		
		// Update status bar
		statusBarItem.text = `$(check) EBUI execution completed`;
		setTimeout(() => {
			statusBarItem.dispose();
		}, 3000);
	} catch (error) {
		outputChannel.appendLine(`EBUI execution failed: ${error}`);
		statusBarItem.text = `$(error) EBUI execution failed`;
		setTimeout(() => {
			statusBarItem.dispose();
		}, 3000);
		vscode.window.showErrorMessage(`EBUI execution failed: ${error}`);
	}
}

export function deactivate() {
	// Clear any existing timer
	if (debounceTimer) {
		clearTimeout(debounceTimer);
	}
	outputChannel.appendLine('EBUI extension deactivated');
} 