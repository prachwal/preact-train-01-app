import type {
  CardVariant,
  ComponentSize,
  SemanticState,
  ShadowVariant,
  Theme,
} from '../types';
import { buildClassName } from '../types';

export interface CardProps {
  size?: ComponentSize;
  theme?: Theme;
  variant?: CardVariant;
  semanticState?: SemanticState;
  shadow?: ShadowVariant;
  title?: string;
  children?: React.ReactNode;
}

export const Card = ({
  size = 'md',
  theme,
  variant = 'default',
  semanticState,
  shadow = 'medium',
  title,
  children,
  className: additionalClassName,
  ...props
}: CardProps & { className?: string }) => {
  const modifiers: Record<string, boolean | string | undefined> = {
    [size]: true,
  };
  if (variant && variant !== 'default') modifiers[variant] = true;
  if (semanticState) modifiers[`state-${semanticState}`] = true;
  if (shadow && shadow !== 'medium') modifiers[shadow] = true;

  const baseClassName = buildClassName('pta-card', modifiers);
  const finalClassName = additionalClassName
    ? `${baseClassName} ${additionalClassName}`
    : baseClassName;

  return (
    <div className={finalClassName} data-theme={theme} {...props}>
      {title && <h3 className="pta-card__title">{title}</h3>}
      {children && <div className="pta-card__content">{children}</div>}
    </div>
  );
};
