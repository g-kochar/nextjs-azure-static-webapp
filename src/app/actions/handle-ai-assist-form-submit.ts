'use server';

import type { QuestionAnswerDataItem } from '@/types';
import { trimOrDefault } from '@lib';
import { getRandomInt } from '@lib/get-random-integer';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const questionAnswerData: Array<QuestionAnswerDataItem> = [];

/* cSpell:disable */
const LOREM_IPSUM = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices, sem non efficitur feugiat, mi arcu ultricies elit, quis congue neque massa ut leo. Maecenas turpis sapien, facilisis quis nisi quis, semper viverra nibh.',
  'Vivamus molestie sodales lorem, in euismod massa rhoncus vitae. Cras aliquet a sapien vel placerat. Pellentesque vitae est non eros consectetur venenatis ut eu felis. Nam porttitor turpis nec metus mollis vehicula. Morbi sed risus sed risus pretium aliquam dapibus a lorem. Sed quis enim rutrum, mollis ante ac, malesuada massa. Cras vel mi id tortor tincidunt mollis. Aenean sapien dui, fermentum vitae justo in, rutrum posuere lectus.'
];
/* cSpell:enable */

export async function getQuestionAnswerHistory(): Promise<ReadonlyArray<QuestionAnswerDataItem>> {
  return questionAnswerData;
}

export async function handleAiAssistFormSubmitAsync(formData: FormData): Promise<void> {
  const answer = LOREM_IPSUM.slice(0, getRandomInt(1, 3));
  const responseTime = getRandomInt(5, 3000);
  const question = trimOrDefault(formData.get('query'));

  await new Promise<void>((resolve) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      resolve();
    }, responseTime);
  });

  questionAnswerData.push({
    answer,
    question,
    responseTime,
    sources: Array.from(
      { length: answer.length },
      () => `https://www.example.com/doc?id=${getRandomInt(3_653_557, 7_898_700)}`
    )
  });
  revalidatePath('/chat');
  redirect('/chat');
}
