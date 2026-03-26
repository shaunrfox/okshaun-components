import fs from 'node:fs';
import path from 'node:path';

import { normalizePath } from './validation-targets.mjs';

const RECIPE_FILE_PATTERN = /^src\/recipes\/[^/]+\.ts$/;
const RECIPE_EXCEPTIONS = new Set([
  'src/recipes/recipes-regular.ts',
  'src/recipes/recipes-slot.ts',
]);

const ABSOLUTE_UNIT_PATTERN =
  /\b-?(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem|em|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)\b/;
const PIXEL_UNIT_PATTERN = /\b-?(?:\d+(?:\.\d+)?|\.\d+)px\b/;
const COLOR_FUNCTION_PATTERN = /\b(?:rgb|rgba|hsl|hsla)\s*\(/;
const FONT_WEIGHT_PATTERN =
  /fontWeight\s*[:=]\s*(?:\{\s*)?['"]?\d{3}['"]?(?:\s*\})?/g;
const JSX_ATTRIBUTE_PX_PATTERN =
  /(["'`])[^"'`\n]*\b-?(?:\d+(?:\.\d+)?|\.\d+)px\b[^"'`\n]*\1/g;
const REACT_FC_PATTERN = /\bReact\.FC\b|\bFC\s*<|:\s*FC\b/g;
const REACT_DEFAULT_IMPORT_PATTERN =
  /^\s*import\s+React(?:\s*,[\s\S]*?)?\s+from\s+['"]react['"]/gm;
const REACT_NAMESPACE_IMPORT_PATTERN =
  /^\s*import\s+(?:type\s+)?\*\s+as\s+React\s+from\s+['"]react['"]/gm;
const REACT_NAMESPACE_TYPE_PATTERN =
  /(?:[:<(,]\s*|type\s+[A-Za-z0-9_$]+\s*=\s*|as\s+)React\.[A-Z][A-Za-z0-9_]*/g;
const STYLE_PROP_PATTERN = /style=\{\{/g;
const CLASSNAME_CSS_PATTERN = /className=\{css\(/g;
const CSS_VARIABLE_PATTERN = /var\(--[A-Za-z0-9-_]+\)/g;
const HEX_COLOR_PATTERN = /#[0-9a-fA-F]{3,8}\b/;
const NUMERIC_LITERAL_PATTERN = /:\s*(-?(?:\d+(?:\.\d+)?|\.\d+))(?=\s*[,}])/g;
const RECIPE_EXPORT_PATTERN =
  /export\s+const\s+([A-Za-z0-9_$]+Recipe)\s*=\s*define(?:Slot)?Recipe\s*\(/g;

const toPascalCase = (value) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('');

const getLocation = (content, index) => {
  const upToIndex = content.slice(0, index);
  const lines = upToIndex.split('\n');
  const line = lines.length;
  const column = lines.at(-1).length + 1;
  return { line, column };
};

const createDiagnostic = ({
  content,
  filePath,
  index,
  message,
  rule,
  severity,
}) => ({
  ...getLocation(content, index),
  filePath,
  index,
  message,
  rule,
  severity,
});

const VALIDATE_IGNORE_PATTERN = /validate-ignore:\s*([a-z0-9-]+(?:\s*,\s*[a-z0-9-]+)*)/;

const isIgnored = (content, index, rule) => {
  const lines = content.slice(0, index).split('\n');
  const lineNumber = lines.length;
  const allLines = content.split('\n');
  const currentLine = allLines[lineNumber - 1] || '';
  const previousLine = lineNumber >= 2 ? allLines[lineNumber - 2] || '' : '';

  for (const line of [currentLine, previousLine]) {
    const match = VALIDATE_IGNORE_PATTERN.exec(line);
    if (match) {
      const ignoredRules = match[1].split(',').map((r) => r.trim());
      if (ignoredRules.includes(rule)) return true;
    }
  }

  return false;
};

const toGlobalPattern = (pattern) =>
  new RegExp(
    pattern.source,
    pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`,
  );

const ARBITRARY_VALUE_PATTERN = /\[[^\]\n]+\]/g;

const isWrappedInArbitraryValue = (value, start, length) => {
  for (const match of value.matchAll(ARBITRARY_VALUE_PATTERN)) {
    const arbitraryStart = match.index;
    const arbitraryEnd = arbitraryStart + match[0].length;

    if (start >= arbitraryStart && start + length <= arbitraryEnd) {
      return true;
    }
  }

  return false;
};

const hasUnwrappedMatch = (value, pattern) => {
  for (const match of value.matchAll(toGlobalPattern(pattern))) {
    if (!isWrappedInArbitraryValue(value, match.index, match[0].length)) {
      return true;
    }
  }

  return false;
};

const stripBracketedArbitraryValues = (value) =>
  value.replace(ARBITRARY_VALUE_PATTERN, '');

const isRecipeFile = (filePath) =>
  RECIPE_FILE_PATTERN.test(filePath) && !RECIPE_EXCEPTIONS.has(filePath);

const collectMatches = ({
  content,
  filePath,
  pattern,
  message,
  rule,
  severity,
}) => {
  const diagnostics = [];

  for (const match of content.matchAll(pattern)) {
    diagnostics.push(
      createDiagnostic({
        content,
        filePath,
        index: match.index,
        message,
        rule,
        severity,
      }),
    );
  }

  return diagnostics;
};

const findRecipeDefinitions = (content) => {
  const matches = [...content.matchAll(RECIPE_EXPORT_PATTERN)];

  return matches.map((match, index) => {
    const exportName = match[1];
    const start = match.index;
    const end =
      index < matches.length - 1 ? matches[index + 1].index : content.length;
    return {
      block: content.slice(start, end),
      exportName,
      start,
    };
  });
};

const validateRecipeNaming = ({ content, filePath }) => {
  const diagnostics = [];
  const recipeDefinitions = findRecipeDefinitions(content);

  if (recipeDefinitions.length === 0) {
    return diagnostics;
  }

  const expectedExportName = `${path.basename(filePath, '.ts')}Recipe`;
  const hasExpectedExport = recipeDefinitions.some(
    ({ exportName }) => exportName === expectedExportName,
  );

  if (!hasExpectedExport) {
    const firstDefinition = recipeDefinitions[0];
    diagnostics.push(
      createDiagnostic({
        content,
        filePath,
        index: firstDefinition.start,
        message: `Recipe export '${firstDefinition.exportName}' should be named '${expectedExportName}' to match this file.`,
        rule: 'recipe-export-name-matches-file',
        severity: 'error',
      }),
    );
  }

  for (const definition of recipeDefinitions) {
    const expectedJsxName = toPascalCase(
      definition.exportName.replace(/Recipe$/, ''),
    );
    const jsxMatch = definition.block.match(/\bjsx\s*:\s*\[([\s\S]*?)\]/);

    if (!jsxMatch) {
      diagnostics.push(
        createDiagnostic({
          content,
          filePath,
          index: definition.start,
          message: `Recipe export '${definition.exportName}' should include '${expectedJsxName}' in its jsx array.`,
          rule: 'recipe-jsx-name-matches-component',
          severity: 'error',
        }),
      );
      continue;
    }

    const jsxValues = [...jsxMatch[1].matchAll(/['"]([^'"]+)['"]/g)].map(
      (match) => match[1],
    );

    if (!jsxValues.includes(expectedJsxName)) {
      diagnostics.push(
        createDiagnostic({
          content,
          filePath,
          index: definition.start,
          message: `Recipe export '${definition.exportName}' should include '${expectedJsxName}' in its jsx array.`,
          rule: 'recipe-jsx-name-matches-component',
          severity: 'error',
        }),
      );
    }
  }

  return diagnostics;
};

const validateRecipeTokenUsage = ({ content, filePath }) => {
  const diagnostics = [];
  const lines = content.split('\n');
  let offset = 0;

  for (const line of lines) {
    if (/\b(?:className|slots)\s*:/.test(line)) {
      offset += line.length + 1;
      continue;
    }

    if (
      hasUnwrappedMatch(line, HEX_COLOR_PATTERN) ||
      hasUnwrappedMatch(line, COLOR_FUNCTION_PATTERN)
    ) {
      diagnostics.push(
        createDiagnostic({
          content,
          filePath,
          index: offset,
          message:
            'Found hardcoded color value in recipe config. Prefer a token reference.',
          rule: 'no-hardcoded-design-values-in-recipes',
          severity: 'warn',
        }),
      );
      offset += line.length + 1;
      continue;
    }

    if (hasUnwrappedMatch(line, ABSOLUTE_UNIT_PATTERN)) {
      diagnostics.push(
        createDiagnostic({
          content,
          filePath,
          index: offset,
          message:
            'Found hardcoded absolute unit in recipe config. Prefer a token reference.',
          rule: 'no-hardcoded-design-values-in-recipes',
          severity: 'warn',
        }),
      );
      offset += line.length + 1;
      continue;
    }

    for (const match of line.matchAll(NUMERIC_LITERAL_PATTERN)) {
      const value = Number(match[1]);

      if (value === 0 || value === 1) {
        continue;
      }

      diagnostics.push(
        createDiagnostic({
          content,
          filePath,
          index: offset + match.index,
          message:
            'Found hardcoded numeric value in recipe config. Prefer a token reference.',
          rule: 'no-hardcoded-design-values-in-recipes',
          severity: 'warn',
        }),
      );
    }

    offset += line.length + 1;
  }

  return diagnostics;
};

export const validateSource = ({ content, filePath }) => {
  const normalizedPath = normalizePath(filePath);
  const diagnostics = [];

  diagnostics.push(
    ...collectMatches({
      content,
      filePath: normalizedPath,
      pattern: REACT_FC_PATTERN,
      message:
        'Avoid React.FC component annotations. Type component props on the function parameter instead.',
      rule: 'no-react-fc-components',
      severity: 'warn',
    }),
  );
  diagnostics.push(
    ...collectMatches({
      content,
      filePath: normalizedPath,
      pattern: REACT_DEFAULT_IMPORT_PATTERN,
      message:
        "Avoid default React imports. Use named imports from 'react' instead.",
      rule: 'no-react-namespace-type-imports',
      severity: 'warn',
    }),
  );
  diagnostics.push(
    ...collectMatches({
      content,
      filePath: normalizedPath,
      pattern: REACT_NAMESPACE_IMPORT_PATTERN,
      message:
        "Avoid namespace React imports. Use named imports from 'react' instead.",
      rule: 'no-react-namespace-type-imports',
      severity: 'warn',
    }),
  );
  diagnostics.push(
    ...collectMatches({
      content,
      filePath: normalizedPath,
      pattern: REACT_NAMESPACE_TYPE_PATTERN,
      message:
        "Avoid React namespace types. Import the type directly from 'react'.",
      rule: 'no-react-namespace-type-imports',
      severity: 'warn',
    }),
  );
  diagnostics.push(
    ...collectMatches({
      content,
      filePath: normalizedPath,
      pattern: STYLE_PROP_PATTERN,
      message:
        'Do not use style={{}} in JSX. Use tokens, recipes, or Panda style props instead.',
      rule: 'no-inline-style-prop',
      severity: 'warn',
    }),
  );
  diagnostics.push(
    ...collectMatches({
      content,
      filePath: normalizedPath,
      pattern: CLASSNAME_CSS_PATTERN,
      message:
        'Do not use className={css(...)} directly in JSX. Prefer Panda style props, recipes, or splitProps-generated className.',
      rule: 'no-classname-css-call',
      severity: 'warn',
    }),
  );
  for (const match of content.matchAll(JSX_ATTRIBUTE_PX_PATTERN)) {
    if (!PIXEL_UNIT_PATTERN.test(stripBracketedArbitraryValues(match[0]))) {
      continue;
    }
    diagnostics.push(
      createDiagnostic({
        content,
        filePath: normalizedPath,
        index: match.index,
        message:
          "Avoid pixel units ('px'). Use design tokens or tokenized values instead.",
        rule: 'no-pixel-units',
        severity: 'warn',
      }),
    );
  }
  diagnostics.push(
    ...collectMatches({
      content,
      filePath: normalizedPath,
      pattern: FONT_WEIGHT_PATTERN,
      message:
        "Avoid raw fontWeight values. Use font weight tokens such as 'light', 'normal', 'medium', 'bold', or 'black'.",
      rule: 'no-raw-font-weight-values',
      severity: 'warn',
    }),
  );
  diagnostics.push(
    ...collectMatches({
      content,
      filePath: normalizedPath,
      pattern: CSS_VARIABLE_PATTERN,
      message:
        'Prefer design tokens or semantic tokens over raw CSS variable references.',
      rule: 'discourage-css-variable-styling',
      severity: 'warn',
    }),
  );

  if (isRecipeFile(normalizedPath)) {
    diagnostics.push(
      ...validateRecipeNaming({ content, filePath: normalizedPath }),
    );
    diagnostics.push(
      ...validateRecipeTokenUsage({ content, filePath: normalizedPath }),
    );
  }

  const filtered = diagnostics.filter(
    (d) => !isIgnored(content, d.index, d.rule),
  );

  return filtered.sort((left, right) => left.index - right.index);
};

export const validateFiles = (filePaths) => {
  const diagnostics = [];

  for (const filePath of filePaths) {
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    diagnostics.push(...validateSource({ content, filePath }));
  }

  const errors = diagnostics.filter(
    (diagnostic) => diagnostic.severity === 'error',
  );
  const warnings = diagnostics.filter(
    (diagnostic) => diagnostic.severity === 'warn',
  );

  return {
    diagnostics,
    errors,
    warnings,
  };
};

export const formatDiagnostics = ({ diagnostics, filesLabel = 'files' }) => {
  if (diagnostics.length === 0) {
    return `standards: no issues found in ${filesLabel}`;
  }

  const lines = diagnostics.map(
    (diagnostic) =>
      `${diagnostic.severity.toUpperCase()} ${diagnostic.rule} ${diagnostic.filePath}:${diagnostic.line}:${diagnostic.column} ${diagnostic.message}`,
  );

  return [
    `standards: found ${diagnostics.length} issue(s) in ${filesLabel}`,
    ...lines,
  ].join('\n');
};
