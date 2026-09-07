// Adopted from the Cetec design system. The important difference is that every
// data-attribute condition matches `=true` rather than bare presence: React
// stringifies `false` for data-* props, so `data-disabled="false"` matched the
// looser selectors and rendered the element as disabled.
export const conditions = {
  hover: '&:is(:hover, [data-hover=true])',
  focus: '&:is(:focus, [data-focus=true])',
  focusWithin: '&:focus-within',
  focusVisible: '&:is(:focus-visible, [data-focus-visible=true])',
  disabled:
    '&:is(:disabled, [disabled], [data-disabled=true], [aria-disabled=true])',
  deleted: '&:is(:deleted, [deleted], [data-deleted=true])',
  active: '&:is(:active, [data-active=true])',
  visited: '&:visited',
  target: '&:target',
  readOnly:
    '&:is(:read-only, [readonly], [data-read-only=true], [aria-readonly=true])',
  readWrite: '&:read-write',
  empty: '&:is(:empty, [data-empty=true])',
  checked:
    '&:is(:checked, [data-checked=true], [aria-checked=true], [data-state="checked"])',
  enabled: '&:enabled',
  expanded:
    '&:is([aria-expanded=true], [data-expanded=true], [data-state="expanded"])',
  collapsed:
    '&:is([aria-collapsed=true], [data-collapsed=true], [data-state="collapsed"])',
  highlighted: '&[data-highlighted=true]',
  new: '&[data-new=true]',
  complete: '&[data-complete=true]',
  incomplete: '&[data-incomplete=true]',
  dragging: '&[data-dragging=true]',
  utility: '&[data-utility=true]',

  before: '&::before',
  after: '&::after',
  firstLetter: '&::first-letter',
  firstLine: '&::first-line',
  marker: '&::marker, &::-webkit-details-marker',
  selection: '&::selection',
  file: '&::file-selector-button',
  backdrop: '&::backdrop',

  first: '&:first-child',
  last: '&:last-child',
  only: '&:only-child',
  even: '&:nth-child(even)',
  odd: '&:nth-child(odd)',

  firstOfType: '&:first-of-type',
  lastOfType: '&:last-of-type',
  onlyOfType: '&:only-of-type',

  peerFocus: '.peer:is(:focus, [data-focus=true]) ~ &',
  peerHover: '.peer:is(:hover, [data-hover=true]) ~ &',
  peerActive: '.peer:is(:active, [data-active=true]) ~ &',
  peerFocusWithin: '.peer:focus-within ~ &',
  peerFocusVisible: '.peer:is(:focus-visible, [data-focus-visible]) ~ &',
  peerDisabled:
    '.peer:is(:disabled, [disabled], [data-disabled=true], [aria-disabled=true]) ~ &',
  peerChecked:
    '.peer:is(:checked, [data-checked=true], [aria-checked=true], [data-state="checked"]) ~ &',
  peerInvalid:
    '.peer:is(:invalid, [data-invalid=true], [aria-invalid=true]) ~ &',
  peerExpanded:
    '.peer:is([aria-expanded=true], [data-expanded=true], [data-state="expanded"]) ~ &',
  peerPlaceholderShown: '.peer:placeholder-shown ~ &',

  groupFocus: '.group:is(:focus, [data-focus=true]) &',
  groupHover: '.group:is(:hover, [data-hover=true]) &',
  groupActive: '.group:is(:active, [data-active=true]) &',
  groupFocusWithin: '.group:focus-within &',
  groupFocusVisible: '.group:is(:focus-visible, [data-focus-visible=true]) &',
  groupDisabled:
    '.group:is(:disabled, [disabled], [data-disabled=true], [aria-disabled=true]) &',
  groupChecked:
    '.group:is(:checked, [data-checked=true], [aria-checked=true], [data-state="checked"]) &',
  groupExpanded:
    '.group:is([aria-expanded=true], [data-expanded=true], [data-state="expanded"]) &',
  groupInvalid:
    '.group:is(:invalid, [data-invalid=true], [aria-invalid=true]) &',

  indeterminate:
    '&:is(:indeterminate, [data-indeterminate=true], [aria-checked=mixed], [data-state="indeterminate"])',
  required: '&:is(:required, [data-required=true], [aria-required=true])',
  valid: '&:is(:valid, [data-valid=true])',
  invalid: '&:is(:invalid, [data-invalid=true], [aria-invalid=true])',
  error: '&:is([data-error=true])',
  success: '&:is([data-success=true])',
  autofill: '&:autofill',
  inRange: '&:is(:in-range, [data-in-range=true])',
  outOfRange: '&:is(:out-of-range, [data-outside-range=true])',
  placeholder: '&::placeholder, &[data-placeholder=true]',
  placeholderShown: '&:is(:placeholder-shown, [data-placeholder-shown=true])',
  pressed: '&:is([aria-pressed=true], [data-pressed=true])',
  selected: '&:is([aria-selected=true], [data-selected=true])',
  grabbed: '&:is([aria-grabbed=true], [data-grabbed=true])',
  underValue: '&[data-state="under-value"]',
  overValue: '&[data-state="over-value"]',
  atValue: '&[data-state="at-value"]',

  default: '&:default',
  optional: '&:optional',
  open: '&:is([open], [data-open=true], [data-state="open"], :popover-open)',
  closed: '&:is([closed], [data-closed=true], [data-state="closed"])',
  fullscreen: '&:is(:fullscreen, [data-fullscreen=true])',
  loading: '&:is([data-loading=true], [aria-busy=true])',
  hidden: '&:is([hidden], [data-hidden=true])',

  current: '&:is([aria-current=true], [data-current=true])',
  currentPage: '&[aria-current=page]',
  currentStep: '&[aria-current=step]',
  today: '&:is([data-today=true])',
  unavailable: '&[data-unavailable=true]',
  rangeStart: '&[data-range-start=true]',
  rangeEnd: '&[data-range-end=true]',
  now: '&[data-now=true]',
  topmost: '&[data-topmost=true]',

  motionReduce: '@media (prefers-reduced-motion: reduce)',
  motionSafe: '@media (prefers-reduced-motion: no-preference)',
  paused: '&:is([data-paused=true])',
  print: '@media print',
  landscape: '@media (orientation: landscape)',
  portrait: '@media (orientation: portrait)',

  dark: '.dark &, &:is([data-color-mode="dark"] *), [data-color-mode="dark"] &',
  light:
    '.light &, &:is([data-color-mode="light"] *), [data-color-mode="light"] &',
  osDark: '@media (prefers-color-scheme: dark)',
  osLight: '@media (prefers-color-scheme: light)',

  highContrast: '@media (forced-colors: active)',
  lessContrast: '@media (prefers-contrast: less)',
  moreContrast: '@media (prefers-contrast: more)',

  ltr: ':where([dir=ltr], :dir(ltr)) &',
  rtl: ':where([dir=rtl], :dir(rtl)) &',

  scrollbar: '&::-webkit-scrollbar',
  scrollbarThumb: '&::-webkit-scrollbar-thumb',
  scrollbarTrack: '&::-webkit-scrollbar-track',

  horizontal: '&[data-orientation=horizontal]',
  vertical: '&[data-orientation=vertical]',

  icon: '& :where(svg)',
  starting: '@starting-style',
  noscript: '@media (scripting: none)',
  invertedColors: '@media (inverted-colors: inverted)',
};
