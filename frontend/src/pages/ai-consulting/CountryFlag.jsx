import React from 'react';
import * as flagIcons from 'country-flag-icons/react/3x2';
import './CountryFlag.css';

export const CountryFlag = ({ code, name, testId }) => {
  const FlagIcon = flagIcons[code];
  if (!FlagIcon) return <span className="aic-country-flag-fallback" aria-label={name} data-testid={testId}>{code}</span>;
  return <FlagIcon className="aic-country-flag" role="img" aria-label={`${name} flag`} focusable="false" width={21} height={14} data-testid={testId} />;
};