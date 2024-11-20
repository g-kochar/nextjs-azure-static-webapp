import { SUB_DOMAIN_TO_CLIENT_MAPPING } from '@/client-config';
import { headers as readHeadersAsync } from 'next/headers';
import { strOrDefault } from '.';

export async function getClientIdAsync(): Promise<string> {
  let host = strOrDefault((await readHeadersAsync()).get('host'));
  if (host === 'localhost:3000') host = 'sienna.example.com';
  const index1 = host.indexOf('.');
  const index2 = index1 > -1 ? host.indexOf('.', index1 + 1) : -1;
  return strOrDefault(index2 > -1 && SUB_DOMAIN_TO_CLIENT_MAPPING[host.slice(0, index1)]);
}
