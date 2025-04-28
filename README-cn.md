<a href="."><img height="160" src="./images/cover.png"></a>

[![English](https://img.shields.io/badge/English-Click-yellow)](README.md)
[![繁體中文](https://img.shields.io/badge/繁體中文-點擊查看-orange)](README-tw.md)
[![简体中文](https://img.shields.io/badge/简体中文-点击查看-orange)](README-cn.md)
[![日本語](https://img.shields.io/badge/日本語-クリック-青)](README-ja.md)
[![한국어](https://img.shields.io/badge/한국어-클릭-yellow)](README-ko.md)

这是一个用于实时预览 [EBUI](https://github.com/yanun0323/ebui) UI 组件的 VSCode 扩展插件，在构建 Go UI 应用程序时提供类似 SwiftUI 的热重载体验。

## 安装

[![Marketplace](https://img.shields.io/visual-studio-marketplace/v/Yanun.ebui-vscode?label=VSCode%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=Yanun.ebui-vscode)

## 功能特点

- 在保存 Go 文件时实时预览 EBUI 组件
- 自动热重载功能，实时查看 UI 变更
- 与 EBUI 框架无缝集成
- 自动安装所需的 EBUI 工具

## 使用前提

- Go 开发环境
- 项目中引入 [EBUI 框架](https://github.com/yanun0323/ebui)

## 快速开始

1. 从 VSCode 商店安装此扩展插件
2. 在 VSCode 中打开您的 EBUI 项目
3. 创建以 `Preview_` 开头的函数来定义预览组件
4. 保存文件后自动在预览窗口中查看变更

## 示例

创建一个包含 `Preview_` 函数的文件：

```go
package examples

import (
	. "github.com/yanun0323/ebui"
	"github.com/yanun0323/ebui/font"
)

type ExampleContentView struct {
	Title *Binding[string]
}

func (v *ExampleContentView) Body() SomeView {
	return HStack(
		Spacer(),
		VStack(
			Spacer(),
			Text(v.Title).
				FontSize(Const(font.Title3)),
			Button("Click Me", func() {
				if v.Title.Get() != "Hello, World!" {
					v.Title.Set("Hello, World!")
				} else {
					v.Title.Set("Hello, Ebui!")
				}
			}),
			Spacer(),
		).Spacing(),
		Spacer(),
	).
		BackgroundColor(Const(NewColor(200, 100, 100, 255))).
		Padding(Const(NewInset(10, 10, 10, 10)))
}

// 此函数将被自动检测并预览
func Preview_MyButton() View {
	return &ExampleContentView{
		Title: Bind("Hello, World!"),
	}
}
```

当您保存文件后，预览窗口将自动显示您的 UI 组件。

## 工作原理

此扩展插件会监控您的 Go 文件变更，并自动预览任何以 `Preview_` 开头的函数。您可以在单个文件中拥有多个预览函数来测试不同的 UI 组件。

## 扩展插件设置

此扩展插件提供以下设置：

- `ebui-vscode.enableAutoRun`：启用/禁用保存 Go 文件时的自动预览功能
- `ebui-vscode.debounceDelay`：设置在最后一次保存后更新预览前等待的延迟时间（毫秒，默认：500ms）
- `ebui-vscode.keepWindows`：文件变更时保留先前的 ebui 窗口（默认：禁用）

## 手动命令

- `EBUI: Install ebui tool` - 手动安装 EBUI 工具
- `EBUI: Run ebui on current file` - 手动预览当前文件

## 更多信息

有关 EBUI 框架及其功能的更多详细信息，请访问 [EBUI 仓库](https://github.com/yanun0323/ebui)
