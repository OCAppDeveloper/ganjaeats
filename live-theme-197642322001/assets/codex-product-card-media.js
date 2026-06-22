(function(){
  var base = 'https://cdn.shopify.com/s/files/1/0684/5775/8801/files/';
  var replacements = {
    'chef-matt-nano-delta-9-powder': 'chef-matt-nano-delta-9-powder-black-bg-candidate.png',
    'chef-matt-crafted-aged-red-pepper-hot-sauce-25-pack-gourmet-condiment-bundle': 'chef-matt-crafted-aged-red-pepper-hot-sauce-25-pack-gourmet-condiment-bundle-black-bg-candidate.png',
    'chef-matt-crafted-aged-red-pepper-hot-sauce-gourmet-condiment': 'aged-red-pepper-hot-sauce-black-bg-candidate.png',
    'chef-matt-crafted-classic-ketchup-25-pack-gourmet-condiment-bundle': 'classic-ketchup-25-pack-black-bg-candidate.png',
    'chef-matt-crafted-classic-ketchup-gourmet-condiment': 'classic-ketchup-black-bg-candidate.png',
    'chef-matt-crafted-garlic-and-herb-olive-oil-25-pack-gourmet-condiment-bundle': 'chef-matt-crafted-garlic-and-herb-olive-oil-25-pack-gourmet-condiment-bundle-black-bg-candidate.png',
    'chef-matt-crafted-garlic-and-herb-olive-oil-gourmet-condiment': 'chef-matt-crafted-garlic-and-herb-olive-oil-gourmet-condiment-black-bg-candidate.png',
    'chef-matt-crafted-hickory-smoked-bbq-sauce-25-pack-gourmet-condiment-bundle': 'chef-matt-crafted-hickory-smoked-bbq-sauce-25-pack-gourmet-condiment-bundle-black-bg-candidate.png',
    'chef-matt-crafted-limon-chips-ready-to-enjoy-savory-snack': 'chef-matt-crafted-limon-chips-ready-to-enjoy-savory-snack-black-bg-candidate.png',
    'chef-matt-crafted-mango-honey-gourmet-condiment': 'chef-matt-crafted-mango-honey-gourmet-condiment-black-bg-candidate.png',
    'chef-matt-crafted-sauce-variety-bundle-gourmet-condiments': 'chef-matt-crafted-sauce-variety-bundle-gourmet-condiments-black-bg-candidate.png',
    'chef-matt-hot-sauce-5-pack-bundle-buy-4-get-1-free': 'chef-matt-hot-sauce-5-pack-bundle-buy-4-get-1-free-black-bg-candidate.png',
    'litquid-6-pack-crafted-drink-bundle-premium-beverages': 'litquid-6-pack-crafted-drink-bundle-premium-beverages-black-bg-candidate.png',
    'litquid-lemon-lime-crafted-drink-premium-beverage-16oz': 'litquid-lemon-lime-crafted-drink-premium-beverage-16oz-black-bg-candidate.png',
    'litquid-mango-crafted-drink-premium-beverage-16oz': 'litquid-mango-crafted-drink-premium-beverage-16oz-black-bg-candidate.png',
    'litquid-watermelon-crafted-drink-premium-beverage-16oz': 'litquid-watermelon-crafted-drink-premium-beverage-16oz-black-bg-candidate.png'
  };
  function srcsetFor(url){
    return [350, 550, 750, 1000].map(function(width){
      return url + '?width=' + width + ' ' + width + 'w';
    }).join(', ');
  }
  function apply(){
    document.querySelectorAll('.product-tile__featured-media[href*="/products/"]').forEach(function(link){
      var href = link.getAttribute('href') || '';
      var handleMatch = href.match(/\/products\/([^/?#]+)/);
      if (!handleMatch) return;
      var filename = replacements[handleMatch[1]];
      if (!filename) return;
      var url = base + filename;
      var mediaObject = link.querySelector('.product-media-object');
      if (mediaObject) {
        mediaObject.style.backgroundImage = 'url("' + url + '?width=900")';
        mediaObject.style.backgroundRepeat = 'no-repeat';
        mediaObject.style.backgroundSize = 'contain';
        mediaObject.style.backgroundPosition = 'center 54%';
      }
      link.querySelectorAll('img').forEach(function(img, index){
        if (index > 0) {
          var overlay = img.closest('.pointer-events-none');
          if (overlay) overlay.remove();
          return;
        }
        img.src = url + '?width=900';
        img.srcset = srcsetFor(url);
        img.sizes = img.sizes || '(min-width: 990px) calc(100vw / 3), 100vw';
        img.style.backgroundColor = '#050503';
        img.style.opacity = '1';
        img.style.visibility = 'visible';
      });
      link.dataset.geCardMedia = 'black-bg';
    });
  }
  function schedule(){
    window.requestAnimationFrame(apply);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule);
  } else {
    schedule();
  }
  document.addEventListener('shopify:section:load', schedule);
  document.addEventListener('switch:alpine:started', schedule);
  [300, 1200, 2500, 5000, 9000, 15000].forEach(function(delay){
    window.setTimeout(apply, delay);
  });
  if (window.MutationObserver && document.documentElement) {
    var pending = false;
    var observer = new MutationObserver(function(){
      if (pending) return;
      pending = true;
      window.setTimeout(function(){
        pending = false;
        apply();
      }, 80);
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(function(){
      observer.disconnect();
    }, 30000);
  }
})();
