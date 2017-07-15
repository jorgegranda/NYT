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
    var begin = $("#startYear").val();
    var end = $("#endYear").val();
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + 'api-key=eafa397532be49299f095815f8165bde' + '&' + query + '&' + pageNo + '&' + begin + '&' + end;
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(response) {
      console.log(response);
      renderQuery.headline = response.response.docs[0].headline.main;
      renderQuery.snippet = response.response.docs[0].snippet;
      renderQuery.date = response.response.docs[0].pub_date;
      renderQuery.author = response.response.docs[0].byline.original;
      renderQuery.link = response.response.docs[0].web_url;

      $("#headline").text(renderQuery.headline);
      $("#author").text(renderQuery.author);
      $("#snippet").text(renderQuery.snippet);
      $("#date").text(renderQuery.date);
      $("#link").text(renderQuery.link);
      $("#prettybox").text('1');

      if (pageNo > 1)
      {
        for (i = 0; i < pageNo - 1; i++)
        {
          var cloneDiv = $("<div>").attr('id', "#well" + i);
          var cloneAuthor = $("<h4>").attr('id', "#author" + i);
          var cloneSection = $("<h4>").attr('id', "#snippet" + i);
          var cloneDate = $("<h4>").attr('id', "#date" + i);
          var cloneLink = $("<a>").attr('id', "#link" + i);
          var cloneHeadline = $('<h3>').attr('id', "#headline" + i);
          var cloneBox = $("<i>").attr(
          {
            class: "fa fa-square fa-2x",
            id: "prettyBox" + i,
          }).css('aria-hidden', 'true');
          var p = i + 2;

          renderQuery.headline = response.response.docs[i].headline.main;
          console.log(renderQuery.headline);
          renderQuery.snippet = response.response.docs[i].snippet;
          console.log(renderQuery.snippet);
          renderQuery.date = response.response.docs[i].pub_date;
          console.log(renderQuery.date);
          renderQuery.author = response.response.docs[i].byline.original;
          console.log(renderQuery.author);
          renderQuery.link = response.response.docs[i].web_url;
          console.log(renderQuery.link);

           cloneDiv.prependTo(".panel-body");
           cloneBox.text(p).appendTo(cloneDiv);
           cloneAuthor.text(renderQuery.author).appendTo(cloneDiv);
           cloneHeadline.text(renderQuery.headline).appendTo(cloneDiv);
           cloneSection.text(renderQuery.snippet).appendTo(cloneDiv);
           cloneDate.text(renderQuery.date).appendTo(cloneDiv);
           cloneLink.attr('href', renderQuery.link).text(renderQuery.link).appendTo(cloneDiv);
      }
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
