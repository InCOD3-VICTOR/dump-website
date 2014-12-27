dump-website
============
A HTTP Proxy which is used for dumping static website.

Setup
-----
```shell
npm install
```

Usage
-----
```shell
node index.js http://www.nodejs.org
```

It will show:

> Please visit http://localhost:8005 .
> All requests will be redirected to http://www.nodejs.org .
> Please check output/ directory for saved files

Now open your browser and browse http://localhost:8005 . All visited pages and related resources will be dumped into output/ folder.

Enjoy.