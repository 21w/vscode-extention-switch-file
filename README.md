# open-test-file README

ソースファイルから対応するテストファイルを簡単に開けるVS Code拡張機能です。

## 機能

- **双方向トグル機能**: `Command+Shift+T` で実装ファイル ⇄ テストファイルを切り替えできます
- **素早いテストファイルナビゲーション**: `Command+Shift+T` でテストファイルを開くことができます
- **ワークスペース全体から検索**: ファイルツリーの任意の場所にあるテストファイルを自動的に見つけます。同じディレクトリにない場合でも対応しています
- **自動パス変換**: 
  - TypeScript: `xxx.ts` / `xxx.tsx` ⇄ `xxx.test.ts` / `xxx.test.tsx`
  - Java: `xxx.java` ⇄ `xxxTest.java`
- **TypeScript & React & Java対応**: `.ts`、`.tsx`、`.java`ファイルに対応しています
- **エラーハンドリング**: テストファイルが存在しない場合やサポートされていないファイルの場合に、適切なエラーメッセージを表示します

## 使い方

### 実装ファイルからテストファイルを開く
1. TypeScript、TypeScript React、またはJavaファイルを開きます
   - 例：`src/context/User.ts`、`src/components/Button.tsx`、`src/service/UserService.java`
2. `Command+Shift+T` を押します
3. ワークスペース内から対応するテストファイルが自動的に検索され開きます
   - 例：`tests/User.test.ts`、`tests/Button.test.tsx`、`tests/UserServiceTest.java`

### テストファイルから実装ファイルを開く
1. テストファイルを開きます
   - 例：`tests/User.test.ts`、`tests/Button.test.tsx`、`tests/UserServiceTest.java`
2. `Command+Shift+T` を押します
3. ワークスペース内から対応する実装ファイルが自動的に検索され開きます
   - 例：`src/context/User.ts`、`src/components/Button.tsx`、`src/service/UserService.java`

## キーバインディング

| 操作 | キー |
|--------|-----------|
| テストファイルを開く | `Command+Shift+T` |
- サポートされているファイル形式：
  - TypeScript: `.ts` または `.tsx` 拡張子のファイル
  - Java: `.java` 拡張子のファイル
- テストファイルの命名規則：
  - TypeScript: `*.test.ts` または `*.test.tsx`
  - Java: `*Test.java`

## 動作原理

拡張機能は以下の流れでテストファイルを検索します：

### TypeScript/TSXファイルの場合
1. 現在のファイル名（例：`User.ts` または `Button.tsx`）から拡張子を削除
2. ワークスペース全体から `User.test.ts` または `Button.test.tsx` にマッチするファイルをグロブパターン（`**/User.test.ts` または `**/Button.test.tsx`）で検索
3. 見つかったテストファイルを開く

### Javaファイルの場合
1. 現在のファイル名（例：`UserService.java`）から拡張子を削除
2. ワークスペース全体から `UserServiceTest.java` にマッチするファイルをグロブパターン（`**/UserServiceTest.java`）で検索
3. 見つかったテストファイルを開く

複数のテストファイルが見つかった場合は、最初に見つかったものが開きます。

## 既知の問題

- `.js`、`.jsx`、その他の拡張子のサポートは今後追加される予定です
- テストファイルが存在しない場合、拡張機能はエラーを表示します。先にテストファイルを作成する必要があります
- 同じ名前のテストファイルが複数存在する場合は、最初に見つかったものが開きます

## リリースノート

### 1.4.0

- Javaファイルのサポートを追加
- Java実装ファイル（`*.java`）とテストファイル（`*Test.java`）間での切り替えに対応
- キーバインディングを `Command+Shift+T` に統一

### 1.3.0

- `.tsx` ファイルのサポートを追加
- TypeScript Reactファイルとそのテストファイル間での切り替えに対応
- `.test.tsx` 形式のテストファイルに対応

### 1.2.0

- 双方向トグル機能を追加：テストファイルから実装ファイルを開くことができるようになりました
- `Command+Shift+T` で実装ファイル ⇄ テストファイルを切り替えられます
- グロブパターン検索を使用して、より確実にファイルを検索

### 1.1.0

- ワークスペース全体からテストファイルを検索する機能を追加
- ファイル階層が異なる場合でも対応するテストファイルを見つけられるように改善
- エラーメッセージの改善

### 1.0.0

`Command+Shift+T` キーバインディング対応のOpen Test File拡張機能を初期リリースしました
