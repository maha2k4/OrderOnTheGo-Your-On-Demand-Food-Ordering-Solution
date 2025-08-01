import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { Admin, Cart, FoodItem, Orders, Restaurant, User } from './Schema.js';

const app = express();
const PORT = 6001;

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/foodDelivery')

  .then(() => {
    console.log('✅ Connected to MongoDB');

    app.post('/register', async (req, res) => {
      const { username, email, usertype, password, restaurantAddress, restaurantImage } = req.body;
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        if (usertype === 'restaurant') {
          const newUser = new User({ username, email, usertype, password: hashedPassword, approval: 'pending' });
          const user = await newUser.save();
          const restaurant = new Restaurant({
            ownerId: user._id,
            title: username,
            address: restaurantAddress,
            mainImg: restaurantImage,
            menu: []
          });
          await restaurant.save();
          return res.status(201).json(user);
        } else {
          const newUser = new User({ username, email, usertype, password: hashedPassword, approval: 'approved' });
          const userCreated = await newUser.save();
          return res.status(201).json(userCreated);
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
      }
    });

    app.post('/login', async (req, res) => {
      const { email, password } = req.body;
      try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        return res.json(user);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
      }
    });

    app.post('/update-promote-list', async (req, res) => {
      const { promoteList } = req.body;
      try {
        const admin = await Admin.findOne();
        admin.promotedRestaurants = promoteList;
        await admin.save();
        res.json({ message: 'approved' });
      } catch (err) {
        res.status(500).json({ message: 'Error occured' });
      }
    });

    app.post('/approve-user', async (req, res) => {
      const { id } = req.body;
      try {
        const restaurant = await User.findById(id);
        restaurant.approval = 'approved';
        await restaurant.save();
        res.json({ message: 'approved' });
      } catch (err) {
        res.status(500).json({ message: 'Error occured' });
      }
    });

    app.post('/reject-user', async (req, res) => {
      const { id } = req.body;
      try {
        const restaurant = await User.findById(id);
        restaurant.approval = 'rejected';
        await restaurant.save();
        res.json({ message: 'rejected' });
      } catch (err) {
        res.status(500).json({ message: 'Error occured' });
      }
    });

    app.get('/fetch-user-details/:id', async (req, res) => {
      try {
        const user = await User.findById(req.params.id);
        res.json(user);
      } catch (err) {
        res.status(500).json({ message: 'Error occured' });
      }
    });

    app.get('/fetch-users', async (req, res) => {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json({ message: 'Error occured' });
      }
    });

    app.get('/fetch-restaurants', async (req, res) => {
      try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
      } catch (err) {
        res.status(500).json({ message: 'Error occured' });
      }
    });

    app.get('/fetch-orders', async (req, res) => {
      try {
        const orders = await Orders.find();
        res.json(orders);
      } catch (err) {
        res.status(500).json({ message: 'Error occured' });
      }
    });

    app.get('/fetch-items', async (req, res) => {
      try {
        const items = await FoodItem.find();
        res.json(items);
      } catch (err) {
        res.status(500).json({ message: 'Error occured' });
      }
    });

    app.get('/fetch-categories', async (req, res) => {
      try {
        const data = await Admin.find();
        if (data.length === 0) {
          const newData = new Admin({ categories: [], promotedRestaurants: [] });
          await newData.save();
          return res.json(newData.categories);
        } else {
          return res.json(data[0].categories);
        }
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    });

    app.get('/fetch-promoted-list', async (req, res) => {
      try {
        const data = await Admin.find();
        if (data.length === 0) {
          const newData = new Admin({ categories: [], promotedRestaurants: [] });
          await newData.save();
          return res.json(newData.promotedRestaurants);
        } else {
          return res.json(data[0].promotedRestaurants);
        }
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    });

    app.get('/fetch-restaurant-details/:id', async (req, res) => {
      try {
        const restaurant = await Restaurant.findOne({ ownerId: req.params.id });
        res.json(restaurant);
      } catch (err) {
        res.status(500).json({ message: 'Error occured' });
      }
    });

    app.get('/fetch-restaurant/:id', async (req, res) => {
      try {
        const restaurant = await Restaurant.findById(req.params.id);
        res.json(restaurant);
      } catch (err) {
        res.status(500).json({ message: 'Error occured' });
      }
    });

    app.get('/fetch-item-details/:id', async (req, res) => {
      try {
        const item = await FoodItem.findById(req.params.id);
        res.json(item);
      } catch (err) {
        res.status(500).json({ message: 'Error occured' });
      }
    });

    app.post('/add-new-product', async (req, res) => {
      const {
        restaurantId, productName, productDescription, productMainImg,
        productCategory, productMenuCategory, productNewCategory,
        productPrice, productDiscount
      } = req.body;
      try {
        if (productMenuCategory === 'new category') {
          const admin = await Admin.findOne();
          admin.categories.push(productNewCategory);
          await admin.save();
          const newProduct = new FoodItem({
            restaurantId, title: productName, description: productDescription,
            itemImg: productMainImg, category: productCategory,
            menuCategory: productNewCategory, price: productPrice,
            discount: productDiscount, rating: 0
          });
          await newProduct.save();
          const restaurant = await Restaurant.findById(restaurantId);
          restaurant.menu.push(productNewCategory);
          await restaurant.save();
        } else {
          const newProduct = new FoodItem({
            restaurantId, title: productName, description: productDescription,
            itemImg: productMainImg, category: productCategory,
            menuCategory: productMenuCategory, price: productPrice,
            discount: productDiscount, rating: 0
          });
          await newProduct.save();
        }
        res.json({ message: "product added!!" });
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    });

    app.put('/update-product/:id', async (req, res) => {
      const {
        restaurantId, productName, productDescription, productMainImg,
        productCategory, productMenuCategory, productNewCategory,
        productPrice, productDiscount
      } = req.body;
      try {
        const product = await FoodItem.findById(req.params.id);
        if (productCategory === 'new category') {
          const admin = await Admin.findOne();
          admin.categories.push(productNewCategory);
          await admin.save();
          product.menuCategory = productNewCategory;
        } else {
          product.menuCategory = productMenuCategory;
        }
        product.title = productName;
        product.description = productDescription;
        product.itemImg = productMainImg;
        product.category = productCategory;
        product.price = productPrice;
        product.discount = productDiscount;
        await product.save();
        res.json({ message: "product updated!!" });
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    });

    app.put('/cancel-order', async (req, res) => {
      const { id } = req.body;
      try {
        const order = await Orders.findById(id);
        order.orderStatus = 'cancelled';
        await order.save();
        res.json({ message: 'order cancelled' });
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    });

    app.put('/update-order-status', async (req, res) => {
      const { id, updateStatus } = req.body;
      try {
        const order = await Orders.findById(id);
        order.orderStatus = updateStatus;
        await order.save();
        res.json({ message: 'order status updated' });
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    });

    app.get('/fetch-cart', async (req, res) => {
      try {
        const items = await Cart.find();
        res.json(items);
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    });

    app.post('/add-to-cart', async (req, res) => {
      const { userId, foodItemId, foodItemName, restaurantId, foodItemImg, price, discount, quantity } = req.body;
      try {
        const restaurant = await Restaurant.findById(restaurantId);
        const item = new Cart({
          userId, foodItemId, foodItemName, restaurantId,
          restaurantName: restaurant.title, foodItemImg,
          price, discount, quantity
        });
        await item.save();
        res.json({ message: 'Added to cart' });
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    });

    app.put('/remove-item', async (req, res) => {
      const { id } = req.body;
      try {
        await Cart.deleteOne({ _id: id });
        res.json({ message: 'item removed' });
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    });

    app.post('/place-cart-order', async (req, res) => {
      const { userId, name, mobile, email, address, pincode, paymentMethod, orderDate } = req.body;
      try {
        const cartItems = await Cart.find({ userId });
        for (let item of cartItems) {
          const newOrder = new Orders({
            userId, name, email, mobile, address, pincode, paymentMethod, orderDate,
            restaurantId: item.restaurantId,
            restaurantName: item.restaurantName,
            foodItemId: item.foodItemId,
            foodItemName: item.foodItemName,
            foodItemImg: item.foodItemImg,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount
          });
          await newOrder.save();
          await Cart.deleteOne({ _id: item._id });
        }
        res.json({ message: 'Order placed' });
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    });

    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.log(`❌ Error in DB connection: ${e.message}`);
  });
