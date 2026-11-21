// Guards the repository rulesets in .github/rulesets/ against drifting from
// the workflows. A required status check whose name matches no job can never
// pass, which blocks every pull request, so renaming a job must fail here.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const GH = path.join(__dirname, "..", ".github");
const readJson = (f) => JSON.parse(fs.readFileSync(path.join(GH, "rulesets", f), "utf8"));
const rulesetFiles = fs.readdirSync(path.join(GH, "rulesets")).filter((f) => f.endsWith(".json"));

// Every job display name in the workflows, with `${{ matrix.node }}` expanded.
function jobNames() {
  const names = new Set();
  const dir = path.join(GH, "workflows");
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".yml"))) {
    const text = fs.readFileSync(path.join(dir, file), "utf8");
    const nodes = /node:\s*\[([^\]]*)\]/.exec(text);
    const versions = nodes ? nodes[1].split(",").map((v) => v.trim().replace(/["']/g, "")) : [];
    for (const m of text.matchAll(/^ {4}name: (.+)$/gm)) {
      const name = m[1].trim();
      if (name.includes("${{ matrix.node }}")) versions.forEach((v) => names.add(name.replace("${{ matrix.node }}", v)));
      else names.add(name);
    }
  }
  return names;
}

test("there is at least one ruleset and each is well formed", () => {
  assert.ok(rulesetFiles.length >= 1);
  for (const f of rulesetFiles) {
    const r = readJson(f);
    assert.equal(typeof r.name, "string", f);
    assert.ok(["branch", "tag"].includes(r.target), `${f}: target`);
    assert.equal(r.enforcement, "active", f);
    assert.equal(r.source, "privateMwb/Canopy", f);
    assert.ok(Array.isArray(r.rules) && r.rules.length > 0, `${f}: rules`);
    assert.ok(Array.isArray(r.conditions.ref_name.include) && r.conditions.ref_name.include.length > 0, `${f}: include`);
  }
});

test("every required status check matches a real workflow job name", () => {
  const names = jobNames();
  const rule = readJson("main-protection.json").rules.find((r) => r.type === "required_status_checks");
  assert.ok(rule, "main-protection.json has no required_status_checks rule");
  const contexts = rule.parameters.required_status_checks.map((c) => c.context);
  assert.ok(contexts.length > 0);
  for (const c of contexts) assert.ok(names.has(c), `no workflow job is named "${c}"`);
});

test("the main ruleset protects the default branch from deletion and force-push", () => {
  const r = readJson("main-protection.json");
  assert.equal(r.target, "branch");
  assert.deepEqual(r.conditions.ref_name.include, ["~DEFAULT_BRANCH"]);
  const types = r.rules.map((x) => x.type);
  for (const t of ["deletion", "non_fast_forward", "pull_request", "required_status_checks"]) assert.ok(types.includes(t), t);
});

test("the release-tags ruleset covers the same tags release.yml fires on", () => {
  const r = readJson("release-tags.json");
  assert.equal(r.target, "tag");
  assert.deepEqual(r.conditions.ref_name.include, ["refs/tags/v*"]);
  const release = fs.readFileSync(path.join(GH, "workflows", "release.yml"), "utf8");
  assert.match(release, /tags:\s*\n\s*- "v\*"/);
  const types = r.rules.map((x) => x.type);
  for (const t of ["deletion", "update", "non_fast_forward"]) assert.ok(types.includes(t), t);
});
