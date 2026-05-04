name: バグ報告
description: バグを報告します。
title: "[バグ]: "
labels: ["bug", "triage"]
projects: ["octo-org/1", "octo-org/44"]
assignees:
  - octocat
type: bug
body:
  - type: markdown
    attributes:
      value: |
        バグ報告にご協力いただきありがとうございます。
  - type: input
    id: contact
    attributes:
      label: 連絡先
      description: 追加情報が必要な場合、どのように連絡すればよいですか?
      placeholder: 例: email@example.com
    validations:
      required: false
  - type: textarea
    id: what-happened
    attributes:
      label: 何が起きましたか?
      description: 期待していた動作もあわせて記載してください。
      placeholder: 実際に確認した内容を記載してください。
      value: "バグが発生しました。"
    validations:
      required: true
  - type: dropdown
    id: version
    attributes:
      label: バージョン
      description: 使用しているソフトウェアのバージョンを選択してください。
      options:
        - 1.0.2 (既定)
        - 1.0.3 (先行版)
      default: 0
    validations:
      required: true
  - type: dropdown
    id: browsers
    attributes:
      label: 問題が発生しているブラウザーを選択してください。
      multiple: true
      options:
        - Firefox
        - Chrome
        - Safari
        - Microsoft Edge
  - type: textarea
    id: logs
    attributes:
      label: 関連するログ出力
      description: 関連するログ出力をコピーして貼り付けてください。自動的にコードとして整形されるため、バッククォートは不要です。
      render: shell
  - type: checkboxes
    id: terms
    attributes:
      label: 行動規範
      description: この Issue を送信することで、[行動規範](https://example.com) に従うことに同意したものとします。
      options:
        - label: このプロジェクトの行動規範に従うことに同意します。
          required: true
  - type: upload
    id: screenshots
    attributes:
      label: スクリーンショットをアップロード
      description: 必要に応じて、問題の説明に役立つスクリーンショットを追加してください。
    validations:
      required: false
