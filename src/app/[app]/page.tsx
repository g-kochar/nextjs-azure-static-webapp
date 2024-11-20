import { getQuestionAnswerHistory } from '@/app/actions/handle-ai-assist-form-submit';
import { auth } from '@/auth';
import { isNil, isNotNil } from '@lib';
import { loadClientConfigurationAsync } from '@lib/load-client-configuration';
import { AiAssistForm } from '@ui/component/form/ai-assist';
import { QuestionAnswerHistory } from '@ui/component/question-answer-history';
import clsx from 'clsx';
import type { Metadata } from 'next';
import style from './page.module.css';

interface Props {
  readonly params: Promise<{ readonly app: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { app } = await params;
  if (app === 'chat') {
    // console.log('app === "chat"');
  } else if (app === 'mail') {
    // console.log('app === "mail"');
  } else if (app === 'scribe') {
    // console.log('app === "scribe"');
  } else if (app === 'analytics') {
    // console.log('app === "analytics"');
  }
  return {};
}

export default async function Page({ params: _ }: Props): Promise<React.ReactElement | null> {
  const session = await auth();
  if (isNil(session?.user)) return null;

  const { i18n } = await loadClientConfigurationAsync();
  const questionAnswerHistory = await getQuestionAnswerHistory();

  return (
    <div className={style['grid-sienna-chat']} style={{ gridArea: 'main' }}>
      <div className="overflow-y-auto px-5" style={{ gridArea: 'main' }}>
        <div
          className={clsx(
            'mx-auto flex max-w-screen-ip6 flex-col items-center justify-center',
            questionAnswerHistory.length === 0 && 'h-full'
          )}
        >
          {isNotNil(i18n?.heading1.homePage) && (
            <h1 className={clsx('mb-5 text-center text-secondary', questionAnswerHistory.length > 0 && 'sr-only')}>
              {i18n.heading1.homePage}
            </h1>
          )}

          {questionAnswerHistory.length === 0 && isNotNil(i18n?.heading2.homePage) && (
            <h2 className="text-center font-baseBlack text-4xl">{i18n.heading2.homePage}</h2>
          )}

          <QuestionAnswerHistory history={questionAnswerHistory} />
        </div>
      </div>

      <div className="mb-5 px-5" style={{ gridArea: 'form' }}>
        {isNotNil(i18n) && (
          <AiAssistForm
            I18N={i18n.form.aiAssist}
            className="mx-auto max-w-screen-ip6"
            key={questionAnswerHistory.length}
          />
        )}
      </div>
    </div>
  );
}
