import { menu } from '@styled-system/recipes';
src/components/Button/Button.tsx:12:67 - error TS2315: Type 'BoxProps' is not generic.

12 export type ButtonProps<E extends React.ElementType = 'button'> = BoxProps<E> &
	
// dropdown
// menu
// multitoggle
// FormField
// Rule
// Select
	
	
23       css={(theme) => css`
               ~~~~~
src/components/Text/Text.tsx:42:49 - error TS2353: Object literal may only specify known properties, and 'size' does not exist in type 'TextVariantProps'.

42         text({ family, bold, underline, italic, size, weight }),
                                                   ~~~~
src/components/Textarea/Textarea.tsx:32:32 - error TS2353: Object literal may only specify known properties, and 'size' does not exist in type 'TextareaVariantProps'.

32       className={cx(textarea({ size, autoSize }), className)}
                                  ~~~~
src/components/ThemeSwitcher/ThemeSwitcherButton.tsx:18:13 - error TS2322: Type '"moon-filled" | "sun-filled"' is not assignable to type '"step" | "square" | "color" | "cursor" | "filter" | "order" | "resize" | "scale" | "x" | "start" | "code" | "kbd" | "link" | "map" | "menu" | "search" | "video" | "circle" | "image" | ... 274 more ... | "wrench"'.
  Type '"moon-filled"' is not assignable to type '"step" | "square" | "color" | "cursor" | "filter" | "order" | "resize" | "scale" | "x" | "start" | "code" | "kbd" | "link" | "map" | "menu" | "search" | "video" | "circle" | "image" | ... 274 more ... | "wrench"'.

18       <Icon name={theme === 'light' ? 'moon-filled' : 'sun-filled'} />
               ~~~~

  node_modules/@types/react/index.d.ts:3461:9
    3461         name?: string | undefined;
                 ~~~~
    The expected type comes from property 'name' which is declared here on type 'IntrinsicAttributes & Omit<BoxProps, "size"> & SVGAttributes<SVGElement> & { name: IconNamesList; size?: "0" | ... 48 more ... | undefined; fill?: ColorToken | undefined; }'
src/components/Toggle/Toggle.tsx:46:9 - error TS2322: Type '{ _dark: string; }' is not assignable to type '"rose.50" | "rose.100" | "rose.200" | "rose.300" | "rose.400" | "rose.500" | "rose.600" | "rose.700" | "rose.800" | "rose.900" | "rose.950" | "pink.50" | "pink.100" | "pink.200" | ... 447 more ... | undefined'.

46         fill={{ _dark: 'gray.90' }}
           ~~~~

  node_modules/@types/react/index.d.ts:3539:9
    3539         fill?: string | undefined;
                 ~~~~
    The expected type comes from property 'fill' which is declared here on type 'IntrinsicAttributes & Omit<BoxProps, "size"> & SVGAttributes<SVGElement> & { name: IconNamesList; size?: "0" | ... 48 more ... | undefined; fill?: ColorToken | undefined; }'
src/components/ToggleInput/ToggleInput.tsx:1:10 - error TS1484: 'FC' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.

1 import { FC, ReactNode } from 'react';
           ~~
src/components/ToggleInput/ToggleInput.tsx:1:14 - error TS1484: 'ReactNode' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.

1 import { FC, ReactNode } from 'react';
               ~~~~~~~~~
src/components/Tooltip/Tooltip.tsx:3:10 - error TS1484: 'ReactNode' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.

3 import { ReactNode, useEffect, useRef, useState } from 'react';
           ~~~~~~~~~

dist/ok-shaun-components.es.js  229.27 kB │ gzip: 60.40 kB
[vite:dts] Declaration files built in 4644ms.

✓ built in 5.46s