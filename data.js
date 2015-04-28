d3.json("data/motion.json", function(error, json){
    //console.log(json);

var exampleData = [
        {
            key: "motion detected",
            values: []
        }
    ];

        // populate the empty object with your data
    json.forEach(function (d){
        exampleData[0].values.push(d)
    })  


    json.forEach(function (d){ 
        d.label = +d.label * 1000
    })


  nv.addGraph(function() {
    var chart = nv.models.lineChart()
                  .x(function(d) { return d.label })
                  .y(function(d) { return d.value }) //adjusting, 100% is 1.00, not 100 as it is in the data
                  .color(d3.scale.category10().range())
             

     chart.xAxis
        .margin({bottom: 50})
        .tickValues([1430215220000,1430220631000,1430226021000,1430233248000,1430236751000])
        .tickFormat(function(d) {
            return d3.time.format('%X')(new Date(d))
          });

    chart.yAxis
        .tickFormat(d3.format('f'));

    d3.select('#chart1')
        .datum(exampleData)
        .transition().duration(1200)
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
 });

d3.json("data/counter.json", function(error, json){

var exampleData = [
        {
            key: "ballot detected",
            values: []
        }
    ];

        // populate the empty object with your data
    json.forEach(function (d){
        exampleData[0].values.push(d)
    })  


    json.forEach(function (d){ 
        d.label = +d.label * 1000
    })


  nv.addGraph(function() {
    var chart = nv.models.lineChart()
                  .x(function(d) { return d.label })
                  .y(function(d) { return d.value })  //adjusting, 100% is 1.00, not 100 as it is in the data
                  .color(["#800000"])
                  
                  //.duration(1200)
                  //.width(width)
                  //.useInteractiveGuideline(true);
             

     chart.xAxis
        .margin({bottom: 50})
        .tickValues([1430215200000,1430220646000,1430226043000,1430232076000,1430236769000])
        .tickFormat(function(d) {
            return d3.time.format('%X')(new Date(d))
          });

    chart.yAxis
        .tickFormat(d3.format('f'));

    d3.select('#chart2')
        .datum(exampleData)
        .transition().duration(1200)
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
 });

var results = [
    {
        "key": "Baldassaro",
        "color": "#005288", //red
        "values": [
            {   "label": "Official Results",
                "value": 22
            }
            ]
    },
    {
        "key": "Coffee Maker",
        "color": "#800000",
        "values": [
            {   "label": "Official Results",
                "value": 16
            }
            ]
    },
    {
        "key": "Invalid",
        "color": "gray",
        "values": [
            {   "label": "Official Results",
                "value": 10
            }
            ]
    }
    ]


    nv.addGraph(function() {
        var chart = nv.models.multiBarChart()
            .x(function (d) { console.log(d); return d.label })
            .y(function (d) { return d.value })
            .color(["#005288", "#800000", "gray"]) 
            //.staggerLabels(true)
            .tooltips(true)
            //.showValues(true)

    chart.xAxis
        .margin({bottom: 50})

    chart.yAxis
        .tickFormat(d3.format('f'));
        //.margin({left: 250})

        d3.select('#chart3')
                .datum(results)
                .attr("id", function (d) { console.log(d); })
            .transition().duration(500)
                .call(chart);
 
        nv.utils.windowResize(chart.update);
        return chart;
    });

