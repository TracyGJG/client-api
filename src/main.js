import './style.css';
import javascriptLogo from '/javascript.svg';

import ClientApi from './client-api.js';

$app.innerHTML = /*html */ `
  <div>
    <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    <h1>Test Harness: <span>Client-API</span></h1>
  </div>
`;

const PostsAPI = ClientApi('http://localhost:3000/posts');

console.table(await PostsAPI.read());
console.log('read by id', await PostsAPI.read('2'));
console.log('read by qs', (await PostsAPI.read('?views=100'))[0]);

const created = await PostsAPI.create({
  title: "Hitchhiker's Guide to the Galaxy, The",
  views: 42,
});
console.log('created', created);
console.table(await PostsAPI.read());

const updated = await PostsAPI.update({
  id: created.id,
  title: "Hitchhiker's Guide to the Galaxy, The",
  views: 666,
});
console.log('updated', updated);
console.table(await PostsAPI.read());

const modified = await PostsAPI.modify({
  id: created.id,
  views: '007',
});
console.log('modified', modified);
console.table(await PostsAPI.read('?views=007'));

const deleted = await PostsAPI.delete(created.id);
console.log('deleted', deleted);
console.table(await PostsAPI.read());
