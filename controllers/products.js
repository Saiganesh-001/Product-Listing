exports.categoryList = (req, res) => {
    fetch("https://json-server-c67opnddza-el.a.run.app/categories")
        .then(response => response.json())
        .then(products => res.send(products))
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).send('An error occurred while fetching products.');
        });
};

exports.companyList = (req, res) => {
    fetch("https://json-server-c67opnddza-el.a.run.app/companies")
        .then(response => response.json())
        .then(products => res.send(products))
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).send('An error occurred while fetching products.');
        });
};


exports.products = (req, res) => {
    const {top , minPrice, maxPrice,availability } = req.query;

    fetch(`https://json-server-c67opnddza-el.a.run.app/products`)
        .then(response => response.json())
        .then(products => {
            if(availability){
                products = products.filter(product =>product.availability === availability);
            }
            if(minPrice){
                products = products.filter(product =>product.price >= minPrice);
            }
            if(maxPrice){
                products = products.filter(product =>product.price <= maxPrice);
            }
            if(top){
                products = products.filter((product,index) => index < top);
            }
            return products;
        })
        .then(products => res.send(products))
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).send('An error occurred while fetching products.');
        });
};

exports.companyAndCategory = (req, res) => {
    const { companyName, categoryName } = req.params;
    const { top, minPrice, maxPrice, availability } = req.query;

    let url = `https://json-server.bytexl.app/companies/${companyName}/categories/${categoryName}/products`;

    if(availability) url += `?availability=${availability}`;

    if(minPrice){
        if(url.includes('?')) url += `&`;
        else url += '?'

        url += `minPrice=${minPrice}`;
    }

    if(maxPrice){
        if(url.includes('?')) url += `&`;
        else url += '?'

        url += `maxPrice=${maxPrice}`;
    }
    
    if(top){
        if(url.includes('?')) url += `&`;
        else url += '?'

        url += `top=${top}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(products => res.send(products))
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).send('An error occurred while fetching products.');
        });
};

exports.company = (req, res) => {
    const { companyName } = req.params;
    const { top, minPrice, maxPrice, availability } = req.query;
    
    let url = `https://json-server.bytexl.app/companies/${companyName}/products`;
    
    if (availability) url += `?availability=${availability}`;
    
    if(minPrice){
        if(url.includes('?')) url += `&`;
        else url += '?'

        url += `minPrice=${minPrice}`;
    }
    if(maxPrice){
        if(url.includes('?')) url += `&`;
        else url += '?'

        url += `maxPrice=${maxPrice}`;
    }
    if(top){
        if(url.includes('?')) url += `&`;
        else url += '?'

        url += `top=${top}`;
    }

    fetch(url)
    .then(response => response.json())
    .then(products => res.send(products))
    .catch(error => {
        console.error('Error fetching products:', error);
        res.status(500).send('An error occurred while fetching products.');
    });
};

exports.category = (req, res) => {
    const { categoryName } = req.params;
    const { top, minPrice ,maxPrice, availability } = req.query;

    let url = `https://json-server.bytexl.app/categories/${categoryName}/products`;

    if (availability) url += `?availability=${availability}`;

    if(minPrice){
        if(url.includes('?')) url += `&`;
        else url += '?'

        url += `minPrice=${minPrice}`;
    }

    if(maxPrice){
        if(url.includes('?')) url += `&`;
        else url += '?'

        url += `maxPrice=${maxPrice}`;
    }
    if(top){
        if(url.includes('?')) url += `&`;
        else url += '?'

        url += `top=${top}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(products => res.send(products))
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).send('An error occurred while fetching products.');
        });
}
