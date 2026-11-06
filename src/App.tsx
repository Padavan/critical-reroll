import React, { useState, StrictMode, MouseEvent } from "react";
import "./style.css";
import "./pico.css";
import { routes, Routes } from "./pages/routes";
import { useTranslation } from "./providers/i18n.provider";
import { useClickOutside } from "./utils/use-click-outside";

const getHeaderTitle = (route: string, t: (key: string) => string) => {
  switch (route) {
    case routes.HOME:
      return "critical roll";
    case routes.HELP:
      return t("HELP-TITLE");
    case routes.LICENSE:
      return t("LICENSE-TITLE");
    case routes.GLOSSARY:
      return t("RULETIPS-TITLE");
    case routes.SETTINGS:
      return t("SETTINGS-TITLE");
    default:
      return "HURR DURR";
  }
};

export const App = () => {
  const [isAppMenuOpen, setAppMenuOpen] = useState(false);
  const { t, isI18nLoading } = useTranslation();
  const [route, setRoute] = useState<string>(routes.HOME);

  const handleMenuSelect = (e: MouseEvent<HTMLElement>, path: string) => {
    e.preventDefault();
    setRoute(path);
    setAppMenuOpen(false);
  };

  const handler = () => {
    if (isAppMenuOpen) {
      setAppMenuOpen(false);
    }
  };

  const menuRef = useClickOutside<HTMLDivElement>(handler);

  return (
    <StrictMode>
      <header>
        <button
          aria-expanded={isAppMenuOpen}
          className="menuButton"
          onClick={() => setAppMenuOpen((prev) => !prev)}
        >
          [ &#8801; ]
        </button>
        <h4 style={{ marginBottom: 0 }}>[{getHeaderTitle(route, t)}]</h4>
      </header>
      <div
        ref={menuRef}
        className={["dropdownMenu", isAppMenuOpen ? "dropdownMenuOpen" : "dropdownMenuClose"].join(
          " ",
        )}
      >
        <ul>
          {Object.values(routes).map((path) => (
            <li>
              <a key={path} onClick={(e) => handleMenuSelect(e, path)}>
                {path}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {isI18nLoading && <span aria-busy="true">Loading texts...</span>}
      {!isI18nLoading && <Routes route={route} />}
    </StrictMode>
  );
};
