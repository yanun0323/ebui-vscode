# EBUI VSCode Extension

This VSCode extension is designed to automatically run the EBUI tool, monitoring changes in Go files and automatically executing the `ebui -f ${FILEPATH}` command when saving.

## Features

- Automatically executes the `ebui -f ${FILEPATH}` command when saving Go files
- Automatically checks and installs the EBUI tool (`go install "github.com/yanun0323/ebui/tool/ebui"`) when the extension starts
- Provides command palette commands for manually installing and running the EBUI tool
- Includes debouncing to prevent multiple executions when saving rapidly

## Requirements

- Requires Go development environment to be installed

## Extension Settings

This extension provides the following settings:

- `ebui-vscode.enableAutoRun`: Enable/disable automatic running of EBUI when saving Go files
- `ebui-vscode.debounceDelay`: Delay in milliseconds to wait after the last save before running ebui (default: 500ms)

## Usage

1. After installing the extension, it will automatically attempt to install the EBUI tool
2. Open any Go file, edit and save
3. The extension will automatically run the `ebui -f ${FILEPATH}` command after the debounce delay
4. If you save multiple times quickly, the command will only run once after you stop saving

## Manual Commands

- `EBUI: Install ebui tool` - Manually install the EBUI tool
- `EBUI: Run ebui on current file` - Manually run EBUI on the current file
