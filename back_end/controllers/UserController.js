// import UserModel
const { where } = require("sequelize");
const dbModel = require("../models");
const bcrypt = require("bcryptjs"); // Thư viện để mã hóa mật khẩu

class UserController {
  // [GET] Lây danh sách người dùng
  index(req, res) {
    dbModel.User.findAll()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  }

  // [GET] Lấy người dùng cụ thể theo id
  show(req, res) {
    const { id } = req.params;
    dbModel.User.findByPk(id)
      .then((user) => {
        if (user) res.json(user);
        else res.status(404).json({ error: "User not found" });
      })
      .catch((err) => res.status(500).json(err));
  }
  // [POST] xử lý thêm người dùng
  async register(req, res) {
    const { username, password, name, bio, avatar, email } = req.body;
  
    try {
      // Kiểm tra xem tên người dùng có tồn tại trong cơ sở dữ liệu chưa
      const existingUser = await dbModel.User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Tên người dùng đã tồn tại' });
      }
  
      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds là 10
  
      // Lưu người dùng mới vào cơ sở dữ liệu
      const newUser = await dbModel.User.create({
        username,
        password: hashedPassword, // Lưu mật khẩu đã mã hóa
        name,
        bio,
        avatar,
        email,

      });
  
      // Trả về thông báo đăng ký thành công
      res.status(201).json({ message: 'Tạo tài khoản thành công', userId: newUser.id, username: newUser.username });
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      res.status(500).json({ error: 'Lỗi hệ thống' });
    }
  }
  // async authenticateToken(req, res) {
  //   try{
  //     const userId = req.user.userId

  //     const user = await db.User.findOne({
  //       where: { id: userId },
  //       attributes: ['id', 'username', 'email', 'name', 'avatar'], // Chọn các cột bạn cần
  //     });
  //     if (!user) {
  //       return res.status(404).json({ message: 'Người dùng không tồn tại' });
  //     }
  
  //     // Trả về thông tin người dùng
  //     res.status(200).json(user);
  //   }catch (err) {
  //     console.error(err);
  //     res.status(500).json({ message: 'Lỗi hệ thống' });
  //   }
  // }
  
  // [PUT] sửa đổi thông tin người dùng
  update(req, res) {}

  // [DELETE] xóa người dùng
  destroy() {}

  
}

module.exports = new UserController();
