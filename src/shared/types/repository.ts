export interface IMongoSearchTotalCountItem {
  count: number;
}

export interface IMongoSearch {
  items: any[],
  totalCount: IMongoSearchTotalCountItem[]
}

export interface IMongoSearchResults {
  items: any[],
  totalCount: number
}

export interface IMatchRegex {
  $regex: string,
  $options: string
}

export type IMatchOrPart = Record<string, IMatchRegex>;

export interface IMatchOr {
  $or: IMatchOrPart[];
}