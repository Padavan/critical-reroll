import React, { useState, useContext, PropsWithChildren } from "react";
import { System } from "../utils/util.types";
import { Language } from "../utils/util.types";

export type Settings = {
  system: System;
  language: Language;
};

const INITIAL_SETTINGS: Settings = {
  system: "pfrpg",
  language: "en",
};

const SettingsContext = React.createContext({
  settings: INITIAL_SETTINGS,
  changeSettings: (_next: Settings) => {},
});

const SettingsProvider = (props: PropsWithChildren) => {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  const changeSettings = (nextSettings: Settings) => {
    setSettings(nextSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        changeSettings,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

const useSettings = () =>
  useContext<{ settings: Settings; changeSettings: (next: Settings) => void }>(SettingsContext);

export { SettingsContext, SettingsProvider, useSettings };
