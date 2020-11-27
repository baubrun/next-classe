import mongoose from "mongoose"

const oid = mongoose.Types.ObjectId

export const valid_OId = (id) => {
    const isValid = oid.isValid(id)
    console.log('isValid :>>', isValid)
    return !isValid ? oid(id) : id
}



