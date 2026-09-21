import isoCountries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';
import { getCountries, getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js/max';

isoCountries.registerLocale(english);
// Territories without separate phone metadata use their applicable numbering plan.
const phoneRegions = { AQ: 'NF', BV: 'NO', TF: 'RE', HM: 'NF', PN: 'NZ', GS: 'FK', UM: 'US' };
const names = { ...isoCountries.getNames('en', { select: 'official' }), AC: 'Ascension Island', TA: 'Tristan da Cunha' };
getCountries().forEach(code => { if (!names[code]) names[code] = new Intl.DisplayNames(['en'], { type: 'region' }).of(code); });
export const countries = Object.entries(names).map(([code, name]) => ({ code, name, callingCode: getCountryCallingCode(phoneRegions[code] || code) })).sort((a, b) => a.name.localeCompare(b.name));
export const countryByCode = Object.fromEntries(countries.map(country => [country.code, country]));
const normaliseSearch = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const exactCountries = Object.fromEntries(countries.flatMap(country => [[normaliseSearch(country.name), country.code], [country.code.toLowerCase(), country.code]]));
export const filterCountry = (code, search) => {
  const query = normaliseSearch(search);
  if (!query) return 1;
  if (exactCountries[query]) return code === exactCountries[query] ? 1 : 0;
  const country = countryByCode[code];
  const name = normaliseSearch(country.name);
  if (`+${country.callingCode}` === query || country.callingCode === query) return 1;
  if (name.startsWith(query)) return 0.9;
  return name.includes(query) ? 0.5 : 0;
};
export const parsePhone = (value, countryCode) => {
  if (!countryByCode[countryCode] || !/^[+()\d\s.-]+$/.test(value.trim())) return null;
  try {
    const phone = parsePhoneNumberFromString(value.trim(), { defaultCountry: phoneRegions[countryCode] || countryCode, extract: false });
    return phone?.isPossible() && phone.countryCallingCode === countryByCode[countryCode].callingCode ? phone : null;
  } catch { return null; }
};