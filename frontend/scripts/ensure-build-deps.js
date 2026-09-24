#!/usr/bin/env node
// Guards the CRA 5 webpack tree: schema-utils@4 / ajv-keywords@5 need ajv@8 at the install root.
// Render's build command installs `ajv@^7 --save-dev`, which a NODE_ENV=production install then prunes,
// leaving the build with no resolvable ajv. This restores a compatible copy without touching package.json.
const { execFileSync } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..', 'node_modules');
const read = (name) => {
  try {
    return Number(require(path.join(root, name, 'package.json')).version.split('.')[0]);
  } catch {
    return null;
  }
};

const ajv = read('ajv');
const keywords = read('ajv-keywords');
const needsAjv8 = keywords === null || keywords >= 5;

if (ajv !== null && (!needsAjv8 || ajv >= 8)) {
  process.exit(0);
}

console.log(`[ensure-build-deps] repairing ajv (found ${ajv ?? 'none'}, ajv-keywords ${keywords ?? 'none'})`);
execFileSync('npm', ['install', 'ajv@^8.17.1', '--no-save', '--ignore-scripts', '--legacy-peer-deps', '--no-audit', '--no-fund'], {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
});
