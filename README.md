# EBUI VSCode Extension

A VSCode extension for live previewing [EBUI](https://github.com/yanun0323/ebui) UI components, providing a SwiftUI-like hot-reload experience when building Go UI applications.

## Features

- Live preview of EBUI components as you save your Go files
- Automatic hot-reloading to see UI changes in real-time
- Seamless integration with the EBUI framework
- Automatic installation of required EBUI tools

## Prerequisites

- Go development environment
- [EBUI framework](https://github.com/yanun0323/ebui) in your project

## Getting Started

1. Install this extension from the VSCode marketplace
2. Open your EBUI project in VSCode
3. Create functions that start with `Preview_` to define preview components
4. Save your file to automatically see changes in a preview window

## Example

Create a file with a `Preview_` function:

```go
package mypackage

import (
	ui "github.com/yanun0323/ebui"
	"image/color"
)

// This function will be automatically detected and previewed
func Preview_MyButton() ui.View {
	return ui.Button(ui.Const("Click Me")).
		BackgroundColor(ui.Bind[color.Color](color.RGBA{200, 100, 100, 255})).
		Padding(ui.Bind(ui.Inset{10, 10, 10, 10})).
		Center()
}
```

When you save the file, a preview window will automatically appear showing your UI component.

## How It Works

This extension monitors your Go files for changes and automatically previews any function that starts with `Preview_`. You can have multiple preview functions in a single file to test different UI components.

## Extension Settings

This extension provides the following settings:

- `ebui-vscode.enableAutoRun`: Enable/disable automatic previewing when saving Go files
- `ebui-vscode.debounceDelay`: Delay in milliseconds to wait after the last save before updating the preview (default: 500ms)

## Manual Commands

- `EBUI: Install ebui tool` - Manually install the EBUI tool
- `EBUI: Run ebui on current file` - Manually preview the current file

## More Information

For more details about the EBUI framework and its capabilities, please visit the [EBUI repository](https://github.com/yanun0323/ebui).
