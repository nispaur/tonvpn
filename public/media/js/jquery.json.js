jQuery.json={encode:function(a,b,c){var i;gap='';var d='';if(typeof c==='number'){for(i=0;i<c;i+=1){d+=' '}}else if(typeof c==='string'){d=c}rep=b;if(b&&typeof b!=='function'&&(typeof b!=='object'||typeof b.length!=='number')){throw new Error('JSON.encode');}return this.str('',{'':a})},decode:function(c,d){var j;var e=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;function walk(a,b){var k,v,value=a[b];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return d.call(a,b,value)}e.lastIndex=0;if(e.test(c)){c=c.replace(e,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(c.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+c+')');return typeof d==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse');},f:function(n){return n<10?'0'+n:n},DateToJSON:function(a){return this.getUTCFullYear()+'-'+this.f(this.getUTCMonth()+1)+'-'+this.f(this.getUTCDate())+'T'+this.f(this.getUTCHours())+':'+this.f(this.getUTCMinutes())+':'+this.f(this.getUTCSeconds())+'Z'},StringToJSON:function(a){return this.valueOf()},quote:function(b){var d={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};var e=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;e.lastIndex=0;return e.test(b)?'"'+b.replace(e,function(a){var c=d[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+b+'"'},str:function(a,b){var c='',gap='',i,k,v,length,mind=gap,partial,value=b[a];if(value&&typeof value==='object'){switch((typeof value)){case'date':this.DateToJSON(a);break;default:this.StringToJSON(a);break}}if(typeof rep==='function'){value=rep.call(b,a,value)}switch(typeof value){case'string':return this.quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=c;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=this.str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=this.str(k,value);if(v){partial.push(this.quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=this.str(k,value);if(v){partial.push(this.quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}};