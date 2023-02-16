export type CustomError = BadArtithmetic

export class BadArtithmetic extends Error {
  static readonly code = 6000
  readonly code = 6000
  readonly name = "BadArtithmetic"
  readonly msg = "Encountered an arithmetic error"

  constructor(readonly logs?: string[]) {
    super("6000: Encountered an arithmetic error")
  }
}

export function fromCode(code: number, logs?: string[]): CustomError | null {
  switch (code) {
    case 6000:
      return new BadArtithmetic(logs)
  }

  return null
}
