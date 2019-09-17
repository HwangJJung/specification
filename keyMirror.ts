import keyMirror from 'key-mirror-nested'

interface KeyMirrorOptions {
  connChar?: string // is for nested object
  custFunc?(value: string, key: string): string
}

function keyMirrorWithPrefix<T>(
  prefix: string | null,
  constants: T,
  options: KeyMirrorOptions = {}
): { [K in keyof T]: string } {
  const defaultOptions: KeyMirrorOptions = {
    connChar: '_',
    custFunc: (value, key) => {
      if (prefix) {
        return `${prefix}.${value || key}`
      }
      return value || key
    },
  }
  return keyMirror(constants, Object.assign(defaultOptions, options))
}

export default keyMirrorWithPrefix
