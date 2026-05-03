import React, { ReactNode, useEffect, useRef, useState } from "react";
import reactStringReplace from "react-string-replace";
import { Icon } from "../../components/icon";
import { useTranslation } from "../../providers/i18n.provider";
import { useCards } from "../../providers/cards.provider";

export function HomePage() {
  const { t } = useTranslation();
  const { drawnCards, hasCardsToDraw, drawCard } = useCards();
  const [statusKey, setStatusKey] = useState<string | null>(null);
  const bottomRef = useRef<HTMLElement | null>(null);

  const showModal = (statusKeyToShow: string) => {
    setStatusKey(statusKeyToShow);
  };

  const getReplaceText = (input: string, t: (key: string) => string) => {
    let resultInput: string | ReactNode[] = t(input);

    const re = /%([\w\s-]+)=([\w\sñáéíóú-]+)%/g;
    const matchResultList = [...resultInput.matchAll(re)];

    for (const matchResult of matchResultList) {
      const [match, status_key, status] = matchResult;
      if (status_key) {
        resultInput = reactStringReplace(resultInput, match, () => (
          <a onClick={() => showModal(status_key)}>{status}</a>
        ));
      }
    }

    return resultInput;
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [drawnCards]);

  return (
    <div className="homePage">
      <div className="cardsSection">
        {drawnCards.map((card) => {
          return (
            <details name="rule" key={card.title} role="button" className="outline contrast">
              <summary>
                <span className={[card.primaryType, "circleButtonWrapper"].join(" ")}>
                  <Icon
                    style={{ fill: "white", width: "24px", height: "24px" }}
                    type={`${card.primaryType}-${card.secondaryType}`}
                  />
                </span>
                {t(card.title)}
              </summary>
              <p style={{ textAlign: "left" }}>{getReplaceText(card.text, t)}</p>
            </details>
          );
        })}
        <span ref={bottomRef} />
      </div>

      <section className="buttonBarSection">
        <div className="buttonBar">
          <button
            data-tooltip="critical slashing"
            className="outline critical"
            onClick={() => drawCard("critical", "slashing")}
            disabled={!hasCardsToDraw("critical", "slashing")}
          >
            <Icon
              style={{ fill: "white", width: "48px", height: "48px" }}
              type="critical-slashing"
            />
          </button>
          <button
            data-tooltip="critical piercing"
            className="outline critical"
            onClick={() => drawCard("critical", "piercing")}
            disabled={!hasCardsToDraw("critical", "piercing")}
          >
            <Icon
              style={{ fill: "white", width: "48px", height: "48px" }}
              type="critical-piercing"
            />
          </button>
          <button
            data-tooltip="critical bludgeoning"
            className="outline critical"
            onClick={() => drawCard("critical", "bludgeoning")}
            disabled={!hasCardsToDraw("critical", "bludgeoning")}
          >
            <Icon
              style={{ fill: "white", width: "48px", height: "48px" }}
              type="critical-bludgeoning"
            />
          </button>
          <button
            data-tooltip="critical magic"
            className="outline critical"
            onClick={() => drawCard("critical", "magic")}
            disabled={!hasCardsToDraw("critical", "magic")}
          >
            <Icon style={{ fill: "white", width: "48px", height: "48px" }} type="critical-magic" />
          </button>
        </div>

        <div className="buttonBar">
          <button
            data-tooltip="fumble melee"
            className="outline fumble"
            onClick={() => drawCard("fumble", "melee")}
            disabled={!hasCardsToDraw("fumble", "melee")}
          >
            <Icon style={{ fill: "white", width: "48px", height: "48px" }} type="fumble-melee" />
          </button>
          <button
            data-tooltip="fumble ranged"
            className="outline fumble"
            onClick={() => drawCard("fumble", "ranged")}
            disabled={!hasCardsToDraw("fumble", "ranged")}
          >
            <Icon style={{ fill: "white", width: "48px", height: "48px" }} type="fumble-ranged" />
          </button>
          <button
            data-tooltip="fumble natural"
            className="outline fumble"
            onClick={() => drawCard("fumble", "natural")}
            disabled={!hasCardsToDraw("fumble", "natural")}
          >
            <Icon style={{ fill: "white", width: "48px", height: "48px" }} type="fumble-natural" />
          </button>
          <button
            data-tooltip="fumble magic"
            className="outline fumble"
            onClick={() => drawCard("fumble", "magic")}
            disabled={!hasCardsToDraw("fumble", "magic")}
          >
            <Icon style={{ fill: "white", width: "48px", height: "48px" }} type="fumble-magic" />
          </button>
        </div>
      </section>

      {statusKey && (
        <dialog id={statusKey} open>
          <article>
            <h3>{t(statusKey + "-TITLE")}</h3>
            <p dangerouslySetInnerHTML={{ __html: t(statusKey + "-TEXT") }}></p>
            <footer>
              <button autoFocus onClick={() => setStatusKey(null)}>
                Close
              </button>
            </footer>
          </article>
        </dialog>
      )}
    </div>
  );
}
