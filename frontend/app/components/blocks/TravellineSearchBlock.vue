<template>
  <div id="block-search" v-reveal class="mx-auto">
    <div id="tl-search-form" class="tl-container px-4">
      <noindex><a href="https://www.travelline.ru/products/tl-hotel/" rel="nofollow" target="_blank">TravelLine</a></noindex>
    </div>
  </div>
</template>

<style>

</style>

<script setup>
import { onMounted, onUnmounted } from 'vue';

let travellineScript = null

const initTravelLine = () => {
  console.log('🎯 Initializing TravelLine...');

  // Очистка предыдущего скрипта
  if (travellineScript) {
    travellineScript.remove();
    travellineScript = null;
  }

  // Полная переинициализация TravelLine
  delete window.travelline;
  delete window.TL;

  (function(w) {
    var q = [
      ["setContext", "TL-INT-sobolek-bratsk-ru_2026-03-03", "ru"],
      ["embed", "booking-form", {
        container: "tl-booking-form"
      }],
      ["embed", "search-form", {
        container: "tl-search-form"
      }]
    ];
    var h = ["ru-ibe.tlintegration.ru", "ibe.travelline.ru", "ibe.tlintegration.com"];
    var t = w.travelline = (w.travelline || {}),
        ti = t.integration = (t.integration || {});
    ti.__cq = ti.__cq ? ti.__cq.concat(q) : q;

    if (!ti.__loader) {
      ti.__loader = true;
      var d = w.document, c = d.getElementsByTagName("head")[0] || d.getElementsByTagName("body")[0];

      function loadNextHost(hosts) {
        if (hosts.length === 0) {
          console.error('❌ All TravelLine hosts failed');
          return;
        }

        var host = hosts[0];
        console.log('🌐 Loading TravelLine from:', host);

        var script = d.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = "https://" + host + "/integration/loader.js";

        script.onload = function() {
          console.log('✅ TravelLine loaded successfully from:', host);
        };

        script.onerror = function() {
          console.log('❌ Failed to load from:', host);
          loadNextHost(hosts.slice(1));
        };

        c.appendChild(script);
        travellineScript = script;
      }

      loadNextHost(h);
    }
  })(window);
}

onMounted(() => {
  console.log('🏠 TravelLine block mounted');
  initTravelLine();
});

// Используем хук Nuxt для переинициализации при навигации
const nuxtApp = useNuxtApp()
nuxtApp.hook('page:start', () => {
  console.log('🔄 Page transition started');
});

nuxtApp.hook('page:finish', () => {
  console.log('✅ Page transition finished, reinitializing TravelLine...');
  setTimeout(initTravelLine, 150);
});

onUnmounted(() => {
  if (travellineScript) {
    travellineScript.remove();
  }
});
</script>