const mongoose = require("mongoose");
const Campground = require("../models/campground");
const { places, descriptors } = require("./seedHelpers");
const cities = require("./cities");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // YOUR USER ID
      author: "679f04f05de7c9cd70980eb1",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum debitis mollitia asperiores assumenda veritatis officia illo, ipsam ullam labore! Dignissimos aliquid eum molestiae harum libero rerum perspiciatis quaerat, aspernatur ad.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dqpl3oz88/image/upload/v1739431544/Yelp%20Camp/h8o3xlq4y2ujsamqmose.jpg",
          filename: "Yelp Camp/h8o3xlq4y2ujsamqmose",
        },
        {
          url: "https://res.cloudinary.com/dqpl3oz88/image/upload/v1739431546/Yelp%20Camp/zbjvjrrt7hdfl1mdnkjs.jpg",
          filename: "Yelp Camp/zbjvjrrt7hdfl1mdnkjs",
        },
        {
          url: "https://res.cloudinary.com/dqpl3oz88/image/upload/v1739431547/Yelp%20Camp/qbhecnl7xo29ydrtplm4.jpg",
          filename: "Yelp Camp/qbhecnl7xo29ydrtplm4",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
