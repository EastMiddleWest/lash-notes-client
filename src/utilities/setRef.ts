export const setRef = (ref: React.ForwardedRef<HTMLDivElement>) => {
  if (typeof ref === 'function') return undefined;
  else if (ref) return ref.current;
}