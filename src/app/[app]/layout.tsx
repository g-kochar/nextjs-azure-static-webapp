import { auth } from '@/auth';
import { isNil, isNotNil } from '@lib';
import { loadClientConfigurationAsync } from '@lib/load-client-configuration';
import { NavToggleGroup } from '@ui/component/nav-toggle-group';
import { SessionUserAvatar } from '@ui/component/session-user-avatar';
import Image from 'next/image';
import type React from 'react';

export default async function Layout({ children }: { children: React.ReactNode }): Promise<React.ReactElement | null> {
  const session = await auth();
  if (isNil(session?.user)) return null;

  const { logo } = await loadClientConfigurationAsync();

  return (
    <div className="grid-sienna h-full w-full">
      <div className="mb-5 flex h-16 w-full items-center border-b border-b-alto px-5" style={{ gridArea: 'header' }}>
        <div className="flex-1">{isNotNil(logo) && <Image alt="logo" height={50} src={logo.src} width={128} />}</div>
        <SessionUserAvatar email={session.user.email} name={session.user.name} src={session.user.image} />
      </div>

      <NavToggleGroup className="border-t border-alto md:w-24 md:border-r md:border-t-0 md:bg-alto" />

      <div className="hidden flex-col border-r border-r-alto bg-athensGray md:flex" style={{ gridArea: 'aside' }}>
        <div className="h-16 border-b border-b-alto px-5 font-baseBlack text-xl leading-[4rem]" id="recents">
          Recent
        </div>

        <ul
          aria-labelledby="recents"
          className="flex-1 overflow-y-auto p-5 [&>li:not(:first-child)>strong]:mt-3 [&_p]:ml-3 [&_span]:ml-3 [&_span]:text-xs"
        >
          <li tabIndex={0}>
            <strong className="mb-1 block font-baseMedium">August</strong>
            <p className="truncate">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            <span className="font-light">Aug 05, 02:43pm</span>
          </li>
          <li className="mt-5" tabIndex={0}>
            <strong className="mb-1 block font-baseMedium">Last Week</strong>
            <p className="truncate">Vivamus molestie sodales lorem, in euismod massa rhoncus vitae...</p>
            <span className="font-light">Nov 11, 10am</span>
            <p className="mt-3 truncate">Pellentesque vitae est non eros consectetur venenatis ut eu felis...</p>
            <span className="font-light">Nov 11, 04:45pm</span>
          </li>
          <li className="mt-5" tabIndex={0}>
            <strong className="mb-1 block font-baseMedium">Today</strong>
            <p className="truncate">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            <span className="font-light">1pm</span>
          </li>
        </ul>
      </div>

      {children}
    </div>
  );
}
