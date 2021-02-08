/**
 * 表格缓存配置
 */
export interface PageConfig {
  /**
   * 缓存的 批次
   * @description
   *
   * 概念上应该是 缓存 的 index
   *
   * 一 '批次' 的大小为 size * cache
   */
  patch: number;

  /**
   * 表格中一页需要显示的数据量
   */
  size: number;
  /**
   * 缓存页数
   */
  cache: number;
  /**
   * 当 (表格.index + limit) >= (index * cache) 时
   *
   * 应该请求下一个 '批次' 的缓存
   */
  limit: number;
}
