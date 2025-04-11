/**
 * 埋点JS
 * 1. 页面进入时，发送PAGE_ENTER事件
 * 2. 页面离开时，发送PAGE_EXIT事件
 * 3. 事件埋点：dom绑定事件埋点：lov-click,lov-ext-params 或者  调用collectData方法，传入事件ID和拓展参数
 * 4. 曝光埋点：lov-ex,lov-ext-params
 * 5. lov-ext-params 为拓展展示，传键值对 
 * 6. 页面埋点要自己在路由上采集（单页应用）
 */
import { trackingApi } from '@/server/common.js'

(function () {
  window.collectData = function (eventID, extParams = '{}') {
    let data = {
      'eventId': eventID || 'undefined',
      'userAgent': navigator.userAgent,
      'url': window.location.href,
      'requestParam': JSON.stringify(extParams),
      'source': 1 //(1:PC;2:wap;3:app)
    };
    trackingApi(data)
    // console.log(data);
  }

  window.addEventListener('load', function () {
    collectData('WINDOW_ENTER');
  });

  window.addEventListener('beforeunload', function () {
    collectData('WINDOW_EXIT');
  });

  document.addEventListener('click', function (event) {
    let target = event.target;
    if (target && target.getAttribute('lov-click')) {
      collectData(target.getAttribute('lov-click'), JSON.parse(target.getAttribute('lov-ext-params') || '{}'));
    }
  });

  function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  let exposedElements = {};

  document.addEventListener('scroll', function () {
    let domsWithEventID = document.querySelectorAll('[lov-ex]');
    domsWithEventID.forEach(function (dom) {
      if (!exposedElements[dom.getAttribute('lov-ex')] && isElementInViewport(dom)) {
        collectData(dom.getAttribute('lov-ex'), JSON.parse(dom.getAttribute('lov-ext-params') || '{}'));
        exposedElements[dom.getAttribute('lov-ex')] = true; // 标记元素已曝光
      } else if (!isElementInViewport(dom)) {
        exposedElements[dom.getAttribute('lov-ex')] = false; // 元素离开视窗时重置曝光状态
      }
    });
  });

})();
