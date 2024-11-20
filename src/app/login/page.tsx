import { signIn } from '@/auth';
import { isNotNil } from '@lib';
import { loadClientConfigurationAsync } from '@lib/load-client-configuration';
import Image from 'next/image';

export default async function LoginPage(): Promise<React.ReactElement | null> {
  async function invokeProviderAuth(): Promise<void> {
    'use server';

    await signIn('okta', { redirectTo: '/' });
  }

  const { i18n, logo } = await loadClientConfigurationAsync();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="m-auto flex h-full max-h-maxBox w-full max-w-screen-xs2 flex-col rounded-md p-3">
        {isNotNil(logo) && <Image alt="logo" className="self-center" height={56} src={logo.src} width={160} />}

        <div className="mt-auto text-center">
          {isNotNil(i18n) && (
            <>
              {isNotNil(i18n.heading1.loginPage) && (
                <h1 className="mb-5 font-baseBlack text-4xl">{i18n.heading1.loginPage}</h1>
              )}
              {isNotNil(i18n.heading2.loginPage) && <h2 className="text-xl">{i18n.heading2.loginPage}</h2>}
            </>
          )}
        </div>

        <div className="mt-auto">
          {isNotNil(i18n) && (
            <form action={invokeProviderAuth} className="flex">
              <button className="inline-flex flex-1 items-center justify-center rounded bg-secondary p-2 text-lg text-white">
                {i18n?.form.signIn.action.submit.label}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
