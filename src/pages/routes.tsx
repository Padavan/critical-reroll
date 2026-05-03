import React from "react";
import { HomePage } from "./home";
import { LicensePage } from "./license";
import { SettingsPage } from "./settings";
import { HelpPage } from "./help";
import { GlossaryPage } from "./glossary";

export const routes = Object.freeze({
  HOME: "HOME",
  HELP: "HELP",
  GLOSSARY: "GLOSSARY",
  SETTINGS: "SETTINGS",
  LICENSE: "LICENSE",
});

export function Routes(props: { route: string }) {
  if (props.route === routes.HOME) {
    return <HomePage />;
  }

  if (props.route === routes.LICENSE) {
    return <LicensePage />;
  }

  if (props.route === routes.SETTINGS) {
    return <SettingsPage />;
  }

  if (props.route === routes.HELP) {
    return <HelpPage />;
  }

  if (props.route === routes.GLOSSARY) {
    return <GlossaryPage />;
  }

  return null;
}
