import { createSlice } from '@reduxjs/toolkit';

// 初始化app的state
const initialState = {
  isMobile: false, // 是移动设备
  collapsed: false, // 图标是否收缩
  menuDrawerVisible: false, // 菜单抽屉是否可见
  menuSiderCollapsed: false, // 菜单正常是否可收缩
};

// 创建一个appSlice
export const appSlice = createSlice({
  name: 'app',
  initialState,
  // 定义reducers对应的方法
  reducers: {
    // 定义触发收缩的方法
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    // 定义触发是否是移动设备的方法
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    // 设置菜单抽屉是否可见
    setMenuDrawerVisible: (state, action) => {
      state.menuDrawerVisible = action.payload;
    },
    // 设置菜单是否可收缩
    setMenuSiderCollapsed: (state, action) => {
      state.menuSiderCollapsed = action.payload;
    },
  },
});

// 解构导出reducers的相关方法
export const { setCollapsed, setIsMobile, setMenuDrawerVisible, setMenuSiderCollapsed } =
  appSlice.actions;

// 导出
export default appSlice.reducer;
