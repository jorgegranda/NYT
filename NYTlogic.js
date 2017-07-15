  var renderQuery =
  {
    headline: "",
    snippet: "",
    date: "",
    author: "",
    link: ""
  }

  function queryNYT()
  {
    var query = $("#search").val();
    var pageNo = $("#sell").val();
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
      renderQuery.date = response.response.docs[0].pubdate;
      renderQuery.author = response.response.docs[0].byline.original;
      renderQuery.link = response.response.docs[0].web_url;

      $("#headline").text(renderQuery.headline);
      $("#author").text(renderQuery.author);
      $("#snippet").text(renderQuery.snippet);
      $("#date").text(renderQuery.date);
      $("#link").text(renderQuery.link);
    }).fail(function(err) {
      throw err;
    });
  }

  $("#searchBtn").click(function(event)
  {
    event.preventDefault();
     queryNYT()
  });
