const {db, Apartment, Broker} = require('../server/db')

const seed = async () =>{
  await db.sync({force:true})

  /*

  there is no Broker model so i couldnt run npm run seed :( idk if this was supposed to be taken out LOL

  */
  const Broker1 = await Broker.create({
    name: "Tom Green"
  })

  const Broker2 = await Broker.create({
    name: "Jim Baker"
  })

  const Broker3 = await Broker.create({
    name: "Ryan Guarino"
  })


  const Apt1 = await Apartment.create({
    address: "235 E 4th St",
    neighborhood: "East Village",
    brokerId: 1
  })

  const Apt2 = await Apartment.create({
    address: "254 Broome St",
    neighborhood: "Lower East Side",
    brokerId: 1
  })

  const Apt3 = await Apartment.create({
    address: "229 S 4th St",
    neighborhood: "Williamsburg",
    brokerId: 2
  })

  const Apt4 = await Apartment.create({
    address: "727 Manhattan Ave",
    neighborhood: "Greenpoint",
    brokerId: 3
  })

  const Apt5 = await Apartment.create({
    address: "300 E 7th St",
    neighborhood: "East Village",
    brokerId: 1
  })



  db.close()
  console.log(`

    Seeding successful!
    Time to blog!

  `)

}


seed().catch(err => {
  db.close()
  console.log(`

    Error seeding:

    ${err.message}

    ${err.stack}

  `)
})
