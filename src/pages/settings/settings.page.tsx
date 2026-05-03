import React, { ChangeEvent } from "react";
import { useTranslation } from "../../providers/i18n.provider";
import { useSettings } from "../../providers/settings.provider";
import { Language, System } from "../../utils/util.types";

export function SettingsPage() {
  const { t } = useTranslation();
  const { settings, changeSettings } = useSettings();

  const handleSystemChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeSettings({
      ...settings,
      system: e.target.value as System,
    });
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeSettings({
      ...settings,
      language: e.target.value as Language,
    });
  };

  return (
    <main>
      <section>
        <fieldset>
          <legend>{t("SETTINGS-SYSTEM")}</legend>
          <label htmlFor="pfrpg">
            <input
              id="pfrpg"
              type="radio"
              name="system"
              value="pfrpg"
              checked={settings.system === "pfrpg"}
              onChange={handleSystemChange}
            />
            {t("PATHFINDER")}
          </label>
          <label htmlFor="dnd3">
            <input
              id="dnd3"
              type="radio"
              name="system"
              value="dnd3"
              checked={settings.system === "dnd3"}
              onChange={handleSystemChange}
            />
            {t("DnD3.5")}
          </label>
          <label htmlFor="dnd5">
            <input
              id="dnd5"
              type="radio"
              name="system"
              value="dnd5"
              checked={settings.system === "dnd5"}
              onChange={handleSystemChange}
            />
            {t("DnD5")}
          </label>
        </fieldset>

        <fieldset>
          <legend>{t("SETTINGS-LANGUAGE")}</legend>
          <label htmlFor="en">
            <input
              id="en"
              type="radio"
              name="language"
              value="en"
              checked={settings.language === "en"}
              onChange={handleLanguageChange}
            />
            ENGLISH
          </label>
          <label htmlFor="es">
            <input
              id="es"
              type="radio"
              name="language"
              value="es"
              checked={settings.language === "es"}
              onChange={handleLanguageChange}
            />
            SPANISH
          </label>
        </fieldset>
      </section>
    </main>
  );
}
