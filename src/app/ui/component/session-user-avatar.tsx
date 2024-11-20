'use client';

import type { ReadonlyRecord } from '@/types';
import { isNil, isNotNil, strOrDefault, trimOrDefault } from '@lib';
import IconLogout from '@mui/icons-material/LogoutOutlined';
import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import clsx from 'clsx';
import defaults from 'lodash/defaults';
import type { User } from 'next-auth';
import React from 'react';
import { signOut } from 'next-auth/react';

type AvatarProps = React.ComponentPropsWithoutRef<typeof Avatar>;

export type SessionUserAvatarClassKey = keyof typeof DEFAULT_CLASSES;

export interface SessionUserAvatarProps
  extends Omit<AvatarProps, 'children' | 'imgProps' | 'src'>,
    Pick<User, 'email' | 'name'> {
  children?: never;
  classes?: typeof DEFAULT_CLASSES;
  imgProps?: never;
  src?: string | null;
}

const DEFAULT_CLASSES: Partial<ReadonlyRecord<keyof NonNullable<AvatarProps['classes']>, string>> = {};

const SessionUserAvatarRoot = React.forwardRef<HTMLDivElement, SessionUserAvatarProps>(function SessionUserAvatarRoot(
  {
    alt,
    children: _omit01,
    classes: classesFromProps,
    className,
    email,
    imgProps: _omit$02,
    name,
    src,
    sizes,
    srcSet,
    ...rootProps
  },
  ref
) {
  const classes = defaults({}, classesFromProps as unknown, DEFAULT_CLASSES);
  const uniqueId = React.useId();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const anchorId = `anchor-${uniqueId}`;
  const menuId = `menu-${uniqueId}`;

  email = trimOrDefault(email);
  name = trimOrDefault(name).replace(/\s+/g, ' ');
  src = trimOrDefault(src);

  const nameParts = name.split(' ');
  let initials = strOrDefault(nameParts.length > 0 && nameParts[0].at(0)).toUpperCase();
  initials += strOrDefault(nameParts.length > 1 && nameParts.at(-1)?.at(0)).toUpperCase();
  if (initials.length === 0) initials = strOrDefault(email.slice(0, 2)).toUpperCase();
  if (initials.length === 0) initials = undefined!;

  let imgProps: Pick<AvatarProps, 'alt' | 'sizes' | 'src' | 'srcSet'> | undefined;
  if (src.length > 0) {
    imgProps = { alt, sizes, src, srcSet };
  }

  return (
    <div {...rootProps} className={clsx(className, classes.root)} ref={ref}>
      <button
        aria-controls={isNil(anchorEl) ? undefined : menuId}
        aria-expanded={isNotNil(anchorEl) || undefined}
        aria-haspopup="menu"
        className="ml-3 inline-flex items-center"
        id={anchorId}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        type="button"
      >
        <Avatar
          aria-hidden
          role="presentation"
          sx={(theme) => ({
            bgcolor: theme.palette.secondary.main,
            fontSize: theme.spacing(3),
            height: theme.spacing(8),
            width: theme.spacing(8)
          })}
          {...imgProps}
        >
          {initials}
        </Avatar>

        {/* <span className="ml-1 max-w-28 truncate">{strOrDefault(name.length > 0 && name, email)}</span> */}
        <span className="sr-only">{strOrDefault(name.length > 0 && name, email)}</span>
      </button>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        aria-labelledby={anchorId}
        id={menuId}
        onClose={() => setAnchorEl(null)}
        open={isNotNil(anchorEl)}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem dense onClick={() => signOut()}>
          <ListItemIcon>
            <IconLogout />
          </ListItemIcon>

          <ListItemText primary="Sign out" />
        </MenuItem>
      </Menu>
    </div>
  );
});

SessionUserAvatarRoot.displayName = 'SessionUserAvatarRoot';

export const SessionUserAvatar = React.memo(SessionUserAvatarRoot);
SessionUserAvatar.displayName = 'SessionUserAvatar';
