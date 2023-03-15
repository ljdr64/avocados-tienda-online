/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector("#app");
appNode.className = 'grid gap-4 grid-cols-3 grid-rows-3';

const formatPrice = (price) => {    
    const newPrice = new window.Intl.NumberFormat('en-EN',{
        style: "currency",
        currency: "USD",
    }).format(price);

    return newPrice;
}

//web api
// Conectarnos al server
// promise -> async/await
window
.fetch(`${baseUrl}/api/avo`)
// procesar la respuesta, y convertirla en JSON
.then(respuesta => respuesta.json())
// JSON -> Data -> Renderizar info browser
.then((responseJson) => {
    const todosLosItems = [];
    responseJson.data.forEach((item) => {
        // crear imagen
        const imagen = document.createElement('img');
        imagen.src = `${baseUrl}${item.image}`;
        imagen.className = 'h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto';        

        // crear titulo
        const title = document.createElement('h2');
        title.textContent = item.name;
        title.className = 'text-lg text-green-700';

        // crear precio
        const price = document.createElement('div');
        price.textContent = formatPrice(item.price);
        price.className = 'text-gray-600';
        
        // Wrap price & title
        const priceAndTitle = document.createElement('div');
        priceAndTitle.className = 'text-center md:text-left';
        priceAndTitle.appendChild(title);
        priceAndTitle.appendChild(price);

        // Wrap Img & price & title
        const container = document.createElement('div');
        container.append(imagen, priceAndTitle);
        container.className = 'bg-white border-2 border-green-700 rounded-lg p-2 shadow-xl';

        todosLosItems.push(container);
    });

    appNode.append(...todosLosItems);
});