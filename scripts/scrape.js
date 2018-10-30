var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function() {
  return axios.get("https://www.reddit.com/r/funny/").then(function(res) {
    var $ = cheerio.load(res.data);
    var articles = [];

    $("scrollerItem").each(function(i, element) {

      var head = $(this)
        .find("h2")
        .text()
        .trim();

      var url = $(this)
        .find("a")
        .attr("href");
     
      if (head &&  url) {
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();


        var dataToAdd = {
          headline: headNeat,
          url: "https://www.reddit.com/r/funny/" + url
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

module.exports = scrape;
