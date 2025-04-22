<a href="."><img height="160" src="./images/cover.png"></a>

[![English](https://img.shields.io/badge/English-Click-yellow)](README.md)
[![繁體中文](https://img.shields.io/badge/繁體中文-點擊查看-orange)](README-tw.md)
[![简体中文](https://img.shields.io/badge/简体中文-点击查看-orange)](README-cn.md)
[![日本語](https://img.shields.io/badge/日本語-クリック-青)](README-ja.md)
[![한국어](https://img.shields.io/badge/한국어-클릭-yellow)](README-ko.md)

이 VSCode 확장 프로그램은 Go UI 애플리케이션을 구축할 때 [EBUI](https://github.com/yanun0323/ebui) UI 컴포넌트를 실시간으로 미리보기 할 수 있게 해주며, SwiftUI와 유사한 핫 리로드 경험을 제공합니다.

## 설치

[![Marketplace](https://img.shields.io/visual-studio-marketplace/v/Yanun.ebui-vscode?label=VSCode%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=Yanun.ebui-vscode)

## 기능

- Go 파일을 저장할 때 EBUI 컴포넌트 실시간 미리보기
- 자동 핫 리로드 기능으로 UI 변경사항 실시간 확인
- EBUI 프레임워크와 원활한 통합
- 필요한 EBUI 도구 자동 설치

## 전제 조건

- Go 개발 환경
- 프로젝트에서 사용 중인 [EBUI 프레임워크](https://github.com/yanun0323/ebui)

## 시작하기

1. VSCode 마켓플레이스에서 이 확장 프로그램 설치
2. VSCode에서 EBUI 프로젝트 열기
3. `Preview_`로 시작하는 함수를 만들어 미리보기 컴포넌트 정의
4. 파일을 저장하면 미리보기 창에 자동으로 변경사항 표시

## 예제

`Preview_` 함수가 포함된 파일 생성:

```go
package mypackage

import (
	ui "github.com/yanun0323/ebui"
	"image/color"
)

// 이 함수는 자동으로 감지되어 미리보기됩니다
func Preview_MyButton() ui.View {
	return ui.Button(ui.Const("클릭")).
		BackgroundColor(ui.Bind[color.Color](color.RGBA{200, 100, 100, 255})).
		Padding(ui.Bind(ui.Inset{10, 10, 10, 10})).
		Center()
}
```

파일을 저장하면 미리보기 창에 자동으로 UI 컴포넌트가 표시됩니다.

## 작동 방식

이 확장 프로그램은 Go 파일의 변경사항을 모니터링하고 `Preview_`로 시작하는 함수를 자동으로 미리보기합니다. 한 파일 내에 여러 미리보기 함수를 만들어 다양한 UI 컴포넌트를 테스트할 수 있습니다.

## 확장 프로그램 설정

이 확장 프로그램은 다음 설정을 제공합니다:

- `ebui-vscode.enableAutoRun`: Go 파일 저장 시 자동 미리보기 기능 활성화/비활성화
- `ebui-vscode.debounceDelay`: 마지막 저장 후 미리보기 업데이트 전 대기 시간(밀리초, 기본값: 500ms)
- `ebui-vscode.keepWindows`: 파일 변경 시 이전 ebui 창 유지(기본값: 비활성화)

## 수동 명령어

- `EBUI: Install ebui tool` - EBUI 도구 수동 설치
- `EBUI: Run ebui on current file` - 현재 파일 수동 미리보기

## 추가 정보

EBUI 프레임워크와 그 기능에 대한 자세한 내용은 [EBUI 저장소](https://github.com/yanun0323/ebui)를 참조하세요.
