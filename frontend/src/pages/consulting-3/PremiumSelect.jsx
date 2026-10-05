import React, { useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '../../components/ui/popover';
import { Command, CommandInput, CommandList, CommandEmpty, CommandItem } from '../../components/ui/command';
import './PremiumSelect.css';

/**
 * Premium dropdown used only on /consulting-3.
 * options: [{ value, label, description?, leading? (ReactNode) }]
 */
export function PremiumSelect({ id, value, onChange, options, placeholder, error, disabled, searchable = false, searchPlaceholder = 'Search', emptyText = 'No results found.', filter, testId, wide = false, variant = 'box' }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);
  const select = v => { onChange(v); setOpen(false); };

  return <Popover open={open && !disabled} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <button
        id={id} type="button" role="combobox" disabled={disabled}
        aria-expanded={open} aria-haspopup="listbox" aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}
        className={`c3-select-trigger${variant === 'underline' ? ' c3-select-underline' : ''}${error ? ' c3-invalid' : ''}${selected ? '' : ' c3-placeholder'}`}
        data-testid={testId || id}
      >
        <span className="c3-select-value">
          {selected ? <>{selected.leading && <span className="c3-trigger-leading">{selected.leading}</span>}<span className="c3-truncate">{selected.label}</span></> : <span className="c3-truncate">{placeholder}</span>}
        </span>
        <span className="c3-chevron" aria-hidden="true"><ChevronDown size={15} strokeWidth={2.2} /></span>
      </button>
    </PopoverTrigger>
    <PopoverContent className={`c3-popover${wide ? ' c3-popover-wide' : ''}`} align={wide ? 'end' : 'start'} sideOffset={8} collisionPadding={16} data-testid={`${testId || id}-popover`}>
      <Command filter={filter} shouldFilter={searchable}>
        {searchable && <div className="c3-search">
          <Search size={16} aria-hidden="true" />
          <CommandInput placeholder={searchPlaceholder} data-testid={`${testId || id}-search`} />
        </div>}
        <CommandList className="c3-list">
          <CommandEmpty className="c3-empty">{emptyText}</CommandEmpty>
          {options.map(o => {
            const active = o.value === value;
            return <CommandItem key={o.value} value={o.value} onSelect={() => select(o.value)} className={`c3-option${active ? ' c3-option-active' : ''}${o.description ? ' c3-option-rich' : ''}`} data-testid={`${testId || id}-option-${String(o.value).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
              {o.leading && <span className="c3-option-leading">{o.leading}</span>}
              <span className="c3-option-text">
                <span className="c3-option-label">{o.label}</span>
                {o.description && <span className="c3-option-desc">{o.description}</span>}
              </span>
              <span className={`c3-check${active ? ' c3-check-on' : ''}`} aria-hidden="true"><Check size={12} strokeWidth={3} /></span>
            </CommandItem>;
          })}
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>;
}
