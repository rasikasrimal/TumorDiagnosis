'use client';

import * as React from 'react';
import { clsx } from 'clsx';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, DivProps>(function Card(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx(
        'rounded-2xl border border-border/60 bg-background/80 text-foreground backdrop-blur transition-all duration-200',
        className
      )}
      {...props}
    />
  );
});

export const CardHeader = React.forwardRef<HTMLDivElement, DivProps>(function CardHeader(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={clsx('space-y-2 p-5', className)} {...props} />;
});

export const CardTitle = React.forwardRef<HTMLDivElement, DivProps>(function CardTitle(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={clsx('text-xl font-semibold', className)} {...props} />;
});

export const CardDescription = React.forwardRef<HTMLDivElement, DivProps>(function CardDescription(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={clsx('text-base text-muted-foreground', className)} {...props} />;
});

export const CardContent = React.forwardRef<HTMLDivElement, DivProps>(function CardContent(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={clsx('space-y-4 p-5 pt-0', className)} {...props} />;
});

export const CardFooter = React.forwardRef<HTMLDivElement, DivProps>(function CardFooter(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={clsx('p-5 pt-0', className)} {...props} />;
});
