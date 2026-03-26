import assert from 'node:assert/strict';
import test from 'node:test';

import { validateSource } from '../validate-standards-core.mjs';

const collectByRule = (diagnostics, rule) =>
  diagnostics.filter((diagnostic) => diagnostic.rule === rule);

test('recipe export name matches file when expected export is present', () => {
  const diagnostics = validateSource({
    filePath: 'src/recipes/button.ts',
    content: `
      export const buttonRecipe = defineSlotRecipe({
        jsx: ['Button'],
      });

      export const iconButtonRecipe = defineSlotRecipe({
        jsx: ['IconButton'],
      });
    `,
  });

  assert.equal(
    collectByRule(diagnostics, 'recipe-export-name-matches-file').length,
    0,
  );
  assert.equal(
    collectByRule(diagnostics, 'recipe-jsx-name-matches-component').length,
    0,
  );
});

test('recipe export naming fails when filename contract is broken', () => {
  const diagnostics = validateSource({
    filePath: 'src/recipes/button.ts',
    content: `
      export const iconButtonRecipe = defineSlotRecipe({
        jsx: ['IconButton'],
      });
    `,
  });

  assert.equal(
    collectByRule(diagnostics, 'recipe-export-name-matches-file').length,
    1,
  );
});

test('recipe jsx must include the expected component name', () => {
  const diagnostics = validateSource({
    filePath: 'src/recipes/textInput.ts',
    content: `
      export const textInputRecipe = defineSlotRecipe({
        jsx: ['InputField'],
      });
    `,
  });

  assert.equal(
    collectByRule(diagnostics, 'recipe-jsx-name-matches-component').length,
    1,
  );
});

test('recipe exceptions can be filtered outside the validator', () => {
  const diagnostics = validateSource({
    filePath: 'src/recipes/recipes-slot.ts',
    content: `export { buttonRecipe } from './button';`,
  });

  assert.equal(diagnostics.length, 0);
});

test('React namespace and FC checks emit warnings', () => {
  const diagnostics = validateSource({
    filePath: 'src/components/Button/Button.tsx',
    content: `
      import React from 'react';

      type Props = {
        children?: React.ReactNode;
      };

      export const Button: React.FC<Props> = ({ children }) => <button>{children}</button>;
    `,
  });

  assert.equal(collectByRule(diagnostics, 'no-react-fc-components').length, 1);
  assert.equal(
    collectByRule(diagnostics, 'no-react-namespace-type-imports').length >= 2,
    true,
  );
});

test('inline style, className css call, px, fontWeight, and css vars emit warnings', () => {
  const diagnostics = validateSource({
    filePath: 'src/components/Button/Button.tsx',
    content: `
      export function Button() {
        return (
          <button
            className={css({ fontSize: '12px' })}
            style={{ width: '120px' }}
            fontWeight={700}
            borderColor="var(--colors-border)"
          />
        );
      }
    `,
  });

  assert.equal(collectByRule(diagnostics, 'no-inline-style-prop').length, 1);
  assert.equal(collectByRule(diagnostics, 'no-classname-css-call').length, 1);
  assert.equal(collectByRule(diagnostics, 'no-pixel-units').length >= 1, true);
  assert.equal(
    collectByRule(diagnostics, 'no-raw-font-weight-values').length,
    1,
  );
  assert.equal(
    collectByRule(diagnostics, 'discourage-css-variable-styling').length,
    1,
  );
});

test('bracketed Panda arbitrary values skip pixel-unit warnings', () => {
  const diagnostics = validateSource({
    filePath: 'src/components/Button/Button.tsx',
    content: `
      export function Button() {
        return <button fontSize="[12px]" padding="[8px]" />;
      }
    `,
  });

  assert.equal(collectByRule(diagnostics, 'no-pixel-units').length, 0);
});

test('recipe token guard warns on hardcoded design values', () => {
  const diagnostics = validateSource({
    filePath: 'src/recipes/card.ts',
    content: `
      export const cardRecipe = defineRecipe({
        jsx: ['Card'],
        base: {
          background: '#ffffff',
          padding: '12px',
          zIndex: 4,
        },
      });
    `,
  });

  assert.equal(
    collectByRule(diagnostics, 'no-hardcoded-design-values-in-recipes')
      .length >= 3,
    true,
  );
});

test('recipe token guard allows bracketed Panda arbitrary values', () => {
  const diagnostics = validateSource({
    filePath: 'src/recipes/card.ts',
    content: `
      export const cardRecipe = defineRecipe({
        jsx: ['Card'],
        base: {
          background: '[#ffffff]',
          borderColor: '[rgb(255, 255, 255)]',
          padding: '[12px]',
        },
      });
    `,
  });

  assert.equal(
    collectByRule(diagnostics, 'no-hardcoded-design-values-in-recipes').length,
    0,
  );
});
