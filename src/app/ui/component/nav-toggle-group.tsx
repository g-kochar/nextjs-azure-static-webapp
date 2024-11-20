'use client';

import type { ReadonlyRecord } from '@/types';
import type { UITheme } from '@config/theme';
import IconMail from '@mui/icons-material/AlternateEmailOutlined';
import IconChat from '@mui/icons-material/ChatOutlined';
import IconScribe from '@mui/icons-material/MicNoneOutlined';
import IconCharts from '@mui/icons-material/TrendingUpOutlined';
import { useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import defaults from 'lodash/defaults';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type AppID = (typeof ORDERED_APP_ID_LIST)[number];

export type NavToggleGroupClassKey = keyof typeof DEFAULT_CLASSES;

export interface NavToggleGroupProps extends Omit<React.ComponentPropsWithoutRef<'nav'>, 'children'> {
  children?: never;
  classes?: typeof DEFAULT_CLASSES;
}

const DEFAULT_CLASSES: Partial<ReadonlyRecord<'root', string>> = {};

const ICON_AND_LABEL_MAP: ReadonlyRecord<AppID, readonly [icon: React.ElementType, label: string]> = {
  analytics: [IconCharts, 'Analytics'],
  chat: [IconChat, 'Chat'],
  mail: [IconMail, 'Mail'],
  scribe: [IconScribe, 'Scribe']
};

const ORDERED_APP_ID_LIST = ['chat', 'mail', 'scribe', 'analytics'] as const;

const NavToggleGroupRoot = React.forwardRef<HTMLElement, NavToggleGroupProps>(function NavToggleGroupRoot(
  { children, classes: classesFromProps, className, style, ...rootProps },
  ref
) {
  const classes = defaults({}, classesFromProps as unknown, DEFAULT_CLASSES);
  const isScreenMediumAndUp = useMediaQuery((theme: typeof UITheme) => theme.breakpoints.up('md'));
  const pathname = usePathname();

  return (
    <nav
      {...rootProps}
      className={clsx(className, classes.root)}
      ref={ref}
      style={{ gridArea: isScreenMediumAndUp ? 'side-nav' : 'bottom-nav', ...style }}
    >
      <div className="flex items-center md:flex-wrap md:items-start">
        {ORDERED_APP_ID_LIST.map((value) => {
          const [Icon, label] = ICON_AND_LABEL_MAP[value];
          const href = `/${value}`;
          const isSelected = pathname === href;

          return (
            <ToggleButton
              className={clsx('bg-opacity-50 hover:bg-alto focus:bg-alto md:hover:bg-white md:focus:bg-white', {
                'bg-alto': isSelected && !isScreenMediumAndUp,
                'bg-white': isSelected && isScreenMediumAndUp
              })}
              href={href}
              key={value}
              selected={isSelected}
            >
              <Icon fontSize="medium" />
              <span className="mt-1 text-xs">{label}</span>
            </ToggleButton>
          );
        })}
      </div>
    </nav>
  );
});

NavToggleGroupRoot.displayName = 'NavToggleGroupRoot';

export const NavToggleGroup = React.memo(NavToggleGroupRoot);
NavToggleGroup.displayName = 'NavToggleGroup';

const ToggleButton = styled(Link, { shouldForwardProp: (prop) => prop !== 'selected' })<
  LinkProps & { selected?: boolean }
>(({ selected, theme }) => {
  const isSelected = selected === true;

  return {
    alignItems: 'center',
    color: isSelected ? theme.palette.secondary.main : undefined,
    display: 'inline-flex',
    flexDirection: 'column',
    fontWeight: isSelected ? theme.typography.fontWeightBold : undefined,
    justifyContent: 'center',
    outline: '2px solid transparent',
    outlineOffset: 2,
    padding: theme.spacing(3),
    width: '100%'
  };
});
