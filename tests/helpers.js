// Shared helpers for building throwaway content trees in tests.
const fs = require("fs");
const os = require("os");
const path = require("path");

const PAGE = `<!DOCTYPE html><html><head><title>Lesson</title></head><body>${"<p>lesson text</p>".repeat(20)}</body></html>`;

function tmpDir(prefix = "canopy-test-") {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

/**
 * write(root, { "cat/sub/01-a/content.html": PAGE, "cat/meta.json": {title: "x"} })
 * Object values are written as JSON; strings as-is.
 */
function write(root, files) {
  for (const [rel, value] of Object.entries(files)) {
    const file = path.join(root, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, typeof value === "string" ? value : JSON.stringify(value));
  }
  return root;
}

module.exports = { PAGE, tmpDir, write };
