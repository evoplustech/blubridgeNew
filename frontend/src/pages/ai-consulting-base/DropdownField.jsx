import React, { useState } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectItem } from '../../components/ui/select';
import { RequiredMark, FieldError } from '../ai-consulting/FormField';
import { fieldId } from '../ai-consulting/fieldUtils';

const EMPTY_OPTION = '__aic_empty_selection__';
// Keep the base dropdowns' canonical punctuation without changing other variants.
const optionLabel = value => value === 'Other' ? 'Other - Please specify' : value;

export const DropdownField = ({ name, label, value, onChange, error, placeholder, options, disabled = false }) => {
  const [open, setOpen] = useState(false);
  const id = fieldId(name);
  return <div className="aic-field" data-testid={`${id}-field`}>
    <label htmlFor={id} id={`${id}-label`} className="aic-label" data-testid={`${id}-label`}>{label}<RequiredMark /></label>
    <Select name={name} value={value || ''} open={open && !disabled} onOpenChange={setOpen} required disabled={disabled}
      onValueChange={next => onChange({ target: { name, value: next === EMPTY_OPTION ? '' : next, type: 'select-one' } })}>
      <SelectTrigger id={id} className={`aic-input aic-base-select-trigger${error ? ' aic-invalid' : ''}${value ? '' : ' aic-placeholder'}`}
        aria-labelledby={`${id}-label`} aria-required="true" aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}
        title={value ? optionLabel(value) : undefined} data-testid={id}>
        <SelectValue placeholder={placeholder} data-testid={`${id}-value`} />
      </SelectTrigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content position="popper" side="bottom" align="start" sideOffset={6} avoidCollisions
          collisionPadding={{ top: 124, right: 16, bottom: 16, left: 16 }}
          className="aic-base-select-popup" data-testid={`${id}-menu`}>
          <SelectPrimitive.ScrollUpButton className="aic-base-select-scroll" data-testid={`${id}-scroll-up`} aria-label="Scroll options up">
            <ChevronUp size={16} aria-hidden="true" />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="aic-base-select-viewport" data-testid={`${id}-options`}>
            <SelectItem value={EMPTY_OPTION} className="aic-base-select-option aic-base-select-empty" data-testid={`${id}-option-empty`}>{placeholder}</SelectItem>
            {options.map((option, index) => <SelectItem key={option} value={option} textValue={optionLabel(option)} className="aic-base-select-option" data-testid={`${id}-option-${index}`}>
              {optionLabel(option)}
            </SelectItem>)}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="aic-base-select-scroll" data-testid={`${id}-scroll-down`} aria-label="Scroll options down">
            <ChevronDown size={16} aria-hidden="true" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </Select>
    <FieldError name={name} error={error} />
  </div>;
};