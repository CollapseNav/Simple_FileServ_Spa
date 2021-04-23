export interface SelItemConfig {
  icon: string;
  title: string;
}

export interface SelConfig {
  list: FileType[];
  count: number;
}

export interface FileType extends SelectItem {
  id?: string;
  name?: string;
  ext?: string;
  icon?: string;
}

export interface SelectItem {
  selected?: boolean;
}
