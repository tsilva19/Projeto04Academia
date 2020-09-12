const fs = require('fs')
const data = require("../data.json")

const { age, date } = require("../utils")



exports.index = function(req, res) {
    return res.render("members/index", { members: data.members })
} 
  
//show 
exports.show = function(req, res) { 
    //req.query.id
    //req.body

    //req.params.id = /:id

    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return  id == member.id 
    })

    if (!foundMember) return res.send("member Not Found!!")
//afunção para ajustar a data

    const member = {
        ...foundMember,
        age: age(foundMember.birth)
       
    }

    return res.render("members/show", {member })
}

//create
exports.create = function(req, res) {
    return res.render('members/create')
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
  
        

        birth = Date.parse(req.body.birth)
         id = 1
        const lastMember = data.members[data.members.length + 1]

        if(lastMember) {
            id = lastIMember.d + 1
        }


         
        data.members.push({
            id,
            ...req.body,
            
            birth
        })

        fs.writeFile("data.json", JSON.stringify(data,null, 2), function(err){
            if(err) return res.send("Write file error")

            return res.redirect(`/members/${id}`)
        })
    
        // return res.send(req.body)
    }

//edit

exports.edit = function(req, res) {

    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return id == member.id
    })

    if (!foundMember) return res.send("member Not Found!!")
//afunção para ajustar a data
    
const member = {
    ...foundMember,
    birth : date(foundMember.birth)
}
    


    return res.render('members/edit', {member } )
}

exports.put = function(req, res ){
    const { id } = req.body

    let index = 0

    const foundMember = data.members.find(function(member, foundindex){
        
        if(id == member.id){
            index = foundindex

            return  true
        }
        
    })

    if (!foundMember) return res.send("member Not Found!!")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)

    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write Error!!!")

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredmembers = data.members.filter(function(member) {
        return member.id != id
    })

    data.members = filteredmembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err ) return res.send("error!!!")

        return res.redirect("/members")
    })
}