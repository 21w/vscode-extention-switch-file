# open-test-file README

VS Code extension that makes it easy to open test files from your source files.

## Features

- **Quick test file navigation**: Press `Command+B` (macOS) to open the corresponding test file
- **Smart path mapping**: Automatically converts `xxx.ts` to `xxx.test.ts`
- **Error handling**: Shows helpful error messages if the test file doesn't exist or if the current file is not a TypeScript file

## How to Use

1. Open a TypeScript source file (e.g., `src/utils.ts`)
2. Press `Command+B`
3. The corresponding test file (e.g., `src/utils.test.ts`) will open

## Keybindings

| Action | Keybinding |
|--------|-----------|
| Open Test File | `Command+B` |

## Requirements

- VS Code 1.108.1 or later
- TypeScript files with `.ts` extension
- Test files following the naming convention: `*.test.ts`

## Known Issues

- Currently supports only `.ts` files. Support for `.js` and other extensions can be added in future versions
- The extension will show an error if the test file doesn't exist - you'll need to create it first

## Release Notes

### 1.0.0

Initial release of Open Test File extension with Command+B keybinding support

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
