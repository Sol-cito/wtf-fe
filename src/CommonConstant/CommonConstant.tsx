export const KOREAN_REGAX = /^[가-힣\s]+$/;

export const ENGLISH_REGAX = /^[a-zA-Z\s]*$/;

export const NUMBER_REGAX = /^[0-9\b -]{0,13}$/;

export const DATE_REGAX =
  /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;

export const EMAIL_REGAX = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
