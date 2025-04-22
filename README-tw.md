<a href="."><img height="160" src="./images/cover.png"></a>

[![English](https://img.shields.io/badge/English-Click-yellow)](README.md)
[![繁體中文](https://img.shields.io/badge/繁體中文-點擊查看-orange)](README-tw.md)
[![简体中文](https://img.shields.io/badge/简体中文-点击查看-orange)](README-cn.md)
[![日本語](https://img.shields.io/badge/日本語-クリック-青)](README-ja.md)
[![한국어](https://img.shields.io/badge/한국어-클릭-yellow)](README-ko.md)

這是一個用於即時預覽 [EBUI](https://github.com/yanun0323/ebui) UI 元件的 VSCode 擴充插件，在建立 Go UI 應用程式時提供類似 SwiftUI 的熱重載體驗。

## 安裝

[![Marketplace](https://img.shields.io/visual-studio-marketplace/v/Yanun.ebui-vscode?label=VSCode%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=Yanun.ebui-vscode)

## 功能特點

- 在保存 Go 檔案時即時預覽 EBUI 元件
- 自動熱重載功能，實時查看 UI 變更
- 與 EBUI 框架無縫整合
- 自動安裝所需的 EBUI 工具

## 使用前提

- Go 開發環境
- 專案中引入 [EBUI 框架](https://github.com/yanun0323/ebui)

## 快速開始

1. 從 VSCode 商店安裝此擴充插件
2. 在 VSCode 中打開您的 EBUI 專案
3. 創建以 `Preview_` 開頭的函數來定義預覽元件
4. 保存檔案後自動在預覽視窗中查看變更

## 範例

創建一個包含 `Preview_` 函數的檔案：

```go
package mypackage

import (
	ui "github.com/yanun0323/ebui"
	"image/color"
)

// 此函數將被自動檢測並預覽
func Preview_MyButton() ui.View {
	return ui.Button(ui.Const("點擊我")).
		BackgroundColor(ui.Bind[color.Color](color.RGBA{200, 100, 100, 255})).
		Padding(ui.Bind(ui.Inset{10, 10, 10, 10})).
		Center()
}
```

當您保存檔案後，預覽視窗將自動顯示您的 UI 元件。

## 工作原理

此擴充插件會監控您的 Go 檔案變更，並自動預覽任何以 `Preview_` 開頭的函數。您可以在單個檔案中擁有多個預覽函數來測試不同的 UI 元件。

## 擴充插件設定

此擴充插件提供以下設定：

- `ebui-vscode.enableAutoRun`：啟用/禁用保存 Go 檔案時的自動預覽功能
- `ebui-vscode.debounceDelay`：設定在最後一次保存後更新預覽前等待的延遲時間（毫秒，預設：500ms）
- `ebui-vscode.keepWindows`：檔案變更時保留先前的 ebui 視窗（預設：啟用）

## 手動指令

- `EBUI: Install ebui tool` - 手動安裝 EBUI 工具
- `EBUI: Run ebui on current file` - 手動預覽當前檔案

## 更多資訊

有關 EBUI 框架及其功能的更多詳細資訊，請訪問 [EBUI 儲存庫](https://github.com/yanun0323/ebui)
