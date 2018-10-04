require(['m1', 'jquery'], (m1, e) => {
    console.log(e);
    let sum = m1.sum
    console.log(sum(3, 2));
})