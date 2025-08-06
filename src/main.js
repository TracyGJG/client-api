import './style.css';
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg';
// import { setupCounter } from './counter.js';

import ClientApi from './client-api.js';

// <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
// <img src="${viteLogo}" class="logo" alt="Vite logo" />
// document.querySelector('#app')
$app.innerHTML = /*html */ `
  <div>
    <h1>Test Harness: <span>Client-API</span></h1>
  </div>
`;

// setupCounter(document.que  rySelector('#counter'));

const PostsAPI = ClientApi('http://localhost:3000/posts');

console.table(await PostsAPI.read());

console.log('read', await PostsAPI.read('2'));

const created = await PostsAPI.create({
  title: "Hitchhicker's Guide to the Galaxy, The",
  views: 42,
});
console.log('created', created);

console.table(await PostsAPI.read());

const updated = await PostsAPI.update(created.id, {
  title: "Hitchhicker's Guide to the Galaxy, The",
  views: 666,
});
console.log('updated', updated);

console.table(await PostsAPI.read());

const modified = await PostsAPI.modify(created.id, {
  views: '007',
});
console.log('modified', updated);

console.table(await PostsAPI.read());

const deleted = await PostsAPI.delete(created.id);
console.log('deleted', deleted);

console.table(await PostsAPI.read());
