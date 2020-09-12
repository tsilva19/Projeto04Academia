module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)
    
        let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
        const month = today.getUTCMonth() - birthDate.getUTCMonth()
    
        if(month < 0 || month == 0 && today.getUTCDate() < birthDate.getUTCDate()) {
            age = age -1 
        }
    
        return age
    
    },

    date: function(timestamp) {
        const date = new Date(timestamp)

        //yyyy
        const year = date.getUTCFullYear()

        //mm
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)

        //dd

        const day = `0${date.getUTCDate()}`.slice(-2)

        //return yyyy-mm-dd

        return `${year}-${month}-${day}`
    }
}

