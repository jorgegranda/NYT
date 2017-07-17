  var renderQuery =
  {
    headline: "",
    snippet: "",
    date: "",
    author: "",
    link: ""
  }
  var i = 0;

  function queryNYT()
  {
    var query = $("#search").val();
    var pageNo = $("#sel1").val();
    var pageNumber = pageNo;
    var begin = $("#startYear").val();
    if (begin != "")
    {
      pageNo += '&begin_date=';
      begin += '0101&end_date=';
    }

    var end = $("#endYear").val();
    if (end != "")
      end += '1231';

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + 'api-key=eafa397532be49299f095815f8165bde' + '&q=' + query + '&page=' + pageNo + begin + end;
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(response) {
      console.log(response);

        for (i = 0; i < pageNumber; i++)
        {
          var cloneDiv = $("<div>").attr({
            class: 'well',
            id: "#well" + i});
          var cloneAuthor = $("<h4>").attr('id', "#author" + i);
          var cloneSection = $("<h4>").attr('id', "#snippet" + i);
          var cloneDate = $("<h4>").attr('id', "#date" + i);
          var cloneLink = $("<a>").attr('id', "#link" + i);
          var cloneHeadline = $('<h3>').attr('id', "#headline" + i);
          var cloneLabel = $("<label>").attr('class', 'fas-stack fa-lg');

          var p = i + 1;

          renderQuery.headline = response.response.docs[i].headline.main;
          console.log(renderQuery.headline);
          renderQuery.snippet = response.response.docs[i].snippet;
          console.log(renderQuery.snippet);
          renderQuery.date = response.response.docs[i].pub_date;
          console.log(renderQuery.date);
          if (response.response.docs[i].byline == null)
            renderQuery.author == 'Unknown Author';
          else
            renderQuery.author = response.response.docs[i].byline.original;
          console.log(renderQuery.author);
          renderQuery.link = response.response.docs[i].web_url;
          console.log(renderQuery.link);

           cloneDiv.appendTo(".output-panel");
           cloneLabel.text(p).appendTo(cloneDiv);
           cloneAuthor.text(renderQuery.author).appendTo(cloneDiv);
           cloneHeadline.text(renderQuery.headline).appendTo(cloneDiv);
           cloneSection.text(renderQuery.snippet).appendTo(cloneDiv);
           cloneDate.text(renderQuery.date).appendTo(cloneDiv);
           cloneLink.attr('href', renderQuery.link).text(renderQuery.link).appendTo(cloneDiv);
      }

    }).fail(function(err) {
      throw err;
    });
  }

  $("#searchBtn").click(function(event)
  {
    event.preventDefault();
     queryNYT()
  });

  $("#clearBtn").click(function(event){
    $(".output-panel").empty();
  });
