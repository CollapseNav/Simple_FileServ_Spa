# Simple_FileService

## 目的

写一个简单的文件服务
从原来的 [Simple_FileService](https://github.com/CollapseNav/Simple_FileService/tree/spa)中迁移过来的
单独开了个仓库

## 所用技术相关

* `.net core`
* `angular`
* `angular material`

##### 基础功能

删除下载之类的基础功能

- [ ] 上传
  - [x] 单文件上传
  - [x] 多文件上传
  - [ ] 重名提示
- [ ] 新建文件夹
  - [x] 单独的弹窗
  - [x] 基础新建文件夹
  - [x] 回车触发事件
  - [ ] 重名提示
- [x] 下载
  - [x] 基础下载功能
- [ ] 删除
  - [x] 基础的删除功能
    - 不打算做回收站之类东西
  - [ ] 带弹出确认框的删除功能
    - 确定了就是真删
- [ ] 文件类型
  - [x] 文件类型的简单管理
  - [ ] 依据文件类型筛选
- [x] 文件搜索功能


##### 用户体验

大概可以提升用户体验的东西

- [x] 上传
  - [x] 独立的弹窗
  - [x] 使用独立的上传dialog做简单的管理
    - [x] 上传进度条
- [ ] 重命名文件
- [ ] 移动文件(只是数据库操作)
- [ ] 改造/封装 table
  - [x] 添加action定义(封装按钮)
  - [ ] 添加复选框以完成多选操作
  - [ ] 通过拖动进行文件移动
- [ ] 预览
  - [ ] 视频预览
    - [x] 自定义播放/暂停
    - [x] 自定义进度条
    - [ ] 自定义音量条
  - [x] 音频预览
  - [ ] 文本预览
  - [ ] 预览窗口悬浮可交互
    - [x] 窗口可拖动
    - [ ] 窗口可改变尺寸
    - [ ] 最小化
- [ ] 解决移动端的一些问题
- [ ] 集成 `Ids` 的用户


