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
  B = 1,
  K = SizeType.B << 10,
  M = SizeType.K << 10,
  G = SizeType.M << 10,
}
