d3.csv("data/COUNTER.csv", function(error, data){
        
        console.log(exampleData)
        // create an empty object that nv is expecting
        var exampleData = [
        {
            key: "ballot detected",
            values: []
        }
    ];

        // populate the empty object with your data
    data.forEach(function (d){
        //d.value = +d.value
        exampleData[0].values.push(d)    
    })       

    data.forEach(function (d){ 
        d.label = +d.label * 1000
    })

    nv.addGraph(function() {
        var chart = nv.models.discreteBarChart()
            .x(function (d) { console.log(d); return d.label })
            .y(function (d) { return d.value })
            .staggerLabels(true)
            .tooltips(true)
            .showValues(true)

    chart.xAxis
        .margin({bottom: 50})
        .tickValues([1428417291000,1428417303000,1428417331000])
        .tickFormat(function(d) {
            return d3.time.format('%X')(new Date(d))
          });

    //chart.yAxis
      //  .tickFormat(d3.format('g'));

        d3.select('#chart1')
                .datum(exampleData)
                .attr("id", function (d) { console.log(d); })
            .transition().duration(500)
                .call(chart);
 
        nv.utils.windowResize(chart.update);
        return chart;
    });
});

d3.csv("https://github.com/mbaldassaro/ballotbots/blob/gh-pages/data/COUNTER.CSV", function(error, data){

var exampleData = [
        {
            key: "ballot detected",
            values: []
        }
    ];

        // populate the empty object with your data
    data.forEach(function (d){
        //d.value = +d.value
        exampleData[0].values.push(d)
    })  


    data.forEach(function (d){ 
        d.label = +d.label * 1000
    })


  nv.addGraph(function() {
    var chart = nv.models.lineChart()
                  .x(function(d) { return d.label })
                  .y(function(d) { return d.value }) //adjusting, 100% is 1.00, not 100 as it is in the data
                  //.color(d3.scale.category10().range())
                  
                  //.duration(1200)
                  //.width(width)
                  //.useInteractiveGuideline(true);
             

     chart.xAxis
        .margin({bottom: 50})
        .tickValues([1428417291000,1428417303000,1428417331000])
        .tickFormat(function(d) {
            return d3.time.format('%X')(new Date(d))
          });

    chart.yAxis
        .tickFormat(d3.format('X'));

    d3.select('#chart2')
        .datum(exampleData)
        .transition().duration(1200)
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
 });