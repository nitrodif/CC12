//U74589834
function main() {
    var svg = d3.select("svg");
        var margin = 200;
        var width = svg.attr("width") - margin
        var height = svg.attr("height") - margin
        
        var xScale = d3.scaleTime()
            .range([0, width]);
        var yScale = d3.scaleLinear()
            .range([height, 0])

        svg.append()
            .attr("width", width + margin)
            .attr("height", height + margin)
            .append("g")
    //Step 1: Data Processing
        d3.csv('mock_stock_data.csv').then( function(data){
        
        const parseDate = d3.timeParse("%Y-%m-%d")
        data.forEach(d =>{
            d.Date = parseDate(d.Date)
            d.Stock = d.Stock
            d.Price = +d.Price
        
        }) // Continued Step 2 chosing chart Line chart
    xScale.domain(d3.extent(data, d => d.date));
    yScale.domain(0, d3.max(data, d => d.Price ));

    var g = svg
    svg.append("g")
        .attr("transform", 'translate(0,'+ height +')')
        .call(d3.axisBottom(xScale))
        .ticks(d3.timeDay.every(1))
        .tickFormat(d3.timeFormat(("%Y-%m-%d")));

    svg.append("g")
        .call(d3.axisLeft(yScale))

    var line = d3.line()
        .xScale(d => xScale(d.Date))
        .yScale(d => yScale(d.Price));

        svg.append("path")
            .datum(data)
            .attr("stroke", d.Stock === 'Apple' ? "orangered" : "seagreen")
            .attr("stroke-width", 1)
            .attr("d", line);
        }).catch(function(error){
            alert('Error loading csv file', error)})

            //Step 3: Interactivity
        function mouseOver(d, i){
            var xPos = parseFloat(d3.select(this).attr('x')) + xScale.bandWidth() / 2
            var yPos = parseFloat(d3.select(this).attr('y')) / 2 + height / 2

            d3.select('#tooltip')
                    .style('left', xPos + 'px')
                    .style('top'), yPos + 'px'
                    .select('#value').text(i.value)

            d3.select('#tooltip').classed('hidden', false);
        }
        function mouseOut(d, i){
            d3.select('#tooltip').classed('hidden', true);
        }

 }