
function helper()
{
	// Array to be sorted
	var array=document.getElementById('arr').value
	var arr=array.split("")
	var sorted_array=quick_Sort(arr,1)
	drawedge(sorted_array);
	draw();
	
}

var g = new dagreD3.graphlib.Graph()
.setGraph({})
.setDefaultEdgeLabel(function() { return {}; });
var visited=[];
var leaf=[];

function quick_Sort(origArray,count) 
{
	if(origArray.length==0)return[];

	var lab=origArray.toString();


	g.setNode(count,{ label: lab,class: "type-TOP" ,labelStyle: "font-weight: bold",id:count});

	visited.push(count)

	if (origArray.length <= 1) 
	{ 
		leaf.push(count)
		return origArray;
	} 
	else
	{

		var left = [];
		var right = [];
		var newArray = [];
		var pivot = origArray.pop();
		var length = origArray.length;

		for (var i = 0; i < length; i++) 
		{
			if (origArray[i] <=pivot)
			{
				left.push(origArray[i]);
			} 
			else if(origArray[i]>pivot)
			{
				right.push(origArray[i]);
			}
		}

		var temp=left.toString()+',['+pivot.toString()+'],'+right.toString();

		g.setNode(-count,{ label: temp,class: "type-TOP" ,labelStyle: "font-weight: bold",id:-count});
		visited.push(-count)


		return newArray.concat(quick_Sort(left,3*count-1), quick_Sort([pivot],3*count),quick_Sort(right,3*count+1));
	}
}	

function draw()
{
	g.nodes().forEach(function(v) 
	{
		 var node = g.node(v);
	  	// Round the corners of the nodes
	  	node.rx = node.ry = 5;
	})

	// Create the renderer
	var render = new dagreD3.render();

	// Set up an SVG group so that we can translate the final graph.
	var svg = d3.select("svg"),
	svgGroup = svg.append("g");

	// Run the renderer. This is what draws the final graph.
	render(d3.select("svg g"), g);

	// Center the graph
	var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
	svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
	svg.attr("height", g.graph().height + 40);

}

function drawedge(arr)
{
	for(i=1;i<=1045;i++)
	{
			
		
		if(visited.indexOf(i)!=-1 && visited.indexOf(-i)!=-1)
		{
			
			g.setEdge(i,-i,{label:"PARTITION"});
		}

		
	}
	for(i=1;i<=1045;i++)
	{
		if(visited.indexOf(-i)!=-1 && visited.indexOf(3*i-1)!=-1)
		{
			g.setEdge(-i,3*i-1,{label:"LEFT"});
			
		}
	}
	for(i=1;i<=1045;i++)
	{
		if(visited.indexOf(-i)!=-1 && visited.indexOf(3*i)!=-1)
		{
			g.setEdge(-i,3*i,{label:"PIVOT"});
			
		}
	}

	for(i=1;i<=1045;i++)
	{
		if(visited.indexOf(-i)!=-1 && visited.indexOf(3*i+1)!=-1)
		{
			g.setEdge(-i,3*i+1,{label:"RIGHT"});
			
		}
	}

	g.setNode(0,{ label:arr.toString(),class: "type-TOP" });
	
	for(i=0;i<leaf.length;i++)
	{
		g.setEdge(leaf[i],0,{label:"SORTEDARRAY"});
		
	}

} 
