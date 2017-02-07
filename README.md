# S3 Uploader
Amazon S3 uploader using restify JS and MongoDB

## Prerequisite
- NodeJS + NPM
- MongoDB

## Basic setup
1. Clone repository
2. Download required module by `npm install`
3. Set your config by creating `config/index.js` based on `config/index.js.sample`
4. Run your project via NPM as your environment `npm run start:local` . You can edit `package.json` if you want to set your own command

##### Note
- Look at `bootstrap/mongoose.js` , if your mongo configuration has an authentication method you should update the `mongo_url` variable

##### Thanks for your awesome project!
- [restify](https://github.com/restify/node-restify/)
- [aws-sdk](https://github.com/aws/aws-sdk-js)
- [mongoose](https://github.com/Automattic/mongoose)
- [chalk](https://github.com/chalk/chalk)