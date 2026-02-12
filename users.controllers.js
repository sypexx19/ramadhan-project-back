import db from './db.js'

export const Submit = async (req, res) => {
  try {
    const {
      user_name,
      family_name,
      gender,
      adress,
      phone_number,
      user_work,
      social_state,
      note
    } = req.body;

    // 🔹 Required validation
    if (!user_name || !family_name || !adress || !phone_number) {
      return res.status(400).json({
        message: "Required fields are missing"
      });
    }

    // 🔹 Check duplicate
    const [existing] = await db.execute(
      `SELECT user_id FROM users 
       WHERE phone_number = ? 
       OR (user_name = ? AND family_name = ?)`,
      [phone_number, user_name, family_name]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "هذا المستخدم موجود مسبقاً ❌"
      });
    }

    // 🔹 Insert
    const [result] = await db.execute(
      `INSERT INTO users 
      (user_name, family_name, gender, adress, phone_number, user_work, social_state, note)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_name,
        family_name,
        gender,
        adress,
        phone_number,
        user_work || "لا",
        social_state, // store array correctly
        note
      ]
    );

    return res.status(201).json({
      message: "User created successfully ✅",
      userId: result.insertId
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Database error"
    });
  }
};

export const Show = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        u.user_id,
        u.user_name,
        u.family_name,
        u.gender,
        u.adress,
        u.phone_number,
        u.user_work,
        u.social_state,
        u.note
      FROM users u
    `);

    res.json({ success: true, users: rows });

  } catch (error) {
    console.error("MYSQL ERROR 👉", error); // 🔥 THIS
    res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      `DELETE FROM users WHERE user_id = ?`,
      [id]
    );

    // If no row was deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {
    console.error("MYSQL ERROR 👉", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user"
    });
  }
};
