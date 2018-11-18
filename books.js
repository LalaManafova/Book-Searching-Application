const booksApp = {};

booksApp.init = function(){
    $('#submit').on('click', function(){
    let search = $('#search').val()
    $('.results').children().remove()
      booksApp.booksSearch(search)
    })

    $('.book-category').on('click', function(){
      let category = event.target.id
      booksApp.booksSearch(category)
    })
  };


booksApp.booksSearch = function(search){
    $.ajax({
      url: 'https://www.googleapis.com/books/v1/volumes?q='+ search,
      method: 'GET'
    })
    .done(function(data){
      $('.results').text('')
      data.items.forEach(function(element, i) {
      $('.results').append(
        '<div class="bookTitle" id = "'+i+'">'+element.volumeInfo.title+'</div>'
        )
      });
      booksApp.booksDetailLookup(data)
    })
  };

booksApp.booksDetailLookup = function(data){
  $('.bookTitle').on('click', function(){
    let bookNumber = $(this).attr("id")
    $('.results').children().remove()
    $('.results').append(
     '<div>'+data.items[bookNumber].volumeInfo.title+'</div>'
      )
      if(data.items[bookNumber].volumeInfo.description){
        $('.results').append(
          '<div class="description">'+data.items[bookNumber].volumeInfo.authors+'</div>',
          '<div class="description">'+data.items[bookNumber].volumeInfo.publisher+'</div>',
          '<div class="description">'+data.items[bookNumber].volumeInfo.description+'</div>',
          '<img class="thumbnail-images" src="'+data.items[bookNumber].volumeInfo.imageLinks.thumbnail+'">'
           )
      } else {
        $('.results').append(
          '<div class="description">Description is not available. Please visit the link below.</div>'
           )
      }
    

    $('.results').append( 
     '<a class="buyLink" href="'+data.items[bookNumber].volumeInfo.previewLink+'">Buy Here</a>',
     '<a class="ebooks" href="'+data.items[bookNumber].volumeInfo.canonicalVolumeLink+'">Ebooks for Android</a>'
         )
  })
  
}




$(function(){
    booksApp.init();
})