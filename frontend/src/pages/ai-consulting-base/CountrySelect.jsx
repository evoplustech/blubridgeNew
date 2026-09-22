import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '../../components/ui/popover';
import { Command, CommandInput, CommandList, CommandEmpty, CommandItem } from '../../components/ui/command';
import { countries, countryByCode, filterCountry } from '../ai-consulting/countryData';
import { CountryFlag } from '../ai-consulting/CountryFlag';

export const CountrySelect = ({ id, value, onChange, disabled, error, callingCode = false }) => {
  const [open, setOpen] = useState(false);
  const selected = countryByCode[value];
  return <Popover open={open && !disabled} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button id={id} type="button" variant="outline" role="combobox" aria-expanded={open && !disabled} aria-haspopup="dialog" aria-controls={open && !disabled ? `${id}-popover` : undefined}
        aria-label={callingCode ? 'Country calling code' : 'Your Country / Region'} title={selected?.name} aria-required={!callingCode} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}
        onKeyDown={event => { if (!disabled && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) { event.preventDefault(); setOpen(true); } }}
        disabled={disabled} className={`aic-input aic-country-trigger aic-base-country-trigger${error ? ' aic-invalid' : ''}${selected ? '' : ' aic-placeholder'}`} data-testid={id}>
        <span className="aic-country-value">{selected ? <span className="aic-country-display"><CountryFlag code={value} name={selected.name} testId={`${id}-flag`} /><span className="aic-country-display-text">{callingCode ? `+${selected.callingCode}` : selected.name}</span></span> : callingCode ? 'Code' : 'Select your country / region'}</span>
        <ChevronDown className="aic-base-country-chevron" size={15} aria-hidden="true" />
      </Button>
    </PopoverTrigger>
    <PopoverContent id={`${id}-popover`} className="aic-country-popover aic-base-country-popup" side="bottom" sideOffset={6} align="start" avoidCollisions
      collisionPadding={{ top: 124, right: 16, bottom: 16, left: 16 }} hideWhenDetached
      aria-label={callingCode ? 'Select calling code' : 'Select country or region'} data-testid={`${id}-popover`}>
      <Command filter={filterCountry}>
        <CommandInput placeholder={callingCode ? 'Search country or calling code' : 'Search countries / regions'} aria-label={callingCode ? 'Search calling codes' : 'Search countries and regions'} data-testid={`${id}-search`} />
        <CommandList className="aic-base-country-list" aria-label={callingCode ? 'Country calling codes' : 'Countries and regions'} data-testid={`${id}-list`}>
          <CommandEmpty data-testid={`${id}-empty`}>No country found.</CommandEmpty>
          {countries.map(country => <CommandItem key={country.code} value={country.code} onSelect={() => { onChange(country.code); setOpen(false); }} data-testid={`${id}-option-${country.code.toLowerCase()}`}>
            <CountryFlag code={country.code} name={country.name} testId={`${id}-option-${country.code.toLowerCase()}-flag`} /><span className="aic-country-option-name">{country.name}</span>
            {callingCode && <span className="aic-calling-code">+{country.callingCode}</span>}
            {country.code === value && <Check size={15} aria-hidden="true" />}
          </CommandItem>)}
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>;
};