const virtuals = (schema, ref, localField,foreignField ) => {
    schema.virtual(ref, {
            ref: ref,
            localField: localField,
            foreignField: foreignField
    })
    return virtuals
}

//virtuals(userSchema, 'food', 'Food', 'user')


module.exports = virtuals 