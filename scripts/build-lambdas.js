#!/usr/bin/env node
const path = require('path');
const { spawnSync, execSync } = require('child_process');

const packages = new Set();
packages.add('dun-and-bradstreet-lambda');

const cwd = __dirname;
const distFolder = '../dist/lambda';
const target = `${distFolder}`;

// clean dist folder
execSync(`rm -rf ${distFolder}`, { cwd });

// create package folders

packages.forEach((folder) => {
  execSync(`mkdir -p ${target}/packages/${folder}`, { cwd });
});

// common core monorepo files
execSync(`cp ../package.json ${target}`, { cwd });
execSync(`cp ../yarn.lock ${target}`, { cwd });

// copy required packages
packages.forEach((folder) => {
  execSync(`cp -R ../packages/${folder} ${target}/packages/`, { cwd });
});

// install dependencies
spawnSync('yarn', ['--production', '--frozen-lockfile'], {
  stdio: 'inherit',
  cwd: path.resolve(__dirname, target),
});

// create zip
spawnSync('zip', ['-r', '../lambda.zip', '.', '-x', '.git/\\*'], {
  stdio: 'inherit',
  cwd: path.resolve(__dirname, target),
});

// remove files
execSync(`rm -rf ${distFolder}`, { cwd });
