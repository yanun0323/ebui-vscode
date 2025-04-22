<a href="."><img height="160" src="./images/cover.png"></a>

[![English](https://img.shields.io/badge/English-Click-yellow)](README.md)
[![繁體中文](https://img.shields.io/badge/繁體中文-點擊查看-orange)](README-tw.md)
[![简体中文](https://img.shields.io/badge/简体中文-点击查看-orange)](README-cn.md)
[![日本語](https://img.shields.io/badge/日本語-クリック-青)](README-ja.md)
[![한국어](https://img.shields.io/badge/한국어-클릭-yellow)](README-ko.md)

この拡張機能は、Go UI アプリケーションを構築する際に、[EBUI](https://github.com/yanun0323/ebui) UI コンポーネントをリアルタイムでプレビューし、SwiftUI のようなホットリロード体験を提供します。

## インストール

[![Marketplace](https://img.shields.io/visual-studio-marketplace/v/Yanun.ebui-vscode?label=VSCode%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=Yanun.ebui-vscode)

## 特徴

- Go ファイルを保存する際に EBUI コンポーネントをリアルタイムでプレビュー
- 自動ホットリロード機能による UI 変更のリアルタイム表示
- EBUI フレームワークとのシームレスな統合
- 必要な EBUI ツールの自動インストール

## 前提条件

- Go 開発環境
- プロジェクトで使用される[EBUI フレームワーク](https://github.com/yanun0323/ebui)

## 使い方

1. VSCode マーケットプレイスからこの拡張機能をインストール
2. VSCode で EBUI プロジェクトを開く
3. `Preview_`で始まる関数を作成してプレビューコンポーネントを定義
4. ファイルを保存すると、プレビューウィンドウに自動的に変更が表示される

## 例

`Preview_`関数を含むファイルを作成します：

```go
package mypackage

import (
	ui "github.com/yanun0323/ebui"
	"image/color"
)

// この関数は自動的に検出されプレビューされます
func Preview_MyButton() ui.View {
	return ui.Button(ui.Const("クリック")).
		BackgroundColor(ui.Bind[color.Color](color.RGBA{200, 100, 100, 255})).
		Padding(ui.Bind(ui.Inset{10, 10, 10, 10})).
		Center()
}
```

ファイルを保存すると、プレビューウィンドウに自動的に UI コンポーネントが表示されます。

## 仕組み

この拡張機能は Go ファイルの変更を監視し、`Preview_`で始まる関数を自動的にプレビューします。単一のファイル内に複数のプレビュー関数を作成して、異なる UI コンポーネントをテストすることができます。

## 拡張機能の設定

この拡張機能は以下の設定を提供します：

- `ebui-vscode.enableAutoRun`：Go ファイル保存時の自動プレビュー機能の有効/無効
- `ebui-vscode.debounceDelay`：最後の保存後、プレビューを更新するまでの待機時間（ミリ秒、デフォルト：500ms）

## 手動コマンド

- `EBUI: Install ebui tool` - EBUI ツールを手動でインストール
- `EBUI: Run ebui on current file` - 現在のファイルを手動でプレビュー

## 詳細情報

EBUI フレームワークとその機能についての詳細は、[EBUI リポジトリ](https://github.com/yanun0323/ebui)をご覧ください。
