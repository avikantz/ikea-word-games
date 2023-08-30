export const getLocalizedPath = (path: string, locale: string = "en") => {
  return `/${locale}${path}`;
};

export const PATH_EMAIL = "mailto:avikantsainidbz@gmail.com?subject=Hello%20from%20ordspel";

export const PATH_FAQ = "/faq";
export const PATH_CONTACT = "/contact";

export const PATH_JUMBLE = "/jumble";
export const PATH_JUMBLE_EASY = `${PATH_JUMBLE}/easy`;
export const PATH_JUMBLE_MEDIUM = `${PATH_JUMBLE}/medium`;
export const PATH_JUMBLE_HARD = `${PATH_JUMBLE}/hard`;
export const PATH_JUMBLE_INSANE = `${PATH_JUMBLE}/insane`;
export const PATH_JUMBLE_CUSTOM = `${PATH_JUMBLE}/custom`;

export const PATH_BILDVAL = "/bildval";
export const PATH_BILDVAL_EASY = `${PATH_BILDVAL}/easy`;
export const PATH_BILDVAL_MEDIUM = `${PATH_BILDVAL}/medium`;
export const PATH_BILDVAL_HARD = `${PATH_BILDVAL}/hard`;
export const PATH_BILDVAL_INSANE = `${PATH_BILDVAL}/insane`;
export const PATH_BILDVAL_UNLIMITED = `${PATH_BILDVAL}/unlimited`;

export const PATH_ORDVAL = "/ordval";
export const PATH_ORDVAL_EASY = `${PATH_ORDVAL}/easy`;
export const PATH_ORDVAL_MEDIUM = `${PATH_ORDVAL}/medium`;
export const PATH_ORDVAL_HARD = `${PATH_ORDVAL}/hard`;
export const PATH_ORDVAL_INSANE = `${PATH_ORDVAL}/insane`;
export const PATH_ORDVAL_UNLIMITED = `${PATH_ORDVAL}/unlimited`;

export const PATH_WORDLE = "/wordle";
