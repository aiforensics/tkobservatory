interface DataBasis {
  authorId: String;
  authorName: any;
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

export interface SearchDataParsed extends GlobalData {
  views: number;
  countryNames: Array<String>;
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
export interface searchResults {
  searchKey: string;
  data: SearchDataParsed[];
  selected: string;
}

export interface clickedCountryType {
  name: string | undefined;
  available: boolean;
  id: string | undefined;
}
