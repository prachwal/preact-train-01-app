// src/components/Typography.tsx
import { h } from 'preact';
import { buildClassName } from '../types';
import type { TypographyProps } from '../types';

export const Typography = ({
  variant = 'body1',
  color = 'text',
  align = 'left',
  gutterBottom = false,
  noWrap = false,
  children,
  className,
  ...props
}: TypographyProps) => {
  // Mapowanie wariantów na tagi HTML
  const tagMap: Record<string, string> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle1: 'h6',
    subtitle2: 'h6',
    body1: 'p',
    body2: 'p',
    caption: 'span',
    overline: 'span',
  };

  const tag = tagMap[variant] || 'p';

  const baseClass = 'pta-typography';
  const classes = className
    ? `${buildClassName(baseClass, {
        [`variant-${variant}`]: true,
        [`color-${color}`]: color !== 'text',
        [`align-${align}`]: align !== 'left',
        'gutter-bottom': gutterBottom,
        'no-wrap': noWrap,
      })} ${className}`
    : buildClassName(baseClass, {
        [`variant-${variant}`]: true,
        [`color-${color}`]: color !== 'text',
        [`align-${align}`]: align !== 'left',
        'gutter-bottom': gutterBottom,
        'no-wrap': noWrap,
      });

  return h(tag, { className: classes, ...props }, children);
};
