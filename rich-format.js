(function(root,factory){if(typeof module==="object"&&module.exports)module.exports=factory();else root.EHRich=factory();})(typeof globalThis!=="undefined"?globalThis:this,function(){
  const types=new Set(["p","h1","h2","h3","bullet","number"]);
  function clean(value){if(!Array.isArray(value))return [];return value.slice(0,2000).map(b=>({type:types.has(b?.type)?b.type:"p",runs:Array.isArray(b?.runs)?b.runs.slice(0,1000).map(r=>({text:String(r?.text??"").slice(0,10000),bold:r?.bold===true,italic:r?.italic===true,underline:r?.underline===true})):[]})).filter(b=>b.runs.length);}
  const text=blocks=>clean(blocks).map(b=>b.runs.map(r=>r.text).join("")).join("\n");
  const fromText=value=>String(value||"").replace(/\r\n?/g,"\n").split("\n").map(text=>({type:"p",runs:[{text}]}));
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function html(blocks){let output="",list="";for(const b of clean(blocks)){const desired=b.type==="bullet"?"ul":b.type==="number"?"ol":"";if(list&&desired!==list){output+=`</${list}>`;list="";}if(desired&&!list){list=desired;output+=`<${list}>`;}const tag=desired?"li":b.type;const contents=b.runs.map(r=>{let v=escape(r.text).replace(/\n/g,"<br>");if(r.bold)v=`<strong>${v}</strong>`;if(r.italic)v=`<em>${v}</em>`;if(r.underline)v=`<u>${v}</u>`;return v}).join("");output+=`<${tag}>${contents||"<br>"}</${tag}>`;}if(list)output+=`</${list}>`;return output;}
  return {clean,text,fromText,html};
});
