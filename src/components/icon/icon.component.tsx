import React, { ReactElement, SVGProps } from "react";

import { IconBug } from "./icon-bug";
import { IconCriticalBludgeoning } from "./icon-critical-bludgeoning";
import { IconCriticalMagic } from "./icon-critical-magic";
import { IconCriticalPiercing } from "./icon-critical-piercing";
import { IconCriticalSlashing } from "./icon-critical-slashing";
import { IconD20 } from "./icon-d20";
import { IconD20s } from "./icon-d20s";
import { IconFumbleMagic } from "./icon-fumble-magic";
import { IconFumbleMelee } from "./icon-fumble-melee";
import { IconFumbleNatural } from "./icon-fumble-natural";
import { IconFumbleRanged } from "./icon-fumble-ranged";
import { IconGlossary } from "./icon-glossary";
import { IconHelp } from "./icon-help";
import { IconLicense } from "./icon-license";
import { IconNav } from "./icon-navicon";
import { IconSettings } from "./icon-settings";
import { IconShare } from "./icon-share";
import { IconTrash } from "./icon-trash";

const iconMapping: Record<string, (props: SVGProps<SVGSVGElement>) => ReactElement> = {
  bug: IconBug,
  "critical-bludgeoning": IconCriticalBludgeoning,
  "critical-magic": IconCriticalMagic,
  "critical-piercing": IconCriticalPiercing,
  "critical-slashing": IconCriticalSlashing,
  d20: IconD20,
  d20s: IconD20s,
  "fumble-magic": IconFumbleMagic,
  "fumble-melee": IconFumbleMelee,
  "fumble-natural": IconFumbleNatural,
  "fumble-ranged": IconFumbleRanged,
  glossary: IconGlossary,
  help: IconHelp,
  license: IconLicense,
  nav: IconNav,
  settings: IconSettings,
  share: IconShare,
  trash: IconTrash,
};

interface IconProps extends SVGProps<SVGSVGElement> {
  type: string;
}
export function Icon({ type, ...rest }: IconProps) {
  const IconComponent = iconMapping[type];

  if (IconComponent) {
    return <IconComponent {...rest} />;
  }

  console.error("Unknown icon type: ", type);
  return null;
}
