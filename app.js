// thrid party libs
const express = require('express')
const { json } = require('express/lib/response')
const res = require('express/lib/response')
const app = express()

// node libs
const fs = require('fs')
const PORT = 8000

app.set('view engine', 'pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({extended:false}))

// http://localhost:8000
app.get('/', (req, res) =>{
    fs.readFile('./data/customers.json', (err, data) => {
        if(err) throw err

        const customer = JSON.parse(data)
        res.render('home', { customers: customer })
        
    })    

});

app.post('/add', (req, res) =>{ 
    const formData = req.body


if( formData.customer.trim() == '' ){
    fs.readFile('./data/customers.json', (err, data)=>{
        if(err) throw err

        const customers = JSON.parse(data)
        res.render('home', { error:true, customer: customers })
    })  
}else{
    fs.readFile('./data/customers.json', (err, data) => {
        if(err) throw err

        const customers = JSON.parse(data)

        const customer = {
            id: id(),
            description: formData.customer,
            done:false
        }

        customers.push(customer)

        fs.writeFile('./data/customers.json',JSON.stringify(customers), (err) =>{
            if (err) throw err
            
            fs.readFile('./data/customers.json', (err, data)=>{
                if(err) throw err

                const customers = JSON.parse(data)
                res.render('home', { success:true, customer: customers })
            })  
            
        } )
    })
}

})


app.get('/:id/delete', (req, res)=>{
    const id = req.params.id

    fs.readFile('./data/customers.json', (err, data)=>{
        if(err) throw err

        const customer = JSON.parse(data)

        const filteredcustomers = customer.filter(customer => customers.id!=id)
        
        fs.writeFile('./data/customers.json', JSON.stringify(filteredcustomers), (err)=>{
            if (err) throw err

            res.render('home', { customers: filteredcustomers, deletes: true})
        })
    
    })
})

app.get('/:id/update', (req, res)=>{
    const id = req.params.id

    fs.readFile('./data/customers.json', (err, data)=>{
     if(err) throw err
     
     
     const customers = JSON.parse(data)
     const customer = customers.filter(customer => customer.id == id)[0]
     const customerIdx = customers.indexOf(customer)
     const splicecustomer = customers.splice(customerIdx, 1)[0]
     splicecustomer.done = true
     note.push(splicecustomer)

     fs.writeFile('./data/customers.json', JSON.stringify(customers), (err)=>{
         if(err) throw err

         res.render('home', {customers: customers})
     })
    })
    
})

app.listen(PORT, (err)=>{
    if(err) throw err

    console.log(`This app is running on port: ${ PORT }`)
});

 function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };