/** Reads a string marker from a React element's component type. */
export const getCompoundComponentType = (
  node: unknown,
  markerKey: string,
): string | null => {
  if (!node || typeof node !== 'object' || !('type' in node)) {
    return null;
  }

  const component = (node as { type?: unknown }).type;
  if (
    (typeof component !== 'function' && typeof component !== 'object') ||
    component === null
  ) {
    return null;
  }

  const marker = (component as Record<string, unknown>)[markerKey];
  return typeof marker === 'string' ? marker : null;
};

/** Marks a component so a compound parent can recognize its child elements. */
export const setCompoundComponentType = (
  component: object,
  markerKey: string,
  componentType: string,
) => {
  Object.assign(component, { [markerKey]: componentType });
};
