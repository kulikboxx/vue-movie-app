export function transformText(str: string) {
  return str.toLocaleUpperCase();
}

export function sliceText(str: string, length: number, dots?: boolean) {
  return str.slice(0, length) + `${dots ? ' ...' : ''}`;
}
