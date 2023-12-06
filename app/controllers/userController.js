const User = require('../modulers/user')
const Ticket = require("../modulers/ticket")
const bcrypt = require("bcrypt")

class userController{
    async register(req, res, next) {
        try{
            const { username, password, email, phone} = req.body;
            // console.log(username)
            // console.log(password)
            // console.log(req.body)
            const salt = await bcrypt.genSalt(10);
            console.log(salt)
            const hashedPassword = await bcrypt.hash(password, salt);
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'Người dùng đã tồn tại'});
              }
          
            const user = new User({ username, password: hashedPassword, email, phone});
            await user.save();
            return res.status(200).json({
                message: 'Người dùng đã được tạo thành công',
                username: username,
                email: email,
                phone: phone
              });
        }
       catch(error) {
            next(error)
       }   
    }
    async login(req, res, next) {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                // res.redirect('/');
                return res.status(400).json({error: 'Thông tin đăng nhập không đúng'})
            }
    
            const validPassword = await bcrypt.compare(req.body.password, user.password);
    
            if (validPassword) {
                res.cookie("uid", user.id);
                console.log(user.id)
                // res.redirect('/');
                return res.status(200).json(user.username);
            }
            console.log("sss")
            return res.status(400).json({error: 'Thông tin đăng nhập không đúng'})
            // res.redirect('/');
        } catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        res.clearCookie("uid");
        res.statusCode = 302;
        res.status(200);
        res.end();
    }
    async viewInfo(req, res, next) {
        try {
            const user = await User.findOne({ username: req.body.username });
            res.status(200).json(user)
        } catch (error) {
            next(error);
        }
    }
    async registerTicket(req, res, next) {
        try{
            const {username ,name, phone, date, adult,child, fee} = req.body;
            const ticket = new Ticket({username ,name, phone, date, adult,child, fee});
            ticket.save();
            res.status(200).json(ticket._id);
        } catch (error){
            next(error);
        }
        
    }
    async viewTicket(req, res, next) {
        try {
            const ticket = await Ticket.find({ username: req.body.username });
            // console.log(ticket)
            res.status(200).json(ticket.name)
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new userController()