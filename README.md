# Social Media Dashboard
A single page application using react, material-ui, and webpack, try to build it from scratch without `create-react-app` cli.
The API is provided by [JSONplaceholder](https://jsonplaceholder.typicode.com/).

## Features
- Users
  - View list of users
- Posts
  - View list of posts
  - Add new post
  - Update post
  - Delete post
  - View post detail
  - View post's comments
  - Add comment
  - Edit comment
  - Delete comment
- Albums
  - View list of albums
  - View album's photos
  
## Installation
Clone project
``` bash
git clone https://github.com/hadicahyadi/social-media-dashboard.git
```
Install dependencies
``` bash
npm i
```
Run dev server
``` bash
npm run serve
# application will served on `http://localhost:8000`
```

Production
``` bash
npm run build
# it will create `dist` directory
```

Run prod server
``` bash
npm run start
# it will served files from `dist` directory then go to `http://localhost:8000`
```

Test
``` bash
npm run test
# only cover api functionality test
```
