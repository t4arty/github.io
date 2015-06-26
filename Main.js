/**
 * 
 */

var u;


VK.init({
    apiId: 1755175
});
	
VK.api("users.get",{user_ids:"1,2,3"}, function(data){
    u = data.response.id;
    console.log(u);
});

function test1() {
    return u;
}

function showAdr(str) {
	if (str == '' || str == ' ') {
		document.getElementById('test').innerHTML = ' ';
	}else{
		document.getElementById('test').innerHTML = str;
	}
}