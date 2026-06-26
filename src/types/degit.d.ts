declare module 'degit' {
  interface DegitOptions {
    cache?: boolean
    force?: boolean
    verbose?: boolean
  }

  interface DegitEmitter {
    clone(dest: string): Promise<void>
    on(event: string, callback: (...args: any[]) => void): void
  }

  function degit(repo: string, options?: DegitOptions): DegitEmitter
  export default degit
}
