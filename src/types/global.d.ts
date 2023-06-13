interface DataBasis {
  authorId: String;
  authorName: String;
  createTime: string;
  description: String;
  musicAuthor: String;
  musicId: String;
  musicTitle: String;
  occurrencies: Number;
  videoId: String;
}

export interface GlobalData extends DataBasis {
  comments: number;
  countries: Array<String>;
  likes: number;
  samplingTime: string;
  shares: number;
}

export interface GlobalDataParsed extends GlobalData {
  countryNames: Array<String>;
}

export interface TopByCountryData extends DataBasis {
  comments: never;
  countries: never;
  likes: never;
  countryNames: never;
  shares: never;
  samplingTime: never;
  countryCode: string;
}
export interface TopByCountryDataParsed extends TopByCountryData {
  countryCode: String;
}

type DateWithNewMember<T> = Partial<T> & { newMember: boolean };

export type CountryCodes = {
  name: String;
  three: String;
  two: String;
};
