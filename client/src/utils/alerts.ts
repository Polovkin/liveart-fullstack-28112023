import { capitalizeFirstLetter, getNounPluralForm, getVerbPastTense } from './formatting';

export interface Alert {
  message: string;
  color: AlertColor;
}

export enum AlertColor {
  SUCCESS = 'success',
  ERROR = 'error',
  DEFAULT = 'primary',
}

export interface AlertMessageData {
  entityName: string;
  action: string;
  id?: string;
  single?: boolean;
}

export function getCorrectEntityName(data: AlertMessageData) {
  return data.single
    ? data.entityName
    : data.id
    ? `${data.entityName} #${data.id}`
    : getNounPluralForm(data.entityName);
}

/**
 * Transform alert data into human readable success message
 * as "Saved product #111" or "Cancelled order #222"
 * @param data {AlertMessageData}
 */
function getSuccessMessage(data: AlertMessageData) {
  const name = getCorrectEntityName(data);
  const pastAction = getVerbPastTense(data.action);
  return capitalizeFirstLetter(`${pastAction} ${name}`);
}

/**
 * Transform alert data into human readable error message
 * as "Failed to save product #111" or "Failed to cancel order #222"
 * @param data {AlertMessageData}
 */
function getErrorMessage(data: AlertMessageData) {
  const name = getCorrectEntityName(data);
  return `Failed to ${data.action} ${name}`;
}

/**
 * Store util used to dispatch correct type of alert
 * with human readable message
 * @param color {AlertColor}
 * @param info {AlertMessageData or string}
 * @param dispatch {vuex function}
 */
export function dispatchAlert(
  color: AlertColor,
  info: AlertMessageData | string,
  dispatch: Function,
) {
  const message =
    typeof info === 'string'
      ? info
      : color === AlertColor.ERROR
      ? getErrorMessage(info)
      : getSuccessMessage(info);
  dispatch('uiModule/setAlert', { message, color }, { root: true });
}

export function noApiMethodMessage(method: string) {
  return `No "${method}" method available in API client`;
}
