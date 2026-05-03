import React, { useState, StrictMode, MouseEvent } from "react";
import "./style.css";
import "./pico.css";
import { routes, Routes } from "./pages/routes";
import { useSettings } from "./providers/settings.provider";
import { System } from "./utils/util.types";
import { useTranslation } from "./providers/i18n.provider";
import { Icon } from "./components/icon";
import { systemMap } from "./utils/const";
import { useCards } from "./providers/cards.provider";

const getHeaderTitle = (system: System, route: string, t: (key: string) => string) => {
  switch (route) {
    case routes.HOME:
      return `${t(systemMap[system])}`;
    case routes.HELP:
      return t("HELP-TITLE");
    case routes.LICENSE:
      return t("LICENSE-TITLE");
    case routes.GLOSSARY:
      return `${t("RULETIPS-TITLE")} (${t(system)})`;
    case routes.SETTINGS:
      return t("SETTINGS-TITLE");
    default:
      return "HURR DURR";
  }
};

export const App = () => {
  const [isAppMenuOpen, setAppMenuOpen] = useState(false);
  const { settings } = useSettings();
  const { t, isI18nLoading } = useTranslation();
  const { drawnCards, reset } = useCards();
  const [route, setRoute] = useState<string>(routes.HOME);

  const handleMenuSelect = (e: MouseEvent<HTMLElement>, path: string) => {
    e.preventDefault();
    setRoute(path);
    setAppMenuOpen(false);
  };

  const canReset = drawnCards.length > 0;

  return (
    <StrictMode>
      <div className={["overlayContainer", isAppMenuOpen && "active"].filter(Boolean).join(" ")}>
        <aside className={"sideMenu"}>
          <h3>
            <Icon type="d20s" width="24px" height="24px" />
            Critical Reroll
          </h3>
          {Object.values(routes).map((path) => (
            <a key={path} onClick={(e) => handleMenuSelect(e, path)}>
              {path}
            </a>
          ))}
        </aside>
        <div className="overlay" onClick={() => setAppMenuOpen(false)}></div>
      </div>
      <header>
        <button className="menuButton" onClick={() => setAppMenuOpen((prev) => !prev)}>
          <Icon type="kebab" width="24px" height="24px" />
        </button>
        <h4 style={{ marginBottom: 0 }}>{getHeaderTitle(settings.system, route, t)}</h4>
        {canReset && (
          <button
            className="resetButton secondary"
            onClick={reset}
            data-tooltip="Reset"
            data-placement="bottom"
          >
            <Icon type="trash" width="24px" height="24px" />
          </button>
        )}
      </header>
      {isI18nLoading && <span aria-busy="true">Loading texts...</span>}
      {!isI18nLoading && <Routes route={route} />}
    </StrictMode>
  );
};
