const mongoose = require('mongoose')

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateNewInput:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *          default: John Deo
 *    UserResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 */

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "user should have a username"],
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)
module.exports = User