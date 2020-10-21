const activeSkills = {};

function createShapeBars (data) {
    d3.select('#skills').select('svg').selectAll('rect').remove();
    d3.select('#skills').select('svg').selectAll('rect').data(data)
        .join('rect').filter(d => activeSkills[d.name])
        .attr('height', 20)
        .attr('width', 0)
        .attr('transform', (d,i) => "translate(0, "+ i*32 + ")")
        .transition()
        .duration((d,i) => 400 + i*100)
        .attr('width', d => d.value*3);
}

$(document).ready(function(){
    d3.csv('/data/skills.csv').then(skills => {
        skills.forEach(skill => {
            if (skill.name !== 'Python') {
                activeSkills[skill.name] = true;
            } else {
                activeSkills[skill.name] = false;
            }
        })
        
        d3.select('#about-bubbles').selectAll('li').data(skills)
            .join('li')
            .text(d => d.name)
            .attr('class', (d,i,g) => {
                if (d.name !== 'Python') {
                    return 'active';
                }
            })
            .on('click', (d,i,g) => {
                // Add the class 'active' to active buttons
                let currBubble = d3.select(g[i]);
                let currStatus = currBubble.classed('active');
                currBubble.classed('active', !currStatus);
                activeSkills[d.name] = !currStatus;

                createShapeBars(skills);
            });

        createShapeBars(skills);
    })
});