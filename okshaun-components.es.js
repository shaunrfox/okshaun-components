import * as k1 from "react";
import { forwardRef as z1, useMemo as P1, createElement as Z, useEffect as Q, createContext as n2, useState as X, useContext as l2, useRef as T1 } from "react";
import { jsx as i, jsxs as V, Fragment as w0 } from "react/jsx-runtime";
function U(t) {
  return typeof t == "object" && t != null && !Array.isArray(t);
}
var i2 = (t) => typeof t == "object" && t !== null;
function j(t) {
  return Object.fromEntries(Object.entries(t ?? {}).filter(([a, o]) => o !== void 0));
}
var d2 = (t) => t === "base";
function c2(t) {
  return t.slice().filter((a) => !d2(a));
}
function A1(t) {
  return String.fromCharCode(t + (t > 25 ? 39 : 97));
}
function m2(t) {
  let a = "", o;
  for (o = Math.abs(t); o > 52; o = o / 52 | 0) a = A1(o % 52) + a;
  return A1(o % 52) + a;
}
function h2(t, a) {
  let o = a.length;
  for (; o; ) t = t * 33 ^ a.charCodeAt(--o);
  return t;
}
function p2(t) {
  return m2(h2(5381, t) >>> 0);
}
var v0 = /\s*!(important)?/i;
function w2(t) {
  return typeof t == "string" ? v0.test(t) : !1;
}
function v2(t) {
  return typeof t == "string" ? t.replace(v0, "").trim() : t;
}
function V1(t) {
  return typeof t == "string" ? t.replaceAll(" ", "_") : t;
}
var y = (t) => {
  const a = /* @__PURE__ */ new Map();
  return (...e) => {
    const r = JSON.stringify(e);
    if (a.has(r))
      return a.get(r);
    const s = t(...e);
    return a.set(r, s), s;
  };
}, g2 = /* @__PURE__ */ new Set(["__proto__", "constructor", "prototype"]);
function M1(...t) {
  return t.reduce((a, o) => (o && Object.keys(o).forEach((e) => {
    if (g2.has(e)) return;
    const r = a[e], s = o[e];
    U(r) && U(s) ? a[e] = M1(r, s) : a[e] = s;
  }), a), {});
}
var b2 = (t) => t != null;
function B1(t, a, o = {}) {
  const { stop: e, getKey: r } = o;
  function s(n, l = []) {
    if (i2(n)) {
      const h = {};
      for (const [p, w] of Object.entries(n)) {
        const x = (r == null ? void 0 : r(p, w)) ?? p, g = [...l, x];
        if (e != null && e(n, g))
          return a(n, l);
        const b = s(w, g);
        b2(b) && (h[x] = b);
      }
      return h;
    }
    return a(n, l);
  }
  return s(t);
}
function u2(t, a) {
  return Array.isArray(t) ? t.map((o) => a(o)) : U(t) ? B1(t, (o) => a(o)) : a(t);
}
function y2(t, a) {
  return t.reduce(
    (o, e, r) => {
      const s = a[r];
      return e != null && (o[s] = e), o;
    },
    {}
  );
}
function g0(t, a, o = !0) {
  const { utility: e, conditions: r } = a, { hasShorthand: s, resolveShorthand: n } = e;
  return B1(
    t,
    (l) => Array.isArray(l) ? y2(l, r.breakpoints.keys) : l,
    {
      stop: (l) => Array.isArray(l),
      getKey: o ? (l) => s ? n(l) : l : void 0
    }
  );
}
var x2 = {
  shift: (t) => t,
  finalize: (t) => t,
  breakpoints: { keys: [] }
}, f2 = (t) => typeof t == "string" ? t.replaceAll(/[\n\s]+/g, " ") : t;
function b0(t) {
  const { utility: a, hash: o, conditions: e = x2 } = t, r = (n) => [a.prefix, n].filter(Boolean).join("-"), s = (n, l) => {
    let h;
    if (o) {
      const p = [...e.finalize(n), l];
      h = r(a.toHash(p, p2));
    } else
      h = [...e.finalize(n), r(l)].join(":");
    return h;
  };
  return y(({ base: n, ...l } = {}) => {
    const h = Object.assign(l, n), p = g0(h, t), w = /* @__PURE__ */ new Set();
    return B1(p, (x, g) => {
      if (x == null) return;
      const b = w2(x), [C, ...P] = e.shift(g), M = c2(P), A = a.transform(C, v2(f2(x)));
      let k = s(M, A.className);
      b && (k = `${k}!`), w.add(k);
    }), Array.from(w).join(" ");
  });
}
function _2(...t) {
  return t.flat().filter((a) => U(a) && Object.keys(j(a)).length > 0);
}
function q2(t) {
  function a(r) {
    const s = _2(...r);
    return s.length === 1 ? s : s.map((n) => g0(n, t));
  }
  function o(...r) {
    return M1(...a(r));
  }
  function e(...r) {
    return Object.assign({}, ...a(r));
  }
  return { mergeCss: y(o), assignCss: e };
}
var k2 = /([A-Z])/g, z2 = /^ms-/, V2 = y((t) => t.startsWith("--") ? t : t.replace(k2, "-$1").replace(z2, "-ms-").toLowerCase()), M2 = ["min", "max", "clamp", "calc"], B2 = new RegExp(`^(${M2.join("|")})\\(.*\\)`), S2 = (t) => typeof t == "string" && B2.test(t), C2 = "cm,mm,Q,in,pc,pt,px,em,ex,ch,rem,lh,rlh,vw,vh,vmin,vmax,vb,vi,svw,svh,lvw,lvh,dvw,dvh,cqw,cqh,cqi,cqb,cqmin,cqmax,%", H2 = `(?:${C2.split(",").join("|")})`, L2 = new RegExp(`^[+-]?[0-9]*.?[0-9]+(?:[eE][+-]?[0-9]+)?${H2}$`), P2 = (t) => typeof t == "string" && L2.test(t), T2 = (t) => typeof t == "string" && /^var\(--.+\)$/.test(t), S1 = {
  map: u2,
  isCssFunction: S2,
  isCssVar: T2,
  isCssUnit: P2
}, C1 = (t, a) => {
  if (!(t != null && t.defaultValues)) return a;
  const o = typeof t.defaultValues == "function" ? t.defaultValues(a) : t.defaultValues;
  return Object.assign({}, o, j(a));
}, Y = (t, a) => t.filter((o) => o.css[a]).map((o) => ({ ...o, css: o.css[a] }));
function u(t, ...a) {
  const o = Object.getOwnPropertyDescriptors(t), e = Object.keys(o), r = (n) => {
    const l = {};
    for (let h = 0; h < n.length; h++) {
      const p = n[h];
      o[p] && (Object.defineProperty(l, p, o[p]), delete o[p]);
    }
    return l;
  }, s = (n) => r(Array.isArray(n) ? n : e.filter(n));
  return a.map(s).concat(r(e));
}
var x1 = (...t) => {
  const a = t.reduce((o, e) => (e && e.forEach((r) => o.add(r)), o), /* @__PURE__ */ new Set([]));
  return Array.from(a);
}, u0 = ["htmlSize", "htmlTranslate", "htmlWidth", "htmlHeight"];
function A2(t) {
  return u0.includes(t) ? t.replace("html", "").toLowerCase() : t;
}
function f1(t) {
  return Object.fromEntries(Object.entries(t).map(([a, o]) => [A2(a), o]));
}
f1.keys = u0;
const I2 = "_hover,_focus,_focusWithin,_focusVisible,_disabled,_active,_visited,_target,_readOnly,_readWrite,_empty,_checked,_enabled,_expanded,_highlighted,_complete,_incomplete,_dragging,_before,_after,_firstLetter,_firstLine,_marker,_selection,_file,_backdrop,_first,_last,_only,_even,_odd,_firstOfType,_lastOfType,_onlyOfType,_peerFocus,_peerHover,_peerActive,_peerFocusWithin,_peerFocusVisible,_peerDisabled,_peerChecked,_peerInvalid,_peerExpanded,_peerPlaceholderShown,_groupFocus,_groupHover,_groupActive,_groupFocusWithin,_groupFocusVisible,_groupDisabled,_groupChecked,_groupExpanded,_groupInvalid,_indeterminate,_required,_valid,_invalid,_autofill,_inRange,_outOfRange,_placeholder,_placeholderShown,_pressed,_selected,_grabbed,_underValue,_overValue,_atValue,_default,_optional,_open,_closed,_fullscreen,_loading,_hidden,_current,_currentPage,_currentStep,_today,_unavailable,_rangeStart,_rangeEnd,_now,_topmost,_motionReduce,_motionSafe,_print,_landscape,_portrait,_dark,_light,_osDark,_osLight,_highContrast,_lessContrast,_moreContrast,_ltr,_rtl,_scrollbar,_scrollbarThumb,_scrollbarTrack,_horizontal,_vertical,_icon,_starting,_noscript,_invertedColors,_collapsed,xs,xsOnly,xsDown,sm,smOnly,smDown,md,mdOnly,mdDown,lg,lgOnly,lgDown,xl,xlOnly,xlDown,2xl,2xlOnly,2xlDown,xsToSm,xsToMd,xsToLg,xsToXl,xsTo2xl,smToMd,smToLg,smToXl,smTo2xl,mdToLg,mdToXl,mdTo2xl,lgToXl,lgTo2xl,xlTo2xl,@/xs,@/sm,@/md,@/lg,@/xl,@/2xl,@/3xl,@/4xl,@/5xl,@/6xl,@/7xl,@/8xl,base", y0 = new Set(I2.split(",")), E2 = /^@|&|&$/;
function I1(t) {
  return y0.has(t) || E2.test(t);
}
const O2 = /^_/, R2 = /&|@/;
function x0(t) {
  return t.map((a) => y0.has(a) ? a.replace(O2, "") : R2.test(a) ? `[${V1(a.trim())}]` : a);
}
function f0(t) {
  return t.sort((a, o) => {
    const e = I1(a), r = I1(o);
    return e && !r ? 1 : !e && r ? -1 : 0;
  });
}
const j2 = "aspectRatio:asp,boxDecorationBreak:bx-db,zIndex:z,boxSizing:bx-s,objectPosition:obj-p,objectFit:obj-f,overscrollBehavior:ovs-b,overscrollBehaviorX:ovs-bx,overscrollBehaviorY:ovs-by,position:pos/1,top:top,left:left,inset:inset,insetInline:inset-x/insetX,insetBlock:inset-y/insetY,insetBlockEnd:inset-be,insetBlockStart:inset-bs,insetInlineEnd:inset-e/insetEnd/end,insetInlineStart:inset-s/insetStart/start,right:right,bottom:bottom,float:float,visibility:vis,display:d,hideFrom:hide,hideBelow:show,flexBasis:flex-b,flex:flex,flexDirection:flex-d/flexDir,flexGrow:flex-g,flexShrink:flex-sh,gridTemplateColumns:grid-tc,gridTemplateRows:grid-tr,gridColumn:grid-c,gridRow:grid-r,gridColumnStart:grid-cs,gridColumnEnd:grid-ce,gridAutoFlow:grid-af,gridAutoColumns:grid-ac,gridAutoRows:grid-ar,gap:gap,gridGap:grid-g,gridRowGap:grid-rg,gridColumnGap:grid-cg,rowGap:rg,columnGap:cg,justifyContent:jc,alignContent:ac,alignItems:ai,alignSelf:as,padding:p/1,paddingLeft:pl/1,paddingRight:pr/1,paddingTop:pt/1,paddingBottom:pb/1,paddingBlock:py/1/paddingY,paddingBlockEnd:pbe,paddingBlockStart:pbs,paddingInline:px/paddingX/1,paddingInlineEnd:pe/1/paddingEnd,paddingInlineStart:ps/1/paddingStart,marginLeft:ml/1,marginRight:mr/1,marginTop:mt/1,marginBottom:mb/1,margin:m/1,marginBlock:my/1/marginY,marginBlockEnd:mbe,marginBlockStart:mbs,marginInline:mx/1/marginX,marginInlineEnd:me/1/marginEnd,marginInlineStart:ms/1/marginStart,spaceX:sx,spaceY:sy,outlineWidth:ring-w/ringWidth,outlineColor:ring-c/ringColor,outline:ring/1,outlineOffset:ring-o/ringOffset,focusRing:focus-ring,focusVisibleRing:focus-v-ring,focusRingColor:focus-ring-c,focusRingOffset:focus-ring-o,focusRingWidth:focus-ring-w,focusRingStyle:focus-ring-s,divideX:dvd-x,divideY:dvd-y,divideColor:dvd-c,divideStyle:dvd-s,width:w/1,inlineSize:w-is,minWidth:min-w/minW,minInlineSize:min-w-is,maxWidth:max-w/maxW,maxInlineSize:max-w-is,height:h/1,blockSize:h-bs,minHeight:min-h/minH,minBlockSize:min-h-bs,maxHeight:max-h/maxH,maxBlockSize:max-b,boxSize:size,color:c,fontFamily:ff,fontSize:fs,fontSizeAdjust:fs-a,fontPalette:fp,fontKerning:fk,fontFeatureSettings:ff-s,fontWeight:fw,fontSmoothing:fsmt,fontVariant:fv,fontVariantAlternates:fv-alt,fontVariantCaps:fv-caps,fontVariationSettings:fv-s,fontVariantNumeric:fv-num,letterSpacing:ls,lineHeight:lh,textAlign:ta,textDecoration:td,textDecorationColor:td-c,textEmphasisColor:te-c,textDecorationStyle:td-s,textDecorationThickness:td-t,textUnderlineOffset:tu-o,textTransform:tt,textIndent:ti,textShadow:tsh,textShadowColor:tsh-c/textShadowColor,textOverflow:tov,verticalAlign:va,wordBreak:wb,textWrap:tw,truncate:trunc,lineClamp:lc,listStyleType:li-t,listStylePosition:li-pos,listStyleImage:li-img,listStyle:li-s,backgroundPosition:bg-p/bgPosition,backgroundPositionX:bg-p-x/bgPositionX,backgroundPositionY:bg-p-y/bgPositionY,backgroundAttachment:bg-a/bgAttachment,backgroundClip:bg-cp/bgClip,background:bg/1,backgroundColor:bg-c/bgColor,backgroundOrigin:bg-o/bgOrigin,backgroundImage:bg-i/bgImage,backgroundRepeat:bg-r/bgRepeat,backgroundBlendMode:bg-bm/bgBlendMode,backgroundSize:bg-s/bgSize,backgroundGradient:bg-grad/bgGradient,backgroundLinear:bg-linear/bgLinear,backgroundRadial:bg-radial/bgRadial,backgroundConic:bg-conic/bgConic,textGradient:txt-grad,gradientFromPosition:grad-from-pos,gradientToPosition:grad-to-pos,gradientFrom:grad-from,gradientTo:grad-to,gradientVia:grad-via,gradientViaPosition:grad-via-pos,borderRadius:bdr/rounded,borderTopLeftRadius:bdr-tl/roundedTopLeft,borderTopRightRadius:bdr-tr/roundedTopRight,borderBottomRightRadius:bdr-br/roundedBottomRight,borderBottomLeftRadius:bdr-bl/roundedBottomLeft,borderTopRadius:bdr-t/roundedTop,borderRightRadius:bdr-r/roundedRight,borderBottomRadius:bdr-b/roundedBottom,borderLeftRadius:bdr-l/roundedLeft,borderStartStartRadius:bdr-ss/roundedStartStart,borderStartEndRadius:bdr-se/roundedStartEnd,borderStartRadius:bdr-s/roundedStart,borderEndStartRadius:bdr-es/roundedEndStart,borderEndEndRadius:bdr-ee/roundedEndEnd,borderEndRadius:bdr-e/roundedEnd,border:bd,borderWidth:bd-w,borderTopWidth:bd-t-w,borderLeftWidth:bd-l-w,borderRightWidth:bd-r-w,borderBottomWidth:bd-b-w,borderBlockStartWidth:bd-bs-w,borderBlockEndWidth:bd-be-w,borderColor:bd-c,borderInline:bd-x/borderX,borderInlineWidth:bd-x-w/borderXWidth,borderInlineColor:bd-x-c/borderXColor,borderBlock:bd-y/borderY,borderBlockWidth:bd-y-w/borderYWidth,borderBlockColor:bd-y-c/borderYColor,borderLeft:bd-l,borderLeftColor:bd-l-c,borderInlineStart:bd-s/borderStart,borderInlineStartWidth:bd-s-w/borderStartWidth,borderInlineStartColor:bd-s-c/borderStartColor,borderRight:bd-r,borderRightColor:bd-r-c,borderInlineEnd:bd-e/borderEnd,borderInlineEndWidth:bd-e-w/borderEndWidth,borderInlineEndColor:bd-e-c/borderEndColor,borderTop:bd-t,borderTopColor:bd-t-c,borderBottom:bd-b,borderBottomColor:bd-b-c,borderBlockEnd:bd-be,borderBlockEndColor:bd-be-c,borderBlockStart:bd-bs,borderBlockStartColor:bd-bs-c,opacity:op,boxShadow:bx-sh/shadow,boxShadowColor:bx-sh-c/shadowColor,mixBlendMode:mix-bm,filter:filter,brightness:brightness,contrast:contrast,grayscale:grayscale,hueRotate:hue-rotate,invert:invert,saturate:saturate,sepia:sepia,dropShadow:drop-shadow,blur:blur,backdropFilter:bkdp,backdropBlur:bkdp-blur,backdropBrightness:bkdp-brightness,backdropContrast:bkdp-contrast,backdropGrayscale:bkdp-grayscale,backdropHueRotate:bkdp-hue-rotate,backdropInvert:bkdp-invert,backdropOpacity:bkdp-opacity,backdropSaturate:bkdp-saturate,backdropSepia:bkdp-sepia,borderCollapse:bd-cl,borderSpacing:bd-sp,borderSpacingX:bd-sx,borderSpacingY:bd-sy,tableLayout:tbl,transitionTimingFunction:trs-tmf,transitionDelay:trs-dly,transitionDuration:trs-dur,transitionProperty:trs-prop,transition:trs,animation:anim,animationName:anim-n,animationTimingFunction:anim-tmf,animationDuration:anim-dur,animationDelay:anim-dly,animationPlayState:anim-ps,animationComposition:anim-comp,animationFillMode:anim-fm,animationDirection:anim-dir,animationIterationCount:anim-ic,animationRange:anim-r,animationState:anim-s,animationRangeStart:anim-rs,animationRangeEnd:anim-re,animationTimeline:anim-tl,transformOrigin:trf-o,transformBox:trf-b,transformStyle:trf-s,transform:trf,rotate:rotate,rotateX:rotate-x,rotateY:rotate-y,rotateZ:rotate-z,scale:scale,scaleX:scale-x,scaleY:scale-y,translate:translate,translateX:translate-x/x,translateY:translate-y/y,translateZ:translate-z/z,accentColor:ac-c,caretColor:ca-c,scrollBehavior:scr-bhv,scrollbar:scr-bar,scrollbarColor:scr-bar-c,scrollbarGutter:scr-bar-g,scrollbarWidth:scr-bar-w,scrollMargin:scr-m,scrollMarginLeft:scr-ml,scrollMarginRight:scr-mr,scrollMarginTop:scr-mt,scrollMarginBottom:scr-mb,scrollMarginBlock:scr-my/scrollMarginY,scrollMarginBlockEnd:scr-mbe,scrollMarginBlockStart:scr-mbt,scrollMarginInline:scr-mx/scrollMarginX,scrollMarginInlineEnd:scr-me,scrollMarginInlineStart:scr-ms,scrollPadding:scr-p,scrollPaddingBlock:scr-py/scrollPaddingY,scrollPaddingBlockStart:scr-pbs,scrollPaddingBlockEnd:scr-pbe,scrollPaddingInline:scr-px/scrollPaddingX,scrollPaddingInlineEnd:scr-pe,scrollPaddingInlineStart:scr-ps,scrollPaddingLeft:scr-pl,scrollPaddingRight:scr-pr,scrollPaddingTop:scr-pt,scrollPaddingBottom:scr-pb,scrollSnapAlign:scr-sa,scrollSnapStop:scrs-s,scrollSnapType:scrs-t,scrollSnapStrictness:scrs-strt,scrollSnapMargin:scrs-m,scrollSnapMarginTop:scrs-mt,scrollSnapMarginBottom:scrs-mb,scrollSnapMarginLeft:scrs-ml,scrollSnapMarginRight:scrs-mr,scrollSnapCoordinate:scrs-c,scrollSnapDestination:scrs-d,scrollSnapPointsX:scrs-px,scrollSnapPointsY:scrs-py,scrollSnapTypeX:scrs-tx,scrollSnapTypeY:scrs-ty,scrollTimeline:scrtl,scrollTimelineAxis:scrtl-a,scrollTimelineName:scrtl-n,touchAction:tch-a,userSelect:us,overflow:ov,overflowWrap:ov-wrap,overflowX:ov-x,overflowY:ov-y,overflowAnchor:ov-a,overflowBlock:ov-b,overflowInline:ov-i,overflowClipBox:ovcp-bx,overflowClipMargin:ovcp-m,overscrollBehaviorBlock:ovs-bb,overscrollBehaviorInline:ovs-bi,fill:fill,stroke:stk,strokeWidth:stk-w,strokeDasharray:stk-dsh,strokeDashoffset:stk-do,strokeLinecap:stk-lc,strokeLinejoin:stk-lj,strokeMiterlimit:stk-ml,strokeOpacity:stk-op,srOnly:sr,debug:debug,appearance:ap,backfaceVisibility:bfv,clipPath:cp-path,hyphens:hy,mask:msk,maskImage:msk-i,maskSize:msk-s,textSizeAdjust:txt-adj,container:cq,containerName:cq-n,containerType:cq-t,cursor:cursor,textStyle:textStyle", _0 = /* @__PURE__ */ new Map(), q0 = /* @__PURE__ */ new Map();
j2.split(",").forEach((t) => {
  const [a, o] = t.split(":"), [e, ...r] = o.split("/");
  _0.set(a, e), r.length && r.forEach((s) => {
    q0.set(s === "1" ? e : s, a);
  });
});
const E1 = (t) => q0.get(t) || t, k0 = {
  conditions: {
    shift: f0,
    finalize: x0,
    breakpoints: { keys: ["base", "xs", "sm", "md", "lg", "xl", "2xl"] }
  },
  utility: {
    prefix: "okshaun",
    transform: (t, a) => {
      const o = E1(t);
      return { className: `${_0.get(o) || V2(o)}_${V1(a)}` };
    },
    hasShorthand: !0,
    toHash: (t, a) => a(t.join(":")),
    resolveShorthand: E1
  }
}, F2 = b0(k0), O = (...t) => F2(F(...t));
O.raw = (...t) => F(...t);
const { mergeCss: F } = q2(k0), O1 = (t) => ({
  base: {},
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
  ...t
});
function z0(t) {
  const { base: a, variants: o, defaultVariants: e, compoundVariants: r } = O1(t), s = (g) => ({ ...e, ...j(g) });
  function n(g = {}) {
    var M;
    const b = s(g);
    let C = { ...a };
    for (const [A, k] of Object.entries(b))
      (M = o[A]) != null && M[k] && (C = F(C, o[A][k]));
    const P = _1(r, b);
    return F(C, P);
  }
  function l(g) {
    const b = O1(g.config), C = x1(g.variantKeys, Object.keys(o));
    return z0({
      base: F(a, b.base),
      variants: Object.fromEntries(
        C.map((P) => [P, F(o[P], b.variants[P])])
      ),
      defaultVariants: M1(e, b.defaultVariants),
      compoundVariants: [...r, ...b.compoundVariants]
    });
  }
  function h(g) {
    return O(n(g));
  }
  const p = Object.keys(o);
  function w(g) {
    return u(g, p);
  }
  const x = Object.fromEntries(Object.entries(o).map(([g, b]) => [g, Object.keys(b)]));
  return Object.assign(y(h), {
    __cva__: !0,
    variantMap: x,
    variantKeys: p,
    raw: n,
    config: t,
    merge: l,
    splitVariantProps: w,
    getVariantProps: s
  });
}
function _1(t, a) {
  let o = {};
  return t.forEach((e) => {
    Object.entries(e).every(([s, n]) => s === "css" ? !0 : (Array.isArray(n) ? n : [n]).some((h) => a[s] === h)) && (o = F(o, e.css));
  }), o;
}
function W2(t, a, o, e) {
  if (a.length > 0 && typeof (o == null ? void 0 : o[e]) == "object")
    throw new Error(`[recipe:${t}:${e}] Conditions are not supported when using compound variants.`);
}
function _() {
  let t = "", a = 0, o;
  for (; a < arguments.length; )
    (o = arguments[a++]) && typeof o == "string" && (t && (t += " "), t += o);
  return t;
}
const q = (t, a, o) => {
  const e = (s) => ({
    [t]: "__ignore__",
    ...a,
    ...j(s)
  });
  return {
    recipeFn: (s, n = !0) => {
      const h = b0({
        conditions: {
          shift: f0,
          finalize: x0,
          breakpoints: { keys: ["base", "xs", "sm", "md", "lg", "xl", "2xl"] }
        },
        utility: {
          prefix: "okshaun",
          toHash: (w, x) => x(w.join(":")),
          transform: (w, x) => (W2(t, o, s, w), x === "__ignore__" ? { className: t } : (x = V1(x), { className: `${t}--${w}_${x}` }))
        }
      }), p = e(s);
      if (n) {
        const w = _1(o, p);
        return _(h(p), O(w));
      }
      return h(p);
    },
    getVariantProps: e,
    __getCompoundVariantCss__: (s) => _1(o, e(s))
  };
}, z = (t, a) => {
  if (t && !a) return t;
  if (!t && a) return a;
  const o = (...s) => _(t(...s), a(...s)), e = x1(t.variantKeys, a.variantKeys), r = e.reduce((s, n) => (s[n] = x1(t.variantMap[n], a.variantMap[n]), s), {});
  return Object.assign(o, {
    __recipe__: !0,
    __name__: `${t.__name__} ${a.__name__}`,
    raw: (s) => s,
    variantKeys: e,
    variantMap: r,
    splitVariantProps(s) {
      return u(s, e);
    }
  });
}, J = /* @__PURE__ */ q("badge", {
  variant: "subtle",
  size: "md"
}, []), V0 = {
  variant: [
    "solid",
    "subtle",
    "outline"
  ],
  size: [
    "sm",
    "md",
    "lg"
  ]
}, R1 = Object.keys(V0), N2 = /* @__PURE__ */ Object.assign(y(J.recipeFn), {
  __recipe__: !0,
  __name__: "badge",
  __getCompoundVariantCss__: J.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: R1,
  variantMap: V0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, R1);
  },
  getVariantProps: J.getVariantProps
}), t1 = /* @__PURE__ */ q("box", {}, []), M0 = {}, j1 = Object.keys(M0), D2 = /* @__PURE__ */ Object.assign(y(t1.recipeFn), {
  __recipe__: !0,
  __name__: "box",
  __getCompoundVariantCss__: t1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: j1,
  variantMap: M0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, j1);
  },
  getVariantProps: t1.getVariantProps
}), a1 = /* @__PURE__ */ q("breadcrumbs", {}, []), B0 = {}, F1 = Object.keys(B0), K2 = /* @__PURE__ */ Object.assign(y(a1.recipeFn), {
  __recipe__: !0,
  __name__: "breadcrumbs",
  __getCompoundVariantCss__: a1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: F1,
  variantMap: B0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, F1);
  },
  getVariantProps: a1.getVariantProps
}), o1 = /* @__PURE__ */ q("button", {
  variant: "standard",
  size: "standard"
}, []), S0 = {
  variant: [
    "primary",
    "standard",
    "hollow",
    "ghost",
    "cta",
    "danger"
  ],
  size: [
    "standard",
    "large",
    "small"
  ]
}, W1 = Object.keys(S0), Q2 = /* @__PURE__ */ Object.assign(y(o1.recipeFn), {
  __recipe__: !0,
  __name__: "button",
  __getCompoundVariantCss__: o1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: W1,
  variantMap: S0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, W1);
  },
  getVariantProps: o1.getVariantProps
}), e1 = /* @__PURE__ */ q("card", {
  variant: "default"
}, []), C0 = {
  variant: [
    "default",
    "flat"
  ]
}, N1 = Object.keys(C0), X2 = /* @__PURE__ */ Object.assign(y(e1.recipeFn), {
  __recipe__: !0,
  __name__: "card",
  __getCompoundVariantCss__: e1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: N1,
  variantMap: C0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, N1);
  },
  getVariantProps: e1.getVariantProps
}), r1 = /* @__PURE__ */ q("checkbox-input", {}, []), H0 = {}, D1 = Object.keys(H0), Y2 = /* @__PURE__ */ Object.assign(y(r1.recipeFn), {
  __recipe__: !0,
  __name__: "checkboxInput",
  __getCompoundVariantCss__: r1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: D1,
  variantMap: H0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, D1);
  },
  getVariantProps: r1.getVariantProps
}), s1 = /* @__PURE__ */ q("code", {}, []), L0 = {}, K1 = Object.keys(L0), G2 = /* @__PURE__ */ Object.assign(y(s1.recipeFn), {
  __recipe__: !0,
  __name__: "code",
  __getCompoundVariantCss__: s1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: K1,
  variantMap: L0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, K1);
  },
  getVariantProps: s1.getVariantProps
}), n1 = /* @__PURE__ */ q("divider", {
  direction: "horizontal",
  weight: "thin"
}, []), P0 = {
  direction: [
    "horizontal",
    "vertical"
  ],
  weight: [
    "thin",
    "medium",
    "thick",
    "thicker"
  ]
}, Q1 = Object.keys(P0), $2 = /* @__PURE__ */ Object.assign(y(n1.recipeFn), {
  __recipe__: !0,
  __name__: "divider",
  __getCompoundVariantCss__: n1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: Q1,
  variantMap: P0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, Q1);
  },
  getVariantProps: n1.getVariantProps
}), l1 = /* @__PURE__ */ q("heading", {
  level: "h2"
}, []), T0 = {
  level: [
    "h1",
    "h2",
    "h3",
    "h4"
  ]
}, X1 = Object.keys(T0), U2 = /* @__PURE__ */ Object.assign(y(l1.recipeFn), {
  __recipe__: !0,
  __name__: "heading",
  __getCompoundVariantCss__: l1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: X1,
  variantMap: T0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, X1);
  },
  getVariantProps: l1.getVariantProps
}), i1 = /* @__PURE__ */ q("icon-button", {
  variant: "standard",
  size: "standard"
}, []), A0 = {
  variant: [
    "primary",
    "standard",
    "hollow",
    "ghost",
    "cta",
    "danger"
  ],
  size: [
    "standard",
    "large",
    "small"
  ]
}, Y1 = Object.keys(A0), Z2 = /* @__PURE__ */ Object.assign(y(i1.recipeFn), {
  __recipe__: !0,
  __name__: "iconButton",
  __getCompoundVariantCss__: i1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: Y1,
  variantMap: A0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, Y1);
  },
  getVariantProps: i1.getVariantProps
}), d1 = /* @__PURE__ */ q("label", {
  family: "sans"
}, []), I0 = {
  family: [
    "sans",
    "serif",
    "mono"
  ],
  bold: [
    "true"
  ],
  italic: [
    "true"
  ],
  underline: [
    "true"
  ],
  _disabled: [
    "true"
  ]
}, G1 = Object.keys(I0), J2 = /* @__PURE__ */ Object.assign(y(d1.recipeFn), {
  __recipe__: !0,
  __name__: "label",
  __getCompoundVariantCss__: d1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: G1,
  variantMap: I0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, G1);
  },
  getVariantProps: d1.getVariantProps
}), c1 = /* @__PURE__ */ q("link", {
  family: "sans"
}, []), E0 = {
  family: [
    "sans",
    "serif",
    "mono"
  ],
  bold: [
    "true"
  ],
  italic: [
    "true"
  ],
  underline: [
    "true"
  ],
  _disabled: [
    "true"
  ]
}, $1 = Object.keys(E0), t6 = /* @__PURE__ */ Object.assign(y(c1.recipeFn), {
  __recipe__: !0,
  __name__: "link",
  __getCompoundVariantCss__: c1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: $1,
  variantMap: E0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, $1);
  },
  getVariantProps: c1.getVariantProps
}), m1 = /* @__PURE__ */ q("pre", {}, []), O0 = {}, U1 = Object.keys(O0), a6 = /* @__PURE__ */ Object.assign(y(m1.recipeFn), {
  __recipe__: !0,
  __name__: "pre",
  __getCompoundVariantCss__: m1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: U1,
  variantMap: O0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, U1);
  },
  getVariantProps: m1.getVariantProps
}), h1 = /* @__PURE__ */ q("radio-input", {}, []), R0 = {}, Z1 = Object.keys(R0), o6 = /* @__PURE__ */ Object.assign(y(h1.recipeFn), {
  __recipe__: !0,
  __name__: "radioInput",
  __getCompoundVariantCss__: h1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: Z1,
  variantMap: R0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, Z1);
  },
  getVariantProps: h1.getVariantProps
}), p1 = /* @__PURE__ */ q("spinner", {
  size: "standard"
}, []), j0 = {
  size: [
    "standard",
    "small",
    "large"
  ]
}, J1 = Object.keys(j0), e6 = /* @__PURE__ */ Object.assign(y(p1.recipeFn), {
  __recipe__: !0,
  __name__: "spinner",
  __getCompoundVariantCss__: p1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: J1,
  variantMap: j0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, J1);
  },
  getVariantProps: p1.getVariantProps
}), w1 = /* @__PURE__ */ q("tag", {
  variant: "default",
  hue: "slate",
  iconPosition: "left",
  hasIcon: !1
}, [
  {
    hue: "slate",
    variant: "default",
    css: {
      color: {
        base: "gray.70",
        _dark: "gray.20"
      },
      bg: {
        base: "gray.10",
        _dark: "gray.70"
      }
    }
  },
  {
    hue: "slate",
    variant: "bold",
    css: {
      color: {
        base: "gray.0",
        _dark: "gray.80"
      },
      bg: {
        base: "gray.50",
        _dark: "gray.20"
      }
    }
  },
  {
    hue: "tan",
    variant: "default",
    css: {
      color: {
        base: "tan.70",
        _dark: "tan.20"
      },
      bg: {
        base: "tan.10",
        _dark: "tan.70"
      }
    }
  },
  {
    hue: "tan",
    variant: "bold",
    css: {
      color: {
        base: "gray.0",
        _dark: "tan.80"
      },
      bg: {
        base: "tan.50",
        _dark: "tan.20"
      }
    }
  },
  {
    hue: "red",
    variant: "default",
    css: {
      color: {
        base: "red.70",
        _dark: "red.10"
      },
      bg: {
        base: "red.10",
        _dark: "red.70"
      }
    }
  },
  {
    hue: "red",
    variant: "bold",
    css: {
      color: {
        base: "gray.0",
        _dark: "red.80"
      },
      bg: {
        base: "red.50",
        _dark: "red.20"
      }
    }
  },
  {
    hue: "tomato",
    variant: "default",
    css: {
      color: {
        base: "tomato.70",
        _dark: "tomato.20"
      },
      bg: {
        base: "tomato.10",
        _dark: "tomato.70"
      }
    }
  },
  {
    hue: "tomato",
    variant: "bold",
    css: {
      color: {
        base: "gray.0",
        _dark: "tomato.80"
      },
      bg: {
        base: "tomato.50",
        _dark: "tomato.20"
      }
    }
  },
  {
    hue: "orange",
    variant: "default",
    css: {
      color: {
        base: "orange.70",
        _dark: "orange.20"
      },
      bg: {
        base: "orange.10",
        _dark: "orange.70"
      }
    }
  },
  {
    hue: "orange",
    variant: "bold",
    css: {
      color: {
        base: "orange.5",
        _dark: "orange.80"
      },
      bg: {
        base: "orange.60",
        _dark: "orange.20"
      }
    }
  },
  {
    hue: "yellow",
    variant: "default",
    css: {
      color: {
        base: "yellow.60",
        _dark: "yellow.10"
      },
      bg: {
        base: "yellow.10",
        _dark: "yellow.60"
      }
    }
  },
  {
    hue: "yellow",
    variant: "bold",
    css: {
      color: {
        base: "yellow.70",
        _dark: "yellow.90"
      },
      bg: {
        base: "yellow.20",
        _dark: "yellow.20"
      }
    }
  },
  {
    hue: "green",
    variant: "default",
    css: {
      color: {
        base: "green.70",
        _dark: "green.20"
      },
      bg: {
        base: "green.10",
        _dark: "green.70"
      }
    }
  },
  {
    hue: "green",
    variant: "bold",
    css: {
      color: {
        base: "gray.0",
        _dark: "green.80"
      },
      bg: {
        base: "green.50",
        _dark: "green.20"
      }
    }
  },
  {
    hue: "grass",
    variant: "default",
    css: {
      color: {
        base: "grass.70",
        _dark: "grass.10"
      },
      bg: {
        base: "grass.10",
        _dark: "grass.70"
      }
    }
  },
  {
    hue: "grass",
    variant: "bold",
    css: {
      color: {
        base: "gray.0",
        _dark: "grass.80"
      },
      bg: {
        base: "grass.60",
        _dark: "grass.20"
      }
    }
  },
  {
    hue: "mint",
    variant: "default",
    css: {
      color: {
        base: "mint.80",
        _dark: "mint.30"
      },
      bg: {
        base: "mint.10",
        _dark: "mint.80"
      }
    }
  },
  {
    hue: "mint",
    variant: "bold",
    css: {
      color: {
        base: "gray.0",
        _dark: "mint.80"
      },
      bg: {
        base: "mint.70",
        _dark: "mint.20"
      }
    }
  },
  {
    hue: "cyan",
    variant: "default",
    css: {
      color: {
        base: "cyan.70",
        _dark: "cyan.20"
      },
      bg: {
        base: "cyan.10",
        _dark: "cyan.70"
      }
    }
  },
  {
    hue: "cyan",
    variant: "bold",
    css: {
      color: {
        base: "cyan.5",
        _dark: "cyan.80"
      },
      bg: {
        base: "cyan.60",
        _dark: "cyan.30"
      }
    }
  },
  {
    hue: "blue",
    variant: "default",
    css: {
      color: {
        base: "blue.70",
        _dark: "blue.20"
      },
      bg: {
        base: "blue.10",
        _dark: "blue.70"
      }
    }
  },
  {
    hue: "blue",
    variant: "bold",
    css: {
      color: {
        base: "gray.0",
        _dark: "blue.90"
      },
      bg: {
        base: "blue.50",
        _dark: "blue.40"
      }
    }
  },
  {
    hue: "indigo",
    variant: "default",
    css: {
      color: {
        base: "indigo.70",
        _dark: "indigo.10"
      },
      bg: {
        base: "indigo.10",
        _dark: "indigo.70"
      }
    }
  },
  {
    hue: "indigo",
    variant: "bold",
    css: {
      color: {
        base: "indigo.5",
        _dark: "indigo.80"
      },
      bg: {
        base: "indigo.50",
        _dark: "indigo.20"
      }
    }
  },
  {
    hue: "purple",
    variant: "default",
    css: {
      color: {
        base: "purple.70",
        _dark: "purple.20"
      },
      bg: {
        base: "purple.10",
        _dark: "purple.70"
      }
    }
  },
  {
    hue: "purple",
    variant: "bold",
    css: {
      color: {
        base: "gray.0",
        _dark: "purple.80"
      },
      bg: {
        base: "purple.50",
        _dark: "purple.20"
      }
    }
  },
  {
    hue: "violet",
    variant: "default",
    css: {
      color: {
        base: "violet.70",
        _dark: "violet.10"
      },
      bg: {
        base: "violet.10",
        _dark: "violet.70"
      }
    }
  },
  {
    hue: "violet",
    variant: "bold",
    css: {
      color: {
        base: "violet.5",
        _dark: "violet.80"
      },
      bg: {
        base: "violet.60",
        _dark: "violet.20"
      }
    }
  },
  {
    hue: "pink",
    variant: "default",
    css: {
      color: {
        base: "pink.70",
        _dark: "pink.10"
      },
      bg: {
        base: "pink.10",
        _dark: "pink.70"
      }
    }
  },
  {
    hue: "pink",
    variant: "bold",
    css: {
      color: {
        base: "pink.5",
        _dark: "pink.80"
      },
      bg: {
        base: "pink.70",
        _dark: "pink.20"
      }
    }
  },
  {
    hue: "rose",
    variant: "default",
    css: {
      color: {
        base: "rose.70",
        _dark: "rose.10"
      },
      bg: {
        base: "rose.10",
        _dark: "rose.70"
      }
    }
  },
  {
    hue: "rose",
    variant: "bold",
    css: {
      color: {
        base: "rose.5",
        _dark: "rose.80"
      },
      bg: {
        base: "rose.60",
        _dark: "rose.20"
      }
    }
  },
  {
    hue: "magenta",
    variant: "default",
    css: {
      color: {
        base: "magenta.70",
        _dark: "magenta.10"
      },
      bg: {
        base: "magenta.10",
        _dark: "magenta.70"
      }
    }
  },
  {
    hue: "magenta",
    variant: "bold",
    css: {
      color: {
        base: "magenta.5",
        _dark: "magenta.80"
      },
      bg: {
        base: "magenta.60",
        _dark: "magenta.20"
      }
    }
  }
]), F0 = {
  variant: [
    "default",
    "bold"
  ],
  hue: [
    "slate",
    "tan",
    "red",
    "tomato",
    "orange",
    "yellow",
    "green",
    "grass",
    "mint",
    "cyan",
    "blue",
    "indigo",
    "purple",
    "violet",
    "pink",
    "rose",
    "magenta"
  ],
  iconPosition: [
    "left",
    "right"
  ],
  hasIcon: [
    "true",
    "false"
  ]
}, t0 = Object.keys(F0), r6 = /* @__PURE__ */ Object.assign(y(w1.recipeFn), {
  __recipe__: !0,
  __name__: "tag",
  __getCompoundVariantCss__: w1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: t0,
  variantMap: F0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, t0);
  },
  getVariantProps: w1.getVariantProps
}), v1 = /* @__PURE__ */ q("text", {
  family: "sans"
}, []), W0 = {
  family: [
    "sans",
    "serif",
    "mono"
  ],
  bold: [
    "true"
  ],
  italic: [
    "true"
  ],
  underline: [
    "true"
  ]
}, a0 = Object.keys(W0), s6 = /* @__PURE__ */ Object.assign(y(v1.recipeFn), {
  __recipe__: !0,
  __name__: "text",
  __getCompoundVariantCss__: v1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: a0,
  variantMap: W0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, a0);
  },
  getVariantProps: v1.getVariantProps
}), g1 = /* @__PURE__ */ q("textarea", {
  stacked: !0,
  internalLabel: !1,
  autoGrow: !1
}, []), N0 = {
  autoGrow: [
    "false",
    "true"
  ],
  stacked: [
    "true",
    "false"
  ],
  internalLabel: [
    "false",
    "true"
  ]
}, o0 = Object.keys(N0), n6 = /* @__PURE__ */ Object.assign(y(g1.recipeFn), {
  __recipe__: !0,
  __name__: "textarea",
  __getCompoundVariantCss__: g1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: o0,
  variantMap: N0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, o0);
  },
  getVariantProps: g1.getVariantProps
}), b1 = /* @__PURE__ */ q("textinput", {
  size: "medium"
}, []), D0 = {
  size: [
    "medium",
    "small",
    "large"
  ],
  autoSize: [
    "true"
  ]
}, e0 = Object.keys(D0), l6 = /* @__PURE__ */ Object.assign(y(b1.recipeFn), {
  __recipe__: !0,
  __name__: "textinput",
  __getCompoundVariantCss__: b1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: e0,
  variantMap: D0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, e0);
  },
  getVariantProps: b1.getVariantProps
}), u1 = /* @__PURE__ */ q("toggle-input", {}, []), K0 = {}, r0 = Object.keys(K0), i6 = /* @__PURE__ */ Object.assign(y(u1.recipeFn), {
  __recipe__: !0,
  __name__: "toggleInput",
  __getCompoundVariantCss__: u1.__getCompoundVariantCss__,
  raw: (t) => t,
  variantKeys: r0,
  variantMap: K0,
  merge(t) {
    return z(this, t);
  },
  splitVariantProps(t) {
    return u(t, r0);
  },
  getVariantProps: u1.getVariantProps
}), Q0 = {}, d6 = [], c6 = [
  [
    "container",
    "checkbox__container"
  ],
  [
    "input",
    "checkbox__input"
  ],
  [
    "indicator",
    "checkbox__indicator"
  ]
], m6 = /* @__PURE__ */ c6.map(([t, a]) => [t, q(a, Q0, Y(d6, t))]), h6 = y((t = {}) => Object.fromEntries(m6.map(([a, o]) => [a, o.recipeFn(t)]))), s0 = [], p6 = (t) => ({ ...Q0, ...j(t) }), w6 = /* @__PURE__ */ Object.assign(h6, {
  __recipe__: !1,
  __name__: "checkbox",
  raw: (t) => t,
  classNameMap: {},
  variantKeys: s0,
  variantMap: {},
  splitVariantProps(t) {
    return u(t, s0);
  },
  getVariantProps: p6
}), X0 = {}, v6 = [], g6 = [
  [
    "container",
    "radio__container"
  ],
  [
    "input",
    "radio__input"
  ],
  [
    "indicator",
    "radio__indicator"
  ]
], b6 = /* @__PURE__ */ g6.map(([t, a]) => [t, q(a, X0, Y(v6, t))]), u6 = y((t = {}) => Object.fromEntries(b6.map(([a, o]) => [a, o.recipeFn(t)]))), n0 = [], y6 = (t) => ({ ...X0, ...j(t) }), x6 = /* @__PURE__ */ Object.assign(u6, {
  __recipe__: !1,
  __name__: "radio",
  raw: (t) => t,
  classNameMap: {},
  variantKeys: n0,
  variantMap: {},
  splitVariantProps(t) {
    return u(t, n0);
  },
  getVariantProps: y6
}), Y0 = {
  position: "bottom"
}, f6 = [
  {
    position: [
      "top",
      "top-start",
      "top-end"
    ],
    caret: !0,
    css: {
      tooltipContent: {
        mb: "12"
      }
    }
  },
  {
    position: [
      "top",
      "top-start",
      "top-end"
    ],
    caret: !1,
    css: {
      tooltipContent: {
        mb: "8"
      }
    }
  },
  {
    position: [
      "bottom",
      "bottom-start",
      "bottom-end"
    ],
    caret: !0,
    css: {
      tooltipContent: {
        mt: "12"
      }
    }
  },
  {
    position: [
      "bottom",
      "bottom-start",
      "bottom-end"
    ],
    caret: !1,
    css: {
      tooltipContent: {
        mt: "8"
      }
    }
  },
  {
    position: [
      "left",
      "left-start",
      "left-end"
    ],
    caret: !0,
    css: {
      tooltipContent: {
        mr: "12"
      }
    }
  },
  {
    position: [
      "left",
      "left-start",
      "left-end"
    ],
    caret: !1,
    css: {
      tooltipContent: {
        mr: "8"
      }
    }
  },
  {
    position: [
      "right",
      "right-start",
      "right-end"
    ],
    caret: !0,
    css: {
      tooltipContent: {
        ml: "12"
      }
    }
  },
  {
    position: [
      "right",
      "right-start",
      "right-end"
    ],
    caret: !1,
    css: {
      tooltipContent: {
        ml: "8"
      }
    }
  }
], _6 = [
  [
    "wrapper",
    "tooltip__wrapper"
  ],
  [
    "tooltipContent",
    "tooltip__tooltipContent"
  ]
], q6 = /* @__PURE__ */ _6.map(([t, a]) => [t, q(a, Y0, Y(f6, t))]), k6 = y((t = {}) => Object.fromEntries(q6.map(([a, o]) => [a, o.recipeFn(t)]))), l0 = [
  "position",
  "caret"
], z6 = (t) => ({ ...Y0, ...j(t) }), V6 = /* @__PURE__ */ Object.assign(k6, {
  __recipe__: !1,
  __name__: "tooltip",
  raw: (t) => t,
  classNameMap: {},
  variantKeys: l0,
  variantMap: {
    position: [
      "top",
      "bottom",
      "left",
      "right",
      "top-start",
      "bottom-start",
      "left-start",
      "right-start",
      "top-end",
      "bottom-end",
      "left-end",
      "right-end"
    ],
    caret: [
      "true",
      "false"
    ]
  },
  splitVariantProps(t) {
    return u(t, l0);
  },
  getVariantProps: z6
}), G0 = {
  iconPlacement: "left",
  multiSelectType: "checkbox"
}, M6 = [], B6 = [
  [
    "wrapper",
    "menu__wrapper"
  ],
  [
    "sectionTitle",
    "menu__sectionTitle"
  ],
  [
    "menuItem",
    "menu__menuItem"
  ],
  [
    "menuLabel",
    "menu__menuLabel"
  ],
  [
    "menuDescription",
    "menu__menuDescription"
  ],
  [
    "parentLabel",
    "menu__parentLabel"
  ],
  [
    "multiLevelIcon",
    "menu__multiLevelIcon"
  ],
  [
    "dividerSection",
    "menu__dividerSection"
  ],
  [
    "spacerSection",
    "menu__spacerSection"
  ],
  [
    "wrapperInner",
    "menu__wrapperInner"
  ],
  [
    "iconSection",
    "menu__iconSection"
  ],
  [
    "toggleMenu",
    "menu__toggleMenu"
  ]
], S6 = /* @__PURE__ */ B6.map(([t, a]) => [t, q(a, G0, Y(M6, t))]), C6 = y((t = {}) => Object.fromEntries(S6.map(([a, o]) => [a, o.recipeFn(t)]))), i0 = [
  "iconPlacement",
  "multiSelectType"
], H6 = (t) => ({ ...G0, ...j(t) }), L6 = /* @__PURE__ */ Object.assign(C6, {
  __recipe__: !1,
  __name__: "menu",
  raw: (t) => t,
  classNameMap: {},
  variantKeys: i0,
  variantMap: {
    iconPlacement: [
      "left",
      "right"
    ],
    multiSelectType: [
      "toggle",
      "checkbox"
    ]
  },
  splitVariantProps(t) {
    return u(t, i0);
  },
  getVariantProps: H6
}), $0 = {}, P6 = [], T6 = [
  [
    "container",
    "toggle__container"
  ],
  [
    "input",
    "toggle__input"
  ],
  [
    "indicator",
    "toggle__indicator"
  ],
  [
    "background",
    "toggle__background"
  ]
], A6 = /* @__PURE__ */ T6.map(([t, a]) => [t, q(a, $0, Y(P6, t))]), I6 = y((t = {}) => Object.fromEntries(A6.map(([a, o]) => [a, o.recipeFn(t)]))), d0 = [], E6 = (t) => ({ ...$0, ...j(t) }), O6 = /* @__PURE__ */ Object.assign(I6, {
  __recipe__: !1,
  __name__: "toggle",
  raw: (t) => t,
  classNameMap: {},
  variantKeys: d0,
  variantMap: {},
  splitVariantProps(t) {
    return u(t, d0);
  },
  getVariantProps: E6
});
var R6 = "css,pos,insetX,insetY,insetEnd,end,insetStart,start,flexDir,p,pl,pr,pt,pb,py,paddingY,paddingX,px,pe,paddingEnd,ps,paddingStart,ml,mr,mt,mb,m,my,marginY,mx,marginX,me,marginEnd,ms,marginStart,ringWidth,ringColor,ring,ringOffset,w,minW,maxW,h,minH,maxH,textShadowColor,bgPosition,bgPositionX,bgPositionY,bgAttachment,bgClip,bg,bgColor,bgOrigin,bgImage,bgRepeat,bgBlendMode,bgSize,bgGradient,bgLinear,bgRadial,bgConic,rounded,roundedTopLeft,roundedTopRight,roundedBottomRight,roundedBottomLeft,roundedTop,roundedRight,roundedBottom,roundedLeft,roundedStartStart,roundedStartEnd,roundedStart,roundedEndStart,roundedEndEnd,roundedEnd,borderX,borderXWidth,borderXColor,borderY,borderYWidth,borderYColor,borderStart,borderStartWidth,borderStartColor,borderEnd,borderEndWidth,borderEndColor,shadow,shadowColor,x,y,z,scrollMarginY,scrollMarginX,scrollPaddingY,scrollPaddingX,aspectRatio,boxDecorationBreak,zIndex,boxSizing,objectPosition,objectFit,overscrollBehavior,overscrollBehaviorX,overscrollBehaviorY,position,top,left,inset,insetInline,insetBlock,insetBlockEnd,insetBlockStart,insetInlineEnd,insetInlineStart,right,bottom,float,visibility,display,hideFrom,hideBelow,flexBasis,flex,flexDirection,flexGrow,flexShrink,gridTemplateColumns,gridTemplateRows,gridColumn,gridRow,gridColumnStart,gridColumnEnd,gridAutoFlow,gridAutoColumns,gridAutoRows,gap,gridGap,gridRowGap,gridColumnGap,rowGap,columnGap,justifyContent,alignContent,alignItems,alignSelf,padding,paddingLeft,paddingRight,paddingTop,paddingBottom,paddingBlock,paddingBlockEnd,paddingBlockStart,paddingInline,paddingInlineEnd,paddingInlineStart,marginLeft,marginRight,marginTop,marginBottom,margin,marginBlock,marginBlockEnd,marginBlockStart,marginInline,marginInlineEnd,marginInlineStart,spaceX,spaceY,outlineWidth,outlineColor,outline,outlineOffset,focusRing,focusVisibleRing,focusRingColor,focusRingOffset,focusRingWidth,focusRingStyle,divideX,divideY,divideColor,divideStyle,width,inlineSize,minWidth,minInlineSize,maxWidth,maxInlineSize,height,blockSize,minHeight,minBlockSize,maxHeight,maxBlockSize,boxSize,color,fontFamily,fontSize,fontSizeAdjust,fontPalette,fontKerning,fontFeatureSettings,fontWeight,fontSmoothing,fontVariant,fontVariantAlternates,fontVariantCaps,fontVariationSettings,fontVariantNumeric,letterSpacing,lineHeight,textAlign,textDecoration,textDecorationColor,textEmphasisColor,textDecorationStyle,textDecorationThickness,textUnderlineOffset,textTransform,textIndent,textShadow,textOverflow,verticalAlign,wordBreak,textWrap,truncate,lineClamp,listStyleType,listStylePosition,listStyleImage,listStyle,backgroundPosition,backgroundPositionX,backgroundPositionY,backgroundAttachment,backgroundClip,background,backgroundColor,backgroundOrigin,backgroundImage,backgroundRepeat,backgroundBlendMode,backgroundSize,backgroundGradient,backgroundLinear,backgroundRadial,backgroundConic,textGradient,gradientFromPosition,gradientToPosition,gradientFrom,gradientTo,gradientVia,gradientViaPosition,borderRadius,borderTopLeftRadius,borderTopRightRadius,borderBottomRightRadius,borderBottomLeftRadius,borderTopRadius,borderRightRadius,borderBottomRadius,borderLeftRadius,borderStartStartRadius,borderStartEndRadius,borderStartRadius,borderEndStartRadius,borderEndEndRadius,borderEndRadius,border,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,borderBlockStartWidth,borderBlockEndWidth,borderColor,borderInline,borderInlineWidth,borderInlineColor,borderBlock,borderBlockWidth,borderBlockColor,borderLeft,borderLeftColor,borderInlineStart,borderInlineStartWidth,borderInlineStartColor,borderRight,borderRightColor,borderInlineEnd,borderInlineEndWidth,borderInlineEndColor,borderTop,borderTopColor,borderBottom,borderBottomColor,borderBlockEnd,borderBlockEndColor,borderBlockStart,borderBlockStartColor,opacity,boxShadow,boxShadowColor,mixBlendMode,filter,brightness,contrast,grayscale,hueRotate,invert,saturate,sepia,dropShadow,blur,backdropFilter,backdropBlur,backdropBrightness,backdropContrast,backdropGrayscale,backdropHueRotate,backdropInvert,backdropOpacity,backdropSaturate,backdropSepia,borderCollapse,borderSpacing,borderSpacingX,borderSpacingY,tableLayout,transitionTimingFunction,transitionDelay,transitionDuration,transitionProperty,transition,animation,animationName,animationTimingFunction,animationDuration,animationDelay,animationPlayState,animationComposition,animationFillMode,animationDirection,animationIterationCount,animationRange,animationState,animationRangeStart,animationRangeEnd,animationTimeline,transformOrigin,transformBox,transformStyle,transform,rotate,rotateX,rotateY,rotateZ,scale,scaleX,scaleY,translate,translateX,translateY,translateZ,accentColor,caretColor,scrollBehavior,scrollbar,scrollbarColor,scrollbarGutter,scrollbarWidth,scrollMargin,scrollMarginLeft,scrollMarginRight,scrollMarginTop,scrollMarginBottom,scrollMarginBlock,scrollMarginBlockEnd,scrollMarginBlockStart,scrollMarginInline,scrollMarginInlineEnd,scrollMarginInlineStart,scrollPadding,scrollPaddingBlock,scrollPaddingBlockStart,scrollPaddingBlockEnd,scrollPaddingInline,scrollPaddingInlineEnd,scrollPaddingInlineStart,scrollPaddingLeft,scrollPaddingRight,scrollPaddingTop,scrollPaddingBottom,scrollSnapAlign,scrollSnapStop,scrollSnapType,scrollSnapStrictness,scrollSnapMargin,scrollSnapMarginTop,scrollSnapMarginBottom,scrollSnapMarginLeft,scrollSnapMarginRight,scrollSnapCoordinate,scrollSnapDestination,scrollSnapPointsX,scrollSnapPointsY,scrollSnapTypeX,scrollSnapTypeY,scrollTimeline,scrollTimelineAxis,scrollTimelineName,touchAction,userSelect,overflow,overflowWrap,overflowX,overflowY,overflowAnchor,overflowBlock,overflowInline,overflowClipBox,overflowClipMargin,overscrollBehaviorBlock,overscrollBehaviorInline,fill,stroke,strokeWidth,strokeDasharray,strokeDashoffset,strokeLinecap,strokeLinejoin,strokeMiterlimit,strokeOpacity,srOnly,debug,appearance,backfaceVisibility,clipPath,hyphens,mask,maskImage,maskSize,textSizeAdjust,container,containerName,containerType,cursor,colorPalette,_hover,_focus,_focusWithin,_focusVisible,_disabled,_active,_visited,_target,_readOnly,_readWrite,_empty,_checked,_enabled,_expanded,_highlighted,_complete,_incomplete,_dragging,_before,_after,_firstLetter,_firstLine,_marker,_selection,_file,_backdrop,_first,_last,_only,_even,_odd,_firstOfType,_lastOfType,_onlyOfType,_peerFocus,_peerHover,_peerActive,_peerFocusWithin,_peerFocusVisible,_peerDisabled,_peerChecked,_peerInvalid,_peerExpanded,_peerPlaceholderShown,_groupFocus,_groupHover,_groupActive,_groupFocusWithin,_groupFocusVisible,_groupDisabled,_groupChecked,_groupExpanded,_groupInvalid,_indeterminate,_required,_valid,_invalid,_autofill,_inRange,_outOfRange,_placeholder,_placeholderShown,_pressed,_selected,_grabbed,_underValue,_overValue,_atValue,_default,_optional,_open,_closed,_fullscreen,_loading,_hidden,_current,_currentPage,_currentStep,_today,_unavailable,_rangeStart,_rangeEnd,_now,_topmost,_motionReduce,_motionSafe,_print,_landscape,_portrait,_dark,_light,_osDark,_osLight,_highContrast,_lessContrast,_moreContrast,_ltr,_rtl,_scrollbar,_scrollbarThumb,_scrollbarTrack,_horizontal,_vertical,_icon,_starting,_noscript,_invertedColors,_collapsed,xs,xsOnly,xsDown,sm,smOnly,smDown,md,mdOnly,mdDown,lg,lgOnly,lgDown,xl,xlOnly,xlDown,2xl,2xlOnly,2xlDown,xsToSm,xsToMd,xsToLg,xsToXl,xsTo2xl,smToMd,smToLg,smToXl,smTo2xl,mdToLg,mdToXl,mdTo2xl,lgToXl,lgTo2xl,xlTo2xl,@/xs,@/sm,@/md,@/lg,@/xl,@/2xl,@/3xl,@/4xl,@/5xl,@/6xl,@/7xl,@/8xl,textStyle", j6 = R6.split(","), F6 = "WebkitAppearance,WebkitBorderBefore,WebkitBorderBeforeColor,WebkitBorderBeforeStyle,WebkitBorderBeforeWidth,WebkitBoxReflect,WebkitLineClamp,WebkitMask,WebkitMaskAttachment,WebkitMaskClip,WebkitMaskComposite,WebkitMaskImage,WebkitMaskOrigin,WebkitMaskPosition,WebkitMaskPositionX,WebkitMaskPositionY,WebkitMaskRepeat,WebkitMaskRepeatX,WebkitMaskRepeatY,WebkitMaskSize,WebkitOverflowScrolling,WebkitTapHighlightColor,WebkitTextFillColor,WebkitTextStroke,WebkitTextStrokeColor,WebkitTextStrokeWidth,WebkitTouchCallout,WebkitUserModify,WebkitUserSelect,accentColor,alignContent,alignItems,alignSelf,alignTracks,all,anchorName,anchorScope,animation,animationComposition,animationDelay,animationDirection,animationDuration,animationFillMode,animationIterationCount,animationName,animationPlayState,animationRange,animationRangeEnd,animationRangeStart,animationTimeline,animationTimingFunction,appearance,aspectRatio,backdropFilter,backfaceVisibility,background,backgroundAttachment,backgroundBlendMode,backgroundClip,backgroundColor,backgroundImage,backgroundOrigin,backgroundPosition,backgroundPositionX,backgroundPositionY,backgroundRepeat,backgroundSize,blockSize,border,borderBlock,borderBlockColor,borderBlockEnd,borderBlockEndColor,borderBlockEndStyle,borderBlockEndWidth,borderBlockStart,borderBlockStartColor,borderBlockStartStyle,borderBlockStartWidth,borderBlockStyle,borderBlockWidth,borderBottom,borderBottomColor,borderBottomLeftRadius,borderBottomRightRadius,borderBottomStyle,borderBottomWidth,borderCollapse,borderColor,borderEndEndRadius,borderEndStartRadius,borderImage,borderImageOutset,borderImageRepeat,borderImageSlice,borderImageSource,borderImageWidth,borderInline,borderInlineColor,borderInlineEnd,borderInlineEndColor,borderInlineEndStyle,borderInlineEndWidth,borderInlineStart,borderInlineStartColor,borderInlineStartStyle,borderInlineStartWidth,borderInlineStyle,borderInlineWidth,borderLeft,borderLeftColor,borderLeftStyle,borderLeftWidth,borderRadius,borderRight,borderRightColor,borderRightStyle,borderRightWidth,borderSpacing,borderStartEndRadius,borderStartStartRadius,borderStyle,borderTop,borderTopColor,borderTopLeftRadius,borderTopRightRadius,borderTopStyle,borderTopWidth,borderWidth,bottom,boxAlign,boxDecorationBreak,boxDirection,boxFlex,boxFlexGroup,boxLines,boxOrdinalGroup,boxOrient,boxPack,boxShadow,boxSizing,breakAfter,breakBefore,breakInside,captionSide,caret,caretColor,caretShape,clear,clip,clipPath,clipRule,color,colorInterpolationFilters,colorScheme,columnCount,columnFill,columnGap,columnRule,columnRuleColor,columnRuleStyle,columnRuleWidth,columnSpan,columnWidth,columns,contain,containIntrinsicBlockSize,containIntrinsicHeight,containIntrinsicInlineSize,containIntrinsicSize,containIntrinsicWidth,container,containerName,containerType,content,contentVisibility,counterIncrement,counterReset,counterSet,cursor,cx,cy,d,direction,display,dominantBaseline,emptyCells,fieldSizing,fill,fillOpacity,fillRule,filter,flex,flexBasis,flexDirection,flexFlow,flexGrow,flexShrink,flexWrap,float,floodColor,floodOpacity,font,fontFamily,fontFeatureSettings,fontKerning,fontLanguageOverride,fontOpticalSizing,fontPalette,fontSize,fontSizeAdjust,fontSmooth,fontStretch,fontStyle,fontSynthesis,fontSynthesisPosition,fontSynthesisSmallCaps,fontSynthesisStyle,fontSynthesisWeight,fontVariant,fontVariantAlternates,fontVariantCaps,fontVariantEastAsian,fontVariantEmoji,fontVariantLigatures,fontVariantNumeric,fontVariantPosition,fontVariationSettings,fontWeight,forcedColorAdjust,gap,grid,gridArea,gridAutoColumns,gridAutoFlow,gridAutoRows,gridColumn,gridColumnEnd,gridColumnGap,gridColumnStart,gridGap,gridRow,gridRowEnd,gridRowGap,gridRowStart,gridTemplate,gridTemplateAreas,gridTemplateColumns,gridTemplateRows,hangingPunctuation,height,hyphenateCharacter,hyphenateLimitChars,hyphens,imageOrientation,imageRendering,imageResolution,imeMode,initialLetter,initialLetterAlign,inlineSize,inset,insetBlock,insetBlockEnd,insetBlockStart,insetInline,insetInlineEnd,insetInlineStart,interpolateSize,isolation,justifyContent,justifyItems,justifySelf,justifyTracks,left,letterSpacing,lightingColor,lineBreak,lineClamp,lineHeight,lineHeightStep,listStyle,listStyleImage,listStylePosition,listStyleType,margin,marginBlock,marginBlockEnd,marginBlockStart,marginBottom,marginInline,marginInlineEnd,marginInlineStart,marginLeft,marginRight,marginTop,marginTrim,marker,markerEnd,markerMid,markerStart,mask,maskBorder,maskBorderMode,maskBorderOutset,maskBorderRepeat,maskBorderSlice,maskBorderSource,maskBorderWidth,maskClip,maskComposite,maskImage,maskMode,maskOrigin,maskPosition,maskRepeat,maskSize,maskType,masonryAutoFlow,mathDepth,mathShift,mathStyle,maxBlockSize,maxHeight,maxInlineSize,maxLines,maxWidth,minBlockSize,minHeight,minInlineSize,minWidth,mixBlendMode,objectFit,objectPosition,offset,offsetAnchor,offsetDistance,offsetPath,offsetPosition,offsetRotate,opacity,order,orphans,outline,outlineColor,outlineOffset,outlineStyle,outlineWidth,overflow,overflowAnchor,overflowBlock,overflowClipBox,overflowClipMargin,overflowInline,overflowWrap,overflowX,overflowY,overlay,overscrollBehavior,overscrollBehaviorBlock,overscrollBehaviorInline,overscrollBehaviorX,overscrollBehaviorY,padding,paddingBlock,paddingBlockEnd,paddingBlockStart,paddingBottom,paddingInline,paddingInlineEnd,paddingInlineStart,paddingLeft,paddingRight,paddingTop,page,pageBreakAfter,pageBreakBefore,pageBreakInside,paintOrder,perspective,perspectiveOrigin,placeContent,placeItems,placeSelf,pointerEvents,position,positionAnchor,positionArea,positionTry,positionTryFallbacks,positionTryOrder,positionVisibility,printColorAdjust,quotes,r,resize,right,rotate,rowGap,rubyAlign,rubyMerge,rubyPosition,rx,ry,scale,scrollBehavior,scrollMargin,scrollMarginBlock,scrollMarginBlockEnd,scrollMarginBlockStart,scrollMarginBottom,scrollMarginInline,scrollMarginInlineEnd,scrollMarginInlineStart,scrollMarginLeft,scrollMarginRight,scrollMarginTop,scrollPadding,scrollPaddingBlock,scrollPaddingBlockEnd,scrollPaddingBlockStart,scrollPaddingBottom,scrollPaddingInline,scrollPaddingInlineEnd,scrollPaddingInlineStart,scrollPaddingLeft,scrollPaddingRight,scrollPaddingTop,scrollSnapAlign,scrollSnapCoordinate,scrollSnapDestination,scrollSnapPointsX,scrollSnapPointsY,scrollSnapStop,scrollSnapType,scrollSnapTypeX,scrollSnapTypeY,scrollTimeline,scrollTimelineAxis,scrollTimelineName,scrollbarColor,scrollbarGutter,scrollbarWidth,shapeImageThreshold,shapeMargin,shapeOutside,shapeRendering,stopColor,stopOpacity,stroke,strokeDasharray,strokeDashoffset,strokeLinecap,strokeLinejoin,strokeMiterlimit,strokeOpacity,strokeWidth,tabSize,tableLayout,textAlign,textAlignLast,textAnchor,textBox,textBoxEdge,textBoxTrim,textCombineUpright,textDecoration,textDecorationColor,textDecorationLine,textDecorationSkip,textDecorationSkipInk,textDecorationStyle,textDecorationThickness,textEmphasis,textEmphasisColor,textEmphasisPosition,textEmphasisStyle,textIndent,textJustify,textOrientation,textOverflow,textRendering,textShadow,textSizeAdjust,textSpacingTrim,textTransform,textUnderlineOffset,textUnderlinePosition,textWrap,textWrapMode,textWrapStyle,timelineScope,top,touchAction,transform,transformBox,transformOrigin,transformStyle,transition,transitionBehavior,transitionDelay,transitionDuration,transitionProperty,transitionTimingFunction,translate,unicodeBidi,userSelect,vectorEffect,verticalAlign,viewTimeline,viewTimelineAxis,viewTimelineInset,viewTimelineName,viewTransitionName,visibility,whiteSpace,whiteSpaceCollapse,widows,width,willChange,wordBreak,wordSpacing,wordWrap,writingMode,x,y,zIndex,zoom,alignmentBaseline,baselineShift,colorInterpolation,colorRendering,glyphOrientationVertical", W6 = F6.split(",").concat(j6), N6 = new Map(W6.map((t) => [t, !0])), D6 = /&|@/, H1 = /* @__PURE__ */ y((t) => N6.has(t) || t.startsWith("--") || D6.test(t));
const U0 = (t) => u(t, H1), K6 = (t, a) => !a.includes(t) && !H1(t), Q6 = (t, a) => t.__shouldForwardProps__ && a ? (o) => t.__shouldForwardProps__(o) && a(o) : a, X6 = (t, a) => {
  var e;
  if (t && !a) return t;
  if (!t && a) return a;
  if (t.__cva__ && a.__cva__ || t.__recipe__ && a.__recipe__) return t.merge(a);
  const o = new TypeError("Cannot merge cva with recipe. Please use either cva or recipe.");
  throw (e = TypeError.captureStackTrace) == null || e.call(TypeError, o), o;
}, Y6 = (t) => typeof t == "string" ? t : (t == null ? void 0 : t.displayName) || (t == null ? void 0 : t.name) || "Component";
function y1(t, a = {}, o = {}) {
  const e = a.__cva__ || a.__recipe__ ? a : z0(a), r = o.shouldForwardProp || K6, s = (g) => {
    var b;
    return (b = o.forwardProps) != null && b.includes(g) ? !0 : r(g, e.variantKeys);
  }, n = Object.assign(
    o.dataAttr && a.__name__ ? { "data-recipe": a.__name__ } : {},
    o.defaultProps
  ), l = X6(t.__cva__, e), h = Q6(t, s), p = t.__base__ || t, w = /* @__PURE__ */ z1(function(b, C) {
    const { as: P = p, unstyled: M, children: A, ...k } = b, E = P1(() => Object.assign({}, n, k), [k]), [R, W, N, d, f] = P1(() => u(E, f1.keys, h, l.variantKeys, H1), [E]);
    function c() {
      var K;
      const { css: B, ...L } = d, D = (K = l.__getCompoundVariantCss__) == null ? void 0 : K.call(l, N);
      return _(l(N, !1), O(D, L, B), E.className);
    }
    function H() {
      const { css: B, ...L } = d, D = l.raw(N);
      return _(O(D, L, B), E.className);
    }
    const m = () => {
      if (M) {
        const { css: B, ...L } = d;
        return _(O(L, B), E.className);
      }
      return a.__recipe__ ? c() : H();
    };
    return Z(P, {
      ref: C,
      ...W,
      ...f,
      ...f1(R),
      className: m()
    }, A ?? E.children);
  }), x = Y6(p);
  return w.displayName = `styled.${x}`, w.__cva__ = l, w.__base__ = p, w.__shouldForwardProps__ = s, w;
}
function G6() {
  const t = /* @__PURE__ */ new Map();
  return new Proxy(y1, {
    apply(a, o, e) {
      return y1(...e);
    },
    get(a, o) {
      return t.has(o) || t.set(o, y1(o)), t.get(o);
    }
  });
}
const Z0 = /* @__PURE__ */ G6(), c0 = {
  transform(t) {
    const { size: a, ...o } = t;
    return {
      width: a,
      height: a,
      ...o
    };
  }
}, J0 = (t = {}) => {
  const a = C1(c0, t);
  return c0.transform(a, S1);
}, t2 = (t) => O(J0(t));
t2.raw = J0;
const m0 = {
  transform(t) {
    const { justify: a, gap: o, ...e } = t;
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: a,
      gap: o,
      flexDirection: "row",
      ...e
    };
  },
  defaultValues: { gap: "8px" }
}, $6 = (t = {}) => {
  const a = C1(m0, t);
  return m0.transform(a, S1);
}, U6 = /* @__PURE__ */ z1(function(a, o) {
  const [e, r] = u(a, ["justify", "gap"]), s = $6(e), n = { ref: o, ...s, ...r };
  return Z(Z0.div, n);
}), h0 = {
  transform(t, { map: a, isCssUnit: o }) {
    const { columnGap: e, rowGap: r, gap: s, columns: n, minChildWidth: l, ...h } = t, p = (w) => o(w) ? w : `token(sizes.${w}, ${w})`;
    return {
      display: "grid",
      gridTemplateColumns: n != null ? a(n, (w) => `repeat(${w}, minmax(0, 1fr))`) : l != null ? a(l, (w) => `repeat(auto-fit, minmax(${p(w)}, 1fr))`) : void 0,
      gap: s,
      columnGap: e,
      rowGap: r,
      ...h
    };
  },
  defaultValues(t) {
    return { gap: t.columnGap || t.rowGap ? void 0 : "8px" };
  }
}, Z6 = (t = {}) => {
  const a = C1(h0, t);
  return h0.transform(a, S1);
}, J6 = /* @__PURE__ */ z1(function(a, o) {
  const [e, r] = u(a, ["gap", "columnGap", "rowGap", "columns", "minChildWidth"]), s = Z6(e), n = { ref: o, ...s, ...r };
  return Z(Z0.div, n);
}), S = (t) => {
  const [a, o] = U0(t), { css: e, ...r } = a, s = O(e, r), n = o.className || "", l = _(n, s), { className: h, ...p } = o;
  return [l, p];
}, v = ({ as: t = "div", ...a }) => {
  const [o, e] = S(a), r = _(D2({}), o);
  return Z(t, {
    className: r,
    ...e
  });
}, I = ({
  as: t = "p",
  italic: a,
  family: o,
  bold: e,
  underline: r,
  size: s,
  weight: n,
  children: l,
  ...h
}) => {
  const [p, w] = S(h);
  return /* @__PURE__ */ i(
    v,
    {
      as: t,
      className: _(
        s6({ family: o, bold: e, underline: r, italic: a }),
        p
      ),
      fontSize: s,
      fontWeight: n,
      ...w,
      children: l
    }
  );
}, t5 = ({
  size: t,
  ...a
}) => {
  const [o, e] = S(a);
  return /* @__PURE__ */ i(
    v,
    {
      as: "div",
      className: _(e6({ size: t }), o),
      ...e
    }
  );
}, a2 = ({
  loading: t,
  children: a
}) => /* @__PURE__ */ V(w0, { children: [
  /* @__PURE__ */ i(U6, { gap: "2", opacity: t ? 0 : 1, children: a }),
  t && /* @__PURE__ */ i(
    J6,
    {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      placeItems: "center",
      children: /* @__PURE__ */ i(t5, {})
    }
  )
] }), h5 = k1.forwardRef(
  ({
    variant: t,
    size: a,
    href: o,
    className: e,
    children: r,
    loading: s,
    disabled: n,
    ...l
  }, h) => {
    const p = s || n, w = o ? "a" : "button";
    return (
      // @ts-ignore
      /* @__PURE__ */ i(
        v,
        {
          as: w,
          ref: h,
          href: o,
          disabled: p,
          "aria-disabled": p,
          className: _(Q2({ variant: t, size: a }), e),
          type: w === "button" ? "button" : void 0,
          ...l,
          children: /* @__PURE__ */ i(w0, { children: /* @__PURE__ */ i(a2, { loading: !!s, children: r }) })
        }
      )
    );
  }
), p5 = k1.forwardRef(
  ({ variant: t, size: a, className: o, children: e, ...r }, s) => (
    // @ts-ignore
    /* @__PURE__ */ i(
      v,
      {
        as: "span",
        ref: s,
        className: _(N2({ variant: t, size: a }), o),
        ...r,
        children: e
      }
    )
  )
), a5 = '<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><symbol viewBox="0 0 24 24" id="Building" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18.25 19.5v-15h1.25V3.25h-15V4.5h1.25v15H3v1.25h18V19.5zM7.75 6.37h3.12v1.25H7.75zm0 3.13h3.12v1.25H7.75zm0 3.13h3.12v1.25H7.75zm6.13 6.87h-3.75v-3.12h3.75zm2.37-5.63h-3.12v-1.25h3.12zm0-3.12h-3.12V9.5h3.12zm0-3.12h-3.12V6.38h3.12z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="aa-placeholder" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M17.5 4.5h-11c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-11c0-1.1-.9-2-2-2M6.17 12.22l6.05-6.05h4.44L6.17 16.66zm11.66-4.88v4.44l-6.05 6.05H7.34zM6.5 6.17h4.3L6.17 10.8V6.5c0-.18.15-.33.33-.33m11 11.66h-4.3l4.64-4.64v4.3c0 .18-.15.33-.33.33z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="alarm" xmlns="http://www.w3.org/2000/svg"><path d="M12 19.493a7.3 7.3 0 0 1-2.927-.593 7.6 7.6 0 0 1-2.375-1.605 7.6 7.6 0 0 1-1.604-2.375 7.3 7.3 0 0 1-.594-2.927q0-1.562.594-2.927.593-1.365 1.604-2.375a7.6 7.6 0 0 1 2.375-1.604A7.3 7.3 0 0 1 12 4.493q1.563 0 2.927.594 1.364.593 2.375 1.604a7.6 7.6 0 0 1 1.604 2.375q.594 1.365.594 2.927a7.3 7.3 0 0 1-.594 2.927 7.6 7.6 0 0 1-1.604 2.375 7.6 7.6 0 0 1-2.375 1.604 7.3 7.3 0 0 1-2.927.594m2.333-4 1.167-1.166-2.667-2.667V7.827h-1.666v4.5zM6.667 3.118l1.166 1.167-3.541 3.542L3.125 6.66zm10.666 0 3.542 3.542-1.167 1.167-3.541-3.542z"/></symbol><symbol viewBox="0 0 24 24" id="alt-route" xmlns="http://www.w3.org/2000/svg"><path d="M11.167 20.333v-4.166q0-1.167-.354-1.73a5.6 5.6 0 0 0-.938-1.104l1.188-1.187q.25.23.479.49t.458.552a6 6 0 0 1 .594-.699q.302-.301.614-.593a9.5 9.5 0 0 0 1.438-1.688q.646-.958.687-3.354l-1.312 1.313L12.833 7l3.334-3.333L19.5 7l-1.167 1.167L17 6.854q-.041 2.98-.917 4.24-.874 1.26-1.75 2.052a8 8 0 0 0-1.083 1.177q-.417.572-.417 1.844v4.166zm-4-11.52a7 7 0 0 1-.115-.917q-.03-.5-.052-1.042L5.667 8.167 4.5 7l3.333-3.333L11.167 7 9.979 8.167 8.667 6.875q0 .438.041.823.042.385.084.719zm1.791 3.666a7.4 7.4 0 0 1-.802-1.02 6.3 6.3 0 0 1-.677-1.438l1.604-.396a4.4 4.4 0 0 0 1.063 1.667z"/></symbol><symbol viewBox="0 0 24 24" id="apps" xmlns="http://www.w3.org/2000/svg"><path d="M7 18.667q-.687 0-1.177-.49A1.6 1.6 0 0 1 5.333 17q0-.687.49-1.177T7 15.333t1.177.49.49 1.177-.49 1.177-1.177.49m5 0q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177q0-.687.49-1.177t1.177-.49 1.177.49.49 1.177-.49 1.177-1.177.49m5 0q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177q0-.687.49-1.177t1.177-.49 1.177.49.49 1.177-.49 1.177-1.177.49m-10-5q-.687 0-1.177-.49A1.6 1.6 0 0 1 5.333 12q0-.687.49-1.177T7 10.333t1.177.49.49 1.177-.49 1.177-1.177.49m5 0q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177q0-.687.49-1.177t1.177-.49 1.177.49.49 1.177-.49 1.177-1.177.49m5 0q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177q0-.687.49-1.177t1.177-.49 1.177.49.49 1.177-.49 1.177-1.177.49m-10-5q-.687 0-1.177-.49A1.6 1.6 0 0 1 5.333 7q0-.687.49-1.177T7 5.333t1.177.49T8.667 7t-.49 1.177T7 8.667m5 0q-.687 0-1.177-.49A1.6 1.6 0 0 1 10.333 7q0-.687.49-1.177T12 5.333t1.177.49.49 1.177-.49 1.177-1.177.49m5 0q-.687 0-1.177-.49A1.6 1.6 0 0 1 15.333 7q0-.687.49-1.177T17 5.333t1.177.49.49 1.177-.49 1.177-1.177.49"/></symbol><symbol viewBox="0 0 24 24" id="arrow-bubble" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.5q1.542 0 2.906.594a7.7 7.7 0 0 1 2.386 1.614 7.7 7.7 0 0 1 1.614 2.386Q19.5 10.458 19.5 12a7.2 7.2 0 0 1-.594 2.906 7.7 7.7 0 0 1-1.614 2.386 7.7 7.7 0 0 1-2.386 1.614A7.2 7.2 0 0 1 12 19.5q-.854 0-1.646-.187a9 9 0 0 1-1.583-.542l1.27-1.271q.48.166.97.25t.989.083q2.416 0 4.125-1.708 1.708-1.709 1.708-4.125t-1.708-4.125T12 6.167 7.875 7.875 6.167 12a5.9 5.9 0 0 0 .333 1.958l-1.25 1.25A7.05 7.05 0 0 1 4.5 12q0-1.542.594-2.906a7.7 7.7 0 0 1 1.614-2.386 7.7 7.7 0 0 1 2.386-1.614A7.2 7.2 0 0 1 12 4.5m.833 10.833v-3L5.667 19.5 4.5 18.333l7.167-7.166h-3V9.5H14.5v5.833z"/></symbol><symbol viewBox="0 0 24 24" id="arrow-down" xmlns="http://www.w3.org/2000/svg"><path d="m12 17.913-5-5 1.167-1.166 3 3V7.08h1.666v7.667l3-3L17 12.913z"/></symbol><symbol viewBox="0 0 24 24" id="arrow-drop-down" xmlns="http://www.w3.org/2000/svg"><path d="m12 15.083-4.167-4.166h8.334z"/></symbol><symbol viewBox="0 0 24 24" id="arrow-drop-up" xmlns="http://www.w3.org/2000/svg"><path d="M7.833 13.083 12 8.917l4.167 4.166z"/></symbol><symbol viewBox="0 0 24 24" id="arrow-left" xmlns="http://www.w3.org/2000/svg"><path d="m9.83 17-5-5 5-5 1.167 1.208-2.959 2.959h10.125v1.666H8.038l2.959 2.959z"/></symbol><symbol viewBox="0 0 24 24" id="arrow-line-down" xmlns="http://www.w3.org/2000/svg"><path d="M5.333 19.5v-1.667h13.334V19.5zM12 16.167 7.833 12 9 10.833 11.167 13V4.5h1.666V13L15 10.833 16.167 12z"/></symbol><symbol viewBox="0 0 24 24" id="arrow-line-left" xmlns="http://www.w3.org/2000/svg"><path d="M5.333 17H3.667V7h1.666zM12 17l-5-5 5-5 1.167 1.167-2.98 3h10.146v1.666H10.188l3 3z"/></symbol><symbol viewBox="0 0 24 24" id="arrow-line-right" xmlns="http://www.w3.org/2000/svg"><path d="M18.667 17V7h1.666v10zM12 17l-1.187-1.167 3-3H3.666v-1.666h10.146l-2.98-3L12 7l5 5z"/></symbol><symbol viewBox="0 0 24 24" id="arrow-line-up" xmlns="http://www.w3.org/2000/svg"><path d="M5.333 6.167V4.5h13.334v1.667zM11.167 19.5V11L9 13.167 7.833 12 12 7.833 16.167 12 15 13.167 12.833 11v8.5z"/></symbol><symbol viewBox="0 0 24 24" id="arrow-prompt" xmlns="http://www.w3.org/2000/svg"><path d="m14.5 17.833-1.167-1.187 2.98-2.98H8.25q-1.563 0-2.656-1.093Q4.5 11.478 4.5 9.917T5.594 7.26Q6.687 6.167 8.25 6.167h.417v1.666H8.25q-.874 0-1.48.604a2.01 2.01 0 0 0-.603 1.48q0 .874.604 1.479Q7.375 12 8.25 12h8.063l-2.98-3L14.5 7.833l5 5z"/></symbol><symbol viewBox="0 0 24 24" id="arrow-redo" xmlns="http://www.w3.org/2000/svg"><path d="M10.747 17.25q-2.021 0-3.47-1.312-1.447-1.314-1.447-3.271 0-1.959 1.448-3.271 1.447-1.313 3.469-1.313h5.25L13.83 5.917l1.167-1.167 4.166 4.167-4.166 4.166-1.167-1.166 2.167-2.167h-5.25q-1.313 0-2.282.833-.968.833-.968 2.084 0 1.25.968 2.083.97.834 2.282.833h5.916v1.667z"/></symbol><symbol viewBox="0 0 24 24" id="arrow-right" xmlns="http://www.w3.org/2000/svg"><path d="m14.163 17-1.166-1.208 2.958-2.959H5.83v-1.666h10.125l-2.958-2.959L14.163 7l5 5z"/></symbol><symbol viewBox="0 0 24 24" id="arrow-square-in" xmlns="http://www.w3.org/2000/svg"><path d="M9.385 4.61h8.01c1.1 0 2 .9 2 2v8.01c0 1.1-.9 2-2 2h-3v-1.67h3.33V6.28h-8.67v3.33h-1.67v-3c0-1.1.9-2 2-2"/><path d="M9.355 13.48h-3v-1.67h5.83v5.83h-1.66v-3l-4.75 4.75-1.17-1.16z"/></symbol><symbol viewBox="0 0 24 24" id="arrow-square-out" xmlns="http://www.w3.org/2000/svg"><path d="M13.37 6.47V4.8h5.83v5.83h-1.67v-3l-6.75 6.75-1.16-1.16 6.75-6.75z"/><path d="M6.47 17.53h8.66V12.2h1.67v5c0 1.1-.9 2-2 2h-8c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h5v1.67H6.47z"/></symbol><symbol viewBox="0 0 24 24" id="arrow-undo" xmlns="http://www.w3.org/2000/svg"><path d="M7.33 17.25v-1.667h5.917q1.313 0 2.28-.833.97-.834.97-2.083t-.97-2.084q-.967-.833-2.28-.833h-5.25l2.166 2.167-1.166 1.166L4.83 8.917 8.997 4.75l1.166 1.167-2.166 2.166h5.25q2.02 0 3.468 1.313 1.449 1.313 1.448 3.27 0 1.959-1.448 3.271-1.448 1.313-3.468 1.313z"/></symbol><symbol viewBox="0 0 24 24" id="arrow-up" xmlns="http://www.w3.org/2000/svg"><path d="M11.167 16.913V9.247l-3 3L7 11.08l5-5 5 5-1.167 1.167-3-3v7.666z"/></symbol><symbol viewBox="0 0 24 24" id="arrows-down-up" xmlns="http://www.w3.org/2000/svg"><path d="M8.667 12.833V6.854L6.52 9 5.333 7.833 9.5 3.667l4.167 4.166L12.479 9l-2.146-2.146v5.98zm5.833 7.5-4.167-4.166L11.521 15l2.146 2.146v-5.98h1.666v5.98L17.48 15l1.188 1.167z"/></symbol><symbol viewBox="0 0 24 24" id="arrows-left-right" xmlns="http://www.w3.org/2000/svg"><path d="M7.833 18.667 3.667 14.5l4.166-4.167L9 11.521l-2.146 2.146h5.98v1.666h-5.98L9 17.48zm8.334-5L15 12.479l2.146-2.146h-5.98V8.667h5.98L15 6.52l1.167-1.188L20.333 9.5z"/></symbol><symbol viewBox="0 0 24 24" id="asterisk" xmlns="http://www.w3.org/2000/svg"><path d="M11.167 19.5V14l-3.875 3.896-1.188-1.188L10 12.833H4.5v-1.666H10L6.104 7.292l1.188-1.188L11.167 10V4.5h1.666V10l3.875-3.896 1.188 1.188L14 11.167h5.5v1.666H14l3.896 3.875-1.188 1.188L12.833 14v5.5z"/></symbol><symbol viewBox="0 0 24 24" id="at" xmlns="http://www.w3.org/2000/svg"><path d="M12 20.333a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.646-1.781 8.4 8.4 0 0 1-1.781-2.646A8.1 8.1 0 0 1 3.667 12q0-1.73.656-3.25a8.4 8.4 0 0 1 1.781-2.646A8.4 8.4 0 0 1 8.75 4.323 8.1 8.1 0 0 1 12 3.667q1.73 0 3.25.656a8.4 8.4 0 0 1 2.646 1.781 8.4 8.4 0 0 1 1.781 2.646 8.1 8.1 0 0 1 .656 3.25v1.208q0 1.23-.843 2.094-.845.865-2.073.865-.73 0-1.375-.313a2.94 2.94 0 0 1-1.084-.896 4 4 0 0 1-1.364.907 4.3 4.3 0 0 1-1.594.302q-1.729 0-2.948-1.22Q7.833 13.73 7.833 12t1.219-2.948T12 7.833t2.948 1.22Q16.167 10.27 16.167 12v1.208q0 .542.354.917t.896.375.895-.375.355-.917V12q0-2.791-1.938-4.73Q14.792 5.335 12 5.334q-2.792 0-4.73 1.938Q5.335 9.209 5.334 12q0 2.792 1.938 4.73Q9.208 18.665 12 18.666h4.167v1.666zm0-5.833a2.4 2.4 0 0 0 1.77-.73q.73-.727.73-1.77 0-1.042-.73-1.77A2.4 2.4 0 0 0 12 9.5a2.4 2.4 0 0 0-1.77.73A2.4 2.4 0 0 0 9.5 12q0 1.042.73 1.77a2.4 2.4 0 0 0 1.77.73"/></symbol><symbol viewBox="0 0 24 24" id="attachment" xmlns="http://www.w3.org/2000/svg"><path d="M18.125 11.576a.6.6 0 0 1 0 .848l-6.154 6.15a4.2 4.2 0 0 1-5.94-5.94l7.444-7.554a3 3 0 1 1 4.246 4.241l-7.446 7.554a1.803 1.803 0 1 1-2.55-2.55l6.248-6.346a.6.6 0 1 1 .854.841L8.58 15.173a.6.6 0 1 0 .846.852l7.445-7.55a1.802 1.802 0 0 0-2.545-2.55l-7.443 7.551a3 3 0 0 0 4.24 4.246l6.154-6.15a.6.6 0 0 1 .849.004"/></symbol><symbol viewBox="0 0 24 24" id="bank" xmlns="http://www.w3.org/2000/svg"><path d="M21.375 18.25a.625.625 0 0 1-.625.625H3.25a.625.625 0 1 1 0-1.25h17.5a.625.625 0 0 1 .625.625M3.273 9.67a.625.625 0 0 1 .275-.703l8.125-5a.63.63 0 0 1 .654 0l8.125 5a.625.625 0 0 1-.327 1.158H18.25v5h1.25a.625.625 0 0 1 0 1.25h-15a.625.625 0 1 1 0-1.25h1.25v-5H3.875a.625.625 0 0 1-.602-.455m9.977 4.83a.625.625 0 1 0 1.25 0v-3.75a.625.625 0 1 0-1.25 0zm-3.75 0a.625.625 0 1 0 1.25 0v-3.75a.625.625 0 1 0-1.25 0z"/></symbol><symbol viewBox="0 0 24 24" id="barcode" xmlns="http://www.w3.org/2000/svg"><path d="M8 6.67V5H4v4h1.67V6.67zm8 0V5h4v4h-1.67V6.67zM16 19v-1.67h2.33V15H20v4zm-8-1.67V19H4v-4h1.67v2.33zm3.25-8.83h-1v7h1zm4 0h1v7h-1zm-1.5 0h-1v7h1zm-6 0h1v7h-1z"/></symbol><symbol viewBox="0 0 24 24" id="barcode-reader" xmlns="http://www.w3.org/2000/svg"><path d="M8.171 19.917q-1.25 0-1.99-.969-.739-.97-.426-2.156l1.5-5.667a3.5 3.5 0 0 1-1.136-1.187 3.23 3.23 0 0 1-.448-1.688q0-1.375.98-2.354a3.2 3.2 0 0 1 2.354-.98h6.666q.938 0 1.417.792t.063 1.625l-1.667 3.334q-.23.416-.615.666-.386.25-.864.25h-1.688l-.229.834h.25q.354 0 .594.24.24.239.24.593v1.667q0 .354-.24.594a.8.8 0 0 1-.594.239h-1.125l-.625 2.333a2.47 2.47 0 0 1-.896 1.323q-.666.51-1.52.51M19.005 6.583l-.521-1.125 3.02-1.375.5 1.146zm2.5 5.834-3.021-1.354.52-1.146 3 1.375zm-2.5-3.542v-1.25h3.333v1.25z"/></symbol><symbol viewBox="0 0 24 24" id="barricade" xmlns="http://www.w3.org/2000/svg"><path d="M19.5 7h-15a1.25 1.25 0 0 0-1.25 1.25v5.625a1.25 1.25 0 0 0 1.25 1.25h1.875v2.5a.625.625 0 1 0 1.25 0v-2.5h8.75v2.5a.624.624 0 1 0 1.25 0v-2.5H19.5a1.25 1.25 0 0 0 1.25-1.25V8.25A1.25 1.25 0 0 0 19.5 7m-15 6.875V9.188l4.688 4.687zm15 0h-4.429L9.446 8.25h5.367l4.687 4.688z"/></symbol><symbol viewBox="0 0 24 24" id="basket" xmlns="http://www.w3.org/2000/svg"><path d="M11.395 11.74h1.2v3.53h-1.2zm4.57 0h-1.21l-.47 3.53h1.21zm-6.73 0 .47 3.53h-1.21l-.47-3.53z"/><path fill-rule="evenodd" d="M20.245 8.62c.05.06.1.14.12.22l.01-.01c.02.08.03.17.02.25l-1.13 8.48a1.21 1.21 0 0 1-1.19 1.04H5.925a1.214 1.214 0 0 1-1.19-1.04l-1.13-8.48c-.01-.08 0-.17.02-.25s.06-.16.12-.22c.05-.06.12-.12.2-.15s.16-.05.25-.05h3.33l4.02-4.6c.05-.06.12-.11.2-.15.08-.03.16-.05.25-.05s.17.01.25.05c.07.04.14.09.2.15l4.02 4.61h3.33c.09 0 .17.01.25.05a.7.7 0 0 1 .2.15M12 5.836 9.745 8.41h4.51zM6.325 16.94h11.32l.92-6.87H5.405z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="bell" xmlns="http://www.w3.org/2000/svg"><path d="M5.333 17.833v-1.666H7v-5.834A4.88 4.88 0 0 1 8.042 7.26 4.8 4.8 0 0 1 10.75 5.5v-.583q0-.522.365-.886.364-.364.885-.364.52 0 .886.364.364.364.364.886V5.5a4.8 4.8 0 0 1 2.708 1.76A4.88 4.88 0 0 1 17 10.333v5.834h1.667v1.666zm6.667 2.5q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176h3.334q0 .687-.49 1.177t-1.177.49"/></symbol><symbol viewBox="0 0 24 24" id="bell-active" xmlns="http://www.w3.org/2000/svg"><path d="M5.333 17.854v-1.666H7v-5.834a4.88 4.88 0 0 1 1.042-3.073 4.8 4.8 0 0 1 2.708-1.76v-.583q0-.522.364-.886.366-.364.886-.364t.885.364q.365.364.365.886v.583a4.8 4.8 0 0 1 2.708 1.76A4.88 4.88 0 0 1 17 10.354v5.834h1.667v1.666zm6.667 2.5q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177h3.334q0 .688-.49 1.178t-1.177.49m-8.333-10q0-2.083.927-3.823a8.5 8.5 0 0 1 2.49-2.885l.978 1.333a6.74 6.74 0 0 0-1.99 2.313q-.739 1.395-.739 3.062zm15 0q0-1.666-.74-3.062a6.74 6.74 0 0 0-1.99-2.313l.98-1.333a8.5 8.5 0 0 1 2.49 2.885q.926 1.74.926 3.823z"/></symbol><symbol viewBox="0 0 24 24" id="bell-slash" xmlns="http://www.w3.org/2000/svg"><path d="m19.672 19.656-1.167 1.167-3.041-3H5.339v-1.667h1.666v-5.833q0-.463.082-.918L3.172 5.49l1.167-1.166z"/><path d="M13.672 18.656q0 .687-.49 1.177t-1.177.49q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177zm-1.667-15q.521 0 .886.365.364.365.364.885v.583a4.8 4.8 0 0 1 2.709 1.761q1.04 1.344 1.04 3.073v4.291L8.84 6.448q.417-.333.895-.584.48-.249 1.02-.375v-.583q0-.52.366-.885.364-.365.885-.365"/></symbol><symbol viewBox="0 0 24 24" id="bin" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M20.05 6.35A1.17 1.17 0 0 0 19.2 6H4.8c-.32 0-.62.13-.85.35s-.35.53-.35.85V9c0 .32.13.62.35.85.23.23.53.35.85.35v6.6c0 .32.13.62.35.85s.53.35.85.35h12c.32 0 .62-.13.85-.35s.35-.53.35-.85v-6.6c.32 0 .62-.13.85-.35.22-.23.35-.53.35-.85V7.2c0-.32-.13-.62-.35-.85m-5.72 6.88H9.66v-1.25h4.67zM19.2 9H4.8V7.2h14.4z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="blog-post" xmlns="http://www.w3.org/2000/svg"><path d="M5.333 19.5q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V6.167q0-.688.49-1.177t1.177-.49h13.334q.687 0 1.177.49.49.489.49 1.177v11.666q0 .688-.49 1.177t-1.177.49zM7 16.167h10V14.5H7zm0-3.334h3.333v-5H7zm5 0h5v-1.666h-5zM12 9.5h5V7.833h-5z"/></symbol><symbol viewBox="0 0 24 24" id="blueprint" xmlns="http://www.w3.org/2000/svg"><path d="M12.625 11.375H14.5v1.25h-1.875zM20.75 7v10.625a.624.624 0 0 1-.625.625H5.75a2.5 2.5 0 0 1-2.5-2.5V7a2.5 2.5 0 0 1 2.5-2.5H7a.625.625 0 0 1 .625.625v1.25h12.5A.625.625 0 0 1 20.75 7M6.375 5.75H5.75A1.25 1.25 0 0 0 4.5 7v6.585c.38-.22.811-.336 1.25-.335h.625zm9.375 6.875v-1.25H17a.624.624 0 1 0 0-1.25h-1.25V9.5a.625.625 0 1 0-1.25 0v.625h-1.875V9.5a.625.625 0 1 0-1.25 0v.625h-1.25a.625.625 0 1 0 0 1.25h1.25v1.25h-1.25a.625.625 0 1 0 0 1.25h1.25v.625a.624.624 0 1 0 1.25 0v-.625H14.5v.625a.624.624 0 1 0 1.25 0v-.625H17a.624.624 0 1 0 0-1.25z"/></symbol><symbol viewBox="0 0 24 24" id="book" xmlns="http://www.w3.org/2000/svg"><path d="M8.25 20.333q-1.23 0-2.073-.843-.844-.844-.844-2.073V6.583q0-1.208.844-2.062t2.073-.854h10.417v12.5q-.542 0-.896.364a1.22 1.22 0 0 0-.354.886q0 .541.354.895.354.355.896.355v1.666zm0-1.666h7.77a4 4 0 0 1-.197-.594 2.8 2.8 0 0 1-.073-.656q0-.334.063-.646.061-.313.208-.604H8.25q-.542 0-.896.364a1.22 1.22 0 0 0-.354.886q0 .541.354.895.354.355.896.355"/></symbol><symbol viewBox="0 0 24 24" id="book-a" xmlns="http://www.w3.org/2000/svg"><path d="M8.25 20.333q-1.23 0-2.073-.843-.844-.844-.844-2.073V6.583q0-1.208.844-2.062t2.073-.854h10.417v12.5q-.542 0-.896.364a1.22 1.22 0 0 0-.354.886q0 .541.354.895.354.355.896.355v1.666zm1.02-7.5h1.022l.52-1.479h2.355l.52 1.48h1.021L12.5 7h-1.042zm1.834-2.333.854-2.417h.063l.854 2.417zM8.25 18.667h7.77a4 4 0 0 1-.197-.594 2.8 2.8 0 0 1-.073-.656q0-.334.063-.646.061-.313.208-.604H8.25q-.542 0-.896.364a1.22 1.22 0 0 0-.354.886q0 .541.354.895.354.355.896.355"/></symbol><symbol viewBox="0 0 24 24" id="bookmark" xmlns="http://www.w3.org/2000/svg"><path d="M6.167 19.5V6.167q0-.688.49-1.177.489-.49 1.176-.49h8.334q.687 0 1.177.49.49.489.49 1.177V19.5L12 17z"/></symbol><symbol viewBox="0 0 24 24" id="bookmark-outlined" xmlns="http://www.w3.org/2000/svg"><path d="m17.835 19.5-5.83-2.5-5.84 2.5V6.17c0-.46.16-.85.49-1.18s.72-.49 1.18-.49h8.33c.46 0 .85.16 1.18.49s.49.72.49 1.18zm-5.84-4.31 4.17 1.79V6.17h-8.33v10.81l4.17-1.79z"/></symbol><symbol viewBox="0 0 24 24" id="bookmarks" xmlns="http://www.w3.org/2000/svg"><path d="M5.333 20.333V8.667q0-.688.49-1.177T7 7h6.667q.687 0 1.177.49.49.489.49 1.177v11.666l-5-2.5zM17 17V5.333H7.833V3.667H17q.687 0 1.177.49.49.489.49 1.176V17z"/></symbol><symbol viewBox="0 0 24 24" id="broadcast" xmlns="http://www.w3.org/2000/svg"><path d="M15.125 12a3.125 3.125 0 1 1-6.25 0 3.125 3.125 0 0 1 6.25 0m3.125 0a6.23 6.23 0 0 0-1.591-4.166.625.625 0 1 0-.932.833 5 5 0 0 1 0 6.667.625.625 0 0 0 .931.833A6.23 6.23 0 0 0 18.25 12M8.273 8.667a.625.625 0 1 0-.932-.833 6.245 6.245 0 0 0 0 8.333.625.625 0 0 0 .932-.833 4.996 4.996 0 0 1 0-6.667m12.365-.312a9.3 9.3 0 0 0-1.942-2.917.625.625 0 1 0-.892.875 8.117 8.117 0 0 1 0 11.371.624.624 0 0 0 .45 1.065.62.62 0 0 0 .442-.186A9.38 9.38 0 0 0 20.638 8.35zM4.513 15.162a8.12 8.12 0 0 1 1.683-8.848.625.625 0 1 0-.892-.876 9.365 9.365 0 0 0 0 13.125.624.624 0 1 0 .892-.875 8.1 8.1 0 0 1-1.683-2.525"/></symbol><symbol viewBox="0 0 24 24" id="calendar" xmlns="http://www.w3.org/2000/svg"><path d="M12 13.667a.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.594q0-.354.24-.593.24-.24.594-.24t.594.24.24.593-.24.594a.8.8 0 0 1-.594.24m-3.333 0a.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.594q0-.354.24-.593.24-.24.594-.24t.593.24.24.593-.24.594a.8.8 0 0 1-.593.24m6.666 0a.8.8 0 0 1-.593-.24.8.8 0 0 1-.24-.594q0-.354.24-.593.24-.24.593-.24.354 0 .594.24t.24.593-.24.594a.8.8 0 0 1-.594.24M12 17a.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.593q0-.354.24-.594t.594-.24.594.24.24.594-.24.593A.8.8 0 0 1 12 17m-3.333 0a.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.593q0-.354.24-.594t.594-.24.593.24.24.594-.24.593a.8.8 0 0 1-.593.24m6.666 0a.8.8 0 0 1-.593-.24.8.8 0 0 1-.24-.593q0-.354.24-.594t.593-.24.594.24.24.594-.24.593a.8.8 0 0 1-.594.24m-9.166 3.333q-.688 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176V7q0-.687.49-1.177.489-.49 1.177-.49H7V3.667h1.667v1.666h6.666V3.667H17v1.666h.833q.688 0 1.177.49T19.5 7v11.667q0 .687-.49 1.177-.489.49-1.177.49zm0-1.666h11.666v-8.334H6.167z"/></symbol><symbol viewBox="0 0 24 24" id="calendar-add" xmlns="http://www.w3.org/2000/svg"><path d="M16.973 20.333v-2.5h-2.5v-1.666h2.5v-2.5h1.667v2.5h2.5v1.666h-2.5v2.5zm-10-1.666q-.687 0-1.177-.49A1.6 1.6 0 0 1 5.306 17V7q0-.687.49-1.177t1.177-.49h.834V3.667h1.666v1.666h5V3.667h1.667v1.666h.833q.688 0 1.177.49T18.64 7v5.083a5.6 5.6 0 0 0-1.667 0v-1.75h-10V17h5.834q0 .417.062.833.063.417.23.834z"/></symbol><symbol viewBox="0 0 24 24" id="calendar-view-day" xmlns="http://www.w3.org/2000/svg"><path d="M6.167 16.167q-.688 0-1.177-.49A1.6 1.6 0 0 1 4.5 14.5v-5q0-.687.49-1.177.489-.49 1.177-.49h11.666q.688 0 1.177.49T19.5 9.5v5q0 .687-.49 1.177-.489.49-1.177.49zm-1.667-10V4.5h15v1.667zm0 13.333v-1.667h15V19.5z"/></symbol><symbol viewBox="0 0 24 24" id="calendar-view-month" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 10.75V7q0-.354.24-.594t.593-.24h2.771q.354 0 .594.24t.24.594v3.75q0 .354-.24.594a.8.8 0 0 1-.594.24h-2.77a.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.594m6.104.833a.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.593V7q0-.354.24-.594t.594-.24h2.792q.354 0 .594.24t.24.594v3.75q0 .354-.24.594a.8.8 0 0 1-.594.24zm5.292 0a.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.593V7q0-.354.24-.594t.594-.24h2.77q.355 0 .594.24.24.24.24.594v3.75q0 .354-.24.594a.8.8 0 0 1-.593.24zm-7.792 6.25h-2.77a.8.8 0 0 1-.594-.24A.8.8 0 0 1 4.5 17v-3.75q0-.354.24-.594t.593-.24h2.771q.354 0 .594.24t.24.594V17q0 .354-.24.594a.8.8 0 0 1-.594.24m2.5 0a.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.593v-3.75q0-.354.24-.594t.594-.24h2.792q.354 0 .594.24t.24.594V17q0 .354-.24.594a.8.8 0 0 1-.594.24zm5.292 0a.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.593v-3.75q0-.354.24-.594t.594-.24h2.77q.355 0 .594.24.24.24.24.594V17q0 .354-.24.594a.8.8 0 0 1-.593.24z"/></symbol><symbol viewBox="0 0 24 24" id="calendar-view-week" xmlns="http://www.w3.org/2000/svg"><path d="M13.458 17.833a.8.8 0 0 1-.593-.24.8.8 0 0 1-.24-.593V7q0-.354.24-.594t.593-.24h1.146q.354 0 .594.24t.24.594v10q0 .354-.24.594a.8.8 0 0 1-.594.24zm-4.062 0a.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.593V7q0-.354.24-.594t.594-.24h1.146q.354 0 .593.24.24.24.24.594v10q0 .354-.24.594a.8.8 0 0 1-.593.24zm-4.063 0a.8.8 0 0 1-.593-.24A.8.8 0 0 1 4.5 17V7q0-.354.24-.594t.593-.24H6.48q.354 0 .594.24t.24.594v10q0 .354-.24.594a.8.8 0 0 1-.594.24zm12.188 0a.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.593V7q0-.354.24-.594t.594-.24h1.146q.354 0 .593.24.24.24.24.594v10q0 .354-.24.594a.8.8 0 0 1-.593.24z"/></symbol><symbol viewBox="0 0 24 24" id="caret-down" xmlns="http://www.w3.org/2000/svg"><path d="m12 16.083-5-5 1.167-1.166L12 13.75l3.833-3.833L17 11.083z"/></symbol><symbol viewBox="0 0 24 24" id="caret-left" xmlns="http://www.w3.org/2000/svg"><path d="m12.917 17-5-5 5-5 1.166 1.167L10.25 12l3.833 3.833z"/></symbol><symbol viewBox="0 0 24 24" id="caret-right" xmlns="http://www.w3.org/2000/svg"><path d="M13.75 12 9.917 8.167 11.083 7l5 5-5 5-1.166-1.167z"/></symbol><symbol viewBox="0 0 24 24" id="caret-up" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.25-3.833 3.833L7 12.917l5-5 5 5-1.167 1.166z"/></symbol><symbol viewBox="0 0 24 24" id="cart" xmlns="http://www.w3.org/2000/svg"><path d="M8.17 20.837q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177q0-.687.49-1.177t1.177-.49 1.177.49.49 1.177-.49 1.177-1.177.49m8.333 0q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177q0-.687.49-1.177t1.177-.49 1.177.49.49 1.177-.49 1.177-1.177.49m-9.833-15h12.292q.48 0 .729.427a.84.84 0 0 1 .02.864l-2.958 5.334a1.67 1.67 0 0 1-.614.646 1.6 1.6 0 0 1-.844.229H9.087l-.917 1.666h10v1.667h-10q-.937 0-1.417-.823t-.041-1.635l1.125-2.042-3-6.333H3.17V4.17h2.708z"/></symbol><symbol viewBox="0 0 24 24" id="certificate" xmlns="http://www.w3.org/2000/svg"><path d="M20.125 8.76V6.375a1.25 1.25 0 0 0-1.25-1.25H5.125a1.25 1.25 0 0 0-1.25 1.25v10a1.25 1.25 0 0 0 1.25 1.25H14.5V19.5a.625.625 0 0 0 .938.547l1.874-1.074 1.875 1.074a.624.624 0 0 0 .938-.547v-4.885a4.05 4.05 0 0 0 0-5.855M12 13.25H7.625a.625.625 0 1 1 0-1.25H12a.624.624 0 1 1 0 1.25m0-2.5H7.625a.625.625 0 1 1 0-1.25H12a.625.625 0 1 1 0 1.25m6.875 7.673-1.25-.716a.63.63 0 0 0-.62 0l-1.25.716v-2.985a4.05 4.05 0 0 0 3.125 0zM17.313 14.5a2.813 2.813 0 1 1 0-5.625 2.813 2.813 0 0 1 0 5.625"/></symbol><symbol viewBox="0 0 24 24" id="check" xmlns="http://www.w3.org/2000/svg"><path d="m9.958 17.01-4.75-4.75 1.188-1.187 3.562 3.562 7.646-7.645 1.188 1.187z"/></symbol><symbol viewBox="0 0 24 24" id="check-all" xmlns="http://www.w3.org/2000/svg"><path d="m7.583 17.01-4.708-4.708 1.188-1.167 4.708 4.709zm4.709 0-4.709-4.708 1.167-1.187 3.542 3.541 7.666-7.666 1.167 1.187zm0-4.708-1.188-1.167L15.23 7.01l1.188 1.167z"/></symbol><symbol viewBox="0 0 24 24" id="check-thick" xmlns="http://www.w3.org/2000/svg"><path d="m17.439 6.388-7.64 7.65-3.57-3.57-2.26 2.27 5.83 5.82 9.9-9.91z"/></symbol><symbol viewBox="0 0 24 24" id="checkbox" xmlns="http://www.w3.org/2000/svg"><path d="M6.167 19.5q-.688 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V6.167q0-.688.49-1.177.489-.49 1.177-.49h11.666q.688 0 1.177.49.49.489.49 1.177v11.666q0 .688-.49 1.177-.489.49-1.177.49zm0-1.667h11.666V6.167H6.167z"/></symbol><symbol viewBox="0 0 24 24" id="checkbox-checked" xmlns="http://www.w3.org/2000/svg"><path d="m10.833 15.5 5.875-5.875-1.166-1.167-4.709 4.709-2.375-2.375-1.166 1.166zm-4.666 4q-.688 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V6.167q0-.688.49-1.177.489-.49 1.177-.49h11.666q.688 0 1.177.49.49.489.49 1.177v11.666q0 .688-.49 1.177-.489.49-1.177.49z"/></symbol><symbol viewBox="0 0 24 24" id="checkbox-focus" xmlns="http://www.w3.org/2000/svg"><path d="M17.838 3.501c.71 0 1.38.28 1.88.78.51.51.791 1.18.791 1.891v11.676c0 .71-.28 1.38-.78 1.88-.51.51-1.18.791-1.891.791H6.172c-.71 0-1.38-.28-1.88-.78a2.658 2.658 0 0 1-.791-1.891V6.172c0-.71.28-1.38.78-1.88.51-.51 1.18-.791 1.891-.791h11.676m-.01-2.001H6.172c-1.24 0-2.41.49-3.301 1.37A4.62 4.62 0 0 0 1.51 6.163v11.676c0 1.24.49 2.41 1.37 3.301a4.629 4.629 0 0 0 3.292 1.361h11.676c1.24 0 2.41-.49 3.301-1.37a4.629 4.629 0 0 0 1.361-3.292V6.172c0-1.24-.49-2.41-1.37-3.301a4.62 4.62 0 0 0-3.292-1.361z"/></symbol><symbol viewBox="0 0 24 24" id="checkbox-indeterminate" xmlns="http://www.w3.org/2000/svg"><path d="M7.833 12.833h8.334v-1.666H7.833zM6.167 19.5q-.688 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V6.167q0-.688.49-1.177.489-.49 1.177-.49h11.666q.688 0 1.177.49.49.489.49 1.177v11.666q0 .688-.49 1.177-.489.49-1.177.49z"/></symbol><symbol viewBox="0 0 24 24" id="circle" xmlns="http://www.w3.org/2000/svg"><path d="M12 20a7.8 7.8 0 0 1-3.12-.63 8.1 8.1 0 0 1-2.54-1.71 8.1 8.1 0 0 1-1.71-2.54A7.8 7.8 0 0 1 4 12q0-1.66.63-3.12t1.71-2.54a8.1 8.1 0 0 1 2.54-1.71A7.8 7.8 0 0 1 12 4a7.8 7.8 0 0 1 3.12.63q1.46.63 2.54 1.71t1.71 2.54T20 12a7.8 7.8 0 0 1-.63 3.12 8.1 8.1 0 0 1-1.71 2.54 8.1 8.1 0 0 1-2.54 1.71A7.8 7.8 0 0 1 12 20"/></symbol><symbol viewBox="0 0 24 24" id="circle-change" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 17.833q-2.438 0-4.135-1.698Q3.667 14.437 3.667 12t1.698-4.135T9.5 6.167t4.135 1.698T15.333 12t-1.698 4.135T9.5 17.833m5.833-.083v-1.667a4.03 4.03 0 0 0 2.396-1.437A4.06 4.06 0 0 0 18.667 12q0-1.5-.938-2.646a4.03 4.03 0 0 0-2.396-1.437V6.25q2.168.292 3.584 1.927T20.333 12q0 2.188-1.416 3.823-1.418 1.636-3.584 1.927"/></symbol><symbol viewBox="0 0 24 24" id="circle-check" xmlns="http://www.w3.org/2000/svg"><path d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8m-1.17 11.5-3.54-3.54 1.17-1.17 2.37 2.38 4.71-4.71 1.17 1.17-5.88 5.88z"/></symbol><symbol viewBox="0 0 24 24" id="circles-add" xmlns="http://www.w3.org/2000/svg"><path d="M11.375 8.25a3.125 3.125 0 1 1-6.25 0 3.125 3.125 0 0 1 6.25 0m4.375 3.125a3.125 3.125 0 1 0 0-6.25 3.125 3.125 0 0 0 0 6.25m-7.5 1.25a3.125 3.125 0 1 0 0 6.25 3.125 3.125 0 0 0 0-6.25m10 2.5h-1.875V13.25a.624.624 0 1 0-1.25 0v1.875H13.25a.624.624 0 1 0 0 1.25h1.875v1.875a.624.624 0 1 0 1.25 0v-1.875h1.875a.624.624 0 1 0 0-1.25"/></symbol><symbol viewBox="0 0 24 24" id="circuit" xmlns="http://www.w3.org/2000/svg"><path d="m8.875 10.696 3.75 3.75v4.742a.313.313 0 0 1-.312.312H5.75a1.25 1.25 0 0 1-1.25-1.25V5.75A1.25 1.25 0 0 1 5.75 4.5h1.563a.31.31 0 0 1 .312.313v9.17a1.875 1.875 0 1 0 1.25 0zm-.625 5.679a.626.626 0 1 0 0-1.251.626.626 0 0 0 0 1.251m8.125-6.25a.626.626 0 1 0-1.251 0 .626.626 0 0 0 1.251 0M18.25 4.5h-4.062a.313.313 0 0 0-.313.313v2.553l1.067 1.068a1.875 1.875 0 1 1-.883.883l-1.25-1.25a.62.62 0 0 1-.184-.442V4.813a.31.31 0 0 0-.312-.313H9.187a.31.31 0 0 0-.312.313v4.116l4.817 4.816a.63.63 0 0 1 .183.443v5a.313.313 0 0 0 .313.312h4.062a1.25 1.25 0 0 0 1.25-1.25V5.75a1.25 1.25 0 0 0-1.25-1.25"/></symbol><symbol viewBox="0 0 24 24" id="clipboard" xmlns="http://www.w3.org/2000/svg"><path d="M6.167 19.8q-.688 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V6.467q0-.688.49-1.177.489-.49 1.177-.49h3.479q.229-.729.896-1.198.666-.469 1.458-.469a2.5 2.5 0 0 1 1.49.47q.656.467.885 1.197h3.458q.688 0 1.177.49.49.489.49 1.177v11.666q0 .688-.49 1.177-.489.49-1.177.49zm0-1.667h11.666V6.467h-1.666v2.5H7.833v-2.5H6.167zM12 6.467q.354 0 .594-.24t.24-.594a.8.8 0 0 0-.24-.593A.8.8 0 0 0 12 4.8a.8.8 0 0 0-.594.24.8.8 0 0 0-.24.593q0 .354.24.594t.594.24"/></symbol><symbol viewBox="0 0 24 24" id="clock" xmlns="http://www.w3.org/2000/svg"><path d="m14.75 15.917 1.167-1.167-3.084-3.083V7.833h-1.666v4.5zM12 20.333a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.646-1.781 8.4 8.4 0 0 1-1.781-2.646A8.1 8.1 0 0 1 3.667 12q0-1.73.656-3.25a8.4 8.4 0 0 1 1.781-2.646A8.4 8.4 0 0 1 8.75 4.323 8.1 8.1 0 0 1 12 3.667q1.73 0 3.25.656a8.4 8.4 0 0 1 2.646 1.781 8.4 8.4 0 0 1 1.781 2.646 8.1 8.1 0 0 1 .656 3.25 8.1 8.1 0 0 1-.656 3.25 8.4 8.4 0 0 1-1.781 2.646 8.4 8.4 0 0 1-2.646 1.781 8.1 8.1 0 0 1-3.25.656"/></symbol><symbol viewBox="0 0 24 24" id="clock-countdown" xmlns="http://www.w3.org/2000/svg"><path d="M14.708 6.167q-.437 0-.74-.302a1 1 0 0 1-.301-.74q0-.437.302-.74.302-.301.74-.302.436 0 .739.303.302.3.302.74 0 .436-.302.739a1 1 0 0 1-.74.302m0 13.75q-.437 0-.74-.302a1 1 0 0 1-.301-.74q0-.438.302-.74.302-.301.74-.302.436 0 .739.303.302.3.302.74 0 .436-.302.739a1 1 0 0 1-.74.302m3.334-10.834q-.438 0-.74-.302a1 1 0 0 1-.302-.74q0-.436.302-.739.302-.302.74-.302.437 0 .74.302.3.303.301.74 0 .437-.302.74a1 1 0 0 1-.74.301m0 7.917q-.438 0-.74-.302a1 1 0 0 1-.302-.74q0-.437.302-.74.302-.3.74-.301.437 0 .74.302.3.302.301.74 0 .437-.302.739a1 1 0 0 1-.74.302m1.25-3.958q-.438 0-.74-.302a1 1 0 0 1-.302-.74q0-.437.302-.74.302-.301.74-.302.437 0 .74.303.3.3.301.74 0 .436-.302.739a1 1 0 0 1-.74.302M12 20.333a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.646-1.781 8.4 8.4 0 0 1-1.781-2.646A8.1 8.1 0 0 1 3.667 12q0-1.73.656-3.25a8.4 8.4 0 0 1 1.781-2.646A8.4 8.4 0 0 1 8.75 4.323 8.1 8.1 0 0 1 12 3.667v1.666q-2.792 0-4.73 1.938Q5.335 9.208 5.334 12q0 2.79 1.938 4.728T12 18.667zm2.75-4.416-3.583-3.584v-4.5h1.666v3.834l3.084 3.083z"/></symbol><symbol viewBox="0 0 24 24" id="cloud-synced" xmlns="http://www.w3.org/2000/svg"><path d="m10.625 16.167 4.708-4.709-1.208-1.208-3.52 3.52-1.75-1.75-1.188 1.188zm-3.208 2.5q-1.896 0-3.24-1.313t-1.344-3.208q0-1.626.98-2.896a4.33 4.33 0 0 1 2.562-1.625 5.66 5.66 0 0 1 2.083-3.104A5.7 5.7 0 0 1 12 5.333q2.438 0 4.136 1.698t1.697 4.136a3.64 3.64 0 0 1 2.386 1.24q.948 1.072.948 2.51 0 1.562-1.094 2.656t-2.656 1.094z"/></symbol><symbol viewBox="0 0 24 24" id="code" xmlns="http://www.w3.org/2000/svg"><path d="m8.667 17-5-5 5-5 1.187 1.188-3.833 3.833 3.812 3.812zm6.666 0-1.187-1.187 3.833-3.834-3.812-3.812L15.333 7l5 5z"/></symbol><symbol viewBox="0 0 24 24" id="color" xmlns="http://www.w3.org/2000/svg"><path d="M12 20.333a8.1 8.1 0 0 1-3.23-.656 8.5 8.5 0 0 1-2.655-1.792 8.5 8.5 0 0 1-1.792-2.656A8.1 8.1 0 0 1 3.667 12a7.9 7.9 0 0 1 .677-3.25 8.4 8.4 0 0 1 1.833-2.646 8.7 8.7 0 0 1 2.698-1.781 8.3 8.3 0 0 1 3.292-.656q1.666 0 3.146.573t2.593 1.583a7.6 7.6 0 0 1 1.771 2.396q.657 1.385.656 2.99 0 2.395-1.458 3.676t-3.542 1.282h-1.541q-.188 0-.26.104a.4.4 0 0 0-.074.229q0 .25.313.719.312.468.312 1.073 0 1.041-.573 1.541t-1.51.5m-4.583-7.5q.541 0 .895-.354.355-.354.355-.896 0-.541-.355-.896a1.21 1.21 0 0 0-.895-.354q-.542 0-.896.354a1.21 1.21 0 0 0-.354.896q0 .542.354.896t.896.354m2.5-3.333q.541 0 .896-.354.354-.354.354-.896t-.354-.896A1.21 1.21 0 0 0 9.917 7q-.542 0-.896.354a1.21 1.21 0 0 0-.354.896q0 .542.354.896t.896.354m4.166 0q.542 0 .896-.354t.354-.896-.354-.896A1.21 1.21 0 0 0 14.083 7q-.541 0-.896.354a1.21 1.21 0 0 0-.354.896q0 .542.354.896.355.354.896.354m2.5 3.333q.542 0 .896-.354t.354-.896-.354-.896a1.21 1.21 0 0 0-.896-.354q-.541 0-.895.354a1.21 1.21 0 0 0-.355.896q0 .542.354.896.355.354.896.354"/></symbol><symbol viewBox="0 0 24 24" id="compass" xmlns="http://www.w3.org/2000/svg"><path d="M18.806 11.66a.624.624 0 1 0-1.112-.57 6.2 6.2 0 0 1-2.585 2.618L13.684 10.5a2.813 2.813 0 0 0-1.059-4.992V3.875a.625.625 0 0 0-1.25 0v1.634a2.812 2.812 0 0 0-1.06 4.992L6.43 19.246a.625.625 0 1 0 1.142.508l1.964-4.419A7.5 7.5 0 0 0 12 15.75a7.8 7.8 0 0 0 2.469-.407l1.96 4.41a.625.625 0 0 0 1.142-.507l-1.953-4.394a7.5 7.5 0 0 0 3.188-3.193M12 14.5a6.2 6.2 0 0 1-1.953-.312l1.412-3.179a2.79 2.79 0 0 0 1.085 0l1.417 3.188A6.5 6.5 0 0 1 12 14.5"/></symbol><symbol viewBox="0 0 24 24" id="cone" xmlns="http://www.w3.org/2000/svg"><path d="M20.125 18.25h-1.43l-4.71-13.535a1.25 1.25 0 0 0-1.18-.84h-1.61a1.25 1.25 0 0 0-1.18.84L5.304 18.25h-1.43a.625.625 0 1 0 0 1.25h16.25a.624.624 0 1 0 0-1.25m-10.67-8.125h5.09l1.304 3.75H8.151z"/></symbol><symbol viewBox="0 0 24 24" id="confetti" xmlns="http://www.w3.org/2000/svg"><path d="M10.71 6.112a1.234 1.234 0 0 0-2.031.45l-4.1 11.28A1.237 1.237 0 0 0 5.73 19.5a1.3 1.3 0 0 0 .427-.078l11.279-4.102a1.234 1.234 0 0 0 .451-2.03zm-3.62 8.476 1.5-4.124 4.946 4.947-4.125 1.5zm7.41-6.963c.012-.423.114-.838.3-1.217.414-.828 1.195-1.283 2.2-1.283.523 0 .86-.179 1.067-.563a1.7 1.7 0 0 0 .183-.692.625.625 0 1 1 1.25.005c0 1.005-.666 2.5-2.5 2.5-.523 0-.86.179-1.066.563a1.7 1.7 0 0 0-.184.692.627.627 0 0 1-.866.574.625.625 0 0 1-.384-.579m-1.875-2.5V3.25a.625.625 0 1 1 1.25 0v1.875a.625.625 0 0 1-1.25 0m7.942 6.433a.624.624 0 1 1-.884.883l-1.25-1.25a.625.625 0 1 1 .884-.884zm.38-3.34-1.874.625a.625.625 0 0 1-.396-1.186l1.875-.625a.625.625 0 0 1 .396 1.186"/></symbol><symbol viewBox="0 0 24 24" id="copy" xmlns="http://www.w3.org/2000/svg"><path d="M8.735 15.28c.33.33.72.49 1.18.49v.01h7.5c.46 0 .85-.16 1.18-.49s.49-.72.49-1.18V6.56c0-.46-.16-.85-.49-1.18s-.72-.49-1.18-.49h-7.5c-.46 0-.85.16-1.18.49s-.49.72-.49 1.18v7.54c0 .46.16.85.49 1.18"/><path d="M5.405 18.62c.33.33.72.49 1.18.49h9.17v-1.67h-9.17V8.22h-1.67v9.22c0 .46.16.85.49 1.18"/></symbol><symbol viewBox="0 0 24 24" id="credit-card" xmlns="http://www.w3.org/2000/svg"><path d="M19.5 5.75h-15A1.25 1.25 0 0 0 3.25 7v10a1.25 1.25 0 0 0 1.25 1.25h15A1.25 1.25 0 0 0 20.75 17V7a1.25 1.25 0 0 0-1.25-1.25m-6.875 10h-1.25a.624.624 0 1 1 0-1.25h1.25a.624.624 0 1 1 0 1.25m5 0h-2.5a.624.624 0 1 1 0-1.25h2.5a.624.624 0 1 1 0 1.25M4.5 8.875V7h15v1.875z"/></symbol><symbol viewBox="0 0 24 24" id="cube-focus" xmlns="http://www.w3.org/2000/svg"><path d="M20.125 5.75v3.125a.625.625 0 1 1-1.25 0v-2.5h-2.5a.625.625 0 1 1 0-1.25H19.5a.625.625 0 0 1 .625.625m-12.5 11.875h-2.5v-2.5a.625.625 0 1 0-1.25 0v3.125a.625.625 0 0 0 .625.625h3.125a.625.625 0 1 0 0-1.25M19.5 14.5a.624.624 0 0 0-.625.625v2.5h-2.5a.624.624 0 1 0 0 1.25H19.5a.624.624 0 0 0 .625-.625v-3.125a.624.624 0 0 0-.625-.625m-15-5a.625.625 0 0 0 .625-.625v-2.5h2.5a.625.625 0 0 0 0-1.25H4.5a.625.625 0 0 0-.625.625v3.125A.625.625 0 0 0 4.5 9.5m11.4-.991-3.588-2.052a.63.63 0 0 0-.62 0L8.1 8.509a.313.313 0 0 0 0 .546l3.9 2.226 3.9-2.23a.312.312 0 0 0 0-.542M7 10.4v4.1a.63.63 0 0 0 .313.547l3.593 2.052a.312.312 0 0 0 .469-.27v-4.466L7.469 10.13A.312.312 0 0 0 7 10.4m10 4.1v-4.1a.312.312 0 0 0-.469-.27l-3.906 2.233v4.461a.312.312 0 0 0 .469.271l3.594-2.048A.63.63 0 0 0 17 14.5"/></symbol><symbol viewBox="0 0 24 24" id="cursor" xmlns="http://www.w3.org/2000/svg"><path d="m19.226 18.234-.992.992a.937.937 0 0 1-1.328 0l-4.42-4.42-1.502 3.919-.01.026a1.24 1.24 0 0 1-1.141.749h-.061a1.235 1.235 0 0 1-1.126-.86L4.563 6.135a1.246 1.246 0 0 1 1.571-1.572l12.507 4.084a1.25 1.25 0 0 1 .11 2.328l-.026.01-3.919 1.506 4.42 4.419a.937.937 0 0 1 0 1.325"/></symbol><symbol viewBox="0 0 24 24" id="cursor-click" xmlns="http://www.w3.org/2000/svg"><path d="M19.226 16.909a.94.94 0 0 1 0 1.328l-.992.989a.937.937 0 0 1-1.328 0l-4.418-4.42-1.504 3.92c0 .008-.006.016-.01.025a1.24 1.24 0 0 1-1.14.749h-.062a1.24 1.24 0 0 1-1.126-.86L4.563 6.135a1.25 1.25 0 0 1 1.571-1.572l12.507 4.084a1.25 1.25 0 0 1 .11 2.328l-.025.01-3.92 1.506zM9.5 4.5a.625.625 0 0 0 .625-.625V3.25a.625.625 0 0 0-1.25 0v.625A.625.625 0 0 0 9.5 4.5m-6.25 5.625h.625a.625.625 0 0 0 0-1.25H3.25a.625.625 0 0 0 0 1.25m8.47-5.066a.625.625 0 0 0 .84-.28l.624-1.25a.625.625 0 1 0-1.117-.559l-.626 1.25a.623.623 0 0 0 .28.84m-7.5 6.382-1.25.625a.625.625 0 0 0 .56 1.118l1.25-.625a.626.626 0 0 0-.082-1.152.63.63 0 0 0-.478.034"/></symbol><symbol viewBox="0 0 24 24" id="cut" xmlns="http://www.w3.org/2000/svg"><path d="M17.833 19.5 12 13.667l-1.958 1.958q.165.312.229.667.062.354.062.708a3.2 3.2 0 0 1-.979 2.354 3.2 3.2 0 0 1-2.354.98 3.2 3.2 0 0 1-2.354-.98A3.2 3.2 0 0 1 3.666 17q0-1.375.98-2.354A3.2 3.2 0 0 1 7 13.666q.354 0 .708.063.355.063.667.23L10.333 12l-1.958-1.958q-.312.165-.667.229a4 4 0 0 1-.708.062 3.2 3.2 0 0 1-2.354-.979A3.2 3.2 0 0 1 3.666 7q0-1.375.98-2.354A3.2 3.2 0 0 1 7 3.666a3.2 3.2 0 0 1 2.354.98A3.2 3.2 0 0 1 10.334 7q0 .354-.063.708a2.2 2.2 0 0 1-.23.667l10.292 10.292v.833zM14.5 11.167 12.833 9.5l5-5h2.5v.833zM7 8.667q.687 0 1.177-.49T8.667 7t-.49-1.177A1.6 1.6 0 0 0 7 5.333q-.687 0-1.177.49T5.333 7t.49 1.177T7 8.667m5 3.75a.4.4 0 0 0 .292-.125.4.4 0 0 0 0-.584.4.4 0 0 0-.584 0 .4.4 0 0 0-.125.292.4.4 0 0 0 .125.292.4.4 0 0 0 .292.125m-5 6.25q.687 0 1.177-.49T8.667 17t-.49-1.177A1.6 1.6 0 0 0 7 15.333q-.687 0-1.177.49T5.333 17t.49 1.177 1.177.49"/></symbol><symbol viewBox="0 0 24 24" id="data-object" xmlns="http://www.w3.org/2000/svg"><path d="M13.667 18.667V17h2.5q.354 0 .593-.24.24-.24.24-.593V14.5q0-.792.458-1.437a2.5 2.5 0 0 1 1.209-.917v-.292a2.5 2.5 0 0 1-1.209-.916A2.43 2.43 0 0 1 17 9.5V7.833a.8.8 0 0 0-.24-.593.8.8 0 0 0-.593-.24h-2.5V5.333h2.5q1.041 0 1.77.73a2.4 2.4 0 0 1 .73 1.77V9.5q0 .354.24.594.239.24.593.24h.833v3.333H19.5a.8.8 0 0 0-.594.24.8.8 0 0 0-.24.593v1.667a2.4 2.4 0 0 1-.729 1.77 2.4 2.4 0 0 1-1.77.73zm-5.834 0a2.4 2.4 0 0 1-1.77-.73 2.4 2.4 0 0 1-.73-1.77V14.5a.8.8 0 0 0-.24-.594.8.8 0 0 0-.593-.24h-.833v-3.333H4.5q.354 0 .594-.24.24-.239.24-.593V7.833q0-1.041.728-1.77a2.4 2.4 0 0 1 1.771-.73h2.5V7h-2.5a.8.8 0 0 0-.593.24.8.8 0 0 0-.24.593V9.5q0 .792-.458 1.438a2.5 2.5 0 0 1-1.209.916v.292q.75.27 1.209.916Q7 13.709 7 14.5v1.667q0 .354.24.593.24.24.593.24h2.5v1.667z"/></symbol><symbol viewBox="0 0 24 24" id="database" xmlns="http://www.w3.org/2000/svg"><path d="M12 11.167q3.125 0 5.313-.98Q19.5 9.21 19.5 7.834q0-1.374-2.187-2.354Q15.125 4.5 12 4.5q-3.125 0-5.312.98Q4.5 6.458 4.5 7.832t2.188 2.355q2.187.978 5.312.979m0 2.083q.855 0 2.135-.177a13.7 13.7 0 0 0 2.47-.573q1.186-.396 2.04-1.031.855-.636.855-1.552V12q0 .917-.854 1.552-.855.635-2.042 1.031t-2.469.573q-1.281.177-2.135.177-.855 0-2.135-.177a13.7 13.7 0 0 1-2.47-.573q-1.186-.396-2.04-1.03Q4.5 12.915 4.5 12V9.917q0 .916.854 1.552.854.635 2.042 1.031a13.7 13.7 0 0 0 2.469.573q1.281.177 2.135.177m0 4.167q.855 0 2.135-.177a13.7 13.7 0 0 0 2.47-.573q1.186-.396 2.04-1.032.855-.634.855-1.552v2.084q0 .916-.854 1.552-.855.635-2.042 1.031t-2.469.573Q12.854 19.5 12 19.5q-.855 0-2.135-.177a13.7 13.7 0 0 1-2.47-.573q-1.186-.396-2.04-1.031-.855-.636-.855-1.552v-2.084q0 .917.854 1.552.854.636 2.042 1.032a13.7 13.7 0 0 0 2.469.573q1.281.177 2.135.177"/></symbol><symbol viewBox="0 0 24 24" id="devices" xmlns="http://www.w3.org/2000/svg"><path d="M3.667 18.667v-2.5h1.666V7q0-.687.49-1.177T7 5.333h12.5V7H7v9.167h5v2.5zm10.833 0a.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.594V9.5q0-.354.24-.594t.594-.24h5q.354 0 .594.24t.24.594v8.333q0 .354-.24.594a.8.8 0 0 1-.594.24z"/></symbol><symbol viewBox="0 0 24 24" id="dictionary" xmlns="http://www.w3.org/2000/svg"><path d="M5.333 13.854h.938l.479-1.375h2.167l.5 1.375h.916L8.313 8.48h-.959zm1.688-2.146.792-2.229h.041l.792 2.23zm6.646-1.458V8.833a7.3 7.3 0 0 1 3.979-.5q.52.083 1.02.209v1.333a6 6 0 0 0-1.01-.281 6 6 0 0 0-1.073-.094q-.79 0-1.52.198a6.7 6.7 0 0 0-1.396.552m0 4.583v-1.416q.687-.292 1.406-.438.72-.146 1.51-.146.543 0 1.063.084.52.083 1.02.208v1.333a6 6 0 0 0-1.01-.28 6 6 0 0 0-1.073-.095q-.79 0-1.52.188a5.8 5.8 0 0 0-1.396.562m0-2.291v-1.417a7.3 7.3 0 0 1 3.979-.5q.52.084 1.02.208v1.334a6 6 0 0 0-1.01-.282 6 6 0 0 0-1.073-.093q-.79 0-1.52.198a6.7 6.7 0 0 0-1.396.552m-.834 3.666a9 9 0 0 1 1.844-.656 8.559 8.559 0 0 1 3.375-.094q.72.126 1.448.375v-8.25a7.2 7.2 0 0 0-1.427-.437 7.7 7.7 0 0 0-3.427.104 7.1 7.1 0 0 0-1.813.75zM12 18.667a8 8 0 0 0-2.167-1.23A6.8 6.8 0 0 0 7.417 17q-.876 0-1.719.23-.843.228-1.615.645-.437.23-.843-.02a.8.8 0 0 1-.407-.73V7.083q0-.228.115-.437a.72.72 0 0 1 .344-.313 8.7 8.7 0 0 1 2-.75 9 9 0 0 1 2.125-.25q1.207 0 2.364.313 1.156.312 2.219.937a9 9 0 0 1 4.583-1.25q1.084 0 2.125.25a8.7 8.7 0 0 1 2 .75q.23.105.344.313a.9.9 0 0 1 .115.437v10.042q0 .48-.407.73t-.843.02a7.5 7.5 0 0 0-1.615-.646A6.5 6.5 0 0 0 16.583 17q-1.25 0-2.416.438Q13 17.874 12 18.667"/></symbol><symbol viewBox="0 0 24 24" id="dna" xmlns="http://www.w3.org/2000/svg"><path d="M17.625 17.977v2.148a.625.625 0 1 1-1.25 0v-2.148a4.97 4.97 0 0 0-2.764-4.473l-3.781-1.89a6.22 6.22 0 0 1-3.455-5.59v-2.15a.625.625 0 1 1 1.25 0v2.148a4.97 4.97 0 0 0 2.764 4.473l3.781 1.89a6.22 6.22 0 0 1 3.455 5.59m-3.125-.352H7.638a4.94 4.94 0 0 1 .253-1.25h5.68a.625.625 0 1 0 0-1.25h-5.05a4.98 4.98 0 0 1 1.144-1.178.627.627 0 0 0-.74-1.01 6.27 6.27 0 0 0-2.55 5.04v2.148a.625.625 0 1 0 1.25 0v-1.25H14.5a.625.625 0 1 0 0-1.25M17 3.25a.625.625 0 0 0-.625.625v1.25H9.5a.625.625 0 0 0 0 1.25h6.862a4.94 4.94 0 0 1-.253 1.25h-5.68a.625.625 0 0 0 0 1.25h5.05a4.96 4.96 0 0 1-1.144 1.178.626.626 0 0 0 .74 1.008 6.27 6.27 0 0 0 2.55-5.038V3.875A.625.625 0 0 0 17 3.25"/></symbol><symbol viewBox="0 0 24 24" id="donut" xmlns="http://www.w3.org/2000/svg"><path d="M12 14.5a2.4 2.4 0 0 0 1.77-.73q.73-.727.73-1.77 0-1.042-.73-1.77A2.4 2.4 0 0 0 12 9.5a2.4 2.4 0 0 0-1.77.73A2.4 2.4 0 0 0 9.5 12q0 1.042.73 1.77a2.4 2.4 0 0 0 1.77.73m0 5.833a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.646-1.781 8.4 8.4 0 0 1-1.781-2.646A8.1 8.1 0 0 1 3.667 12q0-1.73.656-3.25a8.4 8.4 0 0 1 1.781-2.646A8.4 8.4 0 0 1 8.75 4.323 8.1 8.1 0 0 1 12 3.667q1.73 0 3.25.656a8.4 8.4 0 0 1 2.646 1.781 8.4 8.4 0 0 1 1.781 2.646 8.1 8.1 0 0 1 .656 3.25 8.1 8.1 0 0 1-.656 3.25 8.4 8.4 0 0 1-1.781 2.646 8.4 8.4 0 0 1-2.646 1.781 8.1 8.1 0 0 1-3.25.656"/></symbol><symbol viewBox="0 0 24 24" id="dot" xmlns="http://www.w3.org/2000/svg"><path d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5m0 4.688a.937.937 0 1 1 0-1.875.937.937 0 0 1 0 1.874"/></symbol><symbol viewBox="0 0 24 24" id="dots" xmlns="http://www.w3.org/2000/svg"><path d="M7 13.667q-.687 0-1.177-.49A1.6 1.6 0 0 1 5.333 12q0-.687.49-1.177T7 10.333t1.177.49.49 1.177-.49 1.177-1.177.49m5 0q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177q0-.687.49-1.177t1.177-.49 1.177.49.49 1.177-.49 1.177-1.177.49m5 0q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177q0-.687.49-1.177t1.177-.49 1.177.49.49 1.177-.49 1.177-1.177.49"/></symbol><symbol viewBox="0 0 24 24" id="download" xmlns="http://www.w3.org/2000/svg"><path d="m12 15.333-4.167-4.166L9 9.958l2.167 2.167V5.333h1.666v6.792L15 9.958l1.167 1.209zm-5 3.334q-.687 0-1.177-.49A1.6 1.6 0 0 1 5.333 17v-2.5H7V17h10v-2.5h1.667V17q0 .687-.49 1.177t-1.177.49z"/></symbol><symbol viewBox="0 0 24 24" id="download-cloud" xmlns="http://www.w3.org/2000/svg"><path d="M7.417 18.636q-1.896 0-3.24-1.313t-1.344-3.208q0-1.626.98-2.896a4.33 4.33 0 0 1 2.562-1.625A5.8 5.8 0 0 1 8.156 6.76a5.7 5.7 0 0 1 3.01-1.395v6.729l-1.333-1.292-1.166 1.167L12 15.302l3.333-3.333-1.166-1.167-1.334 1.292v-6.73q2.146.292 3.573 1.928t1.427 3.844a3.64 3.64 0 0 1 2.386 1.239q.948 1.073.948 2.51 0 1.563-1.094 2.657-1.095 1.093-2.656 1.093z"/></symbol><symbol viewBox="0 0 24 24" id="edit" xmlns="http://www.w3.org/2000/svg"><path d="M6.167 19.5q-.688 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V6.167q0-.688.49-1.177.489-.49 1.177-.49h7.437l-1.666 1.667H6.167v11.666h11.666v-5.791l1.667-1.667v7.458q0 .688-.49 1.177-.489.49-1.177.49zm3.333-5v-3.542l7.646-7.645q.25-.25.562-.376.313-.124.625-.124a1.65 1.65 0 0 1 1.188.5L20.687 4.5q.23.25.355.552.125.301.125.615 0 .312-.115.614a1.6 1.6 0 0 1-.364.552L13.042 14.5zm1.667-1.667h1.166L17.167 8l-.584-.583-.604-.584-4.812 4.813z"/></symbol><symbol viewBox="0 0 24 24" id="encrypted" xmlns="http://www.w3.org/2000/svg"><path d="M10.75 14.833h2.5l-.48-2.687q.418-.209.657-.604.24-.396.24-.875 0-.688-.49-1.177A1.6 1.6 0 0 0 12 9q-.687 0-1.177.49-.49.489-.49 1.177 0 .479.24.875t.656.604zM12 20.667q-2.895-.73-4.781-3.323-1.886-2.595-1.886-5.76V6.5L12 4l6.667 2.5v5.083q0 3.167-1.886 5.76-1.885 2.595-4.781 3.324"/></symbol><symbol viewBox="0 0 24 24" id="envelope" xmlns="http://www.w3.org/2000/svg"><path d="M5.333 18.667q-.687 0-1.177-.49A1.6 1.6 0 0 1 3.666 17V7q0-.687.49-1.177t1.177-.49h13.334q.687 0 1.177.49T20.334 7v10q0 .687-.49 1.177t-1.177.49zM12 12.833l6.667-4.166V7L12 11.167 5.333 7v1.667z"/></symbol><symbol viewBox="0 0 24 24" id="equal" xmlns="http://www.w3.org/2000/svg"><path d="M5.333 16.167v-2.5h13.334v2.5zm0-5.834v-2.5h13.334v2.5z"/></symbol><symbol viewBox="0 0 24 24" id="eraser" xmlns="http://www.w3.org/2000/svg"><path d="M16.36 17.417h3.958v1.666h-5.625zM5.942 19.083l-1.771-1.77a1.65 1.65 0 0 1-.49-1.188q-.01-.708.47-1.208l9.166-9.5q.48-.5 1.177-.5a1.6 1.6 0 0 1 1.177.479l4.146 4.146q.48.48.479 1.187 0 .708-.48 1.188l-7 7.166z"/></symbol><symbol viewBox="0 0 24 24" id="error" xmlns="http://www.w3.org/2000/svg"><path d="M12 16.167q.354 0 .594-.24t.24-.594a.8.8 0 0 0-.24-.593.8.8 0 0 0-.594-.24.8.8 0 0 0-.594.24.8.8 0 0 0-.24.593q0 .354.24.594t.594.24m-.833-3.334h1.666v-5h-1.666zM8.875 19.5 4.5 15.125v-6.25L8.875 4.5h6.25L19.5 8.875v6.25L15.125 19.5z"/></symbol><symbol viewBox="0 0 24 24" id="event-list" xmlns="http://www.w3.org/2000/svg"><path d="M15.333 19.5q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V14.5q0-.687.49-1.177t1.177-.49h3.334q.687 0 1.177.49t.49 1.177v3.333q0 .688-.49 1.177t-1.177.49zM3.667 17v-1.667h7.5V17zm11.666-5.833q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V6.167q0-.688.49-1.177t1.177-.49h3.334q.687 0 1.177.49.49.489.49 1.177V9.5q0 .687-.49 1.177t-1.177.49zm-11.666-2.5V7h7.5v1.667z"/></symbol><symbol viewBox="0 0 24 24" id="export" xmlns="http://www.w3.org/2000/svg"><path d="M11.17 6.537 9.15 8.55l-.88-.88L12 3.94l3.73 3.73-.88.88-2.01-2.003v8.243h-1.67z"/><path d="M16.96 9.8h-2v1.5h2.5v6h-11v-6h2.5V9.8h-2c-1.1 0-2 .9-2 2v5c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2"/></symbol><symbol viewBox="0 0 24 24" id="extension" xmlns="http://www.w3.org/2000/svg"><path d="M9.755 19.078H6.59q-.688 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177v-3.166q1 0 1.75-.636.75-.635.75-1.614t-.75-1.615a2.62 2.62 0 0 0-1.75-.635V6.578q0-.687.49-1.177.489-.49 1.177-.49h3.333q0-.875.604-1.479a2 2 0 0 1 1.48-.604q.874 0 1.479.604.604.604.604 1.48h3.333q.687 0 1.177.489.49.49.49 1.177v3.333q.874 0 1.479.604.604.604.604 1.48 0 .874-.604 1.479a2 2 0 0 1-1.48.604v3.333q0 .688-.489 1.177-.49.49-1.177.49h-3.167q0-1.042-.656-1.77-.656-.73-1.594-.73-.937 0-1.593.73-.657.728-.657 1.77"/></symbol><symbol viewBox="0 0 24 24" id="eye" xmlns="http://www.w3.org/2000/svg"><path d="M12 15.75q1.563 0 2.656-1.094Q15.751 13.563 15.75 12t-1.094-2.656T12 8.25 9.344 9.344Q8.25 10.437 8.25 12t1.094 2.656Q10.437 15.751 12 15.75m0-1.5a2.17 2.17 0 0 1-1.594-.656A2.17 2.17 0 0 1 9.75 12q0-.937.656-1.594A2.17 2.17 0 0 1 12 9.75a2.17 2.17 0 0 1 1.594.656q.656.657.656 1.594a2.17 2.17 0 0 1-.656 1.594A2.17 2.17 0 0 1 12 14.25m0 4q-3.042 0-5.542-1.698T2.833 12q1.125-2.854 3.625-4.552T12 5.75t5.542 1.698T21.167 12q-1.126 2.854-3.625 4.552T12 18.25"/></symbol><symbol viewBox="0 0 24 24" id="eye-slash" xmlns="http://www.w3.org/2000/svg"><path d="M18.5 21.254 15 17.795a10 10 0 0 1-1.469.344q-.74.114-1.531.114-3.145 0-5.604-1.739t-3.563-4.51Q3.271 10.9 3.938 9.95a9.6 9.6 0 0 1 1.52-1.697L3.167 5.92l1.166-1.166 15.334 15.333zm-6.5-5.5q.23 0 .427-.021.198-.021.427-.084l-4.5-4.5a3 3 0 0 0-.083.428q-.021.197-.021.427 0 1.562 1.094 2.656 1.093 1.094 2.656 1.094m6.083.374-2.645-2.624q.145-.355.229-.72.083-.364.083-.78 0-1.563-1.094-2.657Q13.563 8.254 12 8.254a3.5 3.5 0 0 0-.781.083 3.5 3.5 0 0 0-.719.25L8.375 6.462A9.2 9.2 0 0 1 12 5.754q3.145 0 5.604 1.74 2.46 1.738 3.563 4.51-.48 1.23-1.26 2.28a9.2 9.2 0 0 1-1.824 1.844m-3.854-3.833-2.5-2.5q.585-.104 1.073.094.49.198.844.573t.51.864.073.97"/></symbol><symbol viewBox="0 0 24 24" id="faq" xmlns="http://www.w3.org/2000/svg"><path d="M19.68 8.75A8.5 8.5 0 0 0 17.9 6.1a8.4 8.4 0 0 0-2.65-1.78c-1.01-.44-2.1-.66-3.25-.66s-2.24.22-3.25.66S6.85 5.35 6.1 6.1 4.76 7.73 4.32 8.75s-.66 2.1-.66 3.25.22 2.24.66 3.25 1.03 1.9 1.78 2.65 1.63 1.34 2.65 1.78c1.01.44 2.1.66 3.25.66h6.67c.46 0 .85-.16 1.18-.49s.49-.72.49-1.18V12c0-1.15-.22-2.24-.66-3.25m-7.02 7.95c-.2.2-.45.3-.74.3s-.54-.1-.74-.3-.3-.45-.3-.74.1-.54.3-.74.45-.3.74-.3.54.1.74.3.3.45.3.74-.1.54-.3.74m1.96-6.12c-.2.33-.55.73-1.03 1.22-.36.36-.6.66-.71.9s-.17.6-.17 1.1h-1.54c0-.62.09-1.12.26-1.49s.49-.75.95-1.16c.36-.32.62-.61.77-.88.15-.26.23-.51.23-.75 0-.33-.12-.6-.38-.8-.25-.2-.56-.3-.94-.3a1.61 1.61 0 0 0-1.6 1.25l-1.38-.54q.315-1.005 1.11-1.56c.53-.38 1.18-.56 1.95-.56.85 0 1.52.23 2.02.68s.75 1.05.75 1.78q0 .63-.3 1.11z"/></symbol><symbol viewBox="0 0 24 24" id="file" xmlns="http://www.w3.org/2000/svg"><path d="M8.667 17h6.666v-1.667H8.667zm0-3.333h6.666V12H8.667zM7 20.333q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176V5.333q0-.687.49-1.177T7 3.666h6.667l5 5v10q0 .688-.49 1.178t-1.177.49zM12.833 9.5H17l-4.167-4.167z"/></symbol><symbol viewBox="0 0 24 24" id="file-add" xmlns="http://www.w3.org/2000/svg"><path d="M11.167 17h1.666v-2.5h2.5v-1.667h-2.5v-2.5h-1.666v2.5h-2.5V14.5h2.5zM7 20.333q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176V5.333q0-.687.49-1.177T7 3.666h6.667l5 5v10q0 .688-.49 1.178t-1.177.49zM12.833 9.5H17l-4.167-4.167z"/></symbol><symbol viewBox="0 0 24 24" id="files" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18.55 7.57a.5.5 0 0 0-.13-.19l-3-3a.5.5 0 0 0-.19-.13.6.6 0 0 0-.23-.05H9c-.32 0-.62.13-.85.35-.23.23-.35.53-.35.85v1.2H6.6c-.32 0-.62.13-.85.35-.22.23-.35.53-.35.85v10.8c0 .32.13.62.35.85.23.23.53.35.85.35H15c.32 0 .62-.13.85-.35.22-.23.35-.53.35-.85v-1.2h1.2c.32 0 .62-.13.85-.35.23-.23.35-.53.35-.85V7.8c0-.08-.02-.16-.05-.23m-5.23 9.59H8.04v-1.32h5.28zm0-2.64H8.04V13.2h5.28zm-1.86-3.18v-3.3l3.3 3.3zm5.94 4.86h-1.2v-6c0-.08-.01-.16-.05-.23a.5.5 0 0 0-.13-.19l-3-3a.5.5 0 0 0-.19-.13.6.6 0 0 0-.23-.05H9V5.4h5.75l2.65 2.65z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="filter" xmlns="http://www.w3.org/2000/svg"><path d="M4 7.5h16v1.67H4zm13 3.67H7v1.67h10zm-3 3.66h-4v1.67h4z"/></symbol><symbol viewBox="0 0 24 24" id="filter-remove" xmlns="http://www.w3.org/2000/svg"><path d="M20 7.5H4v1.67h16zM7 11.17h10v1.67H7zm3 3.66h3v1.67h-3zm9.6.43-1.54 1.54 1.54 1.54-.85.85-1.54-1.54-1.54 1.54-.85-.85 1.54-1.54-1.54-1.54.85-.85 1.54 1.54 1.54-1.54z"/></symbol><symbol viewBox="0 0 24 24" id="finish" xmlns="http://www.w3.org/2000/svg"><path d="M6.167 19.5q-.688 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V14.5h1.667v3.333h11.666V6.167H6.167V9.5H4.5V6.167q0-.688.49-1.177.489-.49 1.177-.49h11.666q.688 0 1.177.49.49.489.49 1.177v11.666q0 .688-.49 1.177-.489.49-1.177.49zm4.583-3.333-1.167-1.209 2.125-2.125H4.5v-1.666h7.208L9.583 9.042l1.167-1.209L14.917 12z"/></symbol><symbol viewBox="0 0 24 24" id="fit-screen" xmlns="http://www.w3.org/2000/svg"><path d="M18.667 9.5V7h-2.5V5.333h2.5q.687 0 1.177.49T20.334 7v2.5zm-15 0V7q0-.687.49-1.177.489-.49 1.176-.49h2.5V7h-2.5v2.5zm12.5 9.167V17h2.5v-2.5h1.666V17q0 .687-.49 1.177-.489.49-1.176.49zm-10.834 0q-.687 0-1.177-.49A1.6 1.6 0 0 1 3.666 17v-2.5h1.667V17h2.5v1.667zM7 15.333V8.667h10v6.666z"/></symbol><symbol viewBox="0 0 24 24" id="flag" xmlns="http://www.w3.org/2000/svg"><path d="M5.75 19.667V5.5h7.5l.333 1.667h4.667V15.5h-5.833l-.334-1.667H7.417v5.834z"/></symbol><symbol viewBox="0 0 24 24" id="flag-checkered" xmlns="http://www.w3.org/2000/svg"><path d="M19.76 5.809a.63.63 0 0 0-.67.097c-2.187 1.892-4.04.975-6.188-.088-2.225-1.102-4.747-2.35-7.561.088a.63.63 0 0 0-.216.469V19.5a.625.625 0 0 0 1.25 0v-3.456c2.093-1.653 3.896-.761 5.973.267 1.28.634 2.66 1.316 4.14 1.316 1.089 0 2.23-.37 3.424-1.406a.63.63 0 0 0 .215-.469V6.375a.63.63 0 0 0-.368-.566M6.374 14.534v-3.95c1.316-.88 2.55-.905 3.75-.573v4.042c-1.182-.298-2.432-.279-3.75.481m3.75-8.56c.723.221 1.454.582 2.223.963.88.435 1.805.893 2.777 1.137v4.042c1.2.332 2.433.308 3.75-.574v3.915c-1.318 1.04-2.521 1.072-3.75.696v-4.037c-1.69-.468-3.31-1.64-5-2.105z"/></symbol><symbol viewBox="0 0 24 24" id="forklift" xmlns="http://www.w3.org/2000/svg"><path d="M5.333 19.076a2.4 2.4 0 0 1-1.77-.73 2.4 2.4 0 0 1-.73-1.77q0-.542.209-1.031.208-.49.625-.844v-3.959h1.666v-5H12l3.917 9.23q.125.292.187.583.063.292.063.604a2.8 2.8 0 0 1-.855 2.063 2.8 2.8 0 0 1-2.062.854q-.855 0-1.573-.448a2.77 2.77 0 0 1-1.073-1.219H7.688q-.272.75-.917 1.209-.646.458-1.438.458M17 18.242V4.91h1.667v11.667h2.5v1.666zM5.333 17.41q.354 0 .594-.24t.24-.593a.8.8 0 0 0-.24-.594.8.8 0 0 0-.594-.24.8.8 0 0 0-.593.24.8.8 0 0 0-.24.594q0 .354.24.594t.593.24m7.917 0q.52 0 .886-.364.364-.366.364-.886t-.364-.885a1.2 1.2 0 0 0-.886-.365q-.52 0-.885.365a1.2 1.2 0 0 0-.365.885q0 .521.365.886.364.364.885.364m-3.812-4.166h3.937l-2.48-5.834H7v3.334z"/></symbol><symbol viewBox="0 0 24 24" id="fullscreen" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 19.5v-4.167h1.667v2.5h2.5V19.5zm10.833 0v-1.667h2.5v-2.5H19.5V19.5zM4.5 8.667V4.5h4.167v1.667h-2.5v2.5zm13.333 0v-2.5h-2.5V4.5H19.5v4.167z"/></symbol><symbol viewBox="0 0 24 24" id="fullscreen-exit" xmlns="http://www.w3.org/2000/svg"><path d="M7 19.5V17H4.5v-1.667h4.167V19.5zm8.333 0v-4.167H19.5V17H17v2.5zM4.5 8.667V7H7V4.5h1.667v4.167zm10.833 0V4.5H17V7h2.5v1.667z"/></symbol><symbol viewBox="0 0 24 24" id="garage" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M19.7 16.75V8.76L12 3.63 4.3 8.76v7.99H3V18h18v-1.25zm-8.32 0H7v-1.74h4.38zm0-3.25H7v-1.74h4.38zM17 16.75h-4.38v-1.74H17zm0-3.25h-4.38v-1.74H17z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="gauge" xmlns="http://www.w3.org/2000/svg"><path d="M19.334 9.098a.312.312 0 0 0-.482-.048l-5.893 5.892a.625.625 0 0 1-.88-.883l7.241-7.242a.626.626 0 0 0-.884-.884l-1.045 1.046a8.754 8.754 0 0 0-13.646 9.806 1.26 1.26 0 0 0 1.182.84h14.146a1.25 1.25 0 0 0 1.18-.837 8.77 8.77 0 0 0-.92-7.69M6.488 15.001a.625.625 0 0 1-1.225.248 6.88 6.88 0 0 1 7.955-8.141.625.625 0 1 1-.22 1.23 5.63 5.63 0 0 0-6.51 6.663"/></symbol><symbol viewBox="0 0 24 24" id="globe" xmlns="http://www.w3.org/2000/svg"><path d="M12 20.333a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.646-1.781 8.4 8.4 0 0 1-1.781-2.646A8.1 8.1 0 0 1 3.667 12q0-1.73.656-3.25a8.4 8.4 0 0 1 1.781-2.646A8.4 8.4 0 0 1 8.75 4.323 8.1 8.1 0 0 1 12 3.667q1.73 0 3.25.656a8.4 8.4 0 0 1 2.646 1.781 8.4 8.4 0 0 1 1.781 2.646 8.1 8.1 0 0 1 .656 3.25 8.1 8.1 0 0 1-.656 3.25 8.4 8.4 0 0 1-1.781 2.646 8.4 8.4 0 0 1-2.646 1.781 8.1 8.1 0 0 1-3.25.656m0-1.666q2.792 0 4.73-1.938 1.936-1.937 1.937-4.729 0-.146-.01-.302a4 4 0 0 1-.011-.26q-.105.603-.563 1a1.6 1.6 0 0 1-1.083.395h-1.667q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176v-.834h-3.333V8.667q0-.688.49-1.177T12 7h.833q0-.479.26-.844.261-.364.636-.593a9 9 0 0 0-.844-.167A6 6 0 0 0 12 5.333q-2.791 0-4.73 1.938Q5.335 9.209 5.334 12H9.5a3.2 3.2 0 0 1 2.354.98 3.2 3.2 0 0 1 .98 2.353v.834h-2.5v2.291q.415.105.822.157.406.051.844.052"/></symbol><symbol viewBox="0 0 24 24" id="globe-grid" xmlns="http://www.w3.org/2000/svg"><path d="M12 20.333a8.1 8.1 0 0 1-3.23-.656 8.5 8.5 0 0 1-2.655-1.792 8.5 8.5 0 0 1-1.792-2.656A8.1 8.1 0 0 1 3.667 12a8 8 0 0 1 .656-3.24 8.5 8.5 0 0 1 1.792-2.645A8.5 8.5 0 0 1 8.77 4.323 8.1 8.1 0 0 1 12 3.667a8 8 0 0 1 3.24.656 8.5 8.5 0 0 1 2.645 1.792 8.5 8.5 0 0 1 1.792 2.645 8 8 0 0 1 .656 3.24 8.1 8.1 0 0 1-.656 3.23 8.5 8.5 0 0 1-1.792 2.655 8.5 8.5 0 0 1-2.645 1.792 8 8 0 0 1-3.24.656m0-1.708q.542-.75.938-1.562t.645-1.73h-3.166q.25.917.646 1.73.395.812.937 1.562m-2.167-.333q-.374-.688-.656-1.427a12 12 0 0 1-.469-1.532H6.25a6.9 6.9 0 0 0 1.51 1.813 6 6 0 0 0 2.073 1.146m4.334 0a6 6 0 0 0 2.073-1.146 6.9 6.9 0 0 0 1.51-1.813h-2.458a12 12 0 0 1-.47 1.532q-.28.739-.655 1.427m-8.625-4.625h2.833a11.01 11.01 0 0 1-.094-2.51q.031-.408.094-.824H5.542q-.105.417-.157.823-.051.406-.052.844a6.6 6.6 0 0 0 .209 1.667m4.5 0h3.916q.063-.417.094-.823a11 11 0 0 0 0-1.688q-.03-.405-.094-.823h-3.916q-.063.417-.094.823a11 11 0 0 0 0 1.688q.03.405.094.823m5.583 0h2.833q.105-.417.157-.823.051-.406.052-.844a6.6 6.6 0 0 0-.209-1.667h-2.833q.063.417.094.823a11 11 0 0 1 0 1.688q-.031.405-.094.823m-.333-5h2.458a6.9 6.9 0 0 0-1.51-1.813 6 6 0 0 0-2.073-1.146q.374.688.656 1.427.281.74.469 1.532m-4.875 0h3.166a10 10 0 0 0-.646-1.73A10.6 10.6 0 0 0 12 5.376q-.542.75-.937 1.563a10 10 0 0 0-.646 1.729m-4.167 0h2.458q.188-.792.47-1.532.28-.739.655-1.427A6 6 0 0 0 7.76 6.854a6.9 6.9 0 0 0-1.51 1.813"/></symbol><symbol viewBox="0 0 24 24" id="gripper" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 18.667q-.687 0-1.177-.49A1.6 1.6 0 0 1 7.833 17q0-.687.49-1.177t1.177-.49 1.177.49.49 1.177-.49 1.177-1.177.49m5 0q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177q0-.687.49-1.177t1.177-.49 1.177.49.49 1.177-.49 1.177-1.177.49m-5-5q-.687 0-1.177-.49A1.6 1.6 0 0 1 7.833 12q0-.687.49-1.177t1.177-.49 1.177.49.49 1.177-.49 1.177-1.177.49m5 0q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177q0-.687.49-1.177t1.177-.49 1.177.49.49 1.177-.49 1.177-1.177.49m-5-5q-.687 0-1.177-.49A1.6 1.6 0 0 1 7.833 7q0-.687.49-1.177t1.177-.49 1.177.49.49 1.177-.49 1.177-1.177.49m5 0q-.687 0-1.177-.49A1.6 1.6 0 0 1 12.833 7q0-.687.49-1.177t1.177-.49 1.177.49.49 1.177-.49 1.177-1.177.49"/></symbol><symbol viewBox="0 0 24 24" id="handle" xmlns="http://www.w3.org/2000/svg"><path d="M5.333 14.5v-1.667h13.334V14.5zm0-3.333V9.5h13.334v1.667z"/></symbol><symbol viewBox="0 0 24 24" id="handle-vertical" xmlns="http://www.w3.org/2000/svg"><path d="M11.17 5.335v13.33H9.5V5.335zm3.33 0v13.33h-1.67V5.335z"/></symbol><symbol viewBox="0 0 24 24" id="hash" xmlns="http://www.w3.org/2000/svg"><path d="m7 18.667.833-3.334H4.5l.417-1.666H8.25l.833-3.334H5.75l.417-1.666H9.5l.833-3.334H12l-.833 3.334H14.5l.833-3.334H17l-.833 3.334H19.5l-.417 1.666H15.75l-.833 3.334h3.333l-.417 1.666H14.5l-.833 3.334H12l.833-3.334H9.5l-.833 3.334zm2.917-5h3.333l.833-3.334H10.75z"/></symbol><symbol viewBox="0 0 24 24" id="heart" xmlns="http://www.w3.org/2000/svg"><path d="M20.7 9.37a5.18 5.18 0 0 0-1.87-3.35c-1.01-.8-2.3-1.16-3.56-.97-1.59.23-2.56 1.16-3.27 2.5-.71-1.35-1.68-2.27-3.27-2.5-1.27-.18-2.55.17-3.57.98A5.08 5.08 0 0 0 3.3 9.37c-.75 5.67 8.07 10.36 8.41 10.55.09.05.19.08.29.08s.2-.03.29-.08c.34-.19 9.16-4.88 8.41-10.55"/></symbol><symbol viewBox="0 0 24 24" id="heart-outlined" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15.93 5c-.22 0-.44.02-.66.05-1.59.23-2.56 1.16-3.27 2.5-.71-1.35-1.68-2.27-3.27-2.5-.22-.03-.44-.05-.66-.05a4.7 4.7 0 0 0-2.91 1.03A5.08 5.08 0 0 0 3.3 9.37c-.75 5.67 8.07 10.36 8.41 10.55.09.05.19.08.29.08s.2-.03.29-.08c.34-.19 9.16-4.88 8.41-10.55a5.18 5.18 0 0 0-1.87-3.35A4.7 4.7 0 0 0 15.93 5m0 1.67c.68 0 1.32.23 1.87.66.68.54 1.13 1.36 1.25 2.26.44 3.31-4.02 6.83-7.05 8.59-3.03-1.76-7.49-5.28-7.05-8.59.12-.9.58-1.72 1.25-2.26a3 3 0 0 1 2.29-.63c.91.13 1.5.6 2.03 1.63.29.55.86.89 1.47.89s1.19-.34 1.47-.89c.54-1.02 1.13-1.49 2.03-1.63q.21-.03.42-.03" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="help" xmlns="http://www.w3.org/2000/svg"><path d="M12 17q.438 0 .74-.302t.302-.74-.302-.74a1 1 0 0 0-.74-.301q-.437 0-.74.302a1 1 0 0 0-.302.74q0 .437.302.739.303.302.74.302m-.75-3.208h1.542q0-.75.166-1.104.167-.355.709-.896.73-.73 1.03-1.22.303-.488.303-1.114 0-1.104-.75-1.78Q13.5 7 12.23 7q-1.147 0-1.949.563T9.167 9.125l1.375.542q.145-.562.583-.907.438-.343 1.02-.343.563 0 .938.302t.375.802q0 .354-.229.75-.23.395-.77.875-.688.604-.949 1.156-.26.552-.26 1.49M6.167 19.5q-.688 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V6.167q0-.688.49-1.177.489-.49 1.177-.49h11.666q.688 0 1.177.49.49.489.49 1.177v11.666q0 .688-.49 1.177-.489.49-1.177.49z"/></symbol><symbol viewBox="0 0 24 24" id="history" xmlns="http://www.w3.org/2000/svg"><path d="M12 19.5q-2.875 0-5.01-1.906-2.136-1.907-2.448-4.76H6.25Q6.542 15 8.177 16.416 9.813 17.833 12 17.833q2.438 0 4.135-1.698 1.698-1.698 1.698-4.135t-1.698-4.135T12 6.167q-1.437 0-2.687.666a6.2 6.2 0 0 0-2.105 1.834H9.5v1.666h-5v-5h1.667v1.959A7.3 7.3 0 0 1 8.76 5.229Q10.292 4.5 12 4.5q1.563 0 2.927.594 1.364.593 2.375 1.604a7.6 7.6 0 0 1 1.604 2.375Q19.5 10.437 19.5 12a7.3 7.3 0 0 1-.594 2.927 7.6 7.6 0 0 1-1.604 2.375 7.6 7.6 0 0 1-2.375 1.604A7.3 7.3 0 0 1 12 19.5m2.333-4-3.166-3.167v-4.5h1.666v3.834l2.667 2.666z"/></symbol><symbol viewBox="0 0 24 24" id="home" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="m18.665 11.44 1.5 1.12 1-1.31-9.16-7-9.17 7 1 1.33 1.5-1.15v6.15h-2.33v1h18v-1h-2.33v-6.15zm-5.16 6.14h-3v-4h3z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="image" xmlns="http://www.w3.org/2000/svg"><path d="M5.333 18.667q-.687 0-1.177-.49A1.6 1.6 0 0 1 3.666 17V7q0-.687.49-1.177t1.177-.49h13.334q.687 0 1.177.49T20.334 7v10q0 .687-.49 1.177t-1.177.49zM7 15.333h10l-3.125-4.166-2.5 3.333L9.5 12z"/></symbol><symbol viewBox="0 0 24 24" id="images" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 13.667h8.333l-2.875-3.75-1.916 2.5-1.292-1.667zM8.667 17q-.688 0-1.177-.49A1.6 1.6 0 0 1 7 15.333v-10q0-.687.49-1.177.489-.49 1.177-.49h10q.687 0 1.177.49t.49 1.177v10q0 .688-.49 1.177t-1.177.49zm-3.334 3.333q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176V7h1.667v11.667H17v1.666z"/></symbol><symbol viewBox="0 0 24 24" id="inbox" xmlns="http://www.w3.org/2000/svg"><path d="M6.167 19.5q-.688 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V6.167q0-.688.49-1.177.489-.49 1.177-.49h11.666q.688 0 1.177.49.49.489.49 1.177v11.666q0 .688-.49 1.177-.489.49-1.177.49zM12 15.333q.792 0 1.438-.458.645-.459.895-1.208h3.5v-7.5H6.167v7.5h3.5q.25.75.896 1.208.646.459 1.437.458"/></symbol><symbol viewBox="0 0 24 24" id="infinity" xmlns="http://www.w3.org/2000/svg"><path d="M6.583 16.583q-1.915 0-3.25-1.333Q2 13.917 2 12t1.333-3.25q1.335-1.333 3.25-1.333.77 0 1.48.27.708.271 1.27.771L10.75 9.75 9.5 10.875 8.208 9.708a2.6 2.6 0 0 0-.75-.458 2.3 2.3 0 0 0-.875-.167 2.8 2.8 0 0 0-2.062.855A2.8 2.8 0 0 0 3.667 12q0 1.209.854 2.063a2.8 2.8 0 0 0 2.062.854q.46 0 .875-.167.417-.167.75-.458l6.459-5.834q.562-.5 1.27-.77.71-.271 1.48-.271 1.915 0 3.25 1.333Q22 10.083 22 12t-1.333 3.25q-1.335 1.333-3.25 1.333-.77 0-1.48-.27a4.1 4.1 0 0 1-1.27-.771L13.25 14.25l1.25-1.125 1.292 1.167q.333.291.75.458.416.167.875.167a2.8 2.8 0 0 0 2.062-.854A2.8 2.8 0 0 0 20.333 12a2.8 2.8 0 0 0-.854-2.062 2.8 2.8 0 0 0-2.062-.855q-.46 0-.875.167a2.6 2.6 0 0 0-.75.458l-6.459 5.834a4.1 4.1 0 0 1-1.27.77q-.71.271-1.48.271"/></symbol><symbol viewBox="0 0 24 24" id="info" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12 3.67A8.33 8.33 0 1 0 20.33 12c0-4.6-3.72-8.33-8.33-8.33m0 2.92c.57 0 1.03.46 1.03 1.03S12.57 8.65 12 8.65s-1.03-.46-1.03-1.03.46-1.03 1.03-1.03m2.24 10H9.76v-1.03h.69c.38 0 .69-.31.69-.69v-3.45c0-.38-.31-.69-.69-.69h-.69V9.7h3.1v5.17c0 .38.31.69.69.69h.69z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="inventory" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.5v2H15v-2h4v2h1.5v1h-17v-1h6v-2zm7 8v1h-17v-1h2v-2h4v2H11v-2h4v2zm0 6v1h-17v-1h1v-2h4v2H10v-2h4v2h1.5v-2h4v2z"/></symbol><symbol viewBox="0 0 24 24" id="invoice" xmlns="http://www.w3.org/2000/svg"><path d="M6.415 8.705c.61.17 1.09.47 1.41.86l-.01-.01c.32.4.49.87.49 1.4 0 .66-.2 1.17-.6 1.52-.33.29-.74.49-1.2.59v.83h-1.49v-.87c-.39-.11-.74-.31-1.04-.57-.2-.18-.37-.42-.53-.74l-.1-.2 1.39-.57c.11.23.22.38.34.48.2.17.45.25.79.25.28 0 .53-.07.72-.19.16-.11.24-.27.24-.5 0-.22-.06-.38-.19-.5-.08-.08-.35-.26-1.16-.52-.76-.24-1.27-.52-1.57-.87s-.45-.79-.45-1.29c0-.6.2-1.09.6-1.43.31-.26.64-.44.97-.52v-.83h1.49v.83c.36.09.68.25.93.47.18.16.34.36.48.61l.12.2-1.39.58a1 1 0 0 0-.26-.34c-.13-.1-.33-.15-.59-.15q-.45 0-.66.18c-.14.12-.2.24-.2.41 0 .19.08.32.25.43.23.14.64.29 1.22.46"/><path fill-rule="evenodd" d="M8.555 5.525h11.09v.01c.34 0 .62.27.62.62v11.06c0 .69-.56 1.25-1.25 1.25H4.985c-.69 0-1.25-.56-1.25-1.25v-2.32l1.67.5v1.4h9v-2.4h-5.85l1-1.2h4.85v-2.4h-4.5v-1.2h8.7v-2.4h-9.05zm7.05 11.27h3v-2.4h-3zm0-3.6h3v-2.4h-3z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="jump-back" xmlns="http://www.w3.org/2000/svg"><path d="M12 19.539a7.3 7.3 0 0 1-2.927-.594 7.6 7.6 0 0 1-2.375-1.604 7.6 7.6 0 0 1-1.604-2.375 7.3 7.3 0 0 1-.594-2.927h1.667q0 2.437 1.698 4.135T12 17.872t4.135-1.698 1.698-4.135-1.698-4.136T12 6.205h-.125l1.292 1.292L12 8.705 8.667 5.372 12 2.04l1.167 1.208-1.292 1.292H12q1.563 0 2.927.594 1.364.593 2.375 1.604a7.6 7.6 0 0 1 1.604 2.375q.594 1.364.594 2.927a7.3 7.3 0 0 1-.594 2.927 7.6 7.6 0 0 1-1.604 2.375 7.6 7.6 0 0 1-2.375 1.604A7.3 7.3 0 0 1 12 19.54"/></symbol><symbol viewBox="0 0 24 24" id="jump-forward" xmlns="http://www.w3.org/2000/svg"><path d="M12 19.539a7.3 7.3 0 0 1-2.927-.594 7.6 7.6 0 0 1-2.375-1.604 7.6 7.6 0 0 1-1.604-2.375 7.3 7.3 0 0 1-.594-2.927q0-1.563.594-2.927.593-1.365 1.604-2.375a7.6 7.6 0 0 1 2.375-1.604A7.3 7.3 0 0 1 12 4.539h.125l-1.292-1.292L12 2.04l3.333 3.333L12 8.705l-1.167-1.208 1.292-1.292H12q-2.437 0-4.135 1.698T6.167 12.04t1.698 4.135T12 17.872t4.135-1.698 1.698-4.135H19.5a7.3 7.3 0 0 1-.594 2.927 7.6 7.6 0 0 1-1.604 2.375 7.6 7.6 0 0 1-2.375 1.604 7.3 7.3 0 0 1-2.927.594"/></symbol><symbol viewBox="0 0 24 24" id="kanban" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 6.375v7.5a.624.624 0 0 1-.625.625H10.75a.624.624 0 0 1-.625-.625v-7.5a.625.625 0 0 1 .625-.625h3.125a.625.625 0 0 1 .625.625m5-.625h-3.125a.625.625 0 0 0-.625.625v4.063a.313.313 0 0 0 .313.312h3.75a.313.313 0 0 0 .312-.312V6.375a.625.625 0 0 0-.625-.625m.313 6.25h-3.75a.313.313 0 0 0-.313.313v3.437A1.25 1.25 0 0 0 17 17h1.875a1.25 1.25 0 0 0 1.25-1.25v-3.437a.313.313 0 0 0-.312-.313M8.25 5.75H5.125a.625.625 0 0 0-.625.625v4.063a.313.313 0 0 0 .313.312h3.75a.31.31 0 0 0 .312-.312V6.375a.625.625 0 0 0-.625-.625M8.563 12h-3.75a.31.31 0 0 0-.313.313v5.937a1.25 1.25 0 0 0 1.25 1.25h1.875a1.25 1.25 0 0 0 1.25-1.25v-5.937A.313.313 0 0 0 8.563 12"/></symbol><symbol viewBox="0 0 24 24" id="kbd" xmlns="http://www.w3.org/2000/svg"><path d="M5.333 17.833q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176V7.833q0-.687.49-1.177t1.177-.49h13.334q.687 0 1.177.49t.49 1.177v8.334q0 .687-.49 1.177t-1.177.49zm3.334-2.5h6.666v-1.666H8.667zm-2.5-2.5h1.666v-1.666H6.167zm2.5 0h1.666v-1.666H8.667zm2.5 0h1.666v-1.666h-1.666zm2.5 0h1.666v-1.666h-1.666zm2.5 0h1.666v-1.666h-1.666zm-10-2.5h1.666V8.667H6.167zm2.5 0h1.666V8.667H8.667zm2.5 0h1.666V8.667h-1.666zm2.5 0h1.666V8.667h-1.666zm2.5 0h1.666V8.667h-1.666z"/></symbol><symbol viewBox="0 0 24 24" id="kbd-backspace" xmlns="http://www.w3.org/2000/svg"><path d="m10.5 15.333 2.167-2.166 2.166 2.166L16 14.167 13.833 12 16 9.833l-1.167-1.166-2.166 2.166L10.5 8.667 9.333 9.833 11.5 12l-2.167 2.167zm-2 3.334A1.66 1.66 0 0 1 7.167 18l-4.5-6 4.5-6q.229-.312.583-.49.354-.177.75-.177h9.167q.687 0 1.177.49T19.334 7v10q0 .687-.49 1.177t-1.177.49z"/></symbol><symbol viewBox="0 0 24 24" id="kbd-capslock" xmlns="http://www.w3.org/2000/svg"><path d="M7 16.167V14.5h10v1.667zm5-10.334 5 5L15.833 12 12 8.167 8.167 12 7 10.833z"/></symbol><symbol viewBox="0 0 24 24" id="kbd-command" xmlns="http://www.w3.org/2000/svg"><path d="M7.417 19.5a2.8 2.8 0 0 1-2.063-.854 2.8 2.8 0 0 1-.854-2.063q0-1.208.854-2.062a2.8 2.8 0 0 1 2.063-.854h1.25v-3.334h-1.25a2.8 2.8 0 0 1-2.063-.854A2.8 2.8 0 0 1 4.5 7.417q0-1.209.854-2.063A2.8 2.8 0 0 1 7.417 4.5a2.8 2.8 0 0 1 2.062.854q.854.854.854 2.063v1.25h3.334v-1.25q0-1.209.854-2.063a2.8 2.8 0 0 1 2.062-.854 2.8 2.8 0 0 1 2.063.854q.855.854.854 2.063a2.8 2.8 0 0 1-.854 2.062 2.8 2.8 0 0 1-2.063.854h-1.25v3.334h1.25a2.8 2.8 0 0 1 2.063.854q.855.855.854 2.062a2.8 2.8 0 0 1-.854 2.063 2.8 2.8 0 0 1-2.063.854 2.8 2.8 0 0 1-2.062-.854 2.8 2.8 0 0 1-.854-2.063v-1.25h-3.334v1.25a2.8 2.8 0 0 1-.854 2.063 2.8 2.8 0 0 1-2.062.854m0-1.667q.52 0 .885-.364t.365-.886v-1.25h-1.25q-.522 0-.886.365a1.2 1.2 0 0 0-.364.885q0 .522.364.886t.886.364m9.166 0q.522 0 .886-.364t.364-.886q0-.52-.364-.885a1.2 1.2 0 0 0-.886-.365h-1.25v1.25q0 .522.365.886t.885.364m-6.25-4.166h3.334v-3.334h-3.334zm-2.916-5h1.25v-1.25q0-.522-.365-.886a1.2 1.2 0 0 0-.885-.364q-.522 0-.886.364a1.2 1.2 0 0 0-.364.886q0 .52.364.885t.886.365m7.916 0h1.25q.522 0 .886-.365t.364-.885q0-.522-.364-.886a1.2 1.2 0 0 0-.886-.364q-.52 0-.885.364a1.2 1.2 0 0 0-.365.886z"/></symbol><symbol viewBox="0 0 24 24" id="kbd-control" xmlns="http://www.w3.org/2000/svg"><path d="m7.333 14.5-1.166-1.167L12 7.5l5.833 5.833-1.166 1.167L12 9.854z"/></symbol><symbol viewBox="0 0 24 24" id="kbd-hide" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.333 8.667 18h6.666zm-6.667-5q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176V6.333q0-.687.49-1.177t1.177-.49h13.334q.687 0 1.177.49t.49 1.177v8.334q0 .687-.49 1.177t-1.177.49zm3.334-2.5h6.666v-1.666H8.667zm-2.5-2.5h1.666V9.667H6.167zm2.5 0h1.666V9.667H8.667zm2.5 0h1.666V9.667h-1.666zm2.5 0h1.666V9.667h-1.666zm2.5 0h1.666V9.667h-1.666zm-10-2.5h1.666V7.167H6.167zm2.5 0h1.666V7.167H8.667zm2.5 0h1.666V7.167h-1.666zm2.5 0h1.666V7.167h-1.666zm2.5 0h1.666V7.167h-1.666z"/></symbol><symbol viewBox="0 0 24 24" id="kbd-option" xmlns="http://www.w3.org/2000/svg"><path d="m14.313 17.833-5.771-10H4.5V6.167h5l5.77 10h4.23v1.666zm.187-10V6.167h5v1.666z"/></symbol><symbol viewBox="0 0 24 24" id="kbd-return" xmlns="http://www.w3.org/2000/svg"><path d="m9 17.5-5-5 5-5 1.167 1.167-3 3h10.166V8.333H19v5H7.167l3 3z"/></symbol><symbol viewBox="0 0 24 24" id="kbd-shift" xmlns="http://www.w3.org/2000/svg"><path d="M8.667 19.413v-6.666H4.5L12 3.58l7.5 9.167h-4.167v6.666zm1.666-1.666h3.334V11.08h2.312L12 6.205 8.02 11.08h2.313z"/></symbol><symbol viewBox="0 0 24 24" id="kbd-space" xmlns="http://www.w3.org/2000/svg"><path d="M5.333 17.167v-5H7V15.5h10v-3.333h1.667v5z"/></symbol><symbol viewBox="0 0 24 24" id="lightning" xmlns="http://www.w3.org/2000/svg"><path d="m18.707 11.802-8.75 9.375a.625.625 0 0 1-1.07-.547l1.146-5.73-4.503-1.69a.626.626 0 0 1-.234-1.016l8.75-9.374a.625.625 0 0 1 1.07.546l-1.149 5.736 4.502 1.688a.625.625 0 0 1 .235 1.012z"/></symbol><symbol viewBox="0 0 24 24" id="line-segment" xmlns="http://www.w3.org/2000/svg"><path d="M18.548 8.546a2.19 2.19 0 0 1-2.588.377L8.923 15.96a2.187 2.187 0 1 1-.883-.883l7.037-7.037a2.187 2.187 0 1 1 3.47.506"/></symbol><symbol viewBox="0 0 24 24" id="line-segments" xmlns="http://www.w3.org/2000/svg"><path d="M20.423 7.921a2.18 2.18 0 0 1-1.991.596l-2.388 4.435a2.187 2.187 0 1 1-3.471.507l-2.036-2.035a2.2 2.2 0 0 1-1.48.218l-2.388 4.435a2.187 2.187 0 1 1-1.104-.595l2.388-4.435a2.19 2.19 0 0 1 0-3.095 2.188 2.188 0 0 1 3.471 2.588l2.036 2.036c.454-.244.98-.321 1.484-.217l2.389-4.435a2.188 2.188 0 1 1 3.094 0z"/></symbol><symbol viewBox="0 0 24 24" id="link" xmlns="http://www.w3.org/2000/svg"><path d="M11.167 16.167H7.833q-1.728 0-2.948-1.219Q3.667 13.73 3.667 12t1.218-2.948q1.22-1.219 2.948-1.219h3.334V9.5H7.833a2.4 2.4 0 0 0-1.77.73 2.4 2.4 0 0 0-.73 1.77q0 1.042.73 1.77a2.4 2.4 0 0 0 1.77.73h3.334zm-2.5-3.334v-1.666h6.666v1.666zm4.166 3.334V14.5h3.334q1.041 0 1.77-.73a2.4 2.4 0 0 0 .73-1.77 2.4 2.4 0 0 0-.73-1.77 2.4 2.4 0 0 0-1.77-.73h-3.334V7.833h3.334q1.729 0 2.947 1.22 1.22 1.218 1.22 2.947t-1.22 2.948q-1.218 1.22-2.947 1.219z"/></symbol><symbol viewBox="0 0 24 24" id="link-slash" xmlns="http://www.w3.org/2000/svg"><path d="m19.666 19.652-1.167 1.167-8-8H8.666v-1.667h.166L7.234 9.555q-.662.152-1.172.66a2.41 2.41 0 0 0-.729 1.771q0 1.043.729 1.77.73.73 1.771.73h3.333v1.666H7.833q-1.73 0-2.948-1.218-1.22-1.219-1.219-2.948 0-1.437.875-2.562.589-.755 1.401-1.161L3.166 5.486 4.333 4.32zm-3.5-11.832q1.73 0 2.948 1.218 1.22 1.22 1.219 2.948a4.1 4.1 0 0 1-.615 2.188 4 4 0 0 1-1.677 1.52l-1.25-1.292a2.54 2.54 0 0 0 1.354-.884q.521-.657.521-1.532 0-1.041-.73-1.771a2.4 2.4 0 0 0-1.77-.729h-3.333V7.82z"/><path d="M15.333 12.82h-.125l-1.667-1.668h1.792z"/></symbol><symbol viewBox="0 0 24 24" id="linked-services" xmlns="http://www.w3.org/2000/svg"><path d="M16.861 9.917q-.99 0-1.719-.59a2.82 2.82 0 0 1-.972-1.494H9.812a2.7 2.7 0 0 1-.72 1.259 2.7 2.7 0 0 1-1.259.72v4.358q.903.243 1.493.972.59.73.59 1.72 0 1.145-.815 1.96a2.68 2.68 0 0 1-1.962.817 2.68 2.68 0 0 1-1.962-.816 2.68 2.68 0 0 1-.816-1.962q0-.99.59-1.719.591-.729 1.493-.972V9.812a2.82 2.82 0 0 1-1.493-.972 2.62 2.62 0 0 1-.59-1.701q0-1.146.816-1.962a2.68 2.68 0 0 1 1.962-.816q.972 0 1.701.59.729.591.972 1.493h4.358q.243-.903.972-1.493.73-.59 1.72-.59 1.145 0 1.96.816.817.816.817 1.962T18.823 9.1a2.68 2.68 0 0 1-1.962.816m0 9.722a2.68 2.68 0 0 1-1.962-.816 2.68 2.68 0 0 1-.816-1.962q0-1.146.816-1.962a2.68 2.68 0 0 1 1.962-.816q1.146 0 1.962.816t.816 1.962-.816 1.962a2.68 2.68 0 0 1-1.962.816"/></symbol><symbol viewBox="0 0 24 24" id="list-bullets" xmlns="http://www.w3.org/2000/svg"><path d="M5.52 6.31c.2-.14.44-.21.69-.21.33 0 .65.14.88.37.24.23.37.55.37.88 0 .24-.07.48-.21.69s-.33.37-.56.46-.48.12-.72.07-.47-.17-.64-.34-.29-.4-.34-.64-.02-.49.07-.72.25-.42.46-.56m0 4.65c.2-.14.44-.21.69-.21.33 0 .65.14.88.37.24.23.37.55.37.88 0 .24-.07.48-.21.69s-.33.37-.56.46-.48.12-.72.07-.47-.17-.64-.34-.29-.4-.34-.64-.02-.49.07-.72.25-.42.46-.56m.69 4.46c-.25 0-.49.07-.69.21-.21.14-.37.33-.46.56s-.12.48-.07.72.17.47.34.64.4.29.64.34.49.02.72-.07.42-.25.56-.46.21-.45.21-.69c0-.33-.13-.65-.37-.88s-.55-.37-.88-.37m3.29.41h10v1.67h-10zm10-4.66h-10v1.67h10zm-10-3V6.5l10 .03v1.66z"/></symbol><symbol viewBox="0 0 24 24" id="list-checks" xmlns="http://www.w3.org/2000/svg"><path d="M6.64 9.26 4.87 7.49 3.71 8.66l2.95 2.95 4.69-4.7-1.17-1.19zm0 6.67-1.77-1.77-1.16 1.16 2.95 2.96 4.69-4.71-1.17-1.18zm6.86-.1h6v1.67h-6zm6-4.66h-6v1.67h6zm-6-3V6.5l6 .03v1.66z"/></symbol><symbol viewBox="0 0 24 24" id="list-numbers" xmlns="http://www.w3.org/2000/svg"><path d="M6.01 6.67v4.43h1.2V5.33l-.6-.3-2.01 1 .54 1.08zm4.49 1.5V6.5l9 .03v1.66zm9 3h-9v1.67h9zm0 4.66h-9v1.67h9zm-11.61.16-.7.93.02-.02-.59.78h1.8v1.2H5.17l-.38-.76 2.3-3.07.02-.028c.035-.051.072-.104.08-.172l.002-.013a.8.8 0 0 0 .008-.217.58.58 0 0 0-.24-.39c-.13-.1-.3-.14-.47-.12s-.33.1-.43.24c-.21.28-.31.76-.31.76l-1.13-.41.22-.6q.105-.255.27-.48c.3-.38.73-.62 1.21-.69.48-.06.96.06 1.35.34.19.14.36.31.48.52.13.2.21.43.24.67.03.23.02.47-.04.7s-.16.44-.31.63z"/></symbol><symbol viewBox="0 0 24 24" id="lock" xmlns="http://www.w3.org/2000/svg"><path d="M7 19.75q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V9.75q0-.687.49-1.177T7 8.083h.833V6.417q0-1.73 1.22-2.948Q10.27 2.249 12 2.25t2.948 1.219q1.22 1.218 1.219 2.948v1.666H17q.687 0 1.177.49t.49 1.177v8.333q0 .688-.49 1.177T17 19.75zm5-4.167q.687 0 1.177-.49.49-.489.49-1.176 0-.688-.49-1.177A1.6 1.6 0 0 0 12 12.25q-.687 0-1.177.49-.49.489-.49 1.177 0 .687.49 1.177t1.177.49m-2.5-7.5h5V6.417a2.4 2.4 0 0 0-.73-1.771 2.4 2.4 0 0 0-1.77-.73 2.4 2.4 0 0 0-1.77.73 2.4 2.4 0 0 0-.73 1.77z"/></symbol><symbol viewBox="0 0 24 24" id="lock-open" xmlns="http://www.w3.org/2000/svg"><path d="M7 8.083h7.5V6.417a2.4 2.4 0 0 0-.73-1.771 2.4 2.4 0 0 0-1.77-.73 2.4 2.4 0 0 0-1.77.73 2.4 2.4 0 0 0-.73 1.77H7.833q0-1.728 1.22-2.947Q10.27 2.249 12 2.25t2.948 1.219q1.22 1.218 1.219 2.948v1.666H17q.687 0 1.177.49t.49 1.177v8.333q0 .688-.49 1.177T17 19.75H7q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V9.75q0-.687.49-1.177T7 8.083m5 7.5q.687 0 1.177-.49.49-.489.49-1.176 0-.688-.49-1.177A1.6 1.6 0 0 0 12 12.25q-.687 0-1.177.49-.49.489-.49 1.177 0 .687.49 1.177t1.177.49"/></symbol><symbol viewBox="0 0 24 24" id="map" xmlns="http://www.w3.org/2000/svg"><path d="M19.884 5.882a.63.63 0 0 0-.536-.113l-4.775 1.194L9.78 4.566a.63.63 0 0 0-.432-.047l-5 1.25a.625.625 0 0 0-.473.606v11.25a.625.625 0 0 0 .777.606l4.775-1.194 4.793 2.397a.64.64 0 0 0 .432.047l5-1.25a.625.625 0 0 0 .473-.606V6.375a.63.63 0 0 0-.24-.493M9.5 15.75a.6.6 0 0 0-.152.019l-4.223 1.055v-9.96l4.302-1.076.073.035zm9.375 1.387-4.302 1.075-.073-.035V8.25a.6.6 0 0 0 .152-.018l4.223-1.056z"/></symbol><symbol viewBox="0 0 24 24" id="map-pin" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.833q-2.937-2.166-4.385-4.208-1.449-2.041-1.448-4 0-2.604 1.625-4.281T12 3.667t4.208 1.677q1.626 1.677 1.625 4.281 0 1.959-1.448 4T12 17.833m0-6.666q.687 0 1.177-.49t.49-1.177-.49-1.177A1.6 1.6 0 0 0 12 7.833q-.687 0-1.177.49t-.49 1.177.49 1.177 1.177.49m-5.833 9.166v-1.666h11.666v1.666z"/></symbol><symbol viewBox="0 0 24 24" id="mark-unread" xmlns="http://www.w3.org/2000/svg"><path d="M5.333 16.583q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176V8.375q0-.312.178-.615.177-.301.49-.468l6.416-3.209 6.292 3.209a1.1 1.1 0 0 1 .427.395q.177.272.24.563H15.27l-4.52-2.292-5.417 2.688zm2.5 3.334q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177v-7.5q0-.687.49-1.177t1.177-.49h10.834q.687 0 1.177.49t.49 1.177v7.5q0 .687-.49 1.177t-1.177.49zm5.417-4.709 5.417-2.791V10.75l-5.417 2.792-5.417-2.792v1.667z"/></symbol><symbol viewBox="0 0 24 24" id="menu" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 17v-1.667h15V17zm0-4.167v-1.666h15v1.666zm0-4.166V7h15v1.667z"/></symbol><symbol viewBox="0 0 24 24" id="menu-close" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 17v-1.667h10.833V17zm13.833-.833L14.167 12l4.166-4.167L19.5 9l-3 3 3 3zM4.5 12.833v-1.666h8.333v1.666zm0-4.166V7h10.833v1.667z"/></symbol><symbol viewBox="0 0 24 24" id="message" xmlns="http://www.w3.org/2000/svg"><path d="M18 6H6c-.69 0-1.25.56-1.25 1.25v11.5c0 .29.17.56.43.68.1.05.21.07.32.07.17 0 .34-.06.48-.17L8.77 17H18c.69 0 1.25-.56 1.25-1.25v-8.5C19.25 6.56 18.69 6 18 6m-3.5 7.75h-6v-1.5h6zm2-3h-8v-1.5h8z"/></symbol><symbol viewBox="0 0 24 24" id="messages" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.865 5.26h8.51c.69 0 1.25.56 1.25 1.25v8.44c0 .2-.12.39-.31.48a.543.543 0 0 1-.57-.07l-1.98-1.65h-6.9c-.69 0-1.25-.56-1.25-1.25V6.51c0-.69.56-1.25 1.25-1.25m.59 6.22h5v-1.25h-5zm0-2.74h7V7.49h-7z" clip-rule="evenodd"/><path d="M6.775 15.72h7.36v-1.01h1.25v1.01c0 .69-.56 1.25-1.25 1.25h-6.9l-1.98 1.65a.54.54 0 0 1-.57.07.53.53 0 0 1-.31-.48V9.77c0-.69.56-1.25 1.25-1.25h1.99v1.25h-1.99v6.91z"/></symbol><symbol viewBox="0 0 24 24" id="minus" xmlns="http://www.w3.org/2000/svg"><path d="M6.167 12.833v-1.666h11.666v1.666z"/></symbol><symbol viewBox="0 0 24 24" id="minus-thick" xmlns="http://www.w3.org/2000/svg"><path d="M5 10.5h14v3H5z"/></symbol><symbol viewBox="0 0 24 24" id="money" xmlns="http://www.w3.org/2000/svg"><path d="M21.083 6.688a.62.62 0 0 0-.606-.032c-3.354 1.641-5.749.872-8.28.061-2.664-.847-5.414-1.726-9.22.132a.63.63 0 0 0-.35.56v9.37a.625.625 0 0 0 .899.562c3.354-1.64 5.749-.872 8.285-.061 1.503.48 3.034.97 4.766.97 1.335 0 2.791-.29 4.446-1.098a.63.63 0 0 0 .35-.561V7.22a.63.63 0 0 0-.29-.533M5.752 13.875a.625.625 0 0 1-1.25 0v-5a.625.625 0 0 1 1.25 0zm6.25.625a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m7.5.625a.625.625 0 0 1-1.25 0v-5a.625.625 0 1 1 1.25 0z"/></symbol><symbol viewBox="0 0 24 24" id="monitor" xmlns="http://www.w3.org/2000/svg"><path d="M7 20v-1.667h4.167v-2.5H5.333q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176v-7.5q0-.688.49-1.177T5.333 5h13.334q.687 0 1.177.49.49.489.49 1.177v7.5q0 .687-.49 1.177t-1.177.49h-5.834v2.5H17V20z"/></symbol><symbol viewBox="0 0 24 24" id="moon" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 7.508h-1.2v-.9h-.9v-1.2h.9v-.9h1.2v.9h.9v1.2h-.9zm-.12 6.01a6.6 6.6 0 0 1-2.75-1.65 6.6 6.6 0 0 1-1.65-2.75 6.55 6.55 0 0 1-.16-3.2c.06-.39.28-.9.28-.9s-.66.07-1.08.22a7.26 7.26 0 0 0-2.95 2.02c-.79.92-1.34 2.01-1.6 3.19a7.197 7.197 0 0 0 8.58 8.58c1.18-.26 2.28-.82 3.19-1.61a7.16 7.16 0 0 0 2.02-2.95c.15-.41.22-1.08.22-1.08s-.51.22-.9.28c-1.06.21-2.16.16-3.2-.16zm3.72-4.51v-1.5h-1.2v1.5h-1.5v1.2h1.5v1.5h1.2v-1.5h1.5v-1.2z"/></symbol><symbol viewBox="0 0 24 24" id="navigation" xmlns="http://www.w3.org/2000/svg"><path d="m6.167 19.917-.834-.834 6.667-15 6.667 15-.834.834-5.833-2.5z"/></symbol><symbol viewBox="0 0 24 24" id="network" xmlns="http://www.w3.org/2000/svg"><path d="M20.75 11.375a.624.624 0 0 1-.625.625h-2.5v2.5h.625a1.25 1.25 0 0 1 1.25 1.25v2.5a1.25 1.25 0 0 1-1.25 1.25h-2.5a1.25 1.25 0 0 1-1.25-1.25v-2.5a1.25 1.25 0 0 1 1.25-1.25h.625V12h-8.75v2.5h.625a1.25 1.25 0 0 1 1.25 1.25v2.5a1.25 1.25 0 0 1-1.25 1.25h-2.5a1.25 1.25 0 0 1-1.25-1.25v-2.5a1.25 1.25 0 0 1 1.25-1.25h.625V12h-2.5a.625.625 0 1 1 0-1.25h7.5V8.875h-.625a1.25 1.25 0 0 1-1.25-1.25v-2.5a1.25 1.25 0 0 1 1.25-1.25h2.5a1.25 1.25 0 0 1 1.25 1.25v2.5a1.25 1.25 0 0 1-1.25 1.25h-.625v1.875h7.5a.624.624 0 0 1 .625.625"/></symbol><symbol viewBox="0 0 24 24" id="network-x" xmlns="http://www.w3.org/2000/svg"><path d="M20.75 11.375a.624.624 0 0 1-.625.625h-2.5v1.25a.624.624 0 1 1-1.25 0V12h-8.75v2.5h.625a1.25 1.25 0 0 1 1.25 1.25v2.5a1.25 1.25 0 0 1-1.25 1.25h-2.5a1.25 1.25 0 0 1-1.25-1.25v-2.5a1.25 1.25 0 0 1 1.25-1.25h.625V12h-2.5a.625.625 0 1 1 0-1.25h7.5V8.875h-.625a1.25 1.25 0 0 1-1.25-1.25v-2.5a1.25 1.25 0 0 1 1.25-1.25h2.5a1.25 1.25 0 0 1 1.25 1.25v2.5a1.25 1.25 0 0 1-1.25 1.25h-.625v1.875h7.5a.624.624 0 0 1 .625.625m-1.433 3.308a.627.627 0 0 0-.884 0L17 16.116l-1.433-1.433a.625.625 0 0 0-.884.884L16.116 17l-1.433 1.433a.625.625 0 0 0 .884.884L17 17.884l1.433 1.433a.624.624 0 1 0 .884-.884L17.884 17l1.433-1.433a.627.627 0 0 0 0-.884"/></symbol><symbol viewBox="0 0 24 24" id="newspaper" xmlns="http://www.w3.org/2000/svg"><path d="M18.875 5.75h-12.5A1.25 1.25 0 0 0 5.125 7v9.375a.625.625 0 1 1-1.25 0v-7.5a.625.625 0 0 0-1.25 0v7.509A1.875 1.875 0 0 0 4.5 18.25h13.75a1.875 1.875 0 0 0 1.875-1.875V7a1.25 1.25 0 0 0-1.25-1.25m-3.125 8.125H9.5a.625.625 0 1 1 0-1.25h6.25a.624.624 0 1 1 0 1.25m0-2.5H9.5a.625.625 0 1 1 0-1.25h6.25a.624.624 0 1 1 0 1.25"/></symbol><symbol viewBox="0 0 24 24" id="newspaper-clipping" xmlns="http://www.w3.org/2000/svg"><path d="M18.875 5.125H5.125a1.25 1.25 0 0 0-1.25 1.25v12.5a.625.625 0 0 0 .905.559L7 18.324l2.22 1.11a.63.63 0 0 0 .56 0l2.22-1.11 2.22 1.11a.63.63 0 0 0 .56 0l2.22-1.11 2.22 1.11a.624.624 0 0 0 .905-.559v-12.5a1.25 1.25 0 0 0-1.25-1.25M11.063 14.5a.313.313 0 0 1-.313.313H7a.31.31 0 0 1-.312-.313v-5A.31.31 0 0 1 7 9.188h3.75a.313.313 0 0 1 .313.312zM17 13.875h-3.75a.624.624 0 1 1 0-1.25H17a.624.624 0 1 1 0 1.25m0-2.5h-3.75a.624.624 0 1 1 0-1.25H17a.624.624 0 1 1 0 1.25"/></symbol><symbol viewBox="0 0 24 24" id="note" xmlns="http://www.w3.org/2000/svg"><path d="M6.417 19.75q-.688 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V6.417q0-.688.49-1.177.489-.49 1.177-.49h11.666q.688 0 1.177.49.49.489.49 1.177v8.333l-5 5zm7.5-1.667 4.166-4.166h-4.166zm-5.834-4.166h4.167V12.25H8.083zm0-3.334h8.334V8.917H8.083z"/></symbol><symbol viewBox="0 0 24 24" id="note-stack" xmlns="http://www.w3.org/2000/svg"><path d="M7.838 18.671V9.484q0-.688.5-1.167t1.187-.48h9.146q.688 0 1.177.49t.49 1.178v6.666l-4.167 4.167H9.505q-.688 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177M3.692 7.213a1.56 1.56 0 0 1 .27-1.24 1.64 1.64 0 0 1 1.084-.677l9.042-1.604q.688-.124 1.24.27.551.397.677 1.084l.208 1.125H9.505a3.2 3.2 0 0 0-2.355.98 3.2 3.2 0 0 0-.979 2.354v7.958a1.9 1.9 0 0 1-.573-.5 1.54 1.54 0 0 1-.302-.708zm14.98 8.125h-3.334v3.333z"/></symbol><symbol viewBox="0 0 24 24" id="notepad" xmlns="http://www.w3.org/2000/svg"><path d="M18.25 4.5h-1.875v-.625a.625.625 0 1 0-1.25 0V4.5h-2.5v-.625a.625.625 0 1 0-1.25 0V4.5h-2.5v-.625a.625.625 0 0 0-1.25 0V4.5H5.75a.625.625 0 0 0-.625.625v12.5a2.5 2.5 0 0 0 2.5 2.5h8.75a2.5 2.5 0 0 0 2.5-2.5v-12.5a.625.625 0 0 0-.625-.625m-6.875 1.875a.625.625 0 1 1 1.25 0V7a.625.625 0 1 1-1.25 0zM8.25 7.625A.625.625 0 0 1 7.625 7v-.625a.625.625 0 0 1 1.25 0V7a.625.625 0 0 1-.625.625m6.25 7.5h-5a.625.625 0 1 1 0-1.25h5a.624.624 0 1 1 0 1.25m0-2.5h-5a.625.625 0 1 1 0-1.25h5a.624.624 0 1 1 0 1.25M16.375 7a.625.625 0 1 1-1.25 0v-.625a.625.625 0 1 1 1.25 0z"/></symbol><symbol viewBox="0 0 24 24" id="notification" xmlns="http://www.w3.org/2000/svg"><path d="M18.875 12v6.25a1.25 1.25 0 0 1-1.25 1.25H5.75a1.25 1.25 0 0 1-1.25-1.25V6.375a1.25 1.25 0 0 1 1.25-1.25H12a.625.625 0 1 1 0 1.25H5.75V18.25h11.875V12a.624.624 0 1 1 1.25 0m-1.562-8.125a2.812 2.812 0 1 0 0 5.624 2.812 2.812 0 0 0 0-5.624"/></symbol><symbol viewBox="0 0 24 24" id="nut" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12 3.34 4.5 7.67v8.66l7.5 4.33 7.5-4.33V7.67zM14.99 14c-.4.59-.96 1.05-1.62 1.33-.66.27-1.38.34-2.08.2s-1.34-.48-1.84-.99c-.5-.5-.85-1.15-.99-1.84s-.07-1.42.2-2.08S9.39 9.4 9.99 9s1.29-.61 2-.61c.95 0 1.87.38 2.54 1.06.67.67 1.05 1.59 1.06 2.54 0 .71-.21 1.41-.61 2z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="order" xmlns="http://www.w3.org/2000/svg"><path d="M6 20a2.31 2.31 0 0 1-1.7-.7 2.31 2.31 0 0 1-.7-1.7v-2.4H6V4h12v13.6q0 1-.7 1.7t-1.7.7zm9.6-1.6a.77.77 0 0 0 .57-.23.77.77 0 0 0 .23-.57v-12H7.6v9.6h7.2v2.4q0 .34.23.57t.57.23M8.4 9.6V8h7.2v1.6zm0 2.4v-1.6h7.2V12z"/></symbol><symbol viewBox="0 0 24 24" id="package" xmlns="http://www.w3.org/2000/svg"><path d="m12.005 3.44-7.8 4.26v8.6l7.79 4.26 7.8-4.27V7.71zm0 1.37 6.03 3.3-2.23 1.22-6.03-3.3zm-6.03 3.3 2.54-1.39 6.03 3.3-2.54 1.39zm12.63 7.48-6 3.29v-6.43l2.4-1.31v3.68l1.2-.66v-3.68l2.4-1.32z"/></symbol><symbol viewBox="0 0 24 24" id="page-first" xmlns="http://www.w3.org/2000/svg"><path d="M6.833 17V7H8.5v10zM16 17l-5-5 5-5 1.167 1.167L13.333 12l3.834 3.833z"/></symbol><symbol viewBox="0 0 24 24" id="page-last" xmlns="http://www.w3.org/2000/svg"><path d="m8 17-1.167-1.167L10.667 12 6.833 8.167 8 7l5 5zm7.5 0V7h1.667v10z"/></symbol><symbol viewBox="0 0 24 24" id="parts" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="m17.99 6-3.57 1.13-.81 3.66 2.76 2.53 3.57-1.13.81-3.66zm-.81 5.25c-.88 0-1.6-.72-1.6-1.6s.72-1.6 1.6-1.6 1.6.72 1.6 1.6-.72 1.6-1.6 1.6" clip-rule="evenodd"/><path d="m9.35 14.23.95.95 4.04-.35-1.77-1.77zm5 .61 1.78 1.78-4.05.34-.95-.95zm-1.44 2.95 1.03 1.03h2.2v-2.19zm-2.7-7.09 2.35 2.35-4.05.34-.49-.49-2 1.99-.85-.85.88-.88L4 11.1l1.84-1.84.96.96.73-.73-.96-.96 1.85-1.84 2.05 2.05.88-.88.85.85z"/></symbol><symbol viewBox="0 0 24 24" id="password" xmlns="http://www.w3.org/2000/svg"><path d="M6.05 6.5H4.8v11h1.25zm7.81 5.17-.39-1.19-2.03.66V9h-1.25v2.14l-2.04-.66-.38 1.19 2.03.66-1.25 1.73 1.01.73 1.25-1.73 1.26 1.73 1.01-.73-1.25-1.73zm6.83-1.19.38 1.19-2.03.66 1.26 1.73-1.02.73-1.25-1.73-1.26 1.73-1.01-.73 1.26-1.73-2.04-.66.39-1.19 2.03.66V9h1.25v2.14z"/></symbol><symbol viewBox="0 0 24 24" id="path" xmlns="http://www.w3.org/2000/svg"><path d="M19.813 17.625a2.188 2.188 0 0 1-4.284.625H7.625a3.75 3.75 0 0 1 0-7.5h7.5a1.875 1.875 0 1 0 0-3.75h-7.5a.625.625 0 0 1 0-1.25h7.5a3.125 3.125 0 1 1 0 6.25h-7.5a2.5 2.5 0 0 0 0 5h7.904a2.188 2.188 0 0 1 4.284.625"/></symbol><symbol viewBox="0 0 24 24" id="pause" xmlns="http://www.w3.org/2000/svg"><path d="M13.667 17.833V6.167H17v11.666zm-6.667 0V6.167h3.333v11.666z"/></symbol><symbol viewBox="0 0 24 24" id="pencil" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.5 15.66v3.54h3.54L19.03 8.23c.16-.16.28-.35.36-.55.07-.21.11-.42.11-.64 0-.2-.03-.41-.11-.62q-.105-.315-.36-.54l-1.15-1.17c-.15-.17-.33-.3-.54-.38a1.79 1.79 0 0 0-1.29 0c-.2.08-.38.2-.55.35zm13.34-8.63L16.67 8.2 15.5 7.03l1.17-1.17z" clip-rule="evenodd"/><path d="M11.5 19.2v-1.67h8v1.67z"/></symbol><symbol viewBox="0 0 24 24" id="percent" xmlns="http://www.w3.org/2000/svg"><path d="M8.25 11.167a2.8 2.8 0 0 1-2.062-.854 2.8 2.8 0 0 1-.855-2.063q0-1.208.855-2.063a2.8 2.8 0 0 1 2.062-.854 2.8 2.8 0 0 1 2.063.854q.854.854.854 2.063a2.8 2.8 0 0 1-.854 2.063 2.8 2.8 0 0 1-2.063.854m0-1.667q.52 0 .885-.365.365-.364.365-.885 0-.52-.365-.885A1.2 1.2 0 0 0 8.25 7q-.52 0-.885.365A1.2 1.2 0 0 0 7 8.25q0 .52.365.885t.885.365m7.5 9.167a2.8 2.8 0 0 1-2.062-.855 2.8 2.8 0 0 1-.855-2.062q0-1.209.854-2.062a2.8 2.8 0 0 1 2.063-.855 2.8 2.8 0 0 1 2.063.854q.854.854.854 2.063a2.8 2.8 0 0 1-.855 2.063 2.8 2.8 0 0 1-2.062.854m0-1.667q.52 0 .886-.365.364-.364.364-.885 0-.52-.364-.885a1.2 1.2 0 0 0-.886-.365q-.52 0-.885.365a1.2 1.2 0 0 0-.365.885q0 .52.365.885.364.365.885.365M6.5 18.667 5.333 17.5 17.5 5.333 18.667 6.5z"/></symbol><symbol viewBox="0 0 24 24" id="play" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.833V6.167L18.167 12z"/></symbol><symbol viewBox="0 0 24 24" id="play-pause" xmlns="http://www.w3.org/2000/svg"><path d="M4.959 16.293V7.707L11.092 12zm8.177-.204V7.91h2.045v8.178zm4.09 0V7.91h2.044v8.178z"/></symbol><symbol viewBox="0 0 24 24" id="plus" xmlns="http://www.w3.org/2000/svg"><path d="M11.167 12.833h-5v-1.666h5v-5h1.666v5h5v1.666h-5v5h-1.666z"/></symbol><symbol viewBox="0 0 24 24" id="printer" xmlns="http://www.w3.org/2000/svg"><path d="M17 7.833H7V4.5h10zm0 4.584q.354 0 .594-.24t.24-.594a.8.8 0 0 0-.24-.593.8.8 0 0 0-.594-.24.8.8 0 0 0-.594.24.8.8 0 0 0-.24.593q0 .354.24.594t.594.24m-1.667 5.416V14.5H8.667v3.333zM17 19.5H7v-3.333H3.667v-5q0-1.063.729-1.782a2.43 2.43 0 0 1 1.77-.718h11.667q1.063 0 1.782.718.718.72.718 1.782v5H17z"/></symbol><symbol viewBox="0 0 24 24" id="prohibit" xmlns="http://www.w3.org/2000/svg"><path d="M12 20.333a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.646-1.781 8.4 8.4 0 0 1-1.781-2.646A8.1 8.1 0 0 1 3.667 12q0-1.73.656-3.25a8.4 8.4 0 0 1 1.781-2.646A8.4 8.4 0 0 1 8.75 4.323 8.1 8.1 0 0 1 12 3.667q1.73 0 3.25.656a8.4 8.4 0 0 1 2.646 1.781 8.4 8.4 0 0 1 1.781 2.646 8.1 8.1 0 0 1 .656 3.25 8.1 8.1 0 0 1-.656 3.25 8.4 8.4 0 0 1-1.781 2.646 8.4 8.4 0 0 1-2.646 1.781 8.1 8.1 0 0 1-3.25.656m0-1.666a6.5 6.5 0 0 0 2.167-.365 6.6 6.6 0 0 0 1.916-1.052L6.75 7.917a6.6 6.6 0 0 0-1.052 1.916A6.5 6.5 0 0 0 5.333 12q0 2.792 1.938 4.73Q9.208 18.665 12 18.666m5.25-2.584a6.6 6.6 0 0 0 1.052-1.916A6.5 6.5 0 0 0 18.667 12q0-2.792-1.938-4.73Q14.792 5.335 12 5.334q-1.125 0-2.167.365A6.6 6.6 0 0 0 7.917 6.75z"/></symbol><symbol viewBox="0 0 24 24" id="question-mark" xmlns="http://www.w3.org/2000/svg"><path d="M10.833 14.917q0-1.687.303-2.427.301-.74 1.28-1.615.855-.75 1.303-1.302t.448-1.26q0-.855-.573-1.417T12 6.333q-1.062 0-1.614.646-.553.645-.782 1.313l-2.146-.917q.438-1.334 1.605-2.312 1.165-.98 2.937-.98 2.187 0 3.365 1.22 1.176 1.218 1.177 2.926 0 1.042-.448 1.782t-1.407 1.677q-1.02.978-1.239 1.49-.219.51-.219 1.739zm1.167 5q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177q0-.687.49-1.177t1.177-.49 1.177.49.49 1.177-.49 1.177-1.177.49"/></symbol><symbol viewBox="0 0 24 24" id="quote" xmlns="http://www.w3.org/2000/svg"><path d="m6.333 17 1.917-3.333a3.2 3.2 0 0 1-2.354-.98 3.2 3.2 0 0 1-.98-2.354q0-1.374.98-2.354A3.2 3.2 0 0 1 8.25 7a3.2 3.2 0 0 1 2.354.98 3.2 3.2 0 0 1 .98 2.353q0 .48-.115.886t-.344.781L8.25 17zm7.5 0 1.917-3.333a3.2 3.2 0 0 1-2.354-.98 3.2 3.2 0 0 1-.98-2.354q0-1.374.98-2.354A3.2 3.2 0 0 1 15.75 7a3.2 3.2 0 0 1 2.354.98 3.2 3.2 0 0 1 .98 2.353q0 .48-.115.886t-.344.781l-2.875 5z"/></symbol><symbol viewBox="0 0 24 24" id="radio" xmlns="http://www.w3.org/2000/svg"><path d="M12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6m0-2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8"/></symbol><symbol viewBox="0 0 24 24" id="radio-checked" xmlns="http://www.w3.org/2000/svg"><path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8"/><path fill-rule="evenodd" d="M12 4c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8m0 2c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="radio-focus" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c4.96 0 9 4.04 9 9s-4.04 9-9 9-9-4.04-9-9 4.04-9 9-9m0-2C5.92 1 1 5.92 1 12s4.92 11 11 11 11-4.92 11-11S18.08 1 12 1"/></symbol><symbol viewBox="0 0 24 24" id="read-doc" xmlns="http://www.w3.org/2000/svg"><path d="M18.467 5.066 8.291 3.27a1.25 1.25 0 0 0-1.447 1.014L4.52 17.487a1.25 1.25 0 0 0 1.015 1.447l10.176 1.797a1.25 1.25 0 0 0 1.448-1.015l2.325-13.204a1.25 1.25 0 0 0-1.017-1.446m-5.881 7.212a.625.625 0 0 1-.724.507l-3.242-.572a.625.625 0 0 1 .218-1.229l3.24.57a.625.625 0 0 1 .508.724m3.672-1.889a.625.625 0 0 1-.724.506L9.049 9.751a.625.625 0 1 1 .218-1.231l6.485 1.145a.625.625 0 0 1 .508.724zm.433-2.462a.625.625 0 0 1-.724.507L9.483 7.288a.625.625 0 1 1 .217-1.23l6.484 1.144a.626.626 0 0 1 .51.725z"/></symbol><symbol viewBox="0 0 24 24" id="receipt" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M19.44 4.749c-.23-.23-.53-.35-.85-.35H5.39c-.32 0-.62.13-.85.35-.23.23-.35.53-.35.85v13.4a.63.63 0 0 0 .29.51c.09.05.19.08.29.09q.15 0 .3-.06l2.13-1.07 2.13 1.07a.63.63 0 0 0 .54 0l2.13-1.07 2.13 1.07a.63.63 0 0 0 .54 0l2.13-1.07 2.13 1.07q.135.075.3.06c.1 0 .2-.04.29-.09s.16-.13.21-.22.08-.19.08-.29v-13.4c0-.32-.13-.62-.35-.85zm-4.95 10.73h-7v-1.25h7zm2-3.25h-9v-1.25h9zm0-3.25h-9v-1.25h9z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="recycle" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 18.25a.625.625 0 0 1-.625.625h-3.75a1.874 1.874 0 0 1-1.623-2.812l2.188-3.774-1.08-.625a.625.625 0 0 1 .15-1.148l2.56-.686a.625.625 0 0 1 .766.443l.687 2.56a.625.625 0 0 1-.917.703l-1.084-.625-2.185 3.777a.625.625 0 0 0 .538.937h3.75a.625.625 0 0 1 .625.625M12 4.5a.61.61 0 0 1 .54.312l2.188 3.774-1.08.625a.625.625 0 0 0 .149 1.142l2.56.687a.625.625 0 0 0 .765-.442l.687-2.562a.625.625 0 0 0-.915-.703l-1.085.625-2.186-3.77a1.875 1.875 0 0 0-3.246 0l-1.81 3.124a.625.625 0 0 0 1.083.625l1.81-3.125A.61.61 0 0 1 12 4.5m8.494 11.563-1.807-3.125a.625.625 0 0 0-1.082.624l1.808 3.126a.625.625 0 0 1-.538.937H14.5v-1.25a.625.625 0 0 0-1.067-.442l-1.875 1.875a.626.626 0 0 0 0 .884l1.875 1.875a.624.624 0 0 0 1.067-.442v-1.25h4.375a1.875 1.875 0 0 0 1.623-2.812z"/></symbol><symbol viewBox="0 0 24 24" id="refresh" xmlns="http://www.w3.org/2000/svg"><path d="M12 18.667q-2.792 0-4.73-1.938Q5.335 14.792 5.334 12q0-2.791 1.938-4.73Q9.208 5.335 12 5.334q1.437 0 2.75.594A6.35 6.35 0 0 1 17 7.625V5.333h1.667v5.834h-5.834V9.5h3.5a4.86 4.86 0 0 0-1.823-1.833A4.94 4.94 0 0 0 12 7Q9.916 7 8.458 8.458 7 9.917 7 12q0 2.084 1.458 3.542Q9.917 17 12 17q1.605 0 2.896-.917a4.84 4.84 0 0 0 1.812-2.416h1.75a6.58 6.58 0 0 1-2.375 3.604Q14.292 18.667 12 18.667"/></symbol><symbol viewBox="0 0 24 24" id="repeat" xmlns="http://www.w3.org/2000/svg"><path d="M7.833 20.333 4.5 17l3.333-3.333L9 14.875l-1.292 1.292h8.459v-3.334h1.666v5H7.708L9 19.125zm-1.666-9.166v-5h10.125L15 4.875l1.167-1.208L19.5 7l-3.333 3.333L15 9.125l1.292-1.292H7.833v3.334z"/></symbol><symbol viewBox="0 0 24 24" id="reply" xmlns="http://www.w3.org/2000/svg"><path d="M17.833 17.833V14.5a2.4 2.4 0 0 0-.729-1.77 2.4 2.4 0 0 0-1.77-.73H7.687l3 3L9.5 16.167l-5-5 5-5 1.188 1.166-3 3h7.645q1.73 0 2.948 1.22 1.22 1.218 1.219 2.947v3.333z"/></symbol><symbol viewBox="0 0 24 24" id="reply-all" xmlns="http://www.w3.org/2000/svg"><path d="m8.667 16.167-5-5 5-5 1.187 1.166-3.833 3.834L9.854 15zm10 1.666V14.5q0-1.042-.73-1.77a2.4 2.4 0 0 0-1.77-.73H11.02l3 3-1.188 1.167-5-5 5-5 1.188 1.166-3 3h5.146q1.728 0 2.948 1.22 1.218 1.218 1.218 2.947v3.333z"/></symbol><symbol viewBox="0 0 24 24" id="resize" xmlns="http://www.w3.org/2000/svg"><path d="M13.25 11.375v6.875a.624.624 0 0 1-.625.625H5.75a.625.625 0 0 1-.625-.625v-6.875a.625.625 0 0 1 .625-.625h6.875a.624.624 0 0 1 .625.625m5 4.375a.624.624 0 0 0-.625.625v1.25H15.75a.624.624 0 1 0 0 1.25h1.875a1.25 1.25 0 0 0 1.25-1.25v-1.25a.624.624 0 0 0-.625-.625m0-5.625a.624.624 0 0 0-.625.625v2.5a.624.624 0 1 0 1.25 0v-2.5a.624.624 0 0 0-.625-.625m-.625-5h-1.25a.625.625 0 1 0 0 1.25h1.25v1.25a.625.625 0 1 0 1.25 0v-1.25a1.25 1.25 0 0 0-1.25-1.25m-4.375 0h-2.5a.625.625 0 1 0 0 1.25h2.5a.625.625 0 1 0 0-1.25m-7.5 3.75a.625.625 0 0 0 .625-.625V6.375h1.25a.625.625 0 0 0 0-1.25h-1.25a1.25 1.25 0 0 0-1.25 1.25V8.25a.625.625 0 0 0 .625.625"/></symbol><symbol viewBox="0 0 24 24" id="ribbon" xmlns="http://www.w3.org/2000/svg"><path d="M12 12.417a2.4 2.4 0 0 1-1.77-.73 2.4 2.4 0 0 1-.73-1.77q0-1.042.73-1.771a2.4 2.4 0 0 1 1.77-.73q1.042 0 1.77.73a2.4 2.4 0 0 1 .73 1.77 2.4 2.4 0 0 1-.73 1.771 2.4 2.4 0 0 1-1.77.73M7 20.75v-6.437a6.4 6.4 0 0 1-1.23-2 6.6 6.6 0 0 1-.437-2.396q0-2.792 1.938-4.73Q9.209 3.25 12 3.25t4.73 1.938q1.936 1.937 1.937 4.729a6.6 6.6 0 0 1-.438 2.396 6.4 6.4 0 0 1-1.229 2v6.437l-5-1.667zm5-5.833q2.084 0 3.542-1.459Q17 12 17 9.917q0-2.085-1.458-3.542Q14.083 4.917 12 4.917q-2.084 0-3.542 1.458T7 9.917t1.458 3.541q1.459 1.46 3.542 1.459"/></symbol><symbol viewBox="0 0 24 24" id="rows-add" xmlns="http://www.w3.org/2000/svg"><path d="M5.42 5.4h13.16a.62.62 0 0 1 .62.62v2.26a.62.62 0 0 1-.62.62H5.42a.62.62 0 0 1-.62-.62V6.02a.62.62 0 0 1 .62-.62m0 5.4h13.16a.62.62 0 0 1 .62.62v2.26a.62.62 0 0 1-.62.62H5.42a.62.62 0 0 1-.62-.62v-2.26a.62.62 0 0 1 .62-.62m7.18 5.64h-1.2V18H9.84v1.2h1.56v1.55h1.2V19.2h1.55V18H12.6z"/></symbol><symbol viewBox="0 0 24 24" id="ruler" xmlns="http://www.w3.org/2000/svg"><path d="M20.384 9.5 9.5 20.384a1.25 1.25 0 0 1-1.768 0l-4.116-4.116a1.25 1.25 0 0 1 0-1.768l2.279-2.279a.31.31 0 0 1 .442 0l2.72 2.721a.625.625 0 0 0 .916-.033.64.64 0 0 0-.047-.867L7.22 11.337a.31.31 0 0 1 0-.442l1.172-1.172a.313.313 0 0 1 .442 0l2.722 2.721a.623.623 0 0 0 1.06-.475.64.64 0 0 0-.193-.425L9.721 8.837a.31.31 0 0 1 0-.442l1.172-1.172a.31.31 0 0 1 .441 0l2.722 2.722a.624.624 0 0 0 .915-.034.64.64 0 0 0-.048-.866l-2.702-2.708a.31.31 0 0 1 0-.442L14.5 3.616a1.25 1.25 0 0 1 1.768 0l4.116 4.116a1.25 1.25 0 0 1 0 1.768"/></symbol><symbol viewBox="0 0 24 24" id="rules" xmlns="http://www.w3.org/2000/svg"><path d="m14 18.698-1.167-1.167L15 15.365l-2.167-2.167L14 12.03l2.167 2.167 2.166-2.167 1.167 1.167-2.167 2.167L19.5 17.53l-1.167 1.167-2.166-2.167zm1.646-7.5L12.687 8.24l1.167-1.167 1.771 1.77 3.542-3.54 1.166 1.187zm-11.98 5V14.53h7.5v1.667zm0-6.667V7.865h7.5V9.53z"/></symbol><symbol viewBox="0 0 24 24" id="scale" xmlns="http://www.w3.org/2000/svg"><path d="M3.667 20.333q0-2.311.614-3.948.615-1.635 1.573-2.718A7.1 7.1 0 0 1 8 11.99a9.3 9.3 0 0 1 2.333-.823v-2.5q-2.854-.354-4.76-1.76t-1.906-3.24h16.666q0 1.833-1.906 3.24-1.906 1.406-4.76 1.76v2.5A9.3 9.3 0 0 1 16 11.99a7.1 7.1 0 0 1 2.146 1.677q.958 1.083 1.573 2.718.614 1.636.614 3.948h-5v-1.666h3.23q-.376-3.167-2.365-4.584T12 12.667q-2.208 0-4.198 1.416-1.99 1.418-2.365 4.584h3.23v1.666zm8.333 0q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176q0-.355.136-.646.135-.292.364-.521.5-.5 1.688-1.052a30 30 0 0 1 2.812-1.115 37 37 0 0 1-1.125 2.813q-.54 1.187-1.041 1.687a1.8 1.8 0 0 1-.521.365q-.292.135-.646.135"/></symbol><symbol viewBox="0 0 24 24" id="schedule-backward" xmlns="http://www.w3.org/2000/svg"><path d="M12.16 5.16v1.67h4.67V5.16h1.67v1.67h.83c.46 0 .85.16 1.18.49v-.01c.33.33.49.72.49 1.18v8.67c0 .46-.16.85-.49 1.18a1.6 1.6 0 0 1-1.18.49H9.66c-.46 0-.85-.16-1.18-.49a1.6 1.6 0 0 1-.49-1.18h11.33v-6.33H7.99V8.5c0-.46.16-.85.49-1.18a1.6 1.6 0 0 1 1.18-.49h.83V5.16z"/><path d="m6.66 11-2.14 2.17h8.81v1.66H4.52L6.66 17 5.5 18.17 1.33 14 5.5 9.83z"/></symbol><symbol viewBox="0 0 24 24" id="schedule-forward" xmlns="http://www.w3.org/2000/svg"><path d="M7.16 5.16v1.67h4.67V5.16h1.67v1.67h.83c.46 0 .85.16 1.18.49s.49.72.49 1.18v2.33H4.67v6.34H16c0 .46-.16.85-.49 1.18a1.6 1.6 0 0 1-1.18.49H4.66a1.6 1.6 0 0 1-1.18-.49 1.6 1.6 0 0 1-.49-1.18V8.5c0-.46.16-.85.49-1.18a1.6 1.6 0 0 1 1.18-.49h.83V5.16z"/><path d="m22.67 14-4.17 4.17L17.34 17l2.14-2.17h-8.81v-1.66h8.81L17.34 11l1.16-1.17z"/></symbol><symbol viewBox="0 0 24 24" id="screwdriver" xmlns="http://www.w3.org/2000/svg"><path d="M20.221 3.777a3.94 3.94 0 0 0-5.571 0l-4.16 4.16a1.25 1.25 0 0 0-.365.883v1.305H8.81c-.272 0-.537.09-.755.253a1 1 0 0 0-.064.056l-.625.625a1.25 1.25 0 0 0 0 1.768l1.461 1.462-6.015 6.02a.626.626 0 0 0 .884.884l6.016-6.02 1.461 1.461a1.25 1.25 0 0 0 1.768 0l.625-.625a1 1 0 0 0 .056-.065 1.25 1.25 0 0 0 .254-.754v-1.315h1.304a1.24 1.24 0 0 0 .883-.367l4.158-4.159a3.94 3.94 0 0 0 0-5.572m-2.154 3.039-4.375 4.375a.625.625 0 0 1-.884-.884l4.375-4.375a.625.625 0 0 1 .884.884"/></symbol><symbol viewBox="0 0 24 24" id="scroll" xmlns="http://www.w3.org/2000/svg"><path d="m14.64 9.43-.71.71-1.31-1.31v6.34l1.31-1.31.71.71L12 17.21l-2.64-2.64.71-.71 1.31 1.31V8.83l-1.31 1.31-.71-.71L12 6.79z"/><path fill-rule="evenodd" d="M15 4c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H9c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3zM9 5.25c-.96 0-1.75.79-1.75 1.75v10c0 .96.79 1.75 1.75 1.75h6c.96 0 1.75-.79 1.75-1.75V7c0-.96-.79-1.75-1.75-1.75z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="search" xmlns="http://www.w3.org/2000/svg"><path d="m18.333 19.5-5.25-5.25a5.08 5.08 0 0 1-3.167 1.083q-2.27 0-3.843-1.573T4.5 9.917t1.573-3.844T9.917 4.5t3.843 1.573 1.573 3.844a5.08 5.08 0 0 1-1.083 3.166l5.25 5.25zm-8.416-5.833q1.562 0 2.656-1.094t1.094-2.656-1.094-2.657q-1.095-1.093-2.656-1.093T7.26 7.26Q6.167 8.355 6.167 9.917t1.093 2.656 2.657 1.094"/></symbol><symbol viewBox="0 0 24 24" id="search-check" xmlns="http://www.w3.org/2000/svg"><path d="m9.458 13.292 4.709-4.73-1.188-1.187-3.52 3.542-1.772-1.75L6.5 10.333zM10.333 17q-2.79 0-4.729-1.937-1.937-1.938-1.937-4.73 0-2.79 1.937-4.729 1.938-1.937 4.73-1.937 2.79 0 4.729 1.937Q17 7.542 17 10.334a6.55 6.55 0 0 1-1.396 4.083l4.73 4.75-1.167 1.166-4.75-4.729A6.545 6.545 0 0 1 10.334 17"/></symbol><symbol viewBox="0 0 24 24" id="search-items" xmlns="http://www.w3.org/2000/svg"><path d="M3.667 17.417V15.75H12v1.667zm0-4.167v-1.667h4.166v1.667zm0-4.167V7.417h4.166v1.666zm15.5 8.334-3.209-3.209a3.7 3.7 0 0 1-1.093.532 4.2 4.2 0 0 1-1.198.177q-1.73 0-2.948-1.219Q9.499 12.48 9.5 10.75t1.219-2.948q1.218-1.219 2.948-1.219 1.728 0 2.948 1.22 1.218 1.218 1.218 2.947 0 .604-.177 1.198t-.531 1.094l3.208 3.208zm-5.5-4.167a2.4 2.4 0 0 0 1.77-.73q.73-.727.73-1.77 0-1.042-.73-1.77a2.4 2.4 0 0 0-1.77-.73 2.4 2.4 0 0 0-1.771.73 2.4 2.4 0 0 0-.73 1.77q0 1.042.73 1.77a2.4 2.4 0 0 0 1.77.73"/></symbol><symbol viewBox="0 0 24 24" id="search-objects" xmlns="http://www.w3.org/2000/svg"><path d="m19.792 20.958-2.563-2.541q-.375.229-.802.343t-.885.115a3.2 3.2 0 0 1-2.354-.98 3.2 3.2 0 0 1-.98-2.353q0-1.376.98-2.354a3.2 3.2 0 0 1 2.354-.98 3.2 3.2 0 0 1 2.354.98 3.2 3.2 0 0 1 .979 2.354 3.2 3.2 0 0 1-.48 1.708l2.563 2.542zM6.375 18.875a3.2 3.2 0 0 1-2.354-.98 3.2 3.2 0 0 1-.98-2.353q0-1.376.98-2.354a3.2 3.2 0 0 1 2.354-.98 3.2 3.2 0 0 1 2.354.98 3.2 3.2 0 0 1 .98 2.354 3.2 3.2 0 0 1-.98 2.354 3.2 3.2 0 0 1-2.354.979m9.167-1.667q.687 0 1.177-.49.49-.489.49-1.176 0-.688-.49-1.178a1.6 1.6 0 0 0-1.177-.489q-.688 0-1.177.49-.49.489-.49 1.177 0 .687.49 1.177.489.49 1.177.49m-9.167-7.5a3.2 3.2 0 0 1-2.354-.979 3.2 3.2 0 0 1-.98-2.354q0-1.375.98-2.354a3.2 3.2 0 0 1 2.354-.98 3.2 3.2 0 0 1 2.354.98 3.2 3.2 0 0 1 .98 2.354 3.2 3.2 0 0 1-.98 2.354 3.2 3.2 0 0 1-2.354.98m9.167 0a3.2 3.2 0 0 1-2.354-.979 3.2 3.2 0 0 1-.98-2.354q0-1.375.98-2.354a3.2 3.2 0 0 1 2.354-.98 3.2 3.2 0 0 1 2.354.98 3.2 3.2 0 0 1 .979 2.354 3.2 3.2 0 0 1-.98 2.354 3.2 3.2 0 0 1-2.353.98"/></symbol><symbol viewBox="0 0 24 24" id="send" xmlns="http://www.w3.org/2000/svg"><path d="M5.083 18.667v-5L11.75 12l-6.667-1.667v-5L20.917 12z"/></symbol><symbol viewBox="0 0 24 24" id="settings" xmlns="http://www.w3.org/2000/svg"><path d="m9.708 20.333-.333-2.666a3 3 0 0 1-.51-.25 7 7 0 0 1-.47-.313l-2.478 1.042-2.292-3.959 2.146-1.624a2 2 0 0 1-.021-.282v-.562q0-.135.02-.281L3.626 9.813l2.292-3.959 2.479 1.042q.229-.166.479-.313.25-.145.5-.25l.333-2.666h4.584l.333 2.666q.27.105.51.25.24.147.47.313l2.478-1.042 2.292 3.959-2.146 1.624q.021.147.021.282v.562q0 .135-.042.281l2.146 1.626-2.291 3.958-2.459-1.042a6 6 0 0 1-.479.313q-.25.145-.5.25l-.333 2.666zm2.334-5.416a2.8 2.8 0 0 0 2.062-.854A2.8 2.8 0 0 0 14.958 12a2.8 2.8 0 0 0-.854-2.062 2.8 2.8 0 0 0-2.062-.855q-1.23 0-2.073.855A2.83 2.83 0 0 0 9.125 12q0 1.209.844 2.063.843.854 2.073.854"/></symbol><symbol viewBox="0 0 24 24" id="shapes" xmlns="http://www.w3.org/2000/svg"><path d="M10.718 16.177a.625.625 0 0 1-.593.823h-6.25a.625.625 0 0 1-.593-.823l3.125-9.375a.625.625 0 0 1 1.186 0zm7.532-8.24a4.062 4.062 0 1 0-8.125 0 4.062 4.062 0 0 0 8.125 0m1.25 5.313h-6.875a.625.625 0 0 0-.625.625v4.375a.625.625 0 0 0 .625.625H19.5a.625.625 0 0 0 .625-.625v-4.375a.625.625 0 0 0-.625-.625"/></symbol><symbol viewBox="0 0 24 24" id="share" xmlns="http://www.w3.org/2000/svg"><path d="m17.28 9.05-2.09-2.09.88-.89L19.8 9.8l-3.73 3.73-.88-.88 2.093-2.1H15.53c-3.553 0-5.303 2.47-6.711 4.458l-.009.012c-.115.158-.225.317-.33.468l-.12.172-1.21-.88c.14-.19.29-.4.44-.62 1.43-2.03 3.6-5.11 7.94-5.11z"/><path d="M5.87 17.13V7.8H4.2v9c0 1.1.9 2 2 2h11v-1.67z"/></symbol><symbol viewBox="0 0 24 24" id="shuffle" xmlns="http://www.w3.org/2000/svg"><path d="M13.163 18.667V17h2.167l-2.646-2.646 1.188-1.187 2.625 2.625v-2.125h1.666v5zm-7.166 0L4.83 17.5 15.33 7h-2.167V5.333h5v5h-1.666V8.167zm3.145-7.855L4.83 6.5l1.167-1.167 4.312 4.313z"/></symbol><symbol viewBox="0 0 24 24" id="signpost" xmlns="http://www.w3.org/2000/svg"><path d="m21.219 11.168-2.63 2.918a1.25 1.25 0 0 1-.93.414h-5.034v5a.624.624 0 1 1-1.25 0v-5h-6.25a1.25 1.25 0 0 1-1.25-1.25v-5A1.25 1.25 0 0 1 5.125 7h6.25V4.5a.625.625 0 1 1 1.25 0V7h5.034a1.25 1.25 0 0 1 .93.414l2.63 2.918a.625.625 0 0 1 0 .836"/></symbol><symbol viewBox="0 0 24 24" id="skip-back" xmlns="http://www.w3.org/2000/svg"><path d="M6.583 17V7H8.25v10zm10.834 0-7.5-5 7.5-5z"/></symbol><symbol viewBox="0 0 24 24" id="skip-forward" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 17V7h1.667v10zm-9.167 0V7l7.5 5z"/></symbol><symbol viewBox="0 0 24 24" id="skull" xmlns="http://www.w3.org/2000/svg"><path d="M10.75 15.125h2.5l-1.25-2.5zm-1.667-2.292q.688 0 1.177-.49.49-.489.49-1.176 0-.688-.49-1.177a1.6 1.6 0 0 0-1.177-.49q-.687 0-1.177.49-.49.489-.49 1.177 0 .687.49 1.177t1.177.49m5.834 0q.687 0 1.177-.49.49-.489.49-1.176 0-.688-.49-1.177a1.6 1.6 0 0 0-1.177-.49q-.688 0-1.178.49-.489.489-.489 1.177 0 .687.49 1.177.489.49 1.177.49M7 20.333v-3.541a4.8 4.8 0 0 1-1.427-.948A6 6 0 0 1 4.53 14.5a6.5 6.5 0 0 1-.646-1.604 7 7 0 0 1-.218-1.73q0-3.29 2.333-5.395t6-2.104q3.666 0 6 2.104t2.333 5.396a7 7 0 0 1-.218 1.729 6.5 6.5 0 0 1-.646 1.604q-.427.75-1.042 1.344-.614.594-1.427.948v3.541h-2.5v-1.666h-1.667v1.666h-1.666v-1.666H9.5v1.666z"/></symbol><symbol viewBox="0 0 24 24" id="sliders" xmlns="http://www.w3.org/2000/svg"><path d="M6.167 18.667v-5.834H4.5v-1.666h5v1.666H7.833v5.834zm0-9.167V5.333h1.666V9.5zm3.333 0V7.833h1.667v-2.5h1.666v2.5H14.5V9.5zm1.667 9.167v-7.5h1.666v7.5zm5 0v-2.5H14.5V14.5h5v1.667h-1.667v2.5zm0-5.834v-7.5h1.666v7.5z"/></symbol><symbol viewBox="0 0 24 24" id="sort-alpha-down" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.73 11.24H12L9.86 5.52H8.38l-2.14 5.72h1.3l.45-1.25h2.29zM8.42 8.77l.65-1.82h.11l.66 1.82z" clip-rule="evenodd"/><path d="m19.03 15.41-1.22 1.22V8.17h-1.25v8.46l-1.22-1.22-.88.88 2.72 2.73 2.73-2.73zm-8.07-1.3-2.45 3.17h2.64v1.18H7.17v-1.35l2.49-3.17H7.09v-1.18h3.87z"/></symbol><symbol viewBox="0 0 24 24" id="sort-alpha-up" xmlns="http://www.w3.org/2000/svg"><path d="m19.91 7.71-2.73-2.73-2.72 2.73.88.88 1.22-1.22v8.46h1.25V7.37l1.22 1.22z"/><path fill-rule="evenodd" d="M10.73 11.24H12L9.86 5.52H8.38l-2.14 5.72h1.3l.45-1.25h2.29zM8.42 8.77l.65-1.82h.11l.66 1.82z" clip-rule="evenodd"/><path d="m10.96 14.11-2.45 3.17h2.64v1.18H7.17v-1.35l2.49-3.17H7.09v-1.18h3.87z"/></symbol><symbol viewBox="0 0 24 24" id="sort-ascending" xmlns="http://www.w3.org/2000/svg"><path d="M17.48 6.5h-12v1.67h12zm-12 4.67h8v1.67h-8zm0 4.66h6v1.67h-6zm11.8.8 1.22-1.22.89.88-2.73 2.73-2.73-2.73.88-.88 1.22 1.22v-6.46h1.25z"/></symbol><symbol viewBox="0 0 24 24" id="sort-descending" xmlns="http://www.w3.org/2000/svg"><path d="m16.66 4.98 2.73 2.73-.89.88-1.22-1.22v6.46h-1.25V7.37l-1.22 1.22-.88-.88zM5.48 6.5h6v1.67h-6zm0 4.67h8v1.67h-8zm0 4.66v1.67h12v-1.67z"/></symbol><symbol viewBox="0 0 24 24" id="sort-time-down" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.97 12c0-3.04 2.46-5.5 5.5-5.5s5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5-5.5-2.46-5.5-5.5m4.67.42 2.5 2.5 1.17-1.17-2-2.02V8.67H8.64z" clip-rule="evenodd"/><path d="m18.88 16.63 1.22-1.22.88.88-2.73 2.73-2.73-2.73.88-.88 1.23 1.22V8.17h1.25z"/></symbol><symbol viewBox="0 0 24 24" id="sort-time-up" xmlns="http://www.w3.org/2000/svg"><path d="m18.25 4.98 2.73 2.73-.88.88-1.22-1.22v8.46h-1.25V7.37L16.4 8.59l-.88-.88z"/><path fill-rule="evenodd" d="M3.97 12c0-3.04 2.46-5.5 5.5-5.5s5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5-5.5-2.46-5.5-5.5m4.67.42 2.5 2.5 1.17-1.17-2-2.02V8.67H8.64z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="square" xmlns="http://www.w3.org/2000/svg"><path d="M6.167 19.5q-.688 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V6.167q0-.688.49-1.177.489-.49 1.177-.49h11.666q.688 0 1.177.49.49.489.49 1.177v11.666q0 .688-.49 1.177-.489.49-1.177.49z"/></symbol><symbol viewBox="0 0 24 24" id="square-add" xmlns="http://www.w3.org/2000/svg"><path d="M11.167 16.167h1.666v-3.334h3.334v-1.666h-3.334V7.833h-1.666v3.334H7.833v1.666h3.334zm-5 3.333q-.688 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V6.167q0-.688.49-1.177.489-.49 1.177-.49h11.666q.688 0 1.177.49.49.489.49 1.177v11.666q0 .688-.49 1.177-.489.49-1.177.49z"/></symbol><symbol viewBox="0 0 24 24" id="square-inside" xmlns="http://www.w3.org/2000/svg"><path d="M18.25 4.5H5.75A1.25 1.25 0 0 0 4.5 5.75v12.5a1.25 1.25 0 0 0 1.25 1.25h12.5a1.25 1.25 0 0 0 1.25-1.25V5.75a1.25 1.25 0 0 0-1.25-1.25m0 13.75H5.75V5.75h12.5zM15.125 9.5v5a.624.624 0 0 1-.625.625h-5a.625.625 0 0 1-.625-.625v-5a.625.625 0 0 1 .625-.625h5a.625.625 0 0 1 .625.625"/></symbol><symbol viewBox="0 0 24 24" id="square-select" xmlns="http://www.w3.org/2000/svg"><path d="M10.125 5.125a.625.625 0 0 1 .625-.625h2.5a.625.625 0 1 1 0 1.25h-2.5a.625.625 0 0 1-.625-.625M13.25 18.25h-2.5a.624.624 0 1 0 0 1.25h2.5a.624.624 0 1 0 0-1.25m5-13.75h-1.875a.625.625 0 1 0 0 1.25h1.875v1.875a.625.625 0 1 0 1.25 0V5.75a1.25 1.25 0 0 0-1.25-1.25m.625 5.625a.624.624 0 0 0-.625.625v2.5a.624.624 0 1 0 1.25 0v-2.5a.624.624 0 0 0-.625-.625m0 5.625a.624.624 0 0 0-.625.625v1.875h-1.875a.624.624 0 1 0 0 1.25h1.875a1.25 1.25 0 0 0 1.25-1.25v-1.875a.624.624 0 0 0-.625-.625m-13.75-1.875a.625.625 0 0 0 .625-.625v-2.5a.625.625 0 1 0-1.25 0v2.5a.625.625 0 0 0 .625.625m2.5 4.375H5.75v-1.875a.625.625 0 1 0-1.25 0v1.875a1.25 1.25 0 0 0 1.25 1.25h1.875a.625.625 0 1 0 0-1.25m-2.5-10a.625.625 0 0 0 .625-.625V5.75h1.875a.625.625 0 0 0 0-1.25H5.75A1.25 1.25 0 0 0 4.5 5.75v1.875a.625.625 0 0 0 .625.625m11.25 7.5v-7.5a.625.625 0 0 0-.625-.625h-7.5a.625.625 0 0 0-.625.625v7.5a.625.625 0 0 0 .625.625h7.5a.624.624 0 0 0 .625-.625"/></symbol><symbol viewBox="0 0 24 24" id="stamp" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18.173 13.153c-.33-.33-.72-.49-1.18-.49h-4.2c.33-3.33 2.7-3.54 2.7-6.5 0-1.93-1.57-3.5-3.5-3.5s-3.5 1.57-3.5 3.5c0 2.96 2.38 3.17 2.7 6.5h-4.19c-.46 0-.85.16-1.18.49s-.49.72-.49 1.18v5h13.33v-5c0-.46-.16-.85-.49-1.18m-1.17 2.84h-10v-1.67h10z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="star" xmlns="http://www.w3.org/2000/svg"><path d="m19.972 11.014-3.375 2.912 1.028 4.355a1.23 1.23 0 0 1-1.838 1.337L12 17.287l-3.79 2.33a1.23 1.23 0 0 1-1.835-1.336l1.032-4.355-3.375-2.912a1.235 1.235 0 0 1 .699-2.164l4.425-.357 1.707-4.131a1.227 1.227 0 0 1 2.27 0l1.707 4.131 4.425.357a1.235 1.235 0 0 1 .702 2.165z"/></symbol><symbol viewBox="0 0 24 24" id="star-outlined" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.99 3.6c-.24 0-.48.07-.68.21s-.36.33-.45.55L9.15 8.49l-4.42.36a1.23 1.23 0 0 0-1.08 1.56c.07.23.2.44.38.6l3.38 2.91-1.03 4.36c-.06.24-.04.48.04.71s.23.43.43.57.43.22.67.23h.05c.23 0 .45-.06.64-.18L12 17.28l3.79 2.33c.19.12.42.18.64.18h.05c.24 0 .48-.09.67-.23a1.232 1.232 0 0 0 .47-1.28l-1.03-4.36 3.38-2.91a1.24 1.24 0 0 0 .37-1.31c-.08-.23-.22-.43-.41-.59a1.23 1.23 0 0 0-.66-.26l-4.42-.36-1.71-4.13c-.09-.23-.25-.42-.45-.55-.2-.14-.44-.21-.68-.21zm0 2.38 1.3 3.15c.24.58.78.97 1.41 1.02l3.39.27-2.59 2.24c-.47.41-.68 1.04-.53 1.64l.79 3.34-2.89-1.78c-.27-.16-.57-.25-.87-.25s-.61.08-.87.25l-2.89 1.78.79-3.33a1.68 1.68 0 0 0-.53-1.65l-2.59-2.24 3.39-.27c.62-.05 1.17-.45 1.41-1.02l1.3-3.15" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="start" xmlns="http://www.w3.org/2000/svg"><path d="M4.667 17V7h1.666v10zm11.666 0-1.187-1.167 3-3H8v-1.666h10.146l-2.98-3L16.334 7l5 5z"/></symbol><symbol viewBox="0 0 24 24" id="step" xmlns="http://www.w3.org/2000/svg"><path d="M17.833 14.5q-1.062 0-1.78-.719-.72-.719-.72-1.781t.72-1.781 1.78-.719 1.782.719.718 1.781q0 1.062-.718 1.781-.72.72-1.782.719M9.5 16.167l-1.167-1.188 2.146-2.146H3.667v-1.666h6.812L8.333 9 9.5 7.833 13.667 12z"/></symbol><symbol viewBox="0 0 24 24" id="stop" xmlns="http://www.w3.org/2000/svg"><path d="M7 17V7h10v10z"/></symbol><symbol viewBox="0 0 24 24" id="story" xmlns="http://www.w3.org/2000/svg"><path d="M12.33 7.46c.75 0 1.4.27 1.94.81s.81 1.19.81 1.94-.27 1.4-.81 1.94-1.19.81-1.94.81-1.4-.27-1.94-.81-.81-1.19-.81-1.94.27-1.4.81-1.94 1.18-.81 1.94-.81"/><path fill-rule="evenodd" d="M19 5c.46 0 .85.16 1.18.49s.49.72.49 1.18v10c0 .46-.16.85-.49 1.18a1.6 1.6 0 0 1-1.18.49H5.67a1.6 1.6 0 0 1-1.18-.49A1.6 1.6 0 0 1 4 16.67v-10c0-.46.16-.85.49-1.18A1.6 1.6 0 0 1 5.67 5zM5.68 6.5c-.06 0-.07 0-.12.05s-.05.06-.05.12v10c0 .06 0 .07.05.12s.06.05.12.05h.89c0-.4.11-.77.31-1.1.21-.35.49-.61.84-.79.74-.37 1.5-.65 2.27-.84s1.55-.28 2.35-.28 1.58.09 2.35.28 1.52.47 2.27.84c.35.19.63.45.84.79.2.34.31.7.31 1.1H19c.06 0 .07 0 .12-.05s.05-.06.05-.12h.01v-10c0-.06 0-.07-.05-.12s-.06-.05-.12-.05z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="strategy" xmlns="http://www.w3.org/2000/svg"><path d="M10.438 16.688a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-4.246-5.496 1.12-1.12 1.12 1.12a.625.625 0 0 0 .885-.884l-1.12-1.12 1.12-1.12a.625.625 0 0 0-.884-.885l-1.12 1.12-1.12-1.12a.625.625 0 0 0-.885.884l1.12 1.12-1.12 1.12a.625.625 0 0 0 .884.885m12.63 5.496 1.12-1.12a.626.626 0 0 0-.884-.885l-1.12 1.12-1.12-1.12a.625.625 0 0 0-.885.884l1.12 1.12-1.12 1.12a.625.625 0 1 0 .884.885l1.12-1.12 1.12 1.12a.624.624 0 1 0 .885-.884zm-3.88-10.755-.183-.183h1.616a.625.625 0 0 0 0-1.25H13.25a.625.625 0 0 0-.625.625V8.25a.625.625 0 1 0 1.25 0V6.634l.183.183c1.4 1.401 1.398 2.766 1.149 3.664-.363 1.31-1.513 2.482-2.734 2.788a.624.624 0 1 0 .304 1.212c1.657-.414 3.153-1.922 3.636-3.666.476-1.723-.046-3.456-1.47-4.882"/></symbol><symbol viewBox="0 0 24 24" id="success" xmlns="http://www.w3.org/2000/svg"><path d="m10.833 15.833 5.875-5.875-1.166-1.166-4.709 4.708-2.375-2.375-1.166 1.167zm1.167 4.5a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.646-1.781 8.4 8.4 0 0 1-1.781-2.646A8.1 8.1 0 0 1 3.667 12q0-1.73.656-3.25a8.4 8.4 0 0 1 1.781-2.646A8.4 8.4 0 0 1 8.75 4.323 8.1 8.1 0 0 1 12 3.667q1.73 0 3.25.656a8.4 8.4 0 0 1 2.646 1.781 8.4 8.4 0 0 1 1.781 2.646 8.1 8.1 0 0 1 .656 3.25 8.1 8.1 0 0 1-.656 3.25 8.4 8.4 0 0 1-1.781 2.646 8.4 8.4 0 0 1-2.646 1.781 8.1 8.1 0 0 1-3.25.656"/></symbol><symbol viewBox="0 0 24 24" id="sun" xmlns="http://www.w3.org/2000/svg"><path d="M12 16.167q-1.729 0-2.948-1.219Q7.833 13.73 7.833 12t1.22-2.948Q10.27 7.833 12 7.833t2.948 1.22q1.22 1.218 1.219 2.947t-1.219 2.948Q13.73 16.168 12 16.167m-5.833-3.334H2.833v-1.666h3.334zm15 0h-3.334v-1.666h3.334zm-10-6.666V2.833h1.666v3.334zm0 15v-3.334h1.666v3.334zM7.333 8.458 5.23 6.438l1.188-1.23 2 2.084zm10.25 10.334-2.02-2.105 1.104-1.145 2.104 2.02zM15.542 7.333l2.02-2.104 1.23 1.188-2.084 2zM5.208 17.583l2.105-2.02 1.145 1.104-2.02 2.104z"/></symbol><symbol viewBox="0 0 24 24" id="support" xmlns="http://www.w3.org/2000/svg"><path d="M12 20.333a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.646-1.781 8.4 8.4 0 0 1-1.781-2.646A8.1 8.1 0 0 1 3.667 12q0-1.73.656-3.25a8.4 8.4 0 0 1 1.781-2.646A8.4 8.4 0 0 1 8.75 4.323 8.1 8.1 0 0 1 12 3.667q1.73 0 3.25.656a8.4 8.4 0 0 1 2.646 1.781 8.4 8.4 0 0 1 1.781 2.646 8.1 8.1 0 0 1 .656 3.25 8.1 8.1 0 0 1-.656 3.25 8.4 8.4 0 0 1-1.781 2.646 8.4 8.4 0 0 1-2.646 1.781 8.1 8.1 0 0 1-3.25.656m-2.417-2.125 1-2.291a3.9 3.9 0 0 1-1.51-.97 4.7 4.7 0 0 1-.99-1.53l-2.291.958a6.25 6.25 0 0 0 1.479 2.333 6.5 6.5 0 0 0 2.312 1.5m-1.5-7.625a4.7 4.7 0 0 1 .99-1.531q.635-.655 1.51-.969l-.958-2.291a6.5 6.5 0 0 0-2.333 1.5 6.5 6.5 0 0 0-1.5 2.333zM12 14.5q1.042 0 1.77-.73.73-.728.73-1.77t-.73-1.77A2.4 2.4 0 0 0 12 9.5q-1.042 0-1.77.73A2.4 2.4 0 0 0 9.5 12q0 1.042.73 1.77.728.73 1.77.73m2.417 3.708a6.5 6.5 0 0 0 2.302-1.49 6.5 6.5 0 0 0 1.49-2.301l-2.292-1a3.96 3.96 0 0 1-.959 1.51q-.645.636-1.5.99zm1.5-7.666 2.291-.959a6.5 6.5 0 0 0-1.49-2.302 6.5 6.5 0 0 0-2.301-1.49l-.959 2.334q.855.312 1.48.948.624.635.979 1.469"/></symbol><symbol viewBox="0 0 24 24" id="sync" xmlns="http://www.w3.org/2000/svg"><path d="M5.33 13.67h5v1.67H8.29l.21.21c.5.5 1.05.87 1.64 1.1.59.24 1.2.35 1.82.35 1.07 0 2.04-.31 2.91-.92s1.48-1.42 1.84-2.42h1.75c-.39 1.49-1.18 2.69-2.39 3.61-1.2.92-2.57 1.39-4.11 1.39-.83 0-1.65-.16-2.45-.47s-1.54-.81-2.22-1.49L7 16.37v2.29H5.33v-5zm2.59-6.94c1.21-.93 2.58-1.39 4.12-1.39.83 0 1.65.16 2.45.47s1.54.81 2.22 1.49l.29.33V5.34h1.67v5h-5V8.67h2.04l-.21-.21c-.5-.5-1.05-.87-1.64-1.1a4.8 4.8 0 0 0-1.82-.35c-1.07 0-2.04.31-2.91.92s-1.48 1.42-1.84 2.42H5.54c.39-1.49 1.18-2.69 2.39-3.61z"/></symbol><symbol viewBox="0 0 24 24" id="tag" xmlns="http://www.w3.org/2000/svg"><path d="M20.52 14.542 14.563 20.5a1.7 1.7 0 0 1-.562.375 1.7 1.7 0 0 1-.625.125q-.313 0-.625-.125a1.7 1.7 0 0 1-.563-.375l-7.354-7.354a1.646 1.646 0 0 1-.48-1.167v-5.98q.001-.687.49-1.176.49-.49 1.178-.49H12q.333 0 .646.136.312.135.541.364l7.334 7.354q.25.25.364.563.115.312.115.625 0 .312-.115.614a1.6 1.6 0 0 1-.364.552M8.105 9.333q.52 0 .885-.364.365-.366.365-.886t-.365-.885a1.2 1.2 0 0 0-.885-.365q-.52 0-.885.365a1.2 1.2 0 0 0-.365.885q0 .52.365.886.365.364.885.364"/></symbol><symbol viewBox="0 0 24 24" id="target" xmlns="http://www.w3.org/2000/svg"><path d="M12 20.333a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.646-1.781 8.4 8.4 0 0 1-1.781-2.646A8.1 8.1 0 0 1 3.667 12q0-1.73.656-3.25a8.4 8.4 0 0 1 1.781-2.646A8.4 8.4 0 0 1 8.75 4.323 8.1 8.1 0 0 1 12 3.667q1.73 0 3.25.656a8.4 8.4 0 0 1 2.646 1.781 8.4 8.4 0 0 1 1.781 2.646 8.1 8.1 0 0 1 .656 3.25 8.1 8.1 0 0 1-.656 3.25 8.4 8.4 0 0 1-1.781 2.646 8.4 8.4 0 0 1-2.646 1.781 8.1 8.1 0 0 1-3.25.656m0-1.666q2.792 0 4.73-1.938 1.936-1.937 1.937-4.729 0-2.792-1.938-4.73Q14.792 5.335 12 5.334q-2.791 0-4.73 1.938Q5.335 9.208 5.334 12q0 2.792 1.938 4.73 1.937 1.936 4.73 1.937M12 17q-2.084 0-3.542-1.458Q7 14.083 7 12q0-2.084 1.458-3.542Q9.917 7 12 7q2.084 0 3.542 1.458Q17 9.917 17 12q0 2.084-1.458 3.542Q14.083 17 12 17m0-1.667a3.2 3.2 0 0 0 2.354-.979 3.2 3.2 0 0 0 .98-2.354 3.2 3.2 0 0 0-.98-2.354A3.2 3.2 0 0 0 12 8.666a3.2 3.2 0 0 0-2.354.98A3.2 3.2 0 0 0 8.666 12q0 1.375.98 2.354a3.2 3.2 0 0 0 2.354.98m0-1.666q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177q0-.687.49-1.177t1.177-.49 1.177.49.49 1.177-.49 1.177-1.177.49"/></symbol><symbol viewBox="0 0 24 24" id="target-2" xmlns="http://www.w3.org/2000/svg"><path d="M19.334 8.497a8.133 8.133 0 1 1-2.047-2.669l1.77-1.772a.626.626 0 0 1 .885.885L15.094 9.79l-2.946 2.946-1.871 1.871a3.125 3.125 0 0 0 4.843-2.787.626.626 0 0 1 1.25-.07 4.376 4.376 0 0 1-7.46 3.343 4.375 4.375 0 0 1 5.713-6.596l1.775-1.78a6.866 6.866 0 1 0 1.808 2.319.625.625 0 0 1 1.128-.54"/></symbol><symbol viewBox="0 0 24 24" id="task-alt" xmlns="http://www.w3.org/2000/svg"><path d="M12 20.333a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.646-1.781 8.4 8.4 0 0 1-1.781-2.646A8.1 8.1 0 0 1 3.667 12q0-1.73.656-3.25a8.4 8.4 0 0 1 1.781-2.646A8.4 8.4 0 0 1 8.75 4.323 8.1 8.1 0 0 1 12 3.667a8.2 8.2 0 0 1 2.563.396 8.6 8.6 0 0 1 2.229 1.104l-1.209 1.229a7.2 7.2 0 0 0-1.687-.781A6.3 6.3 0 0 0 12 5.333q-2.77 0-4.719 1.948Q5.334 9.23 5.333 12t1.948 4.719Q9.23 18.667 12 18.667t4.719-1.948Q18.667 14.77 18.667 12q0-.375-.042-.75a6 6 0 0 0-.125-.73l1.354-1.353q.23.666.354 1.375.126.708.125 1.458a8.1 8.1 0 0 1-.656 3.25 8.4 8.4 0 0 1-1.781 2.646 8.4 8.4 0 0 1-2.646 1.781 8.1 8.1 0 0 1-3.25.656m-1.167-4.5-3.541-3.541 1.166-1.167 2.375 2.375 8.334-8.354 1.166 1.167z"/></symbol><symbol viewBox="0 0 24 24" id="text-add" xmlns="http://www.w3.org/2000/svg"><path d="M4.083 14.5v-1.667h5.834V14.5zm0-3.333V9.5h9.167v1.667zm0-3.334V6.167h9.167v1.666zm10.834 10V14.5h-3.334v-1.667h3.334V9.5h1.666v3.333h3.334V14.5h-3.334v3.333z"/></symbol><symbol viewBox="0 0 24 24" id="textbox" xmlns="http://www.w3.org/2000/svg"><path d="M21.375 8.25v7.5a1.25 1.25 0 0 1-1.25 1.25h-7.187a.313.313 0 0 1-.313-.312V7.313A.31.31 0 0 1 12.938 7h7.187a1.25 1.25 0 0 1 1.25 1.25m-10-2.5v12.5a.624.624 0 1 1-1.25 0V17h-6.25a1.25 1.25 0 0 1-1.25-1.25v-7.5A1.25 1.25 0 0 1 3.875 7h6.25V5.75a.625.625 0 1 1 1.25 0m-2.5 5a.625.625 0 0 0-.625-.625h-2.5a.625.625 0 1 0 0 1.25h.625v1.875a.625.625 0 1 0 1.25 0v-1.875h.625a.625.625 0 0 0 .625-.625"/></symbol><symbol viewBox="0 0 24 24" id="time-add" xmlns="http://www.w3.org/2000/svg"><path d="M12.029 19.493a7.4 7.4 0 0 1-2.927-.584 7.5 7.5 0 0 1-2.386-1.604 7.5 7.5 0 0 1-1.604-2.385 7.4 7.4 0 0 1-.583-2.927q0-1.563.583-2.928A7.5 7.5 0 0 1 6.716 6.68a7.5 7.5 0 0 1 2.386-1.604 7.4 7.4 0 0 1 2.927-.584 6.6 6.6 0 0 1 1.666.209v1.708a5.543 5.543 0 0 0-1.667-.25q-2.457 0-4.145 1.688t-1.687 4.145q0 2.46 1.687 4.146 1.688 1.688 4.146 1.688t4.146-1.688 1.687-4.146q0-.228-.02-.416a6 6 0 0 0-.063-.417h1.708q.042.23.042.417v.416a7.4 7.4 0 0 1-.584 2.928 7.5 7.5 0 0 1-1.604 2.385 7.5 7.5 0 0 1-2.385 1.604 7.4 7.4 0 0 1-2.927.584m2.333-4-3.167-3.167v-4.5h1.667v3.833l2.667 2.667zm3.5-6v-2.5h-2.5V5.325h2.5v-2.5h1.667v2.5h2.5v1.666h-2.5v2.5z"/></symbol><symbol viewBox="0 0 24 24" id="timer" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 3.777V2.11h5v1.667zm1.667 9.167h1.666v-5h-1.666zM12 19.61a7.2 7.2 0 0 1-2.906-.593 7.7 7.7 0 0 1-2.386-1.615 7.7 7.7 0 0 1-1.614-2.385A7.2 7.2 0 0 1 4.5 12.11q0-1.542.594-2.907A7.7 7.7 0 0 1 6.708 6.82a7.7 7.7 0 0 1 2.386-1.615A7.2 7.2 0 0 1 12 4.61q1.292 0 2.48.417 1.186.416 2.228 1.208l1.167-1.166 1.167 1.166-1.167 1.167a8.1 8.1 0 0 1 1.208 2.23q.417 1.186.417 2.479a7.2 7.2 0 0 1-.594 2.906 7.7 7.7 0 0 1-1.614 2.385 7.7 7.7 0 0 1-2.386 1.615A7.2 7.2 0 0 1 12 19.61"/></symbol><symbol viewBox="0 0 24 24" id="toolbox" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 8.133h5V6.467h-5zm-5.833 10v-4.166H7v.833h1.667v-.833h6.666v.833H17v-.833h3.333v4.166zm0-5V9.8q0-.687.49-1.177.489-.49 1.176-.49h2.5V6.467q0-.688.49-1.177T9.5 4.8h5q.687 0 1.177.49.49.489.49 1.177v1.666h2.5q.687 0 1.177.49t.49 1.177v3.333H17v-1.666h-1.667v1.666H8.667v-1.666H7v1.666z"/></symbol><symbol viewBox="0 0 24 24" id="tools" xmlns="http://www.w3.org/2000/svg"><path d="m17.948 19.51-4.563-4.562 1.75-1.75 4.563 4.562zm-11.5 0-1.75-1.75 5.75-5.75-1.417-1.416-.583.583-1.063-1.062v1.708l-.583.583-2.52-2.52.583-.584h1.708L5.53 8.26l2.96-2.958a2.6 2.6 0 0 1 .895-.604 2.67 2.67 0 0 1 1.959 0q.48.187.896.604L10.323 7.22l1.042 1.041-.584.584 1.417 1.416 1.875-1.875a3.5 3.5 0 0 1-.136-.479 2.5 2.5 0 0 1-.052-.5q0-1.23.844-2.073.845-.843 2.073-.843.312 0 .594.062.28.063.573.188l-2.063 2.062 1.5 1.5L19.47 6.24q.146.291.198.572.051.282.052.594 0 1.23-.844 2.073-.843.844-2.073.844-.25 0-.5-.042a2 2 0 0 1-.48-.146z"/></symbol><symbol viewBox="0 0 24 24" id="trash" xmlns="http://www.w3.org/2000/svg"><path d="M7.833 19.5q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V7h-.833V5.333H9.5V4.5h5v.833h4.167V7h-.834v10.833q0 .688-.49 1.177-.489.49-1.176.49zM9.5 16.167h1.667v-7.5H9.5zm3.333 0H14.5v-7.5h-1.667z"/></symbol><symbol viewBox="0 0 24 24" id="trophy" xmlns="http://www.w3.org/2000/svg"><path d="M7.833 19.5v-1.667h3.334V15.25a4.5 4.5 0 0 1-1.823-.865 3.73 3.73 0 0 1-1.177-1.593 4.05 4.05 0 0 1-2.615-1.365A4 4 0 0 1 4.5 8.667v-.834q0-.687.49-1.177.489-.49 1.177-.49h1.666V4.5h8.334v1.667h1.666q.688 0 1.177.49.49.489.49 1.176v.834a4 4 0 0 1-1.052 2.76 4.05 4.05 0 0 1-2.615 1.365 3.73 3.73 0 0 1-1.177 1.593 4.5 4.5 0 0 1-1.823.865v2.583h3.334V19.5zm0-8.5V7.833H6.167v.834q0 .79.458 1.427.459.635 1.208.906m8.334 0q.75-.27 1.208-.906.459-.636.458-1.427v-.834h-1.666z"/></symbol><symbol viewBox="0 0 24 24" id="truck-trailer" xmlns="http://www.w3.org/2000/svg"><path d="M7.82 19.076a2.4 2.4 0 0 1-1.771-.73 2.4 2.4 0 0 1-.73-1.77H3.654V7.409q0-.687.49-1.177.489-.49 1.177-.49h11.666v3.334h2.5l2.5 3.333v4.167H20.32a2.4 2.4 0 0 1-.73 1.77 2.4 2.4 0 0 1-1.77.73 2.4 2.4 0 0 1-1.771-.73 2.4 2.4 0 0 1-.73-1.77h-5a2.4 2.4 0 0 1-.729 1.77 2.4 2.4 0 0 1-1.77.73m0-1.667q.354 0 .593-.24.24-.24.24-.593a.8.8 0 0 0-.24-.594.8.8 0 0 0-.593-.24.8.8 0 0 0-.594.24.8.8 0 0 0-.24.594q0 .354.24.594t.594.24m10 0q.354 0 .593-.24.24-.24.24-.593a.8.8 0 0 0-.24-.594.8.8 0 0 0-.593-.24.8.8 0 0 0-.594.24.8.8 0 0 0-.24.594q0 .354.24.594t.594.24m-.834-4.166h3.542l-1.875-2.5h-1.667z"/></symbol><symbol viewBox="0 0 24 24" id="update" xmlns="http://www.w3.org/2000/svg"><path d="M12 19.5a7.3 7.3 0 0 1-2.927-.594 7.6 7.6 0 0 1-2.375-1.604 7.6 7.6 0 0 1-1.604-2.375A7.3 7.3 0 0 1 4.5 12q0-1.562.594-2.927.593-1.365 1.604-2.375a7.6 7.6 0 0 1 2.375-1.604A7.3 7.3 0 0 1 12 4.5q1.708 0 3.24.73a7.3 7.3 0 0 1 2.593 2.062V5.333H19.5v5h-5V8.667h2.292a6.2 6.2 0 0 0-2.105-1.834A5.6 5.6 0 0 0 12 6.167q-2.437 0-4.135 1.698T6.167 12t1.698 4.135T12 17.833q2.188 0 3.823-1.416 1.636-1.418 1.927-3.584h1.708q-.312 2.855-2.448 4.76Q14.876 19.5 12 19.5m2.333-4-3.166-3.167v-4.5h1.666v3.834l2.667 2.666z"/></symbol><symbol viewBox="0 0 24 24" id="upload" xmlns="http://www.w3.org/2000/svg"><path d="M11.167 15.333V8.542L9 10.708 7.833 9.5 12 5.333 16.167 9.5 15 10.708l-2.167-2.166v6.791zM7 18.667q-.687 0-1.177-.49A1.6 1.6 0 0 1 5.333 17v-2.5H7V17h10v-2.5h1.667V17q0 .687-.49 1.177t-1.177.49z"/></symbol><symbol viewBox="0 0 24 24" id="upload-cloud" xmlns="http://www.w3.org/2000/svg"><path d="M11.167 18.667h-3.75q-1.896 0-3.24-1.313t-1.344-3.208q0-1.626.98-2.896a4.33 4.33 0 0 1 2.562-1.625 5.66 5.66 0 0 1 2.083-3.104A5.7 5.7 0 0 1 12 5.333q2.438 0 4.135 1.698 1.698 1.697 1.698 4.136a3.64 3.64 0 0 1 2.386 1.24q.948 1.072.948 2.51 0 1.562-1.094 2.656t-2.656 1.094h-4.584v-5.959L14.167 14l1.166-1.167L12 9.5l-3.333 3.333L9.833 14l1.334-1.292z"/></symbol><symbol viewBox="0 0 24 24" id="user" xmlns="http://www.w3.org/2000/svg"><path d="M12 12a3.2 3.2 0 0 1-2.354-.98 3.2 3.2 0 0 1-.98-2.353q0-1.376.98-2.354A3.2 3.2 0 0 1 12 5.333a3.2 3.2 0 0 1 2.354.98 3.2 3.2 0 0 1 .98 2.354 3.2 3.2 0 0 1-.98 2.354A3.2 3.2 0 0 1 12 12m-6.667 6.667v-2.334q0-.708.365-1.302a2.43 2.43 0 0 1 .969-.906q1.29-.645 2.625-.969A11.5 11.5 0 0 1 12 12.833q1.376 0 2.708.323 1.334.323 2.625.969.604.312.97.906.364.594.364 1.302v2.334z"/></symbol><symbol viewBox="0 0 24 24" id="user-add" xmlns="http://www.w3.org/2000/svg"><path d="M17.663 13.17v-2.003h-1.995V9.5h1.995v-2h1.667v2h1.998v1.667H19.33v2.003zM10.997 12a3.2 3.2 0 0 1-2.354-.98 3.2 3.2 0 0 1-.98-2.353q0-1.376.98-2.354a3.2 3.2 0 0 1 2.354-.98 3.2 3.2 0 0 1 2.354.98 3.2 3.2 0 0 1 .979 2.354 3.2 3.2 0 0 1-.98 2.354 3.2 3.2 0 0 1-2.353.979M4.33 18.667v-2.334q0-.708.365-1.302t.968-.906q1.292-.645 2.625-.969a11.5 11.5 0 0 1 2.709-.323q1.375 0 2.708.323t2.625.969q.604.312.969.906.364.594.364 1.302v2.334z"/></symbol><symbol viewBox="0 0 24 24" id="user-details" xmlns="http://www.w3.org/2000/svg"><path d="M10.854 12.938a2.4 2.4 0 0 1-1.77.729 2.4 2.4 0 0 1-1.772-.73 2.4 2.4 0 0 1-.729-1.77q0-1.042.73-1.771a2.4 2.4 0 0 1 1.77-.73 2.4 2.4 0 0 1 1.771.73 2.4 2.4 0 0 1 .73 1.77 2.4 2.4 0 0 1-.73 1.771m3.229 4.146v1.584h-10v-1.584q0-.437.209-.833.208-.396.583-.625a7.7 7.7 0 0 1 1.99-.844 8.6 8.6 0 0 1 2.218-.281q1.167 0 2.22.281a7.7 7.7 0 0 1 1.989.844q.375.23.583.625.208.396.208.833M19.917 12v1.667H13.25V12zm0-6.667V7h-10V5.333zm0 5h-6.75a5 5 0 0 0-.282-.895 3.1 3.1 0 0 0-.468-.771h7.5z"/></symbol><symbol viewBox="0 0 24 24" id="user-group" xmlns="http://www.w3.org/2000/svg"><path d="M2 17v-1.312q0-.897.917-1.459.916-.562 2.416-.562.27 0 .521.01.25.01.48.052-.292.438-.438.917t-.146 1V17zm5 0v-1.354q0-.667.365-1.219.364-.551 1.03-.969.668-.416 1.595-.625a9.2 9.2 0 0 1 2.01-.208q1.104 0 2.031.208.928.21 1.594.625.667.417 1.02.97.355.55.355 1.218V17zm11.25 0v-1.354q0-.542-.135-1.021a3.3 3.3 0 0 0-.407-.896q.23-.042.47-.052.238-.01.489-.01 1.5 0 2.416.552.917.551.917 1.469V17zM5.333 12.833q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176q0-.709.49-1.188.49-.48 1.177-.479.709 0 1.188.48.48.478.479 1.187 0 .687-.48 1.177-.478.49-1.187.49m13.334 0q-.688 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176q0-.709.49-1.188.489-.48 1.177-.479.708 0 1.187.48.48.478.48 1.187 0 .687-.48 1.177t-1.187.49M12 12a2.4 2.4 0 0 1-1.77-.73A2.4 2.4 0 0 1 9.5 9.5q0-1.062.73-1.781A2.43 2.43 0 0 1 12 7q1.062 0 1.781.719.72.719.719 1.781 0 1.042-.719 1.77Q13.062 12 12 12"/></symbol><symbol viewBox="0 0 24 24" id="user-id-badge" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18.005 4.465c-.33-.33-.72-.49-1.18-.49h-9.66c-.46 0-.85.16-1.18.49s-.49.72-.49 1.18v12.71c0 .46.16.85.49 1.18s.72.49 1.18.49h9.67c.46 0 .85-.16 1.18-.49s.49-.72.49-1.18V5.645c0-.46-.16-.85-.49-1.18zm-7.51 1.18h3c.28 0 .5.22.5.5s-.22.5-.5.5h-3c-.28 0-.5-.22-.5-.5s.22-.5.5-.5m-.09 4.94q.66-.66 1.59-.66t1.59.66.66 1.59-.66 1.59-1.59.66-1.59-.66-.66-1.59.66-1.59m6.09 7.43h-9v-1.12c.58-.28 1.14-.52 1.89-.69.8-.19 1.68-.28 2.61-.28s1.81.09 2.61.28c.75.17 1.31.41 1.89.69z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="user-id-card" xmlns="http://www.w3.org/2000/svg"><path d="M13.667 12.833h4.166v-1.666h-4.166zm0-2.5h4.166V8.667h-4.166zm-7.5 5h6.666v-.458q0-.937-.916-1.49-.917-.552-2.417-.552t-2.417.553q-.916.552-.916 1.489zM9.5 12q.687 0 1.177-.49.49-.489.49-1.177 0-.687-.49-1.177a1.6 1.6 0 0 0-1.177-.49q-.687 0-1.177.49t-.49 1.177.49 1.178T9.5 12m-4.167 6.667q-.687 0-1.177-.49A1.6 1.6 0 0 1 3.666 17V7q0-.687.49-1.177t1.177-.49h13.334q.687 0 1.177.49T20.334 7v10q0 .687-.49 1.177t-1.177.49z"/></symbol><symbol viewBox="0 0 24 24" id="user-recent" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 17.833q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176V7.833q0-.687.49-1.177t1.177-.49h8.333q.688 0 1.177.49t.49 1.177v8.334q0 .687-.49 1.177-.489.49-1.177.49zm0-3.041a8.2 8.2 0 0 1 1.958-.834 8.2 8.2 0 0 1 2.209-.291q1.166 0 2.208.291a8.2 8.2 0 0 1 1.958.834V7.833H4.5zm4.167-1.75q-.959 0-1.625-.667a2.2 2.2 0 0 1-.667-1.625q0-.958.667-1.625a2.2 2.2 0 0 1 1.625-.667q.958 0 1.625.667.666.666.666 1.625 0 .958-.666 1.625a2.2 2.2 0 0 1-1.625.667m7.5 4.791V6.167h1.666v11.666zm3.333 0V6.167h1.667v11.666z"/></symbol><symbol viewBox="0 0 24 24" id="verified" xmlns="http://www.w3.org/2000/svg"><path d="m4 9.41 2.44-1.45.61-2.74 2.82.27L12 3.62l2.13 1.87 2.82-.27.61 2.74L20 9.41 18.9 12l1.1 2.59-2.44 1.45-.61 2.74-2.82-.27L12 20.38l-2.13-1.87-2.82.27-.61-2.74L4 14.59 5.1 12zm7.12 5.55 4.71-4.71-1.17-1.21-3.54 3.54-1.79-1.75L8.16 12z"/></symbol><symbol viewBox="0 0 24 24" id="video" xmlns="http://www.w3.org/2000/svg"><path d="M5.333 17.833q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176V7.833q0-.687.49-1.177t1.177-.49h13.334q.687 0 1.177.49t.49 1.177v8.334q0 .687-.49 1.177t-1.177.49zm5-2.5 5-3.333-5-3.333z"/></symbol><symbol viewBox="0 0 24 24" id="view-cards" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 16.585v-2.5c0-.69.56-1.25 1.25-1.25h4.17c.69 0 1.25.56 1.25 1.25v2.5c0 .69-.56 1.25-1.25 1.25H5.75c-.69 0-1.25-.56-1.25-1.25m8.33 0v-2.5c0-.69.56-1.25 1.25-1.25h4.17c.69 0 1.25.56 1.25 1.25v2.5c0 .69-.56 1.25-1.25 1.25h-4.17c-.69 0-1.25-.56-1.25-1.25M4.5 9.915v-2.5c0-.69.56-1.25 1.25-1.25h4.17c.69 0 1.25.56 1.25 1.25v2.5c0 .69-.56 1.25-1.25 1.25H5.75c-.69 0-1.25-.56-1.25-1.25m8.33 0v-2.5c0-.69.56-1.25 1.25-1.25h4.17c.69 0 1.25.56 1.25 1.25v2.5c0 .69-.56 1.25-1.25 1.25h-4.17c-.69 0-1.25-.56-1.25-1.25"/></symbol><symbol viewBox="0 0 24 24" id="view-doc" xmlns="http://www.w3.org/2000/svg"><path d="M9.82 17.345c.33.33.72.49 1.18.49h7.33c.46 0 .85-.16 1.18-.49s.49-.72.49-1.18v-8.33c0-.46-.16-.85-.49-1.18s-.72-.49-1.18-.49H11c-.46 0-.85.16-1.18.49s-.49.72-.49 1.18v8.33c0 .46.16.85.49 1.18M7.67 7.085H4v1.25h3.67zM4 9.945h3.67v1.25H4zm3.67 2.86H4v1.25h3.67zm0 2.85H4v1.25h3.67z"/></symbol><symbol viewBox="0 0 24 24" id="view-grid" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18.25 5.75a1.23 1.23 0 0 0-.85-.35H6.6c-.32 0-.62.13-.85.35-.22.22-.35.53-.35.85v10.8c0 .32.13.62.35.85.23.22.53.35.85.35h10.8c.32 0 .62-.13.85-.35.23-.23.35-.53.35-.85V6.6c0-.32-.13-.62-.35-.85M7.07 7.07h4.33v4.33H7.07zm0 5.53h4.33v4.33H7.07zm5.53 0h4.33v4.33H12.6zm0-1.2V7.07h4.33v4.33z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="view-rows" xmlns="http://www.w3.org/2000/svg"><path d="M5.42 6h13.16a.62.62 0 0 1 .62.62v3.81a.62.62 0 0 1-.62.62H5.42a.62.62 0 0 1-.62-.62V6.62A.62.62 0 0 1 5.42 6m0 6.95h13.16a.62.62 0 0 1 .62.62v3.81a.62.62 0 0 1-.62.62H5.42a.62.62 0 0 1-.62-.62v-3.81a.62.62 0 0 1 .62-.62"/></symbol><symbol viewBox="0 0 24 24" id="view-table" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M19.645 5.535H4.355c-.35 0-.62.28-.62.62v11.06c0 .69.56 1.25 1.25 1.25h14.03c.69 0 1.25-.56 1.25-1.25V6.155c0-.35-.28-.62-.62-.62m-1.04 7.67h-9v-2.4h9zm-13.2-3.6v-2.4h13.2v2.4zm3 3.6h-3v-2.4h3zm-3 1.2h3v2.4h-3zm4.2 2.4v-2.4h9v2.4z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="wand" xmlns="http://www.w3.org/2000/svg"><path d="M21.375 13.875a.625.625 0 0 1-.625.625H19.5v1.25a.625.625 0 0 1-1.25 0V14.5H17a.625.625 0 1 1 0-1.25h1.25V12a.625.625 0 1 1 1.25 0v1.25h1.25a.625.625 0 0 1 .625.625m-15-6.25h1.25v1.25a.625.625 0 0 0 1.25 0v-1.25h1.25a.625.625 0 0 0 0-1.25h-1.25v-1.25a.625.625 0 0 0-1.25 0v1.25h-1.25a.625.625 0 0 0 0 1.25m10 9.375h-.625v-.625a.625.625 0 0 0-1.25 0V17h-.625a.625.625 0 1 0 0 1.25h.625v.625a.625.625 0 1 0 1.25 0v-.625h.625a.625.625 0 1 0 0-1.25m2.759-8.75L8.25 19.134a1.25 1.25 0 0 1-1.767 0l-1.617-1.616a1.25 1.25 0 0 1 0-1.768L15.75 4.866a1.25 1.25 0 0 1 1.768 0l1.616 1.616a1.25 1.25 0 0 1 0 1.768m-.884-.884L16.634 5.75l-2.5 2.5 1.616 1.616z"/></symbol><symbol viewBox="0 0 24 24" id="warning" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M20.16 16.31 13.6 4.92c-.16-.28-.4-.51-.68-.67S12.32 4 12 4s-.64.08-.92.25-.51.39-.68.67L3.84 16.31c-.16.27-.24.58-.24.89s.08.62.24.89c.16.28.4.51.68.67s.6.24.92.24h13.12c.32 0 .64-.08.92-.24s.51-.39.68-.67c.16-.27.24-.58.24-.89s-.08-.62-.24-.89m-7.57-.05c-.16.16-.36.24-.59.24s-.43-.08-.59-.24a.8.8 0 0 1-.24-.59c0-.23.08-.43.24-.59s.36-.24.59-.24.43.08.59.24.24.36.24.59-.08.43-.24.59m.24-2.26h-1.67V9.83h1.67z" clip-rule="evenodd"/></symbol><symbol viewBox="0 0 24 24" id="weight" xmlns="http://www.w3.org/2000/svg"><path d="m19.97 17.76-1.74-7a.995.995 0 0 0-.97-.76h-3.04c.48-.53.78-1.23.78-2 0-1.66-1.34-3-3-3S9 6.34 9 8c0 .77.3 1.47.78 2H6.74c-.46 0-.86.31-.97.76l-1.74 7c-.16.63.32 1.24.97 1.24h14c.65 0 1.13-.61.97-1.24M12 7c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1"/></symbol><symbol viewBox="0 0 24 24" id="widgets" xmlns="http://www.w3.org/2000/svg"><path d="m15.333 13.375-4.708-4.708 4.708-4.709 4.709 4.709zM3.958 11.708V5.042h6.667v6.666zm8.334 8.334v-6.667h6.666v6.667zm-8.334 0v-6.667h6.667v6.667z"/></symbol><symbol viewBox="0 0 24 24" id="work-order" xmlns="http://www.w3.org/2000/svg"><path d="M5.188 19.5v-15H18.52v8.333H6.854V14.5h4.167v1.667H6.854v1.666h4.167V19.5zm9.5 0-2.334-2.333L13.521 16l1.166 1.167 2.959-2.959 1.166 1.167zm-7.834-8.333h4.167V9.5H6.854zm5.834 0h4.166V9.5h-4.166zM6.854 7.833h4.167V6.167H6.854zm5.834 0h4.166V6.167h-4.166z"/></symbol><symbol viewBox="0 0 24 24" id="wrench" xmlns="http://www.w3.org/2000/svg"><path d="M20.125 9.5a5.624 5.624 0 0 1-7.886 5.156l-4.067 4.705-.03.033a2.5 2.5 0 1 1-3.537-3.536q.016-.016.034-.03l4.705-4.067a5.63 5.63 0 0 1 6.526-7.717.625.625 0 0 1 .307 1.03L13.25 8.25l.442 2.059 2.058.441 3.176-2.931a.625.625 0 0 1 1.03.307q.17.676.169 1.374"/></symbol><symbol viewBox="0 0 24 24" id="wrench-2" xmlns="http://www.w3.org/2000/svg"><path d="m18.063 9.646-2.938-2.938-1.77 1.75-1.772-1.75 2.355-2.375a1.54 1.54 0 0 1 .562-.364 1.8 1.8 0 0 1 1.26 0q.303.115.532.364l1.77 1.771q.375.354.553.823.177.47.177.948 0 .48-.177.938a2.4 2.4 0 0 1-.552.833m-11.48 3.833a1.2 1.2 0 0 1-.375-.885q0-.51.375-.886l2.042-2.062 1.77 1.77-2.062 2.063q-.354.375-.864.375a1.2 1.2 0 0 1-.886-.375m-.895 6.188a1.9 1.9 0 0 1-.355-.552 1.65 1.65 0 0 1-.125-.636q0-.333.115-.635.114-.303.365-.552l5.895-5.875L8.938 8.75a1.14 1.14 0 0 1-.375-.865q0-.51.375-.885.354-.375.875-.375.52 0 .895.375l2.646 2.646 1.188-1.188 2.333 2.375a.8.8 0 0 1 .25.584.8.8 0 0 1-.25.583.8.8 0 0 1-.583.25.8.8 0 0 1-.584-.25l-7.666 7.667q-.25.25-.552.364a1.673 1.673 0 0 1-1.24-.01 1.8 1.8 0 0 1-.562-.354"/></symbol><symbol viewBox="0 0 24 24" id="x" xmlns="http://www.w3.org/2000/svg"><path d="m7.333 17.833-1.166-1.166L10.833 12 6.167 7.333l1.166-1.166L12 10.833l4.667-4.666 1.166 1.166L13.167 12l4.666 4.667-1.166 1.166L12 13.167z"/></symbol><symbol viewBox="0 0 24 24" id="zoom-in" xmlns="http://www.w3.org/2000/svg"><path d="M13.852 10.779a.615.615 0 0 1-.614.614h-1.844v1.845a.614.614 0 1 1-1.23 0v-1.844H8.32a.615.615 0 1 1 0-1.23h1.844V8.32a.615.615 0 0 1 1.23 0v1.844h1.844a.614.614 0 0 1 .614.615m5.968 9.04a.614.614 0 0 1-.87 0l-3.847-3.847a6.77 6.77 0 1 1 .87-.869l3.847 3.847a.614.614 0 0 1 0 .87m-9.041-3.508a5.533 5.533 0 1 0-5.533-5.532 5.54 5.54 0 0 0 5.533 5.532"/></symbol><symbol viewBox="0 0 24 24" id="zoom-out" xmlns="http://www.w3.org/2000/svg"><path d="M13.852 10.779a.615.615 0 0 1-.614.614H8.32a.615.615 0 1 1 0-1.229h4.918a.614.614 0 0 1 .614.615m5.968 9.04a.614.614 0 0 1-.87 0l-3.847-3.847a6.77 6.77 0 1 1 .87-.869l3.847 3.847a.614.614 0 0 1 0 .87m-9.041-3.508a5.533 5.533 0 1 0-5.533-5.532 5.54 5.54 0 0 0 5.533 5.532"/></symbol></svg>';
let p0 = !1;
function o5() {
  if (!(p0 || typeof document > "u"))
    try {
      const t = document.createElement("div");
      t.style.display = "none", t.setAttribute("aria-hidden", "true"), t.innerHTML = a5, document.body && (document.body.insertBefore(t, document.body.firstChild), p0 = !0);
    } catch (t) {
      console.error("Error injecting sprite:", t);
    }
}
const T = ({
  name: t,
  size: a = "24",
  fill: o = "current",
  ...e
}) => {
  const [r, s] = U0(e), { css: n, ...l } = r, h = O(n, l);
  return Q(() => {
    o5();
  }, []), /* @__PURE__ */ i(
    v,
    {
      as: "svg",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      className: _(t2({ size: a, fill: o }), h),
      ...s,
      children: /* @__PURE__ */ i("use", { xlinkHref: `#${t}` })
    }
  );
}, w5 = {
  "aa-placeholder": "aa-placeholder",
  alarm: "alarm",
  "alt-route": "alt-route",
  apps: "apps",
  "arrow-bubble": "arrow-bubble",
  "arrow-down": "arrow-down",
  "arrow-drop-down": "arrow-drop-down",
  "arrow-drop-up": "arrow-drop-up",
  "arrow-left": "arrow-left",
  "arrow-line-down": "arrow-line-down",
  "arrow-line-left": "arrow-line-left",
  "arrow-line-right": "arrow-line-right",
  "arrow-line-up": "arrow-line-up",
  "arrow-prompt": "arrow-prompt",
  "arrow-redo": "arrow-redo",
  "arrow-right": "arrow-right",
  "arrow-square-in": "arrow-square-in",
  "arrow-square-out": "arrow-square-out",
  "arrow-undo": "arrow-undo",
  "arrow-up": "arrow-up",
  "arrows-down-up": "arrows-down-up",
  "arrows-left-right": "arrows-left-right",
  asterisk: "asterisk",
  at: "at",
  attachment: "attachment",
  bank: "bank",
  "barcode-reader": "barcode-reader",
  barcode: "barcode",
  barricade: "barricade",
  basket: "basket",
  "bell-active": "bell-active",
  "bell-slash": "bell-slash",
  bell: "bell",
  bin: "bin",
  "blog-post": "blog-post",
  blueprint: "blueprint",
  "book-a": "book-a",
  book: "book",
  "bookmark-outlined": "bookmark-outlined",
  bookmark: "bookmark",
  bookmarks: "bookmarks",
  broadcast: "broadcast",
  Building: "Building",
  "calendar-add": "calendar-add",
  "calendar-view-day": "calendar-view-day",
  "calendar-view-month": "calendar-view-month",
  "calendar-view-week": "calendar-view-week",
  calendar: "calendar",
  "caret-down": "caret-down",
  "caret-left": "caret-left",
  "caret-right": "caret-right",
  "caret-up": "caret-up",
  cart: "cart",
  certificate: "certificate",
  "check-all": "check-all",
  "check-thick": "check-thick",
  check: "check",
  "checkbox-checked": "checkbox-checked",
  "checkbox-focus": "checkbox-focus",
  "checkbox-indeterminate": "checkbox-indeterminate",
  checkbox: "checkbox",
  "circle-change": "circle-change",
  "circle-check": "circle-check",
  circle: "circle",
  "circles-add": "circles-add",
  circuit: "circuit",
  clipboard: "clipboard",
  "clock-countdown": "clock-countdown",
  clock: "clock",
  "cloud-synced": "cloud-synced",
  code: "code",
  color: "color",
  compass: "compass",
  cone: "cone",
  confetti: "confetti",
  copy: "copy",
  "credit-card": "credit-card",
  "cube-focus": "cube-focus",
  "cursor-click": "cursor-click",
  cursor: "cursor",
  cut: "cut",
  "data-object": "data-object",
  database: "database",
  devices: "devices",
  dictionary: "dictionary",
  dna: "dna",
  donut: "donut",
  dot: "dot",
  dots: "dots",
  "download-cloud": "download-cloud",
  download: "download",
  edit: "edit",
  encrypted: "encrypted",
  envelope: "envelope",
  equal: "equal",
  eraser: "eraser",
  error: "error",
  "event-list": "event-list",
  export: "export",
  extension: "extension",
  "eye-slash": "eye-slash",
  eye: "eye",
  faq: "faq",
  "file-add": "file-add",
  file: "file",
  files: "files",
  "filter-remove": "filter-remove",
  filter: "filter",
  finish: "finish",
  "fit-screen": "fit-screen",
  "flag-checkered": "flag-checkered",
  flag: "flag",
  forklift: "forklift",
  "fullscreen-exit": "fullscreen-exit",
  fullscreen: "fullscreen",
  garage: "garage",
  gauge: "gauge",
  "globe-grid": "globe-grid",
  globe: "globe",
  gripper: "gripper",
  "handle-vertical": "handle-vertical",
  handle: "handle",
  hash: "hash",
  "heart-outlined": "heart-outlined",
  heart: "heart",
  help: "help",
  history: "history",
  home: "home",
  image: "image",
  images: "images",
  inbox: "inbox",
  infinity: "infinity",
  info: "info",
  inventory: "inventory",
  invoice: "invoice",
  "jump-back": "jump-back",
  "jump-forward": "jump-forward",
  kanban: "kanban",
  "kbd-backspace": "kbd-backspace",
  "kbd-capslock": "kbd-capslock",
  "kbd-command": "kbd-command",
  "kbd-control": "kbd-control",
  "kbd-hide": "kbd-hide",
  "kbd-option": "kbd-option",
  "kbd-return": "kbd-return",
  "kbd-shift": "kbd-shift",
  "kbd-space": "kbd-space",
  kbd: "kbd",
  lightning: "lightning",
  "line-segment": "line-segment",
  "line-segments": "line-segments",
  "link-slash": "link-slash",
  link: "link",
  "linked-services": "linked-services",
  "list-bullets": "list-bullets",
  "list-checks": "list-checks",
  "list-numbers": "list-numbers",
  "lock-open": "lock-open",
  lock: "lock",
  "map-pin": "map-pin",
  map: "map",
  "mark-unread": "mark-unread",
  "menu-close": "menu-close",
  menu: "menu",
  message: "message",
  messages: "messages",
  "minus-thick": "minus-thick",
  minus: "minus",
  money: "money",
  monitor: "monitor",
  moon: "moon",
  navigation: "navigation",
  "network-x": "network-x",
  network: "network",
  "newspaper-clipping": "newspaper-clipping",
  newspaper: "newspaper",
  "note-stack": "note-stack",
  note: "note",
  notepad: "notepad",
  notification: "notification",
  nut: "nut",
  order: "order",
  package: "package",
  "page-first": "page-first",
  "page-last": "page-last",
  parts: "parts",
  password: "password",
  path: "path",
  pause: "pause",
  pencil: "pencil",
  percent: "percent",
  "play-pause": "play-pause",
  play: "play",
  plus: "plus",
  printer: "printer",
  prohibit: "prohibit",
  "question-mark": "question-mark",
  quote: "quote",
  "radio-checked": "radio-checked",
  "radio-focus": "radio-focus",
  radio: "radio",
  "read-doc": "read-doc",
  receipt: "receipt",
  recycle: "recycle",
  refresh: "refresh",
  repeat: "repeat",
  "reply-all": "reply-all",
  reply: "reply",
  resize: "resize",
  ribbon: "ribbon",
  "rows-add": "rows-add",
  ruler: "ruler",
  rules: "rules",
  scale: "scale",
  "schedule-backward": "schedule-backward",
  "schedule-forward": "schedule-forward",
  screwdriver: "screwdriver",
  scroll: "scroll",
  "search-check": "search-check",
  "search-items": "search-items",
  "search-objects": "search-objects",
  search: "search",
  send: "send",
  settings: "settings",
  shapes: "shapes",
  share: "share",
  shuffle: "shuffle",
  signpost: "signpost",
  "skip-back": "skip-back",
  "skip-forward": "skip-forward",
  skull: "skull",
  sliders: "sliders",
  "sort-alpha-down": "sort-alpha-down",
  "sort-alpha-up": "sort-alpha-up",
  "sort-ascending": "sort-ascending",
  "sort-descending": "sort-descending",
  "sort-time-down": "sort-time-down",
  "sort-time-up": "sort-time-up",
  "square-add": "square-add",
  "square-inside": "square-inside",
  "square-select": "square-select",
  square: "square",
  stamp: "stamp",
  "star-outlined": "star-outlined",
  star: "star",
  start: "start",
  step: "step",
  stop: "stop",
  story: "story",
  strategy: "strategy",
  success: "success",
  sun: "sun",
  support: "support",
  sync: "sync",
  tag: "tag",
  "target-2": "target-2",
  target: "target",
  "task-alt": "task-alt",
  "text-add": "text-add",
  textbox: "textbox",
  "time-add": "time-add",
  timer: "timer",
  toolbox: "toolbox",
  tools: "tools",
  trash: "trash",
  trophy: "trophy",
  "truck-trailer": "truck-trailer",
  update: "update",
  "upload-cloud": "upload-cloud",
  upload: "upload",
  "user-add": "user-add",
  "user-details": "user-details",
  "user-group": "user-group",
  "user-id-badge": "user-id-badge",
  "user-id-card": "user-id-card",
  "user-recent": "user-recent",
  user: "user",
  verified: "verified",
  video: "video",
  "view-cards": "view-cards",
  "view-doc": "view-doc",
  "view-grid": "view-grid",
  "view-rows": "view-rows",
  "view-table": "view-table",
  wand: "wand",
  warning: "warning",
  weight: "weight",
  widgets: "widgets",
  "work-order": "work-order",
  "wrench-2": "wrench-2",
  wrench: "wrench",
  x: "x",
  "zoom-in": "zoom-in",
  "zoom-out": "zoom-out"
}, v5 = k1.forwardRef(
  ({
    variant: t,
    size: a,
    href: o,
    className: e,
    children: r,
    loading: s,
    disabled: n,
    iconName: l,
    ...h
  }, p) => {
    const w = s || n, x = o ? "a" : "button", b = r ?? (l ? /* @__PURE__ */ i(T, { name: l, size: a === "small" ? "22" : "24" }) : null);
    return (
      // @ts-ignore
      /* @__PURE__ */ i(
        v,
        {
          as: x,
          ref: p,
          href: o,
          disabled: w,
          "aria-disabled": w,
          className: _(Z2({ variant: t, size: a }), e),
          type: x === "button" ? "button" : void 0,
          ...h,
          children: /* @__PURE__ */ i(a2, { loading: !!s, children: b })
        }
      )
    );
  }
), e5 = ({
  lang: t,
  children: a,
  ...o
}) => {
  const [e, r] = S(o);
  return /* @__PURE__ */ i(
    v,
    {
      as: "code",
      className: _(G2({}), e),
      lang: t,
      ...r,
      children: /* @__PURE__ */ i(I, { children: a })
    }
  );
}, g5 = ({
  children: t,
  lang: a,
  ...o
}) => {
  const [e, r] = S(o);
  return /* @__PURE__ */ i(v, { as: "pre", className: _(a6({}), e), ...r, children: /* @__PURE__ */ i(e5, { lang: a, slot: "react", bg: "transparent", ...r, children: t }) });
}, b5 = ({
  level: t = "h2",
  children: a,
  ...o
}) => {
  const [e, r] = S(o);
  return /* @__PURE__ */ i(
    I,
    {
      as: t,
      className: _(U2({ level: t }), e),
      ...r,
      children: a
    }
  );
}, o2 = ({
  href: t,
  external: a,
  disabled: o,
  children: e,
  size: r,
  family: s,
  weight: n,
  italic: l,
  bold: h,
  ...p
}) => {
  const [w, x] = S(p), g = (b) => {
    o && (b.preventDefault(), b.stopPropagation());
  };
  return /* @__PURE__ */ V(
    v,
    {
      as: "a",
      href: t,
      target: a ? "_blank" : void 0,
      rel: a ? "noopener noreferrer" : void 0,
      "aria-disabled": o,
      className: _(t6({ family: s, italic: l, bold: h }), w),
      fontSize: r,
      fontWeight: n,
      onClick: g,
      ...x,
      children: [
        e,
        a && /* @__PURE__ */ i(T, { name: "arrow-square-out", size: "20" })
      ]
    }
  );
}, r5 = ({
  direction: t,
  weight: a,
  ...o
}) => {
  const [e, r] = S(o);
  return /* @__PURE__ */ i(
    v,
    {
      as: "div",
      className: _($2({ direction: t, weight: a }), e),
      ...r
    }
  );
}, e2 = ({
  indeterminate: t,
  error: a,
  id: o,
  name: e,
  checked: r,
  onChange: s,
  ...n
}) => {
  const { container: l, input: h, indicator: p } = w6({}), w = t ? "checkbox-indeterminate" : r ? "checkbox-checked" : "checkbox";
  return /* @__PURE__ */ V(v, { className: l, ...a && { "data-error": !0 }, children: [
    /* @__PURE__ */ i(
      v,
      {
        as: "input",
        type: "checkbox",
        className: h,
        name: e,
        id: o,
        checked: r,
        onChange: s,
        ...t && { "data-indeterminate": !0 },
        ...a && { "data-error": !0 },
        ...n
      }
    ),
    /* @__PURE__ */ i(T, { className: p, name: w }),
    /* @__PURE__ */ i(T, { className: p, name: "checkbox-focus" })
  ] });
}, G = ({
  htmlFor: t,
  children: a,
  ...o
}) => {
  const [e, r] = S(o);
  return /* @__PURE__ */ i(
    v,
    {
      htmlFor: t,
      as: "label",
      className: _(
        J2({}),
        e
      ),
      ...r,
      children: a
    }
  );
}, s5 = ({ id: t, name: a, error: o, ...e }) => {
  const { container: r, input: s, indicator: n } = x6({});
  return /* @__PURE__ */ V(G, { className: r, htmlFor: t, children: [
    /* @__PURE__ */ i(
      v,
      {
        as: "input",
        type: "radio",
        id: t,
        name: a,
        "aria-label": a,
        className: s,
        ...e,
        ...o && { "data-error": !0 }
      }
    ),
    /* @__PURE__ */ i(T, { className: n, name: "radio" }),
    /* @__PURE__ */ i(T, { className: n, name: "radio-checked" }),
    /* @__PURE__ */ i(T, { className: n, name: "radio-focus" })
  ] });
}, u5 = ({
  size: t,
  error: a,
  autoSize: o = !1,
  id: e,
  name: r,
  "aria-describedby": s,
  ...n
}) => {
  const [l, h] = S(n);
  return /* @__PURE__ */ i(
    v,
    {
      as: "input",
      id: e,
      "aria-label": r,
      "aria-invalid": a || void 0,
      "aria-describedby": s,
      ...a && { "data-error": !0 },
      className: _(l6({ size: t, autoSize: o }), l),
      ...h
    }
  );
}, n5 = ({
  error: t,
  autoSize: a = !1,
  id: o,
  name: e,
  disabled: r,
  ...s
}) => {
  const [n, l] = S(s);
  return /* @__PURE__ */ i(
    v,
    {
      as: "textarea",
      id: o,
      name: e,
      ...t && { "data-error": !0 },
      "aria-disabled": r,
      className: _(n6({ autoGrow: a }), n),
      ...l
    }
  );
};
n5.displayName = "Textarea";
const y5 = ({
  variant: t,
  href: a,
  children: o,
  disabled: e,
  grabbed: r,
  ...s
}) => {
  const [n, l] = S(s);
  return /* @__PURE__ */ i(
    v,
    {
      as: a ? "a" : "button",
      disabled: e,
      "aria-disabled": e,
      "data-grabbed": r,
      className: _(X2({ variant: t }), n),
      ...a ? { href: a } : { type: "button" },
      ...l,
      children: o
    }
  );
}, r2 = ({
  name: t,
  id: a,
  error: o,
  disabled: e,
  checked: r,
  ...s
}) => {
  const { container: n, input: l, indicator: h, background: p } = O6({});
  return /* @__PURE__ */ V(
    G,
    {
      className: n,
      ...e && { "data-disabled": !0 },
      color: { base: "gray.90", _dark: "gray.0" },
      children: [
        /* @__PURE__ */ i(
          v,
          {
            as: "input",
            type: "checkbox",
            name: t,
            id: a,
            "aria-label": t,
            className: l,
            ...r ? { "data-checked": !0 } : {},
            ...o ? { "data-error": !0 } : {},
            ...s
          }
        ),
        /* @__PURE__ */ i(v, { as: "span", className: p, name: "toggle-bg" }),
        /* @__PURE__ */ i(T, { name: "circle", className: h }),
        /* @__PURE__ */ i(
          T,
          {
            name: "circle-check",
            className: h
          }
        )
      ]
    }
  );
}, x5 = ({
  name: t,
  id: a,
  children: o,
  error: e,
  ...r
}) => {
  const [s, n] = S(r);
  return /* @__PURE__ */ V(
    G,
    {
      className: _(i6({}), s),
      ...n,
      htmlFor: a,
      children: [
        /* @__PURE__ */ i(
          r2,
          {
            id: a,
            name: t,
            ...e && { "data-error": !0 },
            ...r
          }
        ),
        o && /* @__PURE__ */ i("div", { children: o })
      ]
    }
  );
}, f5 = ({
  id: t,
  name: a,
  variant: o,
  children: e,
  error: r,
  ...s
}) => {
  const [n, l] = S(s);
  return /* @__PURE__ */ V(
    G,
    {
      className: _(o6({ variant: o }), n),
      ...l,
      htmlFor: t,
      children: [
        /* @__PURE__ */ i(
          s5,
          {
            name: a,
            id: t,
            ...r && { "data-error": !0 },
            ...s
          }
        ),
        e && /* @__PURE__ */ i(v, { as: "div", children: e })
      ]
    }
  );
}, _5 = ({
  id: t,
  name: a,
  children: o,
  error: e,
  indeterminate: r,
  checked: s,
  onChange: n,
  ...l
}) => {
  const [h, p] = S(l);
  return /* @__PURE__ */ V(
    G,
    {
      className: _(Y2(), h),
      ...p,
      htmlFor: t,
      children: [
        /* @__PURE__ */ i(
          e2,
          {
            id: t,
            name: a,
            error: e,
            checked: s,
            onChange: n,
            indeterminate: r,
            ...l
          }
        ),
        o
      ]
    }
  );
}, q1 = "okshaun-theme-preference";
function l5() {
  const t = localStorage.getItem(q1);
  return t || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}
const s2 = n2(void 0);
function q5({ children: t }) {
  const [a, o] = X(() => l5()), e = (r) => {
    o(r), localStorage.setItem(q1, r);
  };
  return Q(() => {
    document.documentElement.removeAttribute("data-color-mode"), document.documentElement.removeAttribute("data-theme"), document.documentElement.setAttribute("data-color-mode", a);
  }, [a]), Q(() => {
    const r = window.matchMedia("(prefers-color-scheme: dark)"), s = (n) => {
      localStorage.getItem(q1) || o(n.matches ? "dark" : "light");
    };
    return r.addEventListener("change", s), () => r.removeEventListener("change", s);
  }, []), /* @__PURE__ */ i(s2.Provider, { value: { theme: a, setTheme: e }, children: t });
}
function i5() {
  const t = l2(s2);
  if (t === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return t;
}
const d5 = O({
  position: "relative",
  borderWidth: "2",
  borderStyle: "solid",
  borderColor: { base: "gray.30", _dark: "gray.70" },
  color: "transparent",
  margin: "8",
  borderRadius: "100",
  cursor: "pointer",
  display: "grid",
  lineHeight: "none",
  width: "14",
  height: "14",
  transition: "all",
  "&:before": {
    content: '""',
    position: "absolute",
    inset: "0",
    opacity: 0,
    display: "block",
    borderRadius: "100",
    backgroundColor: { base: "gray.98", _dark: "gray.5" },
    transition: "all",
    transitionTimingFunction: "default",
    transitionDuration: "slow"
  },
  _hover: {
    cursor: "pointer",
    bg: { base: "gray.90", _dark: "gray.5" },
    borderColor: { base: "gray.90", _dark: "gray.5" },
    "&:before": {
      inset: "-8",
      opacity: 0.25
    }
  }
});
function k5() {
  const { theme: t, setTheme: a } = i5();
  return /* @__PURE__ */ i(
    "button",
    {
      className: d5,
      onClick: () => {
        a(t === "light" ? "dark" : "light");
      },
      "aria-label": `Switch to ${t === "light" ? "dark" : "light"} theme`,
      children: /* @__PURE__ */ i("span", {})
    }
  );
}
const z5 = ({
  trigger: t = "onHover",
  caret: a = !0,
  text: o,
  title: e,
  children: r,
  position: s = "bottom",
  ...n
}) => {
  const [l, h] = X(s), { wrapper: p, tooltipContent: w } = V6({
    position: l,
    caret: a
  }), [x, g] = X(!1), b = T1(null), C = T1(null), P = typeof s == "string" ? s : "bottom", M = [
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
    "top",
    "top-start",
    "top-end",
    "right",
    "right-start",
    "right-end"
  ];
  function A(d) {
    const f = M.indexOf(d);
    return f === -1 ? M : [
      ...M.slice(f + 1),
      ...M.slice(0, f)
    ];
  }
  const k = () => {
    const d = b.current, f = C.current;
    if (!d || !f) return;
    const c = f.getBoundingClientRect(), H = A(P);
    for (const m of [P, ...H]) {
      const B = E(
        c,
        d.offsetWidth,
        d.offsetHeight,
        m
      );
      if (B.top >= 0 && B.left >= 0 && B.bottom <= window.innerHeight && B.right <= window.innerWidth) {
        h(m);
        return;
      }
    }
    h(P);
  };
  function E(d, f, c, H) {
    const B = d.left + d.width / 2 - f / 2, L = d.top + d.height / 2 - c / 2;
    switch (H) {
      case "top":
        return {
          top: d.top - c - 8,
          bottom: d.top - 8,
          left: B,
          right: B + f
        };
      case "top-start":
        return {
          top: d.top - c - 8,
          bottom: d.top - 8,
          left: d.left,
          right: d.left + f
        };
      case "top-end":
        return {
          top: d.top - c - 8,
          bottom: d.top - 8,
          left: d.right - f,
          right: d.right
        };
      case "bottom":
        return {
          top: d.bottom + 8,
          bottom: d.bottom + c + 8,
          left: B,
          right: B + f
        };
      case "bottom-start":
        return {
          top: d.bottom + 8,
          bottom: d.bottom + 8 + c,
          left: d.left,
          right: d.left + f
        };
      case "bottom-end":
        return {
          top: d.bottom + 8,
          bottom: d.bottom + 8 + c,
          left: d.right - f,
          right: d.right
        };
      case "left":
        return {
          top: L,
          bottom: L + c,
          left: d.left - f - 8,
          right: d.left - 8
        };
      case "left-start":
        return {
          top: d.top,
          bottom: d.top + c,
          left: d.left - f - 8,
          right: d.left - 8
        };
      case "left-end":
        return {
          top: d.bottom - c,
          bottom: d.bottom,
          left: d.left - f - 8,
          right: d.left - 8
        };
      case "right":
        return {
          top: L,
          bottom: L + c,
          left: d.right + 8,
          right: d.right + 8 + f
        };
      case "right-start":
        return {
          top: d.top,
          bottom: d.top + c,
          left: d.right + 8,
          right: d.right + 8 + f
        };
      case "right-end":
        return {
          top: d.bottom - c,
          bottom: d.bottom,
          left: d.right + 8,
          right: d.right + 8 + f
        };
      default:
        return { top: 0, bottom: 0, left: 0, right: 0 };
    }
  }
  return Q(() => {
    if (x)
      return k(), window.addEventListener("resize", k), () => window.removeEventListener("resize", k);
  }, [x, s]), Q(() => {
    if (t !== "onClick") return;
    const d = (f) => {
      b.current && !b.current.contains(f.target) && C.current && !C.current.contains(f.target) && g(!1);
    };
    return document.addEventListener("mousedown", d), () => document.removeEventListener("mousedown", d);
  }, [t]), /* @__PURE__ */ V(v, { ...n, className: p, children: [
    /* @__PURE__ */ i(
      v,
      {
        ref: C,
        onMouseEnter: t === "onHover" ? () => {
          t === "onHover" && g(!0);
        } : void 0,
        onMouseLeave: t === "onHover" ? () => {
          t === "onHover" && g(!1);
        } : void 0,
        onClick: t === "onClick" ? () => {
          t === "onClick" && g((d) => !d);
        } : void 0,
        children: r
      }
    ),
    x && /* @__PURE__ */ V(v, { className: w, ref: b, children: [
      e && /* @__PURE__ */ i(
        I,
        {
          as: "p",
          textStyle: "body-md",
          bold: !0,
          color: { base: "gray.0", _dark: "gray.90" },
          children: e
        }
      ),
      o && /* @__PURE__ */ i(
        I,
        {
          as: "span",
          textStyle: "body-sm",
          color: { base: "gray.0", _dark: "gray.90" },
          children: o
        }
      )
    ] })
  ] });
}, V5 = ({
  items: t,
  ...a
}) => {
  const [o, e] = S(a);
  return /* @__PURE__ */ i(I, { as: "ul", className: _(K2({}), o), ...e, children: t == null ? void 0 : t.map((r, s) => /* @__PURE__ */ V(I, { as: "li", children: [
    r.href ? /* @__PURE__ */ i(o2, { family: "mono", size: "14", href: r.href, children: r.label }) : /* @__PURE__ */ i(I, { weight: "bold", family: "mono", size: "14", children: r.label }),
    s < (t == null ? void 0 : t.length) - 1 && /* @__PURE__ */ i(I, { as: "span", family: "mono", size: "14", children: "/" })
  ] }, r.id)) });
}, M5 = ({
  variant: t,
  hue: a,
  iconPosition: o = "left",
  children: e,
  iconName: r,
  ...s
}) => {
  const [n, l] = S(s);
  return /* @__PURE__ */ V(
    v,
    {
      as: "span",
      className: _(r6({ variant: t, hue: a, iconPosition: o, hasIcon: !!r }), n),
      ...l,
      children: [
        r && /* @__PURE__ */ i(T, { name: r, width: 20, height: 20 }),
        e
      ]
    }
  );
}, B5 = ({
  menuSection: t,
  iconPlacement: a,
  variant: o,
  multiSelectType: e,
  onChange: r
}) => {
  var f;
  const {
    wrapper: s,
    wrapperInner: n,
    sectionTitle: l,
    menuItem: h,
    menuLabel: p,
    menuDescription: w,
    parentLabel: x,
    multiLevelIcon: g,
    dividerSection: b,
    spacerSection: C,
    iconSection: P
  } = L6({
    iconPlacement: a,
    multiSelectType: e
  }), [M, A] = X([]), [k, E] = X([
    { menu: t, parentLabel: null }
  ]), R = k[k.length - 1], W = (c) => {
    o === "single-select" ? M.includes(c) ? (A([]), r == null || r(null)) : (A([c]), r == null || r(c)) : (A(
      (H) => H.includes(c) ? H.filter((m) => m !== c) : [...H, c]
    ), r == null || r(
      M.includes(c) ? M.filter((H) => H !== c) : [...M, c]
    ));
  }, N = (c, H) => {
    c && E([...k, { menu: c, parentLabel: H }]);
  }, d = () => {
    E(k.slice(0, -1));
  };
  return /* @__PURE__ */ V(v, { className: s, children: [
    k.length > 1 && /* @__PURE__ */ V(
      I,
      {
        onClick: d,
        className: x,
        textStyle: { base: "body-lg", md: "body-md" },
        color: { base: "gray.90", _dark: "gray.0" },
        children: [
          /* @__PURE__ */ i(T, { name: "caret-left" }),
          (R == null ? void 0 : R.parentLabel) || "Back"
        ]
      }
    ),
    /* @__PURE__ */ i(
      v,
      {
        "data-anim": k.length > 1 ? "slide-left" : void 0,
        className: n,
        children: (f = R == null ? void 0 : R.menu) == null ? void 0 : f.map((c) => {
          var H;
          return /* @__PURE__ */ V(v, { children: [
            c.title && /* @__PURE__ */ i(v, { className: l, children: /* @__PURE__ */ i(I, { textStyle: "body-xs", children: c == null ? void 0 : c.title }) }),
            /* @__PURE__ */ i(v, { children: (H = c == null ? void 0 : c.items) == null ? void 0 : H.map((m) => {
              var L1;
              const B = !!((L1 = m.children) != null && L1.length), L = M.includes(m.id), D = !!(m != null && m.disabled), K = () => {
                D || (m != null && m.children ? N(m.children, m.label) : W(m.id));
              };
              return /* @__PURE__ */ V(
                v,
                {
                  color: { base: "gray.100", _dark: "gray.90" },
                  className: h,
                  tabIndex: D ? -1 : 0,
                  disabled: m == null ? void 0 : m.disabled,
                  "aria-disabled": m == null ? void 0 : m.disabled,
                  "data-selected": L,
                  onClick: K,
                  onKeyDown: ($) => {
                    ($.key === " " || $.key === "Spacebar" || $.key === "Enter") && ($.preventDefault(), K());
                  },
                  role: "button",
                  "aria-pressed": L,
                  children: [
                    (a || (m == null ? void 0 : m.iconName)) && /* @__PURE__ */ i(
                      v,
                      {
                        className: P,
                        color: { base: "gray.90", _dark: "gray.0" },
                        children: (m == null ? void 0 : m.iconName) && /* @__PURE__ */ i(T, { name: `${m == null ? void 0 : m.iconName}` })
                      }
                    ),
                    o === "multi-select" && e === "checkbox" && !(c != null && c.link) && /* @__PURE__ */ i(
                      e2,
                      {
                        name: m.id,
                        checked: L,
                        onChange: () => W(m.id)
                      }
                    ),
                    o === "multi-select" && e === "toggle" && !(c != null && c.link) && /* @__PURE__ */ i(
                      r2,
                      {
                        name: "menu-toggle",
                        checked: L,
                        onChange: () => W(m.id)
                      }
                    ),
                    !(c != null && c.link) && /* @__PURE__ */ V(v, { children: [
                      /* @__PURE__ */ i(
                        I,
                        {
                          textStyle: { base: "body-lg", md: "body-md" },
                          className: p,
                          color: { base: "gray.90", _dark: "gray.5" },
                          children: m == null ? void 0 : m.label
                        }
                      ),
                      (m == null ? void 0 : m.description) && /* @__PURE__ */ i(I, { textStyle: "body-xs", className: w, children: m == null ? void 0 : m.description })
                    ] }),
                    (c == null ? void 0 : c.link) && /* @__PURE__ */ V(
                      o2,
                      {
                        href: `${m == null ? void 0 : m.href}`,
                        color: { base: "gray.90", _dark: "gray.0" },
                        children: [
                          m == null ? void 0 : m.label,
                          " ",
                          /* @__PURE__ */ i(T, { name: "arrow-square-out" })
                        ]
                      }
                    ),
                    B && /* @__PURE__ */ i(
                      v,
                      {
                        className: g,
                        color: { base: "gray.90", _dark: "gray.0" },
                        children: /* @__PURE__ */ i(T, { name: "caret-right" })
                      }
                    )
                  ]
                },
                m == null ? void 0 : m.id
              );
            }) }),
            (c == null ? void 0 : c.divider) && /* @__PURE__ */ i(v, { className: b, children: /* @__PURE__ */ i(r5, { color: { base: "gray.10", _dark: "gray.60" } }) }),
            (c == null ? void 0 : c.spacer) && /* @__PURE__ */ i(v, { className: C })
          ] }, c.id);
        })
      }
    )
  ] });
};
export {
  p5 as Badge,
  v as Box,
  V5 as Breadcrumbs,
  h5 as Button,
  y5 as Card,
  e2 as Checkbox,
  _5 as CheckboxInput,
  r5 as Divider,
  b5 as Heading,
  T as Icon,
  v5 as IconButton,
  w5 as IconNames,
  o2 as Link,
  B5 as Menu,
  g5 as Pre,
  s5 as Radio,
  f5 as RadioInput,
  t5 as Spinner,
  M5 as Tag,
  I as Text,
  u5 as TextInput,
  n5 as Textarea,
  q5 as ThemeProvider,
  k5 as ThemeSwitcher,
  r2 as Toggle,
  x5 as ToggleInput,
  z5 as Tooltip
};
