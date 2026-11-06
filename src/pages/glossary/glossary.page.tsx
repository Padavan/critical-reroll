import React from "react";
import { System } from "../../utils/util.types";
import { useTranslation } from "../../providers/i18n.provider";
import { useSettings } from "../../providers/settings.provider";
import { systemMap } from "../../utils/const";

function ruletips(system: System) {
  if (system == "dnd5") {
    return [
      {
        title: "RULETIP-SECTION-DAMAGE",
        rules: ["ABILITY-REDUCTION", "OBJECT-DAMAGE"],
      },
      {
        title: "RULETIP-SECTION-SAVES",
        rules: ["SAVE-CRITICAL", "SAVE-FUMBLE", "UNTIL-HEALED"],
      },
      {
        title: "RULETIP-SECTION-ABILITY",
        rules: [
          "ABILITY-STR",
          "ABILITY-DEX",
          "ABILITY-CON",
          "ABILITY-INT",
          "ABILITY-WIS",
          "ABILITY-CHA",
        ],
      },
      {
        title: "RULETIP-SECTION-STATUS",
        rules: [
          "STATUS-BLINDED",
          "STATUS-CHARMED",
          "STATUS-CONFUSED",
          "STATUS-DEAFENED",
          "STATUS-EXHAUSTED",
          "STATUS-FRIGHTENED",
          "STATUS-INCAPACITATED",
          "STATUS-INCORPOREAL",
          "STATUS-INVISIBLE",
          "STATUS-LIFE-DRAIN",
          "STATUS-PETRIFIED",
          "STATUS-POISONED",
          "STATUS-PRONE",
          "STATUS-RESTRAINED",
          "STATUS-STUNNED",
          "STATUS-UNCONSCIOUS",
        ],
      },
      {
        title: "RULETIP-SECTION-EXTRA",
        rules: ["DESCRIPTION-ITEM-DRAWBACKS", "DESCRIPTION-ROD-OF-WONDER"],
      },
    ];
  } else {
    return [
      {
        title: "RULETIP-SECTION-DAMAGE",
        rules: [
          "ABILITY-DAMAGE",
          "ABILITY-DRAIN",
          "NONLETHAL-DAMAGE",
          "OBJECT-DAMAGE",
          "STATUS-NEGATIVE-LEVEL",
        ],
      },
      {
        title: "RULETIP-SECTION-SAVES",
        rules: ["UNTIL-HEALED", "SAVE-CRITICAL", "SAVE-FUMBLE"],
      },
      {
        title: "RULETIP-SECTION-ABILITY",
        rules: [
          "ABILITY-STR",
          "ABILITY-DEX",
          "ABILITY-CON",
          "ABILITY-INT",
          "ABILITY-WIS",
          "ABILITY-CHA",
        ],
      },
      {
        title: "RULETIP-SECTION-STATUS",
        rules: [
          "STATUS-BLEED",
          "STATUS-BLINDED",
          "STATUS-CONFUSED",
          "STATUS-DAZED",
          "STATUS-DAZZLED",
          "STATUS-DEAFENED",
          "STATUS-DYING",
          "STATUS-ENTANGLED",
          "STATUS-EXHAUSTED",
          "STATUS-FATIGUED",
          "STATUS-FLAT-FOOTED",
          "STATUS-FRIGHTENED",
          "STATUS-HELPLESS",
          "STATUS-INCORPOREAL",
          "STATUS-INVISIBLE",
          "STATUS-NAUSEATED",
          "STATUS-PANICKED",
          "STATUS-PARALYZED",
          "STATUS-PETRIFIED",
          "STATUS-PRONE",
          "STATUS-SHAKEN",
          "STATUS-SICKENED",
          "STATUS-STABLE",
          "STATUS-STAGGERED",
          "STATUS-STUNNED",
          "STATUS-UNCONSCIOUS",
        ],
      },
      {
        title: "RULETIP-SECTION-EXTRA",
        rules: ["DESCRIPTION-ITEM-DRAWBACKS", "DESCRIPTION-ROD-OF-WONDER"],
      },
    ];
  }
}

export function GlossaryPage() {
  const { settings } = useSettings();
  const { t } = useTranslation();

  return (
    <main>
      <section>
        <article style={{ width: "100%", margin: 0 }}>
          <h5 style={{ marginBottom: 0 }}>
            {t("CARDS-SYSTEM")}: {t(systemMap[settings.system])}
          </h5>
        </article>
      </section>
      {ruletips(settings.system).map((section) => (
        <section key={section.title}>
          <h3>{t(section.title)}</h3>
          {section.rules.map((rule) => (
            <details key={rule} name="rule" role="button" className="outline contrast">
              <summary>{t(`${rule}-TITLE`)}</summary>
              <p
                dangerouslySetInnerHTML={{ __html: t(`${rule}-TEXT`) }}
                className="detailsContent"
              />
            </details>
          ))}
        </section>
      ))}
    </main>
  );
}
