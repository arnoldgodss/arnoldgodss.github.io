
    (function() {
      var cdnOrigin = "https://cdn.shopify.com";
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills-legacy.Dhq7GeeF.js","/cdn/shopifycloud/checkout-web/assets/c1/app-legacy.BnYpTOeU.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en-legacy.C_duyUqW.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage-legacy.BOCs9-5m.js","/cdn/shopifycloud/checkout-web/assets/c1/LocalizationExtensionField-legacy.DLtzhX7j.js","/cdn/shopifycloud/checkout-web/assets/c1/RememberMeDescriptionText-legacy.DOd2qmm8.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayOptInDisclaimer-legacy.BqBByRnM.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentButtons-legacy.frp9igT2.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblemsLineItemList-legacy.UaK4_yUs.js","/cdn/shopifycloud/checkout-web/assets/c1/LocalPickup-legacy.DU_ylBPl.js","/cdn/shopifycloud/checkout-web/assets/c1/useEditorShopPayNavigation-legacy.a6_IY9E3.js","/cdn/shopifycloud/checkout-web/assets/c1/VaultedPayment-legacy.C1MW0QiO.js","/cdn/shopifycloud/checkout-web/assets/c1/SeparatePaymentsNotice-legacy.j69oNMzU.js","/cdn/shopifycloud/checkout-web/assets/c1/PayButtonSection-legacy.CsnxhcgH.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown-legacy.CNZOkWep.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal-legacy.Do9pT5ro.js","/cdn/shopifycloud/checkout-web/assets/c1/StackedMerchandisePreview-legacy.CiMCyUfj.js","/cdn/shopifycloud/checkout-web/assets/c1/component-ShopPayVerificationSwitch-legacy.YDGPMqaz.js","/cdn/shopifycloud/checkout-web/assets/c1/useSubscribeMessenger-legacy.0IbUitE_.js","/cdn/shopifycloud/checkout-web/assets/c1/index-legacy.9wDcb2cI.js"];
      var styles = [];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0662/8438/8503/files/Logos_35_x320.png?v=1751292086"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [cdnOrigin].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  