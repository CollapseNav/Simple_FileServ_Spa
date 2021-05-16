export interface BaseFile {
  id: string;
  fileName: string;
  size: number;
  addTime: Date;
  isVisible: boolean;
  parentId: string;
  mapPath: string;
  ext: string;
}


export interface MFile extends BaseFile {
  contentType: string;
}

export interface Dir extends BaseFile {
  files: MFile[];
  dirs: Dir[];
}

export enum SizeType {
  B = 0,
  K = SizeType.B + 10,
  M = SizeType.K + 10,
  G = SizeType.M + 10,
  T = SizeType.G + 10,
}

export function ConvertSize(size: number, sizeType: SizeType = SizeType.B): string {
  if (!size) return '';
  const levelTwoType: SizeType = sizeType + 10;
  const result: Number = size >> levelTwoType;
  if (result < 1) return `${size >> sizeType} ${SizeType[sizeType]}`;
  if (result < 1024) return `${result}.${(size >> (sizeType)).toString().slice(-4, -2)} ${SizeType[levelTwoType]}`;
  return ConvertSize(size, sizeType + 10);
}

