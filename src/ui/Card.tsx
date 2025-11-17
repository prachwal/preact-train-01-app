import type { CardProps, TypographyVariant } from '../types';
import { buildClassName } from '../types';
import { h } from 'preact';
import { Typography } from './Typography';

export const Card = ({
  size = 'md',
  theme,
  variant = 'default',
  semanticState,
  shadow = 'medium',
  borderRadius,
  borderWidth,
  title,
  headerLevel = 3,
  as = 'div',
  children,
  className: additionalClassName,
  ...props
}: CardProps) => {
  const modifiers: Record<string, boolean | string | undefined> = {
    [size]: true,
  };
  if (variant && variant !== 'default') modifiers[variant] = true;
  if (semanticState) modifiers[`state-${semanticState}`] = true;
  if (shadow && shadow !== 'medium') modifiers[shadow] = true;
  if (borderRadius) modifiers[`border-radius-${borderRadius}`] = true;
  if (borderWidth) modifiers[`border-width-${borderWidth}`] = true;

  const baseClassName = buildClassName('pta-card', modifiers);
  const finalClassName = additionalClassName
    ? `${baseClassName} ${additionalClassName}`
    : baseClassName;

  const HeaderTag = `h${headerLevel}`;

  return h(
    as,
    { className: finalClassName, 'data-theme': theme, ...props },
    title &&
      h(
        Typography,
        {
          variant: HeaderTag as TypographyVariant,
          className: 'pta-card__title',
        },
        title
      ),
    children && h('div', { className: 'pta-card__content' }, children)
  );
};
