d3.csv("data/counter.csv", function(error, csv){

var exampleData = [
        {
            key: "motion detected",
            values: []
        }
    ];

        // populate the empty object with your data
    csv.forEach(function (d){
        exampleData[0].values.push(d)
    })  


    csv.forEach(function (d){ 
        d.label = +d.label * 1000
    })


  nv.addGraph(function() {
    var chart = nv.models.lineChart()
                  .x(function(d) { return d.label })
                  .y(function(d) { return d.value }) //adjusting, 100% is 1.00, not 100 as it is in the data
                  .color(d3.scale.category10().range())
                  
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

    d3.select('#chart1')
        .datum(exampleData)
        .transition().duration(1200)
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
 });

d3.csv("data/counter.csv", function(error, csv){

var exampleData = [
        {
            key: "ballot detected",
            values: []
        }
    ];

        // populate the empty object with your data
    csv.forEach(function (d){
        exampleData[0].values.push(d)
    })  


    csv.forEach(function (d){ 
        d.label = +d.label * 1000
    })


  nv.addGraph(function() {
    var chart = nv.models.lineChart()
                  .x(function(d) { return d.label })
                  .y(function(d) { return d.value }) //adjusting, 100% is 1.00, not 100 as it is in the data
                  .color(["#800000"])
                  
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

var provisional = [
    {
        "key": "Baldassaro (20)",
        "color": "#005288", //red
        "values": [
            {   "label": "Baldassaro",
                "value": 20
            }
            ]
    },
    {
        "key": "Coffee Maker (5)",
        "color": "#800000",
        "values": [
            {   
                "label": "Coffee Maker",
                "value": 5
            }    
            ]
    },
    {
        "key": "Other (5)",
        "color": "green",
        "values": [
            {   
                "label": "Other",
                "value": 5
            }    
            ]
    },
    {
        "key": "Invalid (5)",
        "color": "gray",
        "values": [
            {   
                "label": "Invalid",
                "value": 5
            }    
            ]
    }
    ]


    nv.addGraph(function() {
        var chart = nv.models.multiBarChart()
            .x(function (d) { console.log(d); return d.label })
            .y(function (d) { return d.value })
            .color(["#005288", "#800000", "green", "gray"]) 
            //.staggerLabels(true)
            .tooltips(true)
            //.showValues(true)

    chart.xAxis
        .margin({bottom: 50})

    chart.yAxis
        .tickFormat(d3.format('f'));
        //.margin({left: 250})

        d3.select('#chart3')
                .datum(provisional)
                .attr("id", function (d) { console.log(d); })
            .transition().duration(500)
                .call(chart);
 
        nv.utils.windowResize(chart.update);
        return chart;
    });




var official = [
    {
        "key": "Baldassaro",
        "color": "#005288", //red
        "values": [
            {   "label": "Baldassaro",
                "value": 20
            }
            ]
    },
    {
        "key": "Coffee Maker",
        "color": "#800000",
        "values": [
            {   
                "label": "Coffee Maker",
                "value": 0
            }    
            ]
    },
    {
        "key": "Other",
        "color": "green",
        "values": [
            {   
                "label": "Other",
                "value": 0
            }    
            ]
    },
    {
        "key": "Invalid",
        "color": "gray",
        "values": [
            {   
                "label": "Invalid",
                "value": 15
            }    
            ]
    }
    ]


    nv.addGraph(function() {
        var chart = nv.models.multiBarChart()
            .x(function (d) { console.log(d); return d.label })
            .y(function (d) { return d.value })
            .color(["#005288", "#800000", "green", "gray"]) 
            //.staggerLabels(true)
            .tooltips(true)
            //.showValues(true)

    chart.xAxis
        .margin({bottom: 50})

    chart.yAxis
        .tickFormat(d3.format('f'));
        //.margin({left: 250})

        d3.select('#chart4')
                .datum(official)
                .attr("id", function (d) { console.log(d); })
            .transition().duration(500)
                .call(chart);
 
        nv.utils.windowResize(chart.update);
        return chart;
    });
