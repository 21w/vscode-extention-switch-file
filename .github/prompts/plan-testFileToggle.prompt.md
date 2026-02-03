# テストファイル・実装ファイルトグル機能の実装計画

## 概要
VS Code拡張機能「open-test-file」にトグル機能を追加。`Command+B` で実装ファイル ⇄ テストファイルを切り替える機能。

## 現在の状況
- 実装ファイル（`xxx.ts`）→ テストファイル（`xxx.test.ts`）への一方向のみ対応
- テストファイルから実装ファイルへの移動は不可

## 改善内容

### 1. 機能仕様
- **実装ファイルを開いている場合**: `Command+B` でテストファイルを開く
- **テストファイルを開いている場合**: `Command+B` で対応する実装ファイルを開く
- ワークスペース全体から対応ファイルを検索（既存機能を活用）

### 2. 実装詳細

#### ロジック
```typescript
// コマンド実行時の処理
if (currentPath.includes('.test.')) {
  // テストファイル → 実装ファイル
  await openImplementationFile(currentPath, fileName);
} else {
  // 実装ファイル → テストファイル
  await openTestFile(currentPath, fileName);
}
```

#### openImplementationFile 関数
1. ファイル名から `.test.ts` を削除（例：`User.test.ts` → `User`）
2. グロブパターン `**/User.ts` で検索
3. `.test.` を含むファイルはフィルタリングで除外
4. 見つかったファイルを開く

#### エラーハンドリング
- ファイルが `.test.ts` で終わらない場合：エラーメッセージ表示
- 実装ファイルが見つからない場合：エラーメッセージ表示
- 複数ファイルが見つかった場合：最初のものを開く

### 3. ファイル構成の例
```
src/
  context/
    User.ts
  services/
    UserService.ts
tests/
  User.test.ts
  UserService.test.ts
```

トグル動作：
- `src/context/User.ts` で Command+B → `tests/User.test.ts`
- `tests/User.test.ts` で Command+B → `src/context/User.ts`

## 実装ステップ
1. [ ] extension.ts を修正（新しい関数を追加）
2. [ ] `npm run compile` で型チェック
3. [ ] コンパイル結果を確認
4. [ ] `vsce package` で新しい VSIX をビルド
5. [ ] VS Code で拡張機能を再インストール
6. [ ] 双方向トグルを動作確認

## テストケース
- ✓ 実装ファイル → テストファイル
- ✓ テストファイル → 実装ファイル
- ✓ テストファイルが存在しない場合
- ✓ 実装ファイルが存在しない場合
- ✓ 複数ファイル存在時は最初のものを開く

## 予想される動作

### 成功時
- メッセージ表示なし（ファイルが直接開く）
- エラーがコンソールに出力されない

### 失敗時
- 対応ファイルが見つからない場合：エラーダイアログ表示
- ファイル形式が不正な場合：エラーメッセージ表示

## READMEの更新内容
- 双方向トグル機能について説明
- 使用例を追加
- リリースノートに v1.2.0 を追加
