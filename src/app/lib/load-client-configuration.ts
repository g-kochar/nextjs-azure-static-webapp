import type { ClientConfiguration, ReadonlyRecord, Writeable } from '@/types';
import { isNotNil } from '.';
import { getClientIdAsync } from './get-client-id';

type PartialClientConfiguration = Writeable<Partial<ClientConfiguration>>;

export async function loadClientConfigurationAsync(): Promise<PartialClientConfiguration> {
  const config: Awaited<ReturnType<typeof loadClientConfigurationAsync>> = {};

  const clientId = await getClientIdAsync();
  let i18nJson: ReadonlyRecord<string, string> | undefined;
  if (clientId.length > 0) {
    try {
      if (clientId === 'sienna') {
        config.colorPalette = (await import(`@/client-config/sienna/color-palette`).catch(() => undefined))?.default;
        config.logo = (await import('@/client-config/sienna/logo.svg').catch(() => undefined))?.default;
        i18nJson = (await import('@i18n/sienna/en-CA.json').catch(() => undefined))?.default;
      } else if (clientId === 'sigmail') {
        config.colorPalette = (await import(`@/client-config/sigmail/color-palette`).catch(() => undefined))?.default;
        config.logo = (await import('@/client-config/sigmail/logo.png').catch(() => undefined))?.default;
        i18nJson = (await import('@i18n/sigmail/en-CA.json').catch(() => undefined))?.default;
      }
    } catch {
      /* ignore */
    }

    if (isNotNil(i18nJson)) {
      config.i18n = {
        documentTitle: {
          generic: i18nJson.documentTitle_generic,
          login: i18nJson.documentTitle_login
        },
        form: {
          aiAssist: {
            action: {
              submit: {
                label: i18nJson.aiAssistFormActionLabel_submit
              }
            },
            fieldset: {
              query: {
                formField: {
                  query: {
                    label: i18nJson.aiAssistFormInputLabel_query,
                    placeHolder: i18nJson.aiAssistFormInputHint_query
                  }
                }
              }
            }
          },
          signIn: {
            action: {
              submit: {
                label: i18nJson.signInFormActionLabel_submit
              }
            }
          }
        },
        heading1: {
          homePage: i18nJson.heading1_homePage,
          loginPage: i18nJson.heading1_loginPage
        },
        heading2: {
          homePage: i18nJson.heading2_homePage,
          loginPage: i18nJson.heading2_loginPage
        }
      };
    }
  }

  return config;
}
