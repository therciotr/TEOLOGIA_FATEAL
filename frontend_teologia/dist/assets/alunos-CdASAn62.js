import{b as n}from"./index-DkCCjxFm.js";function e(a){return a instanceof FormData?{"Content-Type":"multipart/form-data"}:void 0}async function u(a){const{data:t}=await n.get(`/alunos/${a}`);return t}async function s(a,t){const{data:o}=await n.patch(`/alunos/${a}`,t,{headers:e(t)});return o}export{u as g,s as u};
//# sourceMappingURL=alunos-CdASAn62.js.map
