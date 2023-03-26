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

        newsItem.innerHTML = `
            <img class="news-image" src="`+ article.image +`">
            <span class="material-symbols-outlined news-delete" onclick="deleteNews(${article.id})">delete</span>
            <span class="material-symbols-outlined news-edit" onclick="editNews(${article.id})">edit</span>`
        const newsLink = document.createElement('a');
        newsLink.innerHTML = `
            <div class="news-content">
                <h2 class="news-title">`+article.title+`</h2>
                <p class="news-description">`+article.description+` </p>
            </div>
        `;
        newsLink.addEventListener('click',function(){
            console.log(123)
            showAboutContent(article.id);
            window.history.pushState({}, '', '/news');
        })

        newsItem.appendChild(newsLink);
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
        $('.admin_panel').hide();
        $('.news-delete').show();
        $('.news-edit').show();
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


// Приклад створення кнопок навігації

// Приклад створення функцій для відображення різного вмісту
function showHomeContent() {
    console.log('home')
    getCustomNews();
  const contentContainer = document.querySelector('main');
  contentContainer.innerHTML = `        <div id="news-container" class = "news-container"></div>
        <button class="admin_panel">Admin panel</button>
        <button class="button_add-news">Додати новину</button>

        <div class="add-news_container">
            <div class="add-news_box">
                <p class="add_title">Введіть назву новини:</p>
                <input type="text" class="add-input_title">
                <p class="add_description">Введіть опис новини:</p>
                <input type="text" class="add-input_description">
                <p class="add_paragraph">Введіть повний текст новини:</p>
                <textarea class="add-input_paragraph"></textarea>
                <p class="add_image">Введіть посилання на картинку до новини:</p>
                <input type="text" class="add-input_image">
                <button class="send-add_news">Відправити новину</button>
                <div class="add-news_error"></div>
            </div>
            <div class="add-news_prewiev">
                <p>Prewiev news:</p>
                <div class="news-item_prewiev">
                    <img class="news-image_prewiev" src="https://nonews.co/wp-content/uploads/2016/11/www.podoliya.in_.ua_wp_content_uploads_2014_03_1386552010_ccd4518_biyka_na_bankoviy_75.jpg" alt="Error url image">
                    <a href="" target="_blank">
                        <div class="news-content_prewiev">
                            <h2 class="news-title_prewiev">Вибори до президента</h2>
                            <p class="news-description_prewiev">Порошенко досі не може вгамуватися. Тільки вчора говорив що залишає цю ідею, бо немає підтримки, а сьогодні вже влаштовує пікети перед Офісом Президента. </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>`;

        
}

function showAboutContent(id) {
$.getJSON('https://641de502945125fff3d88d87.mockapi.io/newsfeed/newsfeed?id='+ id+'', function(data) {
    const contentContainer = document.querySelector('main');
    contentContainer.innerHTML = '<div class="full_news"><div class="full_back"><a href="./index.html" class="material-symbols-outlined">arrow_back</a><a href="./index.html">Назад</a></div><div class="full_news-image_cont>"><img class="full_news-image" src="'+ data[0].image+'"></div> <h1>'+data[0].title+'</h1><p class="paragraph">'+data[0].paragraph+'</p></div>';  
});
}


// Приклад встановлення обробника подій для зміни URL-адреси
window.addEventListener('popstate', function(event) {
  const path = window.location.pathname;

  if (path === '/index.html') {
    showHomeContent();
  } else if (path === '/about') {
    showHomeContent();
  } else if( path === '/'){
    showHomeContent();
  } else if( path === ''){
    showHomeContent();
  }
});

function deleteNews(data){
    console.log(data);
    if(confirm("Ви впевнені що хочете видалити?")){
        post()
    };
    async function post(){
        const getList = await fetch('https://641de502945125fff3d88d87.mockapi.io/newsfeed/newsfeed' + '/'+ data, {
            method: "DELETE",
        })
        console.log(getList.json)
    }
}

function editNews(data){
    $('.edit-news_container').show();
    $.getJSON("https://641de502945125fff3d88d87.mockapi.io/newsfeed/newsfeed?id="+data+"", function(dat) {
        $('.edit-news_container').html(`
            <div class="edit-news_box">
                <p class="edit_title">Введіть назву новини:</p>
                <input type="text" class="edit-input_title" value="${dat[0].title}">

                <p class="edit_description">Введіть опис новини:</p>
                <input type="text" class="edit-input_description" value="${dat[0].description}">

                <p class="edit_paragraph">Введіть повний текст новини:</p>
                <textarea class="edit-input_paragraph">${dat[0].paragraph}</textarea>

                <p class="edit_image">Введіть посилання на картинку до новини:</p>
                <input type="text" class="edit-input_image" value="${dat[0].image}">
                
                <button class="send-edit_news">Відправити новину</button>
            <div class="add-news_error"></div>
        `);

        $('.edit-news_container').on('click', function(e){
            if(e.target === document.querySelector(".edit-news_container")){
                closeEditNews();
            }
            else if(e.target === document.querySelector(".big-close")) closeBig();
        });
        $(document).keydown(function(event) {
            if (event.keyCode === 27) { // 27 - код клавіші "Esc"
              closeEditNews();
            }
          });
          
        function closeEditNews(){
            $(".edit-news_container").hide(500);
        }
        $(".send-edit_news").on('click', function(){
            console.log(123);
            $('.edit-news_error').empty()
            if($('.edit-news_title').val() == ""){
                $('.edit-news_error').append('Введіть назву');
                return
            }
            if($('.edit-input_description').val() == ""){
                $('.edit-news_error').append('Введіть опис новини');
                return
            }
            if($('.edit-input_paragraph').val() == ""){
                $('.edit-news_error').append('Введіть повний текст новини');
                return
            }
            if($('.edit-input_image').val() == ""){
                $('.edit-news_error').append('Введіть посилання на картинку до новини');
                return
            }
        
            const datat = {
                title: $('.edit-input_title').val(),
                description: $('.edit-input_description').val(),
                paragraph: $('.edit-input_paragraph').val(),
                image: $('.edit-input_image').val()
            }
        
            post();
            async function post(){
                const rating = await fetch('https://641de502945125fff3d88d87.mockapi.io/newsfeed/newsfeed' + '/'+ data, {
                    method: "PUT",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datat)
                })
                const response = await rating.json()
            }
            closeEditNews();
        })

    })
 
}