GitHub Action to install gpg v1.4.

## Usage

In your GitHub Actions workflow, add a `uses:` declaration before calling the
`sbt` command.

```diff
+++ .github/workflows/ci.yml
  name: CI
  on:
    push:
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
      - uses: actions/checkout@v1
+     - uses: olafurpg/setup-gpg@v3
      - run: sbt publishSigned
```
