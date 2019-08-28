// @see https://github.com/material-components/material-components-web/blob/master/packages/mdc-elevation/_variables.scss
const androidDepth = [
  '0px 2px 1px -1px',
  '0px 3px 1px -2px',
  '0px 3px 3px -2px',
  '0px 2px 4px -1px',
  '0px 3px 5px -1px',
  '0px 3px 5px -1px',
  '0px 4px 5px -2px',
  '0px 5px 5px -3px',
  '0px 5px 6px -3px',
  '0px 6px 6px -3px',
  '0px 6px 7px -4px',
  '0px 7px 8px -4px',
  '0px 7px 8px -4px',
  '0px 7px 9px -4px',
  '0px 8px 9px -5px',
  '0px 8px 10px -5px',
  '0px 8px 11px -5px',
  '0px 9px 11px -5px',
  '0px 9px 12px -6px',
  '0px 10px 13px -6px',
  '0px 10px 13px -6px',
  '0px 10px 14px -6px',
  '0px 11px 14px -7px',
  '0px 11px 15px -7px'
]

function parseShadow(raw: string): {y: number; blur: number} {
  const values = raw.split(' ').map(val => +val.replace('px', ''))
  return {y: values[1], blur: values[2]}
}

function interpolate(
  i: number,
  a: number,
  b: number,
  a2: number,
  b2: number
): number {
  return ((i - a) * (b2 - a2)) / (b - a) + a2
}

function dropShadow(depth: number) {
  const s = parseShadow(androidDepth[depth])
  const y = s.y === 1 ? 1 : Math.floor(s.y * 0.5)

  return {
    shadowColor: 'rgba(0, 0, 0, 0.75)',
    shadowOffset: {width: 0, height: y},
    shadowOpacity: interpolate(depth, 1, 24, 0.2, 0.6),
    shadowRadius: interpolate(s.blur, 1, 38, 1, 16),
    elevation: depth
  }
}

export default dropShadow
