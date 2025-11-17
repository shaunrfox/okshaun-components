function z() {
  const a = (e) => e;
  return new Proxy(a, {
    get() {
      return a;
    }
  });
}
var j = /* @__PURE__ */ z(), A = /* @__PURE__ */ z();
var L = {
  hover: "&:is(:hover, [data-hover])",
  focus: "&:is(:focus, [data-focus])",
  focusWithin: "&:focus-within",
  focusVisible: "&:is(:focus-visible, [data-focus-visible])",
  disabled: "&:is(:disabled, [disabled], [data-disabled], [aria-disabled=true])",
  active: "&:is(:active, [data-active])",
  visited: "&:visited",
  target: "&:target",
  readOnly: "&:is(:read-only, [data-read-only], [aria-readonly=true])",
  readWrite: "&:read-write",
  empty: "&:is(:empty, [data-empty])",
  checked: '&:is(:checked, [data-checked], [aria-checked=true], [data-state="checked"])',
  enabled: "&:enabled",
  expanded: '&:is([aria-expanded=true], [data-expanded], [data-state="expanded"])',
  highlighted: "&[data-highlighted]",
  complete: "&[data-complete]",
  incomplete: "&[data-incomplete]",
  dragging: "&[data-dragging]",
  before: "&::before",
  after: "&::after",
  firstLetter: "&::first-letter",
  firstLine: "&::first-line",
  marker: "&::marker, &::-webkit-details-marker",
  selection: "&::selection",
  file: "&::file-selector-button",
  backdrop: "&::backdrop",
  first: "&:first-child",
  last: "&:last-child",
  only: "&:only-child",
  even: "&:nth-child(even)",
  odd: "&:nth-child(odd)",
  firstOfType: "&:first-of-type",
  lastOfType: "&:last-of-type",
  onlyOfType: "&:only-of-type",
  peerFocus: ".peer:is(:focus, [data-focus]) ~ &",
  peerHover: ".peer:is(:hover, [data-hover]) ~ &",
  peerActive: ".peer:is(:active, [data-active]) ~ &",
  peerFocusWithin: ".peer:focus-within ~ &",
  peerFocusVisible: ".peer:is(:focus-visible, [data-focus-visible]) ~ &",
  peerDisabled: ".peer:is(:disabled, [disabled], [data-disabled], [aria-disabled=true]) ~ &",
  peerChecked: '.peer:is(:checked, [data-checked], [aria-checked=true], [data-state="checked"]) ~ &',
  peerInvalid: ".peer:is(:invalid, [data-invalid], [aria-invalid=true]) ~ &",
  peerExpanded: '.peer:is([aria-expanded=true], [data-expanded], [data-state="expanded"]) ~ &',
  peerPlaceholderShown: ".peer:placeholder-shown ~ &",
  groupFocus: ".group:is(:focus, [data-focus]) &",
  groupHover: ".group:is(:hover, [data-hover]) &",
  groupActive: ".group:is(:active, [data-active]) &",
  groupFocusWithin: ".group:focus-within &",
  groupFocusVisible: ".group:is(:focus-visible, [data-focus-visible]) &",
  groupDisabled: ".group:is(:disabled, [disabled], [data-disabled], [aria-disabled=true]) &",
  groupChecked: '.group:is(:checked, [data-checked], [aria-checked=true], [data-state="checked"]) &',
  groupExpanded: '.group:is([aria-expanded=true], [data-expanded], [data-state="expanded"]) &',
  groupInvalid: ".group:is(:invalid, [data-invalid], [aria-invalid=true]) &",
  indeterminate: '&:is(:indeterminate, [data-indeterminate], [aria-checked=mixed], [data-state="indeterminate"])',
  required: "&:is(:required, [data-required], [aria-required=true])",
  valid: "&:is(:valid, [data-valid])",
  invalid: "&:is(:invalid, [data-invalid], [aria-invalid=true])",
  autofill: "&:autofill",
  inRange: "&:is(:in-range, [data-in-range])",
  outOfRange: "&:is(:out-of-range, [data-outside-range])",
  placeholder: "&::placeholder, &[data-placeholder]",
  placeholderShown: "&:is(:placeholder-shown, [data-placeholder-shown])",
  pressed: "&:is([aria-pressed=true], [data-pressed])",
  selected: "&:is([aria-selected=true], [data-selected])",
  grabbed: "&:is([aria-grabbed=true], [data-grabbed])",
  underValue: "&[data-state=under-value]",
  overValue: "&[data-state=over-value]",
  atValue: "&[data-state=at-value]",
  default: "&:default",
  optional: "&:optional",
  open: '&:is([open], [data-open], [data-state="open"], :popover-open)',
  closed: '&:is([closed], [data-closed], [data-state="closed"])',
  fullscreen: "&:is(:fullscreen, [data-fullscreen])",
  loading: "&:is([data-loading], [aria-busy=true])",
  hidden: "&:is([hidden], [data-hidden])",
  current: "&:is([aria-current=true], [data-current])",
  currentPage: "&[aria-current=page]",
  currentStep: "&[aria-current=step]",
  today: "&[data-today]",
  unavailable: "&[data-unavailable]",
  rangeStart: "&[data-range-start]",
  rangeEnd: "&[data-range-end]",
  now: "&[data-now]",
  topmost: "&[data-topmost]",
  motionReduce: "@media (prefers-reduced-motion: reduce)",
  motionSafe: "@media (prefers-reduced-motion: no-preference)",
  print: "@media print",
  landscape: "@media (orientation: landscape)",
  portrait: "@media (orientation: portrait)",
  dark: ".dark &",
  light: ".light &",
  osDark: "@media (prefers-color-scheme: dark)",
  osLight: "@media (prefers-color-scheme: light)",
  highContrast: "@media (forced-colors: active)",
  lessContrast: "@media (prefers-contrast: less)",
  moreContrast: "@media (prefers-contrast: more)",
  ltr: ":where([dir=ltr], :dir(ltr)) &",
  rtl: ":where([dir=rtl], :dir(rtl)) &",
  scrollbar: "&::-webkit-scrollbar",
  scrollbarThumb: "&::-webkit-scrollbar-thumb",
  scrollbarTrack: "&::-webkit-scrollbar-track",
  horizontal: "&[data-orientation=horizontal]",
  vertical: "&[data-orientation=vertical]",
  icon: "& :where(svg)",
  starting: "@starting-style",
  noscript: "@media (scripting: none)",
  invertedColors: "@media (inverted-colors: inverted)"
}, n = "/*-*/ /*-*/", M = {
  "*, ::before, ::after, ::backdrop": {
    "--blur": n,
    "--brightness": n,
    "--contrast": n,
    "--grayscale": n,
    "--hue-rotate": n,
    "--invert": n,
    "--saturate": n,
    "--sepia": n,
    "--drop-shadow": n,
    "--backdrop-blur": n,
    "--backdrop-brightness": n,
    "--backdrop-contrast": n,
    "--backdrop-grayscale": n,
    "--backdrop-hue-rotate": n,
    "--backdrop-invert": n,
    "--backdrop-opacity": n,
    "--backdrop-saturate": n,
    "--backdrop-sepia": n,
    "--gradient-from-position": n,
    "--gradient-to-position": n,
    "--gradient-via-position": n,
    "--scroll-snap-strictness": "proximity",
    "--border-spacing-x": 0,
    "--border-spacing-y": 0,
    "--translate-x": 0,
    "--translate-y": 0,
    "--rotate": 0,
    "--rotate-x": 0,
    "--rotate-y": 0,
    "--skew-x": 0,
    "--skew-y": 0,
    "--scale-x": 1,
    "--scale-y": 1
  }
};
var $ = {
  transform(a) {
    return a;
  }
}, O = {
  properties: {
    align: { type: "property", value: "alignItems" },
    justify: { type: "property", value: "justifyContent" },
    direction: { type: "property", value: "flexDirection" },
    wrap: { type: "property", value: "flexWrap" },
    basis: { type: "property", value: "flexBasis" },
    grow: { type: "property", value: "flexGrow" },
    shrink: { type: "property", value: "flexShrink" }
  },
  transform(a) {
    const { direction: e, align: r, justify: o, wrap: t, basis: d, grow: l, shrink: c, ...i } = a;
    return {
      display: "flex",
      flexDirection: e,
      alignItems: r,
      justifyContent: o,
      flexWrap: t,
      flexBasis: d,
      flexGrow: l,
      flexShrink: c,
      ...i
    };
  }
}, G = {
  properties: {
    align: { type: "property", value: "alignItems" },
    justify: { type: "property", value: "justifyContent" },
    direction: { type: "property", value: "flexDirection" },
    gap: { type: "property", value: "gap" }
  },
  defaultValues: {
    direction: "column",
    gap: "8px"
  },
  transform(a) {
    const { align: e, justify: r, direction: o, gap: t, ...d } = a;
    return {
      display: "flex",
      flexDirection: o,
      alignItems: e,
      justifyContent: r,
      gap: t,
      ...d
    };
  }
}, H = {
  jsxName: "VStack",
  properties: {
    justify: { type: "property", value: "justifyContent" },
    gap: { type: "property", value: "gap" }
  },
  defaultValues: {
    gap: "8px"
  },
  transform(a) {
    const { justify: e, gap: r, ...o } = a;
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: e,
      gap: r,
      flexDirection: "column",
      ...o
    };
  }
}, X = {
  jsxName: "HStack",
  properties: {
    justify: { type: "property", value: "justifyContent" },
    gap: { type: "property", value: "gap" }
  },
  defaultValues: {
    gap: "8px"
  },
  transform(a) {
    const { justify: e, gap: r, ...o } = a;
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: e,
      gap: r,
      flexDirection: "row",
      ...o
    };
  }
}, Y = {
  properties: {
    size: { type: "token", value: "spacing" }
  },
  transform(a, { map: e }) {
    const { size: r, ...o } = a;
    return {
      alignSelf: "stretch",
      justifySelf: "stretch",
      flex: e(r, (t) => t == null ? "1" : `0 0 ${t}`),
      ...o
    };
  }
}, q = {
  properties: {
    size: { type: "property", value: "width" }
  },
  transform(a) {
    const { size: e, ...r } = a;
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "0 0 auto",
      width: e,
      height: e,
      borderRadius: "9999px",
      ...r
    };
  }
}, U = {
  properties: {
    size: { type: "property", value: "width" }
  },
  transform(a) {
    const { size: e, ...r } = a;
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "0 0 auto",
      width: e,
      height: e,
      ...r
    };
  }
}, K = {
  properties: {
    gap: { type: "property", value: "gap" },
    columnGap: { type: "property", value: "gap" },
    rowGap: { type: "property", value: "gap" },
    columns: { type: "number" },
    minChildWidth: { type: "token", value: "sizes", property: "width" }
  },
  defaultValues(a) {
    return { gap: a.columnGap || a.rowGap ? void 0 : "8px" };
  },
  transform(a, { map: e, isCssUnit: r }) {
    const { columnGap: o, rowGap: t, gap: d, columns: l, minChildWidth: c, ...i } = a, g = (u) => r(u) ? u : `token(sizes.${u}, ${u})`;
    return {
      display: "grid",
      gridTemplateColumns: l != null ? e(l, (u) => `repeat(${u}, minmax(0, 1fr))`) : c != null ? e(c, (u) => `repeat(auto-fit, minmax(${g(u)}, 1fr))`) : void 0,
      gap: d,
      columnGap: o,
      rowGap: t,
      ...i
    };
  }
}, Z = {
  properties: {
    colSpan: { type: "number" },
    rowSpan: { type: "number" },
    colStart: { type: "number" },
    rowStart: { type: "number" },
    colEnd: { type: "number" },
    rowEnd: { type: "number" }
  },
  transform(a, { map: e }) {
    const { colSpan: r, rowSpan: o, colStart: t, rowStart: d, colEnd: l, rowEnd: c, ...i } = a, g = (u) => u === "auto" ? u : `span ${u}`;
    return {
      gridColumn: r != null ? e(r, g) : void 0,
      gridRow: o != null ? e(o, g) : void 0,
      gridColumnStart: t,
      gridColumnEnd: l,
      gridRowStart: d,
      gridRowEnd: c,
      ...i
    };
  }
}, J = {
  properties: {
    gap: { type: "property", value: "gap" },
    rowGap: { type: "property", value: "gap" },
    columnGap: { type: "property", value: "gap" },
    align: { type: "property", value: "alignItems" },
    justify: { type: "property", value: "justifyContent" }
  },
  transform(a) {
    const { columnGap: e, rowGap: r, gap: o = e || r ? void 0 : "8px", align: t, justify: d, ...l } = a;
    return {
      display: "flex",
      flexWrap: "wrap",
      alignItems: t,
      justifyContent: d,
      gap: o,
      columnGap: e,
      rowGap: r,
      ...l
    };
  }
}, Q = {
  transform(a) {
    return {
      position: "relative",
      maxWidth: "8xl",
      mx: "auto",
      px: { base: "4", md: "6", lg: "8" },
      ...a
    };
  }
}, aa = {
  properties: {
    inline: { type: "boolean" }
  },
  transform(a) {
    const { inline: e, ...r } = a;
    return {
      display: e ? "inline-flex" : "flex",
      alignItems: "center",
      justifyContent: "center",
      ...r
    };
  }
}, ea = {
  properties: {
    ratio: { type: "number" }
  },
  blocklist: ["aspectRatio"],
  transform(a, { map: e }) {
    const { ratio: r = 4 / 3, ...o } = a;
    return {
      position: "relative",
      _before: {
        content: '""',
        display: "block",
        height: "0",
        paddingBottom: e(r, (t) => `${1 / t * 100}%`)
      },
      "&>*": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%"
      },
      "&>img, &>video": {
        objectFit: "cover"
      },
      ...o
    };
  }
}, ra = {
  properties: {
    orientation: { type: "enum", value: ["horizontal", "vertical"] },
    thickness: { type: "token", value: "sizes", property: "borderWidth" },
    color: { type: "token", value: "colors", property: "borderColor" }
  },
  defaultValues: {
    orientation: "horizontal",
    thickness: "1px"
  },
  transform(a, { map: e }) {
    const { orientation: r, thickness: o, color: t, ...d } = a;
    return {
      "--thickness": o,
      width: e(r, (l) => l === "vertical" ? void 0 : "100%"),
      height: e(r, (l) => l === "horizontal" ? void 0 : "100%"),
      borderBlockEndWidth: e(r, (l) => l === "horizontal" ? "var(--thickness)" : void 0),
      borderInlineEndWidth: e(r, (l) => l === "vertical" ? "var(--thickness)" : void 0),
      borderColor: t,
      ...d
    };
  }
}, oa = {
  jsxElement: "a",
  transform(a) {
    return {
      _before: {
        content: '""',
        position: "absolute",
        inset: "0",
        zIndex: "0",
        ...a._before
      },
      ...a
    };
  }
}, ta = {
  properties: {
    offsetX: { type: "token", value: "spacing", property: "left" },
    offsetY: { type: "token", value: "spacing", property: "top" },
    offset: { type: "token", value: "spacing", property: "top" },
    placement: {
      type: "enum",
      value: [
        "bottom-end",
        "bottom-start",
        "top-end",
        "top-start",
        "bottom-center",
        "top-center",
        "middle-center",
        "middle-end",
        "middle-start"
      ]
    }
  },
  defaultValues(a) {
    const e = a.offset || "0";
    return { offset: e, offsetX: e, offsetY: e, placement: "top-end" };
  },
  transform(a, { map: e }) {
    const { offset: r, offsetX: o, offsetY: t, placement: d, ...l } = a;
    return {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      insetBlockStart: e(d, (c) => {
        const [i] = c.split("-");
        return { top: t, middle: "50%", bottom: "auto" }[i];
      }),
      insetBlockEnd: e(d, (c) => {
        const [i] = c.split("-");
        return { top: "auto", middle: "50%", bottom: t }[i];
      }),
      insetInlineStart: e(d, (c) => {
        const [, i] = c.split("-");
        return { start: o, center: "50%", end: "auto" }[i];
      }),
      insetInlineEnd: e(d, (c) => {
        const [, i] = c.split("-");
        return { start: "auto", center: "50%", end: o }[i];
      }),
      translate: e(d, (c) => {
        const [i, g] = c.split("-"), u = { start: "-50%", center: "-50%", end: "50%" }, V = { top: "-50%", middle: "-50%", bottom: "50%" };
        return `${u[g]} ${V[i]}`;
      }),
      ...l
    };
  }
}, sa = {
  properties: {
    inline: { type: "property", value: "marginInline" },
    block: { type: "property", value: "marginBlock" }
  },
  defaultValues: {
    inline: "0",
    block: "0"
  },
  transform(a, { map: e, isCssUnit: r, isCssVar: o }) {
    const { inline: t, block: d, ...l } = a, c = (i) => r(i) || o(i) ? i : `token(spacing.${i}, ${i})`;
    return {
      "--bleed-x": e(t, c),
      "--bleed-y": e(d, c),
      marginInline: "calc(var(--bleed-x, 0) * -1)",
      marginBlock: "calc(var(--bleed-y, 0) * -1)",
      ...l
    };
  }
}, ia = {
  transform(a) {
    return {
      srOnly: !0,
      ...a
    };
  }
}, na = {
  properties: {
    name: { type: "token", value: "containerNames", property: "containerName" },
    type: { type: "property", value: "containerType" }
  },
  defaultValues: {
    type: "inline-size"
  },
  transform(a) {
    const { name: e, type: r, ...o } = a;
    return {
      containerType: r,
      containerName: e,
      ...o
    };
  }
}, la = {
  box: $,
  flex: O,
  stack: G,
  vstack: H,
  hstack: X,
  spacer: Y,
  square: U,
  circle: q,
  center: aa,
  linkOverlay: oa,
  aspectRatio: ea,
  grid: K,
  gridItem: Z,
  wrap: J,
  container: Q,
  divider: ra,
  float: ta,
  bleed: sa,
  visuallyHidden: ia,
  cq: na
}, s = (a) => (e, r) => {
  const o = r.utils.colorMix(e);
  if (o.invalid) return { [a]: e };
  const t = "--mix-" + a;
  return {
    [t]: o.value,
    [a]: `var(${t}, ${o.color})`
  };
}, da = {
  backgroundPosition: {
    shorthand: "bgPosition",
    className: "bg-p",
    group: "Background"
  },
  backgroundPositionX: {
    shorthand: "bgPositionX",
    className: "bg-p-x",
    group: "Background"
  },
  backgroundPositionY: {
    shorthand: "bgPositionY",
    className: "bg-p-y",
    group: "Background"
  },
  backgroundAttachment: {
    shorthand: "bgAttachment",
    className: "bg-a",
    group: "Background"
  },
  backgroundClip: {
    shorthand: "bgClip",
    className: "bg-cp",
    group: "Background",
    transform(a) {
      return {
        backgroundClip: a,
        WebkitBackgroundClip: a
      };
    }
  },
  background: {
    shorthand: "bg",
    className: "bg",
    values: "colors",
    group: "Background",
    transform: s("background")
  },
  backgroundColor: {
    shorthand: "bgColor",
    className: "bg-c",
    values: "colors",
    group: "Background",
    transform: s("backgroundColor")
  },
  backgroundOrigin: {
    shorthand: "bgOrigin",
    className: "bg-o",
    group: "Background"
  },
  backgroundImage: {
    shorthand: "bgImage",
    className: "bg-i",
    values: "assets",
    group: "Background"
  },
  backgroundRepeat: {
    shorthand: "bgRepeat",
    className: "bg-r",
    group: "Background"
  },
  backgroundBlendMode: {
    shorthand: "bgBlendMode",
    className: "bg-bm",
    group: "Background"
  },
  backgroundSize: {
    shorthand: "bgSize",
    className: "bg-s",
    group: "Background"
  }
}, ca = {
  // Border Radius
  borderRadius: {
    className: "bdr",
    shorthand: "rounded",
    values: "radii",
    group: "Border Radius"
  },
  borderTopLeftRadius: {
    className: "bdr-tl",
    shorthand: "roundedTopLeft",
    values: "radii",
    group: "Border Radius"
  },
  borderTopRightRadius: {
    className: "bdr-tr",
    shorthand: "roundedTopRight",
    values: "radii",
    group: "Border Radius"
  },
  borderBottomRightRadius: {
    className: "bdr-br",
    shorthand: "roundedBottomRight",
    values: "radii",
    group: "Border Radius"
  },
  borderBottomLeftRadius: {
    className: "bdr-bl",
    shorthand: "roundedBottomLeft",
    values: "radii",
    group: "Border Radius"
  },
  borderTopRadius: {
    className: "bdr-t",
    shorthand: "roundedTop",
    property: "borderRadius",
    values: "radii",
    group: "Border Radius",
    transform(a) {
      return {
        borderTopLeftRadius: a,
        borderTopRightRadius: a
      };
    }
  },
  borderRightRadius: {
    className: "bdr-r",
    shorthand: "roundedRight",
    property: "borderRadius",
    values: "radii",
    group: "Border Radius",
    transform(a) {
      return {
        borderTopRightRadius: a,
        borderBottomRightRadius: a
      };
    }
  },
  borderBottomRadius: {
    className: "bdr-b",
    shorthand: "roundedBottom",
    property: "borderRadius",
    values: "radii",
    group: "Border Radius",
    transform(a) {
      return {
        borderBottomLeftRadius: a,
        borderBottomRightRadius: a
      };
    }
  },
  borderLeftRadius: {
    className: "bdr-l",
    shorthand: "roundedLeft",
    values: "radii",
    property: "borderRadius",
    group: "Border Radius",
    transform(a) {
      return {
        borderTopLeftRadius: a,
        borderBottomLeftRadius: a
      };
    }
  },
  borderStartStartRadius: {
    className: "bdr-ss",
    shorthand: "roundedStartStart",
    values: "radii",
    group: "Border Radius"
  },
  borderStartEndRadius: {
    className: "bdr-se",
    shorthand: "roundedStartEnd",
    values: "radii",
    group: "Border Radius"
  },
  borderStartRadius: {
    className: "bdr-s",
    values: "radii",
    property: "borderRadius",
    shorthand: "roundedStart",
    group: "Border Radius",
    transform(a) {
      return {
        borderStartStartRadius: a,
        borderEndStartRadius: a
      };
    }
  },
  borderEndStartRadius: {
    className: "bdr-es",
    shorthand: "roundedEndStart",
    values: "radii",
    group: "Border Radius"
  },
  borderEndEndRadius: {
    className: "bdr-ee",
    shorthand: "roundedEndEnd",
    values: "radii",
    group: "Border Radius"
  },
  borderEndRadius: {
    className: "bdr-e",
    shorthand: "roundedEnd",
    property: "borderRadius",
    values: "radii",
    group: "Border Radius",
    transform(a) {
      return {
        borderStartEndRadius: a,
        borderEndEndRadius: a
      };
    }
  },
  // Border
  border: {
    className: "bd",
    values: "borders",
    group: "Border"
  },
  borderWidth: {
    className: "bd-w",
    values: "borderWidths",
    group: "Border Radius"
  },
  borderTopWidth: {
    className: "bd-t-w",
    values: "borderWidths",
    group: "Border"
  },
  borderLeftWidth: {
    className: "bd-l-w",
    values: "borderWidths",
    group: "Border"
  },
  borderRightWidth: {
    className: "bd-r-w",
    values: "borderWidths",
    group: "Border"
  },
  borderBottomWidth: {
    className: "bd-b-w",
    values: "borderWidths",
    group: "Border"
  },
  borderBlockStartWidth: {
    className: "bd-bs-w",
    values: "borderWidths",
    group: "Border Radius"
  },
  borderBlockEndWidth: {
    className: "bd-be-w",
    values: "borderWidths",
    group: "Border Radius"
  },
  borderColor: {
    className: "bd-c",
    values: "colors",
    group: "Border",
    transform: s("borderColor")
  },
  borderInline: {
    className: "bd-x",
    values: "borders",
    group: "Border",
    shorthand: "borderX"
  },
  borderInlineWidth: {
    className: "bd-x-w",
    values: "borderWidths",
    group: "Border",
    shorthand: "borderXWidth"
  },
  borderInlineColor: {
    className: "bd-x-c",
    values: "colors",
    group: "Border",
    shorthand: "borderXColor",
    transform: s("borderInlineColor")
  },
  borderBlock: {
    className: "bd-y",
    values: "borders",
    group: "Border",
    shorthand: "borderY"
  },
  borderBlockWidth: {
    className: "bd-y-w",
    values: "borderWidths",
    group: "Border",
    shorthand: "borderYWidth"
  },
  borderBlockColor: {
    className: "bd-y-c",
    values: "colors",
    group: "Border",
    shorthand: "borderYColor",
    transform: s("borderBlockColor")
  },
  borderLeft: {
    className: "bd-l",
    values: "borders",
    group: "Border"
  },
  borderLeftColor: {
    className: "bd-l-c",
    values: "colors",
    group: "Border",
    transform: s("borderLeftColor")
  },
  borderInlineStart: {
    className: "bd-s",
    values: "borders",
    group: "Border",
    shorthand: "borderStart"
  },
  borderInlineStartWidth: {
    className: "bd-s-w",
    values: "borderWidths",
    group: "Border",
    shorthand: "borderStartWidth"
  },
  borderInlineStartColor: {
    className: "bd-s-c",
    values: "colors",
    group: "Border",
    shorthand: "borderStartColor",
    transform: s("borderInlineStartColor")
  },
  borderRight: {
    className: "bd-r",
    values: "borders",
    group: "Border"
  },
  borderRightColor: {
    className: "bd-r-c",
    values: "colors",
    group: "Border",
    transform: s("borderRightColor")
  },
  borderInlineEnd: {
    className: "bd-e",
    values: "borders",
    group: "Border",
    shorthand: "borderEnd"
  },
  borderInlineEndWidth: {
    className: "bd-e-w",
    values: "borderWidths",
    group: "Border",
    shorthand: "borderEndWidth"
  },
  borderInlineEndColor: {
    className: "bd-e-c",
    values: "colors",
    group: "Border",
    shorthand: "borderEndColor",
    transform: s("borderInlineEndColor")
  },
  borderTop: {
    className: "bd-t",
    values: "borders",
    group: "Border"
  },
  borderTopColor: {
    className: "bd-t-c",
    values: "colors",
    group: "Border",
    transform: s("borderTopColor")
  },
  borderBottom: {
    className: "bd-b",
    values: "borders",
    group: "Border"
  },
  borderBottomColor: {
    className: "bd-b-c",
    values: "colors",
    group: "Border",
    transform: s("borderBottomColor")
  },
  borderBlockEnd: {
    className: "bd-be",
    values: "borders",
    group: "Border"
  },
  borderBlockEndColor: {
    className: "bd-be-c",
    values: "colors",
    group: "Border",
    transform: s("borderBlockEndColor")
  },
  borderBlockStart: {
    className: "bd-bs",
    values: "borders",
    group: "Border"
  },
  borderBlockStartColor: {
    className: "bd-bs-c",
    values: "colors",
    group: "Border",
    transform: s("borderBlockStartColor")
  }
}, ua = {
  container: {
    className: "cq",
    group: "Container"
  },
  containerName: {
    className: "cq-n",
    property: "containerName",
    values: "containerNames",
    group: "Container"
  },
  containerType: {
    className: "cq-t",
    group: "Container"
  }
}, pa = {
  cursor: {
    className: "cursor",
    values: "cursor",
    group: "System"
  }
}, ga = {
  display: {
    className: "d",
    group: "Display"
  },
  hideFrom: {
    className: "hide",
    values: "breakpoints",
    group: "Display",
    transform(a, { raw: e, token: r }) {
      return {
        [r.raw(`breakpoints.${e}`) ? `@breakpoint ${e}` : `@media screen and (min-width: ${a})`]: {
          display: "none"
        }
      };
    }
  },
  hideBelow: {
    className: "show",
    values: "breakpoints",
    group: "Display",
    transform(a, { raw: e, token: r }) {
      return {
        [r.raw(`breakpoints.${e}`) ? `@breakpoint ${e}Down` : `@media screen and (max-width: ${a})`]: {
          display: "none"
        }
      };
    }
  }
}, ma = s("borderColor"), ba = {
  divideX: {
    className: "dvd-x",
    values: "borderWidths",
    group: "Border",
    transform(a) {
      return {
        "& > :not([hidden]) ~ :not([hidden])": {
          borderInlineStartWidth: a,
          borderInlineEndWidth: "0px"
        }
      };
    }
  },
  divideY: {
    className: "dvd-y",
    values: "borderWidths",
    group: "Border",
    transform(a) {
      return {
        "& > :not([hidden]) ~ :not([hidden])": {
          borderTopWidth: a,
          borderBottomWidth: "0px"
        }
      };
    }
  },
  divideColor: {
    className: "dvd-c",
    values: "colors",
    group: "Border",
    transform(a, e) {
      return {
        "& > :not([hidden]) ~ :not([hidden])": ma(a, e)
      };
    }
  },
  divideStyle: {
    className: "dvd-s",
    property: "borderStyle",
    group: "Border",
    transform(a) {
      return {
        "& > :not([hidden]) ~ :not([hidden])": {
          borderStyle: a
        }
      };
    }
  }
}, va = {
  opacity: {
    className: "op",
    values: "opacity",
    group: "Background"
  },
  boxShadow: {
    shorthand: "shadow",
    className: "bx-sh",
    values: "shadows",
    group: "Shadow"
  },
  boxShadowColor: {
    shorthand: "shadowColor",
    className: "bx-sh-c",
    values: "colors",
    transform: s("--shadow-color"),
    group: "Color"
  },
  mixBlendMode: {
    className: "mix-bm",
    group: "Effect"
  },
  filter: {
    className: "filter",
    group: "Effect",
    values: {
      auto: "var(--blur, ) var(--brightness, ) var(--contrast, ) var(--grayscale, ) var(--hue-rotate, ) var(--invert, ) var(--saturate, ) var(--sepia, ) var(--drop-shadow, )"
    }
  },
  brightness: {
    className: "brightness",
    group: "Effect",
    transform(a) {
      return {
        "--brightness": `brightness(${a})`
      };
    }
  },
  contrast: {
    className: "contrast",
    group: "Effect",
    transform(a) {
      return {
        "--contrast": `contrast(${a})`
      };
    }
  },
  grayscale: {
    className: "grayscale",
    group: "Effect",
    transform(a) {
      return {
        "--grayscale": `grayscale(${a})`
      };
    }
  },
  hueRotate: {
    className: "hue-rotate",
    group: "Effect",
    transform(a) {
      return {
        "--hue-rotate": `hue-rotate(${a})`
      };
    }
  },
  invert: {
    className: "invert",
    group: "Effect",
    transform(a) {
      return {
        "--invert": `invert(${a})`
      };
    }
  },
  saturate: {
    className: "saturate",
    group: "Effect",
    transform(a) {
      return {
        "--saturate": `saturate(${a})`
      };
    }
  },
  sepia: {
    className: "sepia",
    group: "Effect",
    transform(a) {
      return {
        "--sepia": `sepia(${a})`
      };
    }
  },
  dropShadow: {
    className: "drop-shadow",
    group: "Effect",
    values: "dropShadows",
    transform(a) {
      return {
        "--drop-shadow": a
      };
    }
  },
  blur: {
    className: "blur",
    group: "Effect",
    values: "blurs",
    transform(a) {
      return {
        "--blur": `blur(${a})`
      };
    }
  },
  backdropFilter: {
    className: "bkdp",
    group: "Effect",
    values: {
      auto: "var(--backdrop-blur, ) var(--backdrop-brightness, ) var(--backdrop-contrast, ) var(--backdrop-grayscale, ) var(--backdrop-hue-rotate, ) var(--backdrop-invert, ) var(--backdrop-opacity, ) var(--backdrop-saturate, ) var(--backdrop-sepia, )"
    },
    transform(a) {
      return {
        backdropFilter: a,
        WebkitBackdropFilter: a
      };
    }
  },
  backdropBlur: {
    className: "bkdp-blur",
    group: "Effect",
    values: "blurs",
    transform(a) {
      return {
        "--backdrop-blur": `blur(${a})`
      };
    }
  },
  backdropBrightness: {
    className: "bkdp-brightness",
    group: "Effect",
    transform(a) {
      return {
        "--backdrop-brightness": `brightness(${a})`
      };
    }
  },
  backdropContrast: {
    className: "bkdp-contrast",
    group: "Effect",
    transform(a) {
      return {
        "--backdrop-contrast": `contrast(${a})`
      };
    }
  },
  backdropGrayscale: {
    className: "bkdp-grayscale",
    group: "Effect",
    transform(a) {
      return {
        "--backdrop-grayscale": `grayscale(${a})`
      };
    }
  },
  backdropHueRotate: {
    className: "bkdp-hue-rotate",
    group: "Effect",
    transform(a) {
      return {
        "--backdrop-hue-rotate": `hue-rotate(${a})`
      };
    }
  },
  backdropInvert: {
    className: "bkdp-invert",
    group: "Effect",
    transform(a) {
      return {
        "--backdrop-invert": `invert(${a})`
      };
    }
  },
  backdropOpacity: {
    className: "bkdp-opacity",
    group: "Effect",
    transform(a) {
      return {
        "--backdrop-opacity": a
      };
    }
  },
  backdropSaturate: {
    className: "bkdp-saturate",
    group: "Effect",
    transform(a) {
      return {
        "--backdrop-saturate": `saturate(${a})`
      };
    }
  },
  backdropSepia: {
    className: "bkdp-sepia",
    group: "Effect",
    transform(a) {
      return {
        "--backdrop-sepia": `sepia(${a})`
      };
    }
  }
}, fa = {
  flexBasis: {
    className: "flex-b",
    group: "Flex Layout",
    values(a) {
      return {
        ...a("sizes"),
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        full: "100%"
      };
    }
  },
  flex: {
    className: "flex",
    group: "Flex Layout",
    values: {
      1: "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
      none: "none"
    }
  },
  flexDirection: {
    className: "flex-d",
    group: "Flex Layout",
    shorthand: "flexDir"
  },
  flexGrow: {
    className: "flex-g",
    group: "Flex Layout"
  },
  flexShrink: {
    className: "flex-sh",
    group: "Flex Layout"
  },
  gridTemplateColumns: {
    className: "grid-tc",
    group: "Grid Layout"
  },
  gridTemplateRows: {
    className: "grid-tr",
    group: "Grid Layout"
  },
  gridColumn: {
    className: "grid-c",
    group: "Grid Layout"
  },
  gridRow: {
    className: "grid-r",
    group: "Grid Layout"
  },
  gridColumnStart: {
    className: "grid-cs",
    group: "Grid Layout"
  },
  gridColumnEnd: {
    className: "grid-ce",
    group: "Grid Layout"
  },
  gridAutoFlow: {
    className: "grid-af",
    group: "Grid Layout"
  },
  gridAutoColumns: {
    className: "grid-ac",
    group: "Grid Layout",
    values: {
      min: "min-content",
      max: "max-content",
      fr: "minmax(0, 1fr)"
    }
  },
  gridAutoRows: {
    className: "grid-ar",
    group: "Grid Layout",
    values: {
      min: "min-content",
      max: "max-content",
      fr: "minmax(0, 1fr)"
    }
  },
  gap: {
    className: "gap",
    group: "Flex Layout",
    values: "spacing"
  },
  gridGap: {
    className: "grid-g",
    group: "Grid Layout",
    values: "spacing"
  },
  gridRowGap: {
    className: "grid-rg",
    group: "Grid Layout",
    values: "spacing"
  },
  gridColumnGap: {
    className: "grid-cg",
    group: "Grid Layout",
    values: "spacing"
  },
  rowGap: {
    className: "rg",
    group: "Grid Layout",
    values: "spacing"
  },
  columnGap: {
    className: "cg",
    group: "Grid Layout",
    values: "spacing"
  },
  justifyContent: {
    className: "jc",
    group: "Flex Layout"
  },
  alignContent: {
    className: "ac",
    group: "Flex Layout"
  },
  alignItems: {
    className: "ai",
    group: "Flex Layout"
  },
  alignSelf: {
    className: "as",
    group: "Flex Layout"
  }
};
function B(a, e) {
  return {
    className: e,
    group: "Focus Ring",
    values: ["outside", "inside", "mixed", "none"],
    transform(r) {
      const t = "var(--focus-ring-color-prop, var(--global-color-focus-ring, #005FCC))";
      switch (r) {
        case "inside":
          return {
            "--focus-ring-color": t,
            [a]: {
              outlineOffset: "0px",
              outlineWidth: "var(--focus-ring-width, 1px)",
              outlineColor: "var(--focus-ring-color)",
              outlineStyle: "var(--focus-ring-style, solid)",
              borderColor: "var(--focus-ring-color)"
            }
          };
        case "outside":
          return {
            "--focus-ring-color": t,
            [a]: {
              outlineWidth: "var(--focus-ring-width, 2px)",
              outlineOffset: "var(--focus-ring-offset, 2px)",
              outlineStyle: "var(--focus-ring-style, solid)",
              outlineColor: "var(--focus-ring-color)"
            }
          };
        case "mixed":
          return {
            "--focus-ring-color": t,
            [a]: {
              outlineOffset: "0px",
              outlineWidth: "var(--focus-ring-width, 3px)",
              outlineStyle: "var(--focus-ring-style, solid)",
              outlineColor: "color-mix(in srgb, var(--focus-ring-color), transparent 60%)",
              borderColor: "var(--focus-ring-color)"
            }
          };
        case "none":
          return {
            "--focus-ring-color": t,
            [a]: {
              outline: "none"
            }
          };
        default:
          return {};
      }
    }
  };
}
var ha = {
  focusRing: B("&:is(:focus, [data-focus])", "focus-ring"),
  focusVisibleRing: B("&:is(:focus-visible, [data-focus-visible])", "focus-v-ring"),
  focusRingColor: {
    className: "focus-ring-c",
    values: "colors",
    group: "Focus Ring",
    transform(a, { utils: e }) {
      const r = "--focus-ring-color-prop", o = e.colorMix(a);
      if (o.invalid) return { [r]: a };
      const t = "--mix-" + r;
      return {
        [t]: o.value,
        [r]: `var(${t}, ${o.color})`
      };
    }
  },
  focusRingOffset: {
    className: "focus-ring-o",
    values: "spacing",
    group: "Focus Ring",
    transform: (a) => ({ "--focus-ring-offset": a })
  },
  focusRingWidth: {
    className: "focus-ring-w",
    values: "borderWidths",
    property: "outlineWidth",
    group: "Focus Ring",
    transform: (a) => ({ "--focus-ring-width": a })
  },
  focusRingStyle: {
    className: "focus-ring-s",
    values: "borderStyles",
    property: "outlineStyle",
    group: "Focus Ring",
    transform: (a) => ({ "--focus-ring-style": a })
  }
}, ya = s("--gradient-via"), x = /* @__PURE__ */ new Map([
  ["to-t", "to top"],
  ["to-tr", "to top right"],
  ["to-r", "to right"],
  ["to-br", "to bottom right"],
  ["to-b", "to bottom"],
  ["to-bl", "to bottom left"],
  ["to-l", "to left"],
  ["to-tl", "to top left"]
]), S = (a) => ({
  ...a("gradients"),
  ...Object.fromEntries(x.entries())
}), h = "var(--gradient-via-stops, var(--gradient-position), var(--gradient-from) var(--gradient-from-position), var(--gradient-to) var(--gradient-to-position))", ka = "var(--gradient-position), var(--gradient-from) var(--gradient-from-position), var(--gradient-via) var(--gradient-via-position), var(--gradient-to) var(--gradient-to-position)", xa = {
  backgroundGradient: {
    shorthand: "bgGradient",
    className: "bg-grad",
    group: "Background Gradient",
    values: S,
    transform(a, { raw: e, token: r }) {
      const o = r(`gradients.${e}`);
      return o ? { backgroundImage: o } : {
        "--gradient-stops": h,
        "--gradient-position": x.get(e) || e,
        backgroundImage: "linear-gradient(var(--gradient-stops))"
      };
    }
  },
  backgroundLinear: {
    shorthand: "bgLinear",
    className: "bg-linear",
    group: "Background Gradient",
    values: S,
    transform(a, { raw: e, token: r }) {
      const o = r(`gradients.${e}`);
      return o ? { backgroundImage: o } : {
        "--gradient-stops": h,
        "--gradient-position": x.get(e) || e,
        backgroundImage: "linear-gradient(var(--gradient-stops))"
      };
    }
  },
  backgroundRadial: {
    shorthand: "bgRadial",
    className: "bg-radial",
    group: "Background Gradient",
    values: "gradients",
    transform(a, { raw: e, token: r }) {
      const o = r(`gradients.${e}`);
      return o ? { backgroundImage: o } : {
        "--gradient-stops": h,
        "--gradient-position": e,
        backgroundImage: `radial-gradient(var(--gradient-stops,${e}))`
      };
    }
  },
  backgroundConic: {
    shorthand: "bgConic",
    className: "bg-conic",
    group: "Background Gradient",
    transform(a) {
      return {
        "--gradient-stops": h,
        "--gradient-position": a,
        backgroundImage: "conic-gradient(var(--gradient-stops))"
      };
    }
  },
  textGradient: {
    className: "txt-grad",
    group: "Background Gradient",
    values: S,
    transform(a, { raw: e, token: r }) {
      const o = r(`gradients.${e}`);
      return o ? {
        backgroundImage: o,
        WebkitBackgroundClip: "text",
        color: "transparent"
      } : {
        "--gradient-stops": h,
        "--gradient-position": x.get(e) || e,
        backgroundImage: "linear-gradient(var(--gradient-stops))",
        WebkitBackgroundClip: "text",
        color: "transparent"
      };
    }
  },
  gradientFromPosition: {
    className: "grad-from-pos",
    group: "Background Gradient",
    transform(a) {
      return {
        "--gradient-from-position": a
      };
    }
  },
  gradientToPosition: {
    className: "grad-to-pos",
    group: "Background Gradient",
    transform(a) {
      return {
        "--gradient-to-position": a
      };
    }
  },
  gradientFrom: {
    className: "grad-from",
    values: "colors",
    group: "Background Gradient",
    transform: s("--gradient-from")
  },
  gradientTo: {
    className: "grad-to",
    values: "colors",
    group: "Background Gradient",
    transform: s("--gradient-to")
  },
  gradientVia: {
    className: "grad-via",
    values: "colors",
    group: "Background Gradient",
    transform(a, e) {
      return {
        ...ya(a, e),
        "--gradient-stops": "var(--gradient-via-stops)",
        "--gradient-via-stops": ka
      };
    }
  },
  gradientViaPosition: {
    className: "grad-via-pos",
    group: "Background Gradient",
    transform(a) {
      return {
        "--gradient-via-position": a
      };
    }
  }
}, Na = {
  true: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: "0"
  },
  false: {
    position: "static",
    width: "auto",
    height: "auto",
    padding: "0",
    margin: "0",
    overflow: "visible",
    clip: "auto",
    whiteSpace: "normal"
  }
}, Sa = {
  srOnly: {
    className: "sr",
    values: { type: "boolean" },
    group: "Other",
    transform(a) {
      return Na[a] || {};
    }
  },
  debug: {
    className: "debug",
    values: { type: "boolean" },
    group: "Other",
    transform(a) {
      return a ? {
        outline: "1px solid blue !important",
        "&>*": {
          outline: "1px solid red !important"
        }
      } : {};
    }
  }
}, wa = {
  accentColor: {
    className: "ac-c",
    values: "colors",
    transform: s("accentColor"),
    group: "Color"
  },
  caretColor: {
    className: "ca-c",
    values: "colors",
    group: "Color",
    transform: s("caretColor")
  },
  scrollBehavior: {
    className: "scr-bhv",
    group: "Scroll"
  },
  // Scroll bar
  scrollbar: {
    className: "scr-bar",
    values: ["visible", "hidden"],
    group: "Scroll",
    transform(a) {
      if (a === "visible")
        return {
          msOverflowStyle: "auto",
          scrollbarWidth: "auto",
          "&::-webkit-scrollbar": {
            display: "block"
          }
        };
      if (a === "hidden")
        return {
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none"
          }
        };
    }
  },
  scrollbarColor: {
    className: "scr-bar-c",
    values: "colors",
    group: "Scroll",
    transform: s("scrollbarColor")
  },
  scrollbarGutter: {
    className: "scr-bar-g",
    group: "Scroll"
  },
  scrollbarWidth: {
    className: "scr-bar-w",
    values: "sizes",
    group: "Scroll"
  },
  // Scroll Margin
  scrollMargin: {
    className: "scr-m",
    values: "spacing",
    group: "Scroll"
  },
  scrollMarginLeft: {
    className: "scr-ml",
    values: "spacing",
    group: "Scroll"
  },
  scrollMarginRight: {
    className: "scr-mr",
    values: "spacing",
    group: "Scroll"
  },
  scrollMarginTop: {
    className: "scr-mt",
    values: "spacing",
    group: "Scroll"
  },
  scrollMarginBottom: {
    className: "scr-mb",
    values: "spacing",
    group: "Scroll"
  },
  scrollMarginBlock: {
    className: "scr-my",
    values: "spacing",
    group: "Scroll",
    shorthand: ["scrollMarginY"]
  },
  scrollMarginBlockEnd: {
    className: "scr-mbe",
    values: "spacing",
    group: "Scroll"
  },
  scrollMarginBlockStart: {
    className: "scr-mbt",
    values: "spacing",
    group: "Scroll"
  },
  scrollMarginInline: {
    className: "scr-mx",
    values: "spacing",
    group: "Scroll",
    shorthand: ["scrollMarginX"]
  },
  scrollMarginInlineEnd: {
    className: "scr-me",
    values: "spacing",
    group: "Scroll"
  },
  scrollMarginInlineStart: {
    className: "scr-ms",
    values: "spacing",
    group: "Scroll"
  },
  // Scroll Padding
  scrollPadding: {
    className: "scr-p",
    values: "spacing",
    group: "Scroll"
  },
  scrollPaddingBlock: {
    className: "scr-py",
    values: "spacing",
    group: "Scroll",
    shorthand: ["scrollPaddingY"]
  },
  scrollPaddingBlockStart: {
    className: "scr-pbs",
    values: "spacing",
    group: "Scroll"
  },
  scrollPaddingBlockEnd: {
    className: "scr-pbe",
    values: "spacing",
    group: "Scroll"
  },
  scrollPaddingInline: {
    className: "scr-px",
    values: "spacing",
    group: "Scroll",
    shorthand: ["scrollPaddingX"]
  },
  scrollPaddingInlineEnd: {
    className: "scr-pe",
    values: "spacing",
    group: "Scroll"
  },
  scrollPaddingInlineStart: {
    className: "scr-ps",
    values: "spacing",
    group: "Scroll"
  },
  scrollPaddingLeft: {
    className: "scr-pl",
    values: "spacing",
    group: "Scroll"
  },
  scrollPaddingRight: {
    className: "scr-pr",
    values: "spacing",
    group: "Scroll"
  },
  scrollPaddingTop: {
    className: "scr-pt",
    values: "spacing",
    group: "Scroll"
  },
  scrollPaddingBottom: {
    className: "scr-pb",
    values: "spacing",
    group: "Scroll"
  },
  // Scroll Snap
  scrollSnapAlign: {
    className: "scr-sa",
    group: "Scroll"
  },
  scrollSnapStop: {
    className: "scrs-s",
    group: "Scroll"
  },
  scrollSnapType: {
    className: "scrs-t",
    group: "Scroll",
    values: {
      none: "none",
      x: "x var(--scroll-snap-strictness)",
      y: "y var(--scroll-snap-strictness)",
      both: "both var(--scroll-snap-strictness)"
    }
  },
  scrollSnapStrictness: {
    className: "scrs-strt",
    values: ["mandatory", "proximity"],
    group: "Scroll",
    transform(a) {
      return {
        "--scroll-snap-strictness": a
      };
    }
  },
  scrollSnapMargin: {
    className: "scrs-m",
    values: "spacing",
    group: "Scroll"
  },
  scrollSnapMarginTop: {
    className: "scrs-mt",
    values: "spacing",
    group: "Scroll"
  },
  scrollSnapMarginBottom: {
    className: "scrs-mb",
    values: "spacing",
    group: "Scroll"
  },
  scrollSnapMarginLeft: {
    className: "scrs-ml",
    values: "spacing",
    group: "Scroll"
  },
  scrollSnapMarginRight: {
    className: "scrs-mr",
    values: "spacing",
    group: "Scroll"
  },
  scrollSnapCoordinate: {
    className: "scrs-c",
    group: "Scroll"
  },
  scrollSnapDestination: {
    className: "scrs-d",
    group: "Scroll"
  },
  scrollSnapPointsX: {
    className: "scrs-px",
    group: "Scroll"
  },
  scrollSnapPointsY: {
    className: "scrs-py",
    group: "Scroll"
  },
  scrollSnapTypeX: {
    className: "scrs-tx",
    group: "Scroll"
  },
  scrollSnapTypeY: {
    className: "scrs-ty",
    group: "Scroll"
  },
  // Scroll Timeline
  scrollTimeline: {
    className: "scrtl",
    group: "Scroll"
  },
  scrollTimelineAxis: {
    className: "scrtl-a",
    group: "Scroll"
  },
  scrollTimelineName: {
    className: "scrtl-n",
    group: "Scroll"
  },
  touchAction: {
    className: "tch-a",
    group: "Interactivity"
  },
  userSelect: {
    className: "us",
    group: "Interactivity",
    transform(a) {
      return {
        WebkitUserSelect: a,
        userSelect: a
      };
    }
  },
  // Overflow
  overflow: {
    className: "ov",
    group: "Scroll"
  },
  overflowWrap: {
    className: "ov-wrap",
    group: "Scroll"
  },
  overflowX: {
    className: "ov-x",
    group: "Scroll"
  },
  overflowY: {
    className: "ov-y",
    group: "Scroll"
  },
  overflowAnchor: {
    className: "ov-a",
    group: "Scroll"
  },
  overflowBlock: {
    className: "ov-b",
    group: "Scroll"
  },
  overflowInline: {
    className: "ov-i",
    group: "Scroll"
  },
  overflowClipBox: {
    className: "ovcp-bx",
    group: "Scroll"
  },
  overflowClipMargin: {
    className: "ovcp-m",
    group: "Scroll"
  },
  overscrollBehavior: {
    className: "ovs-b",
    group: "Scroll"
  },
  overscrollBehaviorX: {
    className: "ovs-bx",
    group: "Scroll"
  },
  overscrollBehaviorY: {
    className: "ovs-by",
    group: "Scroll"
  },
  overscrollBehaviorBlock: {
    className: "ovs-bb",
    group: "Scroll"
  },
  overscrollBehaviorInline: {
    className: "ovs-bi",
    group: "Scroll"
  }
}, _a = {
  aspectRatio: {
    className: "asp",
    values: "aspectRatios",
    group: "Layout"
  },
  boxDecorationBreak: {
    className: "bx-db",
    group: "Layout",
    transform(a) {
      return {
        boxDecorationBreak: a,
        WebkitBoxDecorationBreak: a
      };
    }
  },
  zIndex: {
    className: "z",
    values: "zIndex",
    group: "Visibility"
  },
  boxSizing: {
    className: "bx-s",
    group: "System"
  },
  objectPosition: {
    className: "obj-p",
    group: "Layout"
  },
  objectFit: {
    className: "obj-f",
    group: "Layout"
  },
  overscrollBehavior: {
    className: "ovscl",
    group: "Scroll"
  },
  overscrollBehaviorX: {
    className: "ovscl-x",
    group: "Scroll"
  },
  overscrollBehaviorY: {
    className: "ovscl-y",
    group: "Scroll"
  },
  position: {
    className: "pos",
    shorthand: "pos",
    group: "Position"
  },
  top: {
    className: "top",
    values: "spacing",
    group: "Position"
  },
  left: {
    className: "left",
    values: "spacing",
    group: "Position"
  },
  inset: {
    className: "inset",
    group: "Position",
    values: (a) => ({
      auto: "auto",
      ...a("spacing")
    })
  },
  insetInline: {
    className: "inset-x",
    values: "spacing",
    group: "Position",
    shorthand: ["insetX"]
  },
  insetBlock: {
    className: "inset-y",
    values: "spacing",
    group: "Position",
    shorthand: ["insetY"]
  },
  insetBlockEnd: {
    className: "inset-be",
    values: "spacing",
    group: "Position"
  },
  insetBlockStart: {
    className: "inset-bs",
    values: "spacing",
    group: "Position"
  },
  insetInlineEnd: {
    className: "inset-e",
    values: "spacing",
    group: "Position",
    shorthand: ["insetEnd", "end"]
  },
  insetInlineStart: {
    className: "inset-s",
    values: "spacing",
    group: "Position",
    shorthand: ["insetStart", "start"]
  },
  right: {
    className: "right",
    values: "spacing",
    group: "Position"
  },
  bottom: {
    className: "bottom",
    values: "spacing",
    group: "Position"
  },
  float: {
    className: "float",
    values: ["start", "end"],
    property: "float",
    group: "Position",
    transform(a) {
      return a === "start" ? {
        float: "left",
        '[dir="rtl"] &': {
          float: "right"
        }
      } : a === "end" ? {
        float: "right",
        '[dir="rtl"] &': {
          float: "left"
        }
      } : {
        float: a
      };
    }
  },
  visibility: {
    className: "vis",
    group: "Visibility"
  }
}, Ca = {
  listStyleType: {
    className: "li-t",
    group: "List"
  },
  listStylePosition: {
    className: "li-pos",
    group: "List"
  },
  listStyleImage: {
    className: "li-img",
    group: "List",
    values: "assets"
  },
  listStyle: {
    className: "li-s",
    group: "List"
  }
}, Ba = {
  outlineWidth: {
    className: "ring-w",
    shorthand: "ringWidth",
    values: "borderWidths",
    group: "Border"
  },
  outlineColor: {
    className: "ring-c",
    values: "colors",
    group: "Color",
    shorthand: "ringColor",
    transform: s("outlineColor")
  },
  outline: {
    className: "ring",
    shorthand: "ring",
    values: "borders",
    group: "Border",
    transform(a) {
      return a === "none" ? { outline: "2px solid transparent", outlineOffset: "2px" } : { outline: a };
    }
  },
  outlineOffset: {
    className: "ring-o",
    shorthand: "ringOffset",
    values: "spacing",
    group: "Border"
  }
}, Fa = {
  appearance: {
    className: "ap",
    group: "Visibility",
    transform(a) {
      return { appearance: a, WebkitAppearance: a };
    }
  },
  backfaceVisibility: {
    className: "bfv",
    group: "Visibility",
    transform(a) {
      return { backfaceVisibility: a, WebkitBackfaceVisibility: a };
    }
  },
  clipPath: {
    className: "cp-path",
    group: "Other",
    transform(a) {
      return { clipPath: a, WebkitClipPath: a };
    }
  },
  hyphens: {
    className: "hy",
    group: "Other",
    transform(a) {
      return { hyphens: a, WebkitHyphens: a };
    }
  },
  mask: {
    className: "msk",
    group: "Other",
    transform(a) {
      return { mask: a, WebkitMask: a };
    }
  },
  maskImage: {
    className: "msk-i",
    group: "Other",
    transform(a) {
      return { maskImage: a, WebkitMaskImage: a };
    }
  },
  maskSize: {
    className: "msk-s",
    group: "Other",
    transform(a) {
      return { maskSize: a, WebkitMaskSize: a };
    }
  },
  textSizeAdjust: {
    className: "txt-adj",
    group: "Typography",
    transform(a) {
      return { textSizeAdjust: a, WebkitTextSizeAdjust: a };
    }
  }
}, v = (a) => ({
  auto: "auto",
  ...a("sizes"),
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  "1/6": "16.666667%",
  "2/6": "33.333333%",
  "3/6": "50%",
  "4/6": "66.666667%",
  "5/6": "83.333333%",
  "1/12": "8.333333%",
  "2/12": "16.666667%",
  "3/12": "25%",
  "4/12": "33.333333%",
  "5/12": "41.666667%",
  "6/12": "50%",
  "7/12": "58.333333%",
  "8/12": "66.666667%",
  "9/12": "75%",
  "10/12": "83.333333%",
  "11/12": "91.666667%",
  screen: "100vw"
}), f = (a) => ({
  auto: "auto",
  ...a("sizes"),
  svh: "100svh",
  lvh: "100lvh",
  dvh: "100dvh",
  screen: "100vh",
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  "1/6": "16.666667%",
  "2/6": "33.333333%",
  "3/6": "50%",
  "4/6": "66.666667%",
  "5/6": "83.333333%"
}), Ra = {
  width: {
    shorthand: "w",
    className: "w",
    group: "Width",
    values: v
  },
  inlineSize: {
    className: "w-is",
    group: "Width",
    values: v
  },
  minWidth: {
    shorthand: "minW",
    className: "min-w",
    group: "Width",
    values: v
  },
  minInlineSize: {
    className: "min-w-is",
    group: "Width",
    values: v
  },
  maxWidth: {
    shorthand: "maxW",
    className: "max-w",
    group: "Width",
    values: v
  },
  maxInlineSize: {
    className: "max-w-is",
    group: "Width",
    values: v
  },
  height: {
    shorthand: "h",
    className: "h",
    group: "Height",
    values: f
  },
  blockSize: {
    className: "h-bs",
    group: "Height",
    values: f
  },
  minHeight: {
    shorthand: "minH",
    className: "min-h",
    group: "Height",
    values: f
  },
  minBlockSize: {
    className: "min-h-bs",
    group: "Height",
    values: f
  },
  maxHeight: {
    shorthand: "maxH",
    className: "max-h",
    group: "Height",
    values: f
  },
  maxBlockSize: {
    className: "max-b",
    group: "Height",
    values: f
  },
  boxSize: {
    className: "size",
    group: "Width",
    values: v,
    transform(a) {
      return {
        width: a,
        height: a
      };
    }
  }
}, p = (a) => ({
  auto: "auto",
  ...a("spacing")
}), za = {
  padding: {
    className: "p",
    shorthand: "p",
    values: "spacing",
    group: "Padding"
  },
  paddingLeft: {
    className: "pl",
    shorthand: "pl",
    values: "spacing",
    group: "Padding"
  },
  paddingRight: {
    className: "pr",
    shorthand: "pr",
    values: "spacing",
    group: "Padding"
  },
  paddingTop: {
    className: "pt",
    shorthand: "pt",
    values: "spacing",
    group: "Padding"
  },
  paddingBottom: {
    className: "pb",
    shorthand: "pb",
    values: "spacing",
    group: "Padding"
  },
  paddingBlock: {
    className: "py",
    values: "spacing",
    group: "Padding",
    shorthand: ["py", "paddingY"]
  },
  paddingBlockEnd: {
    className: "pbe",
    values: "spacing",
    group: "Padding"
  },
  paddingBlockStart: {
    className: "pbs",
    values: "spacing",
    group: "Padding"
  },
  paddingInline: {
    className: "px",
    values: "spacing",
    group: "Padding",
    shorthand: ["paddingX", "px"]
  },
  paddingInlineEnd: {
    className: "pe",
    shorthand: ["pe", "paddingEnd"],
    values: "spacing",
    group: "Padding"
  },
  paddingInlineStart: {
    className: "ps",
    shorthand: ["ps", "paddingStart"],
    values: "spacing",
    group: "Padding"
  },
  marginLeft: {
    className: "ml",
    shorthand: "ml",
    values: p,
    group: "Margin"
  },
  marginRight: {
    className: "mr",
    shorthand: "mr",
    values: p,
    group: "Margin"
  },
  marginTop: {
    className: "mt",
    shorthand: "mt",
    values: p,
    group: "Margin"
  },
  marginBottom: {
    className: "mb",
    shorthand: "mb",
    values: p,
    group: "Margin"
  },
  margin: {
    className: "m",
    shorthand: "m",
    values: p,
    group: "Margin"
  },
  marginBlock: {
    className: "my",
    values: p,
    group: "Margin",
    shorthand: ["my", "marginY"]
  },
  marginBlockEnd: {
    className: "mbe",
    values: p,
    group: "Margin"
  },
  marginBlockStart: {
    className: "mbs",
    values: p,
    group: "Margin"
  },
  marginInline: {
    className: "mx",
    values: p,
    group: "Margin",
    shorthand: ["mx", "marginX"]
  },
  marginInlineEnd: {
    className: "me",
    shorthand: ["me", "marginEnd"],
    values: p,
    group: "Margin"
  },
  marginInlineStart: {
    className: "ms",
    shorthand: ["ms", "marginStart"],
    values: p,
    group: "Margin"
  },
  spaceX: {
    className: "sx",
    values: p,
    property: "marginInlineStart",
    group: "Margin",
    transform(a) {
      return {
        "& > :not([hidden]) ~ :not([hidden])": {
          marginInlineStart: a,
          marginInlineEnd: "0px"
        }
      };
    }
  },
  spaceY: {
    className: "sy",
    values: p,
    property: "marginBlockStart",
    group: "Margin",
    transform(a) {
      return {
        "& > :not([hidden]) ~ :not([hidden])": {
          marginTop: a,
          marginBottom: "0px"
        }
      };
    }
  }
}, Ea = {
  fill: {
    className: "fill",
    values: "colors",
    group: "Color",
    transform: s("fill")
  },
  stroke: {
    className: "stk",
    values: "colors",
    group: "Color",
    transform: s("stroke")
  },
  strokeWidth: {
    className: "stk-w",
    values: "borderWidths",
    group: "Border"
  },
  strokeDasharray: {
    className: "stk-dsh",
    group: "Border"
  },
  strokeDashoffset: {
    className: "stk-do",
    group: "Border"
  },
  strokeLinecap: {
    className: "stk-lc",
    group: "Border"
  },
  strokeLinejoin: {
    className: "stk-lj",
    group: "Border"
  },
  strokeMiterlimit: {
    className: "stk-ml",
    group: "Border"
  },
  strokeOpacity: {
    className: "stk-op",
    group: "Border"
  }
}, Ta = {
  borderCollapse: {
    className: "bd-cl",
    group: "Table"
  },
  borderSpacing: {
    className: "bd-sp",
    group: "Table",
    values(a) {
      return {
        ...a("spacing"),
        auto: "var(--border-spacing-x) var(--border-spacing-y)"
      };
    }
  },
  borderSpacingX: {
    className: "bd-sx",
    values: "spacing",
    group: "Table",
    transform(a) {
      return {
        "--border-spacing-x": a
      };
    }
  },
  borderSpacingY: {
    className: "bd-sy",
    values: "spacing",
    group: "Table",
    transform(a) {
      return {
        "--border-spacing-y": a
      };
    }
  },
  tableLayout: {
    className: "tbl",
    group: "Table"
  }
}, E = {
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
  full: "100%"
}, Wa = Object.fromEntries(
  Object.entries(E).map(([a, e]) => [`-${a}`, `-${e}`])
), w = { ...E, ...Wa }, Ia = {
  transformOrigin: {
    className: "trf-o",
    group: "Transform"
  },
  transformBox: {
    className: "trf-b",
    group: "Transform"
  },
  transformStyle: {
    className: "trf-s",
    group: "Transform"
  },
  transform: {
    className: "trf",
    group: "Transform"
  },
  rotate: {
    className: "rotate",
    group: "Transform",
    property: "rotate",
    values: {
      auto: "var(--rotate-x) var(--rotate-y)",
      "auto-3d": "var(--rotate-x) var(--rotate-y) var(--rotate-z)"
    }
  },
  rotateX: {
    className: "rotate-x",
    group: "Transform",
    property: "rotate",
    transform(a) {
      return {
        "--rotate-x": a
      };
    }
  },
  rotateY: {
    className: "rotate-y",
    group: "Transform",
    property: "rotate",
    transform(a) {
      return {
        "--rotate-y": a
      };
    }
  },
  rotateZ: {
    className: "rotate-z",
    group: "Transform",
    property: "rotate",
    transform(a) {
      return {
        "--rotate-z": a
      };
    }
  },
  scale: {
    className: "scale",
    group: "Transform",
    property: "scale",
    values: {
      auto: "var(--scale-x) var(--scale-y)"
    }
  },
  scaleX: {
    className: "scale-x",
    group: "Transform",
    transform(a) {
      return {
        "--scale-x": a
      };
    }
  },
  scaleY: {
    className: "scale-y",
    group: "Transform",
    transform(a) {
      return {
        "--scale-y": a
      };
    }
  },
  translate: {
    className: "translate",
    group: "Transform",
    property: "translate",
    values: {
      auto: "var(--translate-x) var(--translate-y)",
      "auto-3d": "var(--translate-x) var(--translate-y) var(--translate-z)"
    }
  },
  translateX: {
    shorthand: "x",
    className: "translate-x",
    group: "Transform",
    values(a) {
      return {
        ...a("spacing"),
        ...w
      };
    },
    transform(a) {
      return {
        "--translate-x": a
      };
    }
  },
  translateY: {
    shorthand: "y",
    className: "translate-y",
    group: "Transform",
    values(a) {
      return {
        ...a("spacing"),
        ...w
      };
    },
    transform(a) {
      return {
        "--translate-y": a
      };
    }
  },
  translateZ: {
    shorthand: "z",
    className: "translate-z",
    group: "Transform",
    values(a) {
      return {
        ...a("spacing"),
        ...w
      };
    },
    transform(a) {
      return {
        "--translate-z": a
      };
    }
  }
}, m = (a) => ({
  transitionProperty: `var(--transition-prop, ${a})`,
  transitionTimingFunction: "var(--transition-easing, cubic-bezier(0.4, 0, 0.2, 1))",
  transitionDuration: "var(--transition-duration, 150ms)"
}), F = {
  all: m("all"),
  common: m(
    "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter"
  ),
  size: m("width, height, min-width, max-width, min-height, max-height"),
  position: m("left, right, top, bottom, inset, inset-inline, inset-block"),
  background: m("background, background-color, background-image, background-position"),
  colors: m("color, background-color, border-color, outline-color, text-decoration-color, fill, stroke"),
  opacity: m("opacity"),
  shadow: m("box-shadow"),
  transform: m("transform")
}, Da = {
  common: "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
  colors: "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",
  size: "width, height, min-width, max-width, min-height, max-height",
  position: "left, right, top, bottom, inset, inset-inline, inset-block",
  background: "background, background-color, background-image, background-position"
}, Pa = {
  transitionTimingFunction: {
    className: "trs-tmf",
    values: "easings",
    group: "Transition",
    transform(a) {
      return {
        "--transition-easing": a,
        transitionTimingFunction: a
      };
    }
  },
  transitionDelay: {
    className: "trs-dly",
    values: "durations",
    group: "Transition"
  },
  transitionDuration: {
    className: "trs-dur",
    values: "durations",
    group: "Transition",
    transform(a) {
      return {
        "--transition-duration": a,
        transitionDuration: a
      };
    }
  },
  transitionProperty: {
    className: "trs-prop",
    group: "Transition",
    values: Da,
    transform(a) {
      return {
        "--transition-prop": a,
        transitionProperty: a
      };
    }
  },
  transition: {
    className: "trs",
    values: Object.keys(F),
    group: "Transition",
    transform(a) {
      return F[a] ?? { transition: a };
    }
  },
  // Animations
  animation: {
    className: "anim",
    values: "animations",
    group: "Animation"
  },
  animationName: {
    className: "anim-n",
    values: "keyframes",
    group: "Animation"
  },
  animationTimingFunction: {
    className: "anim-tmf",
    values: "easings",
    group: "Animation"
  },
  animationDuration: {
    className: "anim-dur",
    values: "durations",
    group: "Animation"
  },
  animationDelay: {
    className: "anim-dly",
    values: "durations",
    group: "Animation"
  },
  animationPlayState: {
    className: "anim-ps",
    group: "Animation"
  },
  animationComposition: {
    className: "anim-comp",
    group: "Animation"
  },
  animationFillMode: {
    className: "anim-fm",
    group: "Animation"
  },
  animationDirection: {
    className: "anim-dir",
    group: "Animation"
  },
  animationIterationCount: {
    className: "anim-ic",
    group: "Animation"
  },
  animationRange: {
    className: "anim-r",
    group: "Animation"
  },
  animationState: {
    className: "anim-s",
    group: "Animation"
  },
  animationRangeStart: {
    className: "anim-rs",
    group: "Animation"
  },
  animationRangeEnd: {
    className: "anim-re",
    group: "Animation"
  },
  animationTimeline: {
    className: "anim-tl",
    group: "Animation"
  }
}, Va = {
  color: {
    className: "c",
    values: "colors",
    group: "Color",
    transform: s("color")
  },
  fontFamily: {
    className: "ff",
    values: "fonts",
    group: "Typography"
  },
  fontSize: {
    className: "fs",
    values: "fontSizes",
    group: "Typography"
  },
  fontSizeAdjust: {
    className: "fs-a",
    group: "Typography"
  },
  fontPalette: {
    className: "fp",
    group: "Typography"
  },
  fontKerning: {
    className: "fk",
    group: "Typography"
  },
  fontFeatureSettings: {
    className: "ff-s",
    group: "Typography"
  },
  fontWeight: {
    className: "fw",
    values: "fontWeights",
    group: "Typography"
  },
  fontSmoothing: {
    className: "fsmt",
    group: "Typography",
    values: {
      antialiased: "antialiased",
      "subpixel-antialiased": "auto"
    },
    transform(a) {
      return {
        WebkitFontSmoothing: a
      };
    }
  },
  fontVariant: {
    className: "fv",
    group: "Typography"
  },
  fontVariantAlternates: {
    className: "fv-alt",
    group: "Typography"
  },
  fontVariantCaps: {
    className: "fv-caps",
    group: "Typography"
  },
  fontVariationSettings: {
    className: "fv-s",
    group: "Typography"
  },
  fontVariantNumeric: {
    className: "fv-num",
    group: "Typography"
  },
  letterSpacing: {
    className: "ls",
    values: "letterSpacings",
    group: "Typography"
  },
  lineHeight: {
    className: "lh",
    values: "lineHeights",
    group: "Typography"
  },
  textAlign: {
    className: "ta",
    group: "Typography"
  },
  textDecoration: {
    className: "td",
    group: "Typography"
  },
  textDecorationColor: {
    className: "td-c",
    values: "colors",
    transform: s("textDecorationColor"),
    group: "Typography"
  },
  textEmphasisColor: {
    className: "te-c",
    values: "colors",
    transform: s("textEmphasisColor"),
    group: "Typography"
  },
  textDecorationStyle: {
    className: "td-s",
    group: "Typography"
  },
  textDecorationThickness: {
    className: "td-t",
    group: "Typography"
  },
  textUnderlineOffset: {
    className: "tu-o",
    group: "Typography"
  },
  textTransform: {
    className: "tt",
    group: "Typography"
  },
  textIndent: {
    className: "ti",
    group: "Typography",
    values: "spacing"
  },
  textShadow: {
    className: "tsh",
    values: "shadows",
    group: "Typography"
  },
  textShadowColor: {
    shorthand: "textShadowColor",
    className: "tsh-c",
    values: "colors",
    transform: s("--text-shadow-color"),
    group: "Typography"
  },
  textOverflow: {
    className: "tov",
    group: "Typography"
  },
  verticalAlign: {
    className: "va",
    group: "Typography"
  },
  wordBreak: {
    className: "wb",
    group: "Typography"
  },
  textWrap: {
    className: "tw",
    values: ["wrap", "balance", "nowrap"],
    group: "Typography",
    transform(a) {
      return { textWrap: a };
    }
  },
  truncate: {
    className: "trunc",
    values: { type: "boolean" },
    group: "Typography",
    transform(a) {
      return a ? {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      } : {};
    }
  },
  lineClamp: {
    className: "lc",
    group: "Typography",
    transform(a) {
      return a === "none" ? {
        WebkitLineClamp: "unset"
      } : {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: a,
        WebkitBoxOrient: "vertical"
      };
    }
  }
}, ja = Object.assign(
  {},
  _a,
  ga,
  fa,
  za,
  Ba,
  ha,
  ba,
  Ra,
  Va,
  Ca,
  da,
  xa,
  ca,
  va,
  Ta,
  Pa,
  Ia,
  wa,
  Ea,
  Sa,
  Fa,
  ua,
  pa
), Aa = (a) => a, La = Aa({
  name: "@pandacss/preset-base",
  conditions: L,
  utilities: ja,
  patterns: la,
  // globalVars,
  globalCss: M
}), N = La;
const Ma = {
  transparent: { value: "transparent" },
  black: { value: "#000000" },
  white: { value: "#FFFFFF" },
  current: { value: "currentColor" },
  gray: {
    0: { value: "#FFFFFF" },
    1: { value: "#FBFCFD" },
    2: { value: "#F7F9FA" },
    3: { value: "#F5F6F7" },
    4: { value: "#F1F3F6" },
    5: { value: "#EDEFF0" },
    10: { value: "#DFE1E2" },
    20: { value: "#C6CACE" },
    30: { value: "#A9AEB1" },
    40: { value: "#8D9297" },
    50: { value: "#71767A" },
    60: { value: "#565C65" },
    70: { value: "#3D4551" },
    80: { value: "#2D2E2F" },
    90: { value: "#1C1D1F" },
    92: { value: "#161719" },
    94: { value: "#111113" },
    96: { value: "#0b0c0c" },
    98: { value: "#060606" },
    100: { value: "#000000" }
  },
  slate: {
    0: { value: "#FFFFFF" },
    1: { value: "#FAFAFA" },
    2: { value: "#F9F8F6" },
    3: { value: "#F7F5F3" },
    4: { value: "#F6F3EF" },
    5: { value: "#F4F0EB" },
    10: { value: "#E3E1DE" },
    20: { value: "#CBCAC8" },
    30: { value: "#AFADAB" },
    40: { value: "#939190" },
    50: { value: "#767675" },
    60: { value: "#5F5F5E" },
    70: { value: "#474747" },
    80: { value: "#2E2E2E" },
    90: { value: "#1E1E1E" },
    100: { value: "#000000" }
  },
  blue: {
    1: { value: "#fafdff" },
    2: { value: "#f6fbff" },
    3: { value: "#f1f9ff" },
    4: { value: "#edf7ff" },
    5: { value: "#E8F5FF" },
    10: { value: "#CFE8FF" },
    20: { value: "#A1D3FF" },
    30: { value: "#58B4FF" },
    40: { value: "#2491FF" },
    50: { value: "#0076DA" },
    60: { value: "#005EA2" },
    70: { value: "#0B4778" },
    80: { value: "#112F4E" },
    90: { value: "#11181D" }
  },
  mint: {
    5: { value: "#D5FBF3" },
    10: { value: "#7EFBE1" },
    20: { value: "#29E1CB" },
    30: { value: "#1DC2AE" },
    40: { value: "#00A398" },
    50: { value: "#008480" },
    60: { value: "#0F6460" },
    70: { value: "#0B4B3F" },
    80: { value: "#123131" }
  },
  cyan: {
    5: { value: "#E7F6F8" },
    10: { value: "#CCECF2" },
    20: { value: "#99DEEA" },
    30: { value: "#5DC0D1" },
    40: { value: "#449DAC" },
    50: { value: "#168092" },
    60: { value: "#2A646D" },
    70: { value: "#2C4A4E" },
    80: { value: "#203133" },
    90: { value: "#111819" }
  },
  red: {
    1: { value: "#FFF9FA" },
    2: { value: "#FFF3F5" },
    3: { value: "#FFEEF0" },
    4: { value: "#FFE8EB" },
    5: { value: "#FFE2E6" },
    10: { value: "#FFB1B8" },
    20: { value: "#FF7F8A" },
    30: { value: "#FF4D5B" },
    40: { value: "#FE1D2D" },
    50: { value: "#E50513" },
    60: { value: "#B3000E" },
    70: { value: "#810009" },
    80: { value: "#4F0004" },
    90: { value: "#200000" }
  },
  redOrange: {
    5: { value: "#FFF3F2" },
    10: { value: "#FDE0DB" },
    20: { value: "#FDB8AE" },
    30: { value: "#FF8D7B" },
    40: { value: "#FB5A47" },
    50: { value: "#E52207" },
    60: { value: "#B50909" },
    70: { value: "#8B0A03" },
    80: { value: "#5C1111" },
    90: { value: "#200100" }
  },
  orange: {
    5: { value: "#fef2e4" },
    10: { value: "#fce2c5" },
    20: { value: "#ffbc78" },
    30: { value: "#fa9441" },
    40: { value: "#e66f0e" },
    50: { value: "#c05600" },
    60: { value: "#8c471c" },
    70: { value: "#5f3617" },
    80: { value: "#352313" }
  },
  gold: {
    1: { value: "#FFFCF4" },
    2: { value: "#FFF9E9" },
    3: { value: "#FEF6DE" },
    4: { value: "#FEF3D3" },
    5: { value: "#FEF0C8" },
    10: { value: "#FFE396" },
    20: { value: "#FFBE2E" },
    30: { value: "#E5A000" },
    40: { value: "#C2850C" },
    50: { value: "#936F38" },
    60: { value: "#7A591A" },
    70: { value: "#5C410A" },
    80: { value: "#3B2B15" },
    90: { value: "#1E1100" }
  },
  yellow: {
    1: { value: "#FFFDF3" },
    2: { value: "#FFFBE7" },
    3: { value: "#FFF9DA" },
    4: { value: "#FFF7CE" },
    5: { value: "#FFF5C2" },
    10: { value: "#FEE685" },
    20: { value: "#FACE00" },
    30: { value: "#DDAA01" },
    40: { value: "#B38C00" },
    50: { value: "#947100" },
    60: { value: "#776017" },
    70: { value: "#5C4809" },
    80: { value: "#422D19" },
    90: { value: "#1C0B00" }
  },
  green: {
    1: { value: "#F8FEF4" },
    2: { value: "#F1FDE9" },
    3: { value: "#EBFBDD" },
    4: { value: "#E4FAD2" },
    5: { value: "#DDF9C7" },
    10: { value: "#C5EE93" },
    20: { value: "#98D035" },
    30: { value: "#7FB135" },
    40: { value: "#719F2A" },
    50: { value: "#538200" },
    60: { value: "#466C04" },
    70: { value: "#2F4A0B" },
    80: { value: "#243413" },
    90: { value: "#0D1400" }
  },
  indigo: {
    5: { value: "#f0f0ff" },
    10: { value: "#e0e0ff" },
    20: { value: "#ccceff" },
    30: { value: "#a3a7fa" },
    40: { value: "#8289ff" },
    50: { value: "#656bd7" },
    60: { value: "#4a50c4" },
    70: { value: "#3333a3" },
    80: { value: "#212463" }
  },
  tan: {
    5: { value: "#F5F0E6" },
    10: { value: "#F1E5CD" },
    20: { value: "#DEC69A" },
    30: { value: "#C7A97B" },
    40: { value: "#AD8B65" },
    50: { value: "#8E704F" },
    60: { value: "#6B5947" },
    70: { value: "#4D4438" },
    80: { value: "#322D26" },
    90: { value: "#191714" }
  }
}, $a = {
  sans: { value: "'IBM Plex Sans', Geneva, Tahoma, Verdana, sans-serif" },
  serif: { value: "'Piazzolla', Georgia, 'Times New Roman', Times, serif" },
  mono: {
    value: "'IBM Plex Mono', Andale Mono, monaco, Consolas, Lucida Console, monospace"
  }
}, Oa = {
  light: { value: "300" },
  normal: { value: "400" },
  medium: { value: "500" },
  bold: { value: "700" },
  black: { value: "900" }
}, T = {
  0: { value: "0" },
  1: { value: "0.0625rem" },
  2: { value: "0.125rem" },
  3: { value: "0.1875rem" },
  4: { value: "0.25rem" },
  5: { value: "0.3125rem" },
  6: { value: "0.375rem" },
  7: { value: "0.4375rem" },
  8: { value: "0.5rem" },
  9: { value: "0.5625rem" },
  10: { value: "0.625rem" },
  12: { value: "0.75rem" },
  14: { value: "0.875rem" },
  16: { value: "1rem" },
  20: { value: "1.25rem" },
  22: { value: "1.375rem" },
  24: { value: "1.5rem" },
  32: { value: "2rem" },
  40: { value: "2.5rem" },
  48: { value: "3rem" },
  56: { value: "3.5rem" },
  64: { value: "4rem" },
  72: { value: "4.5rem" },
  80: { value: "5rem" },
  88: { value: "5.5rem" },
  96: { value: "6rem" },
  104: { value: "6.5rem" },
  112: { value: "7rem" },
  120: { value: "7.5rem" },
  128: { value: "8rem" },
  136: { value: "8.5rem" },
  144: { value: "9rem" },
  152: { value: "9.5rem" },
  160: { value: "10rem" },
  168: { value: "10.5rem" },
  176: { value: "11rem" },
  184: { value: "11.5rem" },
  192: { value: "12rem" },
  200: { value: "12.5rem" },
  208: { value: "13rem" },
  216: { value: "13.5rem" },
  224: { value: "14rem" },
  232: { value: "14.5rem" },
  240: { value: "15rem" },
  248: { value: "15.5rem" },
  256: { value: "16rem" },
  264: { value: "16.5rem" },
  272: { value: "17rem" },
  280: { value: "17.5rem" }
}, W = {
  "2xs": { value: "16rem" },
  // 256px
  xs: { value: "20rem" },
  // 320px
  sm: { value: "24rem" },
  // 384px
  md: { value: "28rem" },
  // 448px
  lg: { value: "32rem" },
  // 512px
  xl: { value: "36rem" },
  // 576px
  "2xl": { value: "42rem" },
  // 672px
  "3xl": { value: "48rem" },
  // 768px
  "4xl": { value: "56rem" },
  // 896px
  "5xl": { value: "64rem" },
  // 1024px
  "6xl": { value: "72rem" },
  // 1152px
  "7xl": { value: "80rem" },
  // 1280px
  "8xl": { value: "90rem" }
  // 1440px
}, I = {
  full: { value: "100%" },
  half: { value: "50%" },
  min: { value: "min-content" },
  max: { value: "max-content" },
  fit: { value: "fit-content" },
  prose: { value: "65ch" },
  auto: { value: "auto" }
}, _ = {
  ...T,
  ...W,
  ...I
}, Ga = {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
}, Ha = {
  12: { value: "{sizes.12}" },
  14: { value: "{sizes.14}" },
  16: { value: "{sizes.16}" },
  20: { value: "{sizes.20}" },
  24: { value: "{sizes.24}" },
  32: { value: "{sizes.32}" },
  40: { value: "{sizes.40}" },
  48: { value: "{sizes.48}" },
  64: { value: "{sizes.64}" },
  72: { value: "{sizes.72}" },
  80: { value: "{sizes.80}" },
  96: { value: "{sizes.96}" }
}, Xa = {
  none: {
    value: "1"
  },
  tighter: {
    value: "1em + 0.125rem"
  },
  tight: {
    value: "1em + 0.25rem"
  },
  default: {
    value: "1em + 0.5rem"
  },
  loose: {
    value: "1em + 0.75rem"
  },
  looser: {
    value: "1em + 0.875rem"
  }
}, Ya = {
  0: { value: "{sizes.0}" },
  1: { value: "{sizes.1}" },
  2: { value: "{sizes.2}" },
  4: { value: "{sizes.4}" },
  8: { value: "{sizes.8}" },
  16: { value: "{sizes.16}" },
  100: { value: "100%" }
}, qa = {
  low: {
    value: "0px 1px 1px {colors.utility.shadowColor}, 0px 2px 2px {colors.utility.shadowColor}"
  },
  medium: {
    value: "0px 2px 2px {colors.utility.shadowColor}, 0px 4px 4px {colors.utility.shadowColor}, 0px 8px 8px {colors.utility.shadowColor}"
  },
  high: {
    value: "0px 2px 2px {colors.utility.shadowColor}, 0px 4px 4px {colors.utility.shadowColor}, 0px 8px 8px {colors.utility.shadowColor}, 0px 16px 16px {colors.utility.shadowColor}"
  },
  inset: {
    value: "inset 0px 2px 1px {colors.utility.shadowColor}, inset 0px 3px 2px {colors.utility.shadowColor}"
  }
}, Ua = {
  0: { value: "{sizes.0}" },
  1: { value: "{sizes.1}" },
  2: { value: "{sizes.2}" },
  4: { value: "{sizes.4}" },
  8: { value: "{sizes.8}" },
  16: { value: "{sizes.16}" }
}, Ka = {
  none: {
    value: "none"
  }
}, Za = {
  square: {
    value: "1 / 1"
  },
  landscape: {
    value: "4 / 3"
  },
  portrait: {
    value: "3 / 4"
  },
  wide: {
    value: "16 / 9"
  },
  ultrawide: {
    value: "18 / 5"
  },
  golden: {
    value: "1.618 / 1"
  }
}, Ja = {
  default: {
    value: "cubic-bezier(0.4, 0, 0.2, 1)"
  },
  linear: {
    value: "linear"
  },
  in: {
    value: "cubic-bezier(0.4, 0, 1, 1)"
  },
  out: {
    value: "cubic-bezier(0, 0, 0.2, 1)"
  },
  "in-out": {
    value: "cubic-bezier(0.4, 0, 0.2, 1)"
  }
}, Qa = {
  fastest: {
    value: "50ms"
  },
  faster: {
    value: "100ms"
  },
  fast: {
    value: "150ms"
  },
  normal: {
    value: "200ms"
  },
  slow: {
    value: "300ms"
  },
  slower: {
    value: "400ms"
  },
  slowest: {
    value: "500ms"
  }
}, ae = {
  tighter: {
    value: "-0.05em"
  },
  tight: {
    value: "-0.025em"
  },
  normal: {
    value: "0em"
  },
  wide: {
    value: "0.025em"
  },
  wider: {
    value: "0.05em"
  },
  widest: {
    value: "0.1em"
  }
}, ee = {
  sm: {
    value: "4px"
  },
  base: {
    value: "8px"
  },
  md: {
    value: "12px"
  },
  lg: {
    value: "16px"
  },
  xl: {
    value: "24px"
  },
  "2xl": {
    value: "40px"
  },
  "3xl": {
    value: "64px"
  }
}, re = {
  spin: {
    value: "spin 1s linear infinite"
  },
  ping: {
    value: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite"
  },
  pulse: {
    value: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
  },
  bounce: {
    value: "bounce 1s infinite"
  }
}, oe = {
  spin: {
    to: {
      transform: "rotate(360deg)"
    }
  },
  ping: {
    "75%, 100%": {
      transform: "scale(2)",
      opacity: "0"
    }
  },
  pulse: {
    "50%": {
      opacity: ".5"
    }
  },
  bounce: {
    "0%, 100%": {
      transform: "translateY(-25%)",
      animationTimingFunction: "cubic-bezier(0.8,0,1,1)"
    },
    "50%": {
      transform: "none",
      animationTimingFunction: "cubic-bezier(0,0,0.2,1)"
    }
  }
}, b = {
  value: {
    fontFamily: "sans",
    fontWeight: "bold",
    color: { base: "gray.90", _dark: "gray.5" },
    lineHeight: "default"
  }
}, y = {
  value: {
    fontFamily: "serif",
    fontWeight: "normal",
    color: { base: "gray.60", _dark: "gray.20" },
    lineHeight: "default"
  }
}, k = {
  value: {
    fontFamily: "mono",
    fontWeight: "normal",
    color: { base: "gray.60", _dark: "gray.20" },
    lineHeight: "default"
  }
}, te = {
  display: {
    lg: {
      value: {
        ...b,
        fontSize: "72"
      }
    },
    md: {
      value: {
        ...b,
        fontSize: "64"
      }
    },
    sm: {
      value: {
        ...b,
        fontSize: "56"
      }
    },
    xs: {
      value: {
        ...b,
        fontSize: "48"
      }
    }
  },
  heading: {
    lg: {
      value: {
        ...b,
        fontSize: "40"
      }
    },
    md: {
      value: {
        ...b,
        fontSize: "32"
      }
    },
    sm: {
      value: {
        ...b,
        fontSize: "24"
      }
    },
    xs: {
      value: {
        ...b,
        fontSize: "20"
      }
    }
  },
  body: {
    lg: {
      value: {
        ...y,
        fontSize: "20"
      }
    },
    md: {
      value: {
        ...y,
        fontSize: "16"
      }
    },
    sm: {
      value: {
        ...y,
        fontSize: "14"
      }
    },
    xs: {
      value: {
        ...y,
        fontSize: "12"
      }
    }
  },
  mono: {
    lg: {
      value: {
        ...k,
        fontSize: "20"
      }
    },
    md: {
      value: {
        ...k,
        fontSize: "16"
      }
    },
    sm: {
      value: {
        ...k,
        fontSize: "14"
      }
    },
    xs: {
      value: {
        ...k,
        fontSize: "12"
      }
    }
  }
}, se = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  animations: re,
  aspectRatios: Za,
  blurs: ee,
  borderWidths: Ua,
  borders: Ka,
  breakpoints: Ga,
  colors: Ma,
  containerSizes: W,
  durations: Qa,
  easings: Ja,
  fontSizes: Ha,
  fontWeights: Oa,
  fonts: $a,
  keyframes: oe,
  letterSpacings: ae,
  lineHeights: Xa,
  numericSizes: T,
  radii: Ya,
  shadows: qa,
  sizes: _,
  textStyles: te,
  utilitySizes: I
}, Symbol.toStringTag, { value: "Module" })), ie = {
  success: {
    lighter: {
      value: {
        base: "{colors.green.2}",
        _dark: "{colors.green.5}"
      }
    },
    light: {
      value: {
        base: "{colors.green.10}",
        _dark: "{colors.green.20}"
      }
    },
    default: {
      value: {
        base: "{colors.green.40}",
        _dark: "{colors.green.30}"
      }
    },
    dark: {
      value: {
        base: "{colors.green.60}",
        _dark: "{colors.green.60}"
      }
    },
    darker: {
      value: {
        base: "{colors.green.70}",
        _dark: "{colors.green.70}"
      }
    }
  },
  warning: {
    lighter: {
      value: {
        base: "{colors.yellow.2}",
        _dark: "{colors.yellow.2}"
      }
    },
    light: {
      value: {
        base: "{colors.yellow.10}",
        _dark: "{colors.yellow.10}"
      }
    },
    default: {
      value: {
        base: "{colors.yellow.30}",
        _dark: "{colors.yellow.20}"
      }
    },
    dark: {
      value: {
        base: "{colors.yellow.60}",
        _dark: "{colors.yellow.60}"
      }
    },
    darker: {
      value: {
        base: "{colors.yellow.70}",
        _dark: "{colors.yellow.70}"
      }
    }
  },
  error: {
    lighter: {
      value: {
        base: "{colors.red.2}",
        _dark: "{colors.red.5}"
      }
    },
    light: {
      value: {
        base: "{colors.red.10}",
        _dark: "{colors.red.20}"
      }
    },
    default: {
      value: {
        base: "{colors.red.50}",
        _dark: "{colors.red.40}"
      }
    },
    dark: {
      value: {
        base: "{colors.red.60}",
        _dark: "{colors.red.60}"
      }
    },
    darker: {
      value: {
        base: "{colors.red.70}",
        _dark: "{colors.red.70}"
      }
    }
  },
  info: {
    lighter: {
      value: {
        base: "{colors.blue.2}",
        _dark: "{colors.blue.5}"
      }
    },
    light: {
      value: {
        base: "{colors.blue.10}",
        _dark: "{colors.blue.20}"
      }
    },
    default: {
      value: {
        base: "{colors.blue.50}",
        _dark: "{colors.blue.40}"
      }
    },
    dark: {
      value: {
        base: "{colors.blue.60}",
        _dark: "{colors.blue.60}"
      }
    },
    darker: {
      value: {
        base: "{colors.blue.70}",
        _dark: "{colors.blue.70}"
      }
    }
  },
  utility: {
    shadowColor: {
      value: {
        base: "{colors.gray.90/20}",
        _dark: "{colors.gray.100/40}"
      }
    },
    headingColor: {
      value: {
        base: "{colors.gray.90}",
        _dark: "{colors.gray.5}"
      }
    },
    textColor: {
      value: {
        base: "{colors.gray.60}",
        _dark: "{colors.gray.30}"
      }
    },
    borderColor: {
      value: {
        base: "{colors.gray.10}",
        _dark: "{colors.gray.60}"
      }
    }
  }
}, ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: ie
}, Symbol.toStringTag, { value: "Module" })), le = {
  hover: "&:is(:hover, [data-hover])",
  focus: "&:is(:focus, [data-focus])",
  focusWithin: "&:focus-within",
  focusVisible: "&:is(:focus-visible, [data-focus-visible])",
  disabled: "&:is(:disabled, [disabled], [data-disabled], [aria-disabled=true])",
  active: "&:is(:active, [data-active])",
  visited: "&:visited",
  target: "&:target",
  readOnly: "&:is(:read-only, [data-read-only], [aria-readonly=true])",
  readWrite: "&:read-write",
  empty: "&:is(:empty, [data-empty])",
  checked: '&:is(:checked, [data-checked], [aria-checked=true], [data-state="checked"])',
  enabled: "&:enabled",
  expanded: '&:is([aria-expanded=true], [data-expanded], [data-state="expanded"])',
  highlighted: "&[data-highlighted]",
  complete: "&[data-complete]",
  incomplete: "&[data-incomplete]",
  dragging: "&[data-dragging]",
  before: "&::before",
  after: "&::after",
  firstLetter: "&::first-letter",
  firstLine: "&::first-line",
  marker: "&::marker, &::-webkit-details-marker",
  selection: "&::selection",
  file: "&::file-selector-button",
  backdrop: "&::backdrop",
  first: "&:first-child",
  last: "&:last-child",
  only: "&:only-child",
  even: "&:nth-child(even)",
  odd: "&:nth-child(odd)",
  firstOfType: "&:first-of-type",
  lastOfType: "&:last-of-type",
  onlyOfType: "&:only-of-type",
  peerFocus: ".peer:is(:focus, [data-focus]) ~ &",
  peerHover: ".peer:is(:hover, [data-hover]) ~ &",
  peerActive: ".peer:is(:active, [data-active]) ~ &",
  peerFocusWithin: ".peer:focus-within ~ &",
  peerFocusVisible: ".peer:is(:focus-visible, [data-focus-visible]) ~ &",
  peerDisabled: ".peer:is(:disabled, [disabled], [data-disabled], [aria-disabled=true]) ~ &",
  peerChecked: '.peer:is(:checked, [data-checked], [aria-checked=true], [data-state="checked"]) ~ &',
  peerInvalid: ".peer:is(:invalid, [data-invalid], [aria-invalid=true]) ~ &",
  peerExpanded: '.peer:is([aria-expanded=true], [data-expanded], [data-state="expanded"]) ~ &',
  peerPlaceholderShown: ".peer:placeholder-shown ~ &",
  groupFocus: ".group:is(:focus, [data-focus]) &",
  groupHover: ".group:is(:hover, [data-hover]) &",
  groupActive: ".group:is(:active, [data-active]) &",
  groupFocusWithin: ".group:focus-within &",
  groupFocusVisible: ".group:is(:focus-visible, [data-focus-visible]) &",
  groupDisabled: ".group:is(:disabled, [disabled], [data-disabled], [aria-disabled=true]) &",
  groupChecked: '.group:is(:checked, [data-checked], [aria-checked=true], [data-state="checked"]) &',
  groupExpanded: '.group:is([aria-expanded=true], [data-expanded], [data-state="expanded"]) &',
  groupInvalid: ".group:is(:invalid, [data-invalid], [aria-invalid=true]) &",
  indeterminate: '&:is(:indeterminate, [data-indeterminate], [aria-checked=mixed], [data-state="indeterminate"])',
  required: "&:is(:required, [data-required], [aria-required=true])",
  valid: "&:is(:valid, [data-valid])",
  invalid: "&:is(:invalid, [data-invalid], [aria-invalid=true])",
  autofill: "&:autofill",
  inRange: "&:is(:in-range, [data-in-range])",
  outOfRange: "&:is(:out-of-range, [data-outside-range])",
  placeholder: "&::placeholder, &[data-placeholder]",
  placeholderShown: "&:is(:placeholder-shown, [data-placeholder-shown])",
  pressed: "&:is([aria-pressed=true], [data-pressed])",
  selected: "&:is([aria-selected=true], [data-selected])",
  grabbed: "&:is([aria-grabbed=true], [data-grabbed])",
  underValue: "&[data-state=under-value]",
  overValue: "&[data-state=over-value]",
  atValue: "&[data-state=at-value]",
  default: "&:default",
  optional: "&:optional",
  open: '&:is([open], [data-open], [data-state="open"], :popover-open)',
  closed: '&:is([closed], [data-closed], [data-state="closed"])',
  fullscreen: "&:is(:fullscreen, [data-fullscreen])",
  loading: "&:is([data-loading], [aria-busy=true])",
  hidden: "&:is([hidden], [data-hidden])",
  current: "&:is([aria-current=true], [data-current])",
  currentPage: "&[aria-current=page]",
  currentStep: "&[aria-current=step]",
  today: "&[data-today]",
  unavailable: "&[data-unavailable]",
  rangeStart: "&[data-range-start]",
  rangeEnd: "&[data-range-end]",
  now: "&[data-now]",
  topmost: "&[data-topmost]",
  motionReduce: "@media (prefers-reduced-motion: reduce)",
  motionSafe: "@media (prefers-reduced-motion: no-preference)",
  print: "@media print",
  landscape: "@media (orientation: landscape)",
  portrait: "@media (orientation: portrait)",
  dark: ".dark &",
  light: ".light &",
  osDark: "@media (prefers-color-scheme: dark)",
  osLight: "@media (prefers-color-scheme: light)",
  highContrast: "@media (forced-colors: active)",
  lessContrast: "@media (prefers-contrast: less)",
  moreContrast: "@media (prefers-contrast: more)",
  ltr: ":where([dir=ltr], :dir(ltr)) &",
  rtl: ":where([dir=rtl], :dir(rtl)) &",
  scrollbar: "&::-webkit-scrollbar",
  scrollbarThumb: "&::-webkit-scrollbar-thumb",
  scrollbarTrack: "&::-webkit-scrollbar-track",
  horizontal: "&[data-orientation=horizontal]",
  vertical: "&[data-orientation=vertical]",
  icon: "& :where(svg)",
  starting: "@starting-style",
  noscript: "@media (scripting: none)",
  invertedColors: "@media (inverted-colors: inverted)"
}, de = {
  "*, *::before, *::after": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    _focusVisible: {
      outlineColor: { base: "gray.80", _dark: "gray.5" }
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
      pointerEvents: "none"
    }
  },
  html: {
    fontSize: "16",
    lineHeight: "calc(1em + 0.5rem)",
    "-webkit-text-size-adjust": "100%",
    tabSize: "4"
  },
  body: {
    fontFamily: "body",
    bg: { base: "gray.0", _dark: "gray.90" },
    color: { base: "gray.60", _dark: "gray.20" },
    fontWeight: "normal"
  },
  "h1, h2, h3, h4, h5, h6": {
    color: { base: "gray.90", _dark: "gray.5" },
    fontWeight: "black",
    lineHeight: "calc(1em + 0.5rem)"
  },
  p: {
    marginBottom: "0.5rem"
  },
  "b, strong": {
    fontWeight: "bolder"
  },
  "i, em": {
    fontStyle: "italic"
  },
  u: {
    textDecoration: "underline"
  },
  "code, kbd, samp, pre": {
    fontFamily: "mono",
    fontSize: "1em"
  },
  table: {
    borderColor: "currentcolor"
  },
  "button, input, optgroup, select, textarea": {
    fontFamily: "inherit",
    fontSize: "100%",
    lineHeight: "calc(1em + 0.5rem)",
    margin: "0"
  },
  'button, [type="button"], [type="reset"], [type="submit"]': {
    "-webkit-appearance": "button"
  },
  legend: {
    padding: "0"
  },
  progress: {
    verticalAlign: "baseline"
  },
  "::-webkit-inner-spin-button, ::-webkit-outer-spin-button": {
    height: "auto"
  },
  '[type="search"]': {
    "-webkit-appearance": "textfield",
    outlineOffset: "-2px"
  },
  "::-webkit-search-decoration": {
    "-webkit-appearance": "none"
  },
  "::-webkit-file-upload-button": {
    "-webkit-appearance": "button",
    font: "inherit"
  },
  summary: {
    display: "list-item"
  }
}, D = {
  position: "relative",
  appearance: "none",
  minWidth: 0,
  transitionDuration: "fast",
  transitionProperty: "background, border-color, color, box-shadow",
  transitionTimingFunction: "default",
  userSelect: "none",
  verticalAlign: "middle",
  display: "flex",
  alignItems: "center",
  gap: 4,
  fontFamily: "sans",
  fontSize: 16,
  fontWeight: "medium",
  lineHeight: "default",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "transparent",
  borderRadius: 4,
  outlineWidth: 2,
  outlineStyle: "solid",
  outlineColor: "transparent",
  outlineOffset: 1,
  textDecoration: "none",
  whiteSpace: "nowrap",
  cursor: "pointer",
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  },
  _focusVisible: {
    outlineColor: { base: "gray.80", _dark: "gray.5" }
  },
  "& svg": {
    fill: "current"
  }
}, P = {
  variant: {
    primary: {
      bg: { base: "gray.90", _dark: "gray.5" },
      color: { base: "gray.5", _dark: "gray.90" },
      _hover: {
        bg: { base: "gray.70", _dark: "gray.20" }
      },
      _active: {
        bg: { base: "gray.100", _dark: "gray.30" },
        borderColor: "transparent"
      },
      _disabled: {
        _hover: {
          bg: { base: "gray.90", _dark: "gray.5" }
        }
      },
      _selected: {
        bg: { base: "gray.5", _dark: "gray.90" },
        color: { base: "gray.90", _dark: "gray.5" },
        borderColor: "transparent"
      }
    },
    standard: {
      bg: { base: "gray.5", _dark: "gray.70" },
      color: { base: "gray.90", _dark: "gray.5" },
      _hover: {
        bg: { base: "gray.10", _dark: "gray.60" }
      },
      _active: {
        bg: { base: "gray.20", _dark: "gray.80" },
        borderColor: "transparent"
      },
      _disabled: {
        _hover: {
          bg: { base: "gray.5", _dark: "gray.70" }
        }
      },
      _selected: {
        bg: { base: "gray.90", _dark: "gray.5" },
        color: { base: "gray.5", _dark: "gray.90" },
        borderColor: "transparent"
      }
    },
    hollow: {
      bg: "transparent",
      borderColor: { base: "gray.30", _dark: "gray.60" },
      color: { base: "gray.90", _dark: "gray.5" },
      _hover: {
        bg: { base: "gray.10", _dark: "gray.60" },
        borderColor: { base: "gray.10", _dark: "gray.60" }
      },
      _active: {
        bg: { base: "gray.20", _dark: "gray.70" },
        borderColor: { base: "gray.20", _dark: "gray.70" }
      },
      _disabled: {
        _hover: {
          bg: "transparent"
        }
      },
      _selected: {
        bg: { base: "gray.90", _dark: "gray.5" },
        color: { base: "gray.5", _dark: "gray.90" },
        borderColor: "transparent"
      }
    },
    ghost: {
      bg: "transparent",
      color: { base: "gray.90", _dark: "gray.5" },
      _hover: {
        bg: { base: "gray.10", _dark: "gray.60" }
      },
      _active: {
        bg: { base: "gray.20", _dark: "gray.70" },
        borderColor: "transparent"
      },
      _disabled: {
        _hover: {
          bg: "transparent"
        }
      },
      _selected: {
        bg: { base: "gray.90", _dark: "gray.5" },
        color: { base: "gray.5", _dark: "gray.90" },
        borderColor: "transparent"
      }
    },
    cta: {
      bg: { base: "blue.50", _dark: "blue.50" },
      color: { base: "gray.5", _dark: "gray.5" },
      _hover: {
        bg: { base: "blue.40", _dark: "blue.40" }
      },
      _active: {
        bg: { base: "blue.60", _dark: "blue.60" },
        borderColor: "transparent"
      },
      _disabled: {
        _hover: {
          bg: { base: "blue.50", _dark: "blue.50" }
        }
      }
    },
    danger: {
      bg: { base: "red.50", _dark: "red.50" },
      color: { base: "gray.0", _dark: "gray.0" },
      _hover: {
        bg: { base: "red.40", _dark: "red.40" }
      },
      _active: {
        bg: { base: "red.60", _dark: "red.60" },
        borderColor: "transparent"
      },
      _disabled: {
        _hover: {
          bg: { base: "red.50", _dark: "red.50" }
        }
      }
    }
  }
}, ce = {
  className: "button",
  jsx: ["Button"],
  base: D,
  variants: {
    ...P,
    size: {
      standard: {
        fontSize: "16",
        py: "3",
        px: "12"
      },
      large: {
        fontSize: "16",
        py: "7",
        px: "14"
      },
      small: {
        fontSize: "14",
        py: "1",
        px: "8"
      }
    }
  },
  defaultVariants: {
    variant: "standard",
    size: "standard"
  }
}, ue = {
  className: "icon-button",
  jsx: ["IconButton"],
  base: D,
  variants: {
    ...P,
    size: {
      standard: {
        fontSize: "16",
        p: "3"
      },
      large: {
        fontSize: "16",
        p: "7"
      },
      small: {
        fontSize: "14",
        p: "1"
      }
    }
  },
  defaultVariants: {
    variant: "standard",
    size: "standard"
  }
}, pe = {
  className: "badge",
  jsx: ["Badge"],
  staticCss: [{ size: ["sm", "md", "lg"] }],
  base: {
    alignItems: "center",
    borderRadius: "full",
    colorPalette: "accent",
    display: "inline-flex",
    fontWeight: "medium",
    userSelect: "none",
    whiteSpace: "nowrap"
  },
  defaultVariants: {
    variant: "subtle",
    size: "md"
  },
  variants: {
    variant: {
      solid: {
        background: "colorPalette.default",
        color: "colorPalette.fg"
      },
      subtle: {
        background: "bg.subtle",
        borderColor: "border.subtle",
        borderWidth: "1px",
        color: "fg.default",
        "& svg": {
          color: "fg.muted"
        }
      },
      outline: {
        color: "fg.default",
        borderWidth: "2px",
        borderColor: "border.default"
      }
    },
    size: {
      sm: {
        textStyle: "xs",
        px: "2",
        h: "5",
        gap: "1",
        "& svg": {
          width: "3",
          height: "3"
        }
      },
      md: {
        textStyle: "xs",
        px: "2.5",
        h: "6",
        gap: "1.5",
        "& svg": {
          width: "4",
          height: "4"
        }
      },
      lg: {
        textStyle: "sm",
        px: "3",
        h: "7",
        gap: "1.5",
        "& svg": {
          width: "4",
          height: "4"
        }
      }
    }
  }
}, ge = {
  className: "textarea",
  jsx: ["Textarea"],
  base: {
    position: "relative",
    display: "inline-grid",
    verticalAlign: "top",
    alignItems: "center",
    padding: "0",
    fontFamily: "sans",
    fontSize: "16",
    fontWeight: "normal",
    lineHeight: "normal",
    color: { base: "gray.90", _osDark: "gray.5" },
    borderRadius: "8",
    // transitionDuration: 'fast',
    // transitionProperty: 'background, border-color, color, box-shadow',
    // transitionTimingFunction: 'default',
    "&::after, & textarea": {
      width: "auto",
      minWidth: "16",
      maxWidth: "full",
      font: "inherit",
      py: "4",
      px: "8",
      m: "0",
      resize: "none",
      appearance: "none",
      borderWidth: "1",
      borderStyle: "solid",
      borderRadius: "4",
      borderColor: "transparent"
    },
    _after: {
      content: 'attr(data-value) " "',
      // visibility: 'hidden',
      outline: "1px solid olive",
      whiteSpace: "pre-wrap",
      transform: "translate(4px, 4px)",
      opacity: "0.3"
    },
    "& textarea": {
      // _disabled: {
      //   opacity: 0.4,
      //   cursor: 'not-allowed',
      // },
      // _invalid: {
      //   borderColor: 'red.50',
      //   _focus: {
      //     borderColor: 'red.50',
      //   },
      // },
      // _placeholder: {
      //   color: { base: 'gray.50', _osDark: 'gray.60' },
      //   opacity: 'full',
      // },
    }
  },
  defaultVariants: {
    stacked: !0,
    internalLabel: !1,
    autoGrow: !1
  },
  compoundVariants: [],
  variants: {
    autoGrow: {
      false: {
        width: "full"
      },
      true: {
        width: "fit-content"
      }
    },
    stacked: {
      true: {
        gridTemplateRows: "auto 1fr",
        alignItems: "stretch",
        "&::after, & textarea": {
          gridArea: "2 / 1"
        },
        "& textarea": {
          background: { base: "gray.0", _osDark: "gray.90" },
          borderColor: { base: "gray.40", _osDark: "gray.50" }
          // _hover: {
          //   borderColor: { base: 'gray.20', _osDark: 'gray.30' },
          // },
          // _focus: {
          //   borderColor: { base: 'gray.90', _osDark: 'gray.5' },
          // },
        }
      },
      false: {
        gridTemplateColumns: "auto 1fr",
        alignItems: "center",
        "& textarea": {
          background: { base: "gray.0", _osDark: "gray.90" },
          borderColor: { base: "green.40", _osDark: "green.50" }
          // _hover: {
          //   borderColor: { base: 'gray.20', _osDark: 'gray.30' },
          // },
          // _focus: {
          //   borderColor: { base: 'gray.90', _osDark: 'gray.5' },
          // },
        }
      }
    },
    internalLabel: {
      false: {},
      true: {
        // _focusWithin: {
        //   outlineWidth: 1,
        //   outlineStyle: 'solid',
        //   outlineColor: { base: 'gray.90', _osDark: 'gray.5' },
        //   // outlineOffset: 2,
        //   ml: '-4',
        // },
      }
    }
  }
}, me = {
  margin: "0",
  lineHeight: "default",
  fontWeight: "normal",
  fontSize: "16",
  color: { base: "gray.70", _dark: "gray.20" }
}, C = {
  family: {
    sans: { fontFamily: "sans" },
    serif: { fontFamily: "serif" },
    mono: { fontFamily: "mono" }
  },
  bold: {
    true: {
      fontWeight: "bold"
    }
  },
  italic: {
    true: {
      fontStyle: "italic"
    }
  },
  underline: {
    true: {
      textDecoration: "underline"
    }
  }
}, be = {
  fontFamily: "heading",
  fontWeight: "black",
  color: { base: "gray.90", _dark: "gray.5" },
  lineHeight: "default"
}, ve = {
  level: {
    h1: { textStyle: "heading.lg" },
    h2: { textStyle: "heading.md" },
    h3: { textStyle: "heading.sm" },
    h4: { textStyle: "heading.xs" }
  }
}, fe = {
  display: "inline-flex",
  alignItems: "center",
  fontWeight: "medium",
  gap: "1",
  color: { base: "blue.50", _dark: "blue.40" },
  textDecoration: "none",
  backgroundImage: "linear-gradient(90deg, transparent 0% 100%)",
  backgroundSize: "100% 1px",
  backgroundRepeat: "no-repeat",
  backgroundPositionY: "100%",
  width: "fit-content",
  cursor: "pointer",
  _hover: {
    color: { base: "blue.40", _dark: "blue.30" },
    backgroundImage: "linear-gradient(90deg, currentColor 0% 100%)"
  }
}, he = {
  ...C,
  _disabled: {
    true: {
      cursor: "not-allowed",
      opacity: 0.7,
      pointerEvents: "none"
    }
  }
}, ye = {
  fontSize: "14",
  fontWeight: "normal",
  lineHeight: "normal",
  cursor: "default"
}, ke = {
  ...C,
  _disabled: {
    true: {
      cursor: "not-allowed",
      opacity: 0.7,
      pointerEvents: "none"
    }
  }
}, xe = {
  className: "text",
  jsx: ["Text"],
  base: me,
  variants: C,
  defaultVariants: {
    family: "sans"
  }
}, Ne = {
  className: "heading",
  jsx: ["Heading"],
  base: be,
  variants: ve,
  defaultVariants: {
    level: "h2"
  }
}, Se = {
  className: "link",
  jsx: ["Link"],
  base: fe,
  variants: he,
  defaultVariants: {
    family: "sans"
  }
}, we = {
  className: "label",
  jsx: ["Label"],
  base: ye,
  variants: ke,
  defaultVariants: {
    family: "sans"
  }
}, _e = {
  display: "flex",
  alignItems: "start"
}, Ce = {
  className: "checkbox-input",
  jsx: ["CheckboxInput"],
  base: _e
}, Be = {
  display: "flex"
}, Fe = {
  className: "radio-input",
  jsx: ["RadioInput"],
  base: Be,
  variants: {}
}, Re = {
  container: {
    position: "relative",
    w: "40",
    h: "24",
    cursor: "pointer",
    _disabled: {
      opacity: 0.4,
      pointerEvents: "none",
      cursor: "none",
      display: "inline-grid"
    }
  },
  background: {
    position: "absolute",
    w: "40",
    h: "24",
    rounded: "24",
    bg: { base: "gray.0", _dark: "gray.90" },
    transitionProperty: "border-color, background-color",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease-in-out",
    borderWidth: "2",
    borderStyle: "solid",
    borderColor: { base: "gray.20", _dark: "gray.40" }
  },
  input: {
    position: "absolute",
    opacity: 0,
    w: "40",
    h: "24",
    rounded: "24",
    m: 0,
    p: 0,
    border: "none",
    zIndex: 0,
    cursor: "inherit",
    "& ~ [name='circle']": {
      display: "inline-grid",
      position: "absolute",
      opacity: 1,
      transform: "translateX(0)",
      transitionProperty: "transform, opacity",
      transitionDuration: "200ms",
      transitionTimingFunction: "ease-in-out"
    },
    "& ~ [name='circle-check']": {
      display: "inline-grid",
      position: "absolute",
      filter: { base: "invert(100%)", _dark: "invert(0%)" },
      opacity: 0,
      transform: "translateX(0)",
      transitionProperty: "transform, opacity",
      transitionDuration: "200ms",
      transitionTimingFunction: "ease-in-out"
    },
    _checked: {
      "& ~ [name='circle']": {
        opacity: 0,
        transform: "translateX(10px)"
      },
      "& ~ [name='circle-check']": {
        opacity: 1,
        transform: "translateX(16px)"
      },
      "& ~ [name='toggle-bg']": {
        bg: { base: "gray.90", _dark: "gray.0" },
        borderColor: { base: "gray.90", _dark: "gray.0" }
      }
    },
    _error: {
      "& ~ [name='toggle-bg']": {
        borderColor: "error.default"
      }
    },
    _focusVisible: {
      appearance: "none",
      opacity: 1,
      outlineColor: { base: "gray.80", _dark: "gray.5" },
      outlineOffset: 1,
      outlineWidth: 2,
      outlineStyle: "solid",
      rounded: "24",
      w: "40",
      h: "24"
    }
  },
  indicator: {
    display: "none",
    w: "24",
    h: "24",
    transitionProperty: "border-color, background-color",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease-in-out",
    "&:is([name='circle'])": {
      fill: { base: "gray.20", _dark: "gray.40" }
    }
  }
}, ze = {
  className: "toggle",
  jsx: ["toggle"],
  slots: ["container", "input", "indicator", "background"],
  base: Re
}, Ee = {
  display: "grid",
  gap: "8",
  gridTemplateColumns: "40px auto",
  userSelect: "none"
}, Te = {
  className: "toggle-input",
  jsx: ["ToggleInput"],
  base: Ee,
  variants: {}
}, We = {
  aspectRatio: "square",
  rounded: "100",
  borderWidth: "3",
  borderStyle: "solid",
  borderColor: "transparent",
  borderTopColor: "gray.90",
  borderBottomColor: "gray.90",
  animation: "spin",
  filter: "invert(1)",
  mixBlendMode: "difference",
  isolation: "isolate"
}, Ie = {
  size: {
    standard: {
      height: "20",
      minHeight: "20"
    },
    small: {
      height: "16",
      minHeight: "16"
    },
    large: {
      height: "32",
      minHeight: "32"
    }
  }
}, De = {
  className: "spinner",
  jsx: ["Spinner"],
  base: We,
  variants: Ie,
  defaultVariants: {
    size: "standard"
  }
}, Pe = {
  "--divider-weight": "sizes.1",
  borderStyle: "solid",
  color: { base: "gray.20", _dark: "gray.80" },
  borderColor: "current",
  minWidth: "1",
  minHeight: "1"
}, Ve = {
  direction: {
    horizontal: {
      width: "full",
      borderTopWidth: "var(--divider-weight)"
    },
    vertical: {
      height: "full",
      borderLeftWidth: "var(--divider-weight)"
    }
  },
  weight: {
    thin: { "--divider-weight": "sizes.1" },
    medium: { "--divider-weight": "sizes.2" },
    thick: { "--divider-weight": "sizes.4" },
    thicker: { "--divider-weight": "sizes.6" }
  }
}, je = {
  className: "divider",
  jsx: ["Divider"],
  base: Pe,
  variants: Ve,
  defaultVariants: {
    direction: "horizontal",
    weight: "thin"
  }
}, Ae = {
  bg: "gray.80",
  position: "relative",
  overflow: "auto",
  p: "4",
  whiteSpace: "pre",
  fontSize: "14"
}, Le = {
  borderRadius: "8",
  overflow: "hidden",
  borderWidth: "0",
  borderColor: "gray.60",
  bg: "gray.80",
  color: "gray.5",
  px: "16",
  py: "8",
  my: "8",
  whiteSpace: "pre"
}, Me = {
  className: "code",
  jsx: ["Code"],
  base: Ae
}, $e = {
  className: "pre",
  jsx: ["Pre"],
  base: Le
}, Oe = {}, Ge = {}, He = {
  className: "box",
  jsx: ["Box"],
  base: Oe,
  variants: Ge,
  defaultVariants: {}
}, Xe = {
  size: {
    medium: {
      py: 3,
      px: 10,
      fontSize: "16"
    },
    small: {
      py: 0,
      px: 8,
      fontSize: "14"
    },
    large: {
      py: 7,
      px: 12,
      fontSize: "16"
    }
  },
  autoSize: {
    true: {
      fieldSizing: "content"
    }
  }
}, Ye = {
  position: "relative",
  width: "full",
  borderWidth: "1",
  borderColor: "gray.30",
  borderStyle: "solid",
  borderRadius: "4",
  lineHeight: "default",
  fontFamily: "body",
  outlineWidth: "1",
  outlineStyle: "solid",
  outlineColor: "transparent",
  color: {
    base: "gray.90",
    _dark: "gray.0"
  },
  _placeholder: {
    color: {
      base: "gray.50",
      _dark: "gray.40"
    }
  },
  _disabled: {
    opacity: 0.4
  },
  _focus: {
    outlineColor: { base: "gray.90", _dark: "gray.0" },
    borderColor: { base: "gray.90", _dark: "gray.0" }
  },
  _error: {
    display: "inline-grid",
    borderColor: "error.default",
    _focus: {
      borderColor: { base: "error.default", _dark: "error.default" },
      outlineColor: { base: "error.default", _dark: "error.default" }
    }
  }
}, qe = {
  className: "textinput",
  jsx: ["TextInput"],
  base: Ye,
  variants: Xe,
  defaultVariants: {
    size: "medium"
  }
}, Ue = {
  bg: { base: "gray.0", _dark: "gray.80" },
  borderRadius: "4",
  outlineWidth: "1",
  outlineStyle: "solid",
  outlineColor: "transparent",
  outlineOffset: "0"
}, Ke = {
  variant: {
    default: {
      boxShadow: "low",
      borderWidth: "1",
      borderColor: "transparent",
      _hover: {
        boxShadow: "medium"
      },
      _active: {
        boxShadow: "inset",
        _grabbed: {
          boxShadow: "high",
          cursor: "grabbing"
        }
      },
      _focusVisible: {
        boxShadow: "none",
        borderWidth: "1",
        outlineColor: { base: "gray.90", _dark: "gray.0" },
        borderColor: { base: "gray.90", _dark: "gray.0" }
      },
      _disabled: {
        opacity: "0.4",
        _hover: {
          boxShadow: "low"
        },
        _active: {
          boxShadow: "low"
        }
      }
    },
    flat: {
      borderWidth: "1",
      borderStyle: "solid",
      borderColor: { base: "gray.10", _dark: "gray.70" },
      _hover: {
        borderColor: { base: "gray.30", _dark: "gray.50" }
      },
      _active: {
        borderColor: { base: "gray.50", _dark: "gray.30" },
        _grabbed: {
          boxShadow: "high",
          cursor: "grabbing"
        }
      },
      _focusVisible: {
        boxShadow: "none",
        outlineColor: { base: "gray.90", _dark: "gray.0" },
        borderColor: { base: "gray.90", _dark: "gray.0" }
      },
      _disabled: {
        opacity: "0.4",
        _hover: {
          borderColor: { base: "gray.10", _dark: "gray.70" }
        },
        _active: {
          borderColor: { base: "gray.10", _dark: "gray.70" }
        }
      }
    }
  }
}, Ze = {
  className: "card",
  jsx: ["Card"],
  base: Ue,
  variants: Ke,
  defaultVariants: {
    variant: "default"
  }
}, Je = {
  display: "flex",
  alignItems: "center",
  "& li": {
    display: "flex",
    alignItems: "center"
  },
  "& a": {
    color: { base: "gray.60", _dark: "gray.60" },
    _focusVisible: {
      color: "blue.50"
    }
  },
  "& p": {
    color: { base: "gray.90", _dark: "gray.0" }
  },
  "& span": {
    mx: "6",
    color: "gray.20"
  }
}, Qe = {
  className: "breadcrumbs",
  jsx: ["Breadcrumbs"],
  base: Je
}, ar = {
  display: "flex",
  py: "0",
  borderRadius: "2",
  gap: "1",
  //   h: '20',
  px: "4",
  fontSize: "14",
  fontWeight: "500"
  //   lineHeight: 'none',
}, er = {
  variant: {
    default: {},
    bold: {}
  },
  hue: {
    slate: {},
    tan: {},
    red: {},
    tomato: {},
    orange: {},
    yellow: {},
    green: {},
    grass: {},
    mint: {},
    cyan: {},
    blue: {},
    indigo: {},
    purple: {},
    violet: {},
    pink: {},
    rose: {},
    magenta: {}
  },
  iconPosition: {
    left: {
      flexDirection: "row",
      gap: "1",
      pl: "1"
    },
    right: {
      flexDirection: "row-reverse",
      gap: "1",
      pr: "1"
    }
  },
  hasIcon: {
    true: {},
    false: {
      px: 4
    }
  }
}, rr = {
  className: "tag",
  jsx: ["Tag"],
  base: ar,
  variants: er,
  defaultVariants: {
    variant: "default",
    hue: "slate",
    iconPosition: "left",
    hasIcon: !1
  },
  compoundVariants: [
    {
      hue: "slate",
      variant: "default",
      css: {
        color: { base: "gray.70", _dark: "gray.20" },
        bg: { base: "gray.10", _dark: "gray.70" }
      }
    },
    {
      hue: "slate",
      variant: "bold",
      css: {
        color: { base: "gray.0", _dark: "gray.80" },
        bg: { base: "gray.50", _dark: "gray.20" }
      }
    },
    {
      hue: "tan",
      variant: "default",
      css: {
        color: { base: "tan.70", _dark: "tan.20" },
        bg: { base: "tan.10", _dark: "tan.70" }
      }
    },
    {
      hue: "tan",
      variant: "bold",
      css: {
        color: { base: "gray.0", _dark: "tan.80" },
        bg: { base: "tan.50", _dark: "tan.20" }
      }
    },
    {
      hue: "red",
      variant: "default",
      css: {
        color: { base: "red.70", _dark: "red.10" },
        bg: { base: "red.10", _dark: "red.70" }
      }
    },
    {
      hue: "red",
      variant: "bold",
      css: {
        color: { base: "gray.0", _dark: "red.80" },
        bg: { base: "red.50", _dark: "red.20" }
      }
    },
    {
      hue: "tomato",
      variant: "default",
      css: {
        color: { base: "tomato.70", _dark: "tomato.20" },
        bg: { base: "tomato.10", _dark: "tomato.70" }
      }
    },
    {
      hue: "tomato",
      variant: "bold",
      css: {
        color: { base: "gray.0", _dark: "tomato.80" },
        bg: { base: "tomato.50", _dark: "tomato.20" }
      }
    },
    {
      hue: "orange",
      variant: "default",
      css: {
        color: { base: "orange.70", _dark: "orange.20" },
        bg: { base: "orange.10", _dark: "orange.70" }
      }
    },
    {
      hue: "orange",
      variant: "bold",
      css: {
        color: { base: "orange.5", _dark: "orange.80" },
        bg: { base: "orange.60", _dark: "orange.20" }
      }
    },
    {
      hue: "yellow",
      variant: "default",
      css: {
        color: { base: "yellow.60", _dark: "yellow.10" },
        bg: { base: "yellow.10", _dark: "yellow.60" }
      }
    },
    {
      hue: "yellow",
      variant: "bold",
      css: {
        color: { base: "yellow.70", _dark: "yellow.90" },
        bg: { base: "yellow.20", _dark: "yellow.20" }
      }
    },
    {
      hue: "green",
      variant: "default",
      css: {
        color: { base: "green.70", _dark: "green.20" },
        bg: { base: "green.10", _dark: "green.70" }
      }
    },
    {
      hue: "green",
      variant: "bold",
      css: {
        color: { base: "gray.0", _dark: "green.80" },
        bg: { base: "green.50", _dark: "green.20" }
      }
    },
    {
      hue: "grass",
      variant: "default",
      css: {
        color: { base: "grass.70", _dark: "grass.10" },
        bg: { base: "grass.10", _dark: "grass.70" }
      }
    },
    {
      hue: "grass",
      variant: "bold",
      css: {
        color: { base: "gray.0", _dark: "grass.80" },
        bg: { base: "grass.60", _dark: "grass.20" }
      }
    },
    {
      hue: "mint",
      variant: "default",
      css: {
        color: { base: "mint.80", _dark: "mint.30" },
        bg: { base: "mint.10", _dark: "mint.80" }
      }
    },
    {
      hue: "mint",
      variant: "bold",
      css: {
        color: { base: "gray.0", _dark: "mint.80" },
        bg: { base: "mint.70", _dark: "mint.20" }
      }
    },
    {
      hue: "cyan",
      variant: "default",
      css: {
        color: { base: "cyan.70", _dark: "cyan.20" },
        bg: { base: "cyan.10", _dark: "cyan.70" }
      }
    },
    {
      hue: "cyan",
      variant: "bold",
      css: {
        color: { base: "cyan.5", _dark: "cyan.80" },
        bg: { base: "cyan.60", _dark: "cyan.30" }
      }
    },
    {
      hue: "blue",
      variant: "default",
      css: {
        color: { base: "blue.70", _dark: "blue.20" },
        bg: { base: "blue.10", _dark: "blue.70" }
      }
    },
    {
      hue: "blue",
      variant: "bold",
      css: {
        color: { base: "gray.0", _dark: "blue.90" },
        bg: { base: "blue.50", _dark: "blue.40" }
      }
    },
    {
      hue: "indigo",
      variant: "default",
      css: {
        color: { base: "indigo.70", _dark: "indigo.10" },
        bg: { base: "indigo.10", _dark: "indigo.70" }
      }
    },
    {
      hue: "indigo",
      variant: "bold",
      css: {
        color: { base: "indigo.5", _dark: "indigo.80" },
        bg: { base: "indigo.50", _dark: "indigo.20" }
      }
    },
    {
      hue: "purple",
      variant: "default",
      css: {
        color: { base: "purple.70", _dark: "purple.20" },
        bg: { base: "purple.10", _dark: "purple.70" }
      }
    },
    {
      hue: "purple",
      variant: "bold",
      css: {
        color: { base: "gray.0", _dark: "purple.80" },
        bg: { base: "purple.50", _dark: "purple.20" }
      }
    },
    {
      hue: "violet",
      variant: "default",
      css: {
        color: { base: "violet.70", _dark: "violet.10" },
        bg: { base: "violet.10", _dark: "violet.70" }
      }
    },
    {
      hue: "violet",
      variant: "bold",
      css: {
        color: { base: "violet.5", _dark: "violet.80" },
        bg: { base: "violet.60", _dark: "violet.20" }
      }
    },
    {
      hue: "pink",
      variant: "default",
      css: {
        color: { base: "pink.70", _dark: "pink.10" },
        bg: { base: "pink.10", _dark: "pink.70" }
      }
    },
    {
      hue: "pink",
      variant: "bold",
      css: {
        color: { base: "pink.5", _dark: "pink.80" },
        bg: { base: "pink.70", _dark: "pink.20" }
      }
    },
    {
      hue: "rose",
      variant: "default",
      css: {
        color: { base: "rose.70", _dark: "rose.10" },
        bg: { base: "rose.10", _dark: "rose.70" }
      }
    },
    {
      hue: "rose",
      variant: "bold",
      css: {
        color: { base: "rose.5", _dark: "rose.80" },
        bg: { base: "rose.60", _dark: "rose.20" }
      }
    },
    {
      hue: "magenta",
      variant: "default",
      css: {
        color: { base: "magenta.70", _dark: "magenta.10" },
        bg: { base: "magenta.10", _dark: "magenta.70" }
      }
    },
    {
      hue: "magenta",
      variant: "bold",
      css: {
        color: { base: "magenta.5", _dark: "magenta.80" },
        bg: { base: "magenta.60", _dark: "magenta.20" }
      }
    }
  ]
}, or = {
  className: "checkbox",
  jsx: ["Checkbox"],
  slots: ["container", "input", "indicator"],
  base: {
    container: {
      position: "relative",
      display: "inline-grid",
      gridTemplateColumns: "auto 1fr",
      gap: 4,
      alignItems: "start",
      cursor: "pointer",
      userSelect: "none"
    },
    input: {
      position: "absolute",
      opacity: 0,
      width: "full",
      height: "full",
      margin: "0",
      padding: "0",
      zIndex: 1,
      cursor: "inherit",
      "& ~ [name='checkbox']": {
        display: "inline-grid"
      },
      _checked: {
        "& ~ [name='checkbox-checked']": {
          display: "inline-grid",
          fill: { base: "slate.90", _dark: "slate.0" }
        },
        "& ~ [name='checkbox']": {
          display: "none"
        }
      },
      _indeterminate: {
        "& ~ [name='checkbox-indeterminate']": {
          display: "inline-grid",
          fill: { base: "slate.90", _dark: "slate.0" },
          _disabled: {}
        },
        "& ~ [name='checkbox']": {
          display: "none"
        }
      },
      _disabled: {
        "& ~ svg": {
          opacity: 0.4,
          pointerEvents: "none",
          cursor: "none"
        },
        display: "inline-grid"
      },
      _error: {
        display: "inline-grid",
        "& ~ svg": {
          fill: { base: "error.default", _dark: "error.default" }
        }
      },
      _focusVisible: {
        "& ~ [name='checkbox-focus']": {
          display: "inline-grid",
          position: "absolute",
          fill: { base: "slate.90", _dark: "slate.1" }
        }
      }
    },
    indicator: {
      placeContent: "center",
      display: "none",
      width: 24,
      height: 24,
      "&:is([name='checkbox'])": {
        display: "inline-grid",
        fill: { base: "slate.30", _dark: "slate.20" }
      }
    }
  }
}, tr = {
  className: "radio",
  jsx: ["Radio"],
  slots: ["container", "input", "indicator"],
  base: {
    container: {
      position: "relative",
      display: "inline-grid",
      gridTemplateColumns: "auto 1fr",
      gap: 4,
      alignItems: "start",
      cursor: "pointer",
      userSelect: "none"
    },
    input: {
      position: "absolute",
      opacity: 0,
      width: "full",
      height: "full",
      margin: "0",
      padding: "0",
      zIndex: 1,
      cursor: "inherit",
      "& ~ [name='radio']": {
        display: "inline-grid"
      },
      _checked: {
        "& ~ [name='radio-checked']": {
          display: "inline-grid",
          fill: { base: "gray.90", _dark: "gray.0" }
        },
        "& ~ [name='radio']": {
          display: "none"
        }
      },
      _disabled: {
        "& ~ svg": {
          opacity: 0.4,
          pointerEvents: "none",
          cursor: "none"
        },
        display: "inline-grid"
      },
      _error: {
        display: "inline-grid",
        "& ~ svg": {
          fill: "red.50"
        }
      },
      _focusVisible: {
        "& ~ [name='radio-focus']": {
          display: "inline-grid",
          position: "absolute",
          fill: { base: "gray.90", _dark: "gray.1" }
        }
      }
    },
    indicator: {
      placeContent: "center",
      display: "none",
      width: 24,
      height: 24,
      "&:is([name='radio'])": {
        display: "inline-grid",
        fill: "gray.20"
      }
    }
  }
}, sr = {
  wrapper: {
    position: "relative",
    width: "fit-content",
    height: "fit-content",
    lineHeight: "fit-content",
    cursor: "default"
  },
  tooltipContent: {
    display: "flex",
    flexDirection: "column",
    gap: "4",
    bg: { base: "gray.90", _dark: "gray.0" },
    color: { base: "gray.0", _dark: "gray.90" },
    py: "8",
    px: "12",
    fontFamily: "body",
    fontSize: "14",
    fontWeight: "normal",
    borderRadius: "4",
    position: "absolute",
    maxWidth: "max-content",
    width: "max-content",
    boxShadow: "medium",
    zIndex: 1,
    pointerEvents: "none",
    _after: {
      content: "''",
      position: "absolute",
      width: "0",
      height: "0",
      borderWidth: "9",
      borderStyle: "solid",
      borderColor: "transparent"
    }
  }
}, ir = {
  position: {
    top: {
      tooltipContent: {
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: 1,
        _after: {
          top: "100%",
          left: "50%",
          transform: "translate(-50%, -2%)",
          borderTopColor: { base: "gray.90", _dark: "gray.0" }
        }
      }
    },
    bottom: {
      tooltipContent: {
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        _after: {
          bottom: "100%",
          left: "50%",
          transform: "translate(-50%, 2%)",
          borderBottomColor: { base: "gray.90", _dark: "gray.0" }
        }
      }
    },
    left: {
      tooltipContent: {
        top: "50%",
        right: "calc(100% - 0.75rem)",
        transform: "translate(-10%, -50%)",
        _after: {
          top: "50%",
          right: "-6%",
          transform: "translate(48%, -50%)",
          borderLeftColor: { base: "gray.90", _dark: "gray.0" }
        }
      }
    },
    right: {
      tooltipContent: {
        top: "50%",
        left: "calc(100% - 0.75rem)",
        transform: "translate(10%, -50%)",
        _after: {
          top: "50%",
          left: "-6%",
          transform: "translate(-48%, -50%)",
          borderRightColor: { base: "gray.90", _dark: "gray.0" }
        }
      }
    },
    "top-start": {
      tooltipContent: {
        bottom: "100%",
        left: "0",
        _after: {
          top: "100%",
          left: "8",
          transform: "translate(0, -2%)",
          borderTopColor: { base: "gray.90", _dark: "gray.0" }
        }
      }
    },
    "bottom-start": {
      tooltipContent: {
        top: "100%",
        left: "0",
        transform: "translateX(0)",
        _after: {
          bottom: "100%",
          left: "8",
          transform: "translate(0%, 2%)",
          borderBottomColor: { base: "gray.90", _dark: "gray.0" }
        }
      }
    },
    "left-start": {
      tooltipContent: {
        top: "0",
        right: "calc(100% - 0.75rem)",
        transform: "translate(-10%, -0%)",
        _after: {
          top: "8",
          right: "-6%",
          transform: "translate(48%, 0)",
          borderLeftColor: { base: "gray.90", _dark: "gray.0" }
        }
      }
    },
    "right-start": {
      tooltipContent: {
        top: "0",
        left: "calc(100% - 0.75rem)",
        transform: "translate(10%, 0%)",
        _after: {
          top: "8",
          left: "-6%",
          transform: "translate(-48%, 0)",
          borderRightColor: { base: "gray.90", _dark: "gray.0" }
        }
      }
    },
    "top-end": {
      tooltipContent: {
        bottom: "100%",
        right: "0",
        _after: {
          top: "100%",
          right: "8",
          transform: "translate(0, -2%)",
          borderTopColor: { base: "gray.90", _dark: "gray.0" }
        }
      }
    },
    "bottom-end": {
      tooltipContent: {
        top: "100%",
        right: "0",
        transform: "translateX(0)",
        _after: {
          bottom: "100%",
          right: "8",
          transform: "translate(0%, 2%)",
          borderBottomColor: { base: "gray.90", _dark: "gray.0" }
        }
      }
    },
    "left-end": {
      tooltipContent: {
        bottom: "0",
        right: "calc(100% - 0.75rem)",
        transform: "translate(-10%, -0%)",
        _after: {
          bottom: "8",
          right: "-6%",
          transform: "translate(48%, 0)",
          borderLeftColor: { base: "gray.90", _dark: "gray.0" }
        }
      }
    },
    "right-end": {
      tooltipContent: {
        bottom: "0",
        left: "calc(100% - 0.75rem)",
        transform: "translate(10%, -0%)",
        _after: {
          bottom: "8",
          left: "-6%",
          transform: "translate(-48%, 0)",
          borderRightColor: { base: "gray.90", _dark: "gray.0" }
        }
      }
    }
  }
}, nr = {
  className: "tooltip",
  jsx: ["Tooltip"],
  slots: ["wrapper", "tooltipContent"],
  base: sr,
  variants: {
    ...ir,
    caret: {
      true: {
        tooltipContent: {
          _after: {
            display: "block"
          }
        },
        _position: {
          top: {
            tooltipContent: {
              mb: "12"
            }
          }
        }
      },
      false: {
        tooltipContent: {
          _after: {
            display: "none"
          }
        },
        _position: {
          top: {
            tooltipContent: {
              mb: "8"
            }
          }
        }
      }
    }
  },
  defaultVariants: {
    position: "bottom"
  },
  compoundVariants: [
    {
      position: ["top", "top-start", "top-end"],
      caret: !0,
      css: {
        tooltipContent: {
          mb: "12"
        }
      }
    },
    {
      position: ["top", "top-start", "top-end"],
      caret: !1,
      css: {
        tooltipContent: {
          mb: "8"
        }
      }
    },
    {
      position: ["bottom", "bottom-start", "bottom-end"],
      caret: !0,
      css: {
        tooltipContent: {
          mt: "12"
        }
      }
    },
    {
      position: ["bottom", "bottom-start", "bottom-end"],
      caret: !1,
      css: {
        tooltipContent: {
          mt: "8"
        }
      }
    },
    {
      position: ["left", "left-start", "left-end"],
      caret: !0,
      css: {
        tooltipContent: {
          mr: "12"
        }
      }
    },
    {
      position: ["left", "left-start", "left-end"],
      caret: !1,
      css: {
        tooltipContent: {
          mr: "8"
        }
      }
    },
    {
      position: ["right", "right-start", "right-end"],
      caret: !0,
      css: {
        tooltipContent: {
          ml: "12"
        }
      }
    },
    {
      position: ["right", "right-start", "right-end"],
      caret: !1,
      css: {
        tooltipContent: {
          ml: "8"
        }
      }
    }
  ]
}, lr = {
  wrapper: {
    position: { base: "fixed", md: "relative" },
    left: "0",
    bottom: "0",
    width: { base: "full", md: "260" },
    bg: { base: "gray.0", _dark: "gray.80" },
    py: { base: "12", md: "4" },
    boxShadow: "medium",
    borderRadius: {
      base: "8",
      md: "4"
    },
    borderBottomLeftRadius: { base: "0", md: "4" },
    borderBottomRightRadius: { base: "0", md: "4" },
    "& ~ svg": {
      fill: { base: "gray.90", _dark: "gray.0" },
      mr: "auto"
    },
    overflow: "hidden",
    zIndex: 1
  },
  wrapperInner: {
    display: "flex",
    flexDirection: "column",
    "&[data-anim=slide-left]": { animation: "slideLeft" },
    "&[data-anim=slide-right]": { animation: "slideRight" }
  },
  menuItem: {
    display: "flex",
    gap: "4",
    px: { base: "20", md: "12" },
    outline: "2px solid transparent",
    outlineOffset: "0",
    "& a": {
      display: "flex",
      justifyContent: "space-between",
      w: "full"
    },
    _hover: {
      bg: { base: "gray.2", _dark: "gray.50" },
      cursor: "pointer"
    },
    _active: {
      bg: { base: "gray.10", _dark: "gray.100" }
    },
    _focusVisible: {
      outlineColor: { base: "gray.90", _dark: "gray.0" },
      outlineOffset: "-2"
    },
    _disabled: {
      opacity: 0.4,
      _hover: {
        bg: "transparent",
        pointerEvents: "none",
        cursor: "not-allowed"
      },
      _active: { bg: "transparent" },
      _focusVisible: { outlineColor: "transparent" }
    },
    "&[data-selected='true']": {
      bg: { base: "gray.10", _dark: "gray.100" }
    }
  },
  sectionTitle: {
    px: { base: "20", md: "12" },
    pt: { base: "20", md: "12" },
    pb: { base: "12", md: "4" }
  },
  menuLabel: { fontWeight: "normal" },
  parentLabel: {
    display: "flex",
    py: "4",
    pr: "12",
    pl: "4",
    bg: { base: "gray.5", _dark: "gray.60" },
    cursor: "pointer"
  },
  multiLevelIcon: { ml: "auto" },
  dividerSection: {
    py: { base: "8", md: "12" },
    px: { base: "20", md: "12" }
  },
  spacerSection: { h: { base: "24", md: "16" } },
  iconSection: { w: "24" },
  toggleMenu: { py: "6" }
}, dr = {
  iconPlacement: {
    left: {
      menuItem: { flexDirection: "row" }
    },
    right: {
      menuItem: {
        flexDirection: "row-reverse",
        justifyContent: "space-between"
      }
    }
  },
  multiSelectType: {
    toggle: {
      menuItem: { py: { base: "16", md: "6" }, gap: "12" }
    },
    checkbox: {
      menuItem: { py: { base: "12", md: "4" } }
    }
  }
}, cr = {
  className: "menu",
  jsx: ["Menu"],
  slots: [
    "wrapper",
    "sectionTitle",
    "menuItem",
    "menuLabel",
    "menuDescription",
    "parentLabel",
    "multiLevelIcon",
    "dividerSection",
    "spacerSection",
    "wrapperInner",
    "iconSection",
    "toggleMenu"
  ],
  base: lr,
  variants: dr,
  defaultVariants: {
    iconPlacement: "left",
    multiSelectType: "checkbox"
  }
}, ur = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  badgeRecipe: pe,
  boxRecipe: He,
  breadcrumbsRecipe: Qe,
  buttonRecipe: ce,
  cardRecipe: Ze,
  checkboxInputRecipe: Ce,
  checkboxRecipe: or,
  codeRecipe: Me,
  dividerRecipe: je,
  headingRecipe: Ne,
  iconButtonRecipe: ue,
  labelRecipe: we,
  linkRecipe: Se,
  menuRecipe: cr,
  preRecipe: $e,
  radioInputRecipe: Fe,
  radioRecipe: tr,
  spinnerRecipe: De,
  tagRecipe: rr,
  textRecipe: xe,
  textareaRecipe: ge,
  textinputRecipe: qe,
  toggleInputRecipe: Te,
  toggleRecipe: ze,
  tooltipRecipe: nr
}, Symbol.toStringTag, { value: "Module" })), {
  checkboxRecipe: pr,
  radioRecipe: gr,
  tooltipRecipe: mr,
  menuRecipe: br,
  toggleRecipe: vr,
  ...fr
} = ur, hr = Object.fromEntries(
  Object.entries(fr).map(([a, e]) => [
    a.replace(/Recipe$/, ""),
    e
  ])
), { box: Fr, divider: Rr, ...yr } = N.patterns, kr = N.conditions, xr = N.utilities, Nr = N.globalCss, Sr = Object.keys(_), { textStyles: wr, breakpoints: _r, keyframes: Cr, ...Br } = se, R = {
  tokens: j({
    ...Br,
    spacing: _
    // Map spacing to our size scale for consistent sizing
  }),
  semanticTokens: A({
    ...ne
  })
}, zr = {
  name: "okshaunPreset",
  theme: {
    extend: {
      tokens: {
        ...R.tokens
      },
      semanticTokens: {
        ...R.semanticTokens
      },
      breakpoints: _r,
      keyframes: Cr,
      textStyles: wr,
      recipes: {
        ...hr
      },
      slotRecipes: {
        checkbox: pr,
        radio: gr,
        tooltip: mr,
        menu: br,
        toggle: vr
      }
    }
  },
  patterns: {
    icon: {
      properties: {
        size: {
          type: "enum",
          value: Sr
        }
      },
      transform(a) {
        const { size: e, ...r } = a;
        return {
          width: e,
          height: e,
          ...r
        };
      }
    },
    extend: {
      ...yr,
      container: {
        transform(a) {
          return Object.assign(
            {
              position: "relative",
              width: "100%",
              maxWidth: "8xl",
              mx: "auto",
              px: { base: "24", md: "20", sm: "16" }
            },
            a
          );
        }
      }
    }
  },
  utilities: {
    ...xr
  },
  // Global styles
  globalCss: {
    ...Nr,
    ...de,
    html: {
      "--global-font-heading": "fonts.sans",
      "--global-font-body": "fonts.serif",
      "--global-font-mono": "fonts.mono"
    }
  },
  // Conditions for responsive and state-based styling
  conditions: {
    ...kr,
    ...le,
    collapsed: '&:is([aria-collapsed=true], [data-collapsed], [data-state="collapsed"])'
  }
};
export {
  zr as okshaunPreset
};
