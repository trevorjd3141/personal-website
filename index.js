const activeSkills = {};

function createShapeBars (data) {
    d3.select('#skills').select('svg').selectAll('rect').data(data)
        .join('rect')
        .attr('height', 12)
        .attr('width', d => d.value)
        .attr('transform', (d,i) => "translate(0, "+ i*32 + ")");
}

$(document).ready(function(){
    d3.csv('/data/skills.csv').then(skills => {
        skills.forEach(skill => {
            activeSkills[skill.name] = false;
        })
        
        d3.select('#about-bubbles').selectAll('li').data(skills)
            .join('li')
            .text(d => d.name)
            .on('click', (d,i,g) => {
                // Add the class 'active' to active buttons
                let currBubble = d3.select(g[i]);
                let currStatus = currBubble.classed('active');
                currBubble.classed('active', !currStatus);
                activeSkills[d.name] = !currStatus;

                createShapeBars(skills);
            });
    })
});