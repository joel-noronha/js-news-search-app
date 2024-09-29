const apikey='125cd9ae0e4c496980af0dd1740764c5'
const blogContainer=document.getElementById("blog-container");


const searchField=document.getElementById("search-input");
const searchButton = document.getElementById("search-button");





async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("Error fetching news", error);
        return []
    }
}


searchButton.addEventListener("click",async ()=>{
    const query = searchField.value.trim();
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        }catch(error){
console.log("Error fetching news by query", error);
        }
    }
});

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("Error fetching news", error);
        return []
    }
}


function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((articles) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src=articles.urlToImage;
        img.alt= articles.title;

        const title = document.createElement("h2");
        const TrunkcatedTitle = articles.title.length>30?articles.title.slice(0,30)+ "..." : articles.title;
        title.textContent=TrunkcatedTitle;

        const description = document.createElement("p");
        //const TrunkcatedDes = articles.description.length>120?articles.description.slice(0,120)+ "..." : articles.description;
        //description.textContent= TrunkcatedDes;
        description.textContent=articles.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click',()=>{
            window.open(articles.url,"_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}







(async ()=>{
    try{
        const articles = await fetchRandomNews();
        console.log(articles);
        displayBlogs(articles);
    }catch(error){
        console.error("Error fetching news", error);
    }
} )();