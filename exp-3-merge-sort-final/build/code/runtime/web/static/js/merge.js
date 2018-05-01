
//Helper funtion to initiate function calls

//  way of taking input , by default its space 

function reset()
{
	g = null
	g = new dagreD3.graphlib.Graph()
	.setGraph({})
	.setDefaultEdgeLabel(function() { return {}; });
	ans=[]
	fin=0
	visited=[]
	mymap=new Map()
	final=[]
	document.getElementById('svg-canvas').innerHTML = null
	document.getElementById('arr').value = null
}




//Helper funtion to initiate function calls

function helper()
{
	// Array to be sorted
	var array=document.getElementById('arr').value
	var arr=array.split(" ")
	var div=mergeSort(arr,0)
	drawedge();
	draw();
}

// Global graph definition

var g = new dagreD3.graphlib.Graph()
.setGraph({})
.setDefaultEdgeLabel(function() { return {}; });

// Set of global variables

var ans=[]
var fin=0
var visited=[]
var mymap=new Map()

//Merge sort function

// Global graph definition

var g = new dagreD3.graphlib.Graph()
.setGraph({})
.setDefaultEdgeLabel(function() { return {}; });

// Set of global variables

var ans=[]
var fin=0
var visited=[]
var mymap=new Map()

//Merge sort function
function mergeSort(arr,count)
{
    var lab=arr.toString();
	
    //Making a node in the graph for the current array string
	g.setNode(count,{ label: lab,class: "type-TOP" });

	//Variable for storing maximum count of the node
	fin=Math.max(fin,count)
	

	visited.push(count)
	
	//Maping which node number contains which string array
	mymap[count]=lab;
    
    //Base case
    if (arr.length < 2)
    {   
      return arr;
    }

 	//Merge sort
    var middle = parseInt(arr.length / 2);
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);
    var temp=merge(mergeSort(left,2*count+1),mergeSort(right,2*count+2));
 
    return temp;
    
}

