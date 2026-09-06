export const mergeAriaDescribedBy = (...values: Array<string | undefined>) => {
  const merged = values
    .flatMap((value) => value?.split(/\s+/) ?? [])
    .filter(Boolean);

  return merged.length > 0 ? Array.from(new Set(merged)).join(' ') : undefined;
};
