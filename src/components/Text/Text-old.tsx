import { styled } from '@styled-system/jsx'
import { type TextVariantProps, text } from '@styled-system/recipes'
import type { ComponentProps, StyledComponent } from '@styled-system/types'

type ParagraphProps = TextVariantProps & { as?: React.ElementType }

export type TextProps = ComponentProps<typeof Text>
export const Text = styled('p', text) as StyledComponent<'p', ParagraphProps>

// import * as React from "react";
// import { sva, css, cx } from "@styled-system/css";
// import { SystemStyleObject } from "@styled-system/types";

// export interface TextProps {
//   level?: 12 | 14 | 16 | 20 | 24 | 32 | 40 | 48 | 64 | 72 | 80 | 96;
//   font?: "sans" | "serif" | "mono";
//   as?: "p" | "span" | "div";
//   children: React.ReactNode;
// }

// (level: SystemStyleObject, font: SystemStyleObject)

// const textStyles = (level, font) => cva({
//   fontSize: level,
//   lineHeight: "normal",
//   fontFamily: font,
//   fontWeight: "normal",
//   color: { base: "gray.80", _osDark:  "gray.20" },
// })

// const textStyle2 = (level: SystemStyleObject, font: SystemStyleObject) => sva({
//   slots: ['level', 'font'],
//   base: {
//     lineHeight: "normal",
//     fontWeight: "normal",
//     color: { base: "gray.80", _osDark:  "gray.20" },
//   },
//   variants: {
//     fontSize: level,
//     fontFamily: font,
//   }
// })
  

// const Text = React.forwardRef<HTMLElement, TextProps>(
//   ({ children, level = 16, font = "sans", as: Component = "p", ...props }, ref) => {
//     return (
//       <Component
//         ref={ref}
//         className={textStyle2(level, font)}
//         {...props}
//       >
//         {children}
//       </Component>
//     );
//   }
// );

// Text.displayName = "Text";

// export { Text };
