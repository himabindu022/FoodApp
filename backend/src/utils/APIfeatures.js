class APIfeatures{
    constructor(query, queryStr){
        this.query = query
        this.queryStr = queryStr
    }
    filter() {
        let  queryString = JSON.stringify(this.queryStr)
        queryString = queryString.replace(/\b(gte|lt|lte|gt)\b/g, (match) => `$${match}`)
        const queryStr = JSON.parse(queryString)
    
        this.query = this.query.find(queryStr)

        return this
    }

    sort() {
        if(this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ')
            this.query.sort(sortBy)
         }else {
            this.query = this.query.sort('-__v')
         }
    }
    
    // limitFields(){
    //     if(this.queryStr.fields) {
    //         const fields = this.queryStr.fields.split(',').join(' ')
    //         this.query = this.query.select(fields)
    //     } else {
    //         this.query.select( )
    //     }
    //     return this
    // }

    paginate(){
        const page = this.queryStr.page *1 ||1
        const limit = this.queryStr.limit*1 ||10
        const skip = (page-1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        
        // if(this.queryStr.page){
        //     const totalRestaurants = await Restaurant.countDocuments();
    
        //     if(query >= totalRestaurants) {
        //       return res.status(404).json({message:"page does not exist"})
        //     }
        // }
        return this
    }
}

module.exports = { APIfeatures }