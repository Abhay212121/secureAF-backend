// require('dotenv').config()

// const checkMember = (req, res) => {
//     const userEnteredKey = req.body.key
//     console.log('hii')
//     if (userEnteredKey === process.env.MEMBERSHIP_KEY) {
//         req.member = true;
//         return res.json({ status: 200, msg: 'Correct key entered!' })
//     }
//     else {
//         req.member = false;
//         return res.json({ status: 406, msg: 'Wrong key Entered!' })
//     }
// }

// module.exports = checkMember