'use client';

import type { HtmlOListElementProps, QuestionAnswerDataItem, ReadonlyRecord } from '@/types';
import { isArray, isInteger, isNotNil, trimOrDefault } from '@lib';
import { scrollIntoView as createScrollIntoView } from '@lib/scroll-into-view';
import IconCommentFilled from '@mui/icons-material/Comment';
import IconCommentOutlined from '@mui/icons-material/CommentOutlined';
import IconDislikeFilled from '@mui/icons-material/ThumbDown';
import IconDislikeOutlined from '@mui/icons-material/ThumbDownOutlined';
import IconLikeFilled from '@mui/icons-material/ThumbUp';
import IconLikeOutlined from '@mui/icons-material/ThumbUpOutlined';
import { Card, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import defaults from 'lodash/defaults';
import React from 'react';

export type QuestionAnswerHistoryClassKey = keyof typeof DEFAULT_CLASSES;

export interface QuestionAnswerHistoryProps extends Omit<HtmlOListElementProps, 'children' | 'ref'> {
  children?: never;
  classes?: typeof DEFAULT_CLASSES;
  history?: ReadonlyArray<QuestionAnswerDataItem>;
}

const DEFAULT_CLASSES: Partial<ReadonlyRecord<'root', string>> = {
  root: 'pb-1 [&>li+li]:mt-9'
};

const scrollIntoView = createScrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

const QuestionAnswerHistoryRoot = React.forwardRef<HTMLOListElement, QuestionAnswerHistoryProps>(
  function QuestionAnswerHistoryRoot(
    { children, classes: classesFromProps, className, history, id, ...rootProps },
    ref
  ) {
    const classes = defaults({}, classesFromProps as unknown, DEFAULT_CLASSES);

    id = trimOrDefault(id);
    const uniqueId = React.useId();
    if (id.length === 0) id = `list-${uniqueId}`;

    const lastAnswerRef = React.useRef<HTMLLIElement | null>(null);

    React.useEffect(
      (): ReturnType<React.EffectCallback> =>
        void (Number(history?.length) > 0 && window.requestAnimationFrame(() => scrollIntoView(lastAnswerRef.current))),
      [history?.length]
    );

    return (
      isArray(history) &&
      history.length > 0 && (
        <ol {...rootProps} className={clsx(className, classes.root)} ref={ref}>
          {history.map((item, index, { length: N1 }) => {
            return (
              <Card
                className="mr-2 text-left"
                component="li"
                elevation={0}
                key={index}
                ref={index === N1 - 1 ? lastAnswerRef : undefined}
                variant="elevation"
              >
                <ChatBubbleUser>
                  <p>{item.question}</p>
                </ChatBubbleUser>

                <ChatBubbleAI>
                  {item.answer.map((answer, key) => (
                    <p key={key}>{answer}</p>
                  ))}

                  {item.sources.length > 0 && (
                    <figure>
                      <figcaption>
                        <strong>Sources:</strong>
                      </figcaption>

                      <ul>
                        {item.sources.map((url, sourceIndex) => (
                          <li key={sourceIndex}>
                            <a className="text-primary underline" href={url}>
                              {url}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </figure>
                  )}

                  <div role="contentinfo">
                    <div tabIndex={0}>Responded in {item.responseTime}ms</div>

                    <IconButton size="small">
                      {isInteger(item.liked) ? <IconLikeFilled /> : <IconLikeOutlined />}
                    </IconButton>

                    <IconButton size="small">
                      {isInteger(item.disliked) ? <IconDislikeFilled /> : <IconDislikeOutlined />}
                    </IconButton>

                    <IconButton size="small">
                      {isNotNil(item.comment) ? <IconCommentFilled /> : <IconCommentOutlined />}
                    </IconButton>
                  </div>
                </ChatBubbleAI>

                {/* <CardContent sx={{ px: 3, pb: 2, pt: 0, '&>*+*': { mt: (theme) => `${theme.spacing(3)} !important` } }}>
                  {item.answer.map((answer, key, { length: N2 }) => (
                    <>
                      <Typography component="div" color="textSecondary" key={key} variant="caption">
                        {answer}
                      </Typography>{' '}
                      {key === N2 - 1 && (
                        <>
                          <div className="mt-3">Sources:</div>
                          <ul></ul>
                        </>
                      )}
                    </>
                  ))}
                </CardContent> */}

                {/* <CardActions className="justify-end">
                  <IconButton className="[&.MuiIconButton-root]:text-base" size="small">
                    {isInteger(item.liked) ? <IconLikeFilled /> : <IconLikeOutlined />}
                  </IconButton>

                  <IconButton className="[&.MuiIconButton-root]:text-base" size="small">
                    {isInteger(item.disliked) ? <IconDislikeFilled /> : <IconDislikeOutlined />}
                  </IconButton>

                  <IconButton className="[&.MuiIconButton-root]:text-base" size="small">
                    {isNotNil(item.comment) ? <IconCommentFilled /> : <IconCommentOutlined />}
                  </IconButton>
                </CardActions> */}
              </Card>
            );
          })}
        </ol>
      )
    );
  }
);

QuestionAnswerHistoryRoot.displayName = 'QuestionAnswerHistoryRoot';

export const QuestionAnswerHistory = React.memo(QuestionAnswerHistoryRoot);
QuestionAnswerHistory.displayName = 'QuestionAnswerHistory';

const ChatBubbleAI = styled('div')(({ theme }) => ({
  '--tw-text-opacity': 0.25,
  backgroundColor: theme.palette.secondary.main,
  borderRadius: theme.shape.borderRadius,
  fontSize: theme.spacing(3.5),
  margin: `${theme.spacing(1)} 0 0 ${theme.spacing(12)}`,
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(2),

  '>*': {
    '--tw-text-opacity': 1
  },

  '>*+*': {
    marginTop: `${theme.spacing(3)} !important`
  },

  '>figure': {
    marginTop: theme.spacing(3)
  },

  '>div[role=contentinfo]': {
    alignItems: 'center',
    display: 'flex',
    fontSize: theme.spacing(3),
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(1),

    '>:first-child': {
      marginRight: 'auto'
    },

    '>.MuiIconButton-root': {
      fontSize: theme.spacing(4),
      marginLeft: theme.spacing(1)
    }
  }
}));

ChatBubbleAI.displayName = 'ChatBubbleAI';

const ChatBubbleUser = styled('div')(({ theme }) => ({
  '--tw-text-opacity': 0.25,
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  fontSize: theme.spacing(3.5),
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`
}));

ChatBubbleUser.displayName = 'ChatBubbleUser';
