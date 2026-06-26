#!/usr/bin/env node
import { cac } from 'cac'
import { createCommand } from './commands/create.js'

const cli = cac('wwj')

cli.command('create [project-name]', 'Create a new project from a template')
  .action(async (projectName?: string) => {
    await createCommand(projectName)
  })

cli.help()
cli.parse()
