const User = require('../schema/User');

exports.editProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const _id = req.user.id;

    // Simple validation
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'Firstname, lastname, and email are required.' });
    }

    // Find and update the user
    let user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    const updatedUser = await user.save();

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Cannot update. Please try again later.',
    });
  }
};
