import { defineLayerStyles } from '@pandacss/dev';

export const layerStyles = defineLayerStyles({
  surface: {
    raised: {
      value: {
        background: 'surface.raised',
        boxShadow: 'shadow.raised',
      },
    },
    overlay: {
      value: {
        background: 'surface.overlay',
        boxShadow: 'shadow.overlay',
      },
    },
  },
});
