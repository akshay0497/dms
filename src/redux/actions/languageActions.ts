export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE;
  payload: boolean;
}

export const changeLanguage = (isHindi: boolean): ChangeLanguageAction => ({
  type: CHANGE_LANGUAGE,
  payload: isHindi,
});

export type LanguageActionTypes = ChangeLanguageAction;