//Merge function of merge sort
function merge(left, right)
{
    var result = [];
 
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
 
    while (left.length)
        result.push(left.shift());
 
    while (right.length)
        result.push(right.shift());
 
    return result;
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

var final=[]
//Fin contains 2^n that we had stored in merge sort function.


//Main function which connects the nodes in addition to forming merge nodes
//Slightly complex logic

function drawedge()
{
	var count=fin+1;
 
	var row=parseInt((fin+2)/2);
	
        
	//Connecting nodes between split nodes.
	//Connecting already present nodes with their children i.e. 2*i+1 & 2*i+2

	for(i=0;i<=fin;i++)
	{
			
		if(visited.indexOf(i)!=-1 && visited.indexOf(2*i+1)!=-1 && visited.indexOf(2*i+2)!=-1 )
		{
			
			g.setEdge(i,2*i+1,{label:"SPLIT"});
			g.setEdge(i,2*i+2,{label:"SPLIT"});
		}
	}

	var mid=parseInt((fin)/2);
	
        //Temp array will have nodes at last,2nd last and 3rd last levels which will be merged manually

        var temparray=[]

	// This loop is for constructing the nodes of the first level of merge from the last level of split

	//Mid is the starting index of the first element of the last row

	for(i=mid;i<=fin;i=i+2)
	{
		// If the node in present

		if(visited.indexOf(i)!=-1)
		{
			var arr1=mymap[i];
			var arr2=mymap[i+1];
			//arr1 and arr2 contains both the neighboring strings obtained using map 


			tarr1=arr1.split(",");
			tarr2=arr2.split(",");

			tarr1=tarr1.map(function(x){return parseInt(x)})
			tarr2=tarr2.map(function(x){return parseInt(x)})
			
			//tarr1 and tarr2 contains the final two neighbouring arrays


			var temp=merge(tarr1,tarr2);
			
                        var str=temp.toString();
			
                        //Str contains the array converted to commar separated strings.
                        
                        //syntax for making a new node with id as count and label as str
                        
                        // Count is continued from fin i.e 2^n
 
			g.setNode(count,{ label: str,class: "type-TOP" });
			mymap[count]=str;
			//Made the node and mapped it to its corresponding count

			//This array will be used in the subsequent loops

			temparray.push(count);

			//Made edges to this node
                        g.setEdge(i,count,{label:"MERGE"});
			g.setEdge(i+1,count,{label:"MERGE"});                        
			
			//Increment the count for thr next node
			count=count+1;

		}

	}

	fin=mid;
	mid=(mid-1)/2;
	var curr=0
	//var final=[]
	//This loop sees if their is any node in the 2nd last level such that they are not merged with neighbour or have one merge less

	for(i=mid;i<fin;i+=2)
	{
		// If both the neighbours have not been mapped i.e. They have no children

		if(mymap[2*i+1]==null && mymap[2*i+2]==null && mymap[2*i+3]==null && mymap[2*i+4]==null )
		{
			var arr1=mymap[i];
			var arr2=mymap[i+1];

			
			tarr1=arr1.split("");
			tarr2=arr2.split("");
			tarr1=tarr1.map(function(x){return parseInt(x)})
			tarr2=tarr2.map(function(x){return parseInt(x)})
			
			
			var temp=merge(tarr1,tarr2);
			
			var str=temp.toString();
			g.setNode(count,{ label: str,class: "type-TOP" });
			mymap[count]=str;

			final.push(count)
			g.setEdge(i,count);
			g.setEdge(i+1,count);

			count=count+1;
			
		}
		//If the neignour has children and this node has to be merged with the result of its children.

		else if(mymap[2*i+1]==null && mymap[2*i+2]==null)
		{
			var arr1=mymap[i];
			var arr2=mymap[temparray[curr]];

			
			tarr1=arr1.split(",");
			tarr2=arr2.split(",");
			
			tarr1=tarr1.map(function(x){return parseInt(x)})
			tarr2=tarr2.map(function(x){return parseInt(x)})

			
			var temp=merge(tarr1,tarr2);
			
			var str=temp.toString();
			g.setNode(count,{ label: str,class: "type-TOP" });
			mymap[count]=str;
			final.push(count)
                        g.setEdge(i,count,{label:"MERGE"});
			g.setEdge(temparray[curr],count,{label:"MERGE"});
			count=count+1;
			curr=curr+1;
		}

	}

	for(i=curr;i<temparray.length;i+=2)
	{
		var arr1=mymap[temparray[i]];
		var arr2=mymap[temparray[i+1]];
		

		tarr1=arr1.split(",");
		tarr2=arr2.split(",");
		
		
		tarr1=tarr1.map(function(x){return parseInt(x)})
		tarr2=tarr2.map(function(x){return parseInt(x)})

		

		var temp=merge(tarr1,tarr2);
	
    	       var str=temp.toString();
		g.setNode(count,{ label: str,class: "type-TOP" });
		mymap[count]=str;
		final.push(count)
		g.setEdge(temparray[i],count,{label:"MERGE"});
		g.setEdge(temparray[i+1],count,{label:"MERGE"});
		count=count+1;
	}

	while(1)
	{
		var arr1=mymap[final[0]];
		var arr2=mymap[final[1]];
		
	
                if(arr2 == null)break;
		
                tarr1=arr1.split(",");
		tarr2=arr2.split(",");
		
		tarr1=tarr1.map(function(x){return parseInt(x)})
		tarr2=tarr2.map(function(x){return parseInt(x)})	
		
                var temp=merge(tarr1,tarr2);
	        var str=temp.toString();
		
                g.setNode(count,{ label: str,class: "type-TOP" });
		mymap[count]=str;
		final.push(count)
		g.setEdge(final[0],count,{label:"MERGE"});
		g.setEdge(final[1],count,{label:"MERGE"});
		
                count=count+1;
		final.splice(0,1);
		
		final.splice(0,1);
		

		if(final.length<=1)break;

	}
	

}
