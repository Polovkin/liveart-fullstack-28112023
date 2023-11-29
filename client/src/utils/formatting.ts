import { Inflectors } from 'en-inflectors';

export function formatFileUrl(url: string) {
  return `${window.location.origin}${url}`;
}

export function getNounPluralForm(noun: string) {
  return new Inflectors(noun).toPlural();
}

export function getVerbPastTense(verb: string) {
  return new Inflectors(verb).toPast();
}

export function capitalizeFirstLetter(string: string) {
  if (string.length === 0) return string;
  return string[0].toUpperCase() + string.slice(1);
}
