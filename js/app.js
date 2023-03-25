// const API_KEY = '9d24f04f8ed54e329c998862912d4d7f';

// const URL = 'https://newsapi.org/v2/top-headlines?';

// var url = ''+ URL +'country=ua&sortBy=popularity&apiKey='+ API_KEY +'';
// getNews();
// function getNews(){
//     $.getJSON(url, function(data){
//         console.log(data);
//     })
// }

getCustomNews()
function getCustomNews(){
    $.getJSON("https://641de502945125fff3d88d87.mockapi.io/newsfeed/newsfeed", function(data) {
        console.log(data);
        displayCustomNews(data);
    });
}

function displayCustomNews(articles){
    const newsContainer = document.getElementById('news-container');

    articles.forEach(article => {
        const newsItem = document.createElement('div');
       newsItem.className = `news-item`;

        const newsImage = document.createElement('img');
        newsImage.className = 'news-image';
        newsImage.src = article.image || 'запасне_зображення.jpg';

        const newsContent = document.createElement('div');
        newsContent.className = 'news-content';

        const newsTitle = document.createElement('h2');
        newsTitle.className = 'news-title';
        newsTitle.textContent = article.title;

        const newsDescription = document.createElement('p');
        newsDescription.className = 'news-description';
        newsDescription.textContent = article.description || 'Запасний опис';

        const newsLink = document.createElement('a');

        
        newsContent.appendChild(newsTitle);
        newsContent.appendChild(newsDescription);
        newsLink.appendChild(newsContent);
        newsItem.appendChild(newsImage);
        newsItem.appendChild(newsLink);
        
        newsLink.addEventListener('click',function(){
            openFullNews(article.id)
        })
        newsContainer.appendChild(newsItem);
    });
}

const apiKey = '8ca14f688738a75ec837c8fd6616348d';
const url = `https://gnews.io/api/v4/top-headlines?country=ua&lang=uk&token=${apiKey}`;

async function getNews() {
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.articles);
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');

    articles.forEach(article => {
        const newsItem = document.createElement('div');
       newsItem.className = 'news-item';

        const newsImage = document.createElement('img');
        newsImage.className = 'news-image';
        newsImage.src = article.image || 'запасне_зображення.jpg';

        const newsContent = document.createElement('div');
        newsContent.className = 'news-content';

        const newsTitle = document.createElement('h2');
        newsTitle.className = 'news-title';
        newsTitle.textContent = article.title;

        const newsDescription = document.createElement('p');
        newsDescription.className = 'news-description';
        newsDescription.textContent = article.description || 'Запасний опис';

        const newsLink = document.createElement('a');
        newsLink.href = article.url;
        newsLink.target = '_blank';

        newsContent.appendChild(newsTitle);
        newsContent.appendChild(newsDescription);
        newsLink.appendChild(newsContent);
        newsItem.appendChild(newsImage);
        newsItem.appendChild(newsLink);

        newsContainer.appendChild(newsItem);
    });
}

// getNews();

function openFullNews(id){
    console.log(id)
    $.getJSON('https://641de502945125fff3d88d87.mockapi.io/newsfeed/newsfeed?id='+ id+'', function(data) {
        console.log(data);
        changeMain(data);
    });
    function changeMain(data){
        $('main').html('<div class="full_news"><div class="full_back"><a href="./index.html" class="material-symbols-outlined">arrow_back</a><a href="./index.html">Назад</a></div><img class="full_news-image" src="'+ data[0].image+'"> <h1>'+data[0].title+'</h1><p>'+data[0].paragraph+'</p></div>');
    }
}

const toggleButton = document.querySelector(".dark_mode");
toggleButton.addEventListener('click', function() {
   const body = document.body;
   if (body.classList.contains('light')) {
      body.classList.remove('light');
      body.classList.add('dark');
      $('.news-item').removeClass('light');
      $('.news-item').addClass('dark');
      $('a').removeClass('light');
      $('a').addClass('dark');
   } else {
      body.classList.remove('dark');
      body.classList.add('light');
      $('.news-item').removeClass('dark');
      $('.news-item').addClass('light');
      $('a').removeClass('dark');
      $('a').addClass('light');
   }
});

$(".admin_panel").on('click',function(){
    var pass = prompt('Enter password to access the admil panel:');
    if(pass == "xui123"){
        $(".button_add-news").show();
        $('.admin_panel').hide()
    }
    else alert('Password invalid!');
})
$(".button_add-news").on('click', function(){
    $(".add-news_container").show(500, function() {
        $(this).css("display", "flex");
      });
      $('.add-input_title').on('input', function() {
        $('.news-title_prewiev').html($(this).val())
      });
      $('.add-input_description').on('input', function() {
        $('.news-description_prewiev').html($(this).val())
      });
      $('.add-input_image').on('input', function() {
        $('.news-image_prewiev').attr('src', $(this).val())
      });
      
})

$(".send-add_news").on('click', function(){
    $('.add-news_error').empty()
    if($('.add-input_title').val() == ""){
        $('.add-news_error').append('Введіть назву');
        return
    }
    if($('.add-input_description').val() == ""){
        $('.add-news_error').append('Введіть опис новини');
        return
    }
    if($('.add-input_paragraph').val() == ""){
        $('.add-news_error').append('Введіть повний текст новини');
        return
    }
    if($('.add-input_image').val() == ""){
        $('.add-news_error').append('Введіть посилання на картинку до новини');
        return
    }

    const data = {
        title: $('.add-input_title').val(),
        description: $('.add-input_description').val(),
        paragraph: $('.add-input_paragraph').val(),
        image: $('.add-input_image').val()
    }

    post();
    async function post(){
        const rating = await fetch("https://641de502945125fff3d88d87.mockapi.io/newsfeed/newsfeed", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const response = await rating.json()
    }
    closeAddNews();
})





$('.add-news_container').on('click', function(e){
    if(e.target === document.querySelector(".add-news_container")){
        closeAddNews();
    }
    else if(e.target === document.querySelector(".big-close")) closeBig();
});
$(document).keydown(function(event) {
    if (event.keyCode === 27) { // 27 - код клавіші "Esc"
      closeAddNews();
    }
  });
  
function closeAddNews(){
    $(".add-news_container").hide(500);
}
  