const fs = require('fs')
const data = require("../data.json")

const { age, date } = require("../utils")




exports.index = function(req, res) {
    return res.render("instructors/index", { instructors: data.instructors })
} 
  
//show 
exports.show = function(req, res) { 
    //req.query.id
    //req.body

    //req.params.id = /:id

    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return   id == instructor.id
    })

    if (!foundInstructor) return res.send("Instructor Not Found!!")
//afunção para ajustar a data

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at)
       
    }

    return res.render("instructors/show", {instructor })
}

exports.create = function(req, res) {
    return res.render('instructors/create')
}


//post
exports.post =  function(req, res) {
    //req.query
    
        //req.body 
    
    
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            // req.body.key == ""
            if(req.body[key] == "") {
                return res.send('Please, fill a filld')
            }
            
        }
  
        let { avatar_url, birth, created_at, id, name, services, gender } = req.body

        birth = Date.parse(birth)
        created_at = Date.now()
        id = Number(data.instructors.length + 1)


        
        data.instructors.push({
            id,
            name,
            avatar_url,
            birth,
            gender,
            services,
            created_at
        })

        fs.writeFile("data.json", JSON.stringify(data,null, 2), function(err){
            if(err) return res.send("Write file error")

            return res.redirect(`/instructors/${id}`)
        })
    
        // return res.send(req.body)
    }

//edit

exports.edit = function(req, res) {

    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return id == instructor.id
    })

    if (!foundInstructor) return res.send("Instructor Not Found!!")
//afunção para ajustar a data
    
const instructor = {
    ...foundInstructor,
    birth : date(foundInstructor.birth)
}
    


    return res.render('instructors/edit', {instructor } )
}

exports.put = function(req, res ){
    const { id } = req.body

    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundindex){
        
        if(id == instructor.id){
            index = foundindex

            return  true
        }
        
    })

    if (!foundInstructor) return res.send("Instructor Not Found!!")

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)

    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write Error!!!")

        return res.redirect(`/instructors/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredInstructors = data.instructors.filter(function(instructor) {
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err ) return res.send("error!!!")

        return res.redirect("/instructors")
    })
}