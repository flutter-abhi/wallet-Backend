const { Message } = require("twilio/lib/twiml/MessagingResponse")

const User = require("../schema/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.signUp = async (req, res) => {
    try {
        const { contact, password, firstName, lastName, email, type } = req.body;

        ////SIMPLE VALIDATIONS
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        if (!firstName || typeof firstName !== 'string' || firstName.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Name is required and cannot be empty."
            });
        }
        if (!lastName || typeof lastName !== 'string' || lastName.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Name is required and cannot be empty."
            });
        }
        if (!password || typeof password !== 'string' || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long and include both letters and numbers."
            });
        }
        if (!contact || typeof contact !== 'string' || !/^\d{10,15}$/.test(contact)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid contact number with 10 to 15 digits."
            });

        }


        //already exist or not
        let user = await User.findOne({ contact });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "user already exist on this phone number"
            });
        }

        ///password hashing 
        const hashPass = await bcrypt.hash(password, 10);


        /// image upload
        // const file = req.files.image;
        // const supportedType = ["jpg", "jpeg", "png"];
        // const type = file.name.split(".")[1];
        // let respImage;
        // if (supportedType.includes(type)) {
        //     //uplod to clooud and give the link

        //     respImage = await uplodingToCloudinary(file.tempFilePath, "walletProfiles");
        // } else {
        //     /// create user image by it Name
        //     respImage = "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png";
        // }

        let respImage = "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png";

        ///db madhe entry

        user = await User.create({
            firstName,
            lastName,
            email,
            contact,
            password: hashPass
            , type
        })

        ///

        const payload = {
            contact: user.contact,
            id: user._id,
        }

        user.password = undefined;

        let token = jwt.sign(payload, process.env.JWT_SECREATE_KEY, { expiresIn: "24h" });

        return res.status(200).json({
            success: true,
            token: token,
            user: user,
            message: "user signUp in successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            succsses: false,
            message: "server side error during sign up"
        })
    }
}


async function uplodingToCloudinary(file, folder) {

    const options = { folder, resource_type: "auto" };

    return await cloudinary.uploader.upload(file, options);

}