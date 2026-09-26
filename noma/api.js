(function () {
  var BASE = 'http://localhost:8000';

  async function call(path, opts) {
    var res = await fetch(BASE + path, Object.assign({ headers: { 'Content-Type': 'application/json' } }, opts));
    var data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Request failed');
    return data;
  }

  window.NxyliAPI = {
    products: function (params) {
      var qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return call('/api/products' + qs);
    },
    product: function (id) { return call('/api/products/' + id); },
    subscribe: function (email) { return call('/api/newsletter', { method: 'POST', body: JSON.stringify({ email: email }) }); },
    createOrder: function (body) { return call('/api/orders', { method: 'POST', body: JSON.stringify(body) }); },
    login: function (email, password) { return call('/api/auth/login', { method: 'POST', body: JSON.stringify({ email: email, password: password }) }); },
    register: function (email, password, name) { return call('/api/auth/register', { method: 'POST', body: JSON.stringify({ email: email, password: password, name: name }) }); },
    me: function (token) { return call('/api/auth/me?token=' + encodeURIComponent(token)); },
  };
})();
