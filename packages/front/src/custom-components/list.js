// 开发环境读取本地数据
export const localCategoryList = [
    {
        "id": 1,    // id，唯一
        "name": "基础组件",     // 分类名称
        "priority": 1,      // 排序
    }, {
        "id": 2,    // id，唯一
        "name": "图表组件",     // 分类名称
        "priority": 2,      // 排序
    }, {
        "id": 3,    // id，唯一
        "name": "复合组件",     // 分类名称
        "priority": 3,      // 排序
    }
]

export const localComponentList = [
    {
        "id": 1,    // id，唯一
        "name": "vText",    // 组件命名key，唯一，需要和组件注册名一致
        "full_name": "文字",    // 组件名称
        "path": require('../assets/文字.png'),  // 组件图标路径
        "category_id": 1,   // 组件分类 1基础组件
    }, {
        "id": 2,    // id，唯一
        "name": "vButton",    // 组件命名key，唯一，需要和组件注册名一致
        "full_name": "按钮",    // 组件名称
        "path": require('../assets/按钮.png'),  // 组件图标路径
        "category_id": 1,   // 组件分类 1基础组件
    }, {
        "id": 3,    // id，唯一
        "name": "vImage",    // 组件命名key，唯一，需要和组件注册名一致
        "full_name": "图片",    // 组件名称
        "path": require('../assets/图片.png'),  // 组件图标路径
        "category_id": 1,   // 组件分类 1基础组件
    }, {
        "id": 4,    // id，唯一
        "name": "pieChart",    // 组件命名key，唯一，需要和组件注册名一致
        "full_name": "饼图",    // 组件名称
        "path": require('../assets/按钮.png'),  // 组件图标路径
        "category_id": 2,   // 组件分类
    }, {
        "id": 5,    // id，唯一
        "name": "time",    // 组件命名key，唯一，需要和组件注册名一致
        "full_name": "倒计时",    // 组件名称
        "path": require('../assets/按钮.png'),  // 组件图标路径
        "category_id": 3,   // 组件分类
    }
]
