'use client';

import { handleAiAssistFormSubmitAsync } from '@/app/actions/handle-ai-assist-form-submit';
import type { FormsI18N, HtmlFormElementProps, ReadonlyRecord } from '@/types';
import { isNil, isNotNil, trimOrDefault } from '@lib';
import { CircularProgress, SvgIcon, TextField } from '@mui/material';
import clsx from 'clsx';
import { defaults } from 'lodash';
import defaultsDeep from 'lodash/defaultsDeep';
import React from 'react';

type ActionClassKey = `${`action${'' | 'Submit'}`}${'' | 'Disabled'}`;
type FieldsetClassKey = `${`field${'' | 'set'}`}${'' | 'Query'}`;

export type AiAssistFormClassKey = keyof typeof DEFAULT_CLASSES;
export type AiAssistFormI18N = typeof DEFAULT_I18N;

export interface AiAssistFormProps extends Omit<HtmlFormElementProps, 'action' | 'children' | 'onSubmit' | 'ref'> {
  I18N?: typeof DEFAULT_I18N;
  action?: never;
  children?: never;
  classes?: typeof DEFAULT_CLASSES;
  onSubmit?: never;
}

const DEFAULT_CLASSES: Partial<ReadonlyRecord<ActionClassKey | FieldsetClassKey | 'root', string>> = {
  action: 'print:!hidden',
  actionSubmit: 'ml-2 mt-auto inline-flex items-center justify-center rounded bg-secondary px-3 py-2 text-white',
  actionDisabled: 'cursor-auto pointer-events-none',
  actionSubmitDisabled: 'disabled:bg-alto disabled:text-textPrimary disabled:text-opacity-40',
  fieldset: 'flex-1',
  fieldQuery: '[&_textarea]:max-h-20',
  root: 'flex w-full flex-row rounded-lg border border-alto bg-white p-2'
};

const DEFAULT_I18N: FormsI18N.AiAssistForm = {
  action: {
    submit: {
      label: 'Answer'
    }
  },
  fieldset: {
    query: {
      formField: {
        query: {
          label: 'Question/inquiry',
          placeHolder: 'Have a question or an inquiry? Type it here and click Answer'
        }
      }
    }
  }
};

const TEXT_FIELD_SLOT_PROPS: NonNullable<React.ComponentProps<typeof TextField>['slotProps']> = {
  input: {
    disableUnderline: true,
    sx: {
      fontSize: '1rem',
      mt: '0 !important'
    }
  },
  inputLabel: {
    className: '!sr-only',
    shrink: true
  }
};

const AiAssistFormRoot = React.forwardRef<HTMLFormElement, AiAssistFormProps>(function AiAssistFormRoot(
  { I18N, action, children, classes: classesFromProps, className, id, onSubmit, ...rootProps },
  ref
) {
  const classes = defaults({}, classesFromProps as unknown, DEFAULT_CLASSES);

  const uniqueId = React.useId();
  id = trimOrDefault(id);
  if (id.length === 0) id = `form-${uniqueId}`;

  const i18n = defaultsDeep({}, I18N, DEFAULT_I18N) as NonNullable<typeof I18N>;
  const { query: fieldI18n } = i18n.fieldset.query.formField;
  const [formData, setFormData] = React.useState<FormData>();
  const isSubmitting = isNotNil(formData);
  const [query, setQuery] = React.useState('');
  const isSubmitDisabled = isSubmitting || query.trim().length === 0;
  const submitRef = React.useRef<HTMLButtonElement | null>(null);

  const onChangeQuery = React.useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    setQuery(event.target.value.replace(/[\n\r]/g, ''));
  }, []);

  const onKeyDown = React.useCallback<React.KeyboardEventHandler<HTMLElement>>(
    (event) => void (event.key === 'Enter' && submitRef.current?.click()),
    []
  );

  const onFormSubmit = React.useCallback<React.FormEventHandler<HTMLFormElement>>((event) => {
    event.preventDefault();
    event.stopPropagation();

    const data = new FormData(event.currentTarget);
    const value = (data.get('query') as string).trim();
    if (value.length === 0) return;

    data.set('query', value);
    setFormData(data);
  }, []);

  React.useEffect((): ReturnType<React.EffectCallback> => {
    if (isNil(formData)) return;

    let ignore = false;
    void handleAiAssistFormSubmitAsync(formData)
      .then(() => void (!ignore && setQuery('')))
      .finally(() => void (!ignore && setFormData(undefined)));
    return void (ignore = true);
  }, [formData]);

  return (
    <form className={clsx(className, classes.root)} {...rootProps} id={id} onSubmit={onFormSubmit} ref={ref}>
      <fieldset className={clsx(classes.fieldset, classes.fieldsetQuery)} disabled={isSubmitting}>
        <TextField
          autoComplete="off"
          autoFocus
          className={clsx(classes.field, classes.fieldQuery)}
          disabled={isSubmitting}
          fullWidth
          label={fieldI18n.label}
          multiline
          name="query"
          onChange={onChangeQuery}
          onKeyDown={onKeyDown}
          placeholder={fieldI18n.placeHolder}
          slotProps={TEXT_FIELD_SLOT_PROPS}
          value={query}
          variant="standard"
        />
      </fieldset>

      <button
        className={clsx(
          classes.action,
          classes.actionSubmit,
          isSubmitDisabled && [classes.actionDisabled, classes.actionSubmitDisabled]
        )}
        disabled={isSubmitDisabled}
        ref={submitRef}
      >
        {isSubmitting ? (
          <CircularProgress color="secondary" size={16} />
        ) : (
          <SvgIcon>
            <svg fill="currentColor" viewBox="0 0 495.003 495.003">
              <g>
                <path d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616 l-67.6-32.22V456.687z" />
                <path d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422 c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414 l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956 L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z" />
              </g>
            </svg>
          </SvgIcon>
        )}

        <span className="sr-only">{i18n.action.submit.label}</span>
      </button>
    </form>
  );
});

AiAssistFormRoot.displayName = 'AiAssistFormRoot';

export const AiAssistForm = React.memo(AiAssistFormRoot);
AiAssistForm.displayName = 'AiAssistForm';
