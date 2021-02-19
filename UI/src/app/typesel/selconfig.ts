export interface SelItemConfig {
  icon: string;
  title: string;
}

export interface SelConfig {
  list: FileType[];
  count: number;
  selected: FileType[];

}

export interface FileType {
  id?: string;
  name?: string;
  ext?: string;
  icon?: string;
}
