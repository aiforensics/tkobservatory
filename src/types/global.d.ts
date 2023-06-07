export type GlobalData = {
  authorId: String;
  authorName: String;
  countries: Array<String>;
  createTime: String;
  description: String;
  musicAuthor: String;
  musicId: String;
  musicTitle: String;
  occurrencies: Number;
  videoId: String;
};

export type GlobalDataParsed = GlobalData & {
  countryNames: Array<String>;
};

type DateWithNewMember<T> = Partial<T> & { newMember: boolean };

export type CountryCodes = {
  name: String;
  three: String;
  two: String;
};

export type TopByCountryData = {
  authorId: String;
  authorName: String;
  countryCode: String;
  createTime: String;
  description: String;
  musicAuthor: String;
  musicId: String;
  musicTitle: String;
  occurrencies: Number;
  videoId: String;
};

export type DataItem = {
  authorId: String;
  authorName: String;
  countryCode?: String;
  createTime: String;
  description: String;
  musicAuthor: String;
  musicId: String;
  musicTitle: String;
  occurrencies: Number;
  videoId: String;
  countries?: Array<String>;
  countryNames?: Array<String>;
};
