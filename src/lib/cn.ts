export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ')
}

export function pad(n: number): string {
  return String(n).padStart(2, '0')
}
