import { defineRecipe } from '@pandacss/dev';

const BreadcrumbsBase = {
  display: 'flex',
  alignItems: 'center',
  '& li': {
    display: 'flex',
    alignItems: 'center',
  },
  '& a': {
    color: { base: 'gray.60', _dark: 'gray.60' },
    _focusVisible: {
      color: 'blue.50',
    },
  },
  '& p': {
    color: { base: 'gray.90', _dark: 'gray.0' },
  },
  '& span': {
    mx: '6',
    color: 'gray.20',
  },
};

export const breadcrumbsRecipe = defineRecipe({
  className: 'breadcrumbs',
  jsx: ['Breadcrumbs'],
  base: BreadcrumbsBase,
});
