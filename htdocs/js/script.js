var axia = new Axia();

axia.addEventListener('breakpoints', function (e) {
    // Object {width: xxx, breakpoint: 960}
    // Object {width: xxx, breakpoint: 600}
    // Object {width: xxx, breakpoint: 1}
    console.log('e["breakpoint"] :' + e['breakpoint']);
});