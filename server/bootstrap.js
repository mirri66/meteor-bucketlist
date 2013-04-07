// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Lists.find().count() < 3){    
   var data = [
      {name: "Movies",
       contents: [
         ["The Number 23", "Thriller", "Psychological"],
         ["There's something about Mary", "Comedy"],
       ]
      },
      {name: "Food",
       contents: [
         ["Zushi Puzzle", "sushi"],
         ["Taqueria Cancun", "cheap", "burrito"],
         ]
      },
      {name: "Events",
       contents: [
         ["Maker Faire", "Tech"],
       ]
      }
    ];

    var timestamp = (new Date()).getTime();
    for (var i = 0; i < data.length; i++) {
      var list_id = Lists.insert({name: data[i].name});
      for (var j = 0; j < data[i].contents.length; j++) {
        var info = data[i].contents[j];
        Todos.insert({list_id: list_id,
                      text: info[0],
                      timestamp: timestamp,
                      votes: 1,
                      tags: info.slice(1)});
        timestamp += 1; // ensure unique timestamp.
      }
    }
  } 
});
