/* NXY LI shared catalogue — sets window.NXYLI_PRODUCTS synchronously (static), then refreshes from API */
(function () {
  function img(id, w) {
    return 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=' + (w || 900);
  }
  window.nxyliImg = img;

  var STATIC = [
    { id: 'kb-flow',    name: 'Flow Keyboard',          cat: 'Keyboards',   price: 24800, photo: 18155963, badge: 'New',  conn: ['Wireless','Bluetooth'], blurb: 'Low-profile tactile mechanical. Machined aluminium, 800-hour battery.' },
    { id: 'kb-tactile', name: 'Tactile 65 Mech',         cat: 'Keyboards',   price: 21800, photo: 3829226,  badge: '',     conn: ['Wired','Wireless'],     blurb: 'Hot-swappable 65% with gasket mount and doubleshot PBT caps.' },
    { id: 'ms-drift',   name: 'Drift Mouse',             cat: 'Mouse',       price: 18500, photo: 20213726, badge: '',     conn: ['Wireless','Bluetooth'], blurb: 'Sculpted ergonomic shell, 26K optical sensor, 90-hour battery.' },
    { id: 'ms-glide',   name: 'Glide Pro Mouse',         cat: 'Mouse',       price: 16500, photo: 19304049, badge: 'New',  conn: ['Wireless'],             blurb: 'Featherweight 49g competition mouse with 8K polling.' },
    { id: 'mon-vista',  name: 'Vista Ultrawide 34″', cat: 'Monitors',   price: 112000,photo: 16230157, badge: '',     conn: ['Wired'],                blurb: '34-inch curved UWQHD, 144Hz, factory-calibrated.' },
    { id: 'mon-lumen',  name: 'Lumen 27″ 4K',       cat: 'Monitors',    price: 88000, photo: 14127564, badge: '',     conn: ['Wired'],                blurb: '27-inch 4K IPS, 99% DCI-P3, single-cable USB-C.' },
    { id: 'dk-rise',    name: 'Rise Standing Desk',      cat: 'Desks',       price: 89000, photo: 31726545, badge: 'New',  conn: [],                       blurb: 'Dual-motor sit-stand frame, solid-oak top, 4-position memory.' },
    { id: 'dk-apex',    name: 'Apex Gaming Desk',        cat: 'Desks',       price: 76000, photo: 30469973, badge: '',     conn: [],                       blurb: 'Carbon-texture top, cable trough, headphone hook, RGB underglow.' },
    { id: 'st-form',    name: 'Form Ergonomic Chair',    cat: 'Seating',     price: 68000, photo: 13047847, badge: '',     conn: [],                       blurb: 'Adaptive lumbar, breathable mesh, 4D arms. Built for the 8-hour day.' },
    { id: 'st-rally',   name: 'Rally Gaming Chair',      cat: 'Seating',     price: 54000, photo: 7862505,  badge: 'New',  conn: [],                       blurb: 'Bucket-seat support, magnetic head pillow, recline to 165°.' },
    { id: 'ac-slate',   name: 'Slate Desk Mat',          cat: 'Accessories', price: 8800,  photo: 28228015, badge: '',     conn: [],                       blurb: 'Full-grain vegetable-tanned leather, stitched edge, 900×400mm.' }
  ];

  // Set static data immediately so pages render without waiting for the API
  window.NXYLI_PRODUCTS = STATIC;

  // Normalize API response shape → same shape as STATIC
  function normalize(p) {
    return {
      id: p.id,
      name: p.name,
      cat: p.category === 'Mice' ? 'Mouse' : p.category,
      price: p.price,
      photo: p.photo_id,
      badge: p.badge || '',
      conn: p.connectivity ? p.connectivity.split(',').filter(Boolean) : [],
      blurb: p.blurb || '',
    };
  }

  // Refresh from API in the background; on failure static data stays
  fetch('http://localhost:8000/api/products')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      window.NXYLI_PRODUCTS = data
        .filter(function (p) { return p.category !== 'Lighting'; })
        .map(normalize);
    })
    .catch(function () {});
})();
