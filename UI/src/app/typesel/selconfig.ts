export interface SelItemConfig {
  icon: string;
  title: string;
}

export interface SelConfig {
  list: SelItemConfig[];
  count: number;
  selected: SelItemConfig[];

}
