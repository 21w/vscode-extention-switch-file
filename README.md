# open-test-file README

ソースファイルから対応するテストファイルを簡単に開けるVS Code拡張機能です。

## 機能

- **素早いテストファイルナビゲーション**: `Command+B` でテストファイルを開くことができます
- **自動パス変換**: `xxx.ts` から `xxx.test.ts` に自動的に変換します
- **エラーハンドリング**: テストファイルが存在しない場合やTypeScript以外のファイルの場合に、適切なエラーメッセージを表示します

## 使い方

1. TypeScriptのソースファイルを開きます（例：`src/utils.ts`）
2. `Command+B` を押します
3. 対応するテストファイル（例：`src/utils.test.ts`）が開きます

## キーバインディング

| 操作 | キー |
|--------|-----------|
| テストファイルを開く | `Command+B` |

## 必要な環境

- VS Code 1.108.1 以上
- `.ts` 拡張子のTypeScriptファイル
- `*.test.ts` という命名規則に従ったテストファイル

## 既知の問題

- 現在、`.ts` ファイルのみに対応しています。`.js` やその他の拡張子のサポートは今後追加される予定です
- テストファイルが存在しない場合、拡張機能はエラーを表示します。先にテストファイルを作成する必要があります

## リリースノート

### 1.0.0

Command+B キーバインディング対応のOpen Test File拡張機能を初期リリースしました

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
