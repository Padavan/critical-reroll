import React, { useContext, PropsWithChildren, useEffect, useState } from "react";
import { useSettings, Settings } from "./settings.provider";
import { Language, System } from "../utils/util.types";

type TranslationContextType = {
  t: (key: string) => string;
  isI18nLoading: boolean;
};

const INITIAL_CONTEXT: TranslationContextType = {
  t: (_key: string) => "Context not initiated",
  isI18nLoading: true,
};

const buildTranslationPack = async (
  language: Language,
  system: System,
): Promise<Record<string, string>> => {
  const translationPackList = await Promise.all([
    fetch(`i18n/${language}/app.json`).then((data) => data.json()),
    fetch(`i18n/${language}/settings.json`).then((data) => data.json()),
    fetch(`i18n/${language}/help.json`).then((data) => data.json()),
    fetch(`i18n/${language}/${system}/ruletips.json`).then((data) => data.json()),
    fetch(`i18n/${language}/${system}/critical-bludgeoning.json`).then((data) => data.json()),
    fetch(`i18n/${language}/${system}/critical-magic.json`).then((data) => data.json()),
    fetch(`i18n/${language}/${system}/critical-piercing.json`).then((data) => data.json()),
    fetch(`i18n/${language}/${system}/critical-slashing.json`).then((data) => data.json()),
    fetch(`i18n/${language}/${system}/fumble-magic.json`).then((data) => data.json()),
    fetch(`i18n/${language}/${system}/fumble-melee.json`).then((data) => data.json()),
    fetch(`i18n/${language}/${system}/fumble-natural.json`).then((data) => data.json()),
    fetch(`i18n/${language}/${system}/fumble-ranged.json`).then((data) => data.json()),
  ]);

  const combined = Object.assign({}, ...translationPackList);
  console.log("data", combined);
  return combined;
};

const TranslationContext = React.createContext(INITIAL_CONTEXT);

const TranslationProvider = (props: PropsWithChildren) => {
  const { settings } = useSettings();
  const [currentTexts, setCurrentText] = useState<Record<string, string>>({});
  const [isI18nLoading, setIsI18nLoading] = useState(false);

  const initializeTranslationData = async (newSettings: Settings) => {
    setIsI18nLoading(true);
    const data = await buildTranslationPack(newSettings.language, newSettings.system);
    setCurrentText(data);
    setIsI18nLoading(false);
  };

  useEffect(() => {
    initializeTranslationData(settings);
  }, [settings]);

  const getI18nText = (key: string) => {
    const text = currentTexts[key];

    if (!text) {
      console.error("No existing text for str: ", key);
      return key;
    } else {
      return text;
    }
  };

  return (
    <TranslationContext.Provider
      value={{
        t: getI18nText,
        isI18nLoading: isI18nLoading,
      }}
    >
      {props.children}
    </TranslationContext.Provider>
  );
};

const useTranslation = () => useContext<TranslationContextType>(TranslationContext);

export { TranslationContext, TranslationProvider, useTranslation };
