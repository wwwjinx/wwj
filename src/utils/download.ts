import degit from 'degit'

export async function downloadTemplate(repo: string, dest: string): Promise<void> {
  const emitter = degit(repo, {
    cache: false,
    force: true,
    verbose: false,
  })

  await emitter.clone(dest)
}
