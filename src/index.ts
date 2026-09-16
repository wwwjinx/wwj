#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { cac } from 'cac'
import { createCommand } from './commands/create.js'

const { version } = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../package.json'), 'utf8'),
) as { version: string }

const cli = cac('wwj')

cli
  .command('create [project-name]', 'Create a new project from a template')
  .action(async (projectName?: string) => {
    await createCommand(projectName)
  })

cli.help()
cli.version(version)
cli.parse()
