export interface RootObject {
    checksum: string;
    roots: Roots;
    version: string;
  }

  export interface Roots {
    bookmark_bar: BookmarkBar;
    [key: string]: BookmarkBar;
  }

  export interface BookmarkBar {
    children: Child2[];
    date_added: string;
    date_modified?: string;
    id: string;
    name: string;
  }

  export interface Child2 {
    id: string;
    name: string;
    date_added: string;
    date_modified?: string;
    type: string;
    children: Child[];
    date_last_used?: string;
  }
  export interface Child {
    date_added: string;
    date_modified?: string;
    id: string;
    date_last_used?: string;
    name: string;
    type: string;
    url: string;
  }

  export interface BookmarkItem {
    id: string;
    name: string;
    date_added: string;
    date_modified?: string;
    type: string;
    children?: BookmarkItem[];
    url?: string;
    date_last_used?: string;
  }