
print('============================================================================================================================================');

db.test_customers.aggregate([
    {
        $project: {
            _id:    1,
            fName:  '$name.first',
            lName:  '$name.last',
            orders: {orders: true, _id: {$first: '$orders.customerId'}, count: 1, price: 1, product: 1, discount: 1},
        },
    },
]).pretty();

db.test_customers.aggregate([
    {
        $group: {_id: null, total: {$sum: '$balance'}},
    },
]).pretty();


const itemsPerPage = 1;
const pages = Math.ceil(db.test_customers.countDocuments({}) / itemsPerPage); // 3.1 // 4

for (let page = 0; page < pages; page++) {
    print(`=============================Page: ${page + 1}=============================`);

    const cursor = db.test_customers.find({}, { orders: true })
        .sort({ orders: 1 })
        .limit(itemsPerPage)
        .skip(page * itemsPerPage); // Step 1 = 0

    print(tojson(cursor.toArray()));
}

print('test_customers document count: ', db.test_customers.count());

print('============================================================================================================================================');

