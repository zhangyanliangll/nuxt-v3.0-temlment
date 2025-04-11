import db from '@/unit/db'
// 列表转树
export function listToTree(list) {
  let map = {};
  list.forEach(item => {
    if (!map[item.id]) {
      map[item.id] = item;
    }
  });

  list.forEach(item => {
    if (item.parentCategoryId !== 0 && map[item.parentCategoryId]) {
      map[item.parentCategoryId].children ? map[item.parentCategoryId].children.push(item) : map[item.parentCategoryId].children = [item];
    }
  });

  return list.filter(item => {
    if (item.parentCategoryId === 0) {
      return item;
    }
  })
}

/**
 * 高亮匹配关键字
 * @param {*} keyword 
 * @param {*} resultList 
 * @returns 
 */
export function highlightSearch(keyword, resultList, attr) {
  if (!keyword || !resultList || !Array.isArray(resultList)) {
    return resultList;
  }

  const highlightedResults = resultList.map(item => {
    const regex = new RegExp("(" + escapeRegExp(keyword) + ")", "gi");
    const html = (attr ? item[attr] : item).replace(regex, '<span class="highlight">$1</span>');
    return {
      ...item,
      result: attr ? item[attr] : item,
      html
    };
  });
  // console.log(highlightedResults)
  return highlightedResults;
}

/**
 * 防抖
 * @param {*} fn 
 * @param {*} delay 
 * @returns 
 */
export function debounce(fn, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 节流
 * @param {*} fn 
 * @param {*} delay 
 * @returns 
 */
export function throttle(fn, delay = 300) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn.apply(this, args);
  };
}

export const uniqueArrayByKey = (array, key) => {
  const uniqueArray = [];
  const keySet = new Set();
  for (const item of array) {
    const keyValue = item[key];
    if (!keySet.has(keyValue)) {
      keySet.add(keyValue);
      uniqueArray.push(item);
    }
  }

  return uniqueArray;
}

export const storeSetByLimit = (key, value, limit) => {
  let store = db.get(key)
  if (!store) {
    store = [value]
  } else {
    store.unshift(value)
    if (store && store.length > limit) {
      store.splice(store.length - 1, 1)
    }
  }
  store = uniqueArrayByKey(store, 'id')
  db.set(key, store)
}

export const flattenArray = (array) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      result = result.concat(flattenArray(array[i]));
    } else {
      result.push(array[i]);
    }
  }
  return result;
}

/**
 * 为了正确地使用正则表达式匹配关键词，我们需要确保关键词中的特殊字符被转义
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}