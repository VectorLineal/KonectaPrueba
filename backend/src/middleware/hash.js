const bcrypt = require("bcrypt");
const saltRounds = 10;

const hash = async (password) => {
    try{
        const hashed = await bcrypt.hash(password, saltRounds);
        return hashed;
    }catch(e){
        console.error("Hashing error:", e.message);
    } 
}

const validate = async (userInput, hashCode) => {
    try{
        const isMatch = await bcrypt.compare(userInput, hashCode);
        return isMatch;
    }catch(e){
        console.error("Hashing validating hash:", e.message);
    }
}

module.exports = {
    hash,
    validate
}