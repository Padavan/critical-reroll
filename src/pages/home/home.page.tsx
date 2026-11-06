import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Icon } from "../../components/icon";
import { useTranslation } from "../../providers/i18n.provider";
import { useCards } from "../../providers/cards.provider";
import { systemMap } from "../../utils/const";
import { useSettings } from "../../providers/settings.provider";

function replaceString(str: string, match: string, fn: (s: string) => ReactNode): ReactNode[] {
  if (str === "") {
    return [str];
  } else if (!str || !(typeof str === "string")) {
    throw new TypeError("First argument to react-string-replace#replaceString must be a string");
  }

  const re = match;

  const result: Array<string> = str.split(re);

  return result.map((part, i) => (i % 2 === 0 ? (part as ReactNode) : fn(part)));
}

function reactStringWithReactNodes(
  source: ReactNode[],
  match: string,
  fn: (s: string) => ReactNode,
) {
  if (!Array.isArray(source)) source = [source];

  return source
    .map((x) => {
      if (typeof x === "string") {
        return replaceString(x, match, fn);
      } else {
        return x;
      }
    })
    .flat();
}

export function HomePage() {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const { drawnCards, hasCardsToDraw, drawCard, reset } = useCards();
  const [statusKey, setStatusKey] = useState<string | null>(null);
  const bottomRef = useRef<HTMLElement | null>(null);

  const showModal = (statusKeyToShow: string) => {
    setStatusKey(statusKeyToShow);
  };

  const getReplaceText = (input: string, t: (key: string) => string) => {
    const startInput = t(input);

    const re = /%([\w\s-]+)=([\w\sñáéíóú-]+)%/g;
    const matchResultList = [...startInput.matchAll(re)];

    let resultInput: ReactNode[] = [startInput];
    for (const matchResult of matchResultList) {
      const [match, status_key, status] = matchResult;
      // resultInput = reactStringWithReactNodes(resultInput, match, () => (
      if (status_key) {
        resultInput = reactStringWithReactNodes(resultInput, match, () => (
          <a onClick={() => showModal(status_key)}>{status}</a>
        ));
      }
    }

    return resultInput;
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [drawnCards]);

  const isCanReset = drawnCards.length > 0;

  return (
    <div className="homePage">
      <div className="cardsSection">
        <div className="cardsTop">
          <article style={{ width: "100%", margin: 0 }}>
            <h5 style={{ marginBottom: 0 }}>
              {t("CARDS-SYSTEM")}: {t(systemMap[settings.system])}
            </h5>
            <small>{drawnCards.length} cards </small>
          </article>
          {isCanReset && (
            <button
              className="secondary"
              style={{ aspectRatio: 1, maxWidth: "80px" }}
              data-tooltip={t("CARDS-RESET")}
              data-placement="left"
              onClick={reset}
            >
              <Icon type="trash" width="24px" height="24px" />
            </button>
          )}
        </div>

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
              <p style={{ textAlign: "left" }}>
                {getReplaceText(card.text, t).map((x) =>
                  typeof x === "string" ? <span dangerouslySetInnerHTML={{ __html: x }} /> : x,
                )}
              </p>
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
