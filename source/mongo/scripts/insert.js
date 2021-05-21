const customers = [];

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
}

const randomOrders = (id) => {
    const orders = [];
    for (let i = 0; i < getRandomArbitrary(1, 11); i++) {
        orders.push({
            _id:        ObjectId(),
            customerId: id,
            count:      getRandomArbitrary(1, 101),
            price:      getRandomArbitrary(20, 101),
            discount:   getRandomArbitrary(5, 31),
            title:      'some title',
            product:    'some product',
        });
    }


    return orders;
};

for (let i = 0; i < 5; i++) {
    let _id = ObjectId();
    customers.push({
        _id,
        name: {
            first: 'some first name',
            last:  'some last name' },
        balance: 15000,
        created: '2019-03-15T17:05:15.286Z',
        orders:  randomOrders(_id),
    });
}
db.test_customers.insert(customers);
print('customers: ', db.customers.dataSize(), 'bytes');
print('customers document count: ', db.customers.count());

