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
  P = SizeType.T + 10,
}

export function ConvertSize(size: number, sizeType: SizeType = SizeType.B) {
  if (!size) return '';
  if ((size >> sizeType) < 1024) return `${size >> sizeType}${sizeType - 10 >= 0 ? '.' + (size >> (sizeType - 10)).toString().slice(-4, -2) : ''} ${SizeType[sizeType]}`;
  else return ConvertSize(size, sizeType + 10);
}
// export function ConvertSize(size: number) {
//   if (!size) return '';
//   size /= 1.0;
//   const sizeUnits: string[] = ['B', 'K', 'M', 'G', 'T'];
//   for (let i = 0; i < sizeUnits.length; i++) {
//     console.log(size);
//     if (size < 1024) return size.toFixed(2) + sizeUnits[i];
//     size /= 1024.0;
//   }
//   return '';
// }
