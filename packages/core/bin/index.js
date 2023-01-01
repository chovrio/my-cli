#!/usr/bin/env node
async function start() {
  return await import('../dist/index.cjs')
}
start()
