import React, { StrictMode } from "react";
import { App } from "./App";
import { TranslationProvider } from "./providers/i18n.provider";
import { SettingsProvider } from "./providers/settings.provider";
import { CardsProvider } from "./providers/cards.provider";

export const AppContainer = () => {
  return (
    <StrictMode>
      <SettingsProvider>
        <TranslationProvider>
          <CardsProvider>
            <App />
          </CardsProvider>
        </TranslationProvider>
      </SettingsProvider>
    </StrictMode>
  );
};
