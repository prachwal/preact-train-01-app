import { useMemo } from 'preact/compat';
import { Button } from '../ui/Button';
import { Grid } from '../ui/Grid';
import { Typography } from '../ui/Typography';
import type { GridComponentProps } from '../types';

const buttonVariants = ['primary', 'secondary', 'success', 'danger'] as const;
const semanticStates = ['success', 'error', 'warning', 'info'] as const;
const shadowVariants = ['light', 'medium', 'heavy'] as const;
const sizes = ['sm', 'md', 'lg', 'xl'] as const;

export const CardDemo = () => {
  const buttonElements = useMemo(
    () => [
      ...buttonVariants.map(variant => (
        <Button key={variant} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      )),
      <Button key="disabled" disabled>
        Disabled
      </Button>,
    ],
    []
  );

  const semanticElements = useMemo(
    () =>
      semanticStates.map(state => (
        <Button key={state} semanticState={state}>
          {state.charAt(0).toUpperCase() + state.slice(1)} State
        </Button>
      )),
    []
  );

  const shadowElements = useMemo(
    () =>
      shadowVariants.map(shadow => (
        <Button key={shadow} shadow={shadow}>
          {shadow.charAt(0).toUpperCase() + shadow.slice(1)} Shadow
        </Button>
      )),
    []
  );

  const sizeElements = useMemo(
    () =>
      sizes.map(size => (
        <Button key={size} size={size}>
          {size.toUpperCase()}
        </Button>
      )),
    []
  );

  const combinedElements = useMemo(
    () => [
      <Button key="combined1" variant="primary" shadow="medium" size="lg">
        Primary Large with Shadow
      </Button>,
      <Button
        key="combined2"
        variant="success"
        semanticState="success"
        shadow="light"
      >
        Success with State
      </Button>,
      <Button key="combined3" variant="danger" size="sm" shadow="heavy">
        Danger Small Heavy
      </Button>,
    ],
    []
  );

  const renderButtonSection = (
    title: string,
    buttons: any[],
    gridProps: any = { gap: 'md', wrap: true }
  ) => (
    <>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      <Grid {...gridProps}>{buttons}</Grid>
    </>
  );

  return (
    <>
      {renderButtonSection('Button Variants', buttonElements)}

      {renderButtonSection('Semantic States', semanticElements)}

      {renderButtonSection('Shadow Variants', shadowElements)}

      {renderButtonSection('Size Variants', sizeElements, {
        gap: 'md',
        align: 'center',
      })}

      {renderButtonSection('Combined Examples', combinedElements)}
    </>
  );
};
