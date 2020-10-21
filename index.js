const rectSpacing = 30;
const animationLength = 700;

function createShapeBars (data) {
    d3.select('#skills').select('svg')
        .append('g')
        .attr('id', 'rectGroup');

    d3.select('#rectGroup').selectAll('rect').data(data)
        .join('rect')
        .attr('id', d => d.id)
        .attr('height', 20)
        .attr('width', 0)
        .attr('transform', (d,i) => "translate(0, " + i*rectSpacing + ")")
        .transition()
        .duration((d,i) => 400 + i*100)
        .attr('width', d => d.value*3);
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
                d3.select("#" + d.id).classed('active', !currStatus);

                // Create spacing for rectangles
                if (!currStatus) {
                    d3.select('#rectGroup').selectAll('rect')
                        .transition()
                        .duration(animationLength)
                        .attr('transform', (rectD, rectI) => {
                            // Shift rectangles when one is activated
                            if (rectI < i) {
                                // Rectangles above the activated
                                // one aren't shifted
                                let yPos = rectI*rectSpacing;
                                return "translate(0, " + yPos + ")";
                            } else if (rectI === i) {
                                // Activated rectangle gets shifted down
                                // By one "stretch"
                                let yPos = i ? rectI*rectSpacing + rectSpacing : rectI*rectSpacing;
                                return "translate(0, " + yPos + ")";
                            } else {
                                // Rectangles below the activated one
                                // Get shifted down by two "stretches"
                                let yPos = i ? rectI*rectSpacing + rectSpacing*2 : rectI*rectSpacing + rectSpacing;
                                return "translate(0, " + yPos + ")";                                    
                            }
                        });
                } else {
                    d3.select('#rectGroup').selectAll('rect')
                        .transition()
                        .duration(animationLength)
                        .attr('transform', (rectD, rectI) => {
                            return "translate(0, " + rectI*rectSpacing + ")";
                        });
                }
            });

        createShapeBars(skills);
    })
});