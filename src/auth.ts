import NextAuth from 'next-auth';
import Okta from 'next-auth/providers/okta';

const OKTA_OAUTH_SCOPE_LIST: ReadonlyArray<string> = [
  'address',
  'email',
  'groups',
  'openid',
  'phone',
  'profile',
  'okta.myAccount.organization.read',
  'okta.myAccount.phone.read',
  'okta.myAccount.profile.read'
];

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/login'
  },
  providers: [
    Okta({
      authorization: {
        params: {
          scope: OKTA_OAUTH_SCOPE_LIST.join(' ')
        }
      }
    })
  ],
  trustHost: true
});
