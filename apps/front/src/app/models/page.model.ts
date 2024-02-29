export interface PageResponse {
  page: Page;
}

export interface PagesResponse {
  pages: Page[];
}

export interface Page {
  date:    Date;
  feeling: string;
  main:    string;
  notes:   string;
  music:   string;
  user:    string;
  status:  boolean;
  _id:     string;
}
