window.addEventListener("load",()=>{
    getNews("health");      //business, entertainment, general,health,science,sports,technology
})

async function getNews(query) {
    let res=await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/${query}/in.json`)
    let data=await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    let template=document.querySelector('template');
    let container=document.querySelector('.cards-container');
    container.innerHTML="";
    articles.forEach((article) => {
         if(!article.urlToImage)  return;   //article with no image will not be added
         let cardClone=template.content.cloneNode(true);   //deep cloning
         fillData(cardClone,article);
        container.append(cardClone)
    });
}

function fillData(cardClone,article) {
    let img=cardClone.querySelector('#news-img')
    let h4=cardClone.querySelector('h4');
    let h5=cardClone.querySelector('h5');
    let p=cardClone.querySelector('.content')

    img.src=article.urlToImage;
    h4.innerHTML=article.title;
    p.innerHTML=article.description;
    let date=new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"})
    h5.innerHTML=`${article.source.name}: ${date}`
    
    let card=cardClone.querySelector('.cards');
    card.addEventListener('click',()=>{
        window.open(article.url,'_blank');
    })
}

//button
let btn=document.querySelector('button');
let input=document.querySelector('input');
btn.addEventListener('click',()=>{
    let text=input.value;
    if(curr!=null) {
        curr.classList.remove('active');
    }
    if(text) {
        getNews(text);
    }
    else {
        return;
    }
})

//<a> 
let a=document.getElementById('health');
a.classList.add('active')
let curr=a;
function anchorTags(text) {
    getNews(text)
    a=document.getElementById(text)
    if(curr!=null) {
        curr.classList.remove('active');
    }
    curr=a;
    a.classList.add('active')
}

function reload() {
    window.location.reload();
}