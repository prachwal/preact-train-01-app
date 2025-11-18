import type { GridComponentProps } from '../types';
import { buildClassName } from '../types';
import { h } from 'preact';

export const Grid = ({
  mode = 'flex',
  direction = 'row',
  justify = 'start',
  align = 'stretch',
  gap,
  wrap = false,
  gridTemplateColumns,
  gridTemplateRows,
  gridAutoFlow,
  as = 'div',
  children,
  className: additionalClassName,
  style: userStyle,
  ...props
}: GridComponentProps) => {
  const modifiers: Record<string, boolean | string | undefined> = {
    [`mode-${mode}`]: true,
  };

  const internalStyle: Record<string, string> = {};

  if (mode === 'flex') {
    modifiers[`direction-${direction}`] = true;
    modifiers[`justify-${justify}`] = true;
    modifiers[`align-${align}`] = true;
    if (gap) modifiers[`gap-${gap}`] = true;
    if (wrap) modifiers.wrap = true;
  } else if (mode === 'grid') {
    if (gap) modifiers[`gap-${gap}`] = true;
    if (gridTemplateColumns)
      internalStyle['--grid-template-columns'] = gridTemplateColumns;
    if (gridTemplateRows)
      internalStyle['--grid-template-rows'] = gridTemplateRows;
    if (gridAutoFlow)
      modifiers[`grid-auto-flow-${gridAutoFlow.replace(' ', '-')}`] = true;
  }

  const baseClassName = buildClassName('pta-grid', modifiers);
  const finalClassName = additionalClassName
    ? `${baseClassName} ${additionalClassName}`
    : baseClassName;

  // Merge internal style with user-provided style
  const finalStyle = { ...internalStyle, ...userStyle };

  return h(
    as,
    { className: finalClassName, style: finalStyle, ...props },
    children
  );
};
