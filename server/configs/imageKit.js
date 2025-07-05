import ImageKit from "imagekit";

var imagekit = new ImageKit({
    publicKey : process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey : process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGE_KIT_URL_ENDPOINT
});

export default imagekit

/*
We have initialised imageKit here, but before that u have to create an account and get the private,public and urlEndpoint and save it in the .env file. and this code is actually taken from the imagekit docs under node.js division dont mug up
*/