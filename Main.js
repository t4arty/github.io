/**
 * 
 */

VK.init({
    apiId: 1755175
});


var u = 11;

function test1() {
    VK.api("wall.getById",{posts:'-45091870_69859',}, function(data){
	for(i=0;i<data.response.length;i++) {
	    u = data.response[i].text;
	    document.getElementById('count').innerHTML += u + '<br>';
	}
    });
}

//'http://vk.com/darcor?w=wall-45091870_69859'