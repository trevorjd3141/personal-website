const rectSpacing = 30;
const rectStretch = 15;
const animationLength = 700;
var dataConst;

function createShapeBars (data) {
    dataConst = data;

    // Create scale for the data
    let scale = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([0, 300]);

    // Add SVG
    d3.select('#skills').select('svg')
        .append('g')
        .attr('id', 'rectGroup');

    // Add groups for rect/text
    d3.select('#rectGroup').selectAll('g').data(data)
        .enter().append('g')
        .attr('transform', (d,i) => "translate(5, " + i*rectSpacing + ")")
        .attr('id', d => d.id);

    // Add rects
    d3.select('#rectGroup').selectAll('g').data(data)
        .append('rect')
        .attr('height', 20)
        .attr('width', 0)
        .transition()
        .duration((d,i) => 400 + i*200)
        .attr('width', d => scale(d.value));
    
    // Add text for rectangles
    d3.select('#rectGroup').selectAll('g').data(data)
        .append('text')
        .transition()
        .duration((d,i) => 400 + i*100)
        .attr('transform', (d,i) => {
            let xShift = scale(d.value) + 10;
            return "translate(" + xShift + ", 17)"
        })
        .text(d => d.name);

    d3.select("#skills").select("svg").append("g")
        .attr('id', 'skillAxis')
        .attr('transform', (d,i) => {
            let yShift = data.length*rectSpacing;
            return "translate(5, " + yShift + ")"
        })
        .call(d3.axisBottom(scale).ticks(5));



}

$(document).ready(function(){
    d3.csv('/data/skills.csv').then(skills => {
        
        d3.select('#about-bubbles').selectAll('li').data(skills)
            .join('li')
            .text(d => d.name)
            .on('click', (d,i,g) => {
                let currStatus = d3.select(g[i]).classed('active');

                // Activate the appropriate skill bubble
                d3.select('#about-bubbles').selectAll('li')
                    .classed('active', false);
                d3.select(g[i]).classed('active', !currStatus);

                // Activate the appropriate rectangle
                d3.select('#rectGroup').selectAll('rect')
                    .classed('active', false);
                d3.select("#" + d.id).select('rect').classed('active', !currStatus);

                // Move Axis
                d3.select("#skillAxis")
                    .transition()
                    .duration(animationLength)
                    .attr('transform', () => {
                        let yShift = i ? dataConst.length*rectSpacing + rectStretch*2 : dataConst.length*rectSpacing + rectStretch;
                        return "translate(5, " + yShift + ")"
                    });

                // Create spacing for rectangles
                if (!currStatus) {
                    d3.select('#rectGroup').selectAll('g')
                        .transition()
                        .duration(animationLength)
                        .attr('transform', (rectD, rectI) => {
                            // Shift rectangles when one is activated
                            if (rectI < i) {
                                // Rectangles above the activated
                                // one aren't shifted
                                let yPos = rectI*rectSpacing;
                                return "translate(5, " + yPos + ")";
                            } else if (rectI === i) {
                                // Activated rectangle gets shifted down
                                // By one "stretch"
                                let yPos = i ? rectI*rectSpacing + rectStretch : rectI*rectSpacing;
                                return "translate(5, " + yPos + ")";
                            } else {
                                // Rectangles below the activated one
                                // Get shifted down by two "stretches"
                                let yPos = i ? rectI*rectSpacing + rectStretch*2 : rectI*rectSpacing + rectStretch;
                                return "translate(5, " + yPos + ")";                                    
                            }
                        });
                } else {
                    d3.select('#rectGroup').selectAll('g')
                        .transition()
                        .duration(animationLength)
                        .attr('transform', (rectD, rectI) => {
                            return "translate(5, " + rectI*rectSpacing + ")";
                        });

                    d3.select("#skillAxis")
                        .transition()
                        .duration(animationLength)
                        .attr('transform', () => {
                            let yShift = dataConst.length*rectSpacing;
                            return "translate(5, " + yShift + ")"
                        });
                }
            });

        createShapeBars(skills);
    })
});