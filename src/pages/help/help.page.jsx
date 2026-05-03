import React from "react";
import { useTranslation } from "../../providers/i18n.provider";
import { Icon } from "../../components/icon";
import { EXTERNAL_LINK_URLS } from "../../utils/const";

export function HelpPage() {
  const { t } = useTranslation();

  return (
    <main>
      <section>
        <h3>{t("HELP-INTO-TITLE")}</h3>
        <p>{t("HELP-INTO-TEXT-1")}</p>
        <p>{t("HELP-INTO-TEXT-2")}</p>
        <p>{t("HELP-INTO-TEXT-3")}</p>
        <ul>
          <li>
            <a className="link" href={EXTERNAL_LINK_URLS.pathfinderRPG} target="_blank">
              {" "}
              Pathfinder RPG
            </a>
          </li>
          <li>
            <a className="link" href={EXTERNAL_LINK_URLS.dnd5} target="_blank">
              {" "}
              Dungeon and Dragons 5th
            </a>
          </li>
          <li>
            <a className="link" href={EXTERNAL_LINK_URLS.dnd3} target="_blank">
              {" "}
              Dungeon and Dragons 3.5
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h3>
          <span className="help-title">{t("HELP-CRITICAL-TITLE")}</span>
        </h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <span className="circleButtonWrapper critical" data-tooltip="critical slashing">
            <Icon type="critical-slashing" width="24px" height="24px" />
          </span>
          <span className="circleButtonWrapper critical" data-tooltip="critical piercing">
            <Icon type="critical-piercing" width="24px" height="24px" />
          </span>
          <span className="circleButtonWrapper critical" data-tooltip="critical bludgeoning">
            <Icon type="critical-bludgeoning" width="24px" height="24px" />
          </span>
          <span className="circleButtonWrapper critical" data-tooltip="critical magic">
            <Icon type="critical-magic" width="24px" height="24px" />
          </span>
        </div>
        <p>{t("HELP-CRITICAL-TEXT-MAIN")}</p>
        <h4>{t("HELP-CRITICAL-TEXT-PF")}</h4>
        <p>{t("HELP-CRITICAL-TEXT-PF-1")}</p>
        <p>{t("HELP-CRITICAL-TEXT-PF-2")}</p>
        <h4>{t("HELP-CRITICAL-TEXT-DND5")}</h4>
        <p>{t("HELP-CRITICAL-TEXT-DND5-1")}</p>
      </section>

      <section>
        <div className="row">
          <h3>
            <span className="help-title">{t("HELP-FUMBLE-TITLE")}</span>
          </h3>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <span className="circleButtonWrapper fumble" data-tooltip="fumble melee">
            <Icon type="fumble-melee" width="24px" height="24px" />
          </span>
          <span className="circleButtonWrapper fumble" data-tooltip="fumble ranged">
            <Icon type="fumble-ranged" width="24px" height="24px" />
          </span>
          <span className="circleButtonWrapper fumble" data-tooltip="fumble natural">
            <Icon type="fumble-natural" width="24px" height="24px" />
          </span>
          <span className="circleButtonWrapper fumble" data-tooltip="fumble magic">
            <Icon type="fumble-magic" width="24px" height="24px" />
          </span>
        </div>
        <p>{t("HELP-FUMBLE-TEXT-MAIN")}</p>
        <p>{t("HELP-FUMBLE-TEXT-2")}</p>
        <p>{t("HELP-FUMBLE-TEXT-1")}</p>
        <h4>{t("HELP-FUMBLE-TEXT-CONFIRMATION")}</h4>
        <p>{t("HELP-FUMBLE-TEXT-CONFIRMATION-TEXT")}</p>
      </section>

      <section>
        <div className="col">
          <div className="row">
            <h3>
              <span className="help-title">{t("HELP-FEEDBACK-TITLE")}</span>
            </h3>
          </div>
          <p>{t("HELP-FEEDBACK-TEXT-1")}</p>
          <p>{t("HELP-FEEDBACK-TEXT-2")}</p>
          <p>{t("HELP-FEEDBACK-TEXT-3")}</p>
          <ul>
            <li>
              <a href={EXTERNAL_LINK_URLS.pathfinderRPG} target="_blank">
                {" "}
                {t("HELP-FEEDBACK-TEXT-4")}
              </a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
