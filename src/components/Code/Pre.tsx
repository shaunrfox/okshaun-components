// import { Code } from '.'
// import * as cheerio from 'cheerio';
import { type PropsWithChildren } from 'react';
import { Box, type BoxProps } from '@styled-system/jsx';
// import { P, match } from 'ts-pattern'
// import { reactToSolid } from '~/lib/react-to-solid'
// import { reactToVue } from '~/lib/react-to-vue'
import { Code } from './Code';
// import { CodePreviewTabs } from './code-preview-tabs'
// import { LivePreview } from './live-preview'

// const html = await Astro.slots.render('default')
// const code = cheerio.load(html).root().text().trim();

interface Props extends BoxProps {
  children: React.ReactNode;
  lang?: string;
}

export const Pre = (props: PropsWithChildren<Props>) => {
  const { children, lang, ...rest } = props;
  return (
    <Box
      borderRadius="8"
      overflow="hidden"
      borderWidth="1"
      borderColor="gray.60"
      bg="gray.80"
      color="gray.5"
      px="16"
      py="8"
      my="8"
      whiteSpace="pre"
      {...rest}
    >
      <Code lang={lang} slot="react" bg="transparent" {...rest}>
        {children}
      </Code>
    </Box>
  );
};
