# Repository Configuration Guide

To deploy execution reports automatically to GitHub Pages, the following settings must be configured on your GitHub repository.

---

## 1. Enabling Workflow Write Permissions

By default, GitHub Actions workflows run with read-only tokens. Since this pipeline commits reports to the `gh-pages` branch, you must allow write permissions:

1. Navigate to your repository page on GitHub.
2. Go to **Settings** -> **Actions** -> **General**.
3. Under the **Workflow permissions** section, select **Read and write permissions**.
4. Check **Allow GitHub Actions to create and approve pull requests** (if applicable).
5. Click **Save**.

---

## 2. Setting Up GitHub Pages

1. Navigate to **Settings** -> **Pages** in the repository menu.
2. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch**.
   - **Branch**: Select `gh-pages` and select `/ (root)` folder.
3. Click **Save**.

Once configured, the Action will deploy the static reports page to:
`https://<github-username>.github.io/<repository-name>/reports/latest/execution-report.html`
