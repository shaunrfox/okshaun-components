import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = process.env.PLAYROOM_BASE_PATH ?? '/playroom/';

export default {
  title: 'Cetec Design System Playroom',
  components: './.playroom/exports.ts',
  frameComponent: './.playroom/frameComponent.tsx',
  snippets: './.playroom/snippets.ts',
  scope: './.playroom/scope.ts',
  themes: './.playroom/themes.ts',
  storageKey: 'cetec-playroom-v1',
  outputPath: './dist/playroom',
  baseUrl,
  widths: [390, 640, 768, 1024, 1280, 1536],
  defaultVisibleWidths: ['Fit to window'],
  defaultVisibleThemes: ['light'],
  port: 9000,
  openBrowser: false,
  paramType: 'search',
  iframeSandbox: 'allow-scripts allow-same-origin',
  exampleCode: `<Card maxWidth="md" p="16">
  <Heading as="h3" textStyle="heading-sm">Playroom + Panda</Heading>
  <Text mt="8">Use this to prototype combinations before writing stories.</Text>
  <Button mt="12" variant="primary">Ship it</Button>
</Card>`,
  webpackConfig: () => ({
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '~': path.resolve(__dirname, 'src'),
        '@styled-system': path.resolve(__dirname, 'src/styled-system'),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, '.playroom'),
          ],
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              extends: path.join(__dirname, '.playroom/.babelrc'),
            },
          },
        },
      ],
    },
  }),
  typeScriptFiles: [],
  propsParser: () => [],
};
