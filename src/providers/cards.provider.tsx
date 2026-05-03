import React, { useState, useContext, PropsWithChildren, useEffect } from "react";
import { CARD_QUANTITY } from "../utils/const";
import { useSettings } from "./settings.provider";

type Deck = Record<string, Record<string, number[]>>;

type Card = {
  primaryType: string;
  secondaryType: string;
  title: string;
  text: string;
};

type CardsContextType = {
  drawnCards: Card[];
  hasCardsToDraw: (primaryType: string, secondaryType: string) => boolean;
  drawCard: (primaryType: string, secondaryType: string) => void;
  reset: () => void;
};

function initDeck(): Deck {
  const emptyDeck: Deck = {
    critical: { slashing: [], piercing: [], bludgeoning: [], magic: [] },
    fumble: { melee: [], ranged: [], natural: [], magic: [] },
  };

  for (const primaryType in emptyDeck) {
    for (const secondaryType in emptyDeck[primaryType]) {
      emptyDeck[primaryType][secondaryType] = Array.from(
        { length: CARD_QUANTITY },
        (_, i) => i + 1,
      );
    }
  }

  return emptyDeck;
}

const CardsContext = React.createContext<CardsContextType>({
  drawnCards: [] as Card[],
  hasCardsToDraw: (_primaryType: string, _secondaryType: string) => false,
  drawCard: (_primaryType: string, _secondaryType: string) => {},
  reset: () => {},
});

const CardsProvider = (props: PropsWithChildren) => {
  const [deck, setDeck] = useState<Deck>(initDeck());
  const [drawnCards, setDrawnCards] = useState<Card[]>([]);
  const { settings } = useSettings();

  const hasCardsToDraw = (primaryType: string, secondaryType: string) => {
    return (deck[primaryType]?.[secondaryType] ?? []).length > 0;
  };

  const reset = () => {
    setDeck(initDeck());
    setDrawnCards([]);
  };

  const drawCard = (primaryType: string, secondaryType: string) => {
    const list = deck[primaryType]?.[secondaryType] ?? [];
    const cardIndex = Math.floor(Math.random() * list?.length);

    const cardNameTemplate = `${primaryType.toUpperCase()}-${secondaryType.toUpperCase()}-${list[cardIndex]}`;

    const cardDrawn = {
      primaryType: primaryType,
      secondaryType: secondaryType,
      title: cardNameTemplate + "-TITLE",
      text: cardNameTemplate + "-TEXT",
    };
    setDrawnCards((prev) => [...prev, cardDrawn]);
    setDeck((prev) => ({
      ...prev,
      [primaryType]: {
        ...prev[primaryType],
        [secondaryType]: list.filter((_, i) => i !== cardIndex),
      },
    }));
  };

  useEffect(() => {
    reset();
  }, [settings]);

  return (
    <CardsContext.Provider
      value={{
        drawnCards,
        hasCardsToDraw,
        drawCard,
        reset,
      }}
    >
      {props.children}
    </CardsContext.Provider>
  );
};

const useCards = () => useContext<CardsContextType>(CardsContext);

export { CardsContext, CardsProvider, useCards };
