var C="vic-7241335b";
var CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-180.png"];
var EXTRA=["https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(CORE).then(function(){return Promise.all(EXTRA.map(function(u){return c.add(u).catch(function(){})}))})}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
 var r=e.request,u=new URL(r.url);
 if(r.method!=="GET"||/supabase\.co$/.test(u.hostname))return;
 if(r.mode==="navigate"){e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(C).then(function(c){c.put("index.html",cp)});return res}).catch(function(){return caches.match("index.html")}));return}
 e.respondWith(caches.match(r).then(function(hit){return hit||fetch(r).then(function(res){if(res.ok&&(u.origin===location.origin||/cdnjs|fonts\./.test(u.hostname))){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)})}return res})}))
});
