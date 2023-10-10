import { MenuType, MenuStatus } from "@/utils/Enum/Menu";
import _ from "lodash";

/* 白名单 */
const whiteList = ["404"];

/**
 * 根据权限 加载菜单
 * @param {Array} assessedMenus 权限菜单
 * @param {Array} asyncRoutes 预加载菜单
 */
export function LoadMenus(assessedMenus, asyncRoutes) {
  const { CATALOG } = MenuType;
  const { ENABLE } = MenuStatus;

  /** 先预加载 需要添加的菜单 */
  let menuCache = {},
    childCache = {};
  asyncRoutes.forEach((item) => {
    const { meta, children } = item;
    /* 目录 */
    if (meta) menuCache[meta.title] = item;
    /* 菜单 */
    if (children) childsForMap(childCache, children, meta.title);
  });

  /* 需要加载的目录 */
  let resultArray = [];

  assessedMenus
    .sort((a, b) => a.orderNo - b.orderNo)
    .forEach((item) => {
      const {
        menuType,
        menuPerms,
        menuIcon,
        menuName,
        subMenus,
        status,
      } = item;
      /* 目录 */
      if (+menuType === CATALOG && +status === ENABLE && menuCache[menuPerms]) {
        menuCache[menuPerms].children = [];
        menuCache[menuPerms].children = getChildMenus(
          subMenus,
          childCache,
          menuPerms
        );
        /* 添加 menuIcon */
        menuCache[menuPerms].menuIcon = menuIcon;
        menuCache[menuPerms].menuName = menuName;
        resultArray.push(menuCache[menuPerms]);
      }
    });

  /* 添加白名单 */
  whiteList.forEach((white) => {
    if (menuCache[white]) resultArray.push(menuCache[white]);
  });

  return resultArray;
}

/**
 * 获取子菜单列表
 * @param {Array} subMenus 权限子菜单
 * @param {Object} asyncChildMap 预加载子菜单 Map
 * @param {String} pCode 父级权限标识
 */
function getChildMenus(subMenus, childCache, pCode) {
  const { MENU } = MenuType;
  const { ENABLE } = MenuStatus;

  /* 子菜单集合 */
  let arr = [];
  subMenus
    .sort((a, b) => a.orderNo - b.orderNo)
    .forEach((item) => {
      const { menuPerms, menuType, menuIcon, menuName, status } = item;
      const _childMenu = childCache[menuPerms];
      if (+menuType === MENU && +status === ENABLE && _childMenu) {
        /* 添加 menuIcon */
        childCache[menuPerms].menuIcon = menuIcon;
        childCache[menuPerms].menuName = menuName;
        arr.push(childCache[menuPerms]);
      }
    });
  /* 添加 hidden页面 */
  if (childCache[pCode] && childCache[pCode].length > 0)
    arr.push(...childCache[pCode]);
  return arr;
}

/**
 * 子集菜单 做HashMap
 * @param {Object} cache 子集菜单HashMap
 * @param {Array} childs 预处理子集列表
 * @param {String} pCode 父级权限标识
 */
function childsForMap(cache, childs, pCode) {
  cache[pCode] = [];
  childs.forEach((item) => {
    const { hidden, meta } = item;
    /* 添加隐藏页 */
    if (hidden) {
      cache[pCode].push(item);
    } else cache[meta.title] = item;
  });
}

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

/**
 * 为解决菜单渲染时，替换权限菜单有效信息：menuIcon
 * @param {Array} assessedMenus 权限菜单
 * @param {Array} asyncRoutes 预加载菜单
 */
export function matchMenuResource(assessedMenus, asyncRoutes) {
  /** 资源菜单 to hashMap */
  let menuCache = {};

  const { ENABLE } = MenuStatus;
  assessedMenus.forEach(({ menuPerms, menuIcon, subMenus, status }) => {
    /* 启用状态 */
    if (+status === ENABLE) {
      /* 目录 cache */
      if (menuIcon) menuCache[menuPerms] = { menuIcon };
      /* 菜单 cache */
      if (_.isArray(subMenus)) cacheSubMenus(subMenus, menuCache);
    }
  });

  /** Router菜单 */
  asyncRoutes.forEach((item) => {
    const { meta, children } = item;
    /* 目录 */
    if (meta && menuCache[meta.title])
      item.menuIcon = menuCache[meta.title].menuIcon;
    /* 菜单 */
    if (children) matchChildMenus(children, menuCache);
  });
  return asyncRoutes;
}

/**
 * 缓存菜单
 * @param {Array} subMenus 菜单列表
 * @param {Object} menuCache 资源菜单HashMap
 */
function cacheSubMenus(subMenus, menuCache) {
  const { ENABLE } = MenuStatus;
  subMenus.forEach(({ menuPerms, menuIcon, status }) => {
    if (+status === ENABLE) {
      if (menuIcon) menuCache[menuPerms] = { menuIcon };
    }
  });
}

/**
 * 匹配菜单
 * @param {Array} children 菜单列表
 * @param {Object} menuCache 资源菜单HashMap
 */
function matchChildMenus(children, menuCache) {
  children.forEach((item) => {
    const { meta } = item;
    if (meta && menuCache[meta.title])
      item.menuIcon = menuCache[meta.title].menuIcon;
  });
}
