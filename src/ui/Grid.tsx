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
  ...props
}: GridComponentProps & { className?: string }) => {
  const modifiers: Record<string, boolean | string | undefined> = {
    [`mode-${mode}`]: true,
  };

  const style: Record<string, string> = {};

  if (mode === 'flex') {
    modifiers[`direction-${direction}`] = true;
    modifiers[`justify-${justify}`] = true;
    modifiers[`align-${align}`] = true;
    if (gap) modifiers[`gap-${gap}`] = true;
    if (wrap) modifiers.wrap = true;
  } else if (mode === 'grid') {
    if (gap) modifiers[`gap-${gap}`] = true;
    if (gridTemplateColumns)
      style['--grid-template-columns'] = gridTemplateColumns;
    if (gridTemplateRows) style['--grid-template-rows'] = gridTemplateRows;
    if (gridAutoFlow)
      modifiers[`grid-auto-flow-${gridAutoFlow.replace(' ', '-')}`] = true;
  }

  const baseClassName = buildClassName('pta-grid', modifiers);
  const finalClassName = additionalClassName
    ? `${baseClassName} ${additionalClassName}`
    : baseClassName;

  return h(as, { className: finalClassName, style, ...props }, children);
};
