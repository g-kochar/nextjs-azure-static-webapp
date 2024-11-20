import type { ClientID, ReadonlyRecord } from '@/types';

export const SUB_DOMAIN_TO_CLIENT_MAPPING: ReadonlyRecord<string, ClientID> = {
  sienna: 'sienna',
  sigmail: 'sigmail'
};
